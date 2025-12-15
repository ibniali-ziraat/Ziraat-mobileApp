import { colors } from "@/src/constants/colors";
import { Asterisk } from "lucide-react-native";
import { Controller, useWatch } from "react-hook-form";
import { Modal, Text, TouchableOpacity, View, FlatList } from "react-native";
import { useEffect, useState } from "react";

export default function MultiSelectInput({
  control,
  name,
  label,
  options = [],
  error,
  optional = false,
}: FormFieldProps) {
  const [visible, setVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  // ✅ watch RHF value safely
  const value = useWatch({ control, name });

  // ✅ sync modal state with prefill
  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedOptions(value);
    } else {
      setSelectedOptions([]);
    }
  }, [value]);

  const toggleOption = (val: string | number) => {
    setSelectedOptions((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <View style={{ marginBottom: 16 }}>
          {/* Label */}
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "600", color: colors.dark }}
            >
              {label}
            </Text>
            {!optional && (
              <Asterisk
                size={14}
                color={colors.error}
                style={{ marginLeft: 4 }}
              />
            )}
          </View>

          {/* Trigger */}
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              borderWidth: 1,
              borderColor: colors.neutral,
              padding: 12,
              borderRadius: 6,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{ color: value?.length ? colors.dark : colors.neutral }}
            >
              {value?.length ? value.join(", ") : `Select ${label}`}
            </Text>
          </TouchableOpacity>

          {/* Error */}
          {error && (
            <Text style={{ color: colors.error, fontSize: 12 }}>
              {error.message || error}
            </Text>
          )}

          {/* Modal */}
          <Modal visible={visible} transparent animationType="fade">
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setVisible(false)}
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "80%",
                  backgroundColor: "white",
                  borderRadius: 8,
                  padding: 16,
                  maxHeight: 400,
                }}
              >
                <FlatList
                  data={options}
                  keyExtractor={(i) => i.value.toString()}
                  renderItem={({ item }) => {
                    const selected = selectedOptions.includes(item.value);
                    return (
                      <TouchableOpacity
                        onPress={() => toggleOption(item.value)}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          padding: 12,
                          borderWidth: 1,
                          borderColor: selected
                            ? colors.primary
                            : colors.neutral,
                          backgroundColor: selected
                            ? colors.primary + "15"
                            : "white",
                          borderRadius: 6,
                          marginBottom: 6,
                        }}
                      >
                        <Text style={{ marginRight: 10 }}>
                          {selected ? "✓" : ""}
                        </Text>
                        <Text>{item.label}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    onChange(selectedOptions);
                    setVisible(false);
                  }}
                  style={{
                    backgroundColor: colors.primary,
                    padding: 12,
                    borderRadius: 6,
                    marginTop: 12,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>Add</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      )}
    />
  );
}
