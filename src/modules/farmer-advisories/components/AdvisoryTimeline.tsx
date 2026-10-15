import { colors } from "@/src/constants/colors";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { Check } from "lucide-react-native";
import { Text, View } from "react-native";
import { formatDateTime } from "../utils/advisoryStatus";

type AdvisoryTimelineProps = {
  receivedOn?: string;
  readOn: string | null;
  acknowledgedOn: string | null;
  completedOn: string | null;
};

// Received → Read → Acknowledged → Completed
export default function AdvisoryTimeline({
  receivedOn,
  readOn,
  acknowledgedOn,
  completedOn,
}: AdvisoryTimelineProps) {
  const steps = [
    { label: "Received", date: receivedOn ?? null, done: true },
    { label: "Read", date: readOn, done: !!readOn },
    { label: "Acknowledged", date: acknowledgedOn, done: !!acknowledgedOn },
    { label: "Completed", date: completedOn, done: !!completedOn },
  ];

  return (
    <View>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const nextDone = steps[index + 1]?.done;

        return (
          <View key={step.label} style={{ flexDirection: "row" }}>
            <View style={{ alignItems: "center", width: 22 }}>
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: step.done ? colors.primary : chartTokens.track,
                }}
              >
                {step.done && <Check size={13} color={colors.light} strokeWidth={3} />}
              </View>
              {!isLast && (
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 18,
                    backgroundColor: nextDone ? colors.primary : chartTokens.track,
                  }}
                />
              )}
            </View>

            <View style={{ marginLeft: 12, paddingBottom: isLast ? 0 : 14 }}>
              <Text
                style={[
                  typography.Poppins_s_medium,
                  {
                    color: step.done ? cardTokens.inkPrimary : cardTokens.inkMuted,
                    lineHeight: 22,
                  },
                ]}
              >
                {step.label}
              </Text>
              {!!step.date && (
                <Text
                  style={[
                    typography.Poppins_xs_regular,
                    { color: cardTokens.inkMuted, fontSize: 11 },
                  ]}
                >
                  {formatDateTime(step.date)}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}
