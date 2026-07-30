import CustomBarChart from "@/src/components/charts/CustomBarChart";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import StatChip from "@/src/modules/dashboard/components/StatChip";
import { orchardRoutes } from "@/src/modules/orchards/routes/orchardRoutes";
import { router } from "expo-router";
import {
  CheckCircle2,
  ChevronRight,
  CirclePlus,
  PartyPopper,
  Percent,
  TriangleAlert,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useActiveOrchardCompleteness } from "../hooks/useActiveOrchardCompleteness";

export default function OrchardCompletionCard() {
  const { setOrchardProfileId } = useAuth();
  const { targetOrchard, completed, total, percent, missingSections } =
    useActiveOrchardCompleteness();

  const goToSection = (routeKey: keyof typeof orchardRoutes) => {
    if (targetOrchard?.id) setOrchardProfileId(Number(targetOrchard.id));
    router.push(orchardRoutes[routeKey]);
  };

  const addOrchard = () => {
    router.push({
      pathname: ROUTES.ORCHARDS.REGISTRATION.BASIC_INFO,
      params: { mode: "create" },
    });
  };

  if (!targetOrchard) {
    return (
      <Pressable
        onPress={addOrchard}
        style={{
          marginTop: 8,
          marginBottom: 20,
          borderRadius: 22,
          borderCurve: "continuous",
          backgroundColor: colors.light,
          borderWidth: 1,
          borderColor: colors.primary + "28",
          padding: 18,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 44,
            width: 44,
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.primary,
          }}
        >
          <CirclePlus size={22} color={colors.light} />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[typography.Poppins_s_semibold, { color: colors.dark }]}>
            Start your first orchard
          </Text>
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: colors.darkHover, marginTop: 2 },
            ]}
          >
            Track its profile completeness right here
          </Text>
        </View>
        <ChevronRight size={18} color={colors.darkHover} />
      </Pressable>
    );
  }

  return (
    <View
      style={{
        marginTop: 8,
        marginBottom: 20,
        borderRadius: 22,
        borderCurve: "continuous",
        backgroundColor: colors.light,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        padding: 18,
      }}
    >
      <Text style={[typography.Poppins_s_semibold, { color: colors.dark }]}>
        Orchard Profile
      </Text>
      <Text
        numberOfLines={1}
        style={[
          typography.Poppins_xs_regular,
          { color: colors.darkHover, marginTop: 2, marginBottom: 4 },
        ]}
      >
        {targetOrchard.orchardName || "Your orchard"}
      </Text>

      <View
        className="pt-2 flex-row flex-wrap justify-between"
        style={{ backgroundColor: colors.light }}
      >
        <StatChip Icon={CheckCircle2} title="Sections Done" value={completed} />
        <StatChip
          Icon={TriangleAlert}
          title="Pending"
          value={missingSections.length}
        />
        <StatChip Icon={Percent} title="Complete" value={`${percent}%`} />
      </View>

      <CustomBarChart
        type="pie"
        labels={["Completed", "Pending"]}
        values={[completed, missingSections.length]}
        height={180}
      />

      {missingSections.length === 0 ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.primary + "0D",
            borderRadius: 14,
            padding: 12,
          }}
        >
          <PartyPopper size={18} color={colors.primary} />
          <Text
            style={[
              typography.Poppins_s_medium,
              { color: colors.primary, marginLeft: 8 },
            ]}
          >
            Orchard profile complete!
          </Text>
        </View>
      ) : (
        <>
          <Text
            style={[
              typography.Poppins_xs_medium,
              { color: colors.darkHover, marginBottom: 8 },
            ]}
          >
            Still to complete
          </Text>
          {missingSections.map((section) => {
            const Icon = section.icon;
            return (
              <Pressable
                key={section.key}
                onPress={() => goToSection(section.routeKey)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{
                    height: 32,
                    width: 32,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.secondary + "14",
                  }}
                >
                  <Icon size={16} color={colors.secondary} />
                </View>
                <Text
                  style={[
                    typography.Poppins_s_regular,
                    { color: colors.dark, marginLeft: 10, flex: 1 },
                  ]}
                >
                  {section.label}
                </Text>
                <ChevronRight size={16} color={colors.darkHover} />
              </Pressable>
            );
          })}
        </>
      )}
    </View>
  );
}
