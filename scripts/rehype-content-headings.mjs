// Layouts provide the page H1. Keep imported section IDs usable for old links.
export default function contentHeadings() {
  return (tree, file) => {
    const normalize = value => String(value ?? '').normalize('NFKC').replace(/\s+/g, ' ').trim();
    const title = normalize(file.data.astro?.frontmatter?.title);
    const text = node => node.type === 'text' ? node.value : (node.children ?? []).map(text).join('');
    let firstHeading = true;
    function walk(parent) {
      for (const node of parent.children ?? []) {
        if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
          if (node.tagName === 'h1') {
            if (firstHeading && title && normalize(text(node)) === title) {
              node.tagName = 'span';
              node.children = [];
              node.properties = node.properties?.id ? { id: node.properties.id } : {};
            } else {
              node.tagName = 'h2';
            }
          }
          firstHeading = false;
        }
        walk(node);
      }
    }
    walk(tree);
  };
}
