import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import BackHeader from "@/src/components/shared/BackHeader";
import FormTextAreaInput from "@/src/components/shared/inputs/FormTextAreaInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";

import { toast } from "@backpackapp-io/react-native-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import { router } from "expo-router";
import { useCountries, useDistricts, useStates } from "../hooks/useAddress";
import { useCreateShippingAddress } from "../hooks/useCheckout";
import { AddressFormData, addressSchema } from "../Schema/addressSchema";

const CreateAddressScreen = ({ navigation }) => {
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
    formState: { errors },
  } = methods;

  const selectedCountry = watch("countryId");
  const selectedState = watch("stateOrProvinceId");

  const { data: countries } = useCountries();
  const { data: states } = useStates(selectedCountry);
  const { data: districts } = useDistricts(selectedState);

  const { mutateAsync: createAddress, isPending } = useCreateShippingAddress();

  /**
   * Reset district when state changes
   */
  useEffect(() => {
    methods.setValue("districtId", "");
  }, [selectedState]);

  /**
   * Submit
   */
  const onSubmit = async (data: AddressFormData) => {
    const selectedCountry = countries?.find(
      (c) => String(c.id) === data.countryId,
    );

    const selectedState = states?.find(
      (s) => String(s.id) === data.stateOrProvinceId,
    );

    const selectedDistrict = districts?.find(
      (d) => String(d.id) === data.districtId,
    );

    const payload = {
      id: 0,
      contactName: data.contactName.trim(),
      phone: data.phone.trim(),
      addressLine1: data.addressLine1.trim(),
      addressLine2: data.addressLine2.trim(),
      zipCode: data.zipCode.trim(),
      city: data.city.trim(),
      stateOrProvinceId: Number(data.stateOrProvinceId),
      districtId: Number(data.districtId),
      countryId: data.countryId,

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

      countries: selectedCountry
        ? [
            {
              disabled: false,
              selected: true,
              text: selectedCountry.name,
              value: String(selectedCountry.id),
            },
          ]
        : [],

      displayDistrict: true,
      displayZipCode: true,
      displayCity: true,
    };

    try {
      const res = await createAddress(payload);

      if (res?.success) {
        toast.success("Address created successfully");

        reset();

        router.replace("/products/checkout/selectAddress");
      } else {
        toast.error("Failed to create address");
      }
    } catch (error) {
      console.log("Create Address Error:", error);
      toast.error("Failed to create address");
    }
  };

  /**
   * Options
   */

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
            className="flex-1 px-4"
          >
            <View className="gap-y-5 py-4">
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

              <View className="h-[1px] bg-gray-100" />

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
              activeOpacity={0.9}
              className="h-14 rounded-2xl items-center justify-center mt-8"
              style={{ backgroundColor: colors.primary }}
            >
              {isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  style={[typography.Poppins_s_bold]}
                  className="text-white text-base"
                >
                  Save Address
                </Text>
              )}
            </TouchableOpacity>

            <View className="h-10" />
          </ScrollView>
        </FormProvider>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

export default CreateAddressScreen;
