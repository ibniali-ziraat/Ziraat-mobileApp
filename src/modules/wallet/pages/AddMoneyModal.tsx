import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

import { colors } from "@/src/constants/colors";

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (amount: number) => void;
};

const AddMoneyModal = ({ visible, onClose, onAdd }: Props) => {
  const [amount, setAmount] = useState("500");

  const handleAdd = () => {
    const val = Number(amount);

    if (!val || val <= 0) return;

    onAdd(val);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: colors.overlay,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: colors.light,
            borderTopLeftRadius: 26,
            borderTopRightRadius: 26,
            padding: 24,
          }}
        >
          {/* Title */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: colors.neutral,
            }}
          >
            Add Money
          </Text>

          {/* Input */}
          <TextInput
            value={amount}
            onChangeText={(v) => setAmount(v.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#999"
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 12,
              padding: 12,
              marginTop: 12,
              fontSize: 16,
              color: colors.neutral,
            }}
          />

          {/* Button */}
          <Pressable
            onPress={handleAdd}
            activeOpacity={0.85}
            style={{
              backgroundColor: colors.primary,
              padding: 16,
              borderRadius: 14,
              marginTop: 14,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.light,
                fontWeight: "700",
                fontSize: 15,
              }}
            >
              Add ₹{amount || 0}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AddMoneyModal;
