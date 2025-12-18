import { CommentWrapper } from "@pull/github/comment";
import { getConfig } from "@util/config";

const COMMENT_LENGTH_LIMIT = Number(
  getConfig("COMMENT_LENGTH_LIMIT") || Number.MAX_SAFE_INTEGER,
);

export type CommentRenderOptions = {
  header: boolean;
  body: boolean;
  author: boolean;
  skipIfEmpty: boolean; // Skip rendering if no content
};

export type RenderedComment = {
  markdown: string;
  sources: string[];
};

export function renderComment(
  comment: CommentWrapper,
  options: CommentRenderOptions,
  headerLevel: number = 4, // Default to Level 4 for Comments
): RenderedComment | undefined {
  // Render a CommentWrapper as a Markdown string
  let markdown = "";
  const sources = [`${comment.url} - ${comment.updatedAt}`];

  if (options.header && comment.url) {
    markdown += `${"#".repeat(headerLevel)} ${comment.header}\n\n`;
  }

  if (options.author && comment.author) {
    markdown += `**Update Author:** ${comment.author}\n\n`;
  }

  let content;
  if (comment.isUpdate) {
    content = comment._update;
  } else {
    content = comment._body;
  }
  content = content.slice(0, COMMENT_LENGTH_LIMIT);

  markdown += content;

  if (markdown.trim() === "") {
    if (options.skipIfEmpty) {
      return undefined;
    }
    markdown += "No Updates found.";
    return { markdown, sources: [] };
  }

  markdown += `\n\n`;

  return {
    markdown,
    sources,
  };
}
