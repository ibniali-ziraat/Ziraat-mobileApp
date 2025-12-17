// import { colors } from "@/src/constants/colors";
// import { Feather } from "@expo/vector-icons";
// import { Text, TouchableOpacity, View } from "react-native";

// export default function SectionCard({
//   title,
//   onEdit,
//   onDelete,
//   children,
//   style,
// }) {
//   return (
//     <View className="border border-slate-300 p-5 rounded-sm mb-5" style={style}>
//       <View className="flex-row justify-between mb-3">
//         <Text className="text-base font-semibold">{title}</Text>

//         <View className="flex-row gap-3">
//           {onEdit && (
//             <TouchableOpacity onPress={onEdit}>
//               <Feather name="edit-3" size={18} color={colors.primary} />
//             </TouchableOpacity>
//           )}

//           {onDelete && (
//             <TouchableOpacity onPress={onDelete}>
//               <Feather name="trash-2" size={18} color="red" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {children}
//     </View>
//   );
// }


import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function SectionCard({
  title,
  icon,
  onEdit,
  onDelete,
  children,
  style,
}) {
  return (
    <View
      className="  rounded-sm mb-5 mt-5"
      style={style}
    >
      <View className="flex-row justify-between mb-3">

        {/* LEFT : Icon + Title */}
        <View className="flex-row items-center gap-2">
          {icon}
          <Text className="text-lg font-semibold">{title}</Text>
        </View>

        {/* RIGHT : Edit/Delete */}
        <View className="flex-row gap-3">
          {onEdit && (
            <TouchableOpacity onPress={onEdit}>
              <Feather name="edit-3" size={18} color={colors.primary} />
            </TouchableOpacity>
          )}

          {onDelete && (
            <TouchableOpacity onPress={onDelete}>
              <Feather name="trash-2" size={18} color="red" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {children}
    </View>
  );
}
