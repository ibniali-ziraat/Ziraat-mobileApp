import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { useCheckoutShipping } from "./hooks/data/useCheckout";

const AddressPage = () => {
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const loadCheckoutId = async () => {
      const storedId = await AsyncStorage.getItem("checkoutId");

      if (storedId) {
        setCheckoutId(storedId);
      } else {
        console.log("No checkoutId found");
      }
    };

    loadCheckoutId();
  }, []);

  const { data, isLoading } = useCheckoutShipping(checkoutId ?? "");

  const addresses = data?.existingShippingAddresses || [];

  const handleSelectAddress = (addressId: number) => {
    setSelectedAddressId(addressId);

    console.log("Selected Address:", addressId);
  };

  if (!checkoutId) {
    return (
      <ScreenLayout>
        <View className="flex-1 justify-center items-center">
          <CsText>No active checkout found</CsText>
        </View>
      </ScreenLayout>
    );
  }

  if (isLoading) {
    return (
      <ScreenLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator />
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout scrollable={false}>
      <BackHeader title="Select Address" desc="Choose delivery location" />

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.userAddressId.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        renderItem={({ item }) => {
          const isSelected = selectedAddressId === item.userAddressId;

          return (
            <View
              className={`mb-3 p-4 rounded-2xl border ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 bg-white"
              }`}
            >
              <CsText style={[typography.Poppins_s_bold]} className="text-base">
                {item.contactName}
              </CsText>

              <CsText className="mt-1">{item.phone}</CsText>

              <CsText className="mt-2 text-gray-600">
                {item.addressLine1}
              </CsText>

              {/* <CsText className="text-gray-500">{item.addressLine2}</CsText> */}

              <View className="flex-row justify-between items-center mt-3">
                <CsText className="text-sm text-gray-400">
                  {item.cityName}, {item.stateOrProvinceName}
                </CsText>

                <TouchableOpacity
                  onPress={() => handleSelectAddress(item.userAddressId)}
                  className={`px-4 py-2 rounded-xl ${
                    isSelected ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <CsText
                    className={`text-sm ${
                      isSelected ? "text-white" : "text-black"
                    }`}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </CsText>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* Add New Address Button */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <TouchableOpacity
          onPress={() => router.push("/products/checkout")}
          className="bg-primary h-14 rounded-2xl items-center justify-center"
        >
          <CsText style={[typography.Poppins_s_bold]} className="text-white">
            + Add New Address
          </CsText>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default AddressPage;
