import SearchBar from "@/src/components/shared/SearchBar";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import orchardsData from "@/src/data/myOrchardsData.json";
import { orchardImagesById } from "@/src/data/orchardImages";
import { router } from "expo-router";
import { MoreVertical } from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Detail = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => (
  <View className="flex-row justify-between py-1">
    <Text className="text-[14px] font-medium">{label}</Text>
    <Text className="text-[12px] text-black font-semibold">
      {value || "-"}
    </Text>
  </View>
);

export default function MyOrchardsScreen() {
  const [orchards] = useState(orchardsData);

  const renderOrchard = ({ item }: { item: any }) => {
    const imageSource = orchardImagesById[String(item.id)];

    return (
      
      <ZiraatCard
      width="100%"
        marginBottom={2}
        onPress={() =>
          router.push({
            pathname: "/orchards/orchard-detail",
            params: { id: item.id },
          })
        }
      >
        <View className="w-full relative">
          {imageSource && (
            <Image
              source={imageSource}
              className="w-full h-56 rounded-xl"
              resizeMode="cover"
            />
          )}

          {/* THREE DOTS (TOP RIGHT) */}
          <TouchableOpacity
            className="absolute top-3 right-0  bg-white p-2 mr-4 mt-2 rounded-full shadow z-50"
            onPress={() => {
              console.log("Three dots pressed for orchard:", item.id);
            }}
          >
            <MoreVertical size={20} color={colors.dark} />
          </TouchableOpacity>
        </View>

        {/* DETAILS */}
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[18px] font-bold text-black">
              {item.name}
            </Text>

            <View className="bg-secondary px-3 py-1 rounded-full">
              <Text className="text-[12px] font-semibold text-white">
                {item.about}
              </Text>
            </View>
          </View>

          <Detail label="Size" value={item.acres} />
          <Detail label="Establishment Year" value={item.trees} />
          <Detail label="Plantation Pattern" value={item.fruit} />
          <Detail label="Ownership Type" value={item.about} />
        </View>
      </ZiraatCard>
    );
  };

  return (
   <View className="bg-light">
   <FlatList
      data={orchards}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderOrchard}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 80 }}
      ListHeaderComponent={
        <View className="my-4 mx-1">
          <SearchBar />
        </View>
      }
    /></View> 
  );
}
