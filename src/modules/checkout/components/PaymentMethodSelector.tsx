import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import PaymentMethodBottomSheet from "./PaymentMethodBottomSheet";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  onValueChange?: (value: string) => void;
}

export const PaymentMethodSelector = ({ options, onValueChange }: Props) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name="paymentMethod"
      render={({ field: { value, onChange } }) => {
        const selectedOption = options.find((o) => o.value === value);

        return (
          <View
            style={{
              marginHorizontal: 16,
              marginTop: 16,
              backgroundColor: cardTokens.surface,
              borderRadius: cardTokens.radius,
              borderCurve: "continuous",
              borderWidth: 1,
              borderColor: cardTokens.border,
              padding: 16,
            }}
          >
            <Text
              style={[
                typography.Poppins_s_bold,
                { color: cardTokens.inkPrimary, fontSize: 17, marginBottom: 12 },
              ]}
            >
              Payment Method
            </Text>

            <Pressable
              onPress={() => setOpen(true)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 14,
                paddingHorizontal: 16,
                borderRadius: 14,
                borderCurve: "continuous",
                borderWidth: 1,
                borderColor: cardTokens.border,
                backgroundColor: pressed ? cardTokens.mutedSurface : cardTokens.surface,
              })}
            >
              <Text
                style={[
                  typography.Poppins_s_medium,
                  {
                    fontSize: 15,
                    color: selectedOption ? cardTokens.inkPrimary : cardTokens.inkMuted,
                  },
                ]}
              >
                {selectedOption ? selectedOption.label : "Choose an option"}
              </Text>

              <ChevronDown size={19} color={cardTokens.inkSecondary} />
            </Pressable>

            <PaymentMethodBottomSheet
              visible={open}
              options={options}
              value={value}
              onClose={() => setOpen(false)}
              onSelect={(v) => {
                onChange(v);
                onValueChange?.(v);
              }}
            />
          </View>
        );
      }}
    />
  );
};
