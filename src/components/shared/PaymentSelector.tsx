import { colors } from "@/src/constants/colors";
import { Check, ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import CsText from "./CsText";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit/Debit Card" },
  { id: "upi", label: "UPI" },
  { id: "netbanking", label: "Net Banking" },
  { id: "cod", label: "Cash on Delivery" },
];

export default function PaymentSelector({
  availability,
  selectedOption,
  paymentMethod,
  setPaymentMethod,
}) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <View className="my-2">
      {/* Selector Button */}
      <Pressable
        onPress={() => setOpenDropdown(!openDropdown)}
        className="flex-row items-center justify-between px-4 py-3 rounded-xl border border-dark bg-white"
      >
        <CsText className="text-dark font-semibold text-lg">
          {paymentMethod
            ? PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.label
            : "Select Payment Method"}
        </CsText>
        {openDropdown ? (
          <ChevronUp size={20} color={colors.dark} />
        ) : (
          <ChevronDown size={20} color={colors.dark} />
        )}
      </Pressable>

      {/* Dropdown */}
      {openDropdown && (
        <View className="mt-2 rounded-xl border border-neutral bg-white shadow-lg overflow-hidden">
          <FlatList
            data={PAYMENT_METHODS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = item.id === paymentMethod;
              return (
                <Pressable
                  onPress={() => {
                    setPaymentMethod(item.id);
                    setOpenDropdown(false);
                  }}
                  className={`flex-row items-center justify-between px-4 py-3 ${
                    isSelected ? "bg-light" : ""
                  }`}
                >
                  <CsText
                    className={`text-dark ${isSelected ? "font-semibold" : ""}`}
                  >
                    {item.label}
                  </CsText>
                  {isSelected && <Check size={18} color={colors.primary} />}
                </Pressable>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
