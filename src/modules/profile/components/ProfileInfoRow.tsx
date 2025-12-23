import CsText from "@/src/components/shared/CsText";
import { View } from "react-native";

type ProfileInfoRowProps = {
  label: string;
  value?: string | number | null;
  isLast?: boolean;
};

export const ProfileInfoRow = ({
  label,
  value,
  isLast = false,
}: ProfileInfoRowProps) => {
  if (value === undefined || value === null || value === "") return null;

  return (
    <View
      className={`h-16 justify-between items-start py-2 ml-3 ${
        !isLast ? "border-b border-gray-200" : ""
      }`}
    >
      <CsText className="text-[13px] text-gray-500 font-medium">{label}</CsText>
      <CsText className="text-[14px] text-gray-900 font-semibold max-w-[55%] text-right">
        {value}
     </CsText>
    </View>
  );
};
