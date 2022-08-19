import { json } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react";
import Copy from "~/components/Copy";
import { processMarkdown } from "~/markdown.server";
import PageLayout from "../../components/PageLayout";
import CMS from "../../services/cms.server";
import { getMDXComponent } from "mdx-bundler/client";
import { useEffect, useMemo } from "react";
import Title from "~/components/Title";
import Feedback from "~/components/Feedback";
import Bio from "~/components/Bio";

export const loader = async ({ params, request }) => {
  const { slug } = params;
  const { post, markdown } = await CMS.getPost(slug);
  const { code } = await processMarkdown(markdown);

  return json({ slug, code, post, url: request.url });
};

export default () => {
  const data = useLoaderData();
  const { code, post, slug } = data;
  const { title, date, lastUpdated } = post;
  const MarkupComponent = useMemo(() => getMDXComponent(code), [code]);

  useEffect(() => require("@ramseyinhouse/feedback-component"), []);

  return (
    <PageLayout narrow={true}>
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

      <div className="max-w-xl mx-auto">
        <Feedback slug={slug} />
        <Bio />
      </div>

    </PageLayout>
  );
};
