import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { useZodForm } from "@/src/hooks/useZodForm";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { ROUTES } from "@/src/constants/routes";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { v4 as uuidv4 } from "uuid";
import BasicInfo from "../form-sections/BasicInfoSection";
import {
  useCreateOrchardBasinInfoMutation,
  useUpdateOrchardBasicInfoMutation,
} from "../hooks/useOrchardsQuery";

export default function BasicInfoScreen() {
  // const { userId } = useAuth();
  // const { orchardId, setOrchardId } = useOrchard();
  const params = useLocalSearchParams<{
    orchardSize?: string;
    areaValue?: string;
    areaUnit?: string;
    areaLabel?: string;
  }>();

  // const { data } = useOrchardsByUserQuery(userId);
  const { mutateAsync: save, isPending: isSaving } =
    useCreateOrchardBasinInfoMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateOrchardBasicInfoMutation();

  // const form = useZodForm(BasicInfoSchema);
  const form = useZodForm();
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;
  console.log(errors, "errors....");

  // useEffect(() => {
  //   if (!data) return;
  //   Object.entries(data).forEach(([key, value]) => {
  //     if (value !== null && value !== undefined) {
  //       setValue(key as any, value);
  //     }
  //   });
  //   setOrchardId(data.id);
  // }, [data]);

  // const onSubmit = async (values: any) => {
  //   console.log(values, "values...");

  //   // router.push(ROUTES.ORCHARDS.REGISTRATION.CROP_INFO);

  //   try {
  //     // let res;

  //     // if (orchardId) {
  //     //   res = await update({ id: orchardId, ...values });
  //     //   showSuccessToast("Orchard updated");
  //     // }

  //     // else

  //     //   {
  //     // const res = await save(values);
  //     const res = await save({ orchardId: uuidv4(), ...values });
  //     // setOrchardId(res.id);
  //     showSuccessToast("Orchard created");
  //     // }

  //     // router.push(ROUTES.TABS.ORCHARDS);
  //     router.push(ROUTES.ORCHARDS.REGISTRATION.CROP_INFO);
  //   } catch (error: any) {
  //     showErrorToast(
  //       error?.response?.data?.message || "Failed to save orchard information"
  //     );
  //   }
  // };

  const onSubmit = async (values: any) => {
    console.log(values, "values...");

    try {
      const {
        orchardSize,
        orchardName,
        establishmentYear,
        plantationPattern,
        ownershipType,
        district,
        tehsil,
        pincode,
        latitude = 74.8946,
        longitude = 74.8946,
      } = values;

      let kanals = 0;
      let marlas = 0;

      console.log(orchardSize, ",,,,");

      /* ---------------- MANUAL MODE ---------------- */
      // if (orchardSize.mode === "manual") {
      if (orchardSize.unit === "kanal") {
        kanals = Number(orchardSize.value);
      }

      if (orchardSize.unit === "marla") {
        marlas = Number(orchardSize.value);
      }
      // }

      /* ---------------- MEASURE MODE ---------------- */
      if (orchardSize.mode === "measure") {
        // assuming measured value is always returned in marlas
        // adjust if your measurement screen returns kanals
        marlas = Number(orchardSize.value || 0);
      }

      const payload = {
        orchardId: uuidv4(),
        orchardName,
        kanals,
        marlas,
        establishmentYear,
        plantationPattern,
        ownershipType,
        district,
        tehsil,
        zone: values.zone ?? "",
        pinCode: pincode,
        latitude: latitude ? Number(latitude) : 0,
        longitude: longitude ? Number(longitude) : 0,
      };

      console.log("FINAL PAYLOAD →", payload);

      await save(payload);

      showSuccessToast("Orchard created");
      router.push(ROUTES.ORCHARDS.REGISTRATION.CROP_INFO);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || "Failed to save orchard information"
      );
    }
  };

  useEffect(() => {
    if (params?.orchardSize) {
      setValue("orchardSize", params.orchardSize);
    }
  }, [params?.orchardSize]);

  return (
    <ScreenLayout>
      <BackHeader
        title="Orchard Registration"
        desc="Enter the basic details required to register your orchard successfully."
      />

      <FormProvider {...form}>
        <BasicInfo
          errors={errors}
          control={control}
          // data={data}
          orchardSize={params.orchardSize}
          areaLabel={params.areaLabel}
          areaUnit={params.areaUnit}
        />

        <FormActions
          cancelLabel="Cancel"
          onCancel={() => router.back()}
          // submitLabel={orchardId ? "Update" : "Save"}
          submitLabel={"Save"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSaving || isUpdating}
          loading={isSaving || isUpdating}
        />
      </FormProvider>
    </ScreenLayout>
  );
}
