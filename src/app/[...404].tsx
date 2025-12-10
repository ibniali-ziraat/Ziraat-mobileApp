import { useRouter } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function NotFoundPage() {
  const router = useRouter();
    const platformShadow = Platform.OS === "ios" ? styles.iosShadow : { elevation:7 };


  return (
    // <View className="flex-1 bg-light">
    //   <BackHeader title="Back" />

    //   {/* Content */}
    //   <View className="flex-1 justify-center items-center">
    //     {/* Logo */}
    //     <Text className="mb-6" onPress={() => router.replace("/")}>
    //       <Image
    //         source={require("../../assets/images/logo.jpeg")}
    //         style={{
    //           width: 100,
    //           height: 100,
    //           resizeMode: "contain", // fits image without stretching
    //         }}
    //       />
    //     </Text>

    //     {/* Title */}
    //     <Text
    //       className="text-2xl font-semibold mb-2 text-center"
    //       style={{ color: colors.primary }}
    //     >
    //       We're Working on It
    //     </Text>

    //     {/* Description */}
    //     <Text className="text-base text-center" style={{ color: colors.dark }}>
    //       This page is under construction. Check back soon!
    //     </Text>
    //   </View>
    // </View>
   <View 
  className="flex-1 w-full h-full justify-center items-center gap-4 "
  style={{ backgroundColor: "#FCFCFC" }}
>
  {/* Card 1 */}
  {/* PROFILE CARD (first card from screenshot) */}
  <View
    className="bg-white w-80 h-60 rounded-[32px] items-center justify-center"
    style={platformShadow}
  >
    {/* Black Circle Avatar */}
    <View className="w-20 h-20 rounded-full bg-black items-center justify-center mb-2">
      <View>
        <Text className="text-white text-3xl font-semibold">U</Text>
      </View>
    </View>

    {/* Name */}
    <Text className="text-black text-2xl font-semibold">Mr. Umer</Text>

    {/* Subtitle */}
    <Text className="text-[#8A8A8A] text-base">Guest</Text>
  </View>

  {/* Card 2 */}
  <View
    className="bg-[#FEFEFE] w-80 h-60 rounded-[32px] relative items-center justify-between"
    style={platformShadow}
    
  >
    <View className="flex-1 items-center justify-center" />
  </View>

  {/* Card 3 */}
  <View
    className="bg-white w-80 h-40 rounded-[32px] relative items-center justify-between"
    style={platformShadow}
  >
    <View className="flex-1 items-center justify-center" />
  </View>
</View>

  );
}

const styles = StyleSheet.create({
  iosShadow: {
    shadowColor: "#FCFCFC",       // light soft-white shadow
    shadowOffset: { width: 10, height: 10}, 
    shadowOpacity: 0.5,           // needs higher opacity because the color is very light
    shadowRadius: 12,             // spreads evenly on all sides
  },
});
