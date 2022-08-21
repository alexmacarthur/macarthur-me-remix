import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { DESCRIPTION, TITLE } from "./constants";

import styles from "./styles/style.css";

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

export const meta: MetaFunction = () => ({
  title: TITLE,
  description: DESCRIPTION,
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
        <script
          defer
          data-domain="macarthur.me"
          src="/js/numbers.js"
        ></script>
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
