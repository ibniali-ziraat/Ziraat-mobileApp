// import { colors } from "@/src/constants/colors";
// import { ArrowDown, MessageCircle, Sparkles } from "lucide-react-native";
// import { useRef, useState } from "react";
// import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// import ScreenLayout from "@/src/components/shared/ScreenLayout";
// import DiscussionInput from "./DiscussionInput";
// import DiscussionItem from "./DiscussionItem";

// export default function DiscussionSection() {
//   const scrollRef = useRef<ScrollView>(null);
//   const [showScrollBtn, setShowScrollBtn] = useState(false);

//   const discussions = [
//     { id: "1", name: "Expert", isExpert: true, online: true, message: "Please upload your GST certificate here.", time: "2m", likes: 3 },
//     { id: "2", name: "You", message: "Got it, thanks!", time: "Just now", likes: 1 },
//     { id: "3", name: "Expert", online: true, message: "You can upload PDF or Image.", time: "1m", likes: 2 },
//     { id: "4", name: "Expert", online: true, message: "Please upload your GST certificate here.", time: "2m", likes: 3 },
//     { id: "5", name: "You", message: "Got it.", time: "Just now", likes: 1 },
//     { id: "6", name: "Expert", online: true, message: "upload PDF or Image.", time: "1m", likes: 2 },
//   ];

//   return (
//     <ScreenLayout scrollable={false}>
//       <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
        
//         {/* 🔹 HEADER */}
//         <View
//           style={{
//             paddingHorizontal: 16,
//             paddingTop: 12,
//             paddingBottom: 10,
//             borderBottomWidth: 1,
//             borderColor: colors.cardBorder,
//             backgroundColor: colors.light,
//           }}
//         >
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <View
//                 style={{
//                   backgroundColor: colors.bgColor,
//                   padding: 8,
//                   borderRadius: 12,
//                 }}
//               >
//                 <MessageCircle size={18} color={colors.primary} />
//               </View>

//               <View style={{ marginLeft: 10 }}>
//                 <Text style={{ fontWeight: "700", fontSize: 17 }}>
//                   Discussion
//                 </Text>
//                 <Text style={{ fontSize: 14, color: colors.darkHover }}>
//                   Chat with experts
//                 </Text>
//               </View>
//             </View>

//             <Sparkles size={16} color={colors.primary} />
//           </View>
//         </View>

//         {/* 💬 CHAT AREA */}
//         <View style={{ flex: 1 }}>
          
//           {/* ✅ ONLY THIS SCROLLS */}
//           <ScrollView
//             ref={scrollRef}
//             style={{ flex: 1 }}
//             contentContainerStyle={{
//               paddingHorizontal: 16,
//               paddingBottom: 10,
//             }}
//             showsVerticalScrollIndicator={false}
//             keyboardShouldPersistTaps="handled"
//             onContentSizeChange={() =>
//               scrollRef.current?.scrollToEnd({ animated: true })
//             }
//             onScroll={(e) => {
//               const offsetY = e.nativeEvent.contentOffset.y;
//               setShowScrollBtn(offsetY > 200);
//             }}
//             scrollEventThrottle={16}
//           >
//             {discussions.map((item, index) => {
//               const prev = discussions[index - 1];
//               const isGrouped = prev?.name === item.name;

//               return (
//                 <DiscussionItem
//                   key={`${item.id}-${index}`}
//                   item={item}
//                   isGrouped={isGrouped}
//                 />
//               );
//             })}
//           </ScrollView>

//           {/* ⬇️ Scroll Button */}
//           {showScrollBtn && (
//             <TouchableOpacity
//               onPress={() =>
//                 scrollRef.current?.scrollToEnd({ animated: true })
//               }
//               style={{
//                 position: "absolute",
//                 right: 16,
//                 bottom: 80,
//                 backgroundColor: colors.primary,
//                 padding: 10,
//                 borderRadius: 20,
//               }}
//             >
//               <ArrowDown size={16} color="#fff" />
//             </TouchableOpacity>
//           )}

//           {/* ✅ STICKY INPUT */}
//           <View
//             style={{
//               paddingHorizontal: 10,
//               paddingTop: 8,
//               paddingBottom: 10,
//               backgroundColor: colors.light,
//               borderTopWidth: 1,
//               borderColor: colors.cardBorder,
//             }}
//           >
//             <DiscussionInput />
//           </View>
//         </View>
//       </View>
//     </ScreenLayout>
//   );
// }






import { useRef } from "react";
import {
    Image,
    ScrollView,
    Text,
    View
} from "react-native";

import { colors } from "@/src/constants/colors";
import DiscussionInput from "./DiscussionInput";
import DiscussionItem from "./DiscussionItem";

export default function DiscussionSection() {
  const scrollRef = useRef<ScrollView>(null);

  const chats = [
    {
      id: "1",
      type: "bot",
      message:
        "Welcome to Ziraat Chat! For better experience, please login and relaunch chat.",
      time: "12:49 PM",
    },
    {
      id: "2",
      type: "user",
      message: "Proceed without logging in.",
      time: "12:50 PM",
    },
    {
      id: "3",
      type: "bot",
      message: "Do you need help with any of the following?",
      time: "12:50 PM",
    },
    {
      id: "4",
      type: "bot",
      message: "You can upload GST documents easily here.",
      time: "12:51 PM",
    },
    {
      id: "5",
      type: "user",
      message: "Okay ",
      time: "12:52 PM",
    },
    
  ];

 
  return (
    <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
   
      <View style={{ flex: 1, backgroundColor: colors.light }}>
        
        {/*  HEADER */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderColor: colors.cardBorder,
          }}
        >
          <Image
            source={require("@/assets/images/ziraaticon.png")}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              marginRight: 10,
            }}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 17,
                color: colors.dark,
              }}
            >
              Ziraat Support
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: colors.darkHover,
              }}
            >
              Typically replies instantly
            </Text>
          </View>
        </View>

        {/*  CHAT BODY */}
        <View style={{ flex: 1 }}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{
              padding: 14,
              paddingBottom: 120,

            
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: true })
            }
          >
            {/*  TIME */}
            <Text
              style={{
                alignSelf: "center",
                fontSize: 13.5,
                color: colors.darkHover,
                backgroundColor: colors.bgColor,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 10,
                marginBottom: 12,
              }}
            >
              Today
            </Text>

            {/*  MESSAGES */}
            {chats.map((item, index) => {
              const prev = chats[index - 1];
              const isGrouped = prev?.type === item.type;

              return (
                <DiscussionItem
                  key={`${item.id}-${index}`}
                  item={item}
                  isGrouped={isGrouped}
                />
              );
            })}

          
          </ScrollView>

       
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: colors.light,
              borderTopWidth: 1,
              borderColor: colors.cardBorder,
              paddingHorizontal: 10,
              paddingTop: 8,
              paddingBottom: 10,
            }}
          >
            <DiscussionInput />
          </View>
        </View>
      </View>
    </View>
  );
}