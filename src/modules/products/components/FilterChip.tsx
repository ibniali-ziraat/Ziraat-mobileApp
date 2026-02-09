import CsText from "@/src/components/shared/CsText";
import { TouchableOpacity } from "react-native";

export const FilterChip = ({ label }) => (
  <TouchableOpacity className="px-4 py-2 rounded-full border border-gray-300">
    <CsText>{label}</CsText>
  </TouchableOpacity>
);
