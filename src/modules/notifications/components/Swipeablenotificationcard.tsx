import { colors } from "@/src/constants/colors";
import { Bell, Trash2 } from "lucide-react-native";
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

    translateX.setValue(Math.max(dx, -90));
    deleteOpacity.setValue(Math.min(1, Math.abs(dx) / 70));
  };

  const onTouchEnd = (e: any) => {
    const dx = e.nativeEvent.pageX - startX;

    if (dx < DELETE_THRESHOLD) {
      Animated.spring(translateX, {
        toValue: -72,
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
        duration: 220,
        useNativeDriver: false,
      }),

      Animated.timing(rowScale, {
        toValue: 0,
        duration: 240,
        delay: 120,
        useNativeDriver: false,
      }),
    ]).start(() => onDelete(item.id));
  };

  return (
    <Animated.View
      className="mb-[2px]"
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
        {/* Delete Background */}
        <Animated.View
          className="absolute right-0 top-0 bottom-0 w-[72px] items-center justify-center rounded-[16px]"
          style={{
            opacity: deleteOpacity,
          }}
        >
          <TouchableOpacity
            onPress={confirmDelete}
            activeOpacity={0.8}
            className="items-center justify-center"
          >
            <Trash2 size={18} color="#DC2626" />
          </TouchableOpacity>
        </Animated.View>

        {/* Card */}
        <Animated.View
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="bg-white border border-[#ECECEC] rounded-[16px] flex-row px-[14px] py-[14px]"
          style={{
            transform: [{ translateX }],
          }}
        >
          {/* Left Icon */}
          <View className="mr-[12px]">
            <View className="w-[42px] h-[42px] rounded-full items-center justify-center bg-red-100">
              <Bell size={18} color={colors.secondary} />
            </View>
          </View>

          {/* Content */}
          <View className="flex-1">
            <View className="flex-row items-start justify-between">
              <Text
                numberOfLines={1}
                className="flex-1 text-[14px] font-semibold pr-2"
                style={{ color: colors.dark }}
              >
                {item.title}
              </Text>

              <Text className="text-[10px]" style={{ color: colors.darkHover }}>
                {timeAgo(item.receivedAt)}
              </Text>
            </View>

            {item.body ? (
              <Text
                numberOfLines={2}
                className="text-[12.5px] leading-[18px] mt-[4px]"
                style={{ color: colors.neutral }}
              >
                {item.body}
              </Text>
            ) : null}

            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                resizeMode="cover"
                className="w-full h-[120px] rounded-[12px] mt-[10px]"
              />
            ) : null}
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
