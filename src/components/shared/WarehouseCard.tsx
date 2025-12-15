import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Animated, { FadeInLeft, FadeInUp } from "react-native-reanimated";

const warehouses = [
  {
    title: "Main Warehouse — Store #993",
    place: "Brooklyn, NY — 8000 sq.ft.",
    details: [
      { icon: "home-outline", label: "Primary Storage" },
      { icon: "call-outline", label: "+90 555 345 7890" },
      { icon: "car-sport-outline", label: "4 Delivery Vehicles" },
    ],
  },
  {
    title: "Secondary Cold Storage",
    place: "Queens, NY — 3000 sq.ft.",
    details: [
      { icon: "snow-outline", label: "Refrigerated Facility" },
      { icon: "call-outline", label: "+90 555 657 1123" },
      { icon: "bus-outline", label: "2 Refrigerated Vans" },
    ],
  },
];

export default function WarehouseCard() {
  return (
    <Animated.View
      entering={FadeInUp.duration(650)}
      className="mt-4 "
      
    >
      {/* Header */}
      <View className="flex-row justify-between items-center "
        
      >
        <View>
          <Text className="text-lg font-extrabold" style={{ color: colors.dark }}>
            Warehouses & Contacts
          </Text>
          <Text className="text-[11px] mt-[3px]" style={{ color: colors.dark }}>
            Total Facilities: {warehouses.length}
          </Text>
        </View>

        <View
          className="w-10 h-10 rounded-xl items-center justify-center"
         
        >
          <Ionicons name="business-outline" size={22} color={colors.primary} />
        </View>
      </View>

      {/* Warehouse Cards */}
      {warehouses.map((w, index) => (
        <Animated.View
          key={index}
          entering={FadeInLeft.delay(index * 120)}
          className="mt-5 p-4  rounded-xl mb-3 "
             style={{
        backgroundColor: "#fff",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
         }} 
        >
          {/* Title */}
          <Text className="font-bold text-base" style={{ color: colors.dark }}>
            {w.title}
          </Text>

          {/* Place */}
          <Text
            className="text-sm mt-[3px]"
            style={{ color: colors.primary}}
          >
            {w.place}
          </Text>

          

          {/* Details */}
          {w.details.map((item, i) => (
            <View key={i} className="flex-row items-center mt-2">
              <View
                className="w-7 h-7 rounded-lg items-center justify-center"
                
              >
                <Ionicons name={item.icon} size={16} color={colors.secondary} />
              </View>

              <Text className="ml-3 text-sm" style={{ color: colors.dark }}>
                {item.label}
              </Text>
            </View>
          ))}
        </Animated.View>
      ))}

      
    </Animated.View>
  );
}
