// import CsText from "@/src/components/shared/CsText";
// import { ScreenContent } from "@/src/components/shared/ScreenContent";
// import { colors } from "@/src/constants/colors";
// import { showErrorToast } from "@/src/utils/toast";
// import { FileText, Plus, Trash2 } from "lucide-react-native";
// import { Linking, Pressable, Text, View } from "react-native";

// interface Props {
//   reportUrls?: string[];
//   onDeleteReport?: (url: string) => void;
//   onAdd?: () => void;
// }

// const MAX_REPORTS = 3;

// export default function SoilTestReportsCard({
//   reportUrls = [],
//   onDeleteReport,
//   onAdd,
// }: Props) {
//   const hasReports = reportUrls.length > 0;
//   const isMaxReached = reportUrls.length >= MAX_REPORTS;

//   const openReport = async (url: string) => {
//     try {
//       const supported = await Linking.canOpenURL(url);

//       if (supported) {
//         await Linking.openURL(url);
//       } else {
//         showErrorToast("Cannot open report");
//       }
//     } catch {
//       showErrorToast("Failed to open report");
//     }
//   };

//   const handleAddMore = () => {
//     if (isMaxReached) {
//       showErrorToast("Only 3 soil test reports are allowed.");
//       return;
//     }

//     onAdd?.();
//   };

//   return (
//     <ScreenContent>
//       <View
//         className="mb-5 rounded-2xl border"
//         style={{
//           borderColor: colors.cardBorder,
//           backgroundColor: colors.light,
//         }}
//       >
//         {/* Header */}
//         <View className="flex-row items-center justify-between pt-4 px-4">
//           <View className="flex-row items-center gap-3">
//             <View
//               className="w-1.5 h-7 rounded-full"
//               style={{ backgroundColor: colors.primary }}
//             />

//             <Text
//               className="text-[15px] font-semibold"
//               style={{ color: colors.dark }}
//             >
//               Soil Test Reports
//             </Text>
//           </View>

//           {onAdd && hasReports && (
//             <Pressable
//               disabled={isMaxReached}
//               onPress={handleAddMore}
//               className="flex-row items-center gap-1"
//               style={{
//                 opacity: isMaxReached ? 0.5 : 1,
//               }}
//             >
//               {!isMaxReached && (
//                 <Plus
//                   size={18}
//                   color={isMaxReached ? colors.neutral : colors.primary}
//                 />
//               )}

//               <Text
//                 style={{
//                   color: isMaxReached ? colors.neutral : colors.primary,
//                 }}
//               >
//                 {isMaxReached ? "Max 3 Added" : "Add More"}
//               </Text>
//             </Pressable>
//           )}
//         </View>

//         <View className="p-4 pt-3">
//           {!hasReports ? (
//             <Pressable
//               disabled={isMaxReached}
//               onPress={handleAddMore}
//               className="flex-row items-center gap-2 rounded-xl border border-dashed p-3"
//               style={{
//                 borderColor: isMaxReached
//                   ? colors.cardBorder
//                   : `${colors.primary}55`,
//                 opacity: isMaxReached ? 0.5 : 1,
//               }}
//             >
//               <Plus
//                 size={16}
//                 color={isMaxReached ? colors.neutral : colors.primary}
//               />

//               <Text
//                 className="text-sm font-medium"
//                 style={{
//                   color: isMaxReached ? colors.neutral : colors.primary,
//                 }}
//               >
//                 {isMaxReached
//                   ? "Maximum 3 Reports Allowed"
//                   : "Add Soil Test Report"}
//               </Text>
//             </Pressable>
//           ) : (
//             <View className="gap-4">
//               {reportUrls.map((url, index) => (
//                 <View key={index}>
//                   <View className="flex-row items-center justify-between">
//                     {/* Left - File Info */}
//                     <Pressable
//                       onPress={() => openReport(url)}
//                       className="flex-row items-center gap-4 flex-1"
//                     >
//                       <View
//                         className="h-11 w-11 items-center justify-center rounded-xl"
//                         style={{ backgroundColor: `${colors.primary}12` }}
//                       >
//                         <FileText size={18} color={colors.primary} />
//                       </View>

//                       <View>
//                         <CsText
//                           className="text-[11px] font-semibold"
//                           style={{ color: colors.neutral }}
//                         >
//                           Report {index + 1}
//                         </CsText>

//                         <CsText
//                           className="text-md mt-1"
//                           style={{ color: colors.primary }}
//                         >
//                           Download Report
//                         </CsText>
//                       </View>
//                     </Pressable>

//                     {/* Delete */}
//                     <View className="flex-row items-center gap-3">
//                       {onDeleteReport && (
//                         <Pressable
//                           onPress={() => onDeleteReport(url)}
//                           hitSlop={{
//                             top: 10,
//                             bottom: 10,
//                             left: 10,
//                             right: 10,
//                           }}
//                         >
//                           <Trash2 size={18} color={colors.error} />
//                         </Pressable>
//                       )}
//                     </View>
//                   </View>

//                   {index < reportUrls.length - 1 && (
//                     <View
//                       className="mt-4 h-px"
//                       style={{ backgroundColor: colors.cardBorder }}
//                     />
//                   )}
//                 </View>
//               ))}
//             </View>
//           )}
//         </View>
//       </View>
//     </ScreenContent>
//   );
// }

import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";
import { colors } from "@/src/constants/colors";
import { showErrorToast } from "@/src/utils/toast";
import { FileText, Plus, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";

interface Props {
  reportUrls?: string[];
  onDeleteReport?: (url: string) => void;
  onAdd?: () => void;
  deleting?: boolean;
}

const MAX_REPORTS = 3;

export default function SoilTestReportsCard({
  reportUrls = [],
  onDeleteReport,
  onAdd,
  deleting = false,
}: Props) {
  const hasReports = reportUrls.length > 0;

  const isMaxReached = reportUrls.length >= MAX_REPORTS;

  // Modal states
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [selectedReportUrl, setSelectedReportUrl] = useState<string | null>(
    null,
  );

  const openReport = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        showErrorToast("Cannot open report");
      }
    } catch {
      showErrorToast("Failed to open report");
    }
  };

  const handleAddMore = () => {
    if (isMaxReached) {
      showErrorToast("Only 3 soil test reports are allowed.");

      return;
    }

    onAdd?.();
  };

  // Open delete confirmation modal
  const handleDeletePress = (url: string) => {
    setSelectedReportUrl(url);
    setDeleteModalVisible(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (selectedReportUrl) {
      onDeleteReport?.(selectedReportUrl);
    }

    setDeleteModalVisible(false);
    setSelectedReportUrl(null);
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setSelectedReportUrl(null);
  };

  return (
    <>
      <ScreenContent>
        <View
          className="mb-5 rounded-2xl border"
          style={{
            borderColor: colors.cardBorder,
            backgroundColor: colors.light,
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between pt-4 px-4">
            <View className="flex-row items-center gap-3">
              <View
                className="w-1.5 h-7 rounded-full"
                style={{
                  backgroundColor: colors.primary,
                }}
              />

              <Text
                className="text-[15px] font-semibold"
                style={{ color: colors.dark }}
              >
                Soil Test Reports
              </Text>
            </View>

            {onAdd && hasReports && (
              <Pressable
                disabled={isMaxReached}
                onPress={handleAddMore}
                className="flex-row items-center gap-1"
                style={{
                  opacity: isMaxReached ? 0.5 : 1,
                }}
              >
                {!isMaxReached && (
                  <Plus
                    size={18}
                    color={isMaxReached ? colors.neutral : colors.primary}
                  />
                )}

                <Text
                  style={{
                    color: isMaxReached ? colors.neutral : colors.primary,
                  }}
                >
                  {isMaxReached ? "Max 3 Added" : "Add More"}
                </Text>
              </Pressable>
            )}
          </View>

          <View className="p-4 pt-3">
            {!hasReports ? (
              <Pressable
                disabled={isMaxReached}
                onPress={handleAddMore}
                className="flex-row items-center gap-2 rounded-xl border border-dashed p-3"
                style={{
                  borderColor: isMaxReached
                    ? colors.cardBorder
                    : `${colors.primary}55`,
                  opacity: isMaxReached ? 0.5 : 1,
                }}
              >
                <Plus
                  size={16}
                  color={isMaxReached ? colors.neutral : colors.primary}
                />

                <Text
                  className="text-sm font-medium"
                  style={{
                    color: isMaxReached ? colors.neutral : colors.primary,
                  }}
                >
                  {isMaxReached
                    ? "Maximum 3 Reports Allowed"
                    : "Add Soil Test Report"}
                </Text>
              </Pressable>
            ) : (
              <View className="gap-4">
                {reportUrls.map((url, index) => (
                  <View key={index}>
                    <View className="flex-row items-center justify-between">
                      {/* Left - File */}
                      <Pressable
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
                            style={{
                              color: colors.neutral,
                            }}
                          >
                            Report {index + 1}
                          </CsText>

                          <CsText
                            className="text-md mt-1"
                            style={{
                              color: colors.primary,
                            }}
                          >
                            Download Report
                          </CsText>
                        </View>
                      </Pressable>

                      {/* Delete */}
                      <View className="flex-row items-center gap-3">
                        {onDeleteReport && (
                          <Pressable
                            onPress={() => handleDeletePress(url)}
                            hitSlop={{
                              top: 10,
                              bottom: 10,
                              left: 10,
                              right: 10,
                            }}
                          >
                            <Trash2 size={18} color={colors.error} />
                          </Pressable>
                        )}
                      </View>
                    </View>

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

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        visible={deleteModalVisible}
        title="Delete Report?"
        description="Are you sure you want to delete this soil test report? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
