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
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { MenuLinks } from "@/src/navigation/MenuLinks";
import { View } from "react-native";
import MenuProfileCard from "./components/MenuProfileCard";
import MenuSection from "./components/MenuSection";

export default function MenuScreen() {
  return (
    <ScreenLayout>
      <AnimatedTabContent>
        <View style={{ flex: 1, backgroundColor: colors.light }}>
          <ScreenContent>
            <MenuProfileCard />

            {MenuLinks.farmer.map((group) => (
              <MenuSection key={group.title} group={group} />
            ))}

            <View style={{ height: 60 }} />
          </ScreenContent>
        </View>
      </AnimatedTabContent>
    </ScreenLayout>
  );
}
