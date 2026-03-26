import { colors } from "@/src/constants/colors";
import {
    Bold,
    Italic,
    List,
    Mic,
    Paperclip,
    Send,
    Smile,
} from "lucide-react-native";
import { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

export default function DiscussionInput() {
  const webRef = useRef<any>(null);
  const [html, setHtml] = useState("");

  const isEmpty =
    !html || html === "<br>" || html === "<div><br></div>";

  const editorHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, sans-serif;
          padding: 6px;
          margin: 0;
          color: #000;
        }
        #editor {
          min-height: 40px;
          outline: none;
        }
        #editor:empty:before {
          content: "Message...";
          color: #9ca3af;
        }
      </style>
    </head>
    <body>
      <div id="editor" contenteditable="true"></div>

      <script>
        const editor = document.getElementById("editor");

        editor.addEventListener("input", () => {
          window.ReactNativeWebView.postMessage(editor.innerHTML);
        });

        function format(cmd) {
          document.execCommand(cmd, false, null);
        }

        function clearEditor() {
          editor.innerHTML = "";
        }

        window.format = format;
        window.clearEditor = clearEditor;
      </script>
    </body>
    </html>
  `;

  const runCommand = (cmd: string) => {
    webRef.current?.injectJavaScript(`
      window.format("${cmd}");
      true;
    `);
  };

  const handleSend = () => {
    if (isEmpty) return;

    console.log("Message:", html);

    setHtml("");

    webRef.current?.injectJavaScript(`
      window.clearEditor();
      true;
    `);
  };

  return (
    <View
      style={{
        backgroundColor: colors.light,
        borderTopWidth: 1,
        borderColor: colors.cardBorder,
        padding: 8,
      }}
    >
      {/*  MAIN INPUT ROW */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        {/*  INPUT CONTAINER */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end",
            backgroundColor: colors.bgColor,
            borderRadius: 25,
            paddingHorizontal: 10,
            paddingVertical: 6,
          }}
        >
          {/*  Emoji */}
          <TouchableOpacity style={{ marginRight: 6 }}>
            <Smile size={22} color={colors.darkHover} />
          </TouchableOpacity>

          {/*  Editor */}
          <View
            style={{
              flex: 1,
              minHeight: 40,
              maxHeight: 120,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <WebView
              ref={webRef}
              originWhitelist={["*"]}
              source={{ html: editorHTML }}
              onMessage={(event) => setHtml(event.nativeEvent.data)}
              scrollEnabled={false}
            />
          </View>

          {/* 📎 Attachment */}
          <TouchableOpacity style={{ marginLeft: 6 }}>
            <Paperclip size={20} color={colors.darkHover} />
          </TouchableOpacity>
        </View>

        {/*  ACTION BUTTON (Dynamic) */}
        <TouchableOpacity
          onPress={handleSend}
          style={{
            marginLeft: 8,
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
            elevation: 6,
          }}
        >
          {isEmpty ? (
            <Mic size={20} color="#fff" />
          ) : (
            <Send size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      {/* 🔹 TOOLBAR (Optional Formatting) */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 6,
        }}
      >
        <ToolbarButton onPress={() => runCommand("bold")}>
          <Bold size={16} color={colors.darkHover} />
        </ToolbarButton>

        <ToolbarButton onPress={() => runCommand("italic")}>
          <Italic size={16} color={colors.darkHover} />
        </ToolbarButton>

        <ToolbarButton onPress={() => runCommand("insertUnorderedList")}>
          <List size={16} color={colors.darkHover} />
        </ToolbarButton>
      </View>
    </View>
  );
}

/* 🔹 Toolbar Button */
function ToolbarButton({ children, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginRight: 10,
        padding: 6,
        borderRadius: 8,
        backgroundColor: "#f3f4f6",
      }}
    >
      {children}
    </TouchableOpacity>
  );
}