import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { router } from "expo-router";
import { Cog, PhoneCall } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";
import CsText from "./CsText";
import { ScreenContent } from "./ScreenContent";

const IconButton = ({ onPress, children }: any) => (
  <Pressable
    onPress={onPress}
    className="p-2.5 rounded-full bg-white border"
    style={({ pressed }) => ({
      borderColor: colors.neutral,
      opacity: pressed ? 0.6 : 1,
    })}
  >
    {children}
  </Pressable>
);

const MenuHeader = () => {
  return (
    <ScreenContent className="bg-light">
      <View className="flex-row items-center justify-between py-4">
        <View>
          <CsText
            style={[typography.Poppins_l_semibold, { color: colors.dark }]}
          >
            Menu
          </CsText>

          <CsText
            style={[typography.Poppins_s_regular, { color: colors.neutral }]}
          >
            Dashboard
          </CsText>
        </View>

        <View className="flex-row items-center gap-3">
          <IconButton onPress={() => console.log("Call Expert")}>
            <PhoneCall size={20} color={colors.primary} />
          </IconButton>

          <IconButton
            onPress={() =>
              router.push({
                pathname: "/settings/settings",
              })
            }
          >
            <Cog size={20} color={colors.dark} />
          </IconButton>
        </View>
      </View>
    </ScreenContent>
  );
};

export default React.memo(MenuHeader);
