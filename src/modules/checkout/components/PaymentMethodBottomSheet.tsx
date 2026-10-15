import { colors } from "@/src/constants/colors";
import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { getDashboardIcon, paymentArt } from "@/src/constants/iconArt";
import {
  Banknote,
  Check,
  CreditCard,
  LockKeyhole,
  Smartphone,
  X,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

export const PAYMENT_METHOD_DETAILS: Record<
  string,
  { description: string; accent: string }
> = {
  BuyOnCredit: {
    description: "Use your approved business credit limit",
    accent: colors.secondary,
  },
  CashOnDelivery: {
    description: "Pay safely when your order arrives",
    accent: colors.primary,
  },
  CoD: {
    description: "Pay safely when your order arrives",
    accent: colors.primary,
  },
  RazorPay: {
    description: "UPI, cards, net banking and wallets",
    accent: colors.primary,
  },
};

interface Option {
  label: string;
  value: string;
}

type Props = {
  visible: boolean;
  options: Option[];
  value?: string;
  onClose: () => void;
  onSelect: (value: string) => void;
};

export const PAYMENT_METHOD_ICONS: Record<string, typeof CreditCard> = {
  BuyOnCredit: CreditCard,
  CashOnDelivery: Banknote,
  CoD: Banknote,
  RazorPay: Smartphone,
};

export default function PaymentMethodBottomSheet({
  visible,
  options,
  value,
  onClose,
  onSelect,
}: Props) {
  const insets = useSafeAreaInsets();
  const [draftValue, setDraftValue] = useState(value ?? "");

  useEffect(() => {
    if (visible) setDraftValue(value ?? "");
  }, [value, visible]);

  const confirmSelection = () => {
    if (!draftValue) return;
    onSelect(draftValue);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: colors.overlay,
        }}
      >
        <Pressable
          onPress={onClose}
          style={{ flex: 1 }}
          accessibilityRole="button"
          accessibilityLabel="Close payment methods"
        />

        <View
          style={{
            maxHeight: height * 0.8,
            overflow: "hidden",
            backgroundColor: cardTokens.surface,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingBottom:
              Platform.OS === "ios"
                ? Math.max(insets.bottom, 14)
                : Math.max(insets.bottom, 18),
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 10,
              paddingBottom: 18,
              backgroundColor: cardTokens.surface,
              borderBottomWidth: 1,
              borderBottomColor: cardTokens.hairline,
            }}
          >
            <View
              style={{
                width: 42,
                height: 4,
                borderRadius: 2,
                alignSelf: "center",
                marginBottom: 16,
                backgroundColor: cardTokens.hairline,
              }}
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 14,
                  backgroundColor: cardTokens.mutedSurface,
                }}
              >
                <SvgXml
                  xml={getDashboardIcon("Wallet")}
                  width={28}
                  height={28}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    typography.Poppins_l_semibold,
                    {
                      color: cardTokens.inkPrimary,
                      fontSize: 20,
                      lineHeight: 27,
                    },
                  ]}
                >
                  Payment method
                </Text>
                <Text
                  style={[
                    typography.Poppins_xs_regular,
                    {
                      color: cardTokens.inkMuted,
                      fontSize: 12,
                      lineHeight: 18,
                      marginTop: 1,
                    },
                  ]}
                >
                  Choose the option that works best for you
                </Text>
              </View>

              <Pressable
                onPress={onClose}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Close payment methods"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: cardTokens.mutedSurface,
                }}
              >
                <X size={19} color={cardTokens.inkSecondary} />
              </Pressable>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 10,
            }}
          >
            <Text
              style={[
                typography.Poppins_s_semibold,
                {
                  color: cardTokens.inkSecondary,
                  fontSize: 11,
                  lineHeight: 16,
                  letterSpacing: 0.7,
                  marginBottom: 12,
                },
              ]}
            >
              AVAILABLE OPTIONS
            </Text>

            {options.map((option, index) => {
              const isSelected = option.value === draftValue;
              const art =
                paymentArt[option.value] ?? getDashboardIcon("Wallet");
              const details = PAYMENT_METHOD_DETAILS[option.value] ?? {
                description: "Continue with this payment option",
                accent: colors.primary,
              };

              return (
                <View key={option.value}>
                  <Pressable
                    onPress={() => setDraftValue(option.value)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={`${option.label}. ${details.description}`}
                    style={[
                      {
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        minHeight: 74,
                        paddingHorizontal: 0,
                        paddingVertical: 15,
                        backgroundColor: colors.light,
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: cardTokens.mutedSurface,
                      }}
                    >
                      <SvgXml xml={art} width={28} height={28} />
                    </View>

                    <View style={{ flex: 1, marginLeft: 14 }}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          numberOfLines={1}
                          style={[
                            typography.Poppins_s_semibold,
                            {
                              flex: 1,
                              color: cardTokens.inkPrimary,
                              fontSize: 14.5,
                              lineHeight: 21,
                              marginRight: 12,
                            },
                          ]}
                        >
                          {option.label}
                        </Text>

                        <View
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            alignItems: "center",
                            justifyContent: "center",
                            borderWidth: isSelected ? 0 : 1.5,
                            borderColor: cardTokens.hairline,
                            // One selection colour for every method: the
                            // brand green, not each method's accent.
                            backgroundColor: isSelected
                              ? colors.primary
                              : colors.light,
                          }}
                        >
                          {isSelected && (
                            <Check
                              size={14}
                              color={colors.light}
                              strokeWidth={3}
                            />
                          )}
                        </View>
                      </View>

                      <Text
                        numberOfLines={2}
                        style={[
                          typography.Poppins_xs_regular,
                          {
                            color: cardTokens.inkMuted,
                            fontSize: 11.5,
                            lineHeight: 16,
                            marginTop: 3,
                          },
                        ]}
                      >
                        {details.description}
                      </Text>
                    </View>
                  </Pressable>

                  {index < options.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        marginLeft: 58,
                        backgroundColor: cardTokens.hairline,
                      }}
                    />
                  )}
                </View>
              );
            })}
          </ScrollView>

          <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
            <Pressable
              onPress={confirmSelection}
              disabled={!draftValue}
              accessibilityRole="button"
              accessibilityState={{ disabled: !draftValue }}
              style={{
                width: "100%",
                height: 54,
                borderRadius: 17,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.primary,
                opacity: !draftValue ? 0.45 : 1,
              }}
            >
              <Text
                style={[
                  typography.Poppins_s_semibold,
                  { color: colors.light, fontSize: 15 },
                ]}
              >
                Use this payment method
              </Text>
            </Pressable>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                paddingTop: 11,
              }}
            >
              <LockKeyhole size={12} color={cardTokens.inkMuted} />
              <Text
                style={[
                  typography.Poppins_xs_regular,
                  { color: cardTokens.inkMuted, fontSize: 10.5 },
                ]}
              >
                Protected and securely processed
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
