import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function SalesFilters({
  salesFilters,
  activeFilter,
  setActiveFilter,
}) {
  return (
    <View className="mb-2 mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 4 }}
      >
        {salesFilters.map((f, index) => {
          const isActive = activeFilter === f;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.8}
              className="mr-2 rounded-full px-5 py-2"
              style={{
               
                shadowColor: isActive ? colors.secondary : "transparent",
                shadowOpacity: isActive ? 0.15 : 0,
                shadowRadius: isActive ? 6 : 0,
                shadowOffset: { width: 0, height: 2 },
                borderWidth: isActive ? 1.2 : 0,
                borderColor: isActive ? colors.secondary : "transparent",
              }}
            >
              <CsText
                className="text-sm font-semibold"
                style={{
                  color: isActive ? colors.secondary : colors.dark,
                  letterSpacing: 0.3,
                }}
              >
                {f}
             </CsText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
