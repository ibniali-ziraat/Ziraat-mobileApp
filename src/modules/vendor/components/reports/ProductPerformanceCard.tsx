import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function ProductPerformanceCard({ data }) {
  return (
    <View
      className=" rounded-2xl mb-4"
      style={{
      

        shadowRadius: 6,
        
      }}
    >
      {/* TITLE */}
      <CsText className="text-lg font-bold text-gray-900 mb-5">
        Pesticide Performance
     </CsText>

      {data.map((p, i) => {
        // Trend Logic
        let trendIcon = "arrow-up";
        let trendColor = colors.primary;
        let trendLabel = "High Demand";

        if (p.units < 200) {
          trendIcon = "arrow-down";
          trendColor = "red";
          trendLabel = "Low Demand";
        } else if (p.units < 320) {
          trendIcon = "remove-outline";
          trendColor = "#777";
          trendLabel = "Stable";
        }

        // Performance percent for bar
        const performancePercent = Math.min(
          Math.round((p.units / 400) * 100),
          100
        );

        return (
          <View
            key={i}
            className="p-4 rounded-2xl mb-4"
            style={{
              backgroundColor:"#fff",
       borderColor:"#e5e7eb",
       borderWidth:1,
            }}
          >
            <View className="flex-row items-center justify-between">
              {/* LEFT SIDE */}
              <View className="flex-row items-center flex-1">
                {/* Accent strip */}
                <View
                  style={{
                    width: 5,
                    height: "90%",
                    backgroundColor: colors.primary,
                    borderRadius: 4,
                    marginRight: 12,
                  }}
                />

                {/* Icon bubble */}
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center"
                 
                >
                  <Ionicons name="leaf-outline" size={22} color={colors.secondary} />
                </View>

                <View>
                  <CsText className="text-gray-900 font-semibold text-sm">
                    {p.name}
                 </CsText>
                  <CsText className="text-xs text-black mt-0.5">
                    {p.units} units sold
                 </CsText>
                </View>
              </View>

              {/* RIGHT SIDE */}
              <View className="items-end">
                {/* Rating */}
                <View
                  className="px-3 py-1 rounded-full mb-1"
                  style={{
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#e3e3e3",
                  }}
                >
                  <CsText
                    className="text-sm font-semibold"
                    style={{ color: colors.secondary }}
                  >
                    ★ {p.rating}
                 </CsText>
                </View>

                {/* Trend */}
                <View className="flex-row items-center">
                  <Ionicons
                    name={trendIcon}
                    size={16}
                    color={trendColor}
                    style={{ marginRight: 4 }}
                  />

                  <CsText
                    className="text-xs font-semibold"
                    style={{ color: trendColor }}
                  >
                    {trendLabel}
                 </CsText>
                </View>
              </View>
            </View>

          
          </View>
        );
      })}
    </View>
  );
}
