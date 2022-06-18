import { json } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react";
import PageLayout from "../../components/PageLayout";
import Title from "../../components/Title";
import { findFiles } from "../../files.server";
import Post from "../../models/Post.server";

const findRootFile = (filePath) => {
  if (filePath.endsWith(".md")) {
    return filePath;
  }

  return `${filePath}/index.md`;
};

export const loader = async ({ params }) => {
  const { slug } = params;

  const files = findFiles(`*${slug}`).filter((file) => {
    return file.endsWith(slug) || file.endsWith("index.md");
  });

  if (!files.length) {
    throw new Error("404!");
  }

  const file = findRootFile(files[0]);
  const post = new Post(file);

  return json({ slug, file, content: post.getContent() });
};

export default () => {
  const data = useLoaderData();

  const { content, date, title, subTitle, lastUpdated } = data.content;

  return (
    <PageLayout>
      <>
        <Title
          date={date}
          isPost={false}
          subTitle={subTitle}
          lastUpdated={lastUpdated}
          views={0}
        >
          {title}
        </Title>

        <div
          className="post-content prose md:prose-lg mx-auto max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </>
    </PageLayout>
  );
};
