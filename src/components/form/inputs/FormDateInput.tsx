import { colors } from "@/src/constants/colors";
import { Calendar } from "lucide-react-native";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import CsText from "../../shared/CsText";

interface FormDateInputProps {
  name: string;
  label: string;
  optional?: boolean;
  error?: string;
  placeholder?: string;
}

export default function FormDateInput({
  name,
  label,
  optional = false,
  error,
  placeholder = "Select Date",
}: FormDateInputProps) {
  const [show, setShow] = useState(false);
  const isWeb = Platform.OS === "web";

  const { control } = useFormContext();

  const normalizeDate = (date: string) => {
    if (!date) return "";
    return date.includes("T") ? date.split("T")[0] : date;
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
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
        const selectedDate = normalizedValue
          ? new Date(normalizedValue + "T00:00:00")
          : undefined;

        return (
          <View style={styles.container}>
            {isWeb ? (
              // ── WEB ────────────────────────────────────────────────
              <View style={styles.webWrapper}>
                <label style={styles.webLabel}>
                  {label}
                  {!optional && <span style={{ color: colors.error }}> *</span>}
                </label>
                <input
                  type="date"
                  value={normalizedValue}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (!v) return onChange("");
                    onChange(v);
                  }}
                  style={webInputStyle}
                />
                {showError && (
                  <span style={styles.webError}>
                    {fieldError?.message || error}
                  </span>
                )}
              </View>
            ) : (
              // ── MOBILE ─────────────────────────────────────────────
              <>
                <CsText style={styles.label}>
                  {label}
                  {!optional && (
                    <CsText style={{ color: colors.error }}> *</CsText>
                  )}
                </CsText>

                <Pressable
                  onPress={() => setShow(true)}
                  style={[
                    styles.pressable,
                    showError && { borderColor: colors.error },
                  ]}
                >
                  <CsText
                    style={[
                      styles.pressableText,
                      !normalizedValue && styles.placeholderText,
                    ]}
                  >
                    {normalizedValue || placeholder}
                  </CsText>
                  <Calendar size={20} color={colors.primary} />
                </Pressable>

                {/* react-native-paper-dates: no native module, pure JS/RN */}
                <DatePickerModal
                  locale="en-GB"
                  mode="single"
                  visible={show}
                  onDismiss={() => setShow(false)}
                  date={selectedDate}
                  onConfirm={({ date }) => {
                    setShow(false);
                    if (!date) return;
                    onChange(formatDate(date));
                  }}
                  presentationStyle="pageSheet"
                />

                {showError && (
                  <CsText style={styles.errorText}>
                    {fieldError?.message || error || "Required Field"}
                  </CsText>
                )}
              </>
            )}
          </View>
        );
      }}
    />
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

// Plain CSS for the raw HTML <input>. Kept out of StyleSheet.create: React
// Native's style validation rejects CSS shorthands like `outline` and errors
// on every web bundle.
const webInputStyle: React.CSSProperties = {
  padding: "16px",
  borderRadius: "4px",
  border: `1px solid ${colors.neutral}`,
  fontSize: "16px",
  outline: "none",
  backgroundColor: colors.light,
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },

  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "500",
    color: colors.dark,
  },

  pressable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.darkHover,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.light,
    borderRadius: 10,
  },
  pressableText: { fontSize: 16, color: colors.dark },
  placeholderText: { color: colors.neutral + "88" },

  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },

  // Web
  webWrapper: { flexDirection: "column", width: "100%" },
  webLabel: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
    color: colors.dark,
  } as any,
  webError: { color: colors.error, fontSize: "12px", marginTop: 4 } as any,
});
