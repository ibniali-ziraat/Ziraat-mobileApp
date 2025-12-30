import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import orchardsData from "@/src/data/myOrchardsData.json";
import { orchardDetailImagesById } from "@/src/data/orchardDetailImages";
import { useLocalSearchParams } from "expo-router";
import { Image, View } from "react-native";
import AddressDetails from "../components/AddressDetails";
import BasicInformation from "../components/BasicInformation";
import CropAndNutrition from "../components/CropAndNutrition";
import FarmInfrastructure from "../components/FarmInfrastructure";
import FutureReadinessAndLinkages from "../components/FutureReadinessAndLinkages";
import GeoLocation from "../components/GeoLocation";
import InputCostDetails from "../components/InputCostDetails";
import PlantProtection from "../components/PlantProtection";
import ProductionAndMarketing from "../components/ProductionAndMarketing";
import SoilAndWater from "../components/SoilAndWater";
import VarietyAndPlanting from "../components/VarietyAndPlanting";

export default function OrchardDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const orchard = orchardsData.find((item) => item.id === String(id));
  if (!orchard) {
    return (
      <View className="flex-1 items-center justify-center">
        <CsText>Orchard not found</CsText>
      </View>
    );
  }
  //  const { progress, missingSections } = useProfileProgress({
  //     profile: profileData,
  //     address: addressData,
  //     education: educationData,
  //     profession: professionData,
  //   });
  const images = orchardDetailImagesById[String(orchard.id)];

  return (
    <ScreenLayout className="flex-1 bg-light">
      <BackHeader
        title="Orchard Details"
        desc="Detailed orchard profile and management information"
      />
      {/* {progress < 100 && (
              <ProfileProgressBar
                progress={progress}
                missingSections={missingSections}
                completedSections={[
                  "Profile",
                  "Address",
                  "Education",
                  "Profession",
                ].filter((s) => !missingSections.includes(s.toLowerCase()))}
              />
            )} */}

      {images && (
        <View className="flex-row w-full h-60 gap-1 overflow-hidden mt-3 mb-3">
          <Image
            source={images[0]}
            resizeMode="cover"
            className="w-[55%] h-full rounded-2xl"
          />

          <View className="w-[45%] h-full gap-2">
            <Image
              source={images[1]}
              resizeMode="cover"
              className="w-full flex-1 rounded-2xl"
            />

            <Image
              source={images[2]}
              resizeMode="cover"
              className="w-full flex-1 rounded-2xl"
            />
          </View>
        </View>
      )}

      <BasicInformation orchard={orchard} />

      <AddressDetails orchard={orchard} />

      <GeoLocation orchard={orchard} />

      <VarietyAndPlanting data={orchard.variety_and_planting_details} />

      <SoilAndWater data={orchard.soil_and_water_profile} />

      <CropAndNutrition data={orchard.crop_and_nutrition_management} />

      <PlantProtection data={orchard.plant_protection_and_health} />

      <FarmInfrastructure data={orchard.farm_infrastructure_and_resources} />

      <ProductionAndMarketing data={orchard.production_and_marketing} />

      <InputCostDetails data={orchard.input_cost_details} />

      <FutureReadinessAndLinkages
        data={orchard?.future_readiness_and_linkages}
      />
    </ScreenLayout>
  );
}
