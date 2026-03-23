import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import BackHeader from "@/src/components/shared/BackHeader";
import FormTextAreaInput from "@/src/components/shared/inputs/FormTextAreaInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { toast } from "@backpackapp-io/react-native-toast";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { View } from "react-native";

import {
  useCountries,
  useCreateAddress,
  useDistricts,
  useEditUserAddress,
  useExistingAddress,
  useStates,
} from "@/src/hooks/useraddress/useUserAddress";

import FormActions from "@/src/components/shared/FormActions";
import Loader from "@/src/components/shared/Loader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { useZodForm } from "@/src/hooks/useZodForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AddressFormData, addressSchema } from "./schemas/userAdress.schema";

const UserAddressForm = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const isEditMode = !!id;
  const userAddressId = Number(id);
  const methods = useZodForm(addressSchema);

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  const selectedCountry = watch("countryId");
  const selectedState = watch("stateOrProvinceId");

  const { data: existingAddress, isLoading: isFetchingAddress } =
    useExistingAddress(isEditMode ? userAddressId : undefined);

  const { data: countries } = useCountries();
  const { data: states } = useStates(selectedCountry);
  const { data: districts } = useDistricts(selectedState);

  const { mutate: handleCreateAddress, isPending: isCreating } =
    useCreateAddress();

  const { mutate: handleEditAddress, isPending: isEditing } =
    useEditUserAddress();

  const isPending = isCreating || isEditing;

  useEffect(() => {
    if (isEditMode && existingAddress) {
      reset({
        contactName: existingAddress.contactName || "",
        phone: existingAddress.phone || "",
        addressLine1: existingAddress.addressLine1 || "",
        addressLine2: existingAddress.addressLine2 || "",
        zipCode: existingAddress.zipCode || "",
        city: existingAddress.city || "",
        countryId: existingAddress.countryId?.toString() || "",
        stateOrProvinceId: existingAddress.stateOrProvinceId?.toString() || "",
        districtId: "",
      });
    }
  }, [existingAddress]);

  useEffect(() => {
    if (isEditMode && existingAddress && districts?.length) {
      setValue("districtId", existingAddress.districtId?.toString() || "");
    }
  }, [districts]);

  useEffect(() => {
    if (!isEditMode) {
      setValue("districtId", "");
    }
  }, [selectedState]);

  const onSubmit = (data: AddressFormData) => {
    const selectedCountryObj = countries?.find(
      (c) => String(c.id) === data.countryId,
    );

    const selectedStateObj = states?.find(
      (s) => String(s.id) === data.stateOrProvinceId,
    );

    const selectedDistrictObj = districts?.find(
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
      countries: selectedCountryObj
        ? [
            {
              disabled: false,
              selected: true,
              text: selectedCountryObj.name,
              value: String(selectedCountryObj.id),
            },
          ]
        : [],
      stateOrProvinces: selectedStateObj
        ? [
            {
              disabled: false,
              selected: true,
              text: selectedStateObj.name,
              value: String(selectedStateObj.id),
            },
          ]
        : [],
      districts: selectedDistrictObj
        ? [
            {
              disabled: false,
              selected: true,
              text: selectedDistrictObj.name,
              value: String(selectedDistrictObj.id),
            },
          ]
        : [],
      displayDistrict: true,
      displayZipCode: true,
      displayCity: true,
    };

    if (isEditMode) {
      handleEditAddress(
        {
          userAddressId,
          payload,
        },
        {
          onSuccess: () => {
            toast.success("Address updated successfully");
            router.back();
          },
          onError: () => toast.error("Failed to update address"),
        },
      );
    } else {
      handleCreateAddress(payload, {
        onSuccess: () => {
          toast.success("Address saved successfully");
          reset();
          router.back();
        },
        onError: () => toast.error("Failed to save address"),
      });
    }
  };

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

  if (isEditMode && isFetchingAddress) {
    return (
      <ScreenLayout>
        <Loader />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <BackHeader
        title={isEditMode ? "Edit Address" : "Add New Address"}
        desc="Enter delivery details"
      />
      <ScreenContent>
        <FormProvider {...methods}>
          <View style={{ marginTop: 12 }}>
            <FormTextInput
              name="contactName"
              label="Contact Name"
              required
              error={errors.contactName}
              type="username"
            />

            <FormTextInput
              name="phone"
              label="Phone Number"
              required
              error={errors.phone}
              type="phone"
            />

            <SingleSelectInput
              name="countryId"
              label="Country"
              options={countryOptions}
              modalLabel="Select Country"
              searchable
              error={errors.countryId}
            />

            <SingleSelectInput
              name="stateOrProvinceId"
              label="State / Province"
              options={stateOptions}
              disabled={!selectedCountry}
              error={errors.stateOrProvinceId}
            />

            <SingleSelectInput
              name="districtId"
              label="District"
              options={districtOptions}
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
            />

            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <FormTextInput
                  name="city"
                  label="City"
                  required
                  error={errors.city}
                  type="username"
                />
              </View>

              <View style={{ flex: 1 }}>
                <FormTextInput
                  name="zipCode"
                  label="Zip Code"
                  required
                  error={errors.zipCode}
                  type="pincode"
                />
              </View>
            </View>
          </View>
          <FormActions
            cancelLabel="Cancel"
            onCancel={() => router.back()}
            submitLabel={isEditMode ? "Update Address" : "Save Address"}
            onSubmit={handleSubmit(onSubmit)}
            disabled={isPending}
            loading={isPending}
          />
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
};

export default UserAddressForm;
