import { colors } from "@/src/constants/colors"; // Import root colors
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Platform, Pressable, View } from "react-native";
import { HelperText } from "react-native-paper";
import CsText from "../../shared/CsText";

export default function FormDateInput({
  control,
  name,
  label,
  optional = false,
  error,
}) {
  const [show, setShow] = useState(false);
  const isWeb = Platform.OS === "web";
  console.log(error, "date error");

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
        const showError = !!fieldError;
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
                    color: colors.dark,
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
                    padding: "16px",
                    borderRadius: "4px",
                    border: `1px solid ${colors.neutral}`,
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
                    {fieldError || error}
                  </span>
                )}
              </View>
            ) : (
              // --------------------- MOBILE INPUT ---------------------
              // --------------------- MOBILE INPUT ---------------------
              <>
                <CsText
                  style={{
                    marginBottom: 6,
                    fontSize: 14,
                    fontWeight: "500",
                    color: colors.dark,
                  }}
                >
                  {label}
                  {!optional && (
                    <CsText style={{ color: colors.error }}> *</CsText>
                  )}
                </CsText>

                <Pressable
                  onPress={() => setShow(true)}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // Applied requested border styling
                    borderWidth: 1,
                    borderColor: showError ? colors.error : colors.darkHover,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    backgroundColor: colors.light,
                    borderRadius: 10,
                  }}
                >
                  <CsText
                    style={{
                      fontSize: 16,
                      color: normalizedValue
                        ? colors.dark
                        : colors.neutral + "88",
                    }}
                  >
                    {normalizedValue || `Select ${label}`}
                  </CsText>
                  <Calendar size={20} color={colors.primary} />
                </Pressable>

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
                      onChange(formatDate(selectedDate));
                    }}
                  />
                )}

                {showError && (
                  <HelperText
                    type="error"
                    visible
                    style={{
                      color: colors.error,
                      paddingHorizontal: 0,
                      marginTop: 2,
                    }}
                  >
                    {fieldError?.message || error || "Required Field"}
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
