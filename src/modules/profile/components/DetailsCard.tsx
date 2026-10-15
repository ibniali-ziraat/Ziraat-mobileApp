import { Pressable } from "@/src/components/shared/Pressable";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { Plus } from "lucide-react-native";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

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
  /** Full-colour icon from `profileArt`, shown beside the heading. */
  art?: string;
}

function TextAction({
  label,
  onPress,
  destructive = false,
}: {
  label: string;
  onPress: () => void;
  destructive?: boolean;
}) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={{ paddingVertical: 4 }}>
      <Text
        style={[
          typography.Poppins_xs_semibold,
          {
            color: destructive ? chartTokens.negative : cardTokens.inkPrimary,
            textDecorationLine: "underline",
          },
        ]}
      >
        {label}
      </Text>
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
  art,
}: DetailsCardProps) {
  const isEmpty = items.length === 0;

  return (
    <View style={{ marginBottom: 28 }}>
      <View
        style={{
          minHeight: 36,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        {art ? (
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              marginRight: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: cardTokens.mutedSurface,
            }}
          >
            <SvgXml xml={art} width={26} height={26} />
          </View>
        ) : null}
        <Text
          style={[
            typography.Poppins_l_semibold,
            { flex: 1, color: cardTokens.inkPrimary },
          ]}
        >
          {heading}
        </Text>

        {!isEmpty && onEdit ? (
          <TextAction label="Edit" onPress={onEdit} />
        ) : null}
        {!isEmpty && onDelete ? (
          <View style={{ marginLeft: 18 }}>
            <TextAction label="Delete" onPress={onDelete} destructive />
          </View>
        ) : null}
      </View>

      {isEmpty ? (
        <Pressable
          onPress={onAdd}
          disabled={!onAdd}
          style={{
            minHeight: 58,
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: cardTokens.hairline,
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
              backgroundColor: cardTokens.mutedSurface,
            }}
          >
            <Plus size={17} color={chartTokens.current} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                typography.Poppins_s_semibold,
                { color: cardTokens.inkPrimary },
              ]}
            >
              {emptyActionLabel}
            </Text>
            <Text
              style={[
                typography.Poppins_xs_regular,
                { color: cardTokens.inkMuted, marginTop: 1 },
              ]}
            >
              Add information to complete your profile
            </Text>
          </View>
        </Pressable>
      ) : (
        <View>
          {items.map((item, index) => (
            <View
              key={item.title}
              style={{
                minHeight: 68,
                justifyContent: "center",
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: cardTokens.hairline,
              }}
            >
              <Text
                style={[
                  typography.Poppins_xs_regular,
                  { color: cardTokens.inkMuted },
                ]}
              >
                {item.title}
              </Text>
              <Text
                numberOfLines={2}
                style={[
                  typography.Poppins_m_medium,
                  {
                    color: cardTokens.inkPrimary,
                    lineHeight: 25,
                    marginTop: 2,
                    paddingBottom: index === items.length - 1 ? 0 : 1,
                  },
                ]}
              >
                {item.value || "Not provided"}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
