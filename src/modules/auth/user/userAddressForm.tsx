



import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import BackHeader from "@/src/components/shared/BackHeader";
import FormTextAreaInput from "@/src/components/shared/inputs/FormTextAreaInput";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import { toast } from "@backpackapp-io/react-native-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  useCountries,
  useCreateAddress,
  useDistricts,
  useEditUserAddress,
  useExistingAddress,
  useStates,
} from "@/src/hooks/useraddress/useUserAddress";

import { colors } from "@/src/constants/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  AddressFormData,
  addressSchema,
} from "./schemas/userAdress.schema";

const UserAddressForm = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const isEditMode = !!id;
  const userAddressId = Number(id);

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
    setValue,
    formState: { errors },
  } = methods;

  const selectedCountry = watch("countryId");
  const selectedState = watch("stateOrProvinceId");

  // ✅ Fetch edit data
  const {
    data: existingAddress,
    isLoading: isFetchingAddress,
  } = useExistingAddress(isEditMode ? userAddressId : undefined);

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
        stateOrProvinceId:
          existingAddress.stateOrProvinceId?.toString() || "",
        districtId: "", 
      });
    }
  }, [existingAddress]);

 
  useEffect(() => {
    if (
      isEditMode &&
      existingAddress &&
      districts?.length
    ) {
      setValue(
        "districtId",
        existingAddress.districtId?.toString() || ""
      );
    }
  }, [districts]);

 
  useEffect(() => {
    if (!isEditMode) {
      setValue("districtId", "");
    }
  }, [selectedState]);

  
  if (isEditMode && isFetchingAddress) {
    return (
      <ScreenLayout>
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 40 }}
        />
      </ScreenLayout>
    );
  }

  const onSubmit = (data: AddressFormData) => {
    const selectedCountryObj = countries?.find(
      (c) => String(c.id) === data.countryId
    );

    const selectedStateObj = states?.find(
      (s) => String(s.id) === data.stateOrProvinceId
    );

    const selectedDistrictObj = districts?.find(
      (d) => String(d.id) === data.districtId
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
          onError: () =>
            toast.error("Failed to update address"),
        }
      );
    } else {
      handleCreateAddress(payload, {
        onSuccess: () => {
          toast.success("Address saved successfully");
          reset();
          router.back();
        },
        onError: () =>
          toast.error("Failed to save address"),
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

  return (
    <ScreenLayout>
      <BackHeader
        title={isEditMode ? "Edit Address" : "Add New Address"}
        desc="Enter delivery details"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <FormProvider {...methods}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              padding: 20,
              paddingBottom: 50,
            }}
          >
            <View style={{ gap: 18 }}>
              <FormTextInput
                name="contactName"
                label="Contact Name"
                required
                error={errors.contactName?.message}
              />

              <FormTextInput
                name="phone"
                label="Phone Number"
                required
                error={errors.phone?.message}
              />

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
                disabled={!selectedCountry}
                error={errors.stateOrProvinceId?.message}
              />

              <SingleSelectInput
                name="districtId"
                label="District"
                control={methods.control}
                options={districtOptions}
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
              />

              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <FormTextInput
                    name="city"
                    label="City"
                    required
                    error={errors.city?.message}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <FormTextInput
                    name="zipCode"
                    label="Zip Code"
                    required
                    error={errors.zipCode?.message}
                  />
                </View>
              </View>
            </View>

            <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
              style={{
                marginTop: 30,
                height: 56,
                borderRadius: 20,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                elevation: 4,
              }}
            >
              {isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  style={[
                    typography.Poppins_s_bold,
                    {
                      color: "#fff",
                      fontSize: 16,
                      letterSpacing: 0.5,
                    },
                  ]}
                >
                  {isEditMode
                    ? "Update Address"
                    : "Save Address"}
                </Text>
              )}
            </Pressable>
          </ScrollView>
        </FormProvider>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

export default UserAddressForm;