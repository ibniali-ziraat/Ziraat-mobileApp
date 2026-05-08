
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";

import { useRouter } from "expo-router";

import { ChevronRight, Hash } from "lucide-react-native";
import {
  useEffect, useState,
} from "react";

import {
  Text,
  TouchableOpacity,
  View
} from "react-native";



import {
  useQuestionViews,
} from "../hooks/useQuestion";
import MessageFooter from "./MessageFooter";

function useTimeAgo(date: any) {
  const [time, setTime] =
    useState("");

  useEffect(() => {
    if (!date)
      return setTime("");

    const diff = Math.floor(
      (Date.now() -
        new Date(
          date
        ).getTime()) /
      1000
    );

    if (diff < 60)
      setTime(`${diff}s`);
    else if (diff < 3600)
      setTime(
        `${Math.floor(
          diff / 60
        )}m`
      );
    else if (diff < 86400)
      setTime(
        `${Math.floor(
          diff / 3600
        )}h`
      );
    else
      setTime(
        `${Math.floor(
          diff / 86400
        )}d`
      );
  }, [date]);

  return time;
}

function getInitials(
  name: string
) {
  return (
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    "?"
  );
}

function AuthorAvatar({
  name,
}: any) {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor:
          colors.secondary,
        alignItems: "center",
        justifyContent:
          "center",
     
      }}
    >
      <Text
        style={{
          color:
            colors.light,
          fontWeight: "700",
          fontSize: 13,
          letterSpacing: 0.8,
        }}
      >
        {getInitials(name)}
      </Text>
    </View>
  );
}



export default function MessageItem({
    item,
  depth = 0,
  hideArrow = false,
}: any) {
  const router = useRouter();

  const time = useTimeAgo(
    item.createdAt
  );

  const isQuestion =
    depth === 0;








  //  const tags =
  //   item.tags ||
  //   item.tagsInput ||
  //   item.tagNames ||
  //   item.questionTags ||
  //   [];

  // AFTER
  const rawTags =
    (Array.isArray(item.tags) && item.tags.length > 0 ? item.tags : null) ||
    (Array.isArray(item.tagsInput) && item.tagsInput.length > 0 ? item.tagsInput : null) ||
    (Array.isArray(item.tagNames) && item.tagNames.length > 0 ? item.tagNames : null) ||
    (Array.isArray(item.questionTags) && item.questionTags.length > 0 ? item.questionTags : null) ||
    [];

  const tags = rawTags;





  const {
    data: viewsData,
  } = useQuestionViews(
    isQuestion
      ? Number(item.id)
      : 0,
    2
  );

  const views =
    viewsData?.views ||
    item.views ||
    0;

  return (
    <View
      style={{
        backgroundColor:
          colors.light,

        marginHorizontal: 14,
        marginTop: 12,

        borderRadius: 20,

        borderWidth: 1,

        borderColor:
          colors.cardBorder,

        overflow: "hidden",
      }}
    >
      {/* TOP ACCENT */}
      {isQuestion && (
        <View
          style={{
            height: 3,

            backgroundColor:
              colors.primary,
          }}
        />
      )}

      {/* BODY */}
      <TouchableOpacity
        activeOpacity={0.82}
        style={{
          padding: 16,
        }}
        onPress={() => {
          if (isQuestion) {
            router.push({
              pathname:
                ROUTES
                  .Discussion
                  .QuestionScreen,

              params: {
                id: item.id,
              },
            });
          }
        }}
      >
        {/* HEADER */}
        <View
          style={{
            flexDirection:
              "row",

            justifyContent:
              "space-between",

            marginBottom: 12,
          }}
        >
          {/* LEFT */}
          <View
            style={{
              flexDirection:
                "row",

              gap: 11,

              alignItems:
                "center",
            }}
          >
            <AuthorAvatar
              name={
                item.author
              }
            />

            <View>
              <Text
                style={{
                  fontWeight:
                    "700",

                  fontSize: 14,

                  color:
                    colors.primary,
                }}
              >
                {item.author}
              </Text>

              {!!time && (
                <Text
                  style={{
                    fontSize: 12,

                    color:
                      colors.neutral,
                  }}
                >
                  {time} ago
                </Text>
              )}
            </View>
          </View>

          {/* RIGHT */}
          <View
            style={{
              flexDirection:
                "row",

              alignItems:
                "center",

              gap: 6,
            }}
          >
            {isQuestion && (
              <View
                style={{
                  backgroundColor:
                    colors.primary +
                    "15",

                  borderWidth: 1,

                  borderColor:
                    colors.primary +
                    "30",

                  paddingHorizontal: 11,

                  paddingVertical: 4,

                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,

                    color:
                      colors.primary,

                    fontWeight:
                      "700",
                  }}
                >
                  Question
                </Text>
              </View>
            )}

          {isQuestion &&
  !hideArrow && (
    <ChevronRight
      size={15}
      color={
        colors.overlay
      }
    />
)}
          </View>
        </View>

        {/* TITLE */}
        {isQuestion && (
          <Text
            style={{
              fontSize: 15,

              fontWeight: "700",

              marginBottom: 7,

              lineHeight: 23,
            }}
          >
            {item.title ||
              item.excerpt}
          </Text>
        )}

        {/* CONTENT */}
        <Text
          style={{
            fontSize: 12,

            lineHeight: 22,
            fontWeight: "400",
            color:
              colors.neutral,
          }}

        >
          {item.content ||
            item.body}
        </Text>

        {/* TAGS */}
        {Array.isArray(tags) &&
          tags.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",

                gap: 8,
              
                marginTop: 12,
              }}
            >
              {[
                ...new Set(
                  tags
                    .map((tag: any) => {
                      // STRING TAG
                      if (
                        typeof tag ===
                        "string"
                      ) {
                        return tag.trim();
                      }

                      // OBJECT TAG
                      if (
                        typeof tag ===
                        "object" &&
                        tag !== null
                      ) {
                        return (
                          tag.name ||
                          tag.label ||
                          tag.tag ||

                          ""
                        ).trim();
                      }

                      return "";
                    })
                    .filter(Boolean)
                ),
              ].map(
                (
                  tag: any,
                  index: number
                ) => (
                  <View
                    key={index}
                    style={{


                      borderWidth: 2,
                      borderColor: colors.cardBorder,
                      backgroundColor:
                        colors.primary +
                        "20",
                      paddingHorizontal: 10,
                      paddingVertical: 6,

                      borderRadius: 999,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Hash
                        size={12}
                        color={colors.primary}
                        strokeWidth={2.5}
                      />
                      <Text
                        style={{
                          color: colors.primary,
                          fontSize: 10,
                          fontWeight: "700",
                        }}
                      >
                        {tag}
                      </Text>
                    </View>
                  </View>
                )
              )}
            </View>
          )}
      </TouchableOpacity>

  <MessageFooter
  item={item}
  depth={depth}
  views={views}
/>
    
      </View>
    
  );
}
