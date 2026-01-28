// import Loader from "@/src/components/shared/Loader";
// import ScreenLayout from "@/src/components/shared/ScreenLayout";
// import SearchBar from "@/src/components/shared/SearchBar";
// import { useAuth } from "@/src/contexts/AuthContext";
// import { useRouter } from "expo-router";
// import { useEffect } from "react";
// import { FlatList, Pressable, Text, View } from "react-native";
// import OrchardCard from "../components/OrchardCard";
// import { useOrchardsByUserQuery } from "../hooks/useOrchardsQuery";

// export default function MyOrchardsScreen() {
//   const { data: orchardData, isPending, isError } = useOrchardsByUserQuery();

//   const { setOrchardProfileId, orchardProfileId } = useAuth();
//   useEffect(() => {
//     setOrchardProfileId(orchardData?.id ?? null);
//   }, [orchardData]);
//   const router = useRouter();

//   if (isPending) return <Loader />;
//   if (isError) return <Loader />;

//   const hasNoOrchards = !orchardData || orchardData.length === 0;

//   return (
//     <ScreenLayout scrollable>
//       <View className="bg-light flex-1">
//         {hasNoOrchards ? (
//           <View className="flex-1 justify-center items-center px-6">
//             <Text className="text-xl font-semibold text-center mb-2">
//               🌱 No Orchards Added Yet
//             </Text>

//             <Text className="text-base text-gray-600 text-center mb-6">
//               Start by adding your orchard to track crops, manage activities,
//               and grow smarter.
//             </Text>

//             <Pressable
//               onPress={() => router.push("/orchards/basic-info")}
//               className="bg-primary px-6 py-3 rounded-xl"
//             >
//               <Text className="text-white font-semibold text-base">
//                 Add Your First Orchard
//               </Text>
//             </Pressable>
//           </View>
//         ) : (
//           <FlatList
//             data={orchardData}
//             keyExtractor={(item) => String(item.id)}
//             renderItem={({ item }) => <OrchardCard orchard={item} />}
//             showsVerticalScrollIndicator={false}
//             ListHeaderComponent={
//               <View className="my-4 mx-1">
//                 <SearchBar />
//               </View>
//             }
//           />
//         )}
//       </View>
//     </ScreenLayout>
//   );
// }


import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import SearchBar from "@/src/components/shared/SearchBar";

import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import OrchardCard from "../components/OrchardCard";
import { useOrchardsByUserQuery } from "../hooks/useOrchardsQuery";

export default function MyOrchardsScreen() {
  const { data: orchardData, isPending, isError } = useOrchardsByUserQuery();

  const { setOrchardProfileId, orchardProfileId } = useAuth();
  useEffect(() => {
    setOrchardProfileId(orchardData?.id ?? null);
  }, [orchardData]);
  const router = useRouter();

  if (isPending) return <Loader />;
  if (isError) return <Loader />;

  const hasNoOrchards = !orchardData || orchardData.length === 0;

  return (
    <ScreenLayout scrollable>
      <View className="bg-[var(--color-white)] flex-1">
        {hasNoOrchards ? (
          <View className="flex-1 justify-center items-center px-5 py-10">
            <ZiraatCard paddingVertical={1.5} paddingHorizontal={1.25} borderRadius={22}>
              <View className="items-center">
                <View className="h-14 w-14 rounded-2xl bg-green-50 items-center justify-center mb-4">
                  <Text className="text-2xl">🌱</Text>
                </View>

                <Text  style={{ color: colors.dark }}
                className="text-[20px] font-semibold text-center mb-2">
                  No Orchards Added Yet
                </Text>

                <Text  style={{ color: colors.dark }}
                className="text-[14px] leading-5 text-center mb-6">
                  Start by adding your orchard to track crops, manage activities,
                  and grow smarter.
                </Text>

                <Pressable
                  onPress={() => router.push("/orchards/basic-info")}
                  style={{ backgroundColor: colors.primary }}
                  className="px-6 py-3 rounded-2xl w-full active:opacity-90"
                >
                  <Text
                    style={{ color: colors.light }}
                   className=" font-semibold text-[15px] text-center">
                    Add Your First Orchard
                  </Text>
                </Pressable>

                <Text
                  style={{ color: colors.dark }}
                 className="text-xs text-center mt-4">
                  You can add multiple orchards anytime.
                </Text>
              </View>
            </ZiraatCard>
          </View>
        ) : (
          <View className="flex-1 px-4 pt-4">
            {/* Header */}
            {/* <View className="mb-3">
              <Text 
               style={{ color: colors.dark }}
              className="text-[22px] font-bold ">
                My Orchards
              </Text>
              <Text 
               style={{ color: colors.dark }}
              className="text-[13px]  mt-1">
                Manage your orchards and track activities
              </Text>
            </View> */}

            <FlatList
              data={orchardData}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View className="mb-3">
                
                    <OrchardCard orchard={item} />
                 
                </View>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 24 }}
              ListHeaderComponent={
                <View className="mb-6 mt-3">
                
                    <SearchBar />
                 
                </View>
              }
            />
          </View>
        )}
      </View>
    </ScreenLayout>
  );
}

