
// import { colors } from "@/src/constants/colors";
// import { Heart, MessageCircle } from "lucide-react-native";
// import { Text, TouchableOpacity, View } from "react-native";

// export default function DiscussionItem({ item }) {
//   return (
//     <View style={{ marginBottom: 18 }}>
//       <View style={{ flexDirection: "row", alignItems: "flex-start" }}>

   
//         <View style={{ position: "relative" }}>
//           <View
//             style={{
//               width: 38,
//               height: 38,
//               borderRadius: 19,
//               backgroundColor: colors.primary,
//               alignItems: "center",
//               justifyContent: "center",
//               elevation: 2,
//             }}
//           >
//             <Text
//               style={{
//                 color: colors.light,
//                 fontWeight: "600",
//               }}
//             >
//               {item.name[0]}
//             </Text>
//           </View>

//           {/*  Online */}
//           {item.online && (
//             <View
//               style={{
//                 position: "absolute",
//                 bottom: 1,
//                 right: 1,
//                 width: 10,
//                 height: 10,
//                 borderRadius: 5,
//                 backgroundColor: "#22c55e",
//                 borderWidth: 2,
//                 borderColor: colors.light,
//               }}
//             />
//           )}
//         </View>

//         {/* 🔹 Content */}
//         <View style={{ marginLeft: 10, flex: 1 }}>

//           {/*  Bubble */}
//           <View
//             style={{
//               backgroundColor: colors.bgColor,
//               paddingHorizontal: 12,
//               paddingVertical: 10,
//               borderRadius: 16,

//               // subtle depth
//               borderWidth: 1,
//               borderColor: colors.cardBorder,
//             }}
//           >
//             {/* Name + Badge */}
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Text
//                 style={{
//                   fontWeight: "600",
//                   color: colors.dark,
//                   fontSize: 15,
//                 }}
//               >
//                 {item.name}
//               </Text>

//               {item.isExpert && (
//                 <View
//                   style={{
//                     marginLeft: 6,
//                     backgroundColor: colors.primary,
//                     paddingHorizontal: 6,
//                     paddingVertical: 2,
//                     borderRadius: 6,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontSize: 10,
//                       color: colors.light,
//                       fontWeight: "600",
//                     }}
//                   >
//                     EXPERT
//                   </Text>
//                 </View>
//               )}
//             </View>

//             {/* Message */}
//             <Text
//               style={{
//                 color: colors.neutral,
//                 marginTop: 4,
//                 lineHeight: 22,
//                 fontSize: 15,
//               }}
//             >
//               {item.message}
//             </Text>
//           </View>

//           {/* 🔹 Actions Row */}
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               marginTop: 6,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 13.5,
//                 color: colors.darkHover,
//               }}
//             >
//               {item.time}
//             </Text>

//             {/* Like */}
//             <TouchableOpacity
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 marginLeft: 14,
//               }}
//             >
//               <Heart size={14} color={colors.darkHover} />
//               <Text
//                 style={{
//                   marginLeft: 4,
//                   fontSize: 13.5,
//                   color: colors.darkHover,
//                 }}
//               >
//                 {item.likes}
//               </Text>
//             </TouchableOpacity>

//             {/* Reply */}
//             <TouchableOpacity
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 marginLeft: 14,
//               }}
//             >
//               <MessageCircle size={14} color={colors.darkHover} />
//               <Text
//                 style={{
//                   marginLeft: 4,
//                   fontSize: 13.5,
//                   color: colors.darkHover,
//                 }}
//               >
//                 Reply
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* 🔹 Replies (Threaded) */}
//           {item.replies?.map((reply) => (
//             <View
//               key={reply.id}
//               style={{
//                 marginTop: 12,
//                 marginLeft: 16,
//                 paddingLeft: 10,
//                 borderLeftWidth: 2,
//                 borderColor: colors.cardBorder,
//               }}
//             >
//               <Text
//                 style={{
//                   fontWeight: "600",
//                   fontSize: 14,
//                   color: colors.dark,
//                 }}
//               >
//                 {reply.name}
//               </Text>

//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: colors.neutral,
//                   marginTop: 2,
//                 }}
//               >
//                 {reply.message}
//               </Text>

//               <Text
//                 style={{
//                   fontSize: 13,
//                   color: colors.darkHover,
//                   marginTop: 2,
//                 }}
//               >
//                 {reply.time}
//               </Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// }



import { colors } from "@/src/constants/colors";
import { Image, Text, View } from "react-native";

export default function DiscussionItem({ item, isGrouped }) {
  const isUser = item.type === "user";

  return (
    <View
      style={{
        flexDirection: isUser ? "row-reverse" : "row",
        marginBottom: isGrouped ? 6 : 16,
        alignItems: "flex-end",
        paddingHorizontal: 2,
      }}
    >
      {/* 🔹 Avatar */}
      {!isUser && (
        <View style={{ width: 32, alignItems: "center" }}>
          {!isGrouped && (
            <Image
              source={require("@/assets/images/ziraaticon.png")}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
              }}
            />
          )}
        </View>
      )}

      {/* MESSAGE CONTAINER */}
      <View style={{ maxWidth: "78%" }}>
        {/* 🔹 Name */}
        {!isUser && !isGrouped && (
          <Text
            style={{
              fontSize: 13.5,
              color: colors.darkHover,
              marginBottom: 4,
              marginLeft: 4,
              fontWeight: "500",
            }}
          >
            Ziraat Support
          </Text>
        )}

        {/*  Bubble */}
        <View
          style={{
            backgroundColor: isUser
              ? colors.primary + "18"
              : colors.bgColor,

            paddingHorizontal: 14,
            paddingVertical: 10,

            borderRadius: 18,

           
            borderTopLeftRadius: isUser ? 18 : isGrouped ? 18 : 6,
            borderTopRightRadius: isUser ? (isGrouped ? 18 : 6) : 18,

           
            elevation: 1,
          }}
        >
          {/* Message */}
          <Text
            style={{
              fontSize: 16,
              color: colors.dark,
              lineHeight: 24,
            }}
          >
            {item.message}
          </Text>

          {/* 🔹 Time */}
          {item.time && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: colors.darkHover,
                }}
              >
                {item.time}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}