import FormFileInput from "@/src/components/form/inputs/FormFileInput";
import { colors } from "@/src/constants/colors";
import { showErrorToast } from "@/src/utils/toast";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

type Props = {
  errors: any;
  uploadedReportsCount: number;
};

const MAX_REPORTS = 3;

export default function SoilTestReportsSection({
  errors,
  uploadedReportsCount,
}: Props) {
  const { control, getValues } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "reports",
  });

  // Current reports being added
  const currentReportsCount = fields.length;

  // Total reports
  const totalReports = uploadedReportsCount + currentReportsCount;

  // Remaining reports allowed
  const remainingReports = MAX_REPORTS - totalReports;

  const isMaxReached = totalReports >= MAX_REPORTS;

  useEffect(() => {
    // Add initial field only if user can still upload
    if (fields.length === 0 && uploadedReportsCount < MAX_REPORTS) {
      append(null);
    }
  }, [fields, append, uploadedReportsCount]);

  const handleAddMore = () => {
    if (isMaxReached) {
      showErrorToast("Only 3 soil test reports are allowed.");

      return;
    }

    const currentReports = getValues("reports") || [];

    const lastReport = currentReports[currentReports.length - 1];

    // Validate previous field
    if (!lastReport || (typeof lastReport === "object" && !lastReport.uri)) {
      showErrorToast("Please upload a report before adding another.");

      return;
    }

    append(null);
  };

  return (
    <View
      style={{
        gap: 12,
        paddingVertical: 10,
      }}
    >
      {fields.map((item, index) => (
        <View
          key={item.id}
          style={{
            backgroundColor: colors.light,
            borderWidth: 1,
            borderColor: colors.cardBorder,
            padding: 16,
            borderRadius: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: colors.darkHover,
              }}
            >
              REPORT {uploadedReportsCount + index + 1}
            </Text>

            {index > 0 && (
              <Pressable onPress={() => remove(index)}>
                <Text
                  style={{
                    color: colors.error,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  Remove
                </Text>
              </Pressable>
            )}
          </View>

          <FormFileInput
            name={`reports.${index}`}
            maxFiles={remainingReports <= 0 ? 0 : remainingReports}
            label={"Upload File"}
            error={
              errors?.reports?.[index]?.uri?.message ||
              errors?.reports?.[index]?.message
            }
          />
        </View>
      ))}

      <Pressable
        disabled={isMaxReached}
        onPress={handleAddMore}
        style={{
          padding: 14,
          backgroundColor: isMaxReached ? colors.cardBorder : colors.bgColor,
          borderRadius: 10,
          borderStyle: "dashed",
          borderWidth: 1,
          borderColor: isMaxReached ? colors.cardBorder : colors.darkHover,
          alignItems: "center",
          opacity: isMaxReached ? 0.6 : 1,
        }}
      >
        <Text
          style={{
            color: isMaxReached ? colors.dark : colors.primary,
            fontWeight: "700",
          }}
        >
          {isMaxReached ? "Maximum 3 Reports Allowed" : "+ Add Another Report"}
        </Text>
      </Pressable>
    </View>
  );
}
