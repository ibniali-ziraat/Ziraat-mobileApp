import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { showErrorToast } from "@/src/utils/toast";
import { FileText, Plus, Trash2 } from "lucide-react-native";
import { Linking, TouchableOpacity, View } from "react-native";

interface Props {
  reportUrls?: string[];
  onDeleteReport?: (index: number) => void;
  onAdd?: () => void;
}

export default function SoilTestReportsCard({
  reportUrls = [],
  onDeleteReport,
  onAdd,
}: Props) {
  const hasReports = reportUrls.length > 0;

  const openReport = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else showErrorToast("Cannot open report");
    } catch {
      showErrorToast("Failed to open report");
    }
  };

  return (
    <ScreenContent>
      <View
        className="mb-5 rounded-2xl border"
        style={{
          borderColor: colors.cardBorder,
          backgroundColor: colors.light,
        }}
      >
        {/* HEADER */}
        <View className="flex-row items-center justify-between pt-4 px-4">
          <View className="flex-row items-center gap-3">
            <View
              className="w-1.5 h-7 rounded-full"
              style={{ backgroundColor: colors.primary }}
            />

            <CsText
              className="text-[15px] font-semibold"
              style={{ color: colors.dark }}
            >
              Soil Test Reports
            </CsText>
          </View>

          {/* Add more reports */}
          {onAdd && (
            <TouchableOpacity
              onPress={onAdd}
              className="flex-row items-center gap-1"
            >
              <Plus size={18} color={colors.primary} />
              <CsText style={{ color: colors.primary }}>Add More</CsText>
            </TouchableOpacity>
          )}
        </View>

        {/* CONTENT */}
        <View className="p-4 pt-3">
          {!hasReports ? (
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
                Add Soil Test Report
              </CsText>
            </TouchableOpacity>
          ) : (
            <View className="gap-4">
              {reportUrls.map((url, index) => (
                <View key={index}>
                  <View className="flex-row items-center justify-between">
                    {/* Left */}
                    <TouchableOpacity
                      onPress={() => openReport(url)}
                      className="flex-row items-center gap-4 flex-1"
                    >
                      <View
                        className="h-11 w-11 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${colors.primary}12`,
                        }}
                      >
                        <FileText size={18} color={colors.primary} />
                      </View>

                      <View>
                        <CsText
                          className="text-[11px] font-semibold"
                          style={{ color: colors.neutral }}
                        >
                          Report {index + 1}
                        </CsText>

                        <CsText
                          className="text-md mt-1"
                          style={{ color: colors.primary }}
                        >
                          Download Report
                        </CsText>
                      </View>
                    </TouchableOpacity>

                    {/* Right actions */}
                    <View className="flex-row items-center gap-3">
                      {
                        <TouchableOpacity onPress={() => onDeleteReport(index)}>
                          <Trash2 size={18} color={colors.error} />
                        </TouchableOpacity>
                      }
                    </View>
                  </View>

                  {/* Divider */}
                  {index < reportUrls.length - 1 && (
                    <View
                      className="mt-4 h-px"
                      style={{
                        backgroundColor: colors.cardBorder,
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
