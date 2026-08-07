import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ChevronRight, Wallet } from "lucide-react-native";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import PaymentMethodBottomSheet, {
  PAYMENT_METHOD_ICONS,
  PAYMENT_METHOD_DETAILS,
} from "./PaymentMethodBottomSheet";

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
        const DisplayIcon = selectedOption
          ? (PAYMENT_METHOD_ICONS[selectedOption.value] ?? Wallet)
          : Wallet;
        const selectedDetails = selectedOption
          ? PAYMENT_METHOD_DETAILS[selectedOption.value]
          : undefined;

        return (
          <View style={{ marginHorizontal: 16, marginTop: 16 }}>
            <View
              style={{
                backgroundColor: cardTokens.surface,
                borderRadius: cardTokens.radius,
                borderWidth: 1,
                borderColor: cardTokens.border,
                padding: 16,
              }}
            >
              <Text
                style={[
                  typography.Poppins_s_bold,
                  { color: cardTokens.inkPrimary, fontSize: 17 },
                ]}
              >
                Payment Method
              </Text>

              <Pressable
                onPress={() => setOpen(true)}
                accessibilityRole="button"
                accessibilityLabel="Choose payment method"
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 14,
                  paddingTop: 14,
                  borderTopWidth: 1,
                  borderTopColor: cardTokens.hairline,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: cardTokens.mutedSurface,
                  }}
                >
                  <DisplayIcon
                    size={19}
                    color={selectedDetails?.accent ?? colors.primary}
                  />
                </View>

                <View style={{ flex: 1, marginLeft: 12, marginRight: 10 }}>
                  <Text
                    numberOfLines={1}
                    style={[
                      typography.Poppins_s_semibold,
                      {
                        color: selectedOption
                          ? cardTokens.inkPrimary
                          : cardTokens.inkSecondary,
                        fontSize: 14.5,
                        lineHeight: 21,
                      },
                    ]}
                  >
                    {selectedOption
                      ? selectedOption.label
                      : "Choose a payment option"}
                  </Text>

                  <Text
                    numberOfLines={2}
                    style={[
                      typography.Poppins_xs_regular,
                      {
                        marginTop: 3,
                        fontSize: 11.5,
                        lineHeight: 17,
                        color: cardTokens.inkMuted,
                      },
                    ]}
                  >
                    {selectedDetails?.description ??
                      "Select how you would like to pay for this order"}
                  </Text>
                </View>

                <ChevronRight size={19} color={cardTokens.inkSecondary} />
              </Pressable>
            </View>

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
