import { CustomDrawer } from "@/src/navigation/CustomDrawer";
import { menuGroups } from "@/src/navigation/menuGroups";
import { View } from "react-native";

export default function MenuScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <CustomDrawer navigation={navigation} menuGroups={menuGroups} />
    </View>
  );
}
