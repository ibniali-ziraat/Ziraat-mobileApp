import { useState } from "react";

import {
  ScrollView,
  Text,
  View,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import {
  useAnswers,
  useCreateAnswer,
  useQuestion,
} from "../hooks/useQuestion";

import MessageItem from "../pages/MessageItem";

import {
  MessageCircle,
  Sparkles,
} from "lucide-react-native";


import { colors } from "@/src/constants/colors";
import AnswerComments from "../pages/AnswerComments";
import BottomAnswerInput from "../pages/BottomAnswerInput";
import ReplyInput from "../pages/ReplyInput";

export default function QuestionScreen() {
  const { id } =
    useLocalSearchParams();

  const questionId =
    Number(id);

  const { data } =
    useQuestion(questionId);

  const {
    data: answersData,
  } = useAnswers(questionId);

  const {
    mutate: createAnswerApi,
    isPending,
  } = useCreateAnswer();

  const [input, setInput] =
    useState("");

  // QUESTION
  const question = data
    ? {
        id: data.id?.toString(),

        author:
          data.user
            ?.displayName ||
          "Unknown",

        title: data.title,

        content: data.body,

        votes: data.votes,
 createdAt:
          data.createdAt,
        tags:
          data.tags ||
          data.questionTags ||
          [],

        children: [],
      }
    : null;

  // REMOVE DUPLICATES
  const answersMap =
    new Map();

  answersData?.forEach(
    (a: any) => {
      if (
        !answersMap.has(a.id)
      ) {
        answersMap.set(a.id, {
          id: a.id?.toString(),

          author:
            a.user
              ?.displayName ||
            "Unknown",

          content: a.body,

          votes:
            a.votes || 0,
   createdAt:
          a.createdAt,

          children: [],
        });
      }
    }
  );

  const answers = Array.from(
    answersMap.values()
  );

  // ANSWER
  const handleAnswer = () => {
    if (
      !input.trim() ||
      isPending
    )
      return;

    createAnswerApi(
      {
        questionId,

        payload: {
          body: input,
          userId: 2,
        },
      },
      {
        onSuccess: () => {
          setInput("");
        },
      }
    );
  };

  return (
    <ScreenLayout>
      <View
        style={{
          flex: 1,
          backgroundColor:colors.light,
        }}
      >
        {/* HEADER */}
        <BackHeader title="Discussion" />

        {/* CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingBottom: 140,
          }}
        >
          {/* QUESTION */}
          {question && (
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <MessageItem
                item={question}
                depth={0}
              />
            </View>
          )}

          {/* ANSWERS TOP SECTION */}
          <View
            style={{
              marginTop: 8,
              marginBottom: 16,
              marginHorizontal: 18,
            }}
          >
            <View
              style={{
                flexDirection:
                  "row",

                alignItems:
                  "center",

                justifyContent:
                  "space-between",
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
                <View
                  style={{
                    width: 48,
                    height: 48,

                    borderRadius: 24,

                

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    
                  }}
                >
                  <Sparkles
                    size={22}
                    color={colors.secondary}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 22,

                      fontWeight:
                        "600",

                      color:colors.dark,
                    }}
                  >
                 Community discussion
                  </Text>

                 
                </View>
              </View>

              {/* COUNT */}
              <View
               
              >
                <Text
                  style={{
                    color:colors.secondary,

                    fontWeight:
                      "800",

                    fontSize: 14,
                  }}
                >
                  {answers.length}{" "}
                  {answers.length ===
                  1
                    ? "Answer"
                    : "Answers"}
                </Text>
              </View>
            </View>
          </View>

          {/* ANSWERS */}
          {answers.length >
          0 ? (
            answers.map((a, i) => (
              <View
                key={a.id}
                style={{
                  marginBottom: 22,
                }}
              >
                {/* ANSWER CARD */}
                <View
                  style={{
                    position:
                      "relative",
                  }}
                >
                  {/* LEFT TIMELINE */}
                  <View
                    style={{
                      position:
                        "absolute",

                      left: 30,

                      top: 0,

                      bottom: -24,

                      width: 2,

                      backgroundColor:
                        colors.dark,

                      opacity: 0.08,
                    }}
                  />

                  {/* INDEX DOT */}
                  <View
                    style={{
                      position:
                        "absolute",

                      left: 20,

                      top: 18,

                      width: 22,

                      height: 22,

                      borderRadius: 11,

                      backgroundColor:
                        colors.dark,

                      zIndex: 20,

                      alignItems:
                        "center",

                      justifyContent:
                        "center",
                    }}
                  >
                    <Text
                      style={{
                        color:
                          colors.light,

                        fontSize: 10,

                        fontWeight:
                          "800",
                      }}
                    >
                      {i + 1}
                    </Text>
                  </View>

                  {/* CARD */}
                  <View
                    style={{
                      marginLeft: 34,
                    }}
                  >
                    <MessageItem
                      item={a}
                      depth={1}
                    />
                  </View>
                </View>

                {/* COMMENTS */}
                <View
                  style={{
                    marginTop: 8,
                    marginLeft: 54,
                  }}
                >
                  <AnswerComments
                    answerId={Number(
                      a.id
                    )}
                  />

                  <ReplyInput
                    answerId={Number(
                      a.id
                    )}
                  />
                </View>
              </View>
            ))
          ) : (
            /* EMPTY STATE */
            <View
              style={{
                marginHorizontal: 18,

                marginTop: 30,

                paddingVertical: 70,

                paddingHorizontal: 26,

                borderRadius: 32,

             

                borderWidth: 1,

                borderColor:
        colors.cardBorder,

                alignItems:
                  "center",
              }}
            >
              {/* ICON */}
              <View
                style={{
                  width: 92,

                  height: 92,

                  borderRadius: 46,

                 

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                }}
              >
                <MessageCircle
                  size={38}
                  color={colors.secondary}
                  strokeWidth={2.1}
                />
              </View>

              {/* TITLE */}
              <Text
                style={{
                  fontSize: 24,

                  fontWeight:
                    "900",

                  color:colors.dark,

                  marginBottom: 12,
                }}
              >
                No answers yet
              </Text>

              {/* DESC */}
              <Text
                style={{
                  fontSize: 14,

                  lineHeight: 26,

                  textAlign:
                    "center",

                  color: "#000",

                  opacity: 0.6,

                  maxWidth: 280,
                }}
              >
                Be the first person
                to join the discussion
                and help solve this
                question.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* INPUT */}
        <BottomAnswerInput
          input={input}
          setInput={setInput}
          handleAnswer={
            handleAnswer
          }
          isPending={isPending}
        />
      </View>
    </ScreenLayout>
  );
}