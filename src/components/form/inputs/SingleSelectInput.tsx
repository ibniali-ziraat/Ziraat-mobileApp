import { colors } from "@/src/constants/colors";
import { RefreshCcw, XCircle, Search } from "lucide-react-native";
import { useEffect, useState, useMemo, useRef } from "react";
import { Controller } from "react-hook-form";
import {
  Animated,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { HelperText } from "react-native-paper";

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
  modalLabel?: string;
  onValueChange?: (value: string | number) => void;
  disabled?: boolean;
  searchable?: boolean;
}

export default function SingleSelectInput({
  control,
  name,
  label,
  options,
  optional = false,
  error,
  modalLabel = "",
  onValueChange,
  disabled = false,
  searchable = false,
}: DropdownProps) {
  const [visible, setVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [searchText, setSearchText] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchText) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [options, searchText, searchable]);

  const showSearchBar = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const hideSearchBar = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setSearchText(""));
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange }, fieldState }) => {
        const liveError = fieldState?.error || error;

        useEffect(() => {
          const match = options.find((o) => o.value === value);
          setSelectedLabel(match ? match.label : "");
        }, [value, options]);

        return (
          <View style={{ marginBottom: 16 }}>
            {/* Label */}
            {(!modalLabel || modalLabel === "") && (
              <Text
                style={{
                  marginBottom: 6,
                  fontSize: 14,
                  fontWeight: "500",
                  color: colors.dark,
                }}
              >
                {label}{" "}
                {!optional && <Text style={{ color: colors.error }}> *</Text>}
              </Text>
            )}

            {/* Selector */}
            <TouchableOpacity
              disabled={disabled}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderWidth: liveError ? 2 : 1,
                borderColor: liveError
                  ? colors.error
                  : disabled
                    ? colors.neutral + "88"
                    : colors.neutral,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: colors.light,
              }}
              onPress={() => {
                if (!disabled) {
                  setVisible(true);
                  if (searchable) showSearchBar();
                }
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: disabled ? colors.neutral + "88" : colors.dark,
                }}
              >
                {selectedLabel || `Select ${label}`}
                {!optional && !selectedLabel && !disabled && (
                  <Text style={{ color: colors.error }}> *</Text>
                )}
              </Text>
            </TouchableOpacity>

            {/* Error */}
            {liveError && (
              <HelperText type="error" visible style={{ color: colors.error }}>
                Required Field
              </HelperText>
            )}

            {/* Modal */}
            {!disabled && (
              <Modal visible={visible} transparent animationType="fade">
                <Pressable
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.overlay,
                  }}
                  onPress={() => {
                    setVisible(false);
                    hideSearchBar();
                  }}
                >
                  <View
                    style={{
                      width: "80%",
                      backgroundColor: colors.light,
                      borderRadius: 16,
                      maxHeight: 400,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                      paddingBottom: 12,
                    }}
                  >
                    {/* Header */}
                    <View
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 12,
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
                        {modalLabel ? label : ""}
                      </Text>

                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            onChange("");
                            if (onValueChange) onValueChange("");
                            setSelectedLabel("");
                            setVisible(false);
                            hideSearchBar();
                          }}
                          style={{ padding: 6, marginRight: 6 }}
                        >
                          <RefreshCcw size={20} color={colors.primary} />
                        </TouchableOpacity>

                        <View
                          style={{
                            width: 1,
                            height: 20,
                            backgroundColor: colors.neutral,
                            marginHorizontal: 6,
                          }}
                        />

                        <TouchableOpacity
                          onPress={() => {
                            setVisible(false);
                            hideSearchBar();
                          }}
                          style={{ padding: 6 }}
                        >
                          <XCircle size={20} color={colors.error} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Search Bar */}
                    {searchable && (
                      <Animated.View style={{ opacity: fadeAnim }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: 12,
                            borderWidth: 1,
                            borderColor: colors.neutral,
                            borderRadius: 8,
                            backgroundColor: colors.light,
                            paddingHorizontal: 8,
                          }}
                        >
                          <Search size={20} color={colors.neutral} />
                          <TextInput
                            value={searchText}
                            onChangeText={setSearchText}
                            placeholder={`Search ${label}`}
                            style={{
                              flex: 1,
                              paddingVertical: 8,
                              paddingHorizontal: 8,
                              fontSize: 16,
                              color: colors.dark,
                            }}
                          />
                        </View>
                      </Animated.View>
                    )}

                    {/* Options List */}
                    <FlatList
                      data={filteredOptions}
                      keyExtractor={(item) => item.value.toString()}
                      keyboardShouldPersistTaps="handled" // <--- KEY FIX
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          style={{
                            paddingTop:
                              index === filteredOptions.length - 1 ? 16 : 16,
                            paddingBottom:
                              index === filteredOptions.length - 1 ? 8 : 16,
                            paddingHorizontal: 20,
                            borderBottomWidth:
                              index === filteredOptions.length - 1 ? 0 : 1,
                            borderBottomColor: colors.neutral,
                          }}
                          onPress={() => {
                            onChange(item.value);
                            if (onValueChange) onValueChange(item.value);
                            setVisible(false);
                            hideSearchBar();
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color:
                                item.value === value
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
                </Pressable>
              </Modal>
            )}
          </View>
        );
      }}
    />
  );
}
