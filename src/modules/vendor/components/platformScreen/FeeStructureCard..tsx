import CsText from "@/src/components/shared/CsText";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

export default function FeeStructureCard({ colors }) {
  return (
    <View className="mb-4">
      <CsText className="text-[17px] font-semibold text-gray-900 mb-3">
        Fee Structure
     </CsText>

      <View className="flex-row justify-between">

       
        <View
          className="w-[48%] p-4 rounded-2xl"
          style={{
            backgroundColor: colors.light,
            borderColor: colors.border,
            borderWidth: 1,
           
          }}
        >
          {/* Icon Row */}
          <View className="flex-row items-center mb-2">
            <View
              className="w-9 h-9 rounded-xl items-center justify-center mr-2"
              
            >
              <Ionicons
                name="cash-outline"
                size={22}
                color={colors.primary}
              />
            </View>

            <CsText className="text-black font-semibold text-[14px]">
              Cash Sales
           </CsText>
          </View>

          {/* Value */}
          <CsText
            className="text-[22px] font-bold"
            style={{ color: colors.primaryDark }}
          >
            2.0%
         </CsText>

          {/* Sub label */}
          <CsText className="text-[11px] text-black mt-1">
            Fee Scale • 3 mos
         </CsText>
        </View>

        {/* -------------------- CREDIT SALES -------------------- */}
        <View
          className="w-[48%] p-4 rounded-2xl"
          style={{
            backgroundColor: colors.light,
            borderColor: colors.border,
            borderWidth: 1,
           
          }}
        >
          {/* Icon Row */}
          <View className="flex-row items-center mb-2">
            <View
              className="w-9 h-9 rounded-xl items-center justify-center mr-2"
             
            >
              <MaterialCommunityIcons
                name="credit-card-outline"
                size={18}
                color={colors.secondaryDark}
              />
            </View>

            <CsText className="text-black font-semibold text-[14px]">
              Credit Sales
           </CsText>
          </View>

          {/* Value */}
          <CsText
            className="text-[22px] font-bold"
            style={{ color: colors.secondaryDark }}
          >
            4.0%
         </CsText>

          {/* Sub label */}
          <CsText className="text-[11px] text-black mt-1">
            Fee Scale • 5 mos
         </CsText>
        </View>

      </View>
    </View>
  );
}
