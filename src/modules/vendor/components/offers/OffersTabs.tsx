import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { TouchableOpacity, View } from "react-native";

export default function OffersTabs({ tab, setTab }) {
  return (
    <View className="flex-row p-1 rounded-3xl">
      {[
        { key: "vendor", label: "Vendor Offers", border: colors.primary },
        { key: "platform", label: "Ziraat Offers", border: colors.secondary },
      ].map((item, index) => {
        const active = tab === item.key;

        return (
          <TouchableOpacity
            key={item.key}
            className="flex-1 py-3 rounded-2xl"
            onPress={() => setTab(item.key)}
            style={{
              borderWidth: 1,
              borderColor: item.border,
             

              
              marginRight: index === 0 ? 16 : 0, 
            }}
          >
            <CsText
              className="text-center"
              style={{
                fontWeight: active ? "700" : "500",
                color: item.border,
                fontSize: 14,
              }}
            >
              {item.label}
           </CsText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
