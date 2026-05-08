import {
  ChevronDown,
  ChevronUp,
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
import { useDeleteQuestion, useVote } from "../hooks/useQuestion";

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
function VoteColumn({ votes = 0, targetId, targetType }: any) {
  const [count, setCount] = useState(votes);
  const [vote, setVote] = useState(0);

  const { mutate: voteApi, isPending } = useVote();

  const handleVote = (value: number) => {
    if (isPending) return;

    let newVote = value;
    let newCount = count;

    if (vote === value) {
      newVote = 0;
      newCount = count - value;
    } else {
      newCount = count + value - vote;
    }

    setVote(newVote);
    setCount(newCount);

    voteApi(
      { userId: 2, targetId, targetType, value: newVote },
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
        alignItems: "center",
        height: 36,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: colors.light,
        overflow: "hidden",
      }}
    >
      <TouchableOpacity
        onPress={() => handleVote(1)}
        style={{
          paddingHorizontal: 10,
          justifyContent: "center",
          backgroundColor:
            vote === 1 ? colors.primary + "14" : "transparent",
        }}
      >
        <ChevronUp size={16} color={vote === 1 ? colors.primary : colors.overlay} />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 13,
          fontWeight: "700",
          minWidth: 20,
          textAlign: "center",
          color:
            vote === 1
              ? colors.primary
              : vote === -1
              ? colors.error
              : "#555",
        }}
      >
        {count}
      </Text>

      <TouchableOpacity
        onPress={() => handleVote(-1)}
        style={{
          paddingHorizontal: 10,
          justifyContent: "center",
          backgroundColor:
            vote === -1 ? colors.error + "14" : "transparent",
        }}
      >
        <ChevronDown size={16} color={vote === -1 ? colors.error : colors.overlay} />
      </TouchableOpacity>
    </View>
  );
}

/* ================= FOOTER ================= */
export default function MessageFooter({ item, depth, views }: any) {
  const isQuestion = depth === 0;
  const isOwner = true;

  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] =
    useState<"heart" | "laugh" | "smile" | null>(null);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const { mutate: deleteQuestionApi, isPending } = useDeleteQuestion();

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
            <Text style={{ fontSize: 12 }}>{views}</Text>
          </View>
        </IconPill>

        {/* ✅ SHARE WORKING */}
        <IconPill onPress={handleShare}>
          <Share2 size={14} color={colors.secondary} />
        </IconPill>

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