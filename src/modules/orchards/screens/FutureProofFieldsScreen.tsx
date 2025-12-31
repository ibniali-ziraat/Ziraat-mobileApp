import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import {
  useCreateOrchardExtraMutation,
  useOrchardExtraQuery,
  useOrchardProfileId,
  useUpdateOrchardExtraMutation,
} from "../hooks/useOrchardsQuery";

import { useAuth } from "@/src/contexts/AuthContext";
import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router } from "expo-router";
import { FormProvider } from "react-hook-form";
import OptionalFutureFields from "../form-sections/FutureFieldSection";

export default function FutureProofFieldScreen() {
  // const { data: userProfileData } = useProfileQuery(userData.id);
  // console.log(userProfileData, "userprofiledata");

  const { data } = useOrchardExtraQuery(0);
  const { userId } = useAuth();

  const { data: orchardProfile } = useOrchardProfileId(userId);

  const { mutateAsync: save, isPending: isSaving } =
    useCreateOrchardExtraMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateOrchardExtraMutation();

  const form = useZodForm();
  // const form = useZodForm(OptionalFutureFieldsSchema);
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

  const onSubmit = async (values: any) => {
    try {
      // let res;

      // if (orchardId) {
      //   res = await update({ id: orchardId, ...values });
      //   showSuccessToast("Orchard updated");
      // }

      // else

      //   {
      const payload = {
        id: orchardProfile?.[0]?.id,
        optionalFields: {
          ...values,
        },
      };

      // Send payload
      const res = await save(payload);

      // setOrchardId(res.id);
      showSuccessToast("Orchard created");
      // }

      // router.push(ROUTES.TABS.ORCHARDS);
      router.push(ROUTES.TABS.ORCHARDS);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save orchard information"
      );
    }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Orchard Registration"
        desc="Optional / Future-Proof Fields"
      />
      <FormProvider {...form}>
        <OptionalFutureFields errors={errors} control={control} />
        <FormActions
          cancelLabel={"Cancel"}
          submitLabel={data ? "Update" : "Save"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}
