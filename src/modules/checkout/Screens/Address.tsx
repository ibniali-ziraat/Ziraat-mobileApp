import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import Loader from "@/src/components/shared/Loader";
import { ROUTES } from "@/src/constants/routes";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  useCheckoutShipping,
  useCreateCheckoutShipping,
  useUpdateTaxAndShippingPrices,
} from "../hooks/useCheckout";

const SelectAddressScreen = () => {
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );

  /* LOAD CHECKOUT ID */

  useEffect(() => {
    const loadCheckoutId = async () => {
      const storedId = await AsyncStorage.getItem("checkoutId");
      if (storedId) setCheckoutId(storedId);
    };

    loadCheckoutId();
  }, []);

  /* GET ADDRESSES */

  const { data, isLoading } = useCheckoutShipping(checkoutId ?? "");
  const addresses = data?.existingShippingAddresses || [];

  /* MUTATIONS */

  const { mutate: updatePrices } = useUpdateTaxAndShippingPrices();
  const { mutate: createShipping } = useCreateCheckoutShipping();

  /* SELECT ADDRESS */

  const handleSelectAddress = (address: any) => {
    if (!checkoutId) return;

    setSelectedAddressId(address.userAddressId);

    const updatePayload = {
      newShippingAddress: address,
      newBillingAddress: address,
      existingShippingAddressId: address.userAddressId,
    };

    updatePrices(
      { checkoutId, payload: updatePayload },
      {
        onSuccess: (response) => {
          const orderSummary = response.checkoutVm;

          const shippingMethod = response?.shippingPrices?.[0]?.name ?? "Free";

          const shippingPayload = {
            existingShippingAddresses: [],
            shippingAddressId: address.userAddressId,
            billingAddressId: address.userAddressId,
            shippingMethod,
            newAddressForm: null,
            useShippingAddressAsBillingAddress: true,
            newBillingAddressForm: null,
            orderNote: "",
            checkoutId,
          };

          createShipping({
            checkoutId,
            payload: shippingPayload,
          });

          /* NAVIGATE TO REVIEW SCREEN */

          router.push({
            pathname: ROUTES.SHOPPING.CHECKOUT.REVIEW_ORDER,
            params: {
              address: JSON.stringify(address),
              orderSummary: JSON.stringify(orderSummary),
              checkoutId,
            },
          });
        },
      },
    );
  };

  /* EMPTY STATE */

  if (!checkoutId) {
    return (
      <ScreenLayout>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No active checkout found</Text>
        </View>
      </ScreenLayout>
    );
  }

  /* LOADING */

  if (isLoading) {
    return (
      <ScreenLayout>
        <Loader />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout scrollable>
      <BackHeader
        title="Select Address"
        desc="Choose delivery address"
        onPress={() => router.replace(ROUTES.TABS.PRODUCTS)}
      />

      <View style={{ padding: 16 }}>
        <Text
          style={[
            typography.Poppins_s_bold,
            { fontSize: 18, marginBottom: 14 },
          ]}
        >
          Delivery Address
        </Text>

        <FlatList
          data={addresses}
          scrollEnabled={false}
          keyExtractor={(item, index) =>
            item?.userAddressId?.toString() ?? index.toString()
          }
          renderItem={({ item }) => {
            if (!item) return null;

            const isSelected = selectedAddressId === item.userAddressId;

            return (
              <TouchableOpacity
                onPress={() => handleSelectAddress(item)}
                style={{
                  flexDirection: "row",
                  backgroundColor: isSelected ? colors.light : "#f5f5f5",
                  borderRadius: 18,
                  padding: 18,
                  marginBottom: 14,
                }}
              >
                <View
                  style={{
                    height: 22,
                    width: 22,
                    borderRadius: 11,
                    borderWidth: 2,
                    borderColor: colors.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 14,
                    marginTop: 4,
                  }}
                >
                  {isSelected && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: colors.primary,
                      }}
                    />
                  )}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={[typography.Poppins_s_bold, { fontSize: 15 }]}>
                    {item.contactName}
                  </Text>

                  <Text style={{ marginTop: 4 }}>{item.phone}</Text>

                  <Text style={{ marginTop: 6 }}>{item.addressLine1}</Text>

                  <Text style={{ color: colors.neutral }}>
                    {item.cityName}, {item.stateOrProvinceName}
                  </Text>

                  <Text style={{ color: colors.darkHover }}>
                    {item.zipCode}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {/* ADD ADDRESS */}

        <TouchableOpacity
          onPress={() => router.push(ROUTES.SHOPPING.CHECKOUT.CREATE_ADDRESS)}
          style={{
            backgroundColor: colors.secondary,
            height: 52,
            borderRadius: 14,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={[typography.Poppins_s_bold, { color: colors.light }]}>
            + Add New Address
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default SelectAddressScreen;
