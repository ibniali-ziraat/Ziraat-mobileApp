import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { X } from "lucide-react-native";
import {
  Modal,
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
  setCostInputs,
}: any) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* BACKDROP */}
      <View className="flex-1 items-center justify-center bg-black/20">
        {/* ZIRAAT POPUP CARD */}
        <ZiraatCard
          width="90%"
          height={380}
          paddingHorizontal={1}
          paddingVertical={1}
        >
          {/* HEADER */}
          <View className="flex-row justify-between items-center mb-4">
            <CsText className="text-xl font-bold text-dark">
              Enter Field Inputs
           </CsText>

            <TouchableOpacity onPress={onClose}>
              <X size={22} color="#000" />
            </TouchableOpacity>
          </View>

          {/* INPUTS */}
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

          {/* ACTION BUTTON */}
          <TouchableOpacity
            className="bg-secondary p-4 rounded-xl mt-3"
            onPress={onClose}
          >
            <CsText className="text-light text-center font-semibold">
              Apply & Calculate
           </CsText>
          </TouchableOpacity>
        </ZiraatCard>
      </View>
    </Modal>
  );
}

const InputField = ({ label, ...props }: any) => (
  <View className="mb-4">
    <CsText className="font-medium mb-1 text-dark">{label}</CsText>
    <TextInput
      {...props}
      keyboardType="numeric"
      className="border border-dark rounded-xl p-3 bg-light"
    />
  </View>
);
