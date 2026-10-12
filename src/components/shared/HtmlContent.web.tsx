import { createElement, useEffect, useRef, useState } from "react";
import { buildHtmlDocument } from "./htmlDocument";

type Props = { html: string };

// Web: a sandboxed iframe (no scripts) gives the same browser CSS fidelity
// the native WebView does, sized to its content.
export default function HtmlContent({ html }: Props) {
  const ref = useRef<HTMLIFrameElement | null>(null);
  const [height, setHeight] = useState(200);

  const measure = () => {
    const doc = ref.current?.contentDocument;
    if (doc?.body) setHeight(Math.ceil(doc.body.getBoundingClientRect().height));
  };

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return createElement("iframe", {
    ref,
    srcDoc: buildHtmlDocument(html, false),
    sandbox: "allow-same-origin allow-popups allow-popups-to-escape-sandbox",
    onLoad: measure,
    style: { width: "100%", height, border: 0, display: "block" },
  });
}
