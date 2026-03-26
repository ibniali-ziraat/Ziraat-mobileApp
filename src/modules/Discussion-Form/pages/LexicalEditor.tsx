import { forwardRef } from "react";
import { WebView } from "react-native-webview";
import { lexicalHTML } from "../lexicalHTML";

type Props = {
  onChange: (val: string) => void;
};

const LexicalEditor = forwardRef<WebView, Props>(({ onChange }, ref) => {
  return (
    <WebView
      ref={ref}
      originWhitelist={["*"]}
      javaScriptEnabled
      domStorageEnabled
      mixedContentMode="always"
      keyboardDisplayRequiresUserAction={false}
      androidLayerType="software"
      nestedScrollEnabled={true}
      scrollEnabled={false}
      onMessage={(e) => onChange(e.nativeEvent.data)}
      source={{ html: lexicalHTML }}
    />
  );
});

LexicalEditor.displayName = "LexicalEditor";

export default LexicalEditor;
