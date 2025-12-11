import { colors } from "@/src/constants/colors";
import { router } from "expo-router";
import { View } from "react-native";
import { Button } from "react-native-paper";

interface FormActionsProps {
  cancelLabel?: string;
  submitLabel?: string;
  onSubmit: () => void;
  onCancel?: () => void; // new prop
  disabled?: boolean;
}

export default function FormActions({
  cancelLabel,
  submitLabel = "Submit",
  onSubmit,
  onCancel,
  disabled = false,
}: FormActionsProps) {
  const showCancel = !!cancelLabel && !!onCancel;

  return (
    <View
      className={`w-full mt-6 gap-6 bg-light ${showCancel ? "flex-row" : "items-center"}`}
    >
      {showCancel && (
        <Button
          mode="outlined"
          textColor={colors.dark}
          style={{ borderColor: colors.dark }}
          className="flex-1 rounded-lg"
          onPress={onCancel} // <-- call the passed function
          disabled={disabled}
        >
          {cancelLabel}
        </Button>
      )}

      <Button
        mode="contained"
        buttonColor={colors.primary}
        textColor={colors.light}
        className={`${showCancel ? "flex-1" : "w-1/2"} rounded-lg`}
        onPress={onSubmit}
        disabled={disabled}
      >
        {submitLabel}
      </Button>
    </View>
  );
}
