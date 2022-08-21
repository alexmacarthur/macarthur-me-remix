import { json, MetaFunction, redirect } from "@remix-run/node"; // or "@remix-run/cloudflare"
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
import { TWITTER_HANDLE } from "~/constants";

export const loader = async ({ params, request }) => {
  const vendorScripts = [
    {
      src: "https://cpwebassets.codepen.io/assets/embed/ei.js",
      pattern: new RegExp("codepen.io/(.+)/pen/(.+)"),
    },
  ];

  const { slug } = params;
  const { post, markdown } = await CMS.getPost(slug);

  // It's an external post, and will never have a dedicated post page here.
  if(post.externalUrl) {
    return redirect(post.externalUrl);
  }

  const { code } = await processMarkdown(markdown);
  const scriptsToLoad = vendorScripts
    .filter(({ pattern }) => pattern.test(markdown))
    .map((s) => s.src);

  return json({ slug, code, post, url: request.url, scriptsToLoad });
};

export const meta: MetaFunction = ({ data }) => {
  const title = `${data.post.title} | Alex MacArthur`;
  const image = data.post.openGraphImage || null;
  return {
    title,
    "og:title": title,
    description: data.post.description,
    "twitter:card": "summary_large_image",
    "twitter:description": data.post.description,
    "og:description": data.post.description,
    "og:image": image,
    "twitter:image": image,
    "og:type": "article",
    "twitter:creator": TWITTER_HANDLE,
  };
};

export default () => {
  const data = useLoaderData();
  const { code, post, slug, scriptsToLoad } = data;
  const { title, date, lastUpdated } = post;
  const MarkupComponent = useMemo(() => getMDXComponent(code), [code]);

  useEffect(() => {
    require("@ramseyinhouse/feedback-component");

    scriptsToLoad.forEach((s) => {
      const script = document.createElement("script");
      script.async = true;
      script.src = s;

      document.body.insertBefore(script, null);
    });
  }, []);

  return (
    <PageLayout narrow={true}>
      <Title
        date={date}
        isPost={true}
        subtitle={post.subtitle}
        lastUpdated={lastUpdated}
        views={post.views}
      >
        {title}
      </Title>

      <Copy>
        <MarkupComponent />
      </Copy>

      <div className="mx-auto max-w-xl">
        <Feedback slug={slug} />
        <Bio />
      </div>
    </PageLayout>
  );
};
