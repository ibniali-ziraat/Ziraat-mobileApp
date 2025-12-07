import { colors } from "@/src/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function OfferCard({ item, type }) {
  const isVendor = type === "vendor";
  const toneColor = isVendor ? colors.primary : colors.secondary;
  const toneHover = isVendor ? colors.primaryHover : colors.secondaryHover;

  return (
    <Pressable
      className="rounded-2xl mb-5"
      style={{
        padding: 18,
        borderWidth: 1,
        borderColor: colors.neutral,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
       
      }}
    >
      {/* TOP ROW */}
      <View className="flex-row items-center">
        {/* Icon Box */}
        <View
          className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
         
        >
          <MaterialCommunityIcons
            name={item.icon}
            size={26}
            color={colors.secondary}
          />
        </View>

        {/* TITLE + DESCRIPTION */}
        <View className="flex-1">
          <Text
            className="text-[17px] font-semibold"
            style={{ color: colors.dark }}
          >
            {item.title}
          </Text>

          <Text
            className="text-[13px] mt-1 leading-4"
            style={{ color: colors.dark }}
            numberOfLines={2}
          >
            {item.desc}
          </Text>
        </View>

        {/* CHEVRON */}
        <Ionicons name="chevron-forward" size={22} color={colors.dark} />
      </View>

      {/* BADGE */}
      <View
        className="px-3 py-[4px] mt-3 rounded-full self-start"
        style={{
          backgroundColor: toneColor + "15",
          borderWidth: 1,
          borderColor: toneColor,
        }}
      >
        <Text
          className="text-[11px] font-semibold"
          style={{ color: toneColor }}
        >
          {item.badge}
        </Text>
      </View>

      {/* EXTRA DETAILS */}
      <View className="mt-4">
        {/* Validity */}
        <View className="flex-row items-center mb-2">
          <Ionicons name="calendar-outline" size={16} color={colors.secondary} />
          <Text
            className="ml-2 text-[12px]"
            style={{ color: colors.dark }}
          >
            Valid Till: {item.validity || "31 Dec 2024"}
          </Text>
        </View>

        {/* Minimum Order */}
        <View className="flex-row items-center mb-2">
          <Ionicons name="cube-outline" size={16} color={colors.secondary} />
          <Text
            className="ml-2 text-[12px]"
            style={{ color: colors.dark }}
          >
            Min Order: {item.minOrder || "₹2,000"}
          </Text>
        </View>

        {/* Benefits */}
        <View className="flex-row flex-wrap mt-1">
          {(item.benefits || ["Increased Sales", "Higher Visibility"]).map(
            (b, i) => (
              <View
                key={i}
                className="px-2 py-[4px] rounded-lg mr-2 mb-2"
                style={{
                  backgroundColor: toneColor + "10",
                  borderWidth: 1,
                  borderColor: toneColor + "40",
                }}
              >
                <Text className="text-[10px]" style={{ color: toneColor }}>
                  {b}
                </Text>
              </View>
            )
          )}
        </View>
      </View>

       {/* OFFER STRENGTH */}
        <View className="mt-4">
          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[11px]"
              style={{ color: colors.dark }}
            >
              Offer Strength
            </Text>
            <Text
              className="text-[11px] font-semibold"
              style={{ color: toneColor }}
            >
              {item.strength || 70}%
            </Text>
          </View>

          <View
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: colors.neutral }}
          >
            <View
              className="h-full rounded-full"
              style={{
                width: `${item.strength || 70}%`,
                backgroundColor: toneColor,
              }}
            />
          </View>
        </View>
    </Pressable>
  );
}
