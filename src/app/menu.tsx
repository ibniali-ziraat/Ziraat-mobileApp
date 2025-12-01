import { View } from "lucide-react-native";
import { CustomDrawer } from "../navigation/CustomDrawer";
import { menuGroups } from "../navigation/menuGroups";

export default function MenuScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <CustomDrawer navigation={navigation} menuGroups={menuGroups} />
    </View>
  );
}
