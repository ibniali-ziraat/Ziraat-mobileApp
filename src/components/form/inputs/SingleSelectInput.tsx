import { colors } from "@/src/constants/colors";
import { RefreshCcw, Search, XCircle } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Animated,
  FlatList,
  Modal,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { HelperText } from "react-native-paper";
import CsText from "../../shared/CsText";

interface Option {
  label: string;
  value: string | number;
}

interface DropdownProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  options: Option[];
  optional?: boolean;
  error?: any;
  modalLabel?: string;
  onValueChange?: (value: string | number) => void;
  disabled?: boolean;
  searchable?: boolean;
  showInputLabel?: boolean;
}

export default function SingleSelectInput({
  control,
  name,
  label,
  options,
  optional = false,
  error,
  modalLabel = "Select",
  showInputLabel = true,
  onValueChange,
  disabled = false,
  searchable = false,
  placeholder = label,
}: DropdownProps) {
  const [visible, setVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [searchText, setSearchText] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchText) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(searchText.toLowerCase()),
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
            {showInputLabel && (
              <CsText
                style={{
                  marginBottom: 6,
                  fontSize: 14,
                  fontWeight: "500",
                  color: colors.dark,
                }}
              >
                {label}
                {!optional && (
                  <CsText style={{ color: colors.error }}> *</CsText>
                )}
              </CsText>
            )}

            {/* Selector */}
            <Pressable
              disabled={disabled}
              style={{
                borderWidth: liveError ? 1 : 1,
                borderColor: liveError
                  ? colors.error
                  : disabled
                    ? colors.darkHover
                    : colors.darkHover,
                paddingHorizontal: 16,
                paddingVertical: 14,
                backgroundColor: colors.light,
                borderRadius: 10,
              }}
              onPress={() => {
                if (!disabled) {
                  setVisible(true);
                  if (searchable) showSearchBar();
                }
              }}
            >
              <CsText
                style={{
                  fontSize: 16,
                  color: disabled ? colors.neutral + "88" : colors.darkHover,
                }}
              >
                {selectedLabel || placeholder}
              </CsText>
            </Pressable>

            {liveError && (
              <HelperText
                type="error"
                visible
                style={{ color: colors.error, paddingHorizontal: 0 }}
              >
                Required Field
              </HelperText>
            )}

            {/* Modal */}
            {!disabled && (
              <Modal visible={visible} transparent animationType="slide">
                <View
                  style={{
                    flex: 1,
                    backgroundColor: colors.overlay,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* Backdrop */}
                  <Pressable
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                    }}
                    onPress={() => {
                      setVisible(false);
                      hideSearchBar();
                    }}
                  />

                  {/* Modal Content */}
                  <View
                    pointerEvents="box-none"
                    style={{
                      width: "80%",
                      backgroundColor: colors.light,
                      borderRadius: 16,
                      maxHeight: 400,
                      elevation: 5,
                      paddingBottom: 12,
                    }}
                  >
                    {/* Header */}
                    <View
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <CsText style={{ fontSize: 16, fontWeight: "500" }}>
                        {modalLabel}
                      </CsText>

                      <View style={{ flexDirection: "row" }}>
                        <Pressable
                          onPress={() => {
                            onChange("");
                            onValueChange?.("");
                            setSelectedLabel("");
                            // hideSearchBar();
                          }}
                          style={{ padding: 6 }}
                        >
                          <RefreshCcw size={20} color={colors.primary} />
                        </Pressable>

                        <Pressable
                          onPress={() => {
                            setVisible(false);
                            hideSearchBar();
                          }}
                          style={{ padding: 6 }}
                        >
                          <XCircle size={20} color={colors.error} />
                        </Pressable>
                      </View>
                    </View>

                    {/* Search */}
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
                            paddingHorizontal: 8,
                          }}
                        >
                          <Search size={18} color={colors.neutral} />
                          <TextInput
                            value={searchText}
                            onChangeText={setSearchText}
                            placeholder={`Search ${label}`}
                            underlineColorAndroid="transparent"
                            selectionColor="transparent"
                            style={{
                              flex: 1,
                              paddingVertical: 8,
                              paddingHorizontal: 8,
                              fontSize: 16,
                              color: colors.dark,
                              backgroundColor: "transparent",
                              borderWidth: 0,
                            }}
                          />
                        </View>
                      </Animated.View>
                    )}

                    {/* Options */}
                    <FlatList
                      data={filteredOptions}
                      keyExtractor={(item) => item.value.toString()}
                      keyboardShouldPersistTaps="handled"
                      renderItem={({ item }) => (
                        <Pressable
                          style={{
                            padding: 16,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.neutral,
                          }}
                          onPress={() => {
                            onChange(item.value);
                            onValueChange?.(item.value);
                            setVisible(false);
                            hideSearchBar();
                          }}
                        >
                          <CsText
                            style={{
                              fontSize: 16,
                              color:
                                item.value === value
                                  ? colors.primary
                                  : colors.dark,
                            }}
                          >
                            {item.label}
                          </CsText>
                        </Pressable>
                      )}
                    />
                  </View>
                </View>
              </Modal>
            )}
          </View>
        );
      }}
    />
  );
}
