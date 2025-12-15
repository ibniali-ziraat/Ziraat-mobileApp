import { X } from "lucide-react-native";
import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";


export default function InputModal({
  visible,
  onClose,
  fertilizer,
  laborHours,
  costInputs,
  setFertilizer,
  setLaborHours,
  setCostInputs
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black justify-end">
        <View className="bg-light rounded-t-3xl p-5">

          <View className="flex-row justify-between mb-4">
            <Text className="text-xl font-bold">Enter Field Inputs</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={22} />
            </TouchableOpacity>
          </View>

          <InputField
            label="Fertilizer Consumption (kg/ha)"
            value={fertilizer}
            onChangeText={setFertilizer}
          />

          <InputField
            label="Labor Hours"
            value={laborHours}
            onChangeText={setLaborHours}
          />

          <InputField
            label="Cost of Inputs (₹)"
            value={costInputs}
            onChangeText={setCostInputs}
          />

          <TouchableOpacity
            className="bg-secondary p-4 rounded-xl mt-3"
            onPress={onClose}
          >
            <Text className="text-white text-center font-semibold">
              Apply & Calculate
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const InputField = ({ label, ...props }) => (
  <View className="mb-4">
    <Text className="font-medium mb-1">{label}</Text>
    <TextInput
      {...props}
      keyboardType="numeric"
      className="border rounded-xl p-3"
    />
  </View>
);
