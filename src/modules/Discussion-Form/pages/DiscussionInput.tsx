import {
  Pressable,
  Text,
  View
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import {
  Bold,
  Camera,
  Image as ImageIcon,
  Italic,
  List,
  Send,
  X,
} from "lucide-react-native";

import { colors } from "@/src/constants/colors";
import { useEffect, useRef, useState } from "react";
import LexicalEditor from "./LexicalEditor";

export default function DiscussionInput({
  message,
  setMessage,
  replyTo,
  setReplyTo,
  onSend,
}) {

  const editorRef = useRef<any>(null);

  const [images, setImages] = useState<string[]>([]);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const [inputText, setInputText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const users = ["Rahul", "Aman", "Priya", "You"];

  /* ================= COMMAND HANDLER ================= */

  const sendCommand = (type: string, payload?: any) => {
    editorRef.current?.postMessage(
      JSON.stringify({ type, ...payload })
    );
  };

  /* ================= MENTION DETECT ================= */

  useEffect(() => {
    const lastWord = inputText.split(" ").pop();
    if (lastWord?.startsWith("@")) setShowSuggestions(true);
    else setShowSuggestions(false);
  }, [inputText]);

  const filteredUsers = users.filter((u) =>
    u.toLowerCase().includes(
      inputText.split("@").pop()?.toLowerCase()
    )
  );

  /* ================= IMAGE PICK ================= */

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!res.canceled) {
      setImages((prev) => [...prev, res.assets[0].uri]);
    }
  };

  /* ================= CAMERA ================= */

  const openCamera = async () => {
    const res = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!res.canceled) {
      setImages((prev) => [...prev, res.assets[0].uri]);
    }
  };

  /* ================= FORMAT COMMAND ================= */

  const exec = (cmd: string) => {
    setActiveTool(cmd);

    if (cmd === "bold" || cmd === "italic") {
      sendCommand("FORMAT", { command: cmd });
    } else if (cmd === "LIST") {
      sendCommand("LIST");
    }

    setTimeout(() => setActiveTool(null), 200);
  };

  /* ================= SEND ================= */

  const handleSend = () => {
    const cleanText = inputText.trim();

    if (!cleanText && images.length === 0) return;

    onSend?.(message);

    setMessage("");
    setInputText("");
    setImages([]);
    setReplyTo(null);

    sendCommand("CLEAR");
  };

  const isActive = inputText.trim() || images.length > 0;

  /* ================= AUTO REPLY ================= */

  useEffect(() => {
    if (replyTo) {
      sendCommand("INSERT", {
        text: `@${replyTo.author} `,
      });
    }
  }, [replyTo]);

  return (
    <View
      style={{
        backgroundColor: colors.light,
        paddingHorizontal: 12,
        paddingTop: 10,
        paddingBottom: 14,
        borderTopWidth: 1,
        borderColor: colors.cardBorder,
      }}
    >

      {/* ================= REPLY BAR ================= */}
      {replyTo && (
        <View
          style={{
            backgroundColor: colors.primary + "10",
            padding: 12,
            borderRadius: 14,
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            borderLeftWidth: 4,
            borderLeftColor: colors.primary,
          }}
        >
          <Text style={{ color: colors.primary, flex: 1, fontWeight: "600" }}>
            Replying to {replyTo.author}
          </Text>

          <Pressable onPress={() => setReplyTo(null)}>
            <X size={16} color={colors.primary} />
          </Pressable>
        </View>
      )}

      {/* ================= MENTIONS ================= */}
      {showSuggestions && (
        <View
          style={{
            backgroundColor: colors.light,
            borderWidth: 1,
            borderColor: colors.cardBorder,
            borderRadius: 14,
            marginBottom: 10,
            elevation: 4,
            overflow: "hidden",
          }}
        >
          {filteredUsers.map((user, index) => (
            <Pressable
              key={user}
              onPress={() => {
                sendCommand("INSERT", { text: `@${user} ` });
                setShowSuggestions(false);
              }}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 14,
                borderBottomWidth:
                  index !== filteredUsers.length - 1 ? 1 : 0,
                borderColor: colors.cardBorder,
              }}
            >
              <Text
                style={{
                  color: colors.dark,
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                {user}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* ================= EDITOR ================= */}
      <View
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: colors.primary,
          backgroundColor: colors.bgColor,
          padding: 8,
        }}
      >

        {/* ================= TOOLBAR ================= */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          {[
            { icon: Bold, action: "bold" },
            { icon: Italic, action: "italic" },
            { icon: List, action: "LIST" }, // ✅ FIXED
          ].map((item, index) => (
            <Pressable
              key={index}
              onPress={() => exec(item.action)}
              style={[
                toolBtn,
                activeTool === item.action && {
                  backgroundColor: colors.primary + "15",
                },
              ]}
            >
              <item.icon
                size={15}
                color={
                  activeTool === item.action
                    ? colors.primary
                    : colors.neutral
                }
              />
            </Pressable>
          ))}

          <View
            style={{
              width: 1,
              height: 18,
              backgroundColor: colors.cardBorder,
              marginHorizontal: 6,
            }}
          />

          <Pressable onPress={pickImage} style={toolBtn}>
            <ImageIcon size={15} color={colors.neutral} />
          </Pressable>

          <Pressable onPress={openCamera} style={toolBtn}>
            <Camera size={15} color={colors.neutral} />
          </Pressable>
        </View>

        {/* ================= INPUT ================= */}
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          
          <View style={{ flex: 1, minHeight: 40, maxHeight: 120 }}>
            <LexicalEditor
              ref={editorRef}
              onChange={(val) => {
                setMessage(val);

                const plainText = val.replace(/<[^>]+>/g, "");
                setInputText(plainText);
              }}
            />
          </View>

          {/* ================= SEND ================= */}
          <Pressable
            onPress={handleSend}
            disabled={!isActive}
            style={{
              marginLeft: 8,
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: isActive
                ? colors.primary
                : colors.primary + "60",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Send size={18} color={colors.light} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const toolBtn = {
  width: 36,
  height: 36,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
};