const CodepenTransformer = {
  name: "Codepen",

  shouldTransform(url) {
    const { host, pathname } = new URL(url);

    return ["codepen.io"].includes(host) && pathname.includes("/pen/");
  },
  // getHTML can also be async
  getHTML(url) {
    const [, username, id] = url.match(/codepen\.io\/(.+)\/pen\/(.+)/);

    return `
      <div>
        <p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="${id}" data-user="${username}" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
          <span><a href="${url}">See the Pen</a> on <a href="https://codepen.io">CodePen</a>.</span>
        </p>
      </div>
    `;
  },
};

async function getMarkdownPlugins() {
  const { default: remarkEmbedder } = require("@remark-embedder/core");

  const remarkPlugins = await Promise.all([
    import("remark-prism").then((mod) => mod.default),
    import("remark-gfm").then((mod) => mod.default),
    Promise.resolve(() =>
      remarkEmbedder({ transformers: [CodepenTransformer] })
    ),
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
