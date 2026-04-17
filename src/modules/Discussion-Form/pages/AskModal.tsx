import { colors } from "@/src/constants/colors";
import { HelpCircle, X } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function AskModal({
  visible,
  onClose,
  onSubmit,
  loading = false,
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isBounty, setIsBounty] = useState(false);
  const [bountyAmount, setBountyAmount] = useState("");

  //  Add tag
  const addTag = () => {
    if (!tagsInput.trim()) return;
    setTags([...tags, tagsInput.trim()]);
    setTagsInput("");
  };

  //  Remove tag
  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  //  Submit
  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return;

    const payload = {
      title,
      body,
      userId: 1,
      tags,
      isBounty,
      bountyAmount: isBounty ? Number(bountyAmount || 0) : 0,
    };

    onSubmit(payload);
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
            height: height * 0.9,
            backgroundColor: colors.light,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingBottom: 20,
          }}
        >
          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: colors.cardBorder,
            }}
          >
            <HelpCircle size={20} />
            <Text style={{ fontSize: 18, fontWeight: "800", marginLeft: 10 }}>
              Ask Question
            </Text>

            <Pressable onPress={onClose} style={{ marginLeft: "auto" }}>
              <X size={18} />
            </Pressable>
          </View>

          <View style={{ padding: 20 }}>
            {/* TITLE */}
            <Text style={{ fontWeight: "700", marginBottom: 6 }}>Title</Text>
            <TextInput
              placeholder="How to handle file uploads in FastAPI with S3?"
              value={title}
              onChangeText={setTitle}
              style={{
                borderWidth: 1,
                borderColor: colors.cardBorder,
                borderRadius: 10,
                padding: 12,
                marginBottom: 16,
              }}
            />

            {/* BODY */}
            <Text style={{ fontWeight: "700", marginBottom: 6 }}>
              Description
            </Text>
            <TextInput
              placeholder="Explain your problem..."
              value={body}
              onChangeText={setBody}
              multiline
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 10,
                padding: 12,
                height: 120,
                marginBottom: 16,
                textAlignVertical: "top",
              }}
            />

            {/* TAGS */}
            <Text style={{ fontWeight: "700", marginBottom: 6 }}>Tags</Text>

            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <TextInput
                placeholder="Add tag (fastapi, s3...)"
                value={tagsInput}
                onChangeText={setTagsInput}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                  borderRadius: 10,
                  padding: 10,
                }}
              />
              <Pressable
                onPress={addTag}
                style={{
                  marginLeft: 8,
                  backgroundColor: colors.secondary,
                  paddingHorizontal: 14,
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: colors.light }}>Add</Text>
              </Pressable>
            </View>

            {/* TAG LIST */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 16,
              }}
            >
              {tags.map((tag) => (
                <Pressable
                  key={tag}
                  onPress={() => removeTag(tag)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: colors.secondary,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                    marginRight: 8,
                  }}
                >
                  <Text style={{ color: colors.light, marginRight: 4 }}>
                    #{tag}
                  </Text>
                  <X size={15} color={colors.light} />
                </Pressable>
              ))}
            </View>

            {/* BOUNTY */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontWeight: "700", flex: 1 }}>Add Bounty</Text>
              <Switch value={isBounty} onValueChange={setIsBounty} />
            </View>

            {isBounty && (
              <TextInput
                placeholder="Enter bounty amount"
                keyboardType="numeric"
                value={bountyAmount}
                onChangeText={setBountyAmount}
                style={{
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 20,
                }}
              />
            )}

            {/* SUBMIT */}
            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              style={{
                backgroundColor: loading ? colors.overlay : colors.secondary,
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.light, fontWeight: "700" }}>
                {loading ? "Posting..." : "Post Question"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
