import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import FormTextAreaInput from "@/src/components/shared/inputs/FormTextAreaInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import { toast } from "@backpackapp-io/react-native-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  useCountries,
  useDistricts,
  useStates,
} from "../hooks/checkoutAddress/useAddress";
import { useCreateCheckout } from "../hooks/data/useCheckout";
import { AddressFormData, addressSchema } from "../Schema/addressSchema";

const CheckoutAddressScreen = ({ navigation }) => {
  const methods = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: {
      contactName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      zipCode: "",
      city: "",
      countryId: "",
      stateOrProvinceId: "",
      districtId: "",
    },
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = methods;

  const selectedCountry = watch("countryId");
  const selectedState = watch("stateOrProvinceId");

  const { data: countries } = useCountries();
  const { data: states } = useStates(selectedCountry);
  const { data: districts } = useDistricts(selectedState);

  // const { mutate: handleCreateAddress, isPending } = useCreateAddress();

  const { mutate: handleCreateCheckout, isPending } = useCreateCheckout();
  useEffect(() => {
    methods.setValue("districtId", "", {
      // shouldValidate: true,
    });
  }, [selectedState]);

  const onSubmit = async (data: AddressFormData) => {
    try {
      /**
       * ✅ GET checkoutId FROM STORAGE
       */
      const storedId = await AsyncStorage.getItem("checkoutId");

      if (!storedId) {
        toast.error("Checkout session not found");
        return;
      }

      const selectedCountry = countries?.find(
        (c) => String(c.id) === data.countryId,
      );

      const selectedState = states?.find(
        (s) => String(s.id) === data.stateOrProvinceId,
      );

      const selectedDistrict = districts?.find(
        (d) => String(d.id) === data.districtId,
      );

      /**
       * ✅ CHECKOUT PAYLOAD WITH STORAGE ID
       */
      const payload = {
        existingShippingAddresses: [],

        shippingAddressId: 0,
        billingAddressId: 0,

        shippingMethod: "Standard",

        newAddressForm: {
          contactName: data.contactName.trim(),
          phone: data.phone.trim(),

          addressLine1: data.addressLine1.trim(),
          addressLine2: data.addressLine2.trim(),

          stateOrProvinceId: Number(data.stateOrProvinceId),
          districtId: Number(data.districtId),

          countryId: data.countryId,

          city: data.city.trim(),
          zipCode: data.zipCode.trim(),

          stateOrProvinces: selectedState
            ? [
                {
                  disabled: false,
                  selected: true,
                  text: selectedState.name,
                  value: String(selectedState.id),
                },
              ]
            : [],

          districts: selectedDistrict
            ? [
                {
                  disabled: false,
                  selected: true,
                  text: selectedDistrict.name,
                  value: String(selectedDistrict.id),
                },
              ]
            : [],

          shipableContries: selectedCountry
            ? [
                {
                  disabled: false,
                  selected: true,
                  text: selectedCountry.name,
                  value: String(selectedCountry.id),
                },
              ]
            : [],
        },

        useShippingAddressAsBillingAddress: true,

        newBillingAddressForm: {
          contactName: data.contactName.trim(),
          phone: data.phone.trim(),

          addressLine1: data.addressLine1.trim(),
          addressLine2: data.addressLine2.trim(),

          stateOrProvinceId: Number(data.stateOrProvinceId),
          districtId: Number(data.districtId),

          countryId: data.countryId,

          city: data.city.trim(),
          zipCode: data.zipCode.trim(),

          stateOrProvinces: [],
          districts: [],
          shipableContries: [],
        },

        orderNote: "",

        /**
         * ✅ USE STORAGE VALUE HERE
         */
        checkoutId: storedId,
      };

      console.log("CHECKOUT PAYLOAD:", payload);

      handleCreateCheckout(payload, {
        onSuccess: () => {
          toast.success("Checkout address saved successfully");
          reset();
          navigation.goBack();
        },
        onError: (error) => {
          console.log(error);
          toast.error("Failed to save checkout address");
        },
      });
    } catch (error) {
      console.log("AsyncStorage error:", error);
      toast.error("Something went wrong");
    }
  };

  // const onSubmit = (data: AddressFormData) => {
  //   const selectedCountry = countries?.find(
  //     (c) => String(c.id) === data.countryId,
  //   );

  //   const selectedState = states?.find(
  //     (s) => String(s.id) === data.stateOrProvinceId,
  //   );

  //   const selectedDistrict = districts?.find(
  //     (d) => String(d.id) === data.districtId,
  //   );

  //   const payload = {
  //     id: 0,

  //     contactName: data.contactName.trim(),
  //     phone: data.phone.trim(),

  //     addressLine1: data.addressLine1.trim(),
  //     addressLine2: data.addressLine2.trim(),

  //     zipCode: data.zipCode.trim(),
  //     city: data.city.trim(),

  //     stateOrProvinceId: Number(data.stateOrProvinceId),
  //     districtId: Number(data.districtId),
  //     countryId: data.countryId,

  //     /* ✅ SCHEMA-ACCURATE SELECT OPTIONS */
  //     countries: selectedCountry
  //       ? [
  //           {
  //             disabled: false,
  //             selected: true,
  //             text: selectedCountry.name,
  //             value: String(selectedCountry.id),
  //           },
  //         ]
  //       : [],

  //     stateOrProvinces: selectedState
  //       ? [
  //           {
  //             disabled: false,
  //             selected: true,
  //             text: selectedState.name,
  //             value: String(selectedState.id),
  //           },
  //         ]
  //       : [],

  //     districts: selectedDistrict
  //       ? [
  //           {
  //             disabled: false,
  //             selected: true,
  //             text: selectedDistrict.name,
  //             value: String(selectedDistrict.id),
  //           },
  //         ]
  //       : [],

  //     displayDistrict: true,
  //     displayZipCode: true,
  //     displayCity: true,
  //   };

  //   // console.log("FINAL ADDRESS PAYLOAD:", payload);

  //   handleCreateAddress(payload, {
  //     onSuccess: () => {
  //       toast.success("Address saved successfully");
  //       reset();
  //       navigation.goBack();
  //     },
  //     onError: () => toast.error("Failed to save address"),
  //   });
  // };

  const countryOptions =
    countries?.map((c) => ({
      label: c.name,
      value: String(c.id),
    })) || [];

  const stateOptions =
    states?.map((s) => ({
      label: s.name,
      value: String(s.id),
    })) || [];

  const districtOptions =
    districts?.map((d) => ({
      label: d.name,
      value: String(d.id),
    })) || [];

  return (
    <ScreenLayout>
      <BackHeader title="Add New Address" desc="Enter delivery details" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <FormProvider {...methods}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          >
            <View className="gap-y-4">
              <FormTextInput
                name="contactName"
                label="Contact Name"
                placeholder="John Doe"
                required
                error={errors.contactName?.message}
              />

              <FormTextInput
                name="phone"
                label="Phone Number"
                type="phone"
                placeholder="0000000000"
                required
                error={errors.phone?.message}
              />

              <View className="h-[1px] bg-gray-100 my-1" />

              <SingleSelectInput
                name="countryId"
                label="Country"
                control={methods.control}
                options={countryOptions}
                modalLabel="Select Country"
                searchable
                error={errors.countryId?.message}
              />

              <SingleSelectInput
                name="stateOrProvinceId"
                label="State / Province"
                control={methods.control}
                options={stateOptions}
                modalLabel="Select State"
                searchable
                disabled={!selectedCountry}
                error={errors.stateOrProvinceId?.message}
              />

              <SingleSelectInput
                name="districtId"
                label="District"
                control={methods.control}
                options={districtOptions}
                modalLabel="Select District"
                searchable
                disabled={!selectedState}
                error={errors.districtId?.message}
              />

              <FormTextAreaInput
                name="addressLine1"
                label="Address Line 1"
                required
                error={errors.addressLine1?.message}
              />

              <FormTextAreaInput
                name="addressLine2"
                label="Address Line 2 (Optional)"
                optional
                error={errors.addressLine2?.message}
              />

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <FormTextInput
                    name="city"
                    label="City"
                    required
                    error={errors.city?.message}
                  />
                </View>

                <View className="flex-1">
                  <FormTextInput
                    name="zipCode"
                    label="Zip Code"
                    type="pincode"
                    required
                    error={errors.zipCode?.message}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
              activeOpacity={0.85}
              style={{
                marginTop: 24,
                height: 54,
                borderRadius: 18,
                backgroundColor: isPending ? "#6366F180" : "#6366F1",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <CsText
                  style={[typography.Poppins_s_bold]}
                  className="text-white text-base"
                >
                  Save Address
                </CsText>
              )}
            </TouchableOpacity>
          </ScrollView>
        </FormProvider>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

export default CheckoutAddressScreen;
