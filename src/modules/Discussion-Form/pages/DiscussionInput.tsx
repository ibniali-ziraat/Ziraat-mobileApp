// import { colors } from "@/src/constants/colors";
// import * as ImagePicker from "expo-image-picker";
// import {
//   Bold,
//   Camera,
//   Code,
//   Image as ImageIcon,
//   Italic,
//   Link2,
//   List,
//   Send,
//   X,
// } from "lucide-react-native";
// import { useEffect, useRef, useState } from "react";
// import {
//   Image,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import ScreenLayout from "@/src/components/shared/ScreenLayout";
// import { Post } from "../screen/ChatScreen";

// type Props = {
//   message: string;
//   setMessage: (v: string) => void;
//   replyTo: Post | null;
//   setReplyTo: (v: Post | null) => void;
//   onSend: (text: string) => void;
//   inputText: string;
//   setInputText: (v: string) => void;
// };

// export default function DiscussionInput({
//   message,
//   setMessage,
//   replyTo,
//   setReplyTo,
//   onSend,
//   inputText,
//   setInputText,
// }: Props) {
//   const inputRef = useRef<TextInput>(null);
//   const [image, setImage] = useState<string | null>(null);

//   useEffect(() => {
//     if (inputText) {
//       setMessage(inputText);
//       setInputText("");
//       setTimeout(() => inputRef.current?.focus(), 100);
//     }
//   }, [inputText]);

//   const handleSend = () => {
//     if (!message.trim() && !image) return;

//     const finalText = image
//       ? `${message}\n📷 ${image}`
//       : message;

//     onSend(finalText.trim());
//     setMessage("");
//     setImage(null);
//   };

//   /* ========= FORMAT HELPERS ========= */
//   const wrapText = (before: string, after: string = before) => {
//     setMessage((prev) => prev + `${before}text${after}`);
//     setTimeout(() => inputRef.current?.focus(), 100);
//   };

//   const addList = () => {
//     setMessage((prev) => prev + "\n- ");
//   };

//   const addCodeBlock = () => {
//     setMessage((prev) => prev + "\n```\ncode\n```");
//   };

//   /* CAMERA */
//   const openCamera = async () => {
//     const res = await ImagePicker.launchCameraAsync();
//     if (!res.canceled) setImage(res.assets[0].uri);
//   };

//   /* GALLERY */
//   const pickImage = async () => {
//     const res = await ImagePicker.launchImageLibraryAsync();
//     if (!res.canceled) setImage(res.assets[0].uri);
//   };

//   /* LINK */
//   const addLink = () => {
//     setMessage((prev) => prev + "[title](https://)");
//   };

//   return (
//     <ScreenLayout>
//       <View
//       style={{
//         backgroundColor: colors.light,
//         borderTopWidth: 1,
//         borderTopColor: colors.cardBorder,
//         paddingHorizontal: 16,
//         paddingTop: 10,
//         paddingBottom: 28,
//       }}
//     >
//       {/* Reply Banner */}
//       {replyTo && (
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             backgroundColor: colors.primary + "0e",
//             borderRadius: 8,
//             padding: 8,
//             marginBottom: 8,
//           }}
//         >
//           <Text style={{ fontSize: 12, color: colors.primary }}>
//             Replying to {replyTo.author}
//           </Text>
//           <TouchableOpacity onPress={() => setReplyTo(null)}>
//             <X size={14} color={colors.primary} />
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Image Preview */}
//       {image && (
//         <Image
//           source={{ uri: image }}
//           style={{ width: 60, height: 60, borderRadius: 8, marginBottom: 6 }}
//         />
//       )}

//       {/* ===== TOOLBAR ===== */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={{ marginBottom: 6 }}
//       >
//         <View style={{ flexDirection: "row", gap: 14 }}>
//           <TouchableOpacity onPress={() => wrapText("**")}>
//             <Bold size={16} color="#666" />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => wrapText("*")}>
//             <Italic size={16} color="#666" />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={addList}>
//             <List size={16} color="#666" />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={addCodeBlock}>
//             <Code size={16} color="#666" />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={addLink}>
//             <Link2 size={16} color="#666" />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={openCamera}>
//             <Camera size={16} color="#666" />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={pickImage}>
//             <ImageIcon size={16} color="#666" />
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* INPUT + SEND */}
//       <View style={{ flexDirection: "row", gap: 8 }}>
//         <TextInput
//           ref={inputRef}
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Write something..."
//           multiline
//           style={{
//             flex: 1,
//             borderWidth: 1.5,
//             borderColor: message ? colors.primary : "#ddd",
//             borderRadius: 12,
//             padding: 12,
//             minHeight: 44,
//             maxHeight: 120,
//             backgroundColor: "#fafafa",
//           }}
//         />

//         <TouchableOpacity
//           onPress={handleSend}
//           disabled={!message.trim() && !image}
//           style={{
//             width: 44,
//             height: 44,
//             borderRadius: 12,
//             backgroundColor:
//               message.trim() || image ? colors.primary : "#ddd",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Send size={18} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     </View>
//     </ScreenLayout>
//   );
// }


import { colors } from "@/src/constants/colors";
import * as ImagePicker from "expo-image-picker";
import {
  Bold,
  Camera,
  Code,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  Send,
  X,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Post } from "../screen/ChatScreen";

type Props = {
  message: string;
  setMessage: (v: string) => void;
  replyTo: Post | null;
  setReplyTo: (v: Post | null) => void;
  onSend: (text: string) => void;
  inputText: string;
  setInputText: (v: string) => void;
};

export default function DiscussionInput({
  message,
  setMessage,
  replyTo,
  setReplyTo,
  onSend,
  inputText,
  setInputText,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (inputText) {
      setMessage(inputText);
      setInputText("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [inputText]);

  const handleSend = () => {
    if (!message.trim() && !image) return;

    const finalText = image
      ? `${message}\n📷 ${image}`
      : message;

    onSend(finalText.trim());
    setMessage("");
    setImage(null);
  };

  const wrapText = (before: string, after: string = before) => {
    setMessage((prev) => prev + `${before}text${after}`);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const addList = () => setMessage((prev) => prev + "\n- ");
  const addCodeBlock = () => setMessage((prev) => prev + "\n```\ncode\n```");
  const addLink = () => setMessage((prev) => prev + "[title](https://)");

  const openCamera = async () => {
    const res = await ImagePicker.launchCameraAsync();
    if (!res.canceled) setImage(res.assets[0].uri);
  };

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync();
    if (!res.canceled) setImage(res.assets[0].uri);
  };

  return (
    <View
      style={{
        backgroundColor: colors.light,
        borderTopWidth: 1,
        borderTopColor: colors.cardBorder,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 12,
      }}
    >
      {/* Reply */}
      {replyTo && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: colors.primary + "0e",
            borderRadius: 8,
            padding: 8,
            marginBottom: 8,
          }}
        >
          <Text style={{ fontSize: 12, color: colors.primary }}>
            Replying to {replyTo.author}
          </Text>
          <TouchableOpacity onPress={() => setReplyTo(null)}>
            <X size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>
      )}

      {/* Image */}
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 60, height: 60, borderRadius: 8, marginBottom: 6 }}
        />
      )}

      {/* Toolbar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 14, marginBottom: 6 }}>
          <TouchableOpacity onPress={() => wrapText("**")}>
            <Bold size={16} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => wrapText("*")}>
            <Italic size={16} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={addList}>
            <List size={16} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={addCodeBlock}>
            <Code size={16} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={addLink}>
            <Link2 size={16} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openCamera}>
            <Camera size={16} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <ImageIcon size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Input */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          ref={inputRef}
          value={message}
          onChangeText={setMessage}
          placeholder="Ask your question..."
          multiline
          style={{
            flex: 1,
            borderWidth: 1.5,
            borderColor: message ? colors.primary : "#ddd",
            borderRadius: 12,
            padding: 12,
            minHeight: 44,
            maxHeight: 120,
            backgroundColor: "#fafafa",
          }}
        />

        <TouchableOpacity
          onPress={handleSend}
          disabled={!message.trim() && !image}
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor:
              message.trim() || image ? colors.primary : "#ddd",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Send size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}