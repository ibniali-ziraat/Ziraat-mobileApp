import BackHeader from "@/src/components/shared/BackHeader";
import { useZodForm } from "@/src/hooks/useZodForm";
// import { businessInformationSchema } from "@/src/schemas/vendor/business.schema";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { FarmInfrastructureSchema } from "@/src/schemas/orchard schemas/FarmInfrastructureSchema";
import { FormProvider } from "react-hook-form";
import FarmInfrastructure from "../sections/Farm Infrastructure and Resources";

export default function FarmInfrastuctureScreen() {
  //   const { vendorData, setVendorData, userData } = useGlobalData();

  // const { data: userProfileData } = useProfileQuery(userData.id);
  // console.log(userProfileData, "userprofiledata");

  //   const { data } = useVendorProfileQuery(userData.id);
  //   const { mutateAsync: save } = useVendorProfileMutation();
  //   const { mutateAsync: update } = useVendorProfileUpdateMutation();

  const form = useZodForm(FarmInfrastructureSchema);
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

  //   useEffect(() => {
  //     if (!data) return;
  //     Object.entries(data).forEach(([key, value]) => {
  //       if (value !== null && value !== undefined) {
  //         setValue(key, value);
  //       }
  //     });
  //   }, [data]);

  //   const onSubmit = async (val: any) => {
  //     try {
  //       if (data) {
  //         const payload = { id: vendorData.id, ...val };
  //         await update(payload);
  //       } else {
  //         const payload = { userId: userData.id, ...val };
  //         const res = await save(payload);

  //         setVendorData({
  //           profileId: res.id,
  //         });
  //       }

  //       router.push("/auth/vendor/vendor-profile-screen");
  //     } catch (err) {
  //       showErrorToast("Something went wrong");
  //       console.error(err);
  //     }
  //   };
  const onSubmit = () => {
    console.log("subited");
  };
  return (
    <ScreenLayout>
      <BackHeader
        title="Orchard Registration"
        desc=" Farm Infrastructure & Resources"
      />
      <FormProvider {...form}>
        <FarmInfrastructure errors={errors} control={control} />
        <FormActions
          cancelLabel={"Cancel"}
          // submitLabel={data ? "Update" : "Save"}
          onSubmit={handleSubmit(onSubmit)}
          // disabled={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}
