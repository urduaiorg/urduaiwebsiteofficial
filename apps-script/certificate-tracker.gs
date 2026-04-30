// ==========================================
// Urdu AI Certificate Tracker — Google Apps Script
// WANG (Welfare Association for New Generation)
//
// MINIMAL PATCH on top of working original code:
//   1. appendRow stores 3 extra fields — whatsapp (K), city (L), age (M)
//   2. Greeting changed to: محترم / محترمہ  (gender-neutral)
//   3. WhatsApp Channel CTA box + footer link added to email
//
// ONE-TIME MANUAL STEP before pasting this code:
//   Open your Google Sheet. In row 1, add these 3 column headers:
//     K1: WhatsApp
//     L1: City
//     M1: Age
//   That's the only sheet change.
//
// DEPLOY:
//   1. Paste into Apps Script editor (replace everything)
//   2. Save
//   3. Deploy → Manage Deployments → pencil → New Version → Deploy
//      (same URL stays — do NOT create a New Deployment)
// ==========================================

const CONFIG = {
  SHEET_NAME: 'Sheet1',
  SENDER_NAME: 'Urdu AI — WANG',
  SENDER_EMAIL: 'ai@urduai.org',
  REPLY_TO: 'ai@urduai.org',
  API_KEY: 'URAI-WANG-2026-SECRET',
  ADMIN_EMAIL: 'qaisar.roonjha@gmail.com',
  WEBSITE: 'https://urduai.org',
  TEMPLATE_DOC_ID: '1Ad-Unp2MYwfQFm9s-hMcY4VKlYbb9aa_ESJcCSufozQ',
  CERTIFICATES_FOLDER_ID: ''
};


function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.apiKey !== CONFIG.API_KEY) {
      return createResponse(401, { error: 'Unauthorized' });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(CONFIG.SHEET_NAME);

    var certificates = data.certificates || [data];
    var results = [];

    for (var i = 0; i < certificates.length; i++) {
      var cert = certificates[i];

      var existingRow = findRow(sheet, cert.certificateId);
      if (existingRow) {
        results.push({ certificateId: cert.certificateId, status: 'duplicate' });
        continue;
      }

      // Normalise age — integer 13-99 or blank
      var ageValue = '';
      if (cert.age !== undefined && cert.age !== null && cert.age !== '') {
        var ageNum = parseInt(cert.age, 10);
        if (!isNaN(ageNum) && ageNum >= 13 && ageNum <= 99) {
          ageValue = ageNum;
        }
      }

      sheet.appendRow([
        cert.certificateId,            // A
        cert.nameUr || '',             // B
        cert.nameEn || '',             // C
        cert.email || '',              // D
        cert.score || 0,               // E
        cert.courseName || 'Urdu AI Master Class', // F
        cert.issuedAt || new Date().toISOString(), // G
        cert.deviceId || '',           // H
        'Yes',                         // I
        cert.email ? 'Pending' : 'No Email', // J
        cert.whatsapp || '',           // K  ← new
        cert.city || '',               // L  ← new
        ageValue                       // M  ← new
      ]);

      if (cert.email) {
        try {
          sendCertificateEmail(cert);
          var newRow = sheet.getLastRow();
          sheet.getRange(newRow, 10).setValue('Sent');
          results.push({ certificateId: cert.certificateId, status: 'sent' });
        } catch (emailErr) {
          Logger.log('Email error: ' + emailErr.message);
          results.push({ certificateId: cert.certificateId, status: 'saved_email_failed' });
        }
      } else {
        results.push({ certificateId: cert.certificateId, status: 'saved_no_email' });
      }
    }

    return createResponse(200, {
      success: true,
      processed: results.length,
      results: results
    });

  } catch (error) {
    Logger.log('doPost error: ' + error.message);
    return createResponse(500, { error: error.message });
  }
}


function doGet(e) {
  var action = e.parameter.action;
  var callback = e.parameter.callback || null;

  if (action === 'verify') {
    var certId = e.parameter.id;
    var sheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(CONFIG.SHEET_NAME);
    var row = findRow(sheet, certId);

    if (row) {
      return createResponse(200, {
        verified: true,
        certificateId: certId,
        nameUr: row[1],
        nameEn: row[2],
        course: row[5],
        date: row[6],
        score: row[4]
      }, callback);
    } else {
      return createResponse(404, { verified: false, certificateId: certId }, callback);
    }
  }

  if (action === 'stats' && e.parameter.key === CONFIG.API_KEY) {
    return createResponse(200, getStats(), callback);
  }

  return createResponse(200, {
    service: 'Urdu AI Certificate Verification',
    usage: 'Add ?action=verify&id=URAI-XXXXXXXX to verify a certificate'
  }, callback);
}


function generateCertificatePdf(cert) {
  var completionDate = '';
  try {
    completionDate = new Date(cert.issuedAt).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    completionDate = cert.issuedAt || new Date().toLocaleDateString();
  }

  var templateFile = DriveApp.getFileById(CONFIG.TEMPLATE_DOC_ID);
  var copyName = 'Certificate — ' + (cert.nameEn || cert.nameUr) + ' — ' + cert.certificateId;

  var copy;
  if (CONFIG.CERTIFICATES_FOLDER_ID) {
    var folder = DriveApp.getFolderById(CONFIG.CERTIFICATES_FOLDER_ID);
    copy = templateFile.makeCopy(copyName, folder);
  } else {
    copy = templateFile.makeCopy(copyName);
  }

  var copyId = copy.getId();
  var doc = DocumentApp.openById(copyId);
  var body = doc.getBody();

  body.replaceText('{{NAME_UR}}', cert.nameUr || '');
  body.replaceText('{{NAME_EN}}', cert.nameEn || '');
  body.replaceText('{{SCORE}}', String(cert.score || 0) + '%');
  body.replaceText('{{COURSE_NAME}}', cert.courseName || 'Urdu AI Master Class');
  body.replaceText('{{CERTIFICATE_ID}}', cert.certificateId || '');
  body.replaceText('{{DATE}}', completionDate);
  body.replaceText('{{VERIFY_URL}}', '');

  doc.saveAndClose();

  var pdfBlob = DriveApp.getFileById(copyId)
    .getAs('application/pdf')
    .setName('Urdu_AI_Certificate_' + cert.certificateId + '.pdf');

  if (!CONFIG.CERTIFICATES_FOLDER_ID) {
    DriveApp.getFileById(copyId).setTrashed(true);
  }

  return pdfBlob;
}


function sendCertificateEmail(cert) {
  var subject = 'مبارک ہو! آپ کا Urdu AI سرٹیفکیٹ — Congratulations, ' + (cert.nameEn || cert.nameUr) + '!';

  var completionDate = '';
  try {
    completionDate = new Date(cert.issuedAt).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    completionDate = cert.issuedAt || new Date().toLocaleDateString();
  }

  var pdfBlob = generateCertificatePdf(cert);

  var htmlBody = '<!DOCTYPE html>' +
    '<html dir="rtl">' +
    '<head>' +
      '<meta charset="utf-8">' +
      '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet">' +
      '<link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" rel="stylesheet">' +
    '</head>' +
    '<body dir="rtl" style="margin: 0; padding: 0; background: #f0f0f5; direction: rtl;">' +
    '<div dir="rtl" style="max-width: 640px; margin: 0 auto; background: #ffffff; direction: rtl;">' +
    '<div style="background: #1A1A2E; padding: 35px 30px; text-align: center;">' +
      '<h1 style="margin: 0; font-family: Montserrat, Arial, Helvetica, sans-serif; font-weight: 800; font-size: 38px; letter-spacing: 2px;" dir="ltr">' +
        '<span style="color: #FFFFFF;">Urdu</span>' +
        '<span style="color: #FFD700;"> AI</span>' +
      '</h1>' +
      '<p style="margin: 10px 0 0; font-family: Montserrat, Arial, sans-serif; font-size: 12px; font-weight: 600; color: #888; letter-spacing: 3px; text-transform: uppercase;" dir="ltr">Certificate of Completion</p>' +
    '</div>' +
    '<div style="height: 4px; background: linear-gradient(90deg, #FFD700, #FFA500, #FFD700);"></div>' +
    '<div dir="rtl" style="padding: 35px 30px; direction: rtl; text-align: right;">' +

      // ★ Greeting — gender-neutral
      '<p dir="rtl" style="direction: rtl; unicode-bidi: embed; font-family: Noto Nastaliq Urdu, Jameel Noori Nastaleeq, Urdu Typesetting, serif; font-size: 24px; text-align: right; color: #1A1A2E; margin: 0 0 10px; line-height: 2.1;">' +
        'محترم / محترمہ <strong>' + escapeHtml(cert.nameUr || cert.nameEn || '') + '</strong>' +
      '</p>' +

      '<p dir="rtl" style="direction: rtl; unicode-bidi: embed; font-family: Noto Nastaliq Urdu, Jameel Noori Nastaleeq, Urdu Typesetting, serif; font-size: 17px; text-align: right; line-height: 2.2; color: #333; margin: 0 0 25px;">' +
        'مبارک ہو! آپ نے <strong style="color: #1A1A2E;">Urdu AI Master Class</strong> کامیابی سے مکمل کر لی ہے۔' +
        '<br>آپ کا سرٹیفکیٹ اس ای میل کے ساتھ منسلک ہے۔' +
      '</p>' +

      '<div dir="rtl" style="background: #FAFAF5; padding: 22px; border-radius: 10px; margin: 0 0 25px; border: 2px solid #FFD700; direction: rtl;">' +
        '<table dir="rtl" style="width: 100%; border-collapse: collapse; direction: rtl;">' +
          '<tr><td style="text-align: right; padding: 10px 12px; font-family: Noto Nastaliq Urdu, serif; font-weight: bold; color: #1A1A2E; font-size: 14px; width: 35%; border-bottom: 1px solid #f0f0f0;">نام (اردو):</td><td style="text-align: right; padding: 10px 12px; font-family: Noto Nastaliq Urdu, serif; font-size: 16px; color: #1A1A2E; border-bottom: 1px solid #f0f0f0;">' + escapeHtml(cert.nameUr || '-') + '</td></tr>' +
          '<tr><td style="text-align: right; padding: 10px 12px; font-family: Montserrat, Arial, sans-serif; font-weight: 700; color: #1A1A2E; font-size: 13px; border-bottom: 1px solid #f0f0f0;">Name (English):</td><td dir="ltr" style="text-align: left; padding: 10px 12px; font-family: Montserrat, Arial, sans-serif; font-size: 15px; color: #1A1A2E; border-bottom: 1px solid #f0f0f0;">' + escapeHtml(cert.nameEn || '-') + '</td></tr>' +
          '<tr><td style="text-align: right; padding: 10px 12px; font-family: Noto Nastaliq Urdu, serif; font-weight: bold; color: #1A1A2E; font-size: 14px; border-bottom: 1px solid #f0f0f0;">کورس:</td><td dir="ltr" style="text-align: left; padding: 10px 12px; font-family: Montserrat, Arial, sans-serif; font-size: 14px; font-weight: 600; color: #1A1A2E; border-bottom: 1px solid #f0f0f0;">' + escapeHtml(cert.courseName || 'Urdu AI Master Class') + '</td></tr>' +
          '<tr><td style="text-align: right; padding: 10px 12px; font-family: Noto Nastaliq Urdu, serif; font-weight: bold; color: #1A1A2E; font-size: 14px; border-bottom: 1px solid #f0f0f0;">سکور:</td><td dir="ltr" style="text-align: left; padding: 10px 12px; font-family: Montserrat, Arial, sans-serif; font-size: 22px; color: #4CAF50; font-weight: 800; border-bottom: 1px solid #f0f0f0;">' + escapeHtml(String(cert.score)) + '%</td></tr>' +
          '<tr><td style="text-align: right; padding: 10px 12px; font-family: Noto Nastaliq Urdu, serif; font-weight: bold; color: #1A1A2E; font-size: 14px; border-bottom: 1px solid #f0f0f0;">شہر:</td><td dir="ltr" style="text-align: left; padding: 10px 12px; font-family: Montserrat, Arial, sans-serif; font-size: 14px; color: #555; border-bottom: 1px solid #f0f0f0;">' + escapeHtml(cert.city || '-') + '</td></tr>' +
          '<tr><td style="text-align: right; padding: 10px 12px; font-family: Noto Nastaliq Urdu, serif; font-weight: bold; color: #1A1A2E; font-size: 14px; border-bottom: 1px solid #f0f0f0;">سرٹیفکیٹ نمبر:</td><td dir="ltr" style="text-align: left; padding: 10px 12px; font-family: Montserrat, monospace; font-size: 14px; font-weight: 600; color: #555; letter-spacing: 1px; border-bottom: 1px solid #f0f0f0;">' + escapeHtml(cert.certificateId || '-') + '</td></tr>' +
          '<tr><td style="text-align: right; padding: 10px 12px; font-family: Noto Nastaliq Urdu, serif; font-weight: bold; color: #1A1A2E; font-size: 14px;">تاریخ:</td><td dir="ltr" style="text-align: left; padding: 10px 12px; font-family: Montserrat, Arial, sans-serif; font-size: 14px; color: #555;">' + escapeHtml(completionDate) + '</td></tr>' +
        '</table>' +
      '</div>' +

      '<div dir="rtl" style="text-align: center; margin: 20px 0; padding: 15px; background: #F5F5FF; border-radius: 8px; direction: rtl;">' +
        '<p dir="rtl" style="direction: rtl; unicode-bidi: embed; font-family: Noto Nastaliq Urdu, serif; font-size: 16px; color: #1A1A2E; margin: 0 0 5px; line-height: 2;">آپ کا سرٹیفکیٹ PDF اس ای میل کے ساتھ منسلک ہے</p>' +
        '<p dir="ltr" style="font-family: Montserrat, Arial, sans-serif; font-size: 12px; color: #888; margin: 0;">Your certificate PDF is attached to this email</p>' +
      '</div>' +

      // ★ WhatsApp Channel CTA
      '<div dir="rtl" style="direction: rtl; text-align: right; margin: 20px 0; padding: 22px 24px; background: #25D366; border: 2px solid #128C7E; border-radius: 12px;">' +
        '<p dir="rtl" style="direction: rtl; unicode-bidi: embed; font-family: Noto Nastaliq Urdu, Jameel Noori Nastaleeq, Urdu Typesetting, serif; font-size: 20px; font-weight: bold; color: #FFFFFF; margin: 0; line-height: 2.4; text-align: right;">' +
          'WhatsApp پر Urdu AI چینل فالو کریں' +
        '</p>' +
        '<p dir="rtl" style="direction: rtl; unicode-bidi: embed; font-family: Noto Nastaliq Urdu, Jameel Noori Nastaleeq, serif; font-size: 15px; color: #FFFFFF; margin: 8px 0 0; line-height: 2.1; text-align: right; opacity: 0.95;">' +
          'نئے AI ٹولز، مفت گائیڈز اور اردو میں AI کی ہر نئی خبر سب سے پہلے آپ تک — بالکل مفت' +
        '</p>' +
        '<p style="text-align: center; margin: 20px 0 0;">' +
          '<a href="https://whatsapp.com/channel/0029VaXXgd00AgW6jAZGw83j" style="display: inline-block; background: #FFFFFF; color: #128C7E; font-family: Montserrat, Arial, sans-serif; font-size: 15px; font-weight: 700; padding: 12px 34px; border-radius: 30px; text-decoration: none; letter-spacing: 0.3px;">' +
            'چینل جوائن کریں ←' +
          '</a>' +
        '</p>' +
        '<p dir="ltr" style="font-family: Montserrat, Arial, sans-serif; font-size: 11px; color: #FFFFFF; margin: 12px 0 0; text-align: center; opacity: 0.9;">' +
          'Follow the Urdu AI channel on WhatsApp' +
        '</p>' +
      '</div>' +

      '<div dir="rtl" style="direction: rtl; text-align: right; margin: 20px 0; padding: 20px 24px; background: #198754; border: 2px solid #198754; border-radius: 12px;">' +
        '<p dir="rtl" style="direction: rtl; unicode-bidi: embed; font-family: Noto Nastaliq Urdu, Jameel Noori Nastaleeq, Urdu Typesetting, serif; font-size: 20px; font-weight: bold; color: #FFFFFF; margin: 0; line-height: 2.4; text-align: right;">' +
          'اگر آپ Google کی Professional Certificate میں شامل ہونا چاہتے ہیں تو اس لنک پر فارم بھریں۔' +
        '</p>' +
        '<p dir="rtl" style="direction: rtl; text-align: center; margin: 18px 0 0;">' +
          '<a href="https://docs.google.com/forms/d/e/1FAIpQLScR_BebSnBNcbT1U7C_gSDqEMjB3Ev2MS9Fk4gOXTpOIvb6VQ/viewform?_bhlid=c2728b275bc87c2706be69c0ef34a5d7c11df172" style="font-family: Montserrat, Arial, sans-serif; font-size: 14px; font-weight: 700; color: #FFFFFF; text-decoration: underline; display: inline-block;">' +
            'Google Form کھولیں' +
          '</a>' +
        '</p>' +
      '</div>' +

      '<p dir="rtl" style="direction: rtl; unicode-bidi: embed; font-family: Noto Nastaliq Urdu, Jameel Noori Nastaleeq, serif; font-size: 15px; text-align: right; color: #999; line-height: 2.2;">' +
        'آپ اپنا سرٹیفکیٹ واٹس ایپ، فیسبک، یا لنکڈ اِن پر شیئر کر سکتے ہیں۔' +
      '</p>' +

      '<hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">' +

      '<p dir="ltr" style="font-family: Montserrat, Arial, sans-serif; font-size: 13px; text-align: left; color: #777; line-height: 1.7;">' +
        'Dear ' + escapeHtml(cert.nameEn || cert.nameUr || '') + ',<br><br>' +
        'Congratulations on completing the <strong style="color: #1A1A2E;">Urdu AI Master Class</strong>! Your certificate is attached as a PDF. Certificate ID: <code style="background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-size: 12px;">' + escapeHtml(cert.certificateId || '') + '</code><br><br>' +
        'Score: <strong style="color: #4CAF50;">' + escapeHtml(String(cert.score)) + '%</strong> &nbsp;|&nbsp; Date: ' + escapeHtml(completionDate) +
      '</p>' +
    '</div>' +

    // ★ Footer with WhatsApp Channel link
    '<div style="background: #1A1A2E; padding: 25px 30px; text-align: center;">' +
      '<p dir="ltr" style="margin: 0 0 8px; font-family: Montserrat, Arial, sans-serif; font-weight: 800; font-size: 20px;">' +
        '<span style="color: #FFFFFF;">Urdu</span>' +
        '<span style="color: #FFD700;"> AI</span>' +
      '</p>' +
      '<p dir="ltr" style="font-family: Montserrat, Arial, sans-serif; font-size: 11px; color: #888; margin: 0 0 5px; letter-spacing: 1px;">' +
        'WANG — Welfare Association for New Generation' +
      '</p>' +
      '<p dir="ltr" style="margin: 10px 0 0;">' +
        '<a href="https://urduai.org" style="color: #FFD700; text-decoration: none; font-family: Montserrat, Arial, sans-serif; font-size: 12px; font-weight: 600;">urduai.org</a>' +
        '<span style="color: #444; margin: 0 8px;">|</span>' +
        '<a href="https://wang.org.pk" style="color: #FFD700; text-decoration: none; font-family: Montserrat, Arial, sans-serif; font-size: 12px; font-weight: 600;">wang.org.pk</a>' +
        '<span style="color: #444; margin: 0 8px;">|</span>' +
        '<a href="https://whatsapp.com/channel/0029VaXXgd00AgW6jAZGw83j" style="color: #25D366; text-decoration: none; font-family: Montserrat, Arial, sans-serif; font-size: 12px; font-weight: 600;">WhatsApp Channel</a>' +
      '</p>' +
      '<p dir="rtl" style="font-family: Noto Nastaliq Urdu, serif; font-size: 13px; color: #666; margin: 12px 0 0; line-height: 2;">' +
        'اردو میں AI تعلیم کے ذریعے پاکستان کو بااختیار بنانا' +
      '</p>' +
    '</div>' +

    '</div>' +
    '</body></html>';

  GmailApp.sendEmail(cert.email, subject, '', {
    htmlBody: htmlBody,
    from: CONFIG.SENDER_EMAIL,
    name: CONFIG.SENDER_NAME,
    replyTo: CONFIG.REPLY_TO,
    attachments: [pdfBlob]
  });
}


function getStats() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(CONFIG.SHEET_NAME);
  var data = sheet.getDataRange().getValues();
  var total = data.length - 1;

  var totalScore = 0;
  var emailsSent = 0;
  var thisWeek = 0;
  var thisMonth = 0;
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  var oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  for (var i = 1; i <= total; i++) {
    totalScore += Number(data[i][4]) || 0;
    if (data[i][9] === 'Sent') emailsSent++;
    var rowDate = new Date(data[i][6]);
    if (rowDate > oneWeekAgo) thisWeek++;
    if (rowDate > oneMonthAgo) thisMonth++;
  }

  return {
    totalCertificates: total,
    averageScore: total > 0 ? Math.round(totalScore / total) : 0,
    emailsSent: emailsSent,
    thisWeek: thisWeek,
    thisMonth: thisMonth
  };
}

function sendWeeklySummary() {
  var stats = getStats();
  var sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();

  var body = 'Urdu AI Certificate — Weekly Report\n' +
    '==========================================\n\n' +
    'Total Certificates:  ' + stats.totalCertificates + '\n' +
    'This Week:           ' + stats.thisWeek + '\n' +
    'This Month:          ' + stats.thisMonth + '\n' +
    'Average Score:       ' + stats.averageScore + '%\n' +
    'Emails Sent:         ' + stats.emailsSent + '\n\n' +
    'View Sheet: ' + sheetUrl + '\n\n' +
    '— Urdu AI Bot (WANG)';

  GmailApp.sendEmail(CONFIG.ADMIN_EMAIL, 'Urdu AI Certificates — Week Summary (' + stats.thisWeek + ' new)', body, {
    from: CONFIG.SENDER_EMAIL,
    name: 'Urdu AI Bot'
  });
}


function findRow(sheet, certificateId) {
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === certificateId) {
      return data[i];
    }
  }
  return null;
}

function createResponse(code, data, callback) {
  var json = JSON.stringify(data);
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


function testEmail() {
  sendCertificateEmail({
    certificateId: 'URAI-TEST1234',
    nameUr: 'قیصر رونجھا',
    nameEn: 'Qaisar Roonjha',
    email: 'qaisar.roonjha@gmail.com',
    whatsapp: '+923001234567',
    city: 'Karachi',
    age: 32,
    score: 92,
    courseName: 'Urdu AI Master Class',
    issuedAt: new Date().toISOString()
  });

  Logger.log('Test email sent with PDF certificate!');
}
