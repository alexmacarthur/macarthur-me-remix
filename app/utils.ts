import { useMatches } from "@remix-run/react";
import { useMemo } from "react";
import { SITE_URL } from "./constants";
import { stripMarkdown } from "./markdown.server";

const DEFAULT_REDIRECT = "/";

export function generateExcerpt(content: string, wordCount = 50) {
  const strippedContent = stripMarkdown(content)
    .replace(/\s\s+/g, " ")
    .replace(/\r?\n|\r/g, "")
    .replace(/\S+\.(gif|png|jpe?g)/g, ""); // Remove images.
  const words = strippedContent.split(" ");

  return words.slice(0, wordCount).join(" ") + "...";
}

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

export function useRequestPath(): string {
  return (useMatchesData("root")?.REQUEST_PATH as string) || "";
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

export const randomInRange = (min, max): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const fullUrlFromPath = (path) => {
  return `${SITE_URL}${path}`;
};

export const prefersReducedMotion = () => {
  if (typeof window == undefined) return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)")?.matches;
};

export function createObserver(imageElement, callback: () => any) {
  const options = {
    rootMargin: "100px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(imageElement);
      }
    });
  }, options);

  return {
    observe: () => observer.observe(imageElement),
    kill: () => observer.unobserve(imageElement),
  };
}

export function activateImage(imageElement, loadCallback) {
  imageElement.addEventListener("load", loadCallback);
  imageElement.src = imageElement.dataset.lazySrc;
}
