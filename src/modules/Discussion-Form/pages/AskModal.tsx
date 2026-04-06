// import { HelpCircle, Send, X } from "lucide-react-native";
// import { useState } from "react";
// import {
//   Dimensions,
//   Modal,
//   Pressable,
//   Text,
//   TextInput,
//   View
// } from "react-native";

// import ScreenLayout from "@/src/components/shared/ScreenLayout";

// const { height } = Dimensions.get("window");

// const G = {
//   primary: "#2d6b06",
//   primaryLight: "#e8f3e1",
//   primaryBorder: "#c8e0b8",
//   text: "#1a1a1a",
//   textSoft: "#888",
//   border: "#e5e5e5",
// };

// type Props = {
//   visible: boolean;
//   onClose: () => void;
//   onSubmit: (title: string, body: string, tags: string[]) => void;
// };

// export default function AskModal({ visible, onClose, onSubmit }: Props) {
//   const [body, setBody] = useState("");
//   const [tagsRaw, setTagsRaw] = useState("");

//   const tags = tagsRaw
//     .split(",")
//     .map((t) => t.trim())
//     .filter(Boolean);

//   const canSubmit = body.trim().length > 0;

//   const handleSubmit = () => {
//     if (!canSubmit) return;
//     onSubmit("", body, tags);
//     setBody("");
//     setTagsRaw("");
//     onClose();
//   };

//   const removeTag = (index: number) => {
//     setTagsRaw(tags.filter((_, i) => i !== index).join(", "));
//   };

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={{ flex: 1, justifyContent: "flex-end" }}>
        
//         {/* BACKDROP */}
//         <Pressable
//           onPress={onClose}
//           style={{
//             position: "absolute",
//             top: 0,
//             bottom: 0,
//             left: 0,
//             right: 0,
//             backgroundColor: "rgba(0,0,0,0.45)",
//           }}
//         />

//         {/* SHEET */}
//         <ScreenLayout scrollable keyboardOffset={80}>
//           <View
//             style={{
//               maxHeight: height * 0.88,
//               backgroundColor: "#fff",
//               borderTopLeftRadius: 28,
//               borderTopRightRadius: 28,
//               overflow: "hidden",
//             }}
//           >
//             {/* TOP BAR */}
//             <View style={{ height: 4, backgroundColor: G.primary }} />

//             {/* HANDLE */}
//             <View
//               style={{
//                 width: 38,
//                 height: 4,
//                 borderRadius: 10,
//                 backgroundColor: "#e0e0e0",
//                 alignSelf: "center",
//                 marginTop: 12,
//                 marginBottom: 18,
//               }}
//             />

//             {/* HEADER */}
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 paddingHorizontal: 20,
//                 marginBottom: 20,
//                 gap: 12,
//               }}
//             >
//               <View
//                 style={{
//                   width: 44,
//                   height: 44,
//                   borderRadius: 13,
//                   backgroundColor: G.primaryLight,
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <HelpCircle size={20} color={G.primary} />
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={{ fontSize: 18, fontWeight: "800", color: G.text }}>
//                   Ask a Question
//                 </Text>
//                 <Text style={{ fontSize: 12, color: G.textSoft }}>
//                   Be specific and clear
//                 </Text>
//               </View>

//               {/* POST */}
//               <Pressable
//                 onPress={handleSubmit}
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   paddingHorizontal: 14,
//                   paddingVertical: 9,
//                   borderRadius: 10,
//                   backgroundColor: canSubmit ? G.primary : "#ddd",
//                 }}
//               >
//                 <Send size={13} color="#fff" />
//                 <Text style={{ color: "#fff", fontWeight: "700", marginLeft: 4 }}>
//                   Post
//                 </Text>
//               </Pressable>

//               {/* CLOSE */}
//               <Pressable
//                 onPress={onClose}
//                 style={{
//                   marginLeft: 8,
//                   width: 36,
//                   height: 36,
//                   borderRadius: 12,
//                   backgroundColor: "#f3f3f3",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <X size={15} color="#777" />
//               </Pressable>
//             </View>

//             {/* CONTENT */}
//             <View style={{ paddingHorizontal: 20 }}>
              
//               {/* QUESTION LABEL */}
//               <Text style={{ fontSize: 13, fontWeight: "700", marginBottom: 6 }}>
//                 Question
//               </Text>

//               {/* QUESTION INPUT */}
//               <View
//                 style={{
//                   borderWidth: 1,
//                   borderColor: G.border,
//                   borderRadius: 12,
//                   padding: 12,
//                   marginBottom: 16,
//                 }}
//               >
//                 <TextInput
//                   value={body}
//                   onChangeText={setBody}
//                   placeholder="Describe your problem in detail..."
//                   multiline
//                   style={{
//                     minHeight: 120,
//                     fontSize: 14,
//                     color: G.text,
//                     textAlignVertical: "top",
//                   }}
//                 />
//               </View>

              

//               {/* FOOTER */}
//               <Pressable
//                 onPress={onClose}
//                 style={{
//                   marginTop: 30,
//                   borderWidth: 1,
//                   borderRadius: 14,
//                   padding: 14,
//                   alignItems: "center",
//                 }}
//               >
//                 <Text style={{ fontWeight: "600" }}>Cancel</Text>
//               </Pressable>
//             </View>
//           </View>
//         </ScreenLayout>
//       </View>
//     </Modal>
//   );
// }



import { HelpCircle, X } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

import ScreenLayout from "@/src/components/shared/ScreenLayout";
import DiscussionInput from "./DiscussionInput";

const { height } = Dimensions.get("window");

export default function AskModal({ visible, onClose, onSubmit }) {
  const [message, setMessage] = useState("");
  const [inputText, setInputText] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    onSubmit("", text, []);
    setMessage("");
    setReplyTo(null);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        
        {/* BACKDROP */}
        <Pressable
          onPress={onClose}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        />

        {/* SHEET */}
        <View
          style={{
            height: height * 0.85,
            backgroundColor: "#fff",
            borderTopLeftRadius: 26,
            borderTopRightRadius: 26,
            overflow: "hidden",
          }}
        >
          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
            }}
          >
            <HelpCircle size={20} />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "800" }}>
                Ask Question
              </Text>
              <Text style={{ fontSize: 12, color: "#777" }}>
                Start a discussion
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                backgroundColor: "#f2f2f2",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={16} />
            </Pressable>
          </View>

          {/* MAIN LAYOUT (KEY FIX) */}
          <ScreenLayout scrollable keyboardOffset={80}>
            
            {/* CONTENT */}
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
              <Text style={{ color: "#666", marginBottom: 10 }}>
                Ask clearly so others can help you better.
              </Text>
            </View>

            {/* INPUT (NO ABSOLUTE) */}
            <DiscussionInput
              message={message}
              setMessage={setMessage}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              onSend={handleSend}
              inputText={inputText}
              setInputText={setInputText}
            />

          </ScreenLayout>
        </View>
      </View>
    </Modal>
  );
}