import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { StructuredData } from "remix-utils";
import {
  DESCRIPTION,
  OG_IMAGE,
  SITE_URL,
  TITLE,
  TWITTER_HANDLE,
} from "./constants";

import styles from "./styles/style.css";

export const handle = {
  structuredData() {
    let schema = {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: SITE_URL,
      name: TITLE,
    };

    return schema;
  },
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png",
    },
    { rel: "manifest", href: "/favicon/site.webmanifest" },
    { rel: "shortcut icon", href: "/favicon/favicon.ico" },
  ];
};

export const meta: MetaFunction = () => {
  return {
    title: TITLE,
    description: DESCRIPTION,
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
    "og:title": TITLE,
    "twitter:card": "summary_large_image",
    "og:description": DESCRIPTION,
    "og:image": OG_IMAGE,
    "twitter:image": OG_IMAGE,
    "twitter:creator": TWITTER_HANDLE,
    "twitter:description": DESCRIPTION,
    "og:type": "website",
  };
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
        <StructuredData />
        <script defer data-domain="macarthur.me" src="/js/numbers.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.plausible = window.plausible || function() {(window.plausible.q = window.plausible.q || []).push(arguments)}",
          }}
        ></script>
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
