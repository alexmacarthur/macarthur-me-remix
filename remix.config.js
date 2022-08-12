const { getMarkdownPlugins } = require("./app/shared");

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: [
    /^strip-markdown.*/,
    /^mdast-*/,
    /^mdast-util-to-string*/,
    /^micromark*/,
    /^unist-util-stringify-position*/,
    /^micromark-util-decode-numeric-character-reference*/,
    /^micromark-util-decode-string*/,
    /^micromark-util-normalize-identifier*/,
    /^markdown-it*/,
    /^decode-named-character-reference*/,
    /^unist-util-stringify-position*/,
    /^unified*/,
    /^fault*/,
    /^zwitch*/,
    /^is-plain-obj*/,
    /^unist-util-visit*/,
    /^character-entities*/,
    /^longest-streak*/,
    /^remark.*/,
    /^vfile*/,
    /^trough*/,
    /^unist-util-is*/,
    /^bail*/,
    /^mdx-bundler*/,
    /^ccount*/,
  ],
  mdx: async (filename) => {
    const [remarkPlugins, rehypePlugins] = await getMarkdownPlugins();

    return {
      remarkPlugins: [remarkPlugins],
      rehypePlugins: [rehypePlugins],
    };
  },
};
