import BackHeader from "@/src/components/shared/BackHeader";
import FormActions from "@/src/components/shared/FormActions";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { useZodForm } from "@/src/hooks/useZodForm";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { CircleAlert } from "lucide-react-native";
import { FormProvider } from "react-hook-form";
import { Text, View } from "react-native";
import AdvisoryEmptyState from "../components/AdvisoryEmptyState";
import {
  LabourAndCostFields,
  OperationBasicsFields,
} from "../components/forms/CommonOperationFields";
import KindFields from "../components/forms/KindFields";
import { isSupportedKind, KIND_META } from "../constants/advisoryOptions";
import {
  advisoryKeys,
  useAddFertigation,
  useAddHarvest,
  useAddPruning,
  useAddSpray,
  useAdvisoryById,
} from "../hooks/usefarmadvisories";
import {
  buildOperationPayload,
  getDefaultValues,
  operationSchemas,
  type OperationFormValues,
} from "../schemas/operation.schemas";
import {
  getAdvisoryById,
  type AdvisoryKind,
} from "../services/farmeradvisories.service";
import { formatWindow } from "../utils/advisoryStatus";
import {
  getErrorMessage,
  getServerFieldErrors,
} from "../utils/getErrorMessage";

export default function AdvisoryOperationScreen() {
  const { recipientId, kind } = useLocalSearchParams<{
    recipientId: string;
    kind: string;
  }>();

  if (!recipientId || !isSupportedKind(kind)) {
    return (
      <ScreenLayout>
        <BackHeader title="Advisory" />
        <AdvisoryEmptyState
          icon={CircleAlert}
          title="This form isn't available"
          message="Open the advisory again and try once more."
          actionLabel="Go back"
          onAction={() => router.back()}
        />
      </ScreenLayout>
    );
  }

  return <OperationForm recipientId={recipientId} kind={kind} />;
}

function OperationForm({ recipientId, kind }: { recipientId: string; kind: AdvisoryKind }) {
  const queryClient = useQueryClient();
  const { data: advisory } = useAdvisoryById(recipientId);

  const form = useZodForm(operationSchemas[kind], {
    defaultValues: getDefaultValues(kind),
  });

  const mutations = {
    spray: useAddSpray(),
    fertigation: useAddFertigation(),
    pruning: useAddPruning(),
    harvest: useAddHarvest(),
  };
  const { mutateAsync, isPending } = mutations[kind];

  const onSubmit = async (values: OperationFormValues) => {
    try {
      // the version changes after read/acknowledge, so always send the newest one
      const latest = await queryClient.fetchQuery({
        queryKey: advisoryKeys.detail(recipientId),
        queryFn: () => getAdvisoryById(recipientId),
        staleTime: 0,
      });

      if (latest.completedOn) {
        showSuccessToast("These details were already saved");
        router.back();
        return;
      }

      const payload = buildOperationPayload(kind, values, latest.version);
      await mutateAsync({ recipientId, payload } as any);

      showSuccessToast(`${KIND_META[kind].label} details saved`);
      router.back();
    } catch (error) {
      // put any field-level rejections from the api back on their inputs
      getServerFieldErrors(error).forEach(({ path, message }) =>
        form.setError(path, { type: "server", message }),
      );
      showErrorToast(getErrorMessage(error, "Couldn't save. Please try again."));
    }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title={KIND_META[kind].formTitle}
        desc={
          advisory
            ? [advisory.title, formatWindow(advisory.windowStart, advisory.windowEnd)]
                .filter(Boolean)
                .join(" • ")
            : undefined
        }
      />

      <ScreenContent>
        {!!advisory?.recommendation && (
          <View
            style={{
              padding: 14,
              marginBottom: 16,
              borderRadius: 16,
              backgroundColor: chartTokens.tint,
            }}
          >
            <Text
              style={[typography.Poppins_xs_semibold, { color: colors.primary, marginBottom: 4 }]}
            >
              ADVISORY
            </Text>
            <Text
              numberOfLines={3}
              style={[typography.Poppins_s_regular, { color: cardTokens.inkPrimary }]}
            >
              {advisory.recommendation}
            </Text>
          </View>
        )}

        <FormProvider {...form}>
          <OperationBasicsFields />
          <KindFields kind={kind} />
          <LabourAndCostFields />

          <View style={{ marginBottom: 24 }}>
            <FormActions
              cancelLabel="Cancel"
              submitLabel="Save details"
              onCancel={() => router.back()}
              onSubmit={form.handleSubmit(onSubmit)}
              loading={isPending || form.formState.isSubmitting}
            />
          </View>
        </FormProvider>
      </ScreenContent>
    </ScreenLayout>
  );
}
