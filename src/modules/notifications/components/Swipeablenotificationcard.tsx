import { colors } from "@/src/constants/colors";
import { Trash2 } from "lucide-react-native";
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StoredNotification } from "../types/Notification.types";
import { timeAgo } from "../utils/timeAge";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DELETE_THRESHOLD = -72;
const SWIPE_FULL = -SCREEN_WIDTH;

interface Props {
  item: StoredNotification;
  onDelete: (id: string) => void;
}

export default function SwipeableNotificationCard({ item, onDelete }: Props) {
  const translateX = useRef(new Animated.Value(0)).current;
  const rowScale = useRef(new Animated.Value(1)).current;
  const deleteOpacity = useRef(new Animated.Value(0)).current;
  let startX = 0;

  const onTouchStart = (e: any) => {
    startX = e.nativeEvent.pageX;
  };

  const onTouchMove = (e: any) => {
    const dx = e.nativeEvent.pageX - startX;
    if (dx > 0) return;
    translateX.setValue(Math.max(dx, -100));
    deleteOpacity.setValue(Math.min(1, Math.abs(dx) / 72));
  };

  const onTouchEnd = (e: any) => {
    const dx = e.nativeEvent.pageX - startX;
    if (dx < DELETE_THRESHOLD) {
      Animated.spring(translateX, {
        toValue: -80,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: false,
        }),
        Animated.timing(deleteOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const confirmDelete = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: SWIPE_FULL,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(rowScale, {
        toValue: 0,
        duration: 260,
        delay: 160,
        useNativeDriver: false,
      }),
    ]).start(() => onDelete(item.id));
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [
            {
              scaleY: rowScale.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
          overflow: "hidden",
        },
      ]}
    >
      <View style={styles.rowWrap}>
        {/* Delete background */}
        <Animated.View style={[styles.deleteBack, { opacity: deleteOpacity }]}>
          <TouchableOpacity
            style={styles.deleteAction}
            onPress={confirmDelete}
            activeOpacity={0.8}
          >
            <Trash2 size={20} color={colors.light} />
            <Text style={styles.deleteLabel}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Swipeable card */}
        <Animated.View
          style={[styles.card, { transform: [{ translateX }] }]}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <View style={styles.accent} />
          <View style={styles.cardBody}>
            <View style={styles.cardTop}>
              <View style={styles.unreadDot} />
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.cardTime}>{timeAgo(item.receivedAt)}</Text>
            </View>

            {item.body ? (
              <Text style={styles.cardMessage} numberOfLines={2}>
                {item.body}
              </Text>
            ) : null}

            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            ) : null}
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  rowWrap: {
    position: "relative",
  },
  deleteBack: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: colors.error,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteAction: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  deleteLabel: {
    fontSize: 11,
    color: colors.light,
    fontWeight: "700",
  },
  card: {
    backgroundColor: colors.light,
    borderRadius: 16,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: colors.cardShadow,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  accent: {
    width: 4,
    backgroundColor: colors.primary,
  },
  cardBody: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 4,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.dark,
    flex: 1,
  },
  cardTime: {
    fontSize: 11,
    color: colors.darkHover,
    fontWeight: "400",
  },
  cardMessage: {
    fontSize: 13,
    color: colors.neutral,
    lineHeight: 19,
  },
  cardImage: {
    width: "100%",
    height: 130,
    borderRadius: 10,
    marginTop: 10,
  },
});
