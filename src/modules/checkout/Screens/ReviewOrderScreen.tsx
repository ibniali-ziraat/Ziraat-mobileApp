// import BackHeader from "@/src/components/shared/BackHeader";
// import ScreenLayout from "@/src/components/shared/ScreenLayout";

// import { colors } from "@/src/constants/colors";
// import { typography } from "@/src/constants/fonts/typography";

// import { router, useLocalSearchParams } from "expo-router";
// import { FormProvider, useForm } from "react-hook-form";

// import { Image, Text, TouchableOpacity, View } from "react-native";

// import DropdownSelectInput from "@/src/components/form/inputs/Dropdown";
// import { ROUTES } from "@/src/constants/routes";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Sparkles } from "lucide-react-native";
// import { useCodCheckout, usePaymentProviders } from "../hooks/useCheckout";

// const ReviewOrderScreen = () => {
//   const { address, orderSummary } = useLocalSearchParams();

//   const selectedAddress = address ? JSON.parse(address as string) : null;
//   const summary = orderSummary ? JSON.parse(orderSummary as string) : null;

//   const methods = useForm({
//     defaultValues: {
//       paymentMethod: "",
//     },
//   });

//   const selectedPayment = methods.watch("paymentMethod");

//   const { data: paymentProviders } = usePaymentProviders();

//   const { mutate: codCheckout, isPending } = useCodCheckout();

//   const paymentOptions = Array.isArray(paymentProviders)
//     ? paymentProviders
//         .filter((p: any) => p?.isEnabled)
//         .map((p: any) => ({
//           label: p.name,
//           value: p.id,
//         }))
//     : [];

//   const formatRs = (value: string) => value?.replace("$", "₹");

//   const handlePlaceOrder = async () => {
//     const checkoutId = await AsyncStorage.getItem("checkoutId");

//     if (!checkoutId) return;

//     codCheckout(checkoutId, {
//       onSuccess: (response) => {
//         router.push({
//           pathname: ROUTES.SHOPPING.CHECKOUT.ORDER_SUCCESS,
//           params: {
//             order: JSON.stringify(response),
//           },
//         });
//       },
//       onError: (error) => {
//         console.log("Order failed", error);
//       },
//     });
//   };

//   if (!summary) return null;

//   return (
//     <FormProvider {...methods}>
//       <ScreenLayout scrollable>
//         <BackHeader title="Review Order" desc="Confirm your order details" />

//         {/* ITEMS */}

//         <View className="mx-4 mt-4 rounded-2xl bg-white p-4">
//           <Text style={[typography.Poppins_s_bold]} className="mb-3 text-lg">
//             Items
//           </Text>

//           {summary.items?.map((item: any) => (
//             <View key={item.id} className="mb-4 flex-row items-center">
//               <Image
//                 source={{ uri: item.productImage }}
//                 className="mr-3 h-16 w-16 rounded-xl"
//               />

//               <View className="flex-1">
//                 <Text className="font-semibold text-base text-neutral-900">
//                   {item.productName}
//                 </Text>

//                 <Text className="text-sm text-gray-500">
//                   Qty: {item.quantity}
//                 </Text>
//               </View>

//               <Text className="font-semibold text-base text-neutral-900">
//                 {formatRs(item.totalString)}
//               </Text>
//             </View>
//           ))}
//         </View>

//         {/* ADDRESS */}

//         <View className="mx-4 rounded-2xl bg-white p-4">
//           <Text style={[typography.Poppins_s_bold]} className="mb-2 text-lg">
//             Deliver To
//           </Text>

//           <Text className="font-semibold text-base text-neutral-900">
//             {selectedAddress.contactName}
//           </Text>

//           <Text className="mt-1 text-sm text-neutral-700">
//             {selectedAddress.addressLine1}
//           </Text>

//           <Text className="text-sm text-neutral-700">
//             {selectedAddress.cityName}, {selectedAddress.stateOrProvinceName}
//           </Text>

//           <Text className="text-sm text-neutral-600">
//             {selectedAddress.zipCode}
//           </Text>
//         </View>

//         {/* ORDER SUMMARY */}

//         <View className="mx-4 rounded-2xl bg-white p-4">
//           <Text style={[typography.Poppins_s_bold]} className="mb-3 text-lg">
//             Order Summary
//           </Text>

//           <SummaryRow
//             label="Subtotal"
//             value={formatRs(summary.subTotalString)}
//           />

//           {summary.discount > 0 && (
//             <SummaryRow
//               label="Discount"
//               value={`- ${formatRs(summary.discountString)}`}
//             />
//           )}

//           <SummaryRow label="Tax" value={formatRs(summary.taxAmountString)} />

//           <SummaryRow
//             label="Shipping"
//             value={
//               summary.shippingAmount === 0
//                 ? "Free"
//                 : formatRs(summary.shippingAmountString)
//             }
//           />

//           <Divider />

//           <SummaryRow
//             label="Order Total"
//             value={formatRs(summary.orderTotalString)}
//             bold
//           />

//           {summary.discount > 0 && (
//             <View className="mt-4 flex-row items-center justify-end">
//               <Sparkles size={16} color={colors.primary} />

//               <Text className="ml-2 font-semibold text-primary">
//                 You saved {formatRs(summary.discountString)}
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* PAYMENT METHOD */}

//         <View className="mx-4 mt-4">
//           <DropdownSelectInput
//             name="paymentMethod"
//             label="Payment Method"
//             options={paymentOptions}
//           />
//         </View>

//         {/* PLACE ORDER */}

//         {selectedPayment && (
//           <TouchableOpacity
//             onPress={handlePlaceOrder}
//             disabled={isPending}
//             style={{ backgroundColor: colors.primary }}
//             className="mx-4 my-6 h-14 items-center justify-center rounded-xl"
//           >
//             <Text
//               style={[typography.Poppins_s_bold]}
//               className="text-base text-white"
//             >
//               {isPending ? "Placing Order..." : "Place Order"}
//             </Text>
//           </TouchableOpacity>
//         )}
//       </ScreenLayout>
//     </FormProvider>
//   );
// };

// /* SUMMARY ROW */

// const SummaryRow = ({ label, value, bold }: any) => (
//   <View className="mb-2 flex-row justify-between">
//     <Text
//       className={`text-sm ${
//         bold ? "font-bold text-neutral-900" : "text-neutral-700"
//       }`}
//     >
//       {label}
//     </Text>

//     <Text
//       className={`text-sm ${
//         bold ? "font-bold text-neutral-900" : "text-neutral-700"
//       }`}
//     >
//       {value}
//     </Text>
//   </View>
// );

// /* DIVIDER */

// const Divider = () => <View className="my-2 border-t border-gray-200" />;

// export default ReviewOrderScreen;



import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";

import { router, useLocalSearchParams } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";

import { Image, Text, TouchableOpacity, View } from "react-native";

import DropdownSelectInput from "@/src/components/form/inputs/Dropdown";
import { ROUTES } from "@/src/constants/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Sparkles } from "lucide-react-native";
import { useState } from "react";
import { useCodCheckout, usePaymentProviders } from "../hooks/useCheckout";

const ReviewOrderScreen = () => {
  const { address, orderSummary } = useLocalSearchParams();

  const selectedAddress = address ? JSON.parse(address as string) : null;
  const summary = orderSummary ? JSON.parse(orderSummary as string) : null;

  const [errorMsg, setErrorMsg] = useState(""); // ✅ NEW

  const methods = useForm({
    defaultValues: {
      paymentMethod: "",
    },
  });

  const selectedPayment = methods.watch("paymentMethod");

  const { data: paymentProviders } = usePaymentProviders();

  const { mutate: codCheckout, isPending } = useCodCheckout();

  const paymentOptions = Array.isArray(paymentProviders)
    ? paymentProviders
        .filter((p: any) => p?.isEnabled)
        .map((p: any) => ({
          label: p.name,
          value: p.id,
        }))
    : [];

  const formatRs = (value: string) => value?.replace("$", "₹");

  const handlePlaceOrder = async () => {
    const checkoutId = await AsyncStorage.getItem("checkoutId");

    if (!checkoutId) return;

    setErrorMsg(""); 

    codCheckout(checkoutId, {
      onSuccess: (response) => {
        router.push({
          pathname: ROUTES.SHOPPING.CHECKOUT.ORDER_SUCCESS,
          params: {
            order: JSON.stringify(response),
          },
        });
      },
      onError: (error: any) => {
  console.log("ERROR RESPONSE 👉", error?.response?.data);

  let message = "";
  const data = error?.response?.data;

  if (typeof data === "string") {
    message = data;
  } else if (data?.message) {
    message = data.message;
  } else if (data?.error) {
    message = data.error;
  } else if (Array.isArray(data?.errors)) {
    message = data.errors[0];
  } else {
    message = error?.message;
  }

  if (!message) {
    message = "Something went wrong";
  }

  setErrorMsg(message); // ✅ ONLY UI
}
    });
  };

  if (!summary) return null;

  return (
    <FormProvider {...methods}>
      <ScreenLayout scrollable>
        <BackHeader title="Review Order" desc="Confirm your order details" />

        {/* ITEMS */}
        <View className="mx-4 mt-4 rounded-2xl bg-white p-4">
          <Text style={[typography.Poppins_s_bold]} className="mb-3 text-lg">
            Items
          </Text>

          {summary.items?.map((item: any) => (
            <View key={item.id} className="mb-4 flex-row items-center">
              <Image
                source={{ uri: item.productImage }}
                className="mr-3 h-16 w-16 rounded-xl"
              />

              <View className="flex-1">
                <Text className="font-semibold text-base text-neutral-900">
                  {item.productName}
                </Text>

                <Text className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </Text>
              </View>

              <Text className="font-semibold text-base text-neutral-900">
                {formatRs(item.totalString)}
              </Text>
            </View>
          ))}
        </View>

        {/* ADDRESS */}
        <View className="mx-4 rounded-2xl bg-white p-4">
          <Text style={[typography.Poppins_s_bold]} className="mb-2 text-lg">
            Deliver To
          </Text>

          <Text className="font-semibold text-base text-neutral-900">
            {selectedAddress.contactName}
          </Text>

          <Text className="mt-1 text-sm text-neutral-700">
            {selectedAddress.addressLine1}
          </Text>

          <Text className="text-sm text-neutral-700">
            {selectedAddress.cityName}, {selectedAddress.stateOrProvinceName}
          </Text>

          <Text className="text-sm text-neutral-600">
            {selectedAddress.zipCode}
          </Text>
        </View>

        {/* ORDER SUMMARY */}
        <View className="mx-4 rounded-2xl bg-white p-4">
          <Text style={[typography.Poppins_s_bold]} className="mb-3 text-lg">
            Order Summary
          </Text>

          <SummaryRow
            label="Subtotal"
            value={formatRs(summary.subTotalString)}
          />

          {summary.discount > 0 && (
            <SummaryRow
              label="Discount"
              value={`- ${formatRs(summary.discountString)}`}
            />
          )}

          <SummaryRow label="Tax" value={formatRs(summary.taxAmountString)} />

          <SummaryRow
            label="Shipping"
            value={
              summary.shippingAmount === 0
                ? "Free"
                : formatRs(summary.shippingAmountString)
            }
          />

          <Divider />

          <SummaryRow
            label="Order Total"
            value={formatRs(summary.orderTotalString)}
            bold
          />

          {summary.discount > 0 && (
            <View className="mt-4 flex-row items-center justify-end">
              <Sparkles size={16} color={colors.primary} />
              <Text className="ml-2 font-semibold text-primary">
                You saved {formatRs(summary.discountString)}
              </Text>
            </View>
          )}
        </View>

        {/* PAYMENT METHOD */}
        <View className="mx-4 mt-4">
          <DropdownSelectInput
            name="paymentMethod"
            label="Payment Method"
            options={paymentOptions}
          />
        </View>

        {/*  ERROR MESSAGE UI */}
        {errorMsg ? (
          <Text
            style={{
              color: "#DC2626",
              textAlign: "center",
              marginTop: 12,
              fontWeight: "600",
            }}
          >
            {errorMsg}
          </Text>
        ) : null}

        {/* PLACE ORDER */}
        {selectedPayment && (
          <TouchableOpacity
            onPress={handlePlaceOrder}
            disabled={isPending}
            style={{ backgroundColor: colors.primary }}
            className="mx-4 my-6 h-14 items-center justify-center rounded-xl"
          >
            <Text
              style={[typography.Poppins_s_bold]}
              className="text-base text-white"
            >
              {isPending ? "Placing Order..." : "Place Order"}
            </Text>
          </TouchableOpacity>
        )}
      </ScreenLayout>
    </FormProvider>
  );
};

/* SUMMARY ROW */
const SummaryRow = ({ label, value, bold }: any) => (
  <View className="mb-2 flex-row justify-between">
    <Text
      className={`text-sm ${
        bold ? "font-bold text-neutral-900" : "text-neutral-700"
      }`}
    >
      {label}
    </Text>

    <Text
      className={`text-sm ${
        bold ? "font-bold text-neutral-900" : "text-neutral-700"
      }`}
    >
      {value}
    </Text>
  </View>
);

/* DIVIDER */
const Divider = () => <View className="my-2 border-t border-gray-200" />;

export default ReviewOrderScreen;