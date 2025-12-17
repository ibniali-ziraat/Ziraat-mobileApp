import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { Droplets, Edit, Trash2, Trees } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";

const sprayData = [
  {
    id: "1",
    name: "Methane",
    type: "Insecticide",
    brand: "Br Orgs",
    quantity: "2 g",
    price: "₹2000",
    date: "17 Apr 2025",
    orchardName: "Shaheen Bagh",
  
  },
  {
    id: "2",
    name: "Captain",
    type: "Fungicide",
    brand: "Merimain",
    quantity: "1 L",
    price: "₹1000",
    date: "21 Apr 2025",
    orchardName: "Delicious Bagh",
  },
  {
    id: "3",
    name: "Chlorine",
    type: "Herbicide",
    brand: "GreenCrop",
    quantity: "500 ml",
    price: "₹750",
    date: "01 May 2025",
    orchardName: "Kullu Bagh",
  },
  {
    id: "4",
    name: "Nitrogen",
    type: "Fertilizer",
    brand: "AgroPlus",
    quantity: "5 kg",
    price: "₹3200",
    date: "12 May 2025",
    orchardName: "Italy Bagh",
  },
  {
    id: "5",
    name: "Sulphur",
    type: "Pesticide",
    brand: "FarmSafe",
    quantity: "1 kg",
    price: "₹1500",
    date: "30 May 2025",
    orchardName: "Gala Bagh",
  },
];

const SprayScreen = () => {
  return (
<ScreenLayout>
  <FlatList
    data={sprayData}
    keyExtractor={(item) => item.id}
    scrollEnabled={false}   // 🔥 IMPORTANT FIX
    contentContainerStyle={{ paddingTop: 20 }}
    renderItem={({ item }) => (
      <View
        className="mb-5 p-5 rounded-2xl"
        style={{
          backgroundColor: colors.light,
          borderWidth: 1,
          borderColor: colors.primary,
        }}
      >
        {/* Top Row */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-2">
            <Droplets size={20} color={colors.secondary} />
            <Text
              className="text-lg font-bold"
              style={{ color: colors.neutral }}
            >
              {item.name}
            </Text>
          </View>

          <View
            className="px-4 py-2 rounded-full"
            style={{
              backgroundColor: colors.light,
              borderWidth: 1,
              borderColor: colors.neutral,
            }}
          >
            <Text
              className="text-sm font-bold"
              style={{ color: colors.secondary }}
            >
              {item.type}
            </Text>
          </View>
        </View>

        {/* Middle Row */}
        <View className="flex-row justify-between items-center mt-3">
          <View className="flex-row items-center gap-2">
            <Trees size={15} color={colors.secondary} />
            <Text
              className="text-md"
              style={{ color: colors.darkHover }}
            >
              {item.orchardName}
            </Text>
          </View>

          <Text
            className="text-lg font-semibold"
            style={{ color: colors.dark }}
          >
            {item.price}
          </Text>
        </View>

        {/* Bottom Row */}
        <View className="flex-row justify-between items-center mt-3">
          <Text
            className="text-sm "
            style={{ color: colors.darkHover }}
          >
            {item.brand} • {item.quantity}
          </Text>

          <Text
            className="text-sm"
            style={{ color: colors.darkHover }}
          >
            Date: {item.date}
          </Text>
        </View>

        {/* Actions */}
        <View className="flex-row justify-end items-center gap-3 mt-3">
          <Edit size={20} color={colors.neutral} />
          <Trash2 size={20} color={colors.error} />
        </View>
      </View>
    )}
  />
</ScreenLayout>

  );
};

export default SprayScreen;
