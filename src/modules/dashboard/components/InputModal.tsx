// import CsText from "@/src/components/shared/CsText";
// import { X } from "lucide-react-native";
// import {
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   Pressable,
//   Text,
//   TextInput,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";

// export default function InputModal({
//   visible,
//   onClose,
//   fertilizer,
//   laborHours,
//   costInputs,
//   setFertilizer,
//   setLaborHours,
//   setCostInputs,
// }: any) {
//   return (
//     <Modal visible={visible} transparent animationType="fade">
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//         className="flex-1"
//       >
//         {/* BACKDROP */}
//         <TouchableWithoutFeedback onPress={onClose}>
//           <View className="flex-1 bg-black/40 justify-center px-5">
//             {/* STOP MODAL CLOSE WHEN PRESSING INSIDE */}
//             <TouchableWithoutFeedback>
//               <View className="bg-light rounded-3xl p-5 shadow-xl">
//                 {/* HEADER */}
//                 <View className="flex-row items-center justify-between mb-6">
//                   <CsText className="text-xl font-bold text-dark">
//                     Enter Field Inputs
//                   </CsText>

//                   <Pressable
//                     onPress={onClose}
//                     className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
//                   >
//                     <X size={20} color="#000" />
//                   </Pressable>
//                 </View>

//                 {/* INPUTS */}
//                 <InputField
//                   label="Fertilizer Consumption (kg/ha)"
//                   value={fertilizer}
//                   onChangeText={setFertilizer}
//                   placeholder="Enter fertilizer amount"
//                 />

//                 <InputField
//                   label="Labor Hours"
//                   value={laborHours}
//                   onChangeText={setLaborHours}
//                   placeholder="Enter labor hours"
//                 />

//                 <InputField
//                   label="Cost of Inputs (₹)"
//                   value={costInputs}
//                   onChangeText={setCostInputs}
//                   placeholder="Enter total cost"
//                 />

//                 {/* BUTTONS */}
//                 <View className="flex-row gap-3 mt-3">
//                   <Pressable
//                     onPress={onClose}
//                     className="flex-1 border border-gray-300 rounded-2xl py-4"
//                   >
//                     <Text className="text-center font-semibold text-dark">
//                       Cancel
//                     </Text>
//                   </Pressable>

//                   <Pressable
//                     className="flex-1 bg-secondary rounded-2xl py-4"
//                     onPress={onClose}
//                   >
//                     <CsText className="text-light text-center font-semibold">
//                       Apply
//                     </CsText>
//                   </Pressable>
//                 </View>
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// }

// const InputField = ({ label, ...props }: any) => (
//   <View className="mb-4">
//     <CsText className="text-dark font-semibold mb-2">{label}</CsText>

//     <TextInput
//       {...props}
//       keyboardType="numeric"
//       placeholderTextColor="#9CA3AF"
//       className="border border-gray-300 rounded-2xl px-4 py-4 bg-white text-dark"
//     />
//   </View>
// );

import CsText from "@/src/components/shared/CsText";
import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { X } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function InputModal({ visible, onClose }: any) {
  const methods = useForm({
    defaultValues: {
      fertilizer: "",
      laborHours: "",
      costInputs: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* BACKDROP */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="flex-1 bg-black/40 justify-center">
            {/* PREVENT CLOSE */}
            <TouchableWithoutFeedback>
              <View className="mx-5 max-h-[85%] bg-light rounded-3xl shadow-xl">
                {/* SCROLLABLE CONTENT */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 30,
                  }}
                >
                  {/* HEADER */}
                  <View className="flex-row items-center justify-between mb-6">
                    <CsText className="text-xl font-bold text-dark">
                      Enter Field Inputs
                    </CsText>

                    <Pressable
                      onPress={onClose}
                      className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
                    >
                      <X size={20} color="#000" />
                    </Pressable>
                  </View>

                  {/* FORM */}
                  <FormProvider {...methods}>
                    <FormTextInput
                      name="fertilizer"
                      label="Fertilizer Consumption (kg/ha)"
                      placeholder="Enter fertilizer amount"
                      required
                      type="age"
                    />

                    <FormTextInput
                      name="laborHours"
                      label="Labor Hours"
                      placeholder="Enter labor hours"
                      required
                      type="age"
                    />

                    <FormTextInput
                      name="costInputs"
                      label="Cost of Inputs (₹)"
                      placeholder="Enter total cost"
                      required
                      type="bankaccount"
                    />

                    {/* BUTTONS */}
                    <View className="flex-row gap-3 mt-3">
                      <Pressable
                        onPress={onClose}
                        className="flex-1 border border-gray-300 rounded-2xl py-4"
                      >
                        <Text className="text-center font-semibold text-dark">
                          Cancel
                        </Text>
                      </Pressable>

                      <Pressable
                        className="flex-1 bg-secondary rounded-2xl py-4"
                        onPress={methods.handleSubmit(onSubmit)}
                      >
                        <CsText className="text-light text-center font-semibold">
                          Apply
                        </CsText>
                      </Pressable>
                    </View>
                  </FormProvider>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}
