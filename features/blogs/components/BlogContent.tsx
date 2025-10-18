import { sanitizeHTML } from "@/features/create-blog/actions/sanitizeHtml";
import React from "react";
interface BlogContentProps {
  html: string|undefined;
}
const BlogContent =async ({ html }: BlogContentProps) => {
  if (!html) return null;
  const cleanHTML = await sanitizeHTML(html);
  return (
    <div>
      <div
        className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      />
    </div>
  );
};

export default BlogContent;
