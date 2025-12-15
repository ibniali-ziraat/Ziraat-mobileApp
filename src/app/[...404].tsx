import { colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { ThumbsUp } from "lucide-react-native";
import { Image, Text, View } from "react-native";
import RatingStars from "../components/shared/RatingStars";
import ZiraatCard from "../components/shared/ZiraatProfileCard";
import BackHeader from "../components/shared/BackHeader";

export default function NotFoundPage() {
  const router = useRouter();
  const CARD_WIDTH = "90%";
  const CARD_HEIGHT = 130;

  return (
    <View className="flex-1 bg-light">
      <BackHeader title="Back" />

      {/* Content */}
      <View className="flex-1 justify-center items-center">
        {/* Logo */}
        <Text className="mb-6" onPress={() => router.replace("/")}>
          <Image
            source={require("../../assets/images/logo.jpeg")}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain", // fits image without stretching
            }}
          />
        </Text>

        {/* Title */}
        <Text
          className="text-2xl font-semibold mb-2 text-center"
          style={{ color: colors.primary }}
        >
          We're Working on It
        </Text>

        {/* Description */}
        <Text className="text-base text-center" style={{ color: colors.dark }}>
          This page is under construction. Check back soon!
        </Text>
      </View>
    </View>
  );
}

//     <View
//   style={{
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: colors.bgColor
//   }}
// >

//   {/* MAIN LARGE CARD */}
//  <ZiraatCard
//   width="96%"
//   height=  "20%"    // height auto based on content → remove fixed height
//   paddingVertical={1}      // optional: inner spacing
//   paddingHorizontal={1}
//   borderRadius={16}        // same as your design
// >
//   {/* Review Content */}
//   <View className="w-full">

//     {/* Header: User + Date + Rating */}
//     <View className="flex-row items-center justify-between mb-1">
//       <View className="flex-row items-center">
//         <View className="w-10 h-10 rounded-full justify-center items-center mr-3 border border-secondary">
//           {/* <User size={20} color={colors.secondary} /> */}
//         </View>

//         <View>
//           <Text className="font-semibold text-xl">{"John Doe"}</Text>
//           <Text className="text-md text-dark">{"Jan 15, 2025"}</Text>
//         </View>
//       </View>

//       <RatingStars rating={"******"} size={16} />
//     </View>

//     {/* Comment */}
//     <Text className="text-dark mt-1">{"Great Product! very useful and high quality"}</Text>

//     {/* Helpful Section */}
//     <View className="flex-row items-center mt-3 mb-1">
//       <ThumbsUp
//         size={20}
//         color={colors.secondary}
//         fill={colors.secondary}
//       />
//       <Text className="text-dark ml-1 text-sm">
//         {"20"} People found it helpful
//       </Text>
//     </View>

//   </View>
// </ZiraatCard>

// </View>
