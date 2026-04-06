import { colors } from "@/src/constants/colors";
import { View } from "react-native";
import Markdown from "react-native-markdown-display";

export default function MessageRenderer({ text }: { text: string }) {
  return (
    <View style={{ marginTop: 4 }}>
      <Markdown
        style={{
          body: {
            color: colors.dark,
            fontSize: 14,
            lineHeight: 20,
          },

          /* HEADINGS */
          heading1: {
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 6,
          },

          heading2: {
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 4,
          },

          /* BOLD / ITALIC */
          strong: {
            fontWeight: "700",
          },
          em: {
            fontStyle: "italic",
          },

          /* LIST */
          bullet_list: {
            marginVertical: 4,
          },
          list_item: {
            flexDirection: "row",
            marginBottom: 2,
          },

          /* CODE INLINE */
          code_inline: {
            backgroundColor: "#f1f1f1",
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 6,
            fontFamily: "monospace",
          },

          /* CODE BLOCK */
          code_block: {
            backgroundColor: "#111",
            color: "#fff",
            padding: 10,
            borderRadius: 10,
            marginVertical: 6,
          },

          /* LINKS */
          link: {
            color: colors.primary,
            textDecorationLine: "underline",
          },

          /* BLOCKQUOTE */
          blockquote: {
            borderLeftWidth: 3,
            borderLeftColor: colors.primary,
            paddingLeft: 10,
            opacity: 0.8,
          },
        }}
      >
        {text}
      </Markdown>
    </View>
  );
}