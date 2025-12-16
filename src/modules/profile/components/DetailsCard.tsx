import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/src/constants/colors";
import { PencilLine, Trash2, Plus } from "lucide-react-native";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";

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
      paddingVertical={1.4}
      marginVertical={1}
      borderRadius={24}
      backgroundColor="#fff"
      borderWidth={1}
      borderColor="#f0f0f0"
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
            fontSize: 20,
            fontWeight: "700",
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

      {/* Accent */}
      <View
        style={{
          height: 3,
          width: 70,
          backgroundColor: colors.primary,
          opacity: 0.25,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      {/* EMPTY STATE */}
      {isEmpty ? (
        <TouchableOpacity
          onPress={onAdd}
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 18,
            borderRadius: 16,
            backgroundColor: colors.primary + "10",
            borderWidth: 1,
            borderColor: colors.primary + "30",
          }}
        >
          <Plus size={18} color={colors.primary} />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 15,
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

                <View>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: colors.dark,
                    }}
                  >
                    {item.title}
                  </Text>

                  <Text style={{ color: colors.neutral, fontSize: 14 }}>
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
