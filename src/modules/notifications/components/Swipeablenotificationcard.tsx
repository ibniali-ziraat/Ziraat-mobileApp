import { colors } from "@/src/constants/colors";
import { Trash2 } from "lucide-react-native";
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StoredNotification } from "../types/Notification.types";
import { timeAgo } from "../utils/timeAge";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DELETE_THRESHOLD = -40;
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
      className="mb-[12px]"
      style={{
        transform: [
          {
            scaleY: rowScale.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ],
        overflow: "hidden",
      }}
    >
      <View className="relative">
        {/* Delete background */}
        <Animated.View
          className="absolute right-0 top-0 bottom-0 w-20 rounded-[18px] items-center justify-center"
          style={{
            opacity: deleteOpacity,
            // backgroundColor: colors.error,
          }}
        >
          <TouchableOpacity
            className="items-center justify-center gap-[3px]"
            onPress={confirmDelete}
            activeOpacity={0.8}
          >
            <Trash2 size={20} color={colors.secondary} />

            {/* <Text
              className="text-[11px] font-bold"
              style={{ color: colors.light }}
            >
              Delete
            </Text> */}
          </TouchableOpacity>
        </Animated.View>

        {/* Swipeable card */}
        <Animated.View
          className="bg-white rounded-[20px] flex-row overflow-hidden border border-gray-200"
          style={{
            transform: [{ translateX }],
            // shadowColor: colors.dark,
            // shadowOpacity: 0.08,
            // shadowRadius: 8,
            // shadowOffset: { width: 0, height: 4 },
            // elevation: 4,
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <View className="flex-1 px-[15px] py-[14px]">
            <View className="flex-row items-center gap-[7px] mb-1">
              <Text
                className="text-[14px] font-bold flex-1"
                numberOfLines={1}
                style={{ color: colors.dark }}
              >
                {item.title}
              </Text>

              <Text
                className="text-[11px] font-normal"
                style={{ color: colors.darkHover }}
              >
                {timeAgo(item.receivedAt)}
              </Text>
            </View>

            {item.body ? (
              <Text
                className="text-[13px] leading-[19px]"
                numberOfLines={2}
                style={{ color: colors.neutral }}
              >
                {item.body}
              </Text>
            ) : null}

            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                className="w-full h-[130px] rounded-[12px] mt-[10px]"
                resizeMode="cover"
              />
            ) : null}
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
