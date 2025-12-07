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
          <View className="mb-5">
            {isWeb ? (
              <View className="flex flex-col w-full">
                <label
                  className={`mb-1 text-sm font-medium ${
                    showError ? "text-error" : "text-dark"
                  }`}
                >
                  {label}
                  {!optional && <span className="text-error"> *</span>}
                </label>

                <input
                  type="date"
                  value={value ? value : ""}
                  onChange={(e) => {
                    if (!e.target.value) return onChange(null);
                    onChange(e.target.value); // just send "YYYY-MM-DD"
                  }}
                  className={`p-3 border rounded-md text-base outline-none ${
                    showError ? "border-error" : "border-neutral"
                  }`}
                />

                {showError && (
                  <span className="text-error text-xs mt-1">
                    {(fieldError || error)?.message}
                  </span>
                )}
              </View>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setShow(true)}
                  activeOpacity={0.8}
                >
                  <View pointerEvents="none">
                    <TextInput
                      mode="outlined"
                      label={optional ? `${label} (Optional)` : `${label} *`}
                      value={value ? formatDate(value) : ""}
                      editable={false}
                      right={<TextInput.Icon icon="calendar" />}
                      error={showError}
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
                      onChange(formatDate(selectedDate)); // send "YYYY-MM-DD"
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
