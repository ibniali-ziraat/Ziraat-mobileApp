import { colors } from "@/src/constants/colors";
import { View } from "react-native";
import { Button } from "react-native-paper";

interface FormActionsProps {
  cancelLabel?: string;
  submitLabel?: string;
  onSubmit: () => void | Promise<void>;
  onCancel?: () => void;
  disabled?: boolean;
  loading?: boolean; // NEW: loading state
}

export default function FormActions({
  cancelLabel,
  submitLabel = "Submit",
  onSubmit,
  onCancel,
  disabled = false,
  loading = false, // new
}: FormActionsProps) {
  const showCancel = !!cancelLabel && !!onCancel;
  const isDisabled = disabled || loading;

  return (
    <View
      className={`w-full mt-2 gap-6 bg-light ${showCancel ? "flex-row" : "items-center"
        }`}
    >
      {showCancel && (
        <Button
          mode="outlined"
          textColor={colors.dark}
          style={{ borderColor: colors.dark }}
          className="flex-1 rounded-lg"
          onPress={onCancel}
          disabled={isDisabled}
        >
          {cancelLabel}
        </Button>
      )}

      <Button
        mode="contained"
        buttonColor={colors.primary}
        textColor={colors.light}
        loading={loading}          // NEW: loader
        disabled={isDisabled}      // disabled when loading or disabled
        className={`${showCancel ? "flex-1" : "w-1/2"} rounded-lg`}
        onPress={onSubmit}
      >
        {submitLabel}
      </Button>
    </View>
  );
}
