/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: [
    /^strip-markdown.*/,
    /^mdast-util-to-markdown*/,
    /^mdast-util-from-markdown*/,
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
  ],
};
