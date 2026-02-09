import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { PencilLine, Plus, Trash2 } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

interface DetailItem {
  title: string;
  value?: string | number | null;
  icon: React.ReactNode;
}

interface OrchardDetailsCardProps {
  heading: string;
  items?: DetailItem[];
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  emptyActionLabel?: string;
}

export default function OrchardDetailsCard({
  heading,
  items = [],
  onEdit,
  onDelete,
  onAdd,
  emptyActionLabel = "Add details",
}: OrchardDetailsCardProps) {
  const isEmpty = items.length === 0;

  return (
  <ScreenContent
    
   >
    
     <View
      className="mb-5 rounded-2xl border"
      style={{
        borderColor: colors.cardBorder,
        backgroundColor: colors.light,
      }}
    >
      {/* HEADER */}
      <View className="flex-row items-center justify-between  pt-4">
        <View className="flex-row items-center gap-3">
          {/* Orchard marker */}
          <View
            className="w-1.5 h-7 rounded-full"
            style={{ backgroundColor: colors.primary }}
          />

          <CsText
            className="text-[15px] font-semibold"
            style={{ color: colors.dark }}
          >
            {heading}
          </CsText>
        </View>

        {!isEmpty && (
          <View className="flex-row gap-4">
            {onEdit && (
              <TouchableOpacity onPress={onEdit} hitSlop={10}>
                <PencilLine size={18} color={colors.primary} />
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity onPress={onDelete} hitSlop={10}>
                <Trash2 size={18} color={colors.error} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* CONTENT */}
      <View className=" pb-4 pt-4">
        {isEmpty ? (
          <TouchableOpacity
            onPress={onAdd}
            className="flex-row items-center gap-2 rounded-xl border border-dashed p-3"
            style={{ borderColor: `${colors.primary}55` }}
          >
            <Plus size={16} color={colors.primary} />
            <CsText
              className="text-sm font-medium"
              style={{ color: colors.primary }}
            >
              {emptyActionLabel}
            </CsText>
          </TouchableOpacity>
        ) : (
          <View className="gap-5">
            {items.map((item, index) => (
              <View key={item.title}>
                <View className="flex-row items-start gap-4">
                  {/* Field icon */}
                  <View
                    className="h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${colors.primary}12`,
                    }}
                  >
                    {item.icon}
                  </View>

                  <View className="flex-1">
                    <CsText
                      className="text-[11px] font-semibold tracking-wide"
                      style={{ color: colors.neutral }}
                    >
                      {item.title}
                    </CsText>

                    <CsText
                      className="text-[15px] mt-1"
                      style={{ color: colors.dark }}
                    >
                      {item.value || "—"}
                    </CsText>
                  </View>
                </View>

                {index < items.length - 1 && (
                  <View
                    className="mt-4 h-px"
                    style={{
                      backgroundColor: `${colors.cardBorder}`,
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
 
  </ScreenContent>
  );
}
