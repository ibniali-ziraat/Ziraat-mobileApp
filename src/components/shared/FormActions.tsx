import { colors } from "@/src/constants/colors";
import { View } from "react-native";
import { Button } from "react-native-paper";

interface FormActionsProps {
  cancelLabel?: string;
  submitLabel?: string;
  onSubmit: () => void | Promise<void>;
  onCancel?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function FormActions({
  cancelLabel,
  submitLabel = "Submit",
  onSubmit,
  onCancel,
  disabled = false,
  loading = false,
}: FormActionsProps) {
  const showCancel = !!cancelLabel && !!onCancel;
  const isDisabled = disabled || loading;

  return (
    <View
      style={{
        width: "100%",

        marginTop: 16,
        flexDirection: showCancel ? "row" : "column",
        gap: 14,

        alignItems: showCancel ? "stretch" : "center",
        padding: 0,
      }}
    >
      {/* Cancel Button */}
      {showCancel && (
        <Button
          mode="outlined"
          textColor={colors.dark}
          onPress={onCancel}
          // disabled={isDisabled}
          style={{
            flex: 1,
            borderRadius: 12,
            borderColor: colors.darkHover,
          }}
          contentStyle={{
            paddingVertical: 0,
            paddingHorizontal: 0,
          }}
        >
          {cancelLabel}
        </Button>
      )}

      {/* Submit Button */}
      <Button
        mode="contained"
        buttonColor={colors.primary}
        textColor={colors.light}
        loading={loading}
        disabled={isDisabled}
        onPress={onSubmit}
        style={{
          flex: showCancel ? 1 : undefined,
          width: showCancel ? undefined : "60%",
          borderRadius: 12,
          elevation: 2, // subtle depth
          padding: 0,
        }}
        contentStyle={{
          paddingVertical: 0,
          paddingHorizontal: 0,
        }}
      >
        {submitLabel}
      </Button>
    </View>
  );
}
