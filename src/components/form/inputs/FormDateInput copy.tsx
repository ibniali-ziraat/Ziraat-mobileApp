import { colors } from "@/src/constants/colors";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
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
  const isIOS = Platform.OS === "ios";

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
          ? new Date(normalizedValue)
          : new Date();

        const handleChange = (event: DateTimePickerEvent, date?: Date) => {
          if (isIOS) {
            // iOS: keep open until user confirms/cancels via modal buttons
            return;
          }
          // Android: closes automatically
          setShow(false);
          if (event.type === "dismissed" || !date) return;
          onChange(formatDate(date));
        };

        const handleIOSConfirm = (date: Date) => {
          setShow(false);
          onChange(formatDate(date));
        };

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
                  style={styles.webInput}
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
                {/* Label */}
                <CsText style={styles.label}>
                  {label}
                  {!optional && (
                    <CsText style={{ color: colors.error }}> *</CsText>
                  )}
                </CsText>

                {/* Trigger Button */}
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

                {/* Android: inline picker */}
                {!isIOS && show && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleChange}
                  />
                )}

                {/* iOS: modal picker with Done/Cancel */}
                {isIOS && (
                  <IOSDateModal
                    visible={show}
                    value={selectedDate}
                    onCancel={() => setShow(false)}
                    onConfirm={handleIOSConfirm}
                  />
                )}

                {/* Error */}
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

// ── iOS Modal Wrapper ────────────────────────────────────────────────────────

function IOSDateModal({
  visible,
  value,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  value: Date;
  onCancel: () => void;
  onConfirm: (date: Date) => void;
}) {
  const [tempDate, setTempDate] = useState(value);

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}
    >
      <Pressable style={styles.modalOverlay} onPress={onCancel} />

      <View style={styles.modalSheet}>
        {/* Toolbar */}
        <View style={styles.modalToolbar}>
          <Pressable onPress={onCancel} hitSlop={12}>
            <CsText style={styles.modalCancel}>Cancel</CsText>
          </Pressable>
          <Pressable onPress={() => onConfirm(tempDate)} hitSlop={12}>
            <CsText style={styles.modalDone}>Done</CsText>
          </Pressable>
        </View>

        {/* Spinner */}
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="spinner"
          onChange={(_, date) => date && setTempDate(date)}
          style={{ width: "100%" }}
        />
      </View>
    </Modal>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

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
    paddingHorizontal: 0,
  },

  // iOS Modal
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
  modalSheet: { backgroundColor: colors.light, paddingBottom: 24 },
  modalToolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.neutral,
  },
  modalCancel: { fontSize: 16, color: colors.neutral },
  modalDone: { fontSize: 16, color: colors.primary, fontWeight: "600" },

  // Web
  webWrapper: { flexDirection: "column", width: "100%" },
  webLabel: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
    color: colors.dark,
  } as any,
  webInput: {
    padding: "16px",
    borderRadius: "4px",
    border: `1px solid ${colors.neutral}`,
    fontSize: "16px",
    outline: "none",
    backgroundColor: colors.light,
  } as any,
  webError: { color: colors.error, fontSize: "12px", marginTop: 4 } as any,
});
