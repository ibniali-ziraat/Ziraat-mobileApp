import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { PencilLine, Plus, Trash2 } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface DetailItem {
  title: string;
  value?: string | number | null;
  icon: React.ReactNode;
}

interface DetailsCardProps {
  heading: string;
  items?: DetailItem[]; // 👈 optional
  onEdit?: () => void;
  onDelete?: () => void;

  /** Empty state */
  onAdd?: () => void;
  emptyActionLabel?: string;
}

export default function DetailsCard({
  heading,
  items = [],
  onEdit,
  onDelete,
  onAdd,
  emptyActionLabel = "Add Details",
}: DetailsCardProps) {
  const isEmpty = items.length === 0;

  return (
    <ZiraatCard
      width="100%"
      paddingHorizontal={1}
      paddingVertical={1}
      marginVertical={0.5}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            color: colors.dark,
          }}
        >
          {heading}
        </Text>

        {!isEmpty && (
          <View style={{ flexDirection: "row", gap: 10 }}>
            {onEdit && (
              <TouchableOpacity onPress={onEdit}>
                <PencilLine size={18} color={colors.primary} />
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity onPress={onDelete}>
                <Trash2 size={18} color="#E53935" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* EMPTY STATE */}
      {isEmpty ? (
        <TouchableOpacity
          onPress={onAdd}
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Plus size={14} color={colors.primary} />
          <Text
            style={{
              marginLeft: 4,
              fontSize: 14,
              fontWeight: "600",
              color: colors.primary,
            }}
          >
            {emptyActionLabel}
          </Text>
        </TouchableOpacity>
      ) : (
        /* ROWS */
        <View style={{ gap: 22 }}>
          {items.map((item, index) => (
            <View key={item.title}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    backgroundColor: colors.primary + "18",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 14,
                  }}
                >
                  {item.icon}
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: colors.dark,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: colors.neutral,
                      fontSize: 14,
                      flexWrap: "wrap", // ← allow line wrap
                    }}
                  >
                    {item.value || "—"}
                  </Text>
                </View>
              </View>

              {index < items.length - 1 && (
                <View
                  style={{
                    marginLeft: 62,
                    marginTop: 6,
                    height: 1,
                    backgroundColor: colors.neutral + "30",
                  }}
                />
              )}
            </View>
          ))}
        </View>
      )}
    </ZiraatCard>
  );
}
