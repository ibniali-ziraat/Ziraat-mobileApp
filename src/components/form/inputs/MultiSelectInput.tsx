import { colors } from "@/src/constants/colors";
import { Asterisk } from "lucide-react-native";
import { Controller } from "react-hook-form";
import { Modal, Text, TouchableOpacity, View, FlatList } from "react-native";
import { useState } from "react";

export default function MultiSelectInput({
  control,
  name,
  label,
  options = [],
  error,
  optional = false,
}: FormFieldProps) {
  const [visible, setVisible] = useState(false); // Modal visibility
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]); // Store selected options

  // Toggle option selection
  const toggleOption = (value: string | number) => {
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View style={{ marginBottom: 16 }}>
          {/* Label with Asterisk if required */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Text style={{ color: colors.dark, fontSize: 16, fontWeight: "600" }}>{label}</Text>
            {!optional && (
              <Asterisk size={14} color={colors.error} style={{ marginLeft: 4 }} />
            )}
          </View>

          {/* Dropdown Trigger */}
          <TouchableOpacity
            onPress={() => setVisible(true)}
            activeOpacity={0.8}
            style={{
              backgroundColor: "white",
              borderColor: colors.neutral,
              borderWidth: 1,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 6,
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: value && value.length ? colors.dark : colors.neutral,
              }}
            >
              {value && value.length ? value.join(", ") : `Select ${label}`}
            </Text>
          </TouchableOpacity>

          {/* Error Message */}
          {error && <Text style={{ color: colors.error, fontSize: 12 }}>{error.message || error}</Text>}

          {/* Modal for Options */}
          <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={() => setVisible(false)}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
              activeOpacity={1}
              onPress={() => setVisible(false)} // Close the modal when clicking outside
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
                  keyExtractor={(item) => item.value.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => toggleOption(item.value)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        marginVertical: 4,
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: colors.neutral,
                      }}
                    >
                      {/* Checkbox */}
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 4,
                          borderWidth: 2,
                          borderColor: colors.primary,
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: 12,
                        }}
                      >
                        {selectedOptions.includes(item.value) && (
                          <Text style={{ fontSize: 14, color: colors.primary }}>✓</Text> // Checkmark
                        )}
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: colors.dark,
                        }}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                  showsVerticalScrollIndicator={false} // Hide scrollbar

                />
                <TouchableOpacity
                  onPress={() => {
                    onChange(selectedOptions);
                    setVisible(false); // Close modal after confirming
                  }}
                  style={{
                    backgroundColor: colors.primary,
                    paddingVertical: 12,
                    borderRadius: 6,
                    marginTop: 16,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>Add</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      )}
    />
  );
}
