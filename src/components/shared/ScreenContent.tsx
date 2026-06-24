// // src/components/layout/ScreenContent.tsx
// import { View } from "react-native";

// export function ScreenContent({ children, className = "" }) {
//   return (
//     <View style={{ paddingHorizontal: 15 }} className={className}>
//       {children}
//     </View>
//   );
// }

// src/components/layout/ScreenContent.tsx
import { View } from "react-native";

export function ScreenContent({ children, className = "" }) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 15 }} className={className}>
      {children}
    </View>
  );
}
