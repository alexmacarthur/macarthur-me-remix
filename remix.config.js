/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: [
    /^remark.*/,
    /^strip-markdown.*/,
    /^mdast-util-to-markdown*/,
    /^mdast-util-from-markdown*/,
    /^mdast-util-to-string*/,
    /^micromark*/,
    /^unist-util-stringify-position*/,
    /^micromark-util-decode-numeric-character-reference*/,
    /^micromark-util-decode-string*/,
    /^micromark-util-normalize-identifier*/,
    /^decode-named-character-reference*/,
    /^unist-util-stringify-position*/,
    /^unified*/,
    /^zwitch*/,
    /^unist-util-visit*/,
    /^character-entities*/,
    /^longest-streak*/,
    /^vfile*/,
    /^trough*/,
    /^unist-util-is*/,
    /^bail*/,
  ],
};
