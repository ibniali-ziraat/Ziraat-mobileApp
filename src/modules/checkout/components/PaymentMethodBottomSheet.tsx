import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { Banknote, Check, CreditCard, Smartphone, Wallet, X } from "lucide-react-native";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

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

const ICONS: Record<string, typeof CreditCard> = {
  BuyOnCredit: CreditCard,
  CashOnDelivery: Banknote,
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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 justify-end bg-black/40">
        <Pressable onPress={onClose} className="flex-1" />

        <View
          className="rounded-t-3xl p-4"
          style={{
            backgroundColor: cardTokens.surface,
            maxHeight: height * 0.6,
            paddingBottom:
              Platform.OS === "ios"
                ? insets.bottom
                : insets.bottom > 0
                  ? insets.bottom
                  : 16,
          }}
        >
          <View
            className="w-10 h-1 rounded self-center mb-2.5"
            style={{ backgroundColor: cardTokens.hairline }}
          />

          <View className="flex-row justify-between items-center mb-2">
            <Text
              style={[
                typography.Poppins_m_semibold,
                { color: cardTokens.inkPrimary, fontSize: 17 },
              ]}
            >
              Select Payment Method
            </Text>

            <Pressable onPress={onClose} hitSlop={10}>
              <X size={22} color={cardTokens.inkSecondary} />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 8 }}
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const Icon = ICONS[option.value] ?? Wallet;
              const isLast = index === options.length - 1;

              return (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    onSelect(option.value);
                    onClose();
                  }}
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 14,
                    gap: 12,
                    borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
                    borderBottomColor: cardTokens.hairline,
                    backgroundColor: pressed ? cardTokens.mutedSurface : "transparent",
                  })}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isSelected
                        ? `${chartTokens.current}15`
                        : cardTokens.mutedSurface,
                    }}
                  >
                    <Icon
                      size={19}
                      color={isSelected ? chartTokens.current : cardTokens.inkSecondary}
                    />
                  </View>

                  <Text
                    style={[
                      typography.Poppins_s_medium,
                      { flex: 1, color: cardTokens.inkPrimary, fontSize: 15 },
                    ]}
                  >
                    {option.label}
                  </Text>

                  {isSelected && (
                    <Check size={20} color={chartTokens.current} strokeWidth={2.5} />
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
