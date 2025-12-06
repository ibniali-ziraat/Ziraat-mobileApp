import { colors } from "@/src/constants/colors";
import { ChevronDown } from "lucide-react-native";
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
          <View className="mb-4">
            {/* Input / Selector */}
            <TouchableOpacity
              className="flex-row justify-between items-center border border-neutral rounded-lg px-4 py-4 bg-light"
              onPress={() => setVisible(true)}
              activeOpacity={0.8}
            >
              <Text
                className="text-base"
                style={{ color: selectedLabel ? colors.dark : colors.dark }}
              >
                {selectedLabel || `Select ${label} `}
                {!optional && (
                  <Text style={{ color: colors.dark, fontSize: 16 }}> *</Text>
                )}
              </Text>
              <ChevronDown size={20} color={colors.dark} />
            </TouchableOpacity>

            {/* Error */}
            {liveError && (
              <Text className="text-sm mt-1" style={{ color: colors.error }}>
                {liveError.message}
              </Text>
            )}

            {/* Modal */}
            <Modal
              visible={visible}
              transparent
              animationType="fade"
              onRequestClose={() => setVisible(false)}
            >
              <TouchableOpacity
                className="flex-1 justify-center items-center bg-overlay px-5"
                activeOpacity={1}
                onPress={() => setVisible(false)}
              >
                <View className="w-full bg-light rounded-xl max-h-80">
                  <FlatList
                    data={[{ label: "Reset", value: "" }, ...options]} // reset option
                    keyExtractor={(item, index) =>
                      item.value?.toString() || `reset-${index}`
                    }
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        className="py-4 px-5 border-b border-neutral"
                        onPress={() => {
                          onChange(item.value);
                          setVisible(false);
                        }}
                      >
                        <Text
                          className="text-base"
                          style={{
                            color:
                              item.value === null
                                ? colors.primary
                                : colors.dark,
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
