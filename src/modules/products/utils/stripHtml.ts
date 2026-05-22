// export const stripHtml = (html?: string) =>
//   html ? html.replace(/<[^>]+>/g, "").trim() : "";

export const stripHtml = (html?: string): string => {
  if (!html) return "";

  return (
    html
      // Remove HTML tags
      .replace(/<[^>]+>/g, "")

      // Replace HTML entities
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")

      // Remove extra spaces/new lines
      .replace(/\s+/g, " ")
      .trim()
  );
};
