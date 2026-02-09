export const stripHtml = (html?: string) =>
  html ? html.replace(/<[^>]+>/g, "").trim() : "";
