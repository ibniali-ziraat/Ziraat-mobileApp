import BackHeader from "@/src/components/shared/BackHeader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router, useLocalSearchParams } from "expo-router";
import { Ban, CircleCheck, CloudOff } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Button } from "react-native-paper";
import AdvisoryEmptyState from "../components/AdvisoryEmptyState";
import AdvisoryKindIcon from "../components/AdvisoryKindIcon";
import AdvisorySection from "../components/AdvisorySection";
import AdvisoryStatusBadge from "../components/AdvisoryStatusBadge";
import AdvisoryTimeline from "../components/AdvisoryTimeline";
import { isSupportedKind, KIND_META } from "../constants/advisoryOptions";
import {
  useAcknowledgeAdvisory,
  useAdvisoryById,
  useReadAdvisory,
} from "../hooks/usefarmadvisories";
import { advisoryRoutes } from "../routes/advisoryRoutes";
import {
  formatDateTime,
  getAdvisoryStatus,
} from "../utils/advisoryStatus";
import { getErrorMessage } from "../utils/getErrorMessage";

const InfoRow = ({ label, value, valueColor }: { label: string; value?: string; valueColor?: string }) =>
  value ? (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 7,
      }}
    >
      <Text style={[typography.Poppins_s_regular, { color: cardTokens.inkMuted }]}>
        {label}
      </Text>
      <Text
        style={[
          typography.Poppins_s_medium,
          {
            color: valueColor ?? cardTokens.inkPrimary,
            flexShrink: 1,
            textAlign: "right",
            marginLeft: 12,
            textTransform: "capitalize",
          },
        ]}
      >
        {value}
      </Text>
    </View>
  ) : null;

// Reached from the advisory list and from a tapped push notification
export default function AdvisoryDetailScreen() {
  const { recipientId } = useLocalSearchParams<{ recipientId: string }>();
  const { data: advisory, isLoading, isError, refetch } = useAdvisoryById(recipientId);
  const { mutate: markRead } = useReadAdvisory();
  const { mutate: acknowledge, isPending: isAcknowledging, variables: ackVars } =
    useAcknowledgeAdvisory();

  // opening the advisory counts as reading it, once
  const readRequested = useRef(false);
  useEffect(() => {
    if (!advisory || advisory.readOn || readRequested.current) return;
    if (advisory.status === "cancelled") return;
    readRequested.current = true;
    markRead(advisory.recipientId);
  }, [advisory, markRead]);

  if (isLoading) {
    return (
      <ScreenLayout>
        <BackHeader title="Advisory" />
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 48 }} />
      </ScreenLayout>
    );
  }

  if (isError || !advisory) {
    return (
      <ScreenLayout>
        <BackHeader title="Advisory" />
        <AdvisoryEmptyState
          icon={CloudOff}
          title="Couldn't load this advisory"
          message="Check your connection and try again."
          actionLabel="Try again"
          onAction={() => refetch()}
        />
      </ScreenLayout>
    );
  }

  const status = getAdvisoryStatus(advisory);
  const kind = isSupportedKind(advisory.kind) ? advisory.kind : null;
  const kindLabel = kind ? KIND_META[kind].label : advisory.kind;

  const openForm = () => {
    if (kind) router.push(advisoryRoutes.operation(advisory.recipientId, kind));
  };

  const handleAcknowledge = (actionCompleted: boolean) => {
    acknowledge(
      { recipientId: advisory.recipientId, actionCompleted },
      {
        onSuccess: (response) => {
          if (actionCompleted && kind && response?.openOperationForm !== false) {
            openForm();
          } else {
            showSuccessToast("Advisory acknowledged");
          }
        },
        onError: (error) =>
          showErrorToast(getErrorMessage(error, "Couldn't acknowledge. Please try again.")),
      },
    );
  };

  return (
    <ScreenLayout>
      <BackHeader title={advisory.title} desc={advisory.orchardName?.trim()} />

      <ScreenContent>
        {/* Summary */}
        <AdvisorySection title={kindLabel}>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: -6, marginBottom: 8 }}>
            <AdvisoryKindIcon kind={advisory.kind} size={40} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                style={[typography.Poppins_xs_regular, { color: cardTokens.inkMuted }]}
              >
                Status
              </Text>
              <View style={{ flexDirection: "row", marginTop: 2 }}>
                <AdvisoryStatusBadge status={status} />
              </View>
            </View>
          </View>

          <InfoRow label="Crop" value={advisory.crop} />
          <InfoRow label="Variety" value={advisory.variety} />
          <InfoRow label="Growth stage" value={advisory.growthStage} />
          <InfoRow label="Starts" value={formatDateTime(advisory.windowStart)} />
          <InfoRow
            label="Ends"
            value={formatDateTime(advisory.windowEnd)}
            valueColor={status === "overdue" ? "#C0392B" : undefined}
          />
        </AdvisorySection>

        {/* Recommendation */}
        <View
          style={{
            padding: 16,
            marginBottom: 16,
            borderRadius: cardTokens.radius,
            borderCurve: "continuous",
            backgroundColor: chartTokens.tint,
            borderLeftWidth: 4,
            borderLeftColor: colors.primary,
          }}
        >
          <Text style={[typography.Poppins_xs_semibold, { color: colors.primary, marginBottom: 6 }]}>
            RECOMMENDATION
          </Text>
          <Text
            style={[
              typography.Poppins_s_regular,
              { color: cardTokens.inkPrimary, lineHeight: 22 },
            ]}
          >
            {advisory.recommendation || "No recommendation text was added."}
          </Text>
        </View>

        {/* Progress */}
        <AdvisorySection title="Progress">
          <AdvisoryTimeline
            readOn={advisory.readOn}
            acknowledgedOn={advisory.acknowledgedOn}
            completedOn={advisory.completedOn}
          />
        </AdvisorySection>

        {/* Actions */}
        {status === "cancelled" ? (
          <StatusNote
            icon={<Ban size={20} color={cardTokens.inkMuted} />}
            title="This advisory was cancelled"
            message={advisory.cancellationReason ?? undefined}
          />
        ) : advisory.completedOn ? (
          <StatusNote
            icon={<CircleCheck size={20} color={colors.primary} />}
            title="Completed"
            message={`Details recorded on ${formatDateTime(advisory.completedOn)}`}
          />
        ) : !advisory.acknowledgedOn ? (
          <View style={{ gap: 10, marginBottom: 24 }}>
            <Button
              mode="contained"
              buttonColor={colors.primary}
              textColor={colors.light}
              style={{ borderRadius: 12 }}
              contentStyle={{ paddingVertical: 4 }}
              loading={isAcknowledging && ackVars?.actionCompleted === true}
              disabled={isAcknowledging}
              onPress={() => handleAcknowledge(true)}
            >
              {kind ? `Done – add ${kindLabel.toLowerCase()} details` : "Mark as done"}
            </Button>
            <Button
              mode="outlined"
              textColor={colors.dark}
              style={{ borderRadius: 12, borderColor: colors.darkHover }}
              contentStyle={{ paddingVertical: 4 }}
              loading={isAcknowledging && ackVars?.actionCompleted === false}
              disabled={isAcknowledging}
              onPress={() => handleAcknowledge(false)}
            >
              {"Acknowledge – I'll do it later"}
            </Button>
          </View>
        ) : kind ? (
          <View style={{ marginBottom: 24 }}>
            <Button
              mode="contained"
              buttonColor={colors.primary}
              textColor={colors.light}
              style={{ borderRadius: 12 }}
              contentStyle={{ paddingVertical: 4 }}
              onPress={openForm}
            >
              {`Add ${kindLabel.toLowerCase()} details`}
            </Button>
          </View>
        ) : null}
      </ScreenContent>
    </ScreenLayout>
  );
}

function StatusNote({
  icon,
  title,
  message,
}: {
  icon: React.ReactNode;
  title: string;
  message?: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 14,
        marginBottom: 24,
        borderRadius: 16,
        backgroundColor: cardTokens.mutedSurface,
      }}
    >
      {icon}
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={[typography.Poppins_s_semibold, { color: cardTokens.inkPrimary }]}>
          {title}
        </Text>
        {!!message && (
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkSecondary, marginTop: 2 },
            ]}
          >
            {message}
          </Text>
        )}
      </View>
    </View>
  );
}
