import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import BackHeader from "@/src/components/shared/BackHeader";
import FormTextAreaInput from "@/src/components/shared/inputs/FormTextAreaInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { toast } from "@backpackapp-io/react-native-toast";

import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { View } from "react-native";

import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { ROUTES } from "@/src/constants/routes";
import { useZodForm } from "@/src/hooks/useZodForm";
import { router } from "expo-router";
import { addressSchema } from "../../auth/user/schemas/userAdress.schema";
import { useCountries, useDistricts, useStates } from "../hooks/useAddress";
import { useCreateShippingAddress } from "../hooks/useCheckout";

const CreateAddressScreen = ({ navigation }) => {
  const methods = useZodForm(addressSchema);

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

  useEffect(() => {
    methods.setValue("districtId", "");
  }, [selectedState]);

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

        router.replace(ROUTES.SHOPPING.CHECKOUT.SELECT_ADDRESS);
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

      <ScreenContent>
        <FormProvider {...methods}>
          <FormTextInput
            name="contactName"
            label="Contact Name"
            placeholder="John Doe"
            required
            error={errors.contactName}
          />

          <FormTextInput
            name="phone"
            label="Phone Number"
            type="phone"
            placeholder="0000000000"
            required
            error={errors.phone}
          />

          <View className="h-[1px] bg-gray-100" />

          <SingleSelectInput
            name="countryId"
            label="Country"
            control={methods.control}
            options={countryOptions}
            modalLabel="Select Country"
            searchable
            error={errors.countryId}
          />

          <SingleSelectInput
            name="stateOrProvinceId"
            label="State / Province"
            options={stateOptions}
            modalLabel="Select State"
            searchable
            disabled={!selectedCountry}
            error={errors.stateOrProvinceId}
          />

          <SingleSelectInput
            name="districtId"
            label="District"
            options={districtOptions}
            modalLabel="Select District"
            searchable
            disabled={!selectedState}
            error={errors.districtId}
          />

          <FormTextAreaInput
            name="addressLine1"
            label="Address Line 1"
            required
            error={errors.addressLine1}
          />

          <FormTextAreaInput
            name="addressLine2"
            label="Address Line 2 (Optional)"
            optional
            error={errors.addressLine2}
          />

          <View className="flex-row gap-3">
            <View className="flex-1">
              <FormTextInput
                name="city"
                label="City"
                required
                error={errors.city}
              />
            </View>

            <View className="flex-1">
              <FormTextInput
                name="zipCode"
                label="Zip Code"
                type="pincode"
                required
                error={errors.zipCode}
              />
            </View>
          </View>
          <FormActions
            onCancel={() => router.back()}
            cancelLabel="Cancel"
            submitLabel="Add Address"
            onSubmit={handleSubmit(onSubmit)}
            disabled={isPending}
            loading={isPending}
          />

          <View className="h-10" />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
};

export default CreateAddressScreen;
