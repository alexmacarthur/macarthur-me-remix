import { json } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react";
import Copy from "~/components/Copy";
import { processMarkdown } from "~/markdown.server";
import PageLayout from "../../components/PageLayout";
import CMS from "../../services/cms.server";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

export const loader = async ({ params, request }) => {
  const { slug } = params;
  const { post, markdown } = await CMS.getPost(slug);
  const { code } = await processMarkdown(markdown);

  return json({ slug, code, post, url: request.url });
};

export default () => {
  const data = useLoaderData();

  const { code, post, slug } = data;

  const { openGraphImage } = post;

  const MarkupComponent = useMemo(() => getMDXComponent(code), [code]);

  return (
    <PageLayout>
      here: {openGraphImage}
      page: {slug}
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

        <MarkupComponent />

        {/* <Copy markup={markup} /> */}
      </>
    </PageLayout>
  );
};
