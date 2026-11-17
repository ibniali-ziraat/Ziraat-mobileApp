import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { cardShadow } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { PencilLine, Plus, Trash2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

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
  subheading?: string;
}

export default function OrchardDetailsCard({
  heading,
  subheading,
  items = [],
  onEdit,
  onDelete,
  onAdd,
  emptyActionLabel = "Add details",
}: OrchardDetailsCardProps) {
  const isEmpty = items.length === 0;

  return (
    <ScreenContent>
      <View
        className="mb-5 overflow-hidden rounded-3xl"
        style={[{ backgroundColor: colors.light }, cardShadow]}
      >
        <View
          className="flex-row items-center justify-between px-4 py-4"
          style={{ backgroundColor: colors.primary + "08" }}
        >
          <View className="min-w-0 flex-1 pr-3">
            <View className="flex-row items-center">
              <View
                className="mr-3 h-9 w-1.5 rounded-full"
                style={{ backgroundColor: colors.primary }}
              />
              <Text
                numberOfLines={1}
                style={[
                  typography.Poppins_m_semibold,
                  { color: colors.dark, fontSize: 16 },
                ]}
              >
                {heading}
              </Text>
            </View>

            {subheading && (
              <Text
                numberOfLines={2}
                style={[
                  typography.Poppins_xs_regular,
                  { color: colors.darkHover, marginLeft: 17, marginTop: 3 },
                ]}
              >
                {subheading}
              </Text>
            )}
          </View>

          {!isEmpty && (
            <View className="flex-row gap-2">
              {onEdit && (
                <Pressable
                  onPress={onEdit}
                  hitSlop={8}
                  className="h-9 w-9 items-center justify-center rounded-full"
                  style={{ backgroundColor: colors.primary + "12" }}
                >
                  <PencilLine size={16} color={colors.primary} />
                </Pressable>
              )}
              {onDelete && (
                <Pressable
                  onPress={onDelete}
                  hitSlop={8}
                  className="h-9 w-9 items-center justify-center rounded-full"
                  style={{ backgroundColor: colors.error + "10" }}
                >
                  <Trash2 size={16} color={colors.error} />
                </Pressable>
              )}
            </View>
          )}
        </View>

        <View className="p-3">
          {isEmpty ? (
            <Pressable
              onPress={onAdd}
              className="flex-row items-center justify-center gap-2 rounded-2xl border border-dashed p-4"
              style={{
                borderColor: colors.primary + "55",
                backgroundColor: colors.primary + "06",
              }}
            >
              <Plus size={18} color={colors.primary} />
              <CsText
                style={[
                  typography.Poppins_s_semibold,
                  { color: colors.primary },
                ]}
              >
                {emptyActionLabel}
              </CsText>
            </Pressable>
          ) : (
            <View className="overflow-hidden rounded-2xl">
              {items.map((item, index) => (
                <View
                  key={`${item.title}-${index}`}
                  className="flex-row items-center px-3 py-3.5"
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? colors.bgColor : colors.light,
                    borderBottomWidth: index < items.length - 1 ? 1 : 0,
                    borderBottomColor: colors.primary + "12",
                  }}
                >
                  <View
                    className="h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: colors.primary + "10" }}
                  >
                    {item.icon}
                  </View>

                  <CsText
                    numberOfLines={2}
                    style={[
                      typography.Poppins_xs_medium,
                      {
                        color: colors.darkHover,
                        flex: 1,
                        marginLeft: 10,
                        marginRight: 8,
                      },
                    ]}
                  >
                    {item.title}
                  </CsText>

                  <CsText
                    numberOfLines={3}
                    style={[
                      typography.Poppins_s_semibold,
                      {
                        color: colors.dark,
                        flex: 1.15,
                        textAlign: "right",
                      },
                    ]}
                  >
                    {item.value || "—"}
                  </CsText>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScreenContent>
  );
}
