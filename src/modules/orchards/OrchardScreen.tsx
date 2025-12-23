import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import SearchBar from "@/src/components/shared/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View
} from "react-native";

const initialOrchards = [
  {
    id: "1",
    name: "Apple Orchard",
    acres: "10 Kanals 5 Marlas",
    trees: "2015",
    fruit: "Traditional",
    about: "Growing",
    location: "Srinagar, Pampore",
    season: "Zone 1",
    irrigation: "190001",
    soil: "BoundaryLink",
    lat: "34.1442",
    long: "74.7844",
    image: "https://images.pexels.com/photos/18510468/pexels-photo-18510468.jpeg"
  },
  {
    id: "2",
    name: "Mango Orchard",
    acres: "15 Kanals 2 Marlas",
    trees: "2013",
    fruit: "Traditional",
    about: "Owned",
    location: "Srinagar, tral",
    season: "Zone 2",
    irrigation: "190001",
    soil: "BoundaryLink",
    lat: "34.1442",
    long: "74.7844",
    image: "https://images.pexels.com/photos/2363345/pexels-photo-2363345.jpeg"
  },
  {
    id: "3",
    name: "Walnut Orchard",
    acres: "8 Kanals 2 Marlas",
    trees: "2019",
    fruit: "Traditional",
    about: "Owned",
    location: "Srinagar, tral",
    season: "Zone 2",
    irrigation: "190001",
    soil: "BoundaryLink",
    lat: "34.1442",
    long: "74.7844",
    image: "https://images.pexels.com/photos/3640631/pexels-photo-3640631.jpeg"
  },
  {
    id: "4",
    name: "Cherry Orchard",
    acres: "10 Kanals 4 Marlas",
    trees: "2014",
    fruit: "Traditional",
    about: "Growing",
    location: "Srinagar, pampore",
    season: "Zone 2",
    irrigation: "190001",
    soil: "BoundaryLink",
    lat: "34.1442",
    long: "74.7844",
    image: "https://images.pexels.com/photos/6314301/pexels-photo-6314301.jpeg"
  },
  {
    id: "5",
    name: "Appricot Orchard",
    acres: "10 Kanals 4 Marlas",
    trees: "2014",
    fruit: "Traditional",
    about: "Growing",
    location: "Srinagar, pampore",
    season: "Zone 2",
    irrigation: "190001",
    soil: "BoundaryLink",
    lat: "34.1442",
    long: "74.7844",
    image:
      "https://media.istockphoto.com/id/475992162/photo/apricots-ripen-on-the-tree.jpg?s=612x612&w=0"
  }
];

const Detail = ({ label, value }: { label: string; value?: string }) => (
  <View className="flex-row justify-between py-1">
    <CsText className="text-[14px] text-black font-medium">{label}</CsText>
    <CsText className="text-[12px] text-black font-semibold">
      {value || "-"}
   </CsText>
  </View>
);

export default function MyOrchardsScreen() {
  const [orchards] = useState(initialOrchards);

  const renderOrchard = ({ item }) => (
    <View className="bg-white rounded-2xl overflow-hidden mb-5 border border-neutral-200 shadow-sm">
      <Image
        source={{ uri: item.image }}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className="p-4">
        <View className="flex-row justify-between items-center mb-3">
          <CsText className="text-[18px] font-bold text-black">
            {item.name}
         </CsText>

          <View className="bg-secondary px-3 py-1 rounded-full">
            <CsText className="text-[12px] font-semibold text-white">
              {item.about}
           </CsText>
          </View>
        </View>

        <Detail label="Size" value={item.acres} />
        <Detail label="Establishment Year" value={item.trees} />
        <Detail label="Plantation Pattern" value={item.fruit} />
        <Detail label="Ownership Type" value={item.about} />

        <CsText className="text-xl font-bold text-black mt-4 mb-2">
          Address
       </CsText>
        <Detail label="District" value={item.location.split(",")[0]?.trim()} />
        <Detail label="Tehsil" value={item.location.split(",")[1]?.trim()} />
        <Detail label="Zone" value={item.season} />
        <Detail label="PIN Code" value={item.irrigation} />

        <CsText className="text-xl font-bold text-black mt-4 mb-2">
          Location
       </CsText>
        <Detail label="Latitude" value={item.lat} />
        <Detail label="Longitude" value={item.long} />
      </View>
    </View>
  );

  return (
    <ScreenLayout>
      <View className="flex-1">
        <FlatList
          data={orchards}
          renderItem={renderOrchard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 80,
            paddingTop: 4
          }}
          ListHeaderComponent={
            <View className="mb-3">
              <SearchBar />
            </View>
          }
        />

        <TouchableOpacity
          className="absolute bottom-4 right-4 bg-secondary w-14 h-14 rounded-full items-center justify-center"
          onPress={() => router.push("/BasicInfo")}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}