import { json } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react";
import Copy from "~/components/Copy";
import { processMarkdown } from "~/markdown.server";
import PageLayout from "../../components/PageLayout";
import CMS from "../../services/cms.server";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import Component from "../about";
import Title from "~/components/Title";

export const loader = async ({ params, request }) => {
  const { slug } = params;
  const { post, markdown } = await CMS.getPost(slug);
  const { code } = await processMarkdown(markdown);

  return json({ slug, code, post, url: request.url });
};

export default () => {
  const data = useLoaderData();

  const { code, post, slug } = data;
  console.log(post.views);

  const { openGraphImage, title, date, lastUpdated } = post;

  const MarkupComponent = useMemo(() => getMDXComponent(code), [code]);

  return (
    <PageLayout>
      <Title
        date={date}
        isPost={true}
        // subTitle={subTitle}
        lastUpdated={lastUpdated}
        views={post.views}
      >
        {title}
      </Title>

      <Copy>
        <MarkupComponent />
      </Copy>
    </PageLayout>
  );
};
