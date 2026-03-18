import FormFileInput from "@/src/components/form/inputs/FormFileInput";
import { colors } from "@/src/constants/colors"; // Ensure path is correct
import { showErrorToast } from "@/src/utils/toast";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

type Props = {
  errors: any;
};

export default function SoilTestReportsSection({ errors }: Props) {
  console.log(errors, "errors in soiltestreportsection");

  const { control, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "reports",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append(null);
    }
  }, [fields, append]);

  const handleAddMore = () => {
    const currentReports = getValues("reports") || [];
    const lastReport = currentReports[currentReports.length - 1];

    if (!lastReport || (typeof lastReport === "object" && !lastReport.uri)) {
      showErrorToast("Please upload a report before adding another.");
      return;
    }

    append(null);
  };

  return (
    <View style={{ gap: 12, paddingVertical: 10 }}>
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
                fontSize: 13,
                fontWeight: "700",
                color: colors.darkHover,
              }}
            >
              REPORT {index + 1}
            </Text>

            {index > 0 && (
              <Pressable onPress={() => remove(index)}>
                <Text
                  style={{
                    color: colors.error,
                    fontSize: 12,
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
            label="Tap to upload report"
            error={
              errors?.reports?.[index]?.uri?.message ||
              errors?.reports?.[index]?.message
            }
          />
        </View>
      ))}

      <Pressable
        onPress={handleAddMore}
        style={{
          padding: 14,
          backgroundColor: colors.bgColor,
          borderRadius: 10,
          borderStyle: "dashed",
          borderWidth: 1,
          borderColor: colors.darkHover,
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.primary, fontWeight: "700" }}>
          + Add Another Report
        </Text>
      </Pressable>
    </View>
  );
}
