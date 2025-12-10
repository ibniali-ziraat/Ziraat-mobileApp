// // // // components/home/ForecastList.tsx
// // // import { Ionicons } from "@expo/vector-icons";
// // // import React from "react";
// // // import { Text, View } from "react-native";

// // // export default function ForecastList() {
// // //   const forecast = [
// // //     { day: "Fri", icon: "sunny-outline", temp: "29°C" },
// // //     { day: "Sat", icon: "partly-sunny-outline", temp: "30°C" },
// // //     { day: "Sun", icon: "rainy-outline", temp: "27°C" },
// // //   ];

// // //   return (
// // //     <View className="flex-row justify-between mb-8 px-1">
// // //       {forecast.map((item, i) => (
// // //         <View
// // //           key={i}
// // //           className="w-[30%] bg-[#f9fdf8] rounded-2xl p-4 items-center border border-[#dbeed4] shadow-sm"
// // //         >
// // //           <Ionicons name={item.icon} size={30} color="#c7611f" />
// // //           <Text className="font-semibold mt-2 text-gray-800">{item.day}</Text>
// // //           <Text className="text-gray-600 text-sm">{item.temp}</Text>
// // //         </View>
// // //       ))}
// // //     </View>
// // //   );
// // // }


// // // components/home/ForecastList.tsx
// // import { Ionicons } from "@expo/vector-icons";
// // import React from "react";
// // import { Text, View } from "react-native";

// // export default function ForecastList() {
// //   const forecast = [
// //     { day: "Fri", icon: "sunny-outline", temp: "29°C" },
// //     { day: "Sat", icon: "partly-sunny-outline", temp: "30°C" },
// //     { day: "Sun", icon: "rainy-outline", temp: "27°C" },
// //   ];

// //   return (
// //     <View className="flex-row justify-between mb-8 px-1">
// //       {forecast.map((item, i) => (
// //         <View
// //           key={i}
// //           className="w-[30%] bg-white rounded-xl p-4 items-center border border-[#e7efe5]"
// //           style={{
// //             shadowColor: "#000",
// //             shadowOpacity: 0.05,
// //             shadowRadius: 4,
// //             elevation: 1,
// //           }}
// //         >
// //           <Ionicons name={item.icon} size={28} color="#c7611f" />
// //           <Text className="font-semibold mt-2 text-gray-800">{item.day}</Text>
// //           <Text className="text-gray-600 text-sm">{item.temp}</Text>
// //         </View>
// //       ))}
// //     </View>
// //   );
// // }
// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { Text, View, ScrollView } from "react-native";

// const forecast = [
//   { day: "Mon", temp: "29°", low: "15°", rain: "20%", icon: "partly-sunny-outline" },
//   { day: "Tue", temp: "27°", low: "14°", rain: "40%", icon: "sunny-outline" },
//   { day: "Wed", temp: "25°", low: "12°", rain: "60%", icon: "rainy-outline" },
//   { day: "Thu", temp: "28°", low: "14°", rain: "10%", icon: "cloud-outline" },
//   { day: "Fri", temp: "30°", low: "13°", rain: "20%", icon: "cloud-outline" },
//   { day: "Sat", temp: "31°", low: "16°", rain: "30%", icon: "partly-sunny-outline" },
//   { day: "Sun", temp: "26°", low: "12°", rain: "50%", icon: "rainy-outline" },
// ];

// export default function SevenDayForecast() {
//   return (
//     <View className="mb-6">
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 4 }}
//       >
//         {forecast.map((item, i) => (
//           <View
//             key={i}
//             className="mr-4 p-4 rounded-2xl"
//             style={{
//               width: 90,
//               backgroundColor: "#ffffff",
//               borderWidth: 1,
//               borderColor: "rgba(0,0,0,0.05)",
//               shadowColor: "#000",
//               shadowOpacity: 0.05,
//               shadowRadius: 5,
//               elevation: 2,
//             }}
//           >
//             {/* Day */}
//             <Text className="text-gray-900 text-[15px] font-semibold text-center">
//               {item.day}
//             </Text>

//             {/* Icon */}
//             <View className="items-center my-2">
//               <View
//                 style={{
//                   padding: 8,
//                   borderRadius: 40,
//                   backgroundColor: "rgba(0,0,0,0.04)",
//                 }}
//               >
//                 <Ionicons name={item.icon} size={24} color="#5f6d76" />
//               </View>
//             </View>

//             {/* Temp */}
//             <View className="items-center">
//               <Text className="text-gray-900 font-bold text-[16px]">
//                 {item.temp}
//               </Text>
//               <Text className="text-gray-500 text-[12px]">{item.low}</Text>
//             </View>

//             {/* Rain badge */}
//             <View className="items-center mt-2">
//               <View
//                 style={{
//                   backgroundColor:
//                     parseInt(item.rain) > 40
//                       ? "rgba(255, 102, 102, 0.25)"
//                       : "rgba(80, 140, 255, 0.25)",
//                   paddingVertical: 3,
//                   paddingHorizontal: 10,
//                   borderRadius: 12,
//                 }}
//               >
//                 <Text className="text-[11px] font-semibold text-gray-800">
//                   {item.rain}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// components/home/SevenDayForecast.tsx
import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";

const forecast = [
  { day: "Mon", temp: "29°", low: "15°", rain: "20%", icon: "partly-sunny-outline" },
  { day: "Tue", temp: "27°", low: "14°", rain: "40%", icon: "sunny-outline" },
  { day: "Wed", temp: "25°", low: "12°", rain: "60%", icon: "rainy-outline" },
  { day: "Thu", temp: "28°", low: "14°", rain: "10%", icon: "cloud-outline" },
  { day: "Fri", temp: "30°", low: "13°", rain: "20%", icon: "cloud-outline" },
  { day: "Sat", temp: "31°", low: "16°", rain: "30%", icon: "partly-sunny-outline" },
  { day: "Sun", temp: "26°", low: "12°", rain: "50%", icon: "rainy-outline" },
];

export default function SevenDayForecast() {
  return (
    <View className="mb-6">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 6 }}
      >
        {forecast.map((item, index) => (
          <AnimatedForecastCard key={index} item={item} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}

// -------------------- Animated Card Component -----------------------

function AnimatedForecastCard({ item, index }) {
  const rainValue = parseInt(item.rain);

  // Animation shared values
  const fadeIn = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scale = useSharedValue(1);
  const tilt = useSharedValue(0);
  const iconFloat = useSharedValue(0);

  // Run entrance animation
  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 450 + index * 120 });
    translateY.value = withSpring(0, { damping: 11 });

    // Floating icon animation
    iconFloat.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  // Card animation
  const cardStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
      { rotateZ: `${tilt.value}deg` },
    ],
  }));

  // Icon bob animation
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: iconFloat.value }],
  }));

  return (
    <Animated.View
      style={[cardStyle]}
      className="mr-4"
      onTouchStart={() => {
        scale.value = withSpring(0.94);
        tilt.value = withSpring(-2);
      }}
      onTouchEnd={() => {
        scale.value = withSpring(1);
        tilt.value = withSpring(0);
      }}
    >
      <View
        style={{
          width: 95,
          padding: 14,
          borderRadius: 18,
          backgroundColor: colors.light,
          borderWidth: 1,
          borderColor: colors.neutral,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 7,
          elevation: 3,
        }}
      >
        {/* Day */}
        <Text
          className="text-center text-[15px] font-semibold"
          style={{ color: colors.dark }}
        >
          {item.day}
        </Text>

        {/* Floating Weather Icon */}
        <Animated.View className="items-center my-3" style={iconStyle}>
          <View
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: colors.primary + "15",
              shadowColor: colors.primary,
              shadowOpacity: 0.15,
              shadowRadius: 8,
            }}
          >
            <Ionicons name={item.icon} size={26} color={colors.secondary} />
          </View>
        </Animated.View>

        {/* Temperature */}
        <View className="items-center mt-1 mb-1">
          <Text
            className="font-extrabold text-[18px]"
            style={{ color: colors.dark }}
          >
            {item.temp}
          </Text>
          <Text className="text-[12px] mt-0.5" style={{ color: colors.dark + "99" }}>
            {item.low}
          </Text>
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: colors.neutral,
            marginVertical: 6,
            opacity: 0.6,
          }}
        />

        {/* Rain badge */}
        <View className="items-center">
          <View
            style={{
              backgroundColor:
                rainValue > 40
                  ? colors.secondary + "33"
                  : colors.primary + "33",
              paddingVertical: 4,
              paddingHorizontal: 12,
              borderRadius: 12,
            }}
          >
            <Text
              className="text-[11px] font-semibold"
              style={{ color: colors.dark }}
            >
              {item.rain}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
