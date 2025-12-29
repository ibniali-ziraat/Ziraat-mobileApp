import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import SearchBar from "@/src/components/shared/SearchBar";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import orchardsData from "@/src/data/myOrchardsData.json";
import { orchardImagesById } from "@/src/data/orchardImages";
import { router } from "expo-router";
import { MoreVertical } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";

const Detail = ({ label, value }: { label: string; value?: string }) => (
  <View className="flex-row justify-between py-1">
    <CsText style={typography.Poppins_xs_medium}>{label}</CsText>
    <CsText style={typography.Poppins_xs_regular}>{value || "-"}</CsText>
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
        {/* IMAGE */}
        <View className="w-full relative">
          {imageSource && (
            <Image
              source={imageSource}
              className="w-full h-56 rounded-xl"
              resizeMode="cover"
            />
          )}

          <TouchableOpacity className="absolute top-3 right-0 bg-light p-2 mr-4 mt-2 rounded-full shadow z-50">
            <MoreVertical size={20} color={colors.dark} />
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
        <View className="p-4">
          {/* Title & Badge */}
          <View className="flex-row justify-between items-center mb-3">
            <CsText style={typography.Poppins_m_semibold}>{item.name}</CsText>

            <View className="bg-secondary px-3 py-1 rounded-full">
              <CsText
                className="text-light"
                style={typography.caption_xs_semibold}
              >
                {item.about}
              </CsText>
            </View>
          </View>

          {/* Details */}
          <Detail label="Size" value={item.acres} />
          <Detail label="Establishment Year" value={item.trees} />
          <Detail label="Plantation Pattern" value={item.fruit} />
          <Detail label="Ownership Type" value={item.about} />
        </View>
      </ZiraatCard>
    );
  };

  return (
    <ScreenLayout scrollable={false}>
      <View className="bg-light">
        <FlatList
          data={orchards}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderOrchard}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ paddingBottom: 80 }}
          ListHeaderComponent={
            <View className="my-4 mx-1">
              <SearchBar />
            </View>
          }
        />
      </View>
    </ScreenLayout>
  );
}
