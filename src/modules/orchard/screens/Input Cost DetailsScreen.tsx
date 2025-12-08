import BackHeader from "@/src/components/shared/BackHeader";
import { useZodForm } from "@/src/hooks/useZodForm";
// import { businessInformationSchema } from "@/src/schemas/vendor/business.schema";
import { InputCostDetailsSchema } from "@/src/schemas/orchard schemas/InputCostDetailsSchema";
import { FormProvider } from "react-hook-form";
import { Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import InputCostDetails from "../sections/Input Cost Details";

export default function InputCostDetailsScreen() {
//   const { vendorData, setVendorData, userData } = useGlobalData();

  // const { data: userProfileData } = useProfileQuery(userData.id);
  // console.log(userProfileData, "userprofiledata");

//   const { data } = useVendorProfileQuery(userData.id);
//   const { mutateAsync: save } = useVendorProfileMutation();
//   const { mutateAsync: update } = useVendorProfileUpdateMutation();

  const form = useZodForm(InputCostDetailsSchema);
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

  return (
    <ScrollView>
      <BackHeader
        title="Supplier Onboarding"
        desc="Start selling to farmers today."
      />
      <FormProvider {...form}>
        <InputCostDetails errors={errors} control={control} />
        <Button title="Save" 
        // onPress={"handleSubmit(onSubmit)"}
         />
      </FormProvider>
    </ScrollView>
  );
}