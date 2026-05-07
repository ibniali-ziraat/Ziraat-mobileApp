import { useRouter } from "expo-router";
import { AlertTriangle, Check, Trash2 } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Pressable,
  View,
} from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useDeleteAccount } from "@/src/hooks/useDeleteAccount";

const STATIC_USER_ID = 1;

export default function DeleteAccount() {
  const router = useRouter();
  const { mutate: deleteAccount, isPending } = useDeleteAccount();
  const [confirmed, setConfirmed] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is permanent and cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            deleteAccount(STATIC_USER_ID, {
              onSuccess: () => {
                router.replace("/auth/login");
              },
            }),
        },
      ]
    );
  };

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Delete Account"
        desc="Permanently remove your account"
      />

      <View className="px-5 mt-8 flex-1">
        {/* HERO DANGER ICON */}
        <View className="items-center mb-10">
          <View
            className="p-6 rounded-full"
            style={{
              backgroundColor: "#FEE2E2",
            }}
          >
            <Trash2 size={30} color={colors.error} />
          </View>

          <CsText
            style={[
              typography.Poppins_m_semibold,
              { color: colors.error },
            ]}
            className="text-xl mt-4"
          >
            Permanent Deletion
          </CsText>

          <CsText
            style={[typography.Poppins_s_regular]}
            className="text-center mt-2 px-6"
          >
            Once deleted, your account and all associated data will be
            permanently removed from our servers.
          </CsText>
        </View>

        {/* WARNING CARD */}
        <View
          className="rounded-2xl p-5 mb-8"
          style={{
            backgroundColor: "#FFF1F2",
            borderWidth: 1,
            borderColor: "#FECACA",
          }}
        >
          <View className="flex-row items-center mb-2">
            <AlertTriangle size={18} color={colors.error} />
            <CsText
              style={[
                typography.Poppins_m_semibold,
                { color: colors.error },
              ]}
              className="ml-2"
            >
              Warning
            </CsText>
          </View>

          <CsText
            style={[
              typography.Poppins_s_regular,
              { color: colors.error },
            ]}
          >
            This action cannot be undone. Please make sure you really want to
            proceed before confirming.
          </CsText>
        </View>

        {/* CONFIRM CHECK */}
        <Pressable
          onPress={() => setConfirmed(!confirmed)}
          className="flex-row items-center mb-12"
        >
          <View
            className="w-6 h-6 rounded-md border mr-3 items-center justify-center"
            style={{
              borderColor: confirmed ? colors.error : "#9CA3AF",
              backgroundColor: confirmed ? colors.error : "transparent",
            }}
          >
            {confirmed && <Check size={14} color="white" />}
          </View>

          <CsText style={[typography.Poppins_s_regular]}>
            I understand this action is irreversible
          </CsText>
        </Pressable>

        {/* DELETE BUTTON */}
        <Animated.View
          style={{
            transform: [{ scale }],
          }}
        >
          <Pressable
            disabled={!confirmed || isPending}
            onPress={handleDeleteAccount}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            className="py-4 rounded-2xl items-center"
            style={{
              backgroundColor: confirmed ? "#DC2626" : "#f44336",
              opacity: isPending ? 0.7 : 1,
              shadowColor: "#DC2626",
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <CsText
              style={[
                typography.Poppins_m_semibold,
                { color: colors.light },
              ]}
              className="text-base"
            >
              {isPending ? "Deleting Account..." : "Delete My Account"}
            </CsText>
          </Pressable>
        </Animated.View>
      </View>
    </ScreenLayout>
  );
}
