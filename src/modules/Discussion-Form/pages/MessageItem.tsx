
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";

import { useRouter } from "expo-router";

import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Eye,
  Hash,
  Share2,
  Trash2,
} from "lucide-react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";

import {
  useDeleteQuestion,
  useQuestionViews,
  useVote,
} from "../hooks/useQuestion";

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
        shadowColor:
          colors.secondary,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 6,
        elevation: 3,
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

function VoteColumn({
  votes = 0,
  targetId,
  targetType,
}: {
  votes: number;
  targetId: number;
  targetType:
    | "question"
    | "answer";
}) {
  const [count, setCount] =
    useState(votes);

  const [vote, setVote] =
    useState(0);

  const {
    mutate: voteApi,
    isPending,
  } = useVote();

  const handleVote = (
    value: number
  ) => {
    if (isPending) return;

    let newVote = value;
    let newCount = count;

    if (vote === value) {
      newVote = 0;
      newCount =
        count - value;
    } else {
      newCount =
        count +
        value -
        vote;
    }

    setVote(newVote);
    setCount(newCount);

    voteApi(
      {
        userId: 2,
        targetId,
        targetType,
        value: newVote,
      },
      {
        onError: () => {
          setVote(vote);
          setCount(count);
        },
      }
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems:
          "center",

        backgroundColor:
          colors.light,

        borderRadius: 24,

        borderWidth: 1,

        borderColor:
          colors.cardBorder,

        overflow: "hidden",
      }}
    >
      {/* UPVOTE */}
      <TouchableOpacity
        onPress={() =>
          handleVote(1)
        }
        style={{
          paddingHorizontal: 10,
          paddingVertical: 6,

          backgroundColor:
            vote === 1
              ? colors.primary +
                "14"
              : "transparent",
        }}
      >
        <ChevronUp
          size={16}
          color={
            vote === 1
              ? colors.primary
              : colors.overlay
          }
          strokeWidth={
            vote === 1
              ? 2.5
              : 1.8
          }
        />
      </TouchableOpacity>

      {/* COUNT */}
      <Text
        style={{
          fontWeight: "700",

          fontSize: 14,

          color:
            vote === 1
              ? colors.primary
              : vote === -1
              ? colors.error
              : "#555",

          minWidth: 18,

          textAlign: "center",
        }}
      >
        {count}
      </Text>

      {/* DOWNVOTE */}
      <TouchableOpacity
        onPress={() =>
          handleVote(-1)
        }
        style={{
          paddingHorizontal: 10,
          paddingVertical: 6,

          backgroundColor:
            vote === -1
              ? colors.error +
                "14"
              : "transparent",
        }}
      >
        <ChevronDown
          size={16}
          color={
            vote === -1
              ? colors.error
              : colors.overlay
          }
          strokeWidth={
            vote === -1
              ? 2.5
              : 1.8
          }
        />
      </TouchableOpacity>
    </View>
  );
}

function IconPill({
  children,
}: any) {
  return (
    <TouchableOpacity
      hitSlop={{
        top: 8,
        bottom: 8,
        left: 8,
        right: 8,
      }}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,

        borderRadius: 24,

        borderWidth: 1,

        borderColor:
          colors.cardBorder,

        backgroundColor:
          colors.light,
      }}
    >
      {children}
    </TouchableOpacity>
  );
}

export default function MessageItem({
  item,
  depth = 0,
}: any) {
  const router = useRouter();

  const time = useTimeAgo(
    item.createdAt
  );

  const isQuestion =
    depth === 0;

  const [
    deleteModalVisible,
    setDeleteModalVisible,
  ] = useState(false);

  // FIX DUPLICATE TAGS / SAFE TAG FORMAT
  const tags =
    item.tags ||
    item.tagNames ||
    item.questionTags ||
    [];

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

  const isOwner = true;

  const {
    mutate: deleteQuestionApi,
    isPending:
      isDeletingQuestion,
  } = useDeleteQuestion();

  const handleDelete = () => {
    deleteQuestionApi(
      Number(item.id),
      {
        onSuccess: () => {
          setDeleteModalVisible(
            false
          );
        },

        onError: () => {
          setDeleteModalVisible(
            false
          );
        },
      }
    );
  };

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

                  fontSize: 17,

                  color:
                    colors.primary,
                }}
              >
                {item.author}
              </Text>

              {!!time && (
                <Text
                  style={{
                    fontSize: 13,

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
                    fontSize: 14,

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

            {isQuestion && (
              <ChevronRight
                size={19}
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
              fontSize: 18,

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
            fontSize: 15,

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

        marginTop: 16,
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
              borderColor:colors.cardBorder,
 backgroundColor:
                      colors.primary +
                      "20",
              paddingHorizontal: 12,
              paddingVertical: 7,

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

      fontSize: 13,

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

      {/* FOOTER */}
      <View
        style={{
          flexDirection:
            "row",

          alignItems:
            "center",

          justifyContent:
            "space-between",

          paddingHorizontal: 16,
          paddingVertical: 11,

          borderTopWidth: 1,

          borderTopColor:
            colors.cardBorder,
        }}
      >
        {/* VOTES */}
        <VoteColumn
          votes={item.votes}
          targetId={Number(
            item.id
          )}
          targetType={
            depth === 0
              ? "question"
              : "answer"
          }
        />

        {/* ACTIONS */}
        <View
          style={{
            flexDirection:
              "row",

            alignItems:
              "center",

            gap: 7,
          }}
        >
          {/* VIEWS */}
          <IconPill>
            <View
              style={{
                flexDirection:
                  "row",

                alignItems:
                  "center",

                gap: 5,
              }}
            >
              <Eye
                size={15}
                color={
                  colors.secondary
                }
              />

              <Text
                style={{
                  fontSize: 12,

                  fontWeight:
                    "600",

                  color:
                    colors.secondary,
                }}
              >
                {views}
              </Text>
            </View>
          </IconPill>

          {/* SHARE */}
          <IconPill>
            <Share2
              size={15}
              color={
                colors.secondary
              }
            />
          </IconPill>

          {/* DELETE */}
          {isOwner &&
            isQuestion && (
              <>
                <TouchableOpacity
                  onPress={() =>
                    setDeleteModalVisible(
                      true
                    )
                  }
                  activeOpacity={
                    0.82
                  }
                  disabled={
                    isDeletingQuestion
                  }
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,

                    borderRadius: 24,

                    borderWidth: 1,

                    borderColor:
                      colors.error +
                      "25",

                    backgroundColor:
                      colors.error +
                      "08",
                  }}
                >
                  <Trash2
                    size={15}
                    color={
                      isDeletingQuestion
                        ? colors.overlay
                        : colors.error
                    }
                    strokeWidth={2}
                  />
                </TouchableOpacity>

                <ConfirmDeleteModal
                  visible={
                    deleteModalVisible
                  }
                  title="Delete Question?"
                  description="This question will be permanently removed."
                  confirmText="Delete"
                  cancelText="Cancel"
                  loading={
                    isDeletingQuestion
                  }
                  onCancel={() =>
                    setDeleteModalVisible(
                      false
                    )
                  }
                  onConfirm={
                    handleDelete
                  }
                />
              </>
            )}
        </View>
      </View>
    </View>
  );
}