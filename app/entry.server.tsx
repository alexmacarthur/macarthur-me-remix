import { EntryContext, redirect } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { findRedirect } from "./redirects.server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const redirectObj = findRedirect(request);

  if (redirectObj) {
    const { destination, status } = redirectObj;

    return redirect(destination, status);
  }

  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  // 1 hour, 6 months.
  responseHeaders.set(
    "Cache-Control",
    "public, max-age=3600, s-maxage=3600, stale-while-revalidate=15780000"
  );

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
