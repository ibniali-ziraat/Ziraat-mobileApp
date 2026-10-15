import {
  ArrowBigUp,
  Bookmark,
  Eye,
  Heart,
  Laugh,
  Share2,
  SmilePlus,
  Trash2,
} from "lucide-react-native";
import { useState } from "react";
import { Share, Text, TouchableOpacity, View } from "react-native";

import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";
import { colors } from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  useAddBookmark,
  useBookmarks,
  useDeleteQuestion,
  useRemoveBookmark,
  useVote,
} from "../hooks/useQuestion";

/* ================= ICON PILL ================= */
function IconPill({ children, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 36,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: colors.light,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </TouchableOpacity>
  );
}

/* ================= VOTE ================= */
// Single tappable upvote pill — just the count, backed by the real
// /api/forum/votes endpoint. No separate up/down arrow buttons.
function VoteColumn({ votes = 0, targetId, targetType, userId }: any) {
  const [count, setCount] = useState(votes);
  const [voted, setVoted] = useState(false);

  const { mutate: voteApi, isPending } = useVote();

  const handleVote = () => {
    if (isPending || !userId) return;

    const newVoted = !voted;
    const newCount = count + (newVoted ? 1 : -1);

    setVoted(newVoted);
    setCount(newCount);

    voteApi(
      { userId, targetId, targetType, value: newVoted ? 1 : 0 },
      {
        onError: () => {
          setVoted(voted);
          setCount(count);
        },
      }
    );
  };

  return (
    <TouchableOpacity
      onPress={handleVote}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        height: 36,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: voted ? colors.primary + "40" : colors.cardBorder,
        backgroundColor: voted ? colors.primary + "14" : colors.light,
      }}
    >
      <ArrowBigUp
        size={16}
        color={voted ? colors.primary : colors.overlay}
        fill={voted ? colors.primary : "transparent"}
      />
      <Text
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: voted ? colors.primary : "#555",
        }}
      >
        {count}
      </Text>
    </TouchableOpacity>
  );
}

/* ================= FOOTER ================= */
export default function MessageFooter({ item, depth, views }: any) {
  const isQuestion = depth === 0;
  const { userId } = useAuth();

  const authorId = item.userId ?? item.user?.id ?? null;
  const isOwner = !!userId && authorId != null && Number(authorId) === Number(userId);

  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] =
    useState<"heart" | "laugh" | "smile" | null>(null);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const { mutate: deleteQuestionApi, isPending } = useDeleteQuestion();

  /* BOOKMARK — only meaningful for questions, per the bookmarks API */
  const { data: bookmarksData } = useBookmarks(isQuestion ? Number(userId) : 0);
  const bookmarks: any[] = Array.isArray(bookmarksData)
    ? bookmarksData
    : Array.isArray(bookmarksData?.bookmarks)
      ? bookmarksData.bookmarks
      : [];
  const isBookmarked = bookmarks.some(
    (b: any) => Number(b.questionId ?? b.question?.id ?? b.id) === Number(item.id),
  );
  const { mutate: addBookmarkApi, isPending: isBookmarking } = useAddBookmark();
  const { mutate: removeBookmarkApi, isPending: isUnbookmarking } = useRemoveBookmark();

  const handleBookmarkToggle = () => {
    if (!userId || isBookmarking || isUnbookmarking) return;
    if (isBookmarked) {
      removeBookmarkApi({ userId: Number(userId), questionId: Number(item.id) });
    } else {
      addBookmarkApi({ userId: Number(userId), questionId: Number(item.id) });
    }
  };

  /* ✅ SHARE FUNCTION */
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${item.title || "Check this question"}\n\n${
          item.content || ""
        }\n\nhttps://yourapp.com/questions/${item.id}`,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  const handleDelete = () => {
    deleteQuestionApi(Number(item.id), {
      onSuccess: () => setDeleteModalVisible(false),
      onError: () => setDeleteModalVisible(false),
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
     
     
        borderTopWidth: 1,
        borderTopColor: colors.cardBorder,
      }}
    >
      {/* LEFT */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <VoteColumn
          votes={item.votes}
          targetId={Number(item.id)}
          targetType={isQuestion ? "question" : "answer"}
          userId={userId ? Number(userId) : null}
        />

        {/* REACTIONS */}
        <View style={{ position: "relative" }}>
          {showReactions && (
            <View
              style={{
                position: "absolute",
                bottom: 44,
                left: -20,
                flexDirection: "row",
                gap: 10,
                backgroundColor: colors.light,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: colors.cardBorder,
                elevation: 8,
              }}
            >
              <TouchableOpacity onPress={() => { setSelectedReaction("heart"); setShowReactions(false); }}>
                <Heart size={20} color="#ff3366" fill="#ff3366" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setSelectedReaction("laugh"); setShowReactions(false); }}>
                <Laugh size={20} color="#ffb800" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setSelectedReaction("smile"); setShowReactions(false); }}>
                <SmilePlus size={20} color="#00b894" />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onPress={() => setShowReactions(!showReactions)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: colors.cardBorder,
              backgroundColor: colors.light,
            }}
          >
            {selectedReaction === "heart" ? (
              <Heart size={18} color="#ff3366" fill="#ff3366" />
            ) : selectedReaction === "laugh" ? (
              <Laugh size={18} color="#ffb800" />
            ) : selectedReaction === "smile" ? (
              <SmilePlus size={18} color="#00b894" />
            ) : (
              <Heart size={18} color={colors.overlay} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* RIGHT */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        {/* VIEWS */}
        <IconPill>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Eye size={14} color={colors.secondary} />
            <Text style={{ fontSize: 14 }}>{views}</Text>
          </View>
        </IconPill>

        {/* ✅ SHARE WORKING */}
        <IconPill onPress={handleShare}>
          <Share2 size={14} color={colors.secondary} />
        </IconPill>

        {/* BOOKMARK — questions only, matches the bookmarks API's scope */}
        {isQuestion && (
          <IconPill onPress={handleBookmarkToggle}>
            <Bookmark
              size={14}
              color={colors.secondary}
              fill={isBookmarked ? colors.secondary : "transparent"}
            />
          </IconPill>
        )}

        {/* DELETE */}
        {isOwner && isQuestion && (
          <>
            <TouchableOpacity
              onPress={() => setDeleteModalVisible(true)}
              style={{
                height: 36,
                width: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: colors.error + "25",
                backgroundColor: colors.error + "08",
              }}
            >
              <Trash2 size={16} color={colors.error} />
            </TouchableOpacity>

            <ConfirmDeleteModal
              visible={deleteModalVisible}
              title="Delete Question?"
              description="This question will be permanently removed."
              confirmText="Delete"
              cancelText="Cancel"
              loading={isPending}
              onCancel={() => setDeleteModalVisible(false)}
              onConfirm={handleDelete}
            />
          </>
        )}
      </View>
    </View>
  );
}