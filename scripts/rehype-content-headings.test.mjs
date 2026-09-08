import test from 'node:test';
import assert from 'node:assert/strict';
import contentHeadings from './rehype-content-headings.mjs';
const heading = (tagName, value, id) => ({type:'element',tagName,properties:{id},children:[{type:'text',value}]});

test('removes a repeated imported title while retaining its anchor and real sections', () => {
  const tree = {children:[heading('h1','اے آئی کیا ہے؟','ai'),heading('h2','مثال','example')]};
  contentHeadings()(tree,{data:{astro:{frontmatter:{title:'اے آئی کیا ہے؟'}}}});
  assert.equal(tree.children[0].tagName,'span');
  assert.equal(tree.children[0].properties.id,'ai');
  assert.deepEqual(tree.children[0].children,[]);
  assert.equal(tree.children[1].tagName,'h2');
  assert.equal(tree.children[1].children[0].value,'مثال');
});
test('preserves a distinct H1 section and its old anchor as an H2', () => {
  const tree = {children:[heading('h1','ایک الگ موضوع','section')]};
  contentHeadings()(tree,{data:{astro:{frontmatter:{title:'اصل عنوان'}}}});
  assert.equal(tree.children[0].tagName,'h2');
  assert.equal(tree.children[0].children[0].value,'ایک الگ موضوع');
  assert.equal(tree.children[0].properties.id,'section');
});
test('does not strip a later heading whose text happens to match the title', () => {
  const tree={children:[heading('h2','تعارف','intro'),heading('h1','عنوان','later')]};
  contentHeadings()(tree,{data:{astro:{frontmatter:{title:'عنوان'}}}});
  assert.equal(tree.children[1].tagName,'h2');
  assert.equal(tree.children[1].children[0].value,'عنوان');
});
