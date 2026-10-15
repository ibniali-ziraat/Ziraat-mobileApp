import BackHeader from "@/src/components/shared/BackHeader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import {
  advisoryArt,
  getAdvisoryKindArt,
  getDashboardIcon,
  homeArt,
  statIcons,
} from "@/src/constants/iconArt";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowRight, Ban, CircleCheck, CloudOff } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import AdvisoryBanner from "../components/AdvisoryBanner";
import AdvisoryEmptyState from "../components/AdvisoryEmptyState";
import AdvisoryKindIcon from "../components/AdvisoryKindIcon";
import AdvisoryStatusBadge from "../components/AdvisoryStatusBadge";
import AdvisoryTimeline from "../components/AdvisoryTimeline";
import { isSupportedKind, KIND_META } from "../constants/advisoryOptions";
import {
  useAcknowledgeAdvisory,
  useAdvisoryById,
  useReadAdvisory,
} from "../hooks/usefarmadvisories";
import { advisoryRoutes } from "../routes/advisoryRoutes";
import { formatDateTime, getAdvisoryStatus } from "../utils/advisoryStatus";
import { getErrorMessage } from "../utils/getErrorMessage";

/** White panel with a faint outline, no shadow; matches Orders and Menu. */
const panel = {
  padding: cardTokens.padding,
  marginBottom: 14,
  borderRadius: cardTokens.radius,
  borderCurve: "continuous" as const,
  borderWidth: 1,
  borderColor: colors.cardBorder,
  backgroundColor: cardTokens.surface,
};

const InfoRow = ({
  label,
  value,
  art,
  tint,
}: {
  label: string;
  value?: string;
  art: string;
  tint: string;
}) =>
  value ? (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingVertical: 7 }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: tint,
        }}
      >
        <SvgXml xml={art} width={22} height={22} />
      </View>
      <Text
        style={[
          typography.Poppins_s_regular,
          { color: cardTokens.inkSecondary, marginLeft: 12, flex: 1 },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          typography.Poppins_s_semibold,
          {
            color: cardTokens.inkPrimary,
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

const SectionTitle = ({ children }: { children: string }) => (
  <Text
    style={[
      typography.Poppins_m_semibold,
      { color: cardTokens.inkPrimary, marginBottom: 12 },
    ]}
  >
    {children}
  </Text>
);

// Reached from the advisory list and from a tapped push notification
export default function AdvisoryDetailScreen() {
  const { recipientId } = useLocalSearchParams<{ recipientId: string }>();
  const {
    data: advisory,
    isLoading,
    isError,
    refetch,
  } = useAdvisoryById(recipientId);
  const { mutate: markRead } = useReadAdvisory();
  const {
    mutate: acknowledge,
    isPending: isAcknowledging,
    variables: ackVars,
  } = useAcknowledgeAdvisory();

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
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 48 }}
        />
      </ScreenLayout>
    );
  }

  if (isError || !advisory) {
    return (
      <ScreenLayout>
        <BackHeader title="Advisory" />
        <AdvisoryEmptyState
          icon={CloudOff}
          art={advisoryArt.offline}
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
          if (
            actionCompleted &&
            kind &&
            response?.openOperationForm !== false
          ) {
            openForm();
          } else {
            showSuccessToast("Advisory acknowledged");
          }
        },
        onError: (error) =>
          showErrorToast(
            getErrorMessage(error, "Couldn't acknowledge. Please try again."),
          ),
      },
    );
  };

  return (
    <ScreenLayout>
      <BackHeader title={advisory.title} desc={advisory.orchardName?.trim()} />

      <ScreenContent>
        <AdvisoryBanner
          orchardProfileId={advisory.orchardProfileId}
          title={`${kindLabel} advisory`}
          subtitle={
            [advisory.crop, advisory.variety].filter(Boolean).join(" • ") ||
            advisory.orchardName?.trim()
          }
          badges={[getAdvisoryKindArt(advisory.kind).art]}
          badgeSize={50}
        />

        {/* Summary */}
        <View style={panel}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AdvisoryKindIcon kind={advisory.kind} size={52} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                style={[
                  typography.Poppins_l_semibold,
                  { color: cardTokens.inkPrimary },
                ]}
                numberOfLines={1}
              >
                {kindLabel}
              </Text>
              <Text
                style={[
                  typography.Poppins_xs_regular,
                  { color: cardTokens.inkMuted },
                ]}
              >
                Advisory for your orchard
              </Text>
            </View>
            <AdvisoryStatusBadge status={status} />
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: colors.cardBorder,
              marginVertical: 12,
            }}
          />

          <InfoRow
            label="Crop"
            value={advisory.crop}
            art={statIcons.orchard}
            tint="#EAF5E4"
          />
          <InfoRow
            label="Variety"
            value={advisory.variety}
            art={getDashboardIcon("Leaf")}
            tint="#FFF8E1"
          />
          <InfoRow
            label="Growth stage"
            value={advisory.growthStage}
            art={getDashboardIcon("Wheat")}
            tint="#FCE8F0"
          />
        </View>

        {/* Window */}
        {advisory.windowStart || advisory.windowEnd ? (
          <View style={panel}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <SvgXml xml={statIcons.age} width={22} height={22} />
              <Text
                style={[
                  typography.Poppins_m_semibold,
                  { color: cardTokens.inkPrimary, marginLeft: 8 },
                ]}
              >
                Time window
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <WindowDate
                label="Starts"
                value={formatDateTime(advisory.windowStart)}
              />
              <ArrowRight
                size={18}
                color={cardTokens.inkMuted}
                style={{ marginHorizontal: 8 }}
              />
              <WindowDate
                label="Ends"
                value={formatDateTime(advisory.windowEnd)}
                overdue={status === "overdue"}
              />
            </View>
          </View>
        ) : null}

        {/* Recommendation */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            padding: 16,
            marginBottom: 14,
            borderRadius: cardTokens.radius,
            borderCurve: "continuous",
            backgroundColor: chartTokens.tint,
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: cardTokens.surface,
            }}
          >
            <SvgXml xml={homeArt.tips} width={28} height={28} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              style={[typography.Poppins_s_semibold, { color: colors.primary }]}
            >
              Expert recommendation
            </Text>
            <Text
              style={[
                typography.Poppins_s_regular,
                { color: cardTokens.inkPrimary, marginTop: 4, lineHeight: 22 },
              ]}
            >
              {advisory.recommendation || "No recommendation text was added."}
            </Text>
          </View>
        </View>

        {/* Progress */}
        <View style={panel}>
          <SectionTitle>Progress</SectionTitle>
          <AdvisoryTimeline
            readOn={advisory.readOn}
            acknowledgedOn={advisory.acknowledgedOn}
            completedOn={advisory.completedOn}
          />
        </View>

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
              style={{ borderRadius: 14 }}
              contentStyle={{ paddingVertical: 6 }}
              labelStyle={typography.Poppins_s_semibold}
              loading={isAcknowledging && ackVars?.actionCompleted === true}
              disabled={isAcknowledging}
              onPress={() => handleAcknowledge(true)}
            >
              {kind
                ? `Done – add ${kindLabel.toLowerCase()} details`
                : "Mark as done"}
            </Button>
            <Button
              mode="contained"
              buttonColor={chartTokens.tint}
              textColor={colors.primary}
              style={{ borderRadius: 14 }}
              contentStyle={{ paddingVertical: 6 }}
              labelStyle={typography.Poppins_s_semibold}
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
              style={{ borderRadius: 14 }}
              contentStyle={{ paddingVertical: 6 }}
              labelStyle={typography.Poppins_s_semibold}
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

function WindowDate({
  label,
  value,
  overdue,
}: {
  label: string;
  value?: string;
  overdue?: boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        padding: 12,
        borderRadius: 14,
        backgroundColor: overdue ? "#FDECEC" : cardTokens.mutedSurface,
      }}
    >
      <Text
        style={[typography.Poppins_xs_regular, { color: cardTokens.inkMuted }]}
      >
        {label}
      </Text>
      <Text
        style={[
          typography.Poppins_s_semibold,
          { color: overdue ? "#C0392B" : cardTokens.inkPrimary, marginTop: 2 },
        ]}
      >
        {value || "—"}
      </Text>
    </View>
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
        <Text
          style={[
            typography.Poppins_s_semibold,
            { color: cardTokens.inkPrimary },
          ]}
        >
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
