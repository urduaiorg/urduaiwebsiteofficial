"""Editorial cover: one real Pakistani host, 31 schematic guests, official logo."""
from pathlib import Path
from math import cos, sin, pi
import subprocess
import tempfile

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "output/whatsapp-guest-calling-2026-10-14"
SOURCE = OUT / "pakistani-host-faysalkhan101-pixabay.jpg"
META = ROOT / "public/images/blog/whatsapp-guest-calling-meta-original.jpg"
WORDMARK = ROOT / "output/urdu-ai-mini-master-class/urdu-ai-wordmark-controlled-4x.png"
DEST = ROOT / "public/images/blog/whatsapp-guest-calling-host-31-guests-cover.png"
PHONE = OUT / "cover-orbit-phone-375.png"
FONT_PATH = "/System/Library/Fonts/NotoNastaliq.ttc"
S = 2
W, H = 1200, 630

def box(v):
    return tuple(round(x*S) for x in v)

def font(size, bold=False):
    return ImageFont.truetype(FONT_PATH, round(size*S), index=2 if bold else 0)

def text_right(draw, label, x, y, size, fill, bold=False):
    with tempfile.NamedTemporaryFile(suffix=".png") as tmp:
        subprocess.run(["pango-view", "--no-display", "--background=transparent",
                        f"--foreground=#{fill[0]:02x}{fill[1]:02x}{fill[2]:02x}",
                        f"--font=Noto Nastaliq Urdu {'Bold' if bold else 'Regular'} {round(size*S)}",
                        "--pixels", "--rtl", "--margin=0", "-t", label, "-o", tmp.name],
                       check=True, capture_output=True)
        t = Image.open(tmp.name).convert("RGBA")
        t = t.crop(t.getbbox())
        im.alpha_composite(t, (round(x*S)-t.width, round(y*S)))
        return t.width/S, t.height/S

def avatar(draw, cx, cy, radius, bg, person):
    cx, cy, r = cx*S, cy*S, radius*S
    draw.ellipse((cx-r, cy-r, cx+r, cy+r), fill=bg,
                 outline=(160, 214, 198, 190), width=2*S)
    # A restrained video-call avatar: head and shoulders, not synthetic faces.
    draw.ellipse((cx-5*S, cy-8*S, cx+5*S, cy+2*S), fill=person)
    draw.rounded_rectangle((cx-10*S, cy+3*S, cx+10*S, cy+11*S),
                           radius=5*S, fill=person)

OUT.mkdir(parents=True, exist_ok=True)
im = Image.new("RGBA", (W*S,H*S), (5, 26, 39, 255))
d = ImageDraw.Draw(im, "RGBA")

# Atmospheric field and fine orbit rings; all geometry is controlled.
for radius, alpha in [(229,27),(183,22)]:
    d.ellipse(box((865-radius,340-radius,865+radius,340+radius)),
              outline=(137,216,193,alpha), width=2*S)
d.rounded_rectangle(box((55,91,555,96)), radius=2*S, fill=(255,190,11,255))
d.rectangle(box((575,122,577,547)), fill=(80,126,133,80))

# The official WhatsApp logo comes directly from Meta's 14 October image.
meta = Image.open(META).convert("RGB")
logo_src = meta.crop((58, 871, 216, 1018))
logo = Image.new("RGBA", logo_src.size)
for y in range(logo_src.height):
    for x in range(logo_src.width):
        r,g,b = logo_src.getpixel((x,y))
        strength = max(0, min(255, round((g-r-10)*5)))
        if g < b*1.18 or g < 105:
            strength = 0
        logo.putpixel((x,y),(37,211,102,strength))
logo = logo.resize((78*S,73*S),Image.Resampling.LANCZOS)
im.alpha_composite(logo,(60*S,20*S))

wordmark = Image.open(WORDMARK).convert("RGBA")
wordmark = wordmark.resize((178*S,37*S),Image.Resampling.LANCZOS)
im.alpha_composite(wordmark,(965*S,36*S))

# Main news headline: the guest feature is the news; 32 is total capacity.
text_right(d,"واٹس ایپ کال میں",535,151,53,(248,250,247,255),True)
text_right(d,"بغیر اکاؤنٹ شامل ہوں",535,268,44,(255,190,11,255),True)
d.rounded_rectangle(box((57,429,504,526)), radius=17*S,
                    fill=(16,52,62,255),outline=(78,150,136,135),width=2*S)
latin = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf",76*S)
d.text((78*S,429*S),"32",font=latin,fill=(255,190,11,255))
text_right(d,"افراد تک گروپ کال",486,452,31,(244,247,245,255),True)
text_right(d,"کمپیوٹر براؤزر سے، میزبان کی منظوری پر",537,548,17,(147,191,187,255))

# Pakistani host from a licensed documentary photograph.
cx,cy,hr = 865,340,136
photo = Image.open(SOURCE).convert("RGB")
# Crop to the photographer's central subject before fitting to the round frame.
photo = photo.crop((375,40,1060,725))
photo = ImageOps.fit(photo,(hr*2*S,hr*2*S),Image.Resampling.LANCZOS)
mask = Image.new("L",photo.size,0)
ImageDraw.Draw(mask).ellipse((0,0,photo.width-1,photo.height-1),fill=255)
d.ellipse(box((cx-hr-11,cy-hr-11,cx+hr+11,cy+hr+11)),fill=(7,48,54,255))
d.ellipse(box((cx-hr-6,cy-hr-6,cx+hr+6,cy+hr+6)),outline=(255,190,11,255),width=5*S)
im.paste(photo,((cx-hr)*S,(cy-hr)*S),mask)

# Exactly 31 people around the host: 20 outer and 11 inner orbit positions.
counts = ((20,231,35,-pi/2+0.09),(11,185,30,-pi/2+0.26))
avatar_count=0
for ring,(count,dist,radius,start) in enumerate(counts):
    for j in range(count):
        a=start+2*pi*j/count
        ax=round(cx+dist*cos(a)); ay=round(cy+dist*sin(a))
        bg = (13,70,69,255) if (j+ring)%3 else (33,91,88,255)
        person = (229,243,231,255) if (j+ring)%5 else (255,190,11,255)
        avatar(d,ax,ay,radius/2,bg,person)
        avatar_count+=1
assert avatar_count==31

im = im.convert("RGB").resize((W,H),Image.Resampling.LANCZOS)
im.save(DEST,optimize=True)
im.resize((375,197),Image.Resampling.LANCZOS).save(PHONE,optimize=True)
print(f"host=1 guests={avatar_count} total={1+avatar_count}")
print(DEST)
print(PHONE)
