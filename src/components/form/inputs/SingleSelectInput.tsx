import { colors } from "@/src/constants/colors";
import { ChevronDown, XCircle } from "lucide-react-native"; // Reset icon
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface Option {
  label: string;
  value: string | number;
}

interface DropdownProps {
  control: any;
  name: string;
  label: string;
  options: Option[];
  optional?: boolean;
  error?: any;
}

export default function SingleSelectInput({
  control,
  name,
  label,
  options,
  optional = false,
  error,
}: DropdownProps) {
  const [visible, setVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState }) => {
        const liveError = fieldState?.error || error;

        // Sync selected label with value
        useEffect(() => {
          const match = options.find((o) => o.value === value);
          setSelectedLabel(match ? match.label : "");
        }, [value]);

        return (
          <View style={{ marginBottom: 16 }}>
            {/* Input / Selector */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.neutral,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: colors.light,
              }}
              onPress={() => setVisible(true)}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: selectedLabel ? colors.dark : colors.dark,
                }}
              >
                {selectedLabel || `Select ${label} `}
                {!optional && (
                  <Text style={{ color: colors.error, fontSize: 16 }}> *</Text>
                )}
              </Text>
              <ChevronDown size={20} color={colors.dark} />
            </TouchableOpacity>

            {/* Error */}
            {liveError && (
              <Text style={{ fontSize: 12, marginTop: 4, color: colors.error }}>
                Required Field
              </Text>

            )}





            {/* Modal */}
            <Modal
              visible={visible}
              transparent
              animationType="fade"
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.overlay,
                }}
                activeOpacity={1}
                onPress={() => setVisible(false)}
              >
                {/* Custom Modal Container */}
                <View
                  style={{
                    width: "80%",
                    backgroundColor: colors.light,
                    borderRadius: 16,
                    maxHeight: 320,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                >
                  {/* Header with Reset Icon */}
                  <View
                    style={{
                      padding: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.neutral,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: colors.dark,
                      }}
                    >
                      {`Select `}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        onChange(""); // Reset value
                        setVisible(false);
                      }}
                    >
                      <XCircle size={24} color={colors.error} />
                    </TouchableOpacity>
                  </View>

                  {/* FlatList for Options */}
                  <FlatList
                    data={[...options]} // Add Reset option at the top
                    keyExtractor={(item, index) =>
                      item.value?.toString() || `reset-${index}`
                    }
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          paddingVertical: 16,
                          paddingHorizontal: 20,
                          borderBottomWidth: 1,
                          borderBottomColor: colors.neutral,
                        }}
                        onPress={() => {
                          onChange(item.value);
                          setVisible(false);
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: item.value === "" ? colors.primary : colors.dark,
                          }}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        );
      }}
    />
  );
}
