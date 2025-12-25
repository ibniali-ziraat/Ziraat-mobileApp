import { Text } from "react-native";
export default function RequiredLabel({ label }: { label: string }) {
  return (
    <CsText>
      {label} <CsText style={{ color: "red" }}>*</Text>
   </CsText>
  );
}
