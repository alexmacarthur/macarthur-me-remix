import { json } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react";
import { processMarkdown } from "~/markdown.server";
import PageLayout from "../../components/PageLayout";
import CMS from "../../services/cms.server";

export const loader = async ({ params }) => {
  const { slug } = params;
  const { post, markdown } = await CMS.getPost(slug);

  const markup = processMarkdown(markdown);

  return json({ slug, markup, post });
};

export default () => {
  const data = useLoaderData();

  const { markup, post } = data;
  const { openGraphImage } = post;

  return (
    <PageLayout>
      here: {openGraphImage}
      <>
        {/* <Title
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
        ></div> */}

         <div
          className="post-content prose md:prose-lg mx-auto max-w-none"
          dangerouslySetInnerHTML={{ __html: markup }}
        ></div>
      </>
    </PageLayout>
  );
};
