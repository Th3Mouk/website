// Rehype plugin: wrap every <table> in <div class="table-wrap"> so wide
// tables scroll horizontally inside the article column instead of
// overflowing it (styles: src/styles/prose.css). Dependency-free.
export default function rehypeTableWrap() {
  return (tree) => {
    const visit = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'element' && child.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-wrap'] },
            children: [child],
          };
        }
        visit(child);
        return child;
      });
    };
    visit(tree);
  };
}
