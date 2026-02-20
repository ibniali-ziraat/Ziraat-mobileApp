import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { shadows } from "@/src/constants/shadows";
import { PencilLine, Plus, Trash2 } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

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
    <View
      style={[{
        backgroundColor: colors.light,
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,

        
        // shadowColor: colors.dark,
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.08,
        // shadowRadius: 1,
        // elevation: 3,
        // borderWidth: 1,
        // borderColor: colors.light,
      },shadows.profile_card]}
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
        <CsText
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: colors.dark,
          }}
        >
          {heading}
        </CsText>

        {!isEmpty && (
          <View style={{ flexDirection: "row", gap: 12 }}>
            {onEdit && (
              <TouchableOpacity onPress={onEdit}>
                <PencilLine size={18} color={colors.primary} />
              </TouchableOpacity>
            )}

            {onDelete && (
              <TouchableOpacity onPress={onDelete}>
                <Trash2 size={18} color={colors.secondary} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {isEmpty ? (
  <TouchableOpacity
    onPress={onAdd}
    activeOpacity={0.85}
    style={{
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 15,
      borderRadius: 14,
      borderWidth: 1.5,
      borderStyle: "dashed",
      borderColor: colors.primary + "55",
      backgroundColor: colors.primary + "08",
    }}
  >
    {/* Icon bubble */}
    <View
      style={{
        width: 33,
        height: 33,
        borderRadius: 22,
        backgroundColor: colors.primary + "20",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
      }}
    >
      <Plus size={20} color={colors.primary} />
    </View>

    <CsText
      style={{
        fontSize: 15,
        fontWeight: "700",
        color: colors.primary,
      }}
    >
      {emptyActionLabel}
    </CsText>

    <CsText
      style={{
        fontSize: 12,
        color: colors.neutral,
        marginTop: 4,
        textAlign: "center",
      }}
    >
      Tap to add information
    </CsText>
  </TouchableOpacity>
) : (

        <View style={{ gap: 20 }}>
          {items.map((item, index) => (
            <View key={item.title}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: colors.primary + "15",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 14,
                  }}
                >
                  {item.icon}
                </View>

                <View style={{ flex: 1 }}>
                  <CsText
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: colors.dark,
                    }}
                  >
                    {item.title}
                  </CsText>

                  <CsText
                    style={{
                      color: colors.neutral,
                      fontSize: 14,
                    }}
                  >
                    {item.value || "—"}
                  </CsText>
                </View>
              </View>

              {index < items.length - 1 && (
                <View
                  style={{
                    marginLeft: 58,
                    marginTop: 10,
                    height: 1,
                    backgroundColor: colors.light,
                  }}
                />
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
