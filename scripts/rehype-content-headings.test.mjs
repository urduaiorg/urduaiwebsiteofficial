import test from 'node:test';
import assert from 'node:assert/strict';
import contentHeadings from './rehype-content-headings.mjs';
const heading = (tagName, value, id) => ({type:'element',tagName,properties:{id},children:[{type:'text',value}]});

test('removes a repeated imported title while retaining its anchor and real sections', () => {
  const tree = {children:[heading('h1','اے آئی کیا ہے؟','ai'),heading('h2','مثال','example')]};
  contentHeadings()(tree,{history:[],data:{astro:{frontmatter:{title:'اے آئی کیا ہے؟'}}}});
  assert.equal(tree.children[0].tagName,'span');
  assert.equal(tree.children[0].properties.id,'ai');
  assert.deepEqual(tree.children[0].children,[]);
  assert.equal(tree.children[1].tagName,'h2');
  assert.equal(tree.children[1].children[0].value,'مثال');
});
test('preserves a distinct H1 section and its old anchor as an H2', () => {
  const tree = {children:[heading('h1','ایک الگ موضوع','section')]};
  contentHeadings()(tree,{history:[],data:{astro:{frontmatter:{title:'اصل عنوان'}}}});
  assert.equal(tree.children[0].tagName,'h2');
  assert.equal(tree.children[0].children[0].value,'ایک الگ موضوع');
  assert.equal(tree.children[0].properties.id,'section');
});
test('does not strip a later heading whose text happens to match the title', () => {
  const tree={children:[heading('h2','تعارف','intro'),heading('h1','عنوان','later')]};
  contentHeadings()(tree,{history:[],data:{astro:{frontmatter:{title:'عنوان'}}}});
  assert.equal(tree.children[1].tagName,'h2');
  assert.equal(tree.children[1].children[0].value,'عنوان');
});

test('preserves generated IDs and duplicate slug suffixes before Astro assigns them', () => {
  const tree={children:[heading('h1','اردو عنوان'),heading('h2','اردو عنوان')]};
  contentHeadings()(tree,{history:[],data:{astro:{frontmatter:{title:'اردو عنوان'}}}});
  assert.equal(tree.children[0].tagName,'span');
  assert.equal(tree.children[0].properties.id,'اردو-عنوان');
  assert.equal(tree.children[1].properties.id,'اردو-عنوان-1');
});

test('real Astro Markdown pipeline keeps old anchors and removes only the repeated title', async () => {
  const { createMarkdownProcessor } = await import('@astrojs/markdown-remark');
  const baseline = await createMarkdownProcessor();
  const updated = await createMarkdownProcessor({rehypePlugins:[contentHeadings]});
  const source = '# اردو عنوان\n\nیہ تعارف ہے۔\n\n## اردو عنوان';
  const options = {frontmatter:{title:'اردو عنوان'}};
  const before = await baseline.render(source, options);
  const after = await updated.render(source, options);
  for (const {slug} of before.metadata.headings) assert.ok(after.code.includes(`id="${slug}"`));
  assert.ok(after.code.includes('<span id="اردو-عنوان"></span>'));
  assert.ok(!after.code.includes('<h1'));
  assert.equal(after.metadata.headings.length,1);
});
