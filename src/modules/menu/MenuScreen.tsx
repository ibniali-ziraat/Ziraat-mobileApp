import AnimatedTabContent from "@/src/components/shared/AnimatedTabContent";
import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useAuth } from "@/src/contexts/AuthContext";
import { MenuLinks } from "@/src/navigation/MenuLinks";
import { router } from "expo-router";
import { Repeat } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function MenuScreen() {
  const { roleMode, setRoleMode } = useAuth();

  const toggleRole = () => {
    const newRole = roleMode === "farmer" ? "supplier" : "farmer";
    setRoleMode(newRole);
  };

  // Show menu based on role only
  const menuGroupsToShow =
    roleMode === "farmer" ? MenuLinks.farmer : MenuLinks.supplier;

  return (
    <AnimatedTabContent>
      <View className="flex-1 bg-light">
        <ScrollView className="flex-1">
          {menuGroupsToShow.map((group) => (
            <View key={group.title} className="">
              {group.routes.map((route) => (
                <MenuItem
                  key={route.screen}
                  label={route.label}
                  onPress={() => router.push(`/${route.screen}`)}
                />
              ))}
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={toggleRole}
          className="absolute bottom-6 right-6 bg-dark rounded-full flex-row items-center px-4 py-2"
        >
          <Repeat size={20} color={colors.light} />
          <CsText 
          
          className="text-light font-medium ml-2">
            {roleMode === "farmer" ? "Switch to Supplier" : "Switch to Farmer"}
          </CsText>
        </TouchableOpacity>
      </View>
    </AnimatedTabContent>
  );
}

function MenuItem({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="py-3 "
      style={{borderBottomWidth:0.2 , borderBottomColor: colors.cardShadow }}
    >
      <CsText 
      style={[typography.Poppins_m_medium]}

      className=" text-dark">{label}</CsText>
    </TouchableOpacity>
  );
}
