// import { useState } from "react";
// import {
//   ScrollView,
//   Text,
//   View,
// } from "react-native";

// import ScreenLayout from "@/src/components/shared/ScreenLayout";
// import { colors } from "@/src/constants/colors";

// import BackHeader from "@/src/components/shared/BackHeader";
// import { MessageCircle } from "lucide-react-native";
// import DiscussionInput from "../pages/DiscussionInput";
// import MessageItem from "../pages/MessageItem";

// /* ================= INITIAL DATA ================= */

// const initialDiscussions = [
//   {
//     id: "1",
//     author: "Rahul Sharma",
//     role: "Expert",
//     content: "@You Please upload your GST certificate in PDF format.",
//     isAccepted: true,
//     likes: 5,
//     isLiked: false,
//     children: [
//       {
//         id: "2",
//         author: "You",
//         role: "User",
//         content: "@Rahul Can I upload image instead?",
//         likes: 2,
//         isLiked: false,
//         children: [
//           {
//             id: "3",
//             author: "Rahul Sharma",
//             role: "Expert",
//             content: "PDF is recommended for better readability.",
//             likes: 4,
//             isLiked: false,
//             children: [],
//           },
//         ],
//       },
//     ],
//   },

//   {
//     id: "4",
//     author: "Amit Verma",
//     role: "User",
//     content: "What is the max file size allowed?",
//     likes: 3,
//     isLiked: false,
//     children: [
//       {
//         id: "5",
//         author: "Rahul Sharma",
//         role: "Expert",
//         content: "Maximum allowed file size is 5MB.",
//         isAccepted: true,
//         likes: 6,
//         isLiked: false,
//         children: [
//           {
//             id: "6",
//             author: "Amit Verma",
//             role: "User",
//             content: "Thanks! That helps.",
//             likes: 1,
//             isLiked: false,
//             children: [],
//           },
//         ],
//       },
//     ],
//   },

//   {
//     id: "7",
//     author: "Sneha Kapoor",
//     role: "User",
//     content: "Can we upload multiple documents at once?",
//     likes: 2,
//     isLiked: false,
//     children: [
//       {
//         id: "8",
//         author: "Expert Team",
//         role: "Expert",
//         content: "Currently only single upload is supported.",
//         likes: 3,
//         isLiked: false,
//         children: [
//           {
//             id: "9",
//             author: "Sneha Kapoor",
//             role: "User",
//             content: "Any plan to support multiple uploads?",
//             likes: 1,
//             isLiked: false,
//             children: [
//               {
//                 id: "10",
//                 author: "Expert Team",
//                 role: "Expert",
//                 content: "Yes, it's coming in next release ",
//                 isAccepted: true,
//                 likes: 5,
//                 isLiked: false,
//                 children: [],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },

//   {
//     id: "11",
//     author: "Rohit Singh",
//     role: "User",
//     content: "I am getting upload error. Anyone facing same issue?",
//     likes: 4,
//     isLiked: false,
//     children: [
//       {
//         id: "12",
//         author: "Neha Jain",
//         role: "User",
//         content: "Yes, I had the same issue yesterday.",
//         likes: 2,
//         isLiked: false,
//         children: [
//           {
//             id: "13",
//             author: "Rohit Singh",
//             role: "User",
//             content: "How did you fix it?",
//             likes: 1,
//             isLiked: false,
//             children: [
//               {
//                 id: "14",
//                 author: "Neha Jain",
//                 role: "User",
//                 content: "Try reducing file size or switch network.",
//                 likes: 3,
//                 isLiked: false,
//                 children: [],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: "15",
//         author: "Support Team",
//         role: "Expert",
//         content: "Please clear cache and retry. Contact support if issue persists.",
//         isAccepted: true,
//         likes: 6,
//         isLiked: false,
//         children: [],
//       },
//     ],
//   },

//   {
//     id: "16",
//     author: "Karan Mehta",
//     role: "User",
//     content: "Is JPG format supported or only PDF?",
//     likes: 2,
//     isLiked: false,
//     children: [
//       {
//         id: "17",
//         author: "Rahul Sharma",
//         role: "Expert",
//         content: "Both JPG and PDF formats are supported.",
//         isAccepted: true,
//         likes: 5,
//         isLiked: false,
//         children: [
//           {
//             id: "18",
//             author: "Karan Mehta",
//             role: "User",
//             content: "Perfect, thanks!",
//             likes: 1,
//             isLiked: false,
//             children: [],
//           },
//         ],
//       },
//     ],
//   },

//   {
//     id: "19",
//     author: "Anjali Gupta",
//     role: "User",
//     content: "How long does verification take after upload?",
//     likes: 3,
//     isLiked: false,
//     children: [
//       {
//         id: "20",
//         author: "Expert Team",
//         role: "Expert",
//         content: "Usually within 24–48 hours.",
//         isAccepted: true,
//         likes: 4,
//         isLiked: false,
//         children: [
//           {
//             id: "21",
//             author: "Anjali Gupta",
//             role: "User",
//             content: "Great, thanks for the info!",
//             likes: 1,
//             isLiked: false,
//             children: [],
//           },
//         ],
//       },
//     ],
//   },
// ];

// /* ================= MAIN ================= */

// export default function DiscussionScreen() {
//   const [discussionList, setDiscussionList] = useState(initialDiscussions);
//   const [message, setMessage] = useState("");
//   const [replyTo, setReplyTo] = useState<any>(null);

//   /* ================= LIKE FUNCTION ================= */

//   const toggleLike = (list: any[], id: string) => {
//     return list.map((item) => {
//       if (item.id === id) {
//         const isLiked = !item.isLiked;
//         return {
//           ...item,
//           isLiked,
//           likes: isLiked
//             ? (item.likes || 0) + 1
//             : Math.max((item.likes || 1) - 1, 0),
//         };
//       }

//       if (item.children?.length) {
//         return {
//           ...item,
//           children: toggleLike(item.children, id),
//         };
//       }

//       return item;
//     });
//   };

//   /* ================= SEND ================= */

//   const handleSend = (text: string) => {
//     const newMsg = {
//       id: Date.now().toString(),
//       author: "You",
//       role: "User",
//       content: text,
//       likes: 0,
//       isLiked: false,
//       children: [],
//     };

//     setDiscussionList((prev) => [...prev, newMsg]);
//   };

//   return (
//     <ScreenLayout scrollable={false}>
//       <BackHeader title="Discussion" />

//       <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
        
//         {/* HEADER */}
//         <View
//           style={{
//             paddingHorizontal: 16,
//             paddingTop: 16,
//             paddingBottom: 14,
//             borderBottomWidth: 1,
//             borderColor: colors.cardBorder,
//             backgroundColor: colors.light,
//           }}
//         >
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <View
//               style={{
//                 width: 36,
//                 height: 36,
//                 borderRadius: 12,
//                 backgroundColor: colors.primary + "15",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 marginRight: 10,
//               }}
//             >
//               <MessageCircle size={18} color={colors.primary} />
//             </View>

//             <Text style={{ fontSize: 20, fontWeight: "700" }}>
//               Discussion
//             </Text>
//           </View>

//           <Text style={{ marginTop: 6, color: colors.neutral }}>
//             Ask questions or get help from experts in real-time.
//           </Text>
//         </View>

//         {/* THREAD */}
//         <ScrollView
//           style={{ flex: 1 }}
//           contentContainerStyle={{
//             padding: 16,
//             paddingBottom: 140,
//           }}
//         >
//           {discussionList.map((item) => (
//             <MessageItem
//               key={item.id}
//               item={item}
//               depth={0}
//               replyTo={replyTo}
//               setReplyTo={setReplyTo}
//               onLike={(id) =>
//                 setDiscussionList((prev) => toggleLike(prev, id))
//               }
//             />
//           ))}
//         </ScrollView>

//         {/* INPUT */}
//         <View
//           style={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//           }}
//         >
//           <DiscussionInput
//             message={message}
//             setMessage={setMessage}
//             replyTo={replyTo}
//             setReplyTo={setReplyTo}
//             onSend={handleSend}
//           />
//         </View>

//       </View>
//     </ScreenLayout>
//   );
// }
import { useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
} from "react-native";

import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";

import BackHeader from "@/src/components/shared/BackHeader";
import { MessageCircle } from "lucide-react-native";
import DiscussionInput from "../pages/DiscussionInput";
import MessageItem from "../pages/MessageItem";

/* ================= INITIAL DATA ================= */

const initialDiscussions = [
  {
    id: "1",
    author: "Rahul Sharma",
    role: "Expert",
    content: "@You Please upload your GST certificate in PDF format.",
    isAccepted: true,
    likes: 5,
    isLiked: false,
    children: [
      {
        id: "2",
        author: "You",
        role: "User",
        content: "@Rahul Can I upload image instead?",
        likes: 2,
        isLiked: false,
        children: [
          {
            id: "3",
            author: "Rahul Sharma",
            role: "Expert",
            content: "PDF is recommended for better readability.",
            likes: 4,
            isLiked: false,
            children: [],
          },
        ],
      },
    ],
  },
];

/* ================= MAIN ================= */

export default function DiscussionScreen() {
  const [discussionList, setDiscussionList] = useState(initialDiscussions);
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState<any>(null);

  const [inputText, setInputText] = useState(""); // ✅ FIXED

  const scrollRef = useRef<any>(null);

  /* ================= ADD REPLY ================= */

  const addReply = (list: any[], parentId: string, newMsg: any) => {
    return list.map((item) => {
      if (item.id === parentId) {
        return {
          ...item,
          children: [...(item.children || []), newMsg],
        };
      }

      if (item.children?.length) {
        return {
          ...item,
          children: addReply(item.children, parentId, newMsg),
        };
      }

      return item;
    });
  };

  /* ================= LIKE ================= */

  const toggleLike = (list: any[], id: string) => {
    return list.map((item) => {
      if (item.id === id) {
        const isLiked = !item.isLiked;
        return {
          ...item,
          isLiked,
          likes: isLiked
            ? (item.likes || 0) + 1
            : Math.max((item.likes || 1) - 1, 0),
        };
      }

      if (item.children?.length) {
        return {
          ...item,
          children: toggleLike(item.children, id),
        };
      }

      return item;
    });
  };

  /* ================= SEND ================= */

  const handleSend = (text: string) => {
    const newMsg = {
      id: Date.now().toString(),
      author: "You",
      role: "User",
      content: text,
      likes: 0,
      isLiked: false,
      children: [],
    };

    if (replyTo) {
      setDiscussionList((prev) =>
        addReply(prev, replyTo.id, newMsg)
      );
    } else {
      setDiscussionList((prev) => [...prev, newMsg]);
    }

    setReplyTo(null);
    setMessage("");

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  return (
    <ScreenLayout scrollable={false}>
      <BackHeader title="Discussion" />

      <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
        
        {/* HEADER */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 14,
            borderBottomWidth: 1,
            borderColor: colors.cardBorder,
            backgroundColor: colors.light,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                backgroundColor: colors.primary + "15",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <MessageCircle size={18} color={colors.primary} />
            </View>

            <Text style={{ fontSize: 20, fontWeight: "700", color: colors.dark }}>
              Discussion
            </Text>
          </View>

          <Text style={{ marginTop: 6, color: colors.neutral }}>
            Ask questions or get help from experts in real-time.
          </Text>
        </View>

        {/* THREAD */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 140,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {discussionList.map((item) => (
            <MessageItem
              key={item.id}
              item={item}
              depth={0}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              setInputText={setInputText} // ✅ required
              onLike={(id) =>
                setDiscussionList((prev) => toggleLike(prev, id))
              }
            />
          ))}
        </ScrollView>

        {/* INPUT */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <DiscussionInput
            message={message}
            setMessage={setMessage}
            replyTo={replyTo}
            setReplyTo={setReplyTo}
            onSend={handleSend}
            inputText={inputText}        
            setInputText={setInputText}  
          />
        </View>

      </View>
    </ScreenLayout>
  );
}