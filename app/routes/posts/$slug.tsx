import type { WithContext, BlogPosting } from "schema-dts";
import { json, MetaFunction, redirect } from "@remix-run/node";
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
import { MY_NAME, SITE_URL } from "~/constants";
import CommentsService from "~/services/comments.server";
import { JamComments } from "@jam-comments/next";

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
  if (post.externalUrl) {
    return redirect(post.externalUrl);
  }

  const comments = await CommentsService.byPath(slug);

  const { code } = await processMarkdown(markdown);
  const scriptsToLoad = vendorScripts
    .filter(({ pattern }) => pattern.test(markdown))
    .map((s) => s.src);

  return json({
    comments,
    jamCommentsDomain: process.env.JAM_COMMENTS_DOMAIN,
    jamCommentsApiKey: process.env.JAM_COMMENTS_API_KEY,
    slug,
    code,
    post,
    url: request.url,
    scriptsToLoad,
  });
};

export const handle = {
  structuredData(data) {
    const { post, url } = data;

    try {
      let postSchema: WithContext<BlogPosting> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        datePublished: post.date,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        headline: post.title,
        isFamilyFriendly: true,
        description: post.description,
        image: post.openGraphImage,
        author: {
          "@type": "Person",
          name: MY_NAME,
          url: SITE_URL,
        },
      };

      if (post.subtitle) {
        postSchema.alternativeHeadline = post.subtitle;
      }

      if (post.lastUpdated) {
        postSchema.dateModified = post.lastUpdated;
      }

      return postSchema;
    } catch (e: unknown) {
      console.error(e);
      return [];
    }
  },
};

export const meta: MetaFunction = ({ data }) => {
  const title = `${data.post.title} | Alex MacArthur`;
  const image = data.post.openGraphImage || null;
  return {
    title,
    description: data.post.description,
    "og:title": title,
    "twitter:description": data.post.description,
    "og:description": data.post.description,
    "og:image": image,
    "twitter:image": image,
    "og:type": "article",
  };
};

export default () => {
  const data = useLoaderData();
  const {
    code,
    post,
    slug,
    scriptsToLoad,
    comments,
    jamCommentsDomain,
    jamCommentsApiKey,
  } = data;
  const { title, date, lastUpdated, prettyDate } = post;
  const MarkupComponent = useMemo(() => getMDXComponent(code), [code]);

  useEffect(() => {
    require("@ramseyinhouse/feedback-component");

    scriptsToLoad.forEach((s: string) => {
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
        prettyDate={prettyDate}
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

      <JamComments
        comments={comments}
        domain={jamCommentsDomain}
        apiKey={jamCommentsApiKey}
      />

      <div className="mx-auto max-w-xl">
        <Feedback slug={slug} />
        <Bio />
      </div>
    </PageLayout>
  );
};
