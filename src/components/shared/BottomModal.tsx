import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import CsText from "./CsText";

export default function BottomModal({ title, onClose }) {
  return (
    <View className="flex-1 bg-black/40 justify-end">
      <Animated.View entering={FadeInUp} className="bg-white rounded-t-2xl p-5">
        <CsText className="text-lg font-bold mb-3">{title}</CsText>

        {["GST Verified", "PAN Verified", "Bank Linked", "Aadhaar Linked"].map(
          (item, i) => (
            <View key={i} className="flex-row items-center mt-3">
              <Ionicons name="checkbox-outline" size={20} color="#2d6b06" />
              <CsText className="ml-2 text-gray-700">{item}</CsText>
            </View>
          ),
        )}

        <Pressable
          onPress={onClose}
          className="mt-6 bg-primary py-3 rounded-xl items-center"
        >
          <CsText className="text-white font-semibold text-sm">Done</CsText>
        </Pressable>
      </Animated.View>
    </View>
  );
}
