// // import { View } from "react-native";

// // export default function FormFieldWrapper({ children }) {
// //   return (
// //     <View className="mb-4 px-3">
// //       <View className="bg-white rounded-xl shadow-sm p-2">
// //         {children}
// //       </View>
// //     </View>
// //   );
// // }



// import { colors } from "@/src/constants/colors";
// import { View } from "react-native";

// type Props = {
//   children: React.ReactNode;
//   isFocused?: boolean;
//   hasError?: boolean;
// };

// export default function FormFieldWrapper({
//   children,
//   isFocused = false,
//   hasError = false,
// }: Props) {
//   const borderColor = hasError
//     ? colors.error
//     : isFocused
//     ? colors.primary
//     : colors.neutral;

//   return (
//     <View style={{ marginBottom: 12 }}>
//       <View
//         style={{
//           backgroundColor: colors.light,
//           borderRadius: 18,
         
//           borderColor,
//           padding: 2,
//         }}
//       >
//         {children}
//       </View>
//     </View>
//   );
// }


import { colors } from "@/src/constants/colors";
import { View } from "react-native";

type Props = {
  children: React.ReactNode;
  isFocused?: boolean;
  hasError?: boolean;
};

export default function FormFieldWrapper({
  children,
  isFocused = false,
  hasError = false,
}: Props) {
  const borderColor = hasError
    ? colors.error
    : isFocused
    ? colors.primary
    : colors.border ?? colors.neutral;

  return (
    <View style={{ marginBottom: 10 }}>
      <View
        style={{
          backgroundColor: colors.light,
          borderRadius: 16,
         
          borderColor,
          paddingHorizontal: 4,
          paddingVertical: 2,
        }}
      >
        {children}
      </View>
    </View>
  );
}
