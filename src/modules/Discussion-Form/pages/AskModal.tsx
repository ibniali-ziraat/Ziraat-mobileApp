import { useState } from "react";
import { FormProvider } from "react-hook-form";

import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  HelpCircle,
  X,
} from "lucide-react-native";

import ChipInput from "@/src/components/form/inputs/ChipInput";

import FormTextAreaInput from "@/src/components/shared/inputs/FormTextAreaInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";

import { colors } from "@/src/constants/colors";

import { useZodForm } from "@/src/hooks/useZodForm";

import {
  AskQuestionSchema,
} from "../schemas/discussion.schema";

import { showErrorToast } from "@/src/utils/toast";

const { height } =
  Dimensions.get("window");

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
  const methods =
    useZodForm(
      AskQuestionSchema
    );

  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const title =
    watch("title");

  const body =
    watch("body");

  // STATES
  const [isBounty, setIsBounty] =
    useState(false);

  // SUBMIT
  const handleQuestionSubmit = (
    data: any
  ) => {
    const payload = {
      title: data.title,

      body: data.body,

      userId: 1,

      tags:
        data.tagsInput ||
        [],

      isBounty,

      bountyAmount:
        isBounty
          ? Number(
              data.bountyAmount ||
                0
            )
          : 0,
    };

    onSubmit(payload);

    reset();

    setIsBounty(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View
        style={{
          flex: 1,

          justifyContent:
            "flex-end",
        }}
      >
        {/* BACKDROP */}
        <Pressable
          onPress={onClose}
          style={{
            position:
              "absolute",

            inset: 0,

            backgroundColor:
              colors.overlay,
          }}
        />

        {/* SHEET */}
        <View
          style={{
            height:
              height * 0.9,

            backgroundColor:
              colors.light,

            borderTopLeftRadius: 34,

            borderTopRightRadius: 34,

            overflow:
              "hidden",

            borderWidth: 1,

            borderColor:
              colors.overlay +
              "08",
          }}
        >
          {/* HANDLE */}
          <View
            style={{
              alignItems:
                "center",

              paddingTop: 12,

              paddingBottom: 4,
            }}
          >
            <View
              style={{
                width: 60,
                height: 5,

                borderRadius: 999,

                backgroundColor:
                  colors.primary +
                  "25",
              }}
            />
          </View>

          {/* HEADER */}
          <View
            style={{
              flexDirection:
                "row",

              alignItems:
                "center",

              justifyContent:
                "space-between",

              paddingHorizontal: 22,

              paddingVertical: 20,

              borderBottomWidth: 1,

              borderBottomColor:
                colors.overlay +
                "08",
            }}
          >
            {/* LEFT */}
            <View
              style={{
                flexDirection:
                  "row",

                alignItems:
                  "center",
              }}
            >
              {/* ICON */}
              <View
                style={{
                  width: 48,
                  height: 48,

                  borderRadius: 24,

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  backgroundColor:
                    colors.primary +
                    "12",

                  borderWidth: 1,

                  borderColor:
                    colors.primary +
                    "18",

                  marginRight: 14,
                }}
              >
                <HelpCircle
                  size={22}
                  color={
                    colors.primary
                  }
                  strokeWidth={2.4}
                />
              </View>

              {/* TEXT */}
              <View>
                <Text
                  style={{
                    fontSize: 20,

                    fontWeight:
                      "800",

                    color:
                      colors.dark,
                  }}
                >
                  Ask Question
                </Text>

                <Text
                  style={{
                    fontSize: 12,

                    color:
                      colors.overlay,

                    marginTop: 3,

                    fontWeight:
                      "500",
                  }}
                >
                  Start a new
                  discussion
                </Text>
              </View>
            </View>

            {/* CLOSE */}
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.8}
              style={{
                width: 40,
                height: 40,

                borderRadius: 999,

                alignItems:
                  "center",

                justifyContent:
                  "center",

                backgroundColor:
                  colors.light,

                borderWidth: 1,

                borderColor:
                  colors.overlay +
                  "12",
              }}
            >
              <X
                size={18}
                color={
                  colors.dark
                }
                strokeWidth={2.4}
              />
            </TouchableOpacity>
          </View>

          {/* FORM */}
          <FormProvider
            {...methods}
          >
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
                  error={
                    errors.title
                  }
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
                  error={
                    errors.body
                  }
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
                  error={
                    errors.tagsInput
                  }
                  required
                />
              </View>

              {/* INFO BOX */}
              <View
                style={{
                  backgroundColor:
                    colors.primary +
                    "08",

                  borderWidth: 1,

                  borderColor:
                    colors.primary +
                    "12",

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

                    color:
                      colors.neutral,

                    fontWeight:
                      "500",
                  }}
                >
                  Add clear title,
                  detailed description
                  and useful tags to
                  get faster and better
                  answers.
                </Text>
              </View>

              {/* SUBMIT */}
              <TouchableOpacity
                onPress={handleSubmit(
                  handleQuestionSubmit,
                  (
                    validationErrors
                  ) => {
                    if (
                      validationErrors.tagsInput
                    ) {
                      showErrorToast(
                        validationErrors
                          .tagsInput
                          .message ||
                          "Please add valid tags"
                      );

                      return;
                    }

                    if (
                      validationErrors.title
                    ) {
                      showErrorToast(
                        validationErrors
                          .title
                          .message ||
                          "Invalid title"
                      );

                      return;
                    }

                    if (
                      validationErrors.body
                    ) {
                      showErrorToast(
                        validationErrors
                          .body
                          .message ||
                          "Invalid description"
                      );

                      return;
                    }

                    showErrorToast(
                      "Please complete all required fields"
                    );
                  }
                )}
                disabled={
                  loading
                }
                activeOpacity={
                  0.9
                }
                style={{
                  backgroundColor:
                    loading
                      ? colors.overlay
                      : colors.secondary,

                  paddingVertical: 17,

                  borderRadius: 22,

                  alignItems:
                    "center",

                  marginTop: 4,

                  shadowColor:
                    colors.secondary,

                  shadowOffset:
                    {
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
                    color:
                      colors.light,

                    fontWeight:
                      "800",

                    fontSize: 15,

                    letterSpacing: 0.3,
                  }}
                >
                  {loading
                    ? "Posting..."
                    : "Post Question"}
                </Text>
              </TouchableOpacity>
            </View>
          </FormProvider>
        </View>
      </View>
    </Modal>
  );
}