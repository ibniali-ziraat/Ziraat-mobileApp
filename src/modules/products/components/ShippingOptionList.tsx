import CsText from "@/src/components/shared/CsText";
import SHIPPING_OPTIONS from "@/src/data/shippingOptions.json";
import { FlatList, TouchableOpacity, View } from "react-native";

export default function ShippingOptionList({
  selectedOption,
  setSelectedOption,
}) {
  return (
    <FlatList
      data={SHIPPING_OPTIONS}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const isSelected = selectedOption?.id === item.id;

        return (
          <TouchableOpacity
            onPress={() => setSelectedOption(item)}
            className="p-4 mb-2  rounded-xl border border-light"
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-start gap-3">
                <View
                  className={`h-5 w-5 rounded-full border-2 ${isSelected ? "border-secondary" : "border-neutral"
                    } flex items-center justify-center`}
                >
                  {isSelected && (
                    <View className="h-2.5 w-2.5 bg-secondary rounded-full" />
                  )}
                </View>

                <View>
                  <CsText className="font-bold">{item.title}</CsText>
                  <CsText className="text-dark">{item.delivery}</CsText>
                </View>
              </View>

              <CsText className="text-secondary font-semibold">{item.price}</CsText>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
