import { toString } from 'mdast-util-to-string'

/** Jekyll notes repeat the title as a leading "# Title" h1 — the layout already renders one. */
export default function remarkStripTitleH1() {
  return (tree, file) => {
    const title = file.data?.astro?.frontmatter?.title
    if (!title) return
    const first = tree.children.find((n) => n.type === 'heading')
    if (!first || first.depth !== 1) return
    if (toString(first).trim().toLowerCase() === String(title).trim().toLowerCase()) {
      tree.children.splice(tree.children.indexOf(first), 1)
    }
  }
}
