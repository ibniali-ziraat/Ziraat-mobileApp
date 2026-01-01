import { useRouter } from "expo-router";
import { useState } from "react";
import {
    TouchableOpacity,
    View
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
  const { mutate: deleteAccount, isLoading } = useDeleteAccount();
  const [confirmed, setConfirmed] = useState(false);

  const handleDeleteAccount = () => {
        deleteAccount(STATIC_USER_ID,)
    // Alert.alert(
    //   "Delete Account",
    //   "This action is permanent and cannot be undone. Are you sure?",
    //   [
    //     { text: "Cancel", style: "cancel" },
    //     {
    //       text: "Delete",
    //       style: "destructive",
    //       onPress: () => {
    //         console.log("Calling deleteAccount with id:", STATIC_USER_ID);

    //         deleteAccount(STATIC_USER_ID, {
    //           onSuccess: async () => {
    //             console.log("Account deleted successfully");

               
    //             await AsyncStorage.clear();

              
    //             router.replace("/auth/login");
    //           },
    //           onError: (err: any) => {
    //             console.log(" Delete failed:", err);
    //             Alert.alert(
    //               "Error",
    //               err?.response?.data?.message ||
    //                 "Failed to delete account. Please try again."
    //             );
    //           },
    //         });
    //       },
    //     },
    //   ]
    // );
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Delete Account"
        desc="Permanently remove your account"
      />

      <View className="px-4 mt-6">
  {/* WARNING BOX */}
  <View
    className="rounded-xl p-4 mb-6"
    style={{
     
      borderWidth: 1,
      borderColor: colors.dark, 
    }}
  >
    <CsText style={[typography.Poppins_m_semibold]} className="text-dark">
      This action is permanent.
    </CsText>

    <CsText
      style={[typography.Poppins_s_regular]}
      className="text-dark mt-2"
    >
      All your data will be permanently deleted and cannot be recovered.
    </CsText>
  </View>
</View>


        {/* CONFIRM CHECKBOX */}
        <TouchableOpacity
          onPress={() => setConfirmed(!confirmed)}
          className="flex-row items-center mb-6"
        >
          <View
            className="w-5 h-5 border mr-3 items-center justify-center"
            style={{
              borderColor: colors.dark,
              backgroundColor: confirmed ? colors.dark : "transparent",
            }}
          >
            {confirmed && <View className="w-3 h-3 bg-light" />}
          </View>

          <CsText style={[typography.Poppins_s_regular]}>
            I understand this action cannot be undone
          </CsText>
        </TouchableOpacity>

       {/* DELETE BUTTON */}
<TouchableOpacity
  disabled={!confirmed || isLoading}
  onPress={handleDeleteAccount}
  className="py-4 rounded-full items-center"
  style={{
    backgroundColor: confirmed ? "#DC2626" : "#FCA5A5",
    opacity: isLoading ? 0.7 : 1,
  }}
>
  <CsText
    style={[typography.Poppins_m_semibold]}
    className="text-light"
  >
    {isLoading ? "Deleting..." : "Delete Account"}
  </CsText>
</TouchableOpacity>

     
    </ScreenLayout>
  );
}
