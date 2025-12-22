import { colors } from "@/src/constants/colors"; // Import root colors
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Platform, TouchableOpacity, View } from "react-native";
import { HelperText } from "react-native-paper";

export default function FormDatePicker({
  control,
  name,
  label,
  optional = false,
  error,
}) {
  const [show, setShow] = useState(false);
  const isWeb = Platform.OS === "web";

  // Normalize backend dates: "2025-12-10T00:00:00" → "2025-12-10"
  const normalizeDate = (date) => {
    if (!date) return "";
    return date.includes("T") ? date.split("T")[0] : date;
  };

  // Format selected date into "YYYY-MM-DD"
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
        const normalizedValue = normalizeDate(value);

        return (
          <View style={{ marginBottom: 16 }}>
            {isWeb ? (
              // --------------------- WEB INPUT ---------------------
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
                  value={normalizedValue}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (!v) return onChange("");
                    onChange(v); // Always "YYYY-MM-DD"
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: `1px solid ${showError ? colors.error : colors.neutral}`,
                    fontSize: "16px",
                    outline: "none",
                    backgroundColor: colors.light,
                  }}
                />

                {showError && (
                  <span
                    style={{
                      color: colors.error,
                      fontSize: "12px",
                      marginTop: 4,
                    }}
                  >
                    {(fieldError || error)?.message}
                  </span>
                )}
              </View>
            ) : (
              // --------------------- MOBILE INPUT ---------------------
              <>
                <TouchableOpacity
                  onPress={() => setShow(true)}
                  activeOpacity={0.8}
                >
                  <View pointerEvents="none">
                    <TextInput
                      mode="outlined"
                      label={optional ? `${label} (Optional)` : `${label} *`}
                      value={normalizedValue}
                      editable={false}
                      right={<TextInput.Icon icon="calendar" />}
                      error={showError}
                      style={{
                        backgroundColor: colors.light,
                      }}
                      theme={{
                        colors: {
                          primary: colors.primary,
                          placeholder: colors.neutral,
                          text: colors.dark,
                          error: colors.error,
                        },
                      }}
                    />
                  </View>
                </TouchableOpacity>

                {show && (
                  <DateTimePicker
                    value={
                      normalizedValue ? new Date(normalizedValue) : new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShow(false);
                      if (event.type === "dismissed") return;
                      onChange(formatDate(selectedDate)); // Always "YYYY-MM-DD"
                    }}
                  />
                )}

                {showError && (
                  <HelperText
                    type="error"
                    visible
                    style={{
                      color: colors.error,
                      paddingVertical: 0,
                      paddingBottom: 0,
                      marginTop: 2,
                      marginBottom: 0,
                    }}
                  >
                    Required Field
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
