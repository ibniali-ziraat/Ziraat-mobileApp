import { colors } from "@/src/constants/colors"; // Import root colors
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Platform, TouchableOpacity, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FormDatePicker({
  control,
  name,
  label,
  optional = false,
  error,
}) {
  const [show, setShow] = useState(false);
  const isWeb = Platform.OS === "web";

  // Format the date to YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error: fieldError },
      }) => {
        const showError = !!(fieldError || error);

        return (
          <View style={{ marginBottom: 16 }}>
            {isWeb ? (
              // Web-specific input
              <View style={{ flexDirection: "column", width: "100%" }}>
                <label
                  style={{
                    marginBottom: 8,
                    fontSize: 14,
                    fontWeight: "500",
                    color: showError ? colors.error : colors.dark,
                  }}
                >
                  {label}
                  {!optional && <span style={{ color: colors.error }}> *</span>}
                </label>

                <input
                  type="date"
                  value={value || ""}
                  onChange={(e) => {
                    if (!e.target.value) return onChange(null);
                    onChange(e.target.value); // Just send "YYYY-MM-DD"
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: `1px solid ${showError ? colors.error : colors.neutral}`,
                    fontSize: "16px",
                    outline: "none",
                    backgroundColor: colors.light, // White background
                  }}
                />

                {showError && (
                  <span style={{ color: colors.error, fontSize: "12px", marginTop: 4 }}>
                    {(fieldError || error)?.message}
                  </span>
                )}
              </View>
            ) : (
              // Mobile-specific input
              <>
                <TouchableOpacity onPress={() => setShow(true)} activeOpacity={0.8}>
                  <View pointerEvents="none">
                    <TextInput
                      mode="outlined"
                      label={optional ? `${label} (Optional)` : `${label} *`}
                      value={value ? formatDate(value) : ""}
                      editable={false}
                      right={<TextInput.Icon icon="calendar" />}
                      error={showError}
                      style={{
                        backgroundColor: colors.light, // White background
                      }}
                      theme={{
                        colors: {
                          primary: colors.primary, // Outline color
                          placeholder: colors.neutral, // Placeholder text color
                          text: colors.dark, // Input text color
                          error: colors.error, // Error text color
                        },
                      }}
                    />
                  </View>
                </TouchableOpacity>

                {show && (
                  <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShow(false);
                      if (event.type === "dismissed") return;
                      onChange(formatDate(selectedDate)); // Send "YYYY-MM-DD"
                    }}
                  />
                )}

                {showError && (
                  <HelperText type="error" visible>
                    {(fieldError || error)?.message}
                  </HelperText>
                )}
              </>
            )}
          </View>
        );
      }}
    />
  );
}
