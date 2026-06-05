import BackHeader from "@/src/components/shared/BackHeader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { useDeleteAccount } from "@/src/hooks/useDeleteAccount";
import { useRouter } from "expo-router";
import { AlertTriangle, Check, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function DeleteAccount() {
  const router = useRouter();
  const { mutate: deleteAccount, isPending } = useDeleteAccount();
  const { userId, logoutUser } = useAuth();

  const [confirmed, setConfirmed] = useState(false);

  const handleDeleteAccount = () => {
    if (!userId) return;

    deleteAccount(userId, {
      onSuccess: () => {
        logoutUser();
        router.replace(ROUTES.AUTH.LOGIN);
      },
    });
  };

  const deletionItems = [
    "Your profile information will be permanently removed",
    "Saved addresses and preferences will be deleted",
    "Order history will no longer be accessible",
    "This action cannot be reversed or recovered",
  ];

  return (
    <ScreenLayout>
      <BackHeader
        title="Delete Account"
        desc="Permanently remove your account"
      />

      <ScreenContent>
        <View className="flex-1 pt-2">
          {/* Hero Section */}
          <View className="items-center mb-8">
            <View
              className="w-20 h-20 rounded-full items-center justify-center"
              style={{
                backgroundColor: `${colors.error}15`,
              }}
            >
              <Trash2 size={35} color={colors.error} />
            </View>

            <Text className="mt-5 text-xl font-semibold text-black">
              Delete Account
            </Text>

            <Text className=" mt-2 text-center px-4 text-gray-500">
              We're sorry to see you go. Deleting your account will permanently
              remove your profile and all associated data from our platform.
            </Text>
          </View>
          <View
            className="rounded-2xl p-5 mb-5 bg-white border"
            style={{
              borderColor: colors.cardBorder,
            }}
          >
            <Text className="mb-4 text-base font-semibold text-black">
              What happens when you delete?
            </Text>

            {deletionItems.map((item) => (
              <View key={item} className="flex-row items-start mb-4">
                <View className="mt-1">
                  <Check size={20} color={colors.primary} />
                </View>

                <Text className="ml-3 flex-1 text-gray-600">{item}</Text>
              </View>
            ))}
          </View>

          <View
            className="rounded-2xl p-5 mb-6 border"
            style={{
              backgroundColor: `${colors.warning}15`,
              borderColor: colors.warning,
            }}
          >
            <View className="flex-row items-center mb-2">
              <AlertTriangle size={18} color={colors.warning} />

              <Text className="ml-2 font-semibold text-black">Important</Text>
            </View>

            <Text className="text-gray-600">
              Once your account is deleted, all information associated with it
              will be permanently removed and cannot be restored.
            </Text>
          </View>

          <Pressable
            onPress={() => setConfirmed((prev) => !prev)}
            className="rounded-2xl p-4 mb-4 flex-row items-center border"
            style={{
              borderColor: confirmed ? colors.secondary : colors.cardBorder,
              // backgroundColor: confirmed ? colors.secondary : colors.light,
            }}
          >
            <View
              className="w-6 h-6 rounded-md items-center justify-center border"
              style={{
                backgroundColor: confirmed ? colors.secondary : "transparent",
                borderColor: confirmed ? colors.secondary : colors.dark,
              }}
            >
              {confirmed && <Check size={14} color={colors.light} />}
            </View>

            <Text className="ml-3 flex-1 text-gray-700">
              I understand that deleting my account is permanent and cannot be
              undone.
            </Text>
          </Pressable>

          {/* Delete Button */}
          <Pressable
            disabled={!confirmed || isPending}
            onPress={handleDeleteAccount}
            className="rounded-2xl py-4 items-center"
            style={{
              backgroundColor: confirmed ? colors.error : "transparent",
              borderWidth: 1,
              borderColor: confirmed ? colors.error : colors.overlay,
              opacity: isPending ? 0.7 : 1,
            }}
          >
            <Text className="text-dark font-semibold">
              {isPending ? "Deleting Account..." : "Delete Account"}
            </Text>
          </Pressable>

          {/* Bottom Note */}
          <Text className="text-center mt-5 px-4 text-gray-500">
            Need help instead? Contact support before deleting your account.
          </Text>
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}
