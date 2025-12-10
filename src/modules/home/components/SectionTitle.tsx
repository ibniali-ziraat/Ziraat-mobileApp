// // components/home/SectionTitle.tsx
// import React from "react";
// import { Text, View } from "react-native";

// export default function SectionTitle({ title, icon }) {
//   return (
//     <View className="flex-row items-center mb-3 px-2 mt-2">
//       {icon && icon}
//       <Text className="text-lg font-semibold text-gray-800 ml-2">{title}</Text>
//     </View>
//   );
// }


// components/home/SectionTitle.tsx
import React from "react";
import { Text, View } from "react-native";

export default function SectionTitle({ title }) {
  return (
    <View className="mb-3 px-1 mt-4">
      <Text className="text-[18px] font-semibold text-gray-800">{title}</Text>
    </View>
  );
}
