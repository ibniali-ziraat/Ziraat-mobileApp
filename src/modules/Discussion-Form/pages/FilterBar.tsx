// import { colors } from "@/src/constants/colors";
// import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { FilterType } from "../screen/ChatScreen";


// const FILTERS: { key: FilterType; label: string }[] = [
//   { key: "newest", label: "Newest" },
//   { key: "active", label: "Active" },
//   { key: "unanswered", label: "Unanswered" },
// ];

// type Props = {
//   active: FilterType;
//   onChange: (f: FilterType) => void;
// };

// export default function FilterBar({ active, onChange }: Props) {
//   return (
//     <View
//       style={{
//         borderBottomWidth: 1,
//         borderBottomColor: colors.cardBorder,
//         backgroundColor: colors.light,
//       }}
//     >
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}
//       >
//         {FILTERS.map((f) => {
//           const isActive = active === f.key;
//           return (
//             <TouchableOpacity
//               key={f.key}
//               onPress={() => onChange(f.key)}
//               style={{
//                 paddingHorizontal: 14,
//                 paddingVertical: 6,
//                 borderRadius: 20,
//                 borderWidth: 1.5,
//                 borderColor: isActive ? colors.primary : "#e0e0e0",
//                 backgroundColor: isActive ? colors.primary : "transparent",
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 12,
//                   fontWeight: "700",
//                   color: isActive ? colors.light : "#666",
//                 }}
//               >
//                 {f.label}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// }