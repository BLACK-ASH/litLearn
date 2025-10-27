"use server";

import { Window } from "happy-dom";
import createDOMPurify from "dompurify";

export async function sanitizeHTML(dirty: string): Promise<string> {
  // Create a virtual window using happy-dom
  const window = new Window();
  const DOMPurify = createDOMPurify(
    window as unknown as Window & typeof globalThis,
  );

  return DOMPurify.sanitize(dirty, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      "p",
      "b",
      "i",
      "u",
      "strong",
      "em",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "a",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "span",
      "div",
      "br",
      "img",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "style"],
  });
}
