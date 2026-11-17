import { colors } from "@/src/constants/colors";
import { getNotificationArt } from "@/src/constants/iconArt";
import { ChevronRight, Trash2 } from "lucide-react-native";
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { StoredNotification } from "../types/Notification.types";
import { timeAgo } from "../utils/timeAge";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DELETE_THRESHOLD = -40;
const SWIPE_FULL = -SCREEN_WIDTH;
// a touch that moves less than this counts as a tap, not a swipe/scroll
const TAP_SLOP = 8;

interface Props {
  item: StoredNotification;
  onDelete: (id: string) => void;
  // only passed for notifications that lead somewhere (e.g. advisories)
  onPress?: (item: StoredNotification) => void;
}

export default function SwipeableNotificationCard({
  item,
  onDelete,
  onPress,
}: Props) {
  const { art, tint } = getNotificationArt(item.title, item.body);
  const translateX = useRef(new Animated.Value(0)).current;
  const rowScale = useRef(new Animated.Value(1)).current;
  const deleteOpacity = useRef(new Animated.Value(0)).current;

  // refs, not lets: a re-render between touch start and end would reset them
  const startX = useRef(0);
  const startY = useRef(0);
  const isOpen = useRef(false);

  const onTouchStart = (e: any) => {
    startX.current = e.nativeEvent.pageX;
    startY.current = e.nativeEvent.pageY;
  };

  const onTouchMove = (e: any) => {
    const dx = e.nativeEvent.pageX - startX.current;

    if (dx > 0) return;

    translateX.setValue(Math.max(dx, -90));
    deleteOpacity.setValue(Math.min(1, Math.abs(dx) / 70));
  };

  const onTouchEnd = (e: any) => {
    const dx = e.nativeEvent.pageX - startX.current;
    const dy = e.nativeEvent.pageY - startY.current;
    const isTap = Math.abs(dx) < TAP_SLOP && Math.abs(dy) < TAP_SLOP;

    if (isTap && onPress && !isOpen.current) {
      onPress(item);
      return;
    }

    if (dx < DELETE_THRESHOLD) {
      isOpen.current = true;
      Animated.spring(translateX, {
        toValue: -72,
        useNativeDriver: false,
      }).start();
    } else {
      isOpen.current = false;
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
            <View
              className="w-[44px] h-[44px] rounded-full items-center justify-center"
              style={{ backgroundColor: tint }}
            >
              <SvgXml xml={art} width={26} height={26} />
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

            {onPress ? (
              <View className="flex-row items-center mt-[6px]">
                <Text
                  className="text-[12px] font-semibold"
                  style={{ color: colors.primary }}
                >
                  View advisories
                </Text>
                <ChevronRight size={14} color={colors.primary} />
              </View>
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
