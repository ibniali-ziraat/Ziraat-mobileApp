import { colors } from "@/src/constants/colors";
import { cardShadow } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { timeAgo } from "@/src/modules/notifications/utils/timeAge";
import { Sprout, TreePalm } from "lucide-react-native";
import { useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import {
  getOrchardCreatedDate,
  type OrchardDateSource,
} from "../utils/orchardDates";

type OrchardHistorySource = OrchardDateSource & {
  orchardName?: string;
  ownershipType?: string;
  kanals?: number;
  marlas?: number;
};

type OrchardEvent = {
  id: string;
  title: string;
  subtitle: string;
  timestamp: number;
};

const getOrchardSize = (orchard: OrchardHistorySource): string => {
  const parts = [
    orchard.kanals ? `${orchard.kanals} kanals` : null,
    orchard.marlas ? `${orchard.marlas} marlas` : null,
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : orchard.ownershipType || "Registered";
};

type OrchardHistoryListProps = {
  orchards: OrchardHistorySource[];
};

export default function OrchardHistoryList({
  orchards,
}: OrchardHistoryListProps) {
  const events = useMemo<OrchardEvent[]>(
    () =>
      orchards
        .map((orchard) => {
          const date = getOrchardCreatedDate(orchard);
          if (!date) return null;
          return {
            id: String(orchard.id),
            title: `New orchard added — ${orchard.orchardName || "Unnamed Orchard"}`,
            subtitle: getOrchardSize(orchard),
            timestamp: date.getTime(),
          };
        })
        .filter((event): event is OrchardEvent => event !== null)
        .sort((a, b) => b.timestamp - a.timestamp),
    [orchards],
  );

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 16,
        flexGrow: 1,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      ListHeaderComponent={
        events.length > 0 ? (
          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: colors.darkHover, marginBottom: 14 },
            ]}
          >
            More activity (sprays, harvests) will appear here once available.
          </Text>
        ) : null
      }
      ListEmptyComponent={
        <View className="items-center flex-1 justify-center px-6 py-16">
          <Sprout size={34} color={colors.primary} />
          <Text
            style={[
              typography.Poppins_m_semibold,
              { color: colors.dark, marginTop: 12 },
            ]}
          >
            No activity yet
          </Text>
          <Text
            style={[
              typography.Poppins_s_regular,
              {
                color: colors.darkHover,
                marginTop: 4,
                textAlign: "center",
              },
            ]}
          >
            History will appear here as you add and manage your orchards.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.light,
            borderRadius: 18,
            padding: 14,
            ...cardShadow,
          }}
        >
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.primary + "12",
            }}
          >
            <TreePalm size={18} color={colors.primary} />
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              numberOfLines={2}
              style={[typography.Poppins_s_semibold, { color: colors.dark }]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                typography.Poppins_xs_regular,
                { color: colors.darkHover, marginTop: 2 },
              ]}
            >
              {item.subtitle}
            </Text>
          </View>

          <Text
            style={[
              typography.Poppins_xs_medium,
              { color: colors.darkHover, marginLeft: 8 },
            ]}
          >
            {timeAgo(item.timestamp)}
          </Text>
        </View>
      )}
    />
  );
}
