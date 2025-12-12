import { colors } from "@/src/constants/colors";
import { ChevronDown, RefreshCcw, RefreshCcwDot, XCircle } from "lucide-react-native"; // Reset icon
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
      defaultValue="" // ensures initial prefill works
      render={({ field: { value, onChange }, fieldState }) => {
        const liveError = fieldState?.error || error;

        // Sync selected label with value
        useEffect(() => {
          const match = options.find((o) => o.value === value);
          setSelectedLabel(match ? match.label : "");
        }, [value, options]);

        return (
          <View style={{ marginBottom: 16 }}>

            <Text
              style={{
                marginBottom: 6,
                fontSize: 14,
                fontWeight: "500",
                color: colors.dark,
              }}
            >
              {label} {!optional && <Text style={{ color: colors.error }}> *</Text>}
            </Text>
            {/* Input / Selector */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderWidth: 1,
                borderColor: liveError ? colors.error : colors.neutral,
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
                  color: selectedLabel ? colors.dark : colors.dark, // placeholder gray
                }}
              >
                {selectedLabel || `Select ${label}`}
                {!optional && !selectedLabel && (
                  <Text style={{ color: colors.error }}> *</Text>
                )}
              </Text>
            </TouchableOpacity>

            {liveError && (
              <Text style={{ fontSize: 12, marginTop: 4, color: colors.error }}>
                {"Required Field"}
              </Text>

            )}





            {/* Modal */}
            <Modal visible={visible} transparent animationType="fade">
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
                  {/* Header */}
                  <View
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.neutral,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    {/* Title */}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: colors.dark,
                      }}
                    >
                      Select                    </Text>

                    {/* RIGHT ICONS */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>

                      {/* RESET (refresh) */}
                      <TouchableOpacity
                        onPress={() => {
                          onChange("");
                          setSelectedLabel("");
                          setVisible(false);
                        }}
                        style={{
                          padding: 6,            // better hit area
                          marginRight: 6,
                        }}
                      >
                        <RefreshCcw size={20} color={colors.primary} />
                      </TouchableOpacity>

                      {/* Vertical divider */}
                      <View
                        style={{
                          width: 1,
                          height: 20,
                          backgroundColor: colors.neutral,
                          marginHorizontal: 6,
                        }}
                      />

                      {/* CLOSE */}
                      <TouchableOpacity
                        onPress={() => setVisible(false)}
                        style={{ padding: 6 }}   // better hit area
                      >
                        <XCircle size={20} color={colors.error} />
                      </TouchableOpacity>

                    </View>
                  </View>



                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value.toString()}
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
                            color: item.value === value ? colors.primary : colors.dark,
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

