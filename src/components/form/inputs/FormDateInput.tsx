import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Platform, TouchableOpacity, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export default function FormDatePicker({
  control,
  name,
  label,
  optional = false,
  error,
}) {
  const [show, setShow] = useState(false);
  const isWeb = Platform.OS === "web";

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState }) => {
        const showError = !!(fieldState?.error || error);

        return (
          <View className="mb-5">
            {/* 🌐 WEB VERSION */}
            {isWeb ? (
              <input
                type="date"
                value={value ? value.split("T")[0] : ""}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) return onChange("");

                  onChange(new Date(val).toISOString());
                }}
                className={`p-3 border rounded-md ${
                  showError ? "border-red-500" : "border-gray-300"
                }`}
              />
            ) : (
              <>
                {/* 📱 MOBILE INPUT */}
                <TouchableOpacity onPress={() => setShow(true)} activeOpacity={0.8}>
                  <TextInput
                    mode="outlined"
                    label={optional ? `${label} (Optional)` : `${label} *`}
                    value={value ? new Date(value).toDateString() : ""}
                    editable={false}
                    right={<TextInput.Icon icon="calendar" />}
                    error={showError}
                  />
                </TouchableOpacity>

                {/* ✅ SAFE NATIVE PICKER */}
                {show && (
                  <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(event, selectedDate) => {
                      setShow(false);

                      if (event.type === "set" && selectedDate) {
                        onChange(selectedDate.toISOString());
                      }
                    }}
                  />
                )}
              </>
            )}

            {!isWeb && showError && (
              <HelperText type="error" visible>
                {(fieldState?.error || error)?.message}
              </HelperText>
            )}
          </View>
        );
      }}
    />
  );
}
