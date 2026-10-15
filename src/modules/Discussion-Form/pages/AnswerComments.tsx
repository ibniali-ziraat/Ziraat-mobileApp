import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Clock,
  Heart,
  MessageCircle,
} from "lucide-react-native";

import { colors } from "@/src/constants/colors";
import { useComments } from "../hooks/useQuestion";
import Avatar from "./Avatar";
import ReplyInput from "./ReplyInput";

type Props = {
  answerId: number;
};

export default function AnswerComments({
  answerId,
}: Props) {
  const { data, isLoading } =
    useComments(answerId);

  if (isLoading) {
    return (
      <View
        style={{
          paddingVertical: 28,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 18,
            paddingVertical: 10,
            borderRadius: 999,
            backgroundColor: "#f8fafc",
            borderWidth: 1,
            borderColor: "#e2e8f0",
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              backgroundColor: "#2563eb",
              marginRight: 6,
            }}
          />

          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              backgroundColor: "#2563eb",
              opacity: 0.5,
              marginRight: 6,
            }}
          />

          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              backgroundColor: "#2563eb",
              opacity: 0.25,
              marginRight: 10,
            }}
          />

          <Text
            style={{
              color: "#0f172a",
              fontWeight: "700",
              fontSize: 14,
              letterSpacing: 0.3,
            }}
          >
            Loading replies...
          </Text>
        </View>
      </View>
    );
  }

  if (!data || data.length === 0) return null;

  const getParentId = (body: string) => {
    const match =
      body?.match(/@reply-(\d+)/);

    return match
      ? Number(match[1])
      : null;
  };

  const buildCommentTree = (
    comments: any[]
  ) => {
    const map: any = {};
    const roots: any[] = [];

    comments.forEach((c) => {
      map[c.id] = {
        ...c,
        replies: [],
      };
    });

    comments.forEach((c) => {
      const parentId = getParentId(c.body);

      if (parentId && map[parentId]) {
        map[parentId].replies.push(
          map[c.id]
        );
      } else {
        roots.push(map[c.id]);
      }
    });

    return roots;
  };

  const flattenReplies = (
    replies: any[]
  ): any[] => {
    const result: any[] = [];

    const collect = (items: any[]) => {
      items.forEach((r) => {
        result.push(r);

        if (r.replies?.length > 0) {
          collect(r.replies);
        }
      });
    };

    collect(replies);

    return result;
  };

  const commentsTree =
    buildCommentTree(data);

  // FORMAT REPLY
  const formatReply = (body: string) => {
    const cleanBody = body
      .replace(/@reply-\d+\s?/, "")
      .trim();

    const mentionMatch =
      cleanBody.match(
        /^@([a-zA-Z0-9._-]+)/
      );

    const mentionUser =
      mentionMatch?.[1] || "";

    const message = cleanBody
      .replace(
        /^@[a-zA-Z0-9._-]+\s*/,
        ""
      )
      .trim();

    return {
      mentionUser,
      message,
    };
  };

  // REPLY
  const renderReply = (reply: any) => {
    const {
      mentionUser,
      message,
    } = formatReply(reply.body);

    return (
      <View
        key={reply.id}
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: 14,
        }}
      >
        {/* LEFT */}
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 1.5,
              height: 10,
              backgroundColor:
                "#e2e8f0",
              marginBottom: 4,
            }}
          />

          <Avatar
            name={
              reply.user?.displayName ||
              "U"
            }
            size={28}
            fontSize={11}
          />
        </View>

        {/* RIGHT */}
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            backgroundColor: "#f8fafc",
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "#eef2f7",
            paddingHorizontal: 12,
            paddingVertical: 10,
          }}
        >
          {/* NAME */}
          <Text
            style={{
              fontSize: 14.5,
              fontWeight: "800",
              color: "#0f172a",
            }}
          >
            {reply.user?.displayName ||
              "User"}
          </Text>

          {/* TIME */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
              gap: 5,
            }}
          >
            <Clock
              size={10}
              color={colors.secondary}
              strokeWidth={2}
            />

            <Text
              style={{
                fontSize: 13,
                color: colors.secondary,
                fontWeight: "600",
              }}
            >
              now
            </Text>
          </View>

          {/* MESSAGE */}
          <Text
            style={{
              fontSize: 15.5,
              lineHeight: 26,
              color: "#334155",
              marginTop: 10,
              fontWeight: "500",
            }}
          >
            {!!mentionUser && (
              <Text
                style={{
                  fontWeight: "700",
                  color: "#2563eb",
                }}
              >
                @{mentionUser}{" "}
              </Text>
            )}

            {message}
          </Text>

          {/* ACTIONS */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
              gap: 14,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Heart
                size={11}
                color="#64748b"
                strokeWidth={2.4}
              />

              <Text
                style={{
                  fontSize: 13.5,
                  color: "#64748b",
                  fontWeight: "700",
                }}
              >
                Like
              </Text>
            </TouchableOpacity>

            <ReplyInput
              answerId={answerId}
              parentCommentId={
                reply.id
              }
            />
          </View>
        </View>
      </View>
    );
  };

  // COMMENT
  const renderComment = (
    comment: any,
    index: number
  ) => {
    const flatReplies =
      flattenReplies(
        comment.replies || []
      );

    return (
      <View
        key={comment.id}
        style={{
          marginTop: 16,
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        {/* AVATAR */}
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Avatar
            name={
              comment.user
                ?.displayName || "U"
            }
            size={38}
            fontSize={15}
          />

          {flatReplies.length > 0 && (
            <View
              style={{
                width: 1.5,
                flex: 1,
                backgroundColor:
                  "#e2e8f0",
                marginTop: 6,
                minHeight: 24,
              }}
            />
          )}
        </View>

        {/* CONTENT */}
        <View
          style={{
            flex: 1,
            marginLeft: 12,
          }}
        >
          <View
            style={{
              backgroundColor:
                "#ffffff",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#e8edf4",
              paddingHorizontal: 14,
              paddingVertical: 13,
            }}
          >
            {/* NAME */}
            <Text
              style={{
                fontSize: 15.5,
                fontWeight: "800",
                color: "#0f172a",
              }}
            >
              {comment.user
                ?.displayName ||
                "User"}
            </Text>

            {/* TIME */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
                gap: 5,
              }}
            >
              <Clock
                size={10}
                color="#94a3b8"
                strokeWidth={2}
              />

              <Text
                style={{
                  fontSize: 13.5,
                  color: "#94a3b8",
                  fontWeight: "600",
                }}
              >
                recently
              </Text>
            </View>

            {/* MESSAGE */}
            <Text
              style={{
                fontSize: 15.5,
                lineHeight: 25,
                color: "#334155",
                marginTop: 10,
                fontWeight: "400",
              }}
            >
              {comment.body
                .replace(
                  /@reply-\d+\s?/,
                  ""
                )
                .trim()}
            </Text>

            {/* ACTIONS */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 14,
                gap: 14,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Heart
                  size={12}
                  color="#64748b"
                  strokeWidth={2.4}
                />

                <Text
                  style={{
                    fontSize: 14,
                    color: "#64748b",
                    fontWeight: "700",
                  }}
                >
                  Like
                </Text>
              </TouchableOpacity>

              <ReplyInput
                answerId={answerId}
                parentCommentId={
                  comment.id
                }
              />

              {flatReplies.length >
                0 && (
                <View
                  style={{
                    flexDirection:
                      "row",
                    alignItems:
                      "center",
                    gap: 5,
                    marginLeft:
                      "auto",
                  }}
                >
                  <MessageCircle
                    size={11}
                    color="#94a3b8"
                    strokeWidth={2}
                  />

                  <Text
                    style={{
                      fontSize: 13.5,
                      color:
                        "#94a3b8",
                      fontWeight:
                        "600",
                    }}
                  >
                    {
                      flatReplies.length
                    }{" "}
                    {flatReplies.length ===
                    1
                      ? "reply"
                      : "replies"}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* REPLIES */}
          {flatReplies.length >
            0 && (
            <View
              style={{
                marginTop: 2,
                paddingLeft: 10,
              }}
            >
              {flatReplies.map(
                (reply) =>
                  renderReply(reply)
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: 14,
        paddingBottom: 24,
        paddingTop: 4,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 4,
          marginTop: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor:
              "#edf2f7",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            backgroundColor:
              "#f8fafc",
            borderWidth: 1,
            borderColor: "#e2e8f0",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 999,
            marginHorizontal: 12,
          }}
        >
          <MessageCircle
            size={11}
            color="#64748b"
            strokeWidth={2.5}
          />

          <Text
            style={{
              fontSize: 13,
              color: "#64748b",
              fontWeight: "800",
              letterSpacing: 1.2,
              textTransform:
                "uppercase",
            }}
          >
            {data.length}{" "}
            {data.length === 1
              ? "Reply"
              : "Replies"}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor:
              "#edf2f7",
          }}
        />
      </View>

      {/* COMMENTS */}
      {commentsTree.map(
        (comment, index) =>
          renderComment(
            comment,
            index
          )
      )}
    </View>
  );
}