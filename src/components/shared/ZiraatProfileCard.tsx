import { Platform, Pressable, StyleSheet, View } from "react-native";

export default function ProfileCard({
  children,

  // Global shorthand
 

  // Individual padding controls
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,

  // Individual margin controls
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,

  width = "90%",
  height = 200,
  backgroundColor = "white",
  style,
  onPress, // OPTIONAL
}) {
  const platformShadow =
    Platform.OS === "ios"
      ? styles.iosShadow
      : { elevation: 7 };

  const CardContent = (
    <View
      className="rounded-2xl items-center justify-center"
      style={[
        {
          width,
          height,
          backgroundColor,

          // Global padding
        //   padding,
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight,

          // Global margin
        //   margin,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
        },
        platformShadow,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (!onPress) return CardContent;

  return <Pressable onPress={onPress}>{CardContent}</Pressable>;
}

const styles = StyleSheet.create({
  iosShadow: {
    shadowColor: "#FCFCFC",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
  },
});


//    <ProfileCard
//        marginLeft={5}
//        marginRight={5}
//        width="full" >

//  <LinearGradient
//             colors={["#4da82d", "#c7611f"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             className="p-5 w-full h-full "
//             style={{
//               borderRadius: 14,

//             }}
//           >
//               <View>
//                 <Text className="text-white text-4xl font-extrabold">28°C</Text>
//                 <Text className="text-white text-base opacity-90 mt-1">
//                   Sunny
//                 </Text>

//                 <View className="mt-4 space-y-2">
//                   <View className="flex-row items-center">
//                     <Ionicons name="water-outline" size={18} color="#fff" />
//                     <Text className="text-white text-sm opacity-90 ml-2">
//                       Humidity: 65%
//                     </Text>
//                   </View>
//                   <View className="flex-row items-center mt-2">
//                     <Ionicons name="rainy-outline" size={18} color="#fff" />
//                     <Text className="text-white text-sm opacity-90 ml-2">
//                       Rain: 0mm
//                     </Text>
//                   </View>
//                    <View className="flex">
//                 <Ionicons name="sunny" size={70} color="#fff" />
//                 <Text className="text-white text-xs mt-2 opacity-90">
//                   Clear Sky
//                 </Text>
//               </View>
//                 </View>
                
//               </View>

              
//               </LinearGradient>
//         </ProfileCard>