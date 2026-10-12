import { colors } from "@/src/constants/colors";

// admin HTML can arrive with scripts/inline handlers — the server should
// sanitize on save, this is a second line of defence before rendering
const sanitize = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");

// Base stylesheet so CMS pages sit naturally inside the app. Native fonts
// bundled with the app aren't visible to a WebView, so use the system stack.
const baseCss = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: ${colors.light}; }
  body {
    display: flow-root;
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 1.6;
    color: ${colors.neutral};
    word-wrap: break-word;
    overflow-wrap: anywhere;
  }
  img, video, iframe, table { max-width: 100%; }
  img, video { height: auto; }
  a { color: ${colors.primary}; }
  h1, h2, h3 { color: ${colors.dark}; }
`;

// reports the rendered height so the host can size itself; ResizeObserver
// also catches late-loading images
const heightScript = `
  (function () {
    var last = 0;
    function send() {
      var h = Math.ceil(document.body.getBoundingClientRect().height);
      if (h && h !== last) {
        last = h;
        var msg = String(h);
        if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(msg);
        else window.parent.postMessage({ htmlHeight: h }, "*");
      }
    }
    window.addEventListener("load", send);
    window.addEventListener("resize", send);
    if (window.ResizeObserver) new ResizeObserver(send).observe(document.body);
    send();
  })();
`;

export const buildHtmlDocument = (body: string, withHeightScript = true) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <style>${baseCss}</style>
  </head>
  <body>${sanitize(body)}${withHeightScript ? `<script>${heightScript}</script>` : ""}</body>
</html>`;
