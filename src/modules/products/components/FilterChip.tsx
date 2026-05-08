import CsText from "@/src/components/shared/CsText";
import { Pressable } from "react-native";

export const FilterChip = ({ label }) => (
  <Pressable className="px-4 py-2 rounded-full border border-gray-300">
    <CsText>{label}</CsText>
  </Pressable>
);
