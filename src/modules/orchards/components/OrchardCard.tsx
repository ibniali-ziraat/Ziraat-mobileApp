import { cardShadow, cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { ChevronRight, MapPin, Trees } from "lucide-react-native";
import { Text, View } from "react-native";
import { Pressable } from "@/src/components/shared/Pressable";

interface OrchardCardProps {
  orchard: any;
}

const THUMB = 78;
function getOrchardSize(orchard: any): string | null {
  if (orchard?.kanals > 0) return `${orchard.kanals} kanals`;
  if (orchard?.marlas > 0) return `${orchard.marlas} marlas`;
  return null;
}

function Chip({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <View
      style={{
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: cardTokens.mutedSurface,
      }}
    >
      <Text
        numberOfLines={1}
        style={[
          typography.Poppins_xs_medium,
          {
            color: accent ? chartTokens.current : cardTokens.inkSecondary,
            fontSize: 10.5,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

/**
 * Compact white tile: thumbnail, name, place and the two facts worth scanning.
 * Everything else lives on the details screen — this list is for finding an
 * orchard, not for reading it.
 */
export default function OrchardCard({ orchard }: OrchardCardProps) {
  const openDetails = () => {
    router.push({
      pathname: ROUTES.ORCHARDS.DETAILS.ORCHARD_DETAILS,
      params: { id: orchard.id },
    });
  };

  const location =
    orchard?.villageName ??
    orchard?.village ??
    orchard?.tehsil ??
    orchard?.district ??
    orchard?.location;

  const size = getOrchardSize(orchard);
  const ownership = orchard?.ownershipType;

  return (
    <Pressable
      onPress={openDetails}
      accessibilityRole="button"
      accessibilityLabel={`View ${orchard?.orchardName ?? "orchard"} details`}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          padding: 12,
          marginBottom: 12,
          borderRadius: cardTokens.radius,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: cardTokens.border,
          backgroundColor: cardTokens.surface,
          opacity: pressed ? 0.94 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
        cardShadow,
      ]}
    >
      <View
        style={{
          width: THUMB,
          height: THUMB,
          borderRadius: 16,
          borderCurve: "continuous",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: cardTokens.mutedSurface,
        }}
      >
        <Trees size={30} color={chartTokens.current} strokeWidth={1.6} />
      </View>

      <View style={{ flex: 1, marginLeft: 14, marginRight: 6 }}>
        <Text
          numberOfLines={1}
          style={[
            typography.Poppins_s_semibold,
            { color: cardTokens.inkPrimary, fontSize: 15 },
          ]}
        >
          {orchard?.orchardName || "Unnamed Orchard"}
        </Text>

        {location ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <MapPin size={12} color={cardTokens.inkMuted} />
            <Text
              numberOfLines={1}
              style={[
                typography.Poppins_xs_regular,
                {
                  color: cardTokens.inkMuted,
                  fontSize: 11.5,
                  marginLeft: 4,
                  flex: 1,
                },
              ]}
            >
              {location}
            </Text>
          </View>
        ) : null}

        {size || ownership ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 8,
            }}
          >
            {size ? <Chip label={size} accent /> : null}
            {ownership ? <Chip label={ownership} /> : null}
          </View>
        ) : null}
      </View>

      <ChevronRight size={18} color={cardTokens.inkMuted} />
    </Pressable>
  );
}
