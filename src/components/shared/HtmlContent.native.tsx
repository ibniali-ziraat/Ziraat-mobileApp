import { colors } from "@/src/constants/colors";
import { useState } from "react";
import { ActivityIndicator, Linking, View } from "react-native";
import WebView, { type WebViewMessageEvent } from "react-native-webview";
import { buildHtmlDocument } from "./htmlDocument";

// a real https origin is needed or embedded players (YouTube) refuse to load
const BASE_URL = "https://localhost/";

type Props = { html: string };

// Renders CMS HTML in a WebView so full CSS (grid, flex, etc.) works exactly
// like in a browser, and grows to its content so the screen scrolls normally.
export default function HtmlContent({ html }: Props) {
  const [height, setHeight] = useState(0);

  const onMessage = (event: WebViewMessageEvent) => {
    const next = Number(event.nativeEvent.data);
    if (Number.isFinite(next) && next > 0) setHeight(next);
  };

  return (
    <View style={{ minHeight: 120 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: buildHtmlDocument(html), baseUrl: BASE_URL }}
        style={{ height, backgroundColor: "transparent" }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        javaScriptEnabled
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        onMessage={onMessage}
        // links leave the app to the system browser; the page itself and
        // embedded frames (iframes) keep loading in place
        onShouldStartLoadWithRequest={(request) => {
          const { url, isTopFrame } = request as typeof request & {
            isTopFrame?: boolean;
          };
          if (isTopFrame === false) return true;
          if (url === "about:blank" || url.startsWith(BASE_URL)) return true;
          if (/^(https?|mailto|tel):/i.test(url)) Linking.openURL(url);
          return false;
        }}
      />
      {height === 0 && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            paddingTop: 48,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
}
