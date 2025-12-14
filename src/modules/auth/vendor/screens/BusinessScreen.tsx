// import { useAuth } from "@/src/contexts/AuthContext";
// import { useZodForm } from "@/src/hooks/useZodForm";
// import {
//   useVendorProfileMutation,
//   useVendorProfileQuery,
//   useVendorProfileUpdateMutation,
// } from "@/src/hooks/vendorQueryHooks";
// import { businessInformationSchema } from "@/src/schemas/vendor/business.schema";
// import { showErrorToast } from "@/src/utils/toast";
// import { router } from "expo-router";
// import { useEffect } from "react";
// import { FormProvider } from "react-hook-form";
// import { Button } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import BusinessSection from "../sections/BusinessSection";

// export default function BusinessScreen() {
//   const { vendorId, userId, setVendorProfileId, vendorProfileId } = useAuth();
//   console.log(vendorId, "vendorid...");

//   const { data } = useVendorProfileQuery(vendorProfileId);
//   const { mutateAsync: save } = useVendorProfileMutation();
//   const { mutateAsync: update } = useVendorProfileUpdateMutation();

//   const form = useZodForm(businessInformationSchema);
//   const {
//     setValue,
//     handleSubmit,
//     formState: { errors },
//     control,
//   } = form;

//   useEffect(() => {
//     if (!data) return;

//     Object.entries(data).forEach(([key, value]) => {
//       if (value !== null && value !== undefined) {
//         setValue(key, value);
//       }
//     });
//   }, [data]);
//   const onSubmit = async (val) => {
//     console.log(val, "this is val");

//     try {
//       if (data) {
//         const payload = { id: vendorProfileId, userId, ...val };
//         await update(payload);
//       } else {
//         const payload = { supplierProfileId: vendorId, ...val };
//         const res = await save(payload);
//         await setVendorProfileId(res.id);
//       }

//       router.push("/auth/vendor/vendor-profile-screen");
//     } catch (err) {
//       showErrorToast("something went wrong");
//       console.error(err);
//     }
//   };

//   return (
//     <ScrollView>
//       <FormProvider {...form}>
//         <BusinessSection errors={errors} control={control} />
//         <Button title="Save" onPress={handleSubmit(onSubmit)} />
//       </FormProvider>
//     </ScrollView>
//   );
// }
import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { useGlobalData } from "@/src/contexts/GlobalDataContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import {
  useVendorProfileMutation,
  useVendorProfileQuery,
  useVendorProfileUpdateMutation,
} from "@/src/hooks/vendorQueryHooks";
import { businessInformationSchema } from "@/src/schemas/vendor/business.schema";
import { showErrorToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import BusinessSection from "../sections/BusinessSection";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";

export default function BusinessScreen() {
  const { vendorData, setVendorData, userData } = useGlobalData();
  const { setVendorProfileId, userId } = useAuth();

  // const { data: userProfileData } = useProfileQuery(userData.id);
  // console.log(userProfileData, "userprofiledata");

  const { data } = useVendorProfileQuery(userId);
  const { mutateAsync: save, isPending: isSaving } = useVendorProfileMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useVendorProfileUpdateMutation();

  const form = useZodForm(businessInformationSchema);
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  // useEffect(() => {
  //   if (userProfileData?.id) {
  //     setUserData({ profileId: userProfileData.id });
  //   }
  // }, [userProfileData]);

  useEffect(() => {
    if (!data) return;
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        setValue(key, value);
      }
    });
  }, [data]);

  console.log(data, "businessdata");

  const onSubmit = async (val: any) => {
    try {
      if (data) {
        const payload = { id: data.id, ...val, userId: userData.id };
        await update(payload);
      } else {
        const payload = { userId: userData.id, ...val };
        const res = await save(payload);

        setVendorProfileId(res.id);
      }

      router.push(ROUTES.AUTH.VENDOR_PROFILE);
    } catch (err) {
      showErrorToast("Something went wrong");
      console.error(err);
    }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Supplier Onboarding"
        desc="Start selling to farmers today."
        onPress={() => router.push(ROUTES.AUTH.VENDOR_PROFILE)}
      />
      <FormProvider {...form}>
        <BusinessSection errors={errors} control={control} data={data} />
        <FormActions
          cancelLabel={"Cancel"}
          onCancel={() => router.back()}
          submitLabel={data ? "Update Profile" : "Submit"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}
