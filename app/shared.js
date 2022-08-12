async function getMarkdownPlugins() {
  const remarkPlugins = await Promise.all([
    import("remark-prism").then((mod) => mod.default),
    import("remark-gfm").then((mod) => mod.default),
  ]);

  const rehypePlugins = await Promise.all([
    import("rehype-slug").then((mod) => mod.default),
    import("rehype-autolink-headings").then((mod) => mod.default),
    import("rehype-external-links").then((mod) => mod.default),
  ]);

  return [remarkPlugins, rehypePlugins];
}

module.exports = {
  getMarkdownPlugins,
};
