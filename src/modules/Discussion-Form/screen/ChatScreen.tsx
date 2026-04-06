
// import { useRef, useState } from "react";
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
// ];

// /* ================= MAIN ================= */

// export default function DiscussionScreen() {
//   const [discussionList, setDiscussionList] = useState(initialDiscussions);
//   const [message, setMessage] = useState("");
//   const [replyTo, setReplyTo] = useState<any>(null);

//   const [inputText, setInputText] = useState(""); // ✅ FIXED

//   const scrollRef = useRef<any>(null);

//   /* ================= ADD REPLY ================= */

//   const addReply = (list: any[], parentId: string, newMsg: any) => {
//     return list.map((item) => {
//       if (item.id === parentId) {
//         return {
//           ...item,
//           children: [...(item.children || []), newMsg],
//         };
//       }

//       if (item.children?.length) {
//         return {
//           ...item,
//           children: addReply(item.children, parentId, newMsg),
//         };
//       }

//       return item;
//     });
//   };

//   /* ================= LIKE ================= */

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

//     if (replyTo) {
//       setDiscussionList((prev) =>
//         addReply(prev, replyTo.id, newMsg)
//       );
//     } else {
//       setDiscussionList((prev) => [...prev, newMsg]);
//     }

//     setReplyTo(null);
//     setMessage("");

//     setTimeout(() => {
//       scrollRef.current?.scrollToEnd({ animated: true });
//     }, 200);
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

//             <Text style={{ fontSize: 20, fontWeight: "700", color: colors.dark }}>
//               Discussion
//             </Text>
//           </View>

//           <Text style={{ marginTop: 6, color: colors.neutral }}>
//             Ask questions or get help from experts in real-time.
//           </Text>
//         </View>

//         {/* THREAD */}
//         <ScrollView
//           ref={scrollRef}
//           style={{ flex: 1 }}
//           contentContainerStyle={{
//             padding: 16,
//             paddingBottom: 140,
//           }}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           {discussionList.map((item) => (
//             <MessageItem
//               key={item.id}
//               item={item}
//               depth={0}
//               replyTo={replyTo}
//               setReplyTo={setReplyTo}
//               setInputText={setInputText} // ✅ required
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
//             inputText={inputText}        
//             setInputText={setInputText}  
//           />
//         </View>

//       </View>
//     </ScreenLayout>
//   );
// }


import { MessageCircle } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import AskModal from "../pages/AskModal";
import FilterBar from "../pages/FilterBar";
import MessageItem from "../pages/MessageItem";


/* ─── types ─── */
export type Post = {
  id: string;
  author: string;
  role: "Expert" | "User";
  content: string;
  likes: number;
  isLiked: boolean;
  isAccepted?: boolean;
  votes?: number;
  userVote?: 0 | 1 | -1;
  views?: number;
  tags?: string[];
  excerpt?: string;
  children: Post[];
};

const initialDiscussions: Post[] = [
  {
    id: "1",
    author: "Rahul Sharma",
    role: "Expert",
    content: "@You Please upload your GST certificate in PDF format.",
    isAccepted: true,
    votes: 12,
    userVote: 0,
    views: 284,
    tags: ["gst-compliance", "documents"],
    excerpt:
      "Rahul asked me to upload my GST certificate in PDF format but I only have image scans.",
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
            content:
              "PDF is recommended. Use iLovePDF or Adobe to convert your scans for free.",
            likes: 4,
            isLiked: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    author: "Support Team",
    role: "Expert",
    content:
      "Standard review takes 2-4 business days. Please raise a ticket with your submission ID if it has been longer.",
    isAccepted: true,
    votes: 7,
    userVote: 0,
    views: 119,
    tags: ["kyc", "verification"],
    excerpt:
      "My KYC was rejected twice. The error says document mismatch. All my details seem correct.",
    likes: 3,
    isLiked: false,
    children: [],
  },
  {
    id: "5",
    author: "You",
    role: "User",
    content: "What is the maximum upload size for documents?",
    votes: 4,
    userVote: 0,
    views: 88,
    tags: ["upload", "pdf"],
    excerpt:
      "I tried uploading a 15MB PDF and it failed. Is there a file size limit?",
    likes: 0,
    isLiked: false,
    children: [],
  },
   {
    id: "1",
    author: "Rahul Sharma",
    role: "Expert",
    content: "@You Please upload your GST certificate in PDF format.",
    isAccepted: true,
    votes: 12,
    userVote: 0,
    views: 284,
    tags: ["gst-compliance", "documents"],
    excerpt:
      "Rahul asked me to upload my GST certificate in PDF format but I only have image scans.",
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
            content:
              "PDF is recommended. Use iLovePDF or Adobe to convert your scans for free.",
            likes: 4,
            isLiked: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    author: "Support Team",
    role: "Expert",
    content:
      "Standard review takes 2-4 business days. Please raise a ticket with your submission ID if it has been longer.",
    isAccepted: true,
    votes: 7,
    userVote: 0,
    views: 119,
    tags: ["kyc", "verification"],
    excerpt:
      "My KYC was rejected twice. The error says document mismatch. All my details seem correct.",
    likes: 3,
    isLiked: false,
    children: [],
  },
  {
    id: "5",
    author: "You",
    role: "User",
    content: "What is the maximum upload size for documents?",
    votes: 4,
    userVote: 0,
    views: 88,
    tags: ["upload", "pdf"],
    excerpt:
      "I tried uploading a 15MB PDF and it failed. Is there a file size limit?",
    likes: 0,
    isLiked: false,
    children: [],
  },
];

export type FilterType = "newest" | "active" | "unanswered";

/* ─── helpers ─── */
function addReplyToTree(list: Post[], parentId: string, newMsg: Post): Post[] {
  return list.map((item) => {
    if (item.id === parentId) {
      return { ...item, children: [...(item.children || []), newMsg] };
    }
    if (item.children?.length) {
      return { ...item, children: addReplyToTree(item.children, parentId, newMsg) };
    }
    return item;
  });
}

function toggleLikeInTree(list: Post[], id: string): Post[] {
  return list.map((item) => {
    if (item.id === id) {
      const isLiked = !item.isLiked;
      return {
        ...item,
        isLiked,
        likes: isLiked ? (item.likes || 0) + 1 : Math.max((item.likes || 1) - 1, 0),
      };
    }
    if (item.children?.length) {
      return { ...item, children: toggleLikeInTree(item.children, id) };
    }
    return item;
  });
}

function toggleVoteInTree(
  list: Post[],
  id: string,
  dir: 1 | -1
): Post[] {
  return list.map((item) => {
    if (item.id === id) {
      const prev = item.userVote ?? 0;
      const newVote = prev === dir ? 0 : dir;
      const delta = newVote - prev;
      return { ...item, userVote: newVote as 0 | 1 | -1, votes: (item.votes ?? 0) + delta };
    }
    return item;
  });
}

/*  screen */
export default function Discussionforum() {
  const [discussionList, setDiscussionList] = useState<Post[]>(initialDiscussions);
  const [message, setMessage] = useState("");
  const [inputText, setInputText] = useState("");
  const [replyTo, setReplyTo] = useState<Post | null>(null);
  const [filter, setFilter] = useState<FilterType>("newest");
  const [askVisible, setAskVisible] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  const filteredList = (() => {
    if (filter === "unanswered") return discussionList.filter((d) => !d.children.length);
    if (filter === "active")
      return [...discussionList].sort(
        (a, b) => (b.votes ?? 0) + b.children.length - ((a.votes ?? 0) + a.children.length)
      );
    return discussionList;
  })();

  const handleSend = (text: string) => {
    const newMsg: Post = {
      id: Date.now().toString(),
      author: "You",
      role: "User",
      content: replyTo ? `@${replyTo.author} ${text}` : text,
      likes: 0,
      isLiked: false,
      children: [],
    };
    if (replyTo) {
      setDiscussionList((prev) => addReplyToTree(prev, replyTo.id, newMsg));
    } else {
      setDiscussionList((prev) => [
        ...prev,
        { ...newMsg, votes: 0, userVote: 0, views: 1, tags: [], excerpt: text.slice(0, 80) },
      ]);
    }
    setReplyTo(null);
    setMessage("");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 200);
  };

  const handleAskSubmit = (title: string, body: string, tags: string[]) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: "You",
      role: "User",
      content: body,
      excerpt: body.slice(0, 100),
      tags,
      votes: 0,
      userVote: 0,
      views: 1,
      likes: 0,
      isLiked: false,
      children: [],
    };
    setDiscussionList((prev) => [newPost, ...prev]);
    setAskVisible(false);
  };

  return (
    <ScreenLayout scrollable={false}>
      <BackHeader title="Discussion" />

     
        {/*  header  */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 14,
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderColor: colors.cardBorder,
            backgroundColor: colors.light,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  backgroundColor: colors.primary + "15",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageCircle size={17} color={colors.primary} />
              </View>
              <Text style={{ fontSize: 16, fontWeight: "700", color: colors.dark }}>
                Discussion Forum
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setAskVisible(true)}
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: colors.light, fontWeight: "700", fontSize: 12 }}>
                + Ask
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ marginTop: 4, fontSize: 12, color: colors.neutral + "99" }}>
            Ask questions or get expert help in real-time.
          </Text>
        </View>

        {/* filter bar */}
        <FilterBar active={filter} onChange={setFilter} />

        {/* thread list */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {filteredList.map((item) => (
            <MessageItem
              key={item.id}
              item={item}
              depth={0}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              setInputText={setInputText}
              onLike={(id) => setDiscussionList((prev) => toggleLikeInTree(prev, id))}
              onVote={(id, dir) =>
                setDiscussionList((prev) => toggleVoteInTree(prev, id, dir))
              }
            />
          ))}
        </ScrollView>

      
        {/* <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
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
     */}

      {/* ── ask modal ── */}
      <AskModal
        visible={askVisible}
        onClose={() => setAskVisible(false)}
        onSubmit={handleAskSubmit}
      />
    </ScreenLayout>
  );
}