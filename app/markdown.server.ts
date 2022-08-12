import { remark } from "remark";
import { bundleMDX } from "mdx-bundler";
import strip from "strip-markdown";
import path from "path";
import { getMarkdownPlugins } from "~/shared";

if (process.platform === "win32") {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    "node_modules",
    "esbuild",
    "esbuild.exe"
  );
} else {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    "node_modules",
    "esbuild",
    "bin",
    "esbuild"
  );
}

export async function processMarkdown(rawMarkdown: string): Promise<{
  code: string;
  frontmatter: any;
}> {
  const [remarkPlugins, rehypePlugins] = await getMarkdownPlugins();

  return await bundleMDX({
    source: rawMarkdown,
    mdxOptions: (options) => ({
      remarkPlugins: [...(options.remarkPlugins ?? []), ...remarkPlugins],
      rehypePlugins: [...(options.rehypePlugins ?? []), ...rehypePlugins],
    }),
  });
}

export function stripMarkdown(markdown: string) {
  const result = remark().use(strip).processSync(markdown);

  return result.toString();
}
