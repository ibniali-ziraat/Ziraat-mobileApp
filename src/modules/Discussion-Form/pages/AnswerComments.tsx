// import {
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import {
//   Clock3,
//   Heart,
//   MessageCircle,
// } from "lucide-react-native";

// import Avatar from "./Avatar";
// import ReplyInput from "./ReplyInput";


// import { useComments } from "../hooks/useQuestion";

// type Props = {
//   answerId: number;
// };

// export default function AnswerComments({
//   answerId,
// }: Props) {
//   const { data, isLoading } =
//     useComments(answerId);

//   // LOADING
//   if (isLoading) {
//     return (
//       <View
//         style={{
//           paddingVertical: 24,

//           alignItems: "center",

//           justifyContent:
//             "center",
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",

//             alignItems:
//               "center",

//             paddingHorizontal: 16,

//             paddingVertical: 10,

//             borderRadius: 999,

//             backgroundColor:
//               "#f8fafc",

//             borderWidth: 1,

//             borderColor:
//               "#e2e8f0",
//           }}
//         >
//           <View
//             style={{
//               width: 7,
//               height: 7,

//               borderRadius: 999,

//               backgroundColor:
//                 "#0f172a",

//               marginRight: 8,
//             }}
//           />

//           <Text
//             style={{
//               color: "#0f172a",

//               fontWeight:
//                 "700",

//               fontSize: 12,
//             }}
//           >
//             Loading replies...
//           </Text>
//         </View>
//       </View>
//     );
//   }

//   if (!data || data.length === 0)
//     return null;

//   // HELPERS
//   const getParentId = (
//     body: string
//   ) => {
//     const match =
//       body?.match(/@reply-(\d+)/);

//     return match
//       ? Number(match[1])
//       : null;
//   };

//   const buildCommentTree = (
//     comments: any[]
//   ) => {
//     const map: any = {};

//     const roots: any[] = [];

//     comments.forEach((c) => {
//       map[c.id] = {
//         ...c,
//         replies: [],
//       };
//     });

//     comments.forEach((c) => {
//       const parentId =
//         getParentId(c.body);

//       if (
//         parentId &&
//         map[parentId]
//       ) {
//         map[parentId].replies.push(
//           map[c.id]
//         );
//       } else {
//         roots.push(map[c.id]);
//       }
//     });

//     return roots;
//   };

//   // FLAT REPLIES
//   const flattenReplies = (
//     replies: any[]
//   ): any[] => {
//     const result: any[] =
//       [];

//     const collect = (
//       items: any[]
//     ) => {
//       items.forEach((r) => {
//         result.push(r);

//         if (
//           r.replies?.length >
//           0
//         ) {
//           collect(r.replies);
//         }
//       });
//     };

//     collect(replies);

//     return result;
//   };

//   const commentsTree =
//     buildCommentTree(data);

//   // REPLY ITEM
//   const renderReply = (
//     reply: any
//   ) => {
//     const cleanBody =
//       reply.body
//         .replace(
//           /@reply-\d+\s?/,
//           ""
//         )
//         .trim();

//     const mentionMatch =
//       cleanBody.match(
//         /^(\S+)\s/
//       );

//     const mentionUser =
//       mentionMatch?.[1];

//     const message =
//       cleanBody.replace(
//         /^\S+\s/,
//         ""
//       );

//     return (
//       <View
//         key={reply.id}
//         style={{
//           flexDirection:
//             "row",

//           alignItems:
//             "flex-start",

//           marginTop: 14,
//         }}
//       >
//         {/* AVATAR */}
//         <Avatar
//           name={
//             reply.user
//               ?.displayName ||
//             "U"
//           }
//           size={30}
//           fontSize={13}
//         />

//         {/* RIGHT */}
//         <View
//           style={{
//             flex: 1,

//             marginLeft: 10,
//           }}
//         >
//           {/* BUBBLE */}
//           <View
//             style={{
//               backgroundColor:
//                 "#ffffff",

//               borderRadius: 22,

//               paddingHorizontal: 14,

//               paddingVertical: 12,

//               borderWidth: 1,

//               borderColor:
//                 "#edf2f7",
//             }}
//           >
//             {/* HEADER */}
//             <View
//               style={{
//                 flexDirection:
//                   "row",

//                 alignItems:
//                   "center",

//                 justifyContent:
//                   "space-between",

//                 marginBottom: 8,
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 13,

//                   fontWeight:
//                     "800",

//                   color:
//                     "#0f172a",
//                 }}
//               >
//                 {reply.user
//                   ?.displayName ||
//                   "User"}
//               </Text>

//               <View
//                 style={{
//                   flexDirection:
//                     "row",

//                   alignItems:
//                     "center",
//                 }}
//               >
//                 <Clock3
//                   size={11}
//                   color="#64748b"
//                 />

//                 <Text
//                   style={{
//                     marginLeft: 4,

//                     fontSize: 11,

//                     color:
//                       "#64748b",

//                     fontWeight:
//                       "600",
//                   }}
//                 >
//                   now
//                 </Text>
//               </View>
//             </View>

//             {/* MESSAGE */}
//             <Text
//               style={{
//                 fontSize: 13.5,

//                 lineHeight: 22,

//                 color:
//                   "#334155",

//                 fontWeight:
//                   "500",
//               }}
//             >
//               {!!mentionUser && (
//                 <Text
//                   style={{
//                     fontWeight:
//                       "800",

//                     color:
//                       "#2563eb",
//                   }}
//                 >
//                   @
//                   {
//                     mentionUser
//                   }{" "}
//                 </Text>
//               )}

//               {message}
//             </Text>
//           </View>

//           {/* ACTIONS */}
//           <View
//             style={{
//               flexDirection:
//                 "row",

//               alignItems:
//                 "center",

//               marginTop: 10,

//               gap: 8,
//             }}
//           >
//             {/* LIKE */}
//             <TouchableOpacity
//               activeOpacity={0.8}
//               style={{
//                 flexDirection:
//                   "row",

//                 alignItems:
//                   "center",

//                 backgroundColor:
//                   "#f8fafc",

//                 borderWidth: 1,

//                 borderColor:
//                   "#e2e8f0",

//                 borderRadius: 999,

//                 paddingHorizontal: 12,

//                 paddingVertical: 7,
//               }}
//             >
//               <Heart
//                 size={12}
//                 color="#334155"
//                 strokeWidth={2.5}
//               />

//               <Text
//                 style={{
//                   color:
//                     "#334155",

//                   marginLeft: 5,

//                   fontSize: 11,

//                   fontWeight:
//                     "700",
//                 }}
//               >
//                 Like
//               </Text>
//             </TouchableOpacity>

//             {/* REPLY */}
//             <ReplyInput
//               answerId={answerId}
//               parentCommentId={
//                 reply.id
//               }
//             />
//           </View>
//         </View>
//       </View>
//     );
//   };

//   // ROOT COMMENT
//   const renderComment = (
//     comment: any
//   ) => {
//     const flatReplies =
//       flattenReplies(
//         comment.replies || []
//       );

//     return (
//       <View
//         key={comment.id}
//         style={{
//           marginTop: 22,

//           flexDirection:
//             "row",

//           alignItems:
//             "flex-start",
//         }}
//       >
//         {/* AVATAR */}
//         <Avatar
//           name={
//             comment.user
//               ?.displayName ||
//             "U"
//           }
//           size={36}
//           fontSize={16}
//         />

//         {/* RIGHT */}
//         <View
//           style={{
//             flex: 1,

//             marginLeft: 12,
//           }}
//         >
//           {/* ROOT CARD */}
//           <View
//             style={{
//               backgroundColor:
//                 "#ffffff",

//               borderRadius: 24,

//               borderWidth: 1,

//               borderColor:
//                 "#edf2f7",

//               paddingHorizontal: 16,

//               paddingTop: 14,

//               paddingBottom: 15,
//             }}
//           >
//             {/* HEADER */}
//             <View
//               style={{
//                 flexDirection:
//                   "row",

//                 justifyContent:
//                   "space-between",

//                 alignItems:
//                   "center",

//                 marginBottom: 9,
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 15,

//                   fontWeight:
//                     "800",

//                   color:
//                     "#0f172a",
//                 }}
//               >
//                 {comment.user
//                   ?.displayName ||
//                   "User"}
//               </Text>

//               <View
//                 style={{
//                   flexDirection:
//                     "row",

//                   alignItems:
//                     "center",
//                 }}
//               >
//                 <Clock3
//                   size={11}
//                   color="#64748b"
//                 />

//                 <Text
//                   style={{
//                     marginLeft: 4,

//                     fontSize: 11,

//                     color:
//                       "#64748b",

//                     fontWeight:
//                       "600",
//                   }}
//                 >
//                   recently
//                 </Text>
//               </View>
//             </View>

//             {/* BODY */}
//             <Text
//               style={{
//                 fontSize: 14.5,

//                 lineHeight: 24,

//                 color:
//                   "#334155",

//                 fontWeight:
//                   "500",
//               }}
//             >
//               {comment.body.replace(
//                 /@reply-\d+\s/,
//                 ""
//               )}
//             </Text>
//           </View>

//           {/* ACTIONS */}
//           <View
//             style={{
//               flexDirection:
//                 "row",

//               alignItems:
//                 "center",

//               marginTop: 10,

//               gap: 8,
//             }}
//           >
//             {/* LIKE */}
//             <TouchableOpacity
//               activeOpacity={0.8}
//               style={{
//                 flexDirection:
//                   "row",

//                 alignItems:
//                   "center",

//                 backgroundColor:
//                   "#f8fafc",

//                 borderWidth: 1,

//                 borderColor:
//                   "#e2e8f0",

//                 borderRadius: 999,

//                 paddingHorizontal: 14,

//                 paddingVertical: 8,
//               }}
//             >
//               <Heart
//                 size={14}
//                 color="#334155"
//                 strokeWidth={2.5}
//               />

//               <Text
//                 style={{
//                   fontSize: 12,

//                   fontWeight:
//                     "700",

//                   color:
//                     "#334155",

//                   marginLeft: 6,
//                 }}
//               >
//                 Like
//               </Text>
//             </TouchableOpacity>

//             {/* REPLY */}
//             <ReplyInput
//               answerId={answerId}
//               parentCommentId={
//                 comment.id
//               }
//             />
//           </View>

//           {/* REPLIES */}
//           {flatReplies.length >
//             0 && (
//             <View
//               style={{
//                 marginTop: 16,

//                 marginLeft: 6,

//                 paddingLeft: 16,

//                 borderLeftWidth: 2,

//                 borderLeftColor:
//                   "#e2e8f0",
//               }}
//             >
//               {/* THREAD LABEL */}
//               <View
//                 style={{
//                   flexDirection:
//                     "row",

//                   alignItems:
//                     "center",

//                   marginBottom: 4,
//                 }}
//               >
//                 <MessageCircle
//                   size={13}
//                   color="#64748b"
//                 />

//                 <Text
//                   style={{
//                     marginLeft: 6,

//                     fontSize: 11,

//                     fontWeight:
//                       "800",

//                     color:
//                       "#64748b",

//                     letterSpacing: 1,
//                   }}
//                 >
//                  REPLIES
//                 </Text>
//               </View>

//               {/* REPLIES */}
//               {flatReplies.map(
//                 (reply) =>
//                   renderReply(
//                     reply
//                   )
//               )}
//             </View>
//           )}
//         </View>
//       </View>
//     );
//   };

//   // MAIN UI
//   return (
//     <View
//       style={{
//         paddingHorizontal: 14,

//         paddingBottom: 18,

//         paddingTop: 2,
//       }}
//     >
//       {/* HEADER */}
//       <View
//         style={{
//           flexDirection: "row",

//           alignItems: "center",

//           marginBottom: 8,

//           marginTop: 4,
//         }}
//       >
//         <View
//           style={{
//             flex: 1,

//             height: 1,

//             backgroundColor:
//               "#edf2f7",
//           }}
//         />

//         <View
//           style={{
//             backgroundColor:
//               "#f8fafc",

//             borderWidth: 1,

//             borderColor:
//               "#e2e8f0",

//             paddingHorizontal: 14,

//             paddingVertical: 6,

//             borderRadius: 999,

//             marginHorizontal: 12,
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 10,

//               color:
//                 "#64748b",

//               fontWeight:
//                 "800",

//               letterSpacing: 1,

//               textTransform:
//                 "uppercase",
//             }}
//           >
//             {data.length}{" "}
//             {data.length === 1
//               ? "Reply"
//               : "Replies"}
//           </Text>
//         </View>

//         <View
//           style={{
//             flex: 1,

//             height: 1,

//             backgroundColor:
//               "#edf2f7",
//           }}
//         />
//       </View>

//       {/* COMMENTS */}
//       {commentsTree.map(
//         (comment) =>
//           renderComment(comment)
//       )}
//     </View>
//   );
// }




import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Clock3,
  Heart,
  MessageCircle,
} from "lucide-react-native";

import Avatar from "./Avatar";
import ReplyInput from "./ReplyInput";

import { colors } from "@/src/constants/colors";

import { useComments } from "../hooks/useQuestion";

type Props = {
  answerId: number;
};

export default function AnswerComments({
  answerId,
}: Props) {
  const { data, isLoading } =
    useComments(answerId);

  // LOADING
  if (isLoading) {
    return (
      <View
        style={{
          paddingVertical: 24,

          alignItems: "center",

          justifyContent:
            "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",

            alignItems:
              "center",

            paddingHorizontal: 16,

            paddingVertical: 10,

            borderRadius: 999,

            backgroundColor:
              colors.light,

            borderWidth: 1,

            borderColor:
              colors.overlay +
              "10",
          }}
        >
          <View
            style={{
              width: 7,
              height: 7,

              borderRadius: 999,

              backgroundColor:
                colors.primary,

              marginRight: 8,
            }}
          />

          <Text
            style={{
              color:
                colors.dark,

              fontWeight:
                "700",

              fontSize: 12,
            }}
          >
            Loading replies...
          </Text>
        </View>
      </View>
    );
  }

  if (!data || data.length === 0)
    return null;

  // HELPERS
  const getParentId = (
    body: string
  ) => {
    const match =
      body?.match(/@reply-(\d+)/);

    return match
      ? Number(match[1])
      : null;
  };

  const buildCommentTree = (
    comments: any[]
  ) => {
    const map: any = {};

    const roots: any[] = [];

    comments.forEach((c) => {
      map[c.id] = {
        ...c,
        replies: [],
      };
    });

    comments.forEach((c) => {
      const parentId =
        getParentId(c.body);

      if (
        parentId &&
        map[parentId]
      ) {
        map[parentId].replies.push(
          map[c.id]
        );
      } else {
        roots.push(map[c.id]);
      }
    });

    return roots;
  };

  // FLAT REPLIES
  const flattenReplies = (
    replies: any[]
  ): any[] => {
    const result: any[] =
      [];

    const collect = (
      items: any[]
    ) => {
      items.forEach((r) => {
        result.push(r);

        if (
          r.replies?.length >
          0
        ) {
          collect(r.replies);
        }
      });
    };

    collect(replies);

    return result;
  };

  const commentsTree =
    buildCommentTree(data);

  // REPLY ITEM
  const renderReply = (
    reply: any
  ) => {
    const cleanBody =
      reply.body
        .replace(
          /@reply-\d+\s?/,
          ""
        )
        .trim();

    const mentionMatch =
      cleanBody.match(
        /^(\S+)\s/
      );

    const mentionUser =
      mentionMatch?.[1];

    const message =
      cleanBody.replace(
        /^\S+\s/,
        ""
      );

    return (
      <View
        key={reply.id}
        style={{
          flexDirection:
            "row",

          alignItems:
            "flex-start",

          marginTop: 14,
        }}
      >
        {/* AVATAR */}
        <Avatar
          name={
            reply.user
              ?.displayName ||
            "U"
          }
          size={30}
          fontSize={13}
        />

        {/* RIGHT */}
        <View
          style={{
            flex: 1,

            marginLeft: 10,
          }}
        >
          {/* BUBBLE */}
          <View
            style={{
              backgroundColor:
                colors.light,

              borderRadius: 22,

              paddingHorizontal: 14,

              paddingVertical: 12,

              borderWidth: 1,

              borderColor:
                colors.overlay +
                "10",
            }}
          >
            {/* HEADER */}
            <View
              style={{
                flexDirection:
                  "row",

                alignItems:
                  "center",

                justifyContent:
                  "space-between",

                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 13,

                  fontWeight:
                    "800",

                  color:
                    colors.dark,
                }}
              >
                {reply.user
                  ?.displayName ||
                  "User"}
              </Text>

              <View
                style={{
                  flexDirection:
                    "row",

                  alignItems:
                    "center",
                }}
              >
                <Clock3
                  size={11}
                  color={
                    colors.overlay
                  }
                />

                <Text
                  style={{
                    marginLeft: 4,

                    fontSize: 11,

                    color:
                      colors.overlay,

                    fontWeight:
                      "600",
                  }}
                >
                  now
                </Text>
              </View>
            </View>

            {/* MESSAGE */}
            <Text
              style={{
                fontSize: 13.5,

                lineHeight: 22,

                color:
                  colors.neutral,

                fontWeight:
                  "500",
              }}
            >
              {!!mentionUser && (
                <Text
                  style={{
                    fontWeight:
                      "800",

                    color:
                      colors.primary,
                  }}
                >
                  @
                  {
                    mentionUser
                  }{" "}
                </Text>
              )}

              {message}
            </Text>
          </View>

          {/* ACTIONS */}
          <View
            style={{
              flexDirection:
                "row",

              alignItems:
                "center",

              marginTop: 10,

              gap: 8,
            }}
          >
            {/* LIKE */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection:
                  "row",

                alignItems:
                  "center",

                backgroundColor:
                  colors.light,

                borderWidth: 1,

                borderColor:
                  colors.overlay +
                  "12",

                borderRadius: 999,

                paddingHorizontal: 12,

                paddingVertical: 7,
              }}
            >
              <Heart
                size={12}
                color={
                  colors.secondary
                }
                strokeWidth={2.5}
              />

              <Text
                style={{
                  color:
                    colors.secondary,

                  marginLeft: 5,

                  fontSize: 11,

                  fontWeight:
                    "700",
                }}
              >
                Like
              </Text>
            </TouchableOpacity>

            {/* REPLY */}
            <ReplyInput
              answerId={answerId}
              parentCommentId={
                reply.id
              }
            />
          </View>
        </View>
      </View>
    );
  };

  // ROOT COMMENT
  const renderComment = (
    comment: any
  ) => {
    const flatReplies =
      flattenReplies(
        comment.replies || []
      );

    return (
      <View
        key={comment.id}
        style={{
          marginTop: 22,

          flexDirection:
            "row",

          alignItems:
            "flex-start",
        }}
      >
        {/* AVATAR */}
        <Avatar
          name={
            comment.user
              ?.displayName ||
            "U"
          }
          size={36}
          fontSize={16}
        />

        {/* RIGHT */}
        <View
          style={{
            flex: 1,

            marginLeft: 12,
          }}
        >
          {/* ROOT CARD */}
          <View
            style={{
              backgroundColor:
                colors.light,

              borderRadius: 24,

              borderWidth: 1,

              borderColor:
                colors.overlay +
                "10",

              paddingHorizontal: 16,

              paddingTop: 14,

              paddingBottom: 15,
            }}
          >
            {/* HEADER */}
            <View
              style={{
                flexDirection:
                  "row",

                justifyContent:
                  "space-between",

                alignItems:
                  "center",

                marginBottom: 9,
              }}
            >
              <Text
                style={{
                  fontSize: 15,

                  fontWeight:
                    "800",

                  color:
                    colors.dark,
                }}
              >
                {comment.user
                  ?.displayName ||
                  "User"}
              </Text>

              <View
                style={{
                  flexDirection:
                    "row",

                  alignItems:
                    "center",
                }}
              >
                <Clock3
                  size={11}
                  color={
                    colors.overlay
                  }
                />

                <Text
                  style={{
                    marginLeft: 4,

                    fontSize: 11,

                    color:
                      colors.overlay,

                    fontWeight:
                      "600",
                  }}
                >
                  recently
                </Text>
              </View>
            </View>

            {/* BODY */}
            <Text
              style={{
                fontSize: 14.5,

                lineHeight: 24,

                color:
                  colors.neutral,

                fontWeight:
                  "500",
              }}
            >
              {comment.body.replace(
                /@reply-\d+\s/,
                ""
              )}
            </Text>
          </View>

          {/* ACTIONS */}
          <View
            style={{
              flexDirection:
                "row",

              alignItems:
                "center",

              marginTop: 10,

              gap: 8,
            }}
          >
            {/* LIKE */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection:
                  "row",

                alignItems:
                  "center",

                backgroundColor:
                  colors.light,

                borderWidth: 1,

                borderColor:
                  colors.overlay +
                  "12",

                borderRadius: 999,

                paddingHorizontal: 14,

                paddingVertical: 8,
              }}
            >
              <Heart
                size={14}
                color={
                  colors.secondary
                }
                strokeWidth={2.5}
              />

              <Text
                style={{
                  fontSize: 12,

                  fontWeight:
                    "700",

                  color:
                    colors.secondary,

                  marginLeft: 6,
                }}
              >
                Like
              </Text>
            </TouchableOpacity>

            {/* REPLY */}
            <ReplyInput
              answerId={answerId}
              parentCommentId={
                comment.id
              }
            />
          </View>

          {/* REPLIES */}
          {flatReplies.length >
            0 && (
            <View
              style={{
                marginTop: 16,

                marginLeft: 6,

                paddingLeft: 16,

                borderLeftWidth: 2,

                borderLeftColor:
                  colors.primary +
                  "20",
              }}
            >
              {/* THREAD LABEL */}
              <View
                style={{
                  flexDirection:
                    "row",

                  alignItems:
                    "center",

                  marginBottom: 4,
                }}
              >
                <MessageCircle
                  size={13}
                  color={
                    colors.primary
                  }
                />

                <Text
                  style={{
                    marginLeft: 6,

                    fontSize: 11,

                    fontWeight:
                      "800",

                    color:
                      colors.primary,

                    letterSpacing: 1,
                  }}
                >
                  REPLIES
                </Text>
              </View>

              {/* REPLIES */}
              {flatReplies.map(
                (reply) =>
                  renderReply(
                    reply
                  )
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  // MAIN UI
  return (
    <View
      style={{
        paddingHorizontal: 14,

        paddingBottom: 18,

        paddingTop: 2,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",

          alignItems: "center",

          marginBottom: 8,

          marginTop: 4,
        }}
      >
        <View
          style={{
            flex: 1,

            height: 1,

            backgroundColor:
              colors.overlay +
              "12",
          }}
        />

        <View
          style={{
            backgroundColor:
              colors.light,

            borderWidth: 1,

            borderColor:
              colors.overlay +
              "10",

            paddingHorizontal: 14,

            paddingVertical: 6,

            borderRadius: 999,

            marginHorizontal: 12,
          }}
        >
          <Text
            style={{
              fontSize: 10,

              color:
                colors.primary,

              fontWeight:
                "800",

              letterSpacing: 1,

              textTransform:
                "uppercase",
            }}
          >
            {data.length}{" "}
            {data.length === 1
              ? "Reply"
              : "Replies"}
          </Text>
        </View>

        <View
          style={{
            flex: 1,

            height: 1,

            backgroundColor:
              colors.overlay +
              "12",
          }}
        />
      </View>

      {/* COMMENTS */}
      {commentsTree.map(
        (comment) =>
          renderComment(comment)
      )}
    </View>
  );
}