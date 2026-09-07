import { colors } from "@/src/constants/colors";
import { Check, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { LayoutAnimation, Platform, Text, UIManager, View } from "react-native";
import { Pressable } from "@/src/components/shared/Pressable";
import { SingleSelectInputProps } from "../../shared/inputs/types";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function DropdownSelectInput({
  name,
  label, // This is your "Select Payment Method" title
  options,
  placeholder = "Choose an option", // This is the internal hint
  onValueChange,
}: SingleSelectInputProps) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const selectedOption = options.find((o) => o.value === value);

        return (
          <View className="mb-4">
            {label && (
              <Text className="mb-2 text-[14px] font-semibold text-neutral-500">
                {label}
              </Text>
            )}

            <View
              className="overflow-hidden rounded-2xl border bg-white"
              style={{
                borderColor: error
                  ? "#ef4444"
                  : open
                    ? colors.primary
                    : colors.cardBorder,
                elevation: open ? 2 : 0,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
              }}
            >
              <Pressable
                onPress={toggleDropdown}
                style={({ pressed }) => ({
                  backgroundColor: pressed ? "#fcfcfc" : "white",
                })}
                className={`flex-row items-center justify-between px-4 py-4 ${
                  open ? "border-b border-neutral-100" : ""
                }`}
              >
                <Text
                  className={`text-[16px] ${!selectedOption ? "text-neutral-400" : "text-neutral-900 font-medium"}`}
                >
                  {selectedOption ? selectedOption.label : placeholder}
                </Text>

                <View
                  style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }}
                >
                  <ChevronDown
                    size={20}
                    color={open ? colors.primary : colors.darkHover}
                  />
                </View>
              </Pressable>

              {/* OPTIONS LIST */}
              {open && (
                <View className="bg-white">
                  {options.map((item, index) => {
                    const isSelected = item.value === value;
                    const isLast = index === options.length - 1;

                    return (
                      <Pressable
                        key={item.value}
                        onPress={() => {
                          onChange(item.value);
                          onValueChange?.(item.value);
                          toggleDropdown();
                        }}
                        style={({ pressed }) => ({
                          backgroundColor: isSelected
                            ? `${colors.primary}08`
                            : pressed
                              ? "#f9fafb"
                              : "transparent",
                        })}
                        className={`flex-row items-center justify-between px-5 py-4 ${
                          !isLast ? "border-b border-neutral-50" : ""
                        }`}
                      >
                        <Text
                          className={`text-base ${isSelected ? "font-bold" : "text-neutral-700"}`}
                          style={{
                            color: isSelected ? colors.primary : undefined,
                          }}
                        >
                          {item.label}
                        </Text>

                        {isSelected && (
                          <Check
                            size={18}
                            color={colors.primary}
                            strokeWidth={3}
                          />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>

            {/* ERROR FEEDBACK */}
            {error && (
              <Text className="mt-1.5 ml-1 text-xs font-medium text-red-500">
                {error.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
}
