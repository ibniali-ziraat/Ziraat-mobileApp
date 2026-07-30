import {
  cardShadow,
  cardTokens,
  chartTokens,
} from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { PencilLine, Plus, Trash2 } from "lucide-react-native";
import { Text, View } from "react-native";
import { Pressable } from "@/src/components/shared/Pressable";

interface DetailItem {
  title: string;
  value?: string | number | null;
  icon: React.ReactNode;
}

interface DetailsCardProps {
  heading: string;
  items?: DetailItem[];
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  emptyActionLabel?: string;
}

function IconAction({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => ({
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: cardTokens.mutedSurface,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      {children}
    </Pressable>
  );
}

export default function DetailsCard({
  heading,
  items = [],
  onEdit,
  onDelete,
  onAdd,
  emptyActionLabel = "Add details",
}: DetailsCardProps) {
  const isEmpty = items.length === 0;

  return (
    <View
      style={[
        {
          backgroundColor: cardTokens.surface,
          borderRadius: cardTokens.radius,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: cardTokens.border,
          padding: 16,
          marginBottom: 14,
        },
        cardShadow,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: isEmpty ? 14 : 6,
        }}
      >
        <Text
          style={[
            typography.Poppins_s_semibold,
            { color: cardTokens.inkPrimary, fontSize: 15 },
          ]}
        >
          {heading}
        </Text>

        {!isEmpty ? (
          <View style={{ flexDirection: "row", gap: 8 }}>
            {onEdit ? (
              <IconAction onPress={onEdit}>
                <PencilLine size={15} color={cardTokens.inkSecondary} />
              </IconAction>
            ) : null}

            {onDelete ? (
              <IconAction onPress={onDelete}>
                <Trash2 size={15} color={chartTokens.negative} />
              </IconAction>
            ) : null}
          </View>
        ) : null}
      </View>

      {isEmpty ? (
        <Pressable
          onPress={onAdd}
          style={({ pressed }) => ({
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 20,
            borderRadius: 16,
            borderCurve: "continuous",
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: cardTokens.border,
            backgroundColor: cardTokens.mutedSurface,
            opacity: pressed ? 0.75 : 1,
          })}
        >
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: cardTokens.surface,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 9,
            }}
          >
            <Plus size={18} color={chartTokens.current} />
          </View>

          <Text
            style={[
              typography.Poppins_xs_semibold,
              { color: chartTokens.current, fontSize: 13 },
            ]}
          >
            {emptyActionLabel}
          </Text>

          <Text
            style={[
              typography.Poppins_xs_regular,
              { color: cardTokens.inkMuted, fontSize: 10.5, marginTop: 3 },
            ]}
          >
            Tap to add this information
          </Text>
        </Pressable>
      ) : (
        <View>
          {items.map((item, index) => (
            <View
              key={item.title}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: index < items.length - 1 ? 1 : 0,
                borderBottomColor: cardTokens.border,
              }}
            >
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 12,
                  borderCurve: "continuous",
                  backgroundColor: cardTokens.mutedSurface,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                {item.icon}
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    typography.Poppins_xs_regular,
                    { color: cardTokens.inkMuted, fontSize: 11 },
                  ]}
                >
                  {item.title}
                </Text>

                <Text
                  style={[
                    typography.Poppins_s_medium,
                    { color: cardTokens.inkPrimary, fontSize: 14, marginTop: 1 },
                  ]}
                >
                  {item.value || "—"}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
