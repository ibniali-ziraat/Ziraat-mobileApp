import { useState } from "react";
import { FormProvider } from "react-hook-form";

import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { HelpCircle, X } from "lucide-react-native";

import ChipInput from "@/src/components/form/inputs/ChipInput";

import FormTextAreaInput from "@/src/components/shared/inputs/FormTextAreaInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";

import { colors } from "@/src/constants/colors";

import { useZodForm } from "@/src/hooks/useZodForm";

import { AskQuestionSchema } from "../schemas/discussion.schema";

import { showErrorToast } from "@/src/utils/toast";

const { height } = Dimensions.get("window");

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  loading?: boolean;
};

export default function AskModal({
  visible,
  onClose,
  onSubmit,
  loading = false,
}: Props) {
  // FORM
  const methods = useZodForm(AskQuestionSchema);

  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const title = watch("title");

  const body = watch("body");

  // STATES
  const [isBounty, setIsBounty] = useState(false);

  // SUBMIT
  const handleQuestionSubmit = (data: any) => {
    const payload = {
      title: data.title,

      body: data.body,

      userId: 1,

      tags: data.tagsInput || [],

      isBounty,

      bountyAmount: isBounty ? Number(data.bountyAmount || 0) : 0,
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

            backgroundColor: colors.overlay,
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
          {/* HANDLE */}
          <View
            style={{
              alignItems: "center",

              paddingTop: 12,

              paddingBottom: 4,
            }}
          >
            <View
              style={{
                width: 60,
                height: 5,

                borderRadius: 999,

                backgroundColor: colors.primary + "25",
              }}
            />
          </View>

          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              justifyContent: "space-between",

              paddingHorizontal: 22,

              paddingVertical: 20,

              borderBottomWidth: 1,

              borderBottomColor: colors.overlay + "08",
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
                width: 40,
                height: 40,

                borderRadius: 999,

                alignItems: "center",

                justifyContent: "center",

                backgroundColor: colors.light,

                borderWidth: 1,

                borderColor: colors.overlay + "12",
              }}
            >
              <Text style={{ color: colors.light, fontWeight: "700" }}>
                {loading ? "Posting..." : "Post Question"}
              </Text>
            </Pressable>
          </View>

          {/* FORM */}
          <FormProvider {...methods}>
            <View
              style={{
                flex: 1,

                paddingHorizontal: 20,

                paddingTop: 18,
              }}
            >
              {/* TITLE */}
              <View
                style={{
                  marginBottom: 16,
                }}
              >
                <FormTextInput
                  name="title"
                  label="Title"
                  placeholder="How to handle file uploads in FastAPI with S3?"
                  error={errors.title}
                  required
                />
              </View>

              {/* DESCRIPTION */}
              <View
                style={{
                  marginBottom: 16,
                }}
              >
                <FormTextAreaInput
                  name="body"
                  label="Description"
                  placeholder="Explain your problem..."
                  error={errors.body}
                  required
                />
              </View>

              {/* TAGS */}
              <View
                style={{
                  marginBottom: 12,
                }}
              >
                <ChipInput
                  name="tagsInput"
                  label="Tags"
                  placeholder="Add tag (react-native, api...)"
                  error={errors.tagsInput}
                  required
                />
              </View>

              {/* INFO BOX */}
              <View
                style={{
                  backgroundColor: colors.primary + "08",

                  borderWidth: 1,

                  borderColor: colors.primary + "12",

                  borderRadius: 18,

                  paddingHorizontal: 14,

                  paddingVertical: 14,

                  marginTop: 8,

                  marginBottom: 22,
                }}
              >
                <Text
                  style={{
                    fontSize: 12.5,

                    lineHeight: 21,

                    color: colors.neutral,

                    fontWeight: "500",
                  }}
                >
                  Add clear title, detailed description and useful tags to get
                  faster and better answers.
                </Text>
              </View>

              {/* SUBMIT */}
              <TouchableOpacity
                onPress={handleSubmit(
                  handleQuestionSubmit,
                  (validationErrors) => {
                    if (validationErrors.tagsInput) {
                      showErrorToast(
                        validationErrors.tagsInput.message ||
                          "Please add valid tags",
                      );

                      return;
                    }

                    if (validationErrors.title) {
                      showErrorToast(
                        validationErrors.title.message || "Invalid title",
                      );

                      return;
                    }

                    if (validationErrors.body) {
                      showErrorToast(
                        validationErrors.body.message || "Invalid description",
                      );

                      return;
                    }

                    showErrorToast("Please complete all required fields");
                  },
                )}
                disabled={loading}
                activeOpacity={0.9}
                style={{
                  backgroundColor: loading ? colors.overlay : colors.secondary,

                  paddingVertical: 17,

                  borderRadius: 22,

                  alignItems: "center",

                  marginTop: 4,

                  shadowColor: colors.secondary,

                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },

                  shadowOpacity: 0.18,

                  shadowRadius: 10,

                  elevation: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.light,

                    fontWeight: "800",

                    fontSize: 15,

                    letterSpacing: 0.3,
                  }}
                >
                  {loading ? "Posting..." : "Post Question"}
                </Text>
              </TouchableOpacity>
            </View>
          </FormProvider>
        </View>
      </View>
    </Modal>
  );
}
