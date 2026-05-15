// import AnimatedTabContent from "@/src/components/shared/AnimatedTabContent";
// import MenuItem from "@/src/components/shared/MenuItem";
// import { ScreenContent } from "@/src/components/shared/ScreenContent";
// import ScreenLayout from "@/src/components/shared/ScreenLayout";
// import { MenuLinks } from "@/src/navigation/MenuLinks";
// import { router } from "expo-router";
// import { View } from "react-native";

// export default function MenuScreen() {
//   return (
//     <ScreenLayout>
//       <AnimatedTabContent>
//         <View className="flex-1 bg-light">
//           <ScreenContent>
//             {MenuLinks.farmer.map((group) => (
//               <View key={group.title} className="">
//                 {group.routes.map((route) => (
//                   <MenuItem
//                     key={route.screen}
//                     label={route.label}
//                     onPress={() => router.push(`${route.screen}`)}
//                   />
//                 ))}
//               </View>
//             ))}
//           </ScreenContent>
//         </View>
//       </AnimatedTabContent>
//     </ScreenLayout>
//   );
// }




import AnimatedTabContent from "@/src/components/shared/AnimatedTabContent";
import MenuItem from "@/src/components/shared/MenuItem";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { MenuLinks } from "@/src/navigation/MenuLinks";
import { router } from "expo-router";
import { View } from "react-native";

export default function MenuScreen() {
  return (
    <ScreenLayout>
      <AnimatedTabContent>
        <View className="flex-1 bg-light">
          <ScreenContent>
            {MenuLinks.farmer.map((group) => (
              <View key={group.title}>
                {group.routes.map((route) => (
                  <MenuItem
                    key={route.screen}
                    label={route.label}
                    onPress={() => router.push(`${route.screen}`)}
                  />
                ))}
              </View>
            ))}
          </ScreenContent>

          {/* <TouchableOpacity
            onPress={() => router.push("/chat-bot")}
            className="absolute bottom-6 right-6 bg-primary p-4 rounded-full"
            activeOpacity={0.8}
          >
            <Bot size={26} color="white" strokeWidth={2} />
          </TouchableOpacity> */}
        </View>
      </AnimatedTabContent>
    </ScreenLayout>
  );
}