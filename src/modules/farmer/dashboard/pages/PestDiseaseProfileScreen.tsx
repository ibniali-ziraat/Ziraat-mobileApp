import CustomBarChart from "@/src/components/charts/CustomBarChart";
import BackHeader from "@/src/components/shared/BackHeader";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { statTileData } from "@/src/Data/statTileData";
import StatTile from "@/src/modules/farmer/dashboard/pages/components/StatTile";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";

export default function PestDiseaseProfile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sprayInput, setSprayInput] = useState("");

  const renderIcon = (item: any) => {
    if (item.iconFamily === "MaterialCommunityIcons") {
      return (
        <MaterialCommunityIcons
          name={item.icon}
          size={30}
          color={colors.secondary}
        />
      );
    }

    return <Ionicons name={item.icon} size={30} color={colors.secondary} />;
  };

  return (
   
    <ScrollView className="flex-1 bg-light">

      <BackHeader title="Pest & Disease Profile"
      desc="Real-time tracking and risk analytics to manage orchard health." />
      


      {statTileData.map((item) => {
        const tile = (
          <StatTile
            key={item.id}
            title={item.title}
            value={item.value}
            footer={item.footer}
            icon={renderIcon(item)}
          />
        );

        if (item.isClickable) {
          return (
            <Pressable key={item.id} onPress={() => setModalVisible(true)}>
              {tile}
            </Pressable>
          );
        }

        return tile;
      })}

      <Text className="text-2xl font-bold my-2">High-Risk Pests Identified</Text>

      <ZiraatCard width="100%" height="6%" paddingHorizontal={1}
      paddingVertical={1} marginBottom={1}>
        
        <Text className="text-lg font-semibold">1. Codling Moth</Text>
        <Text className="text-dark mt-1">
          Humidity & temperature favour rapid development. Trap counts rising.
        </Text>
        <Text className="text-sm text-primary mt-2">
          Recommended: Chlorantraniliprole
        </Text>
    </ZiraatCard>

      <ZiraatCard width="100%" height="6%" paddingHorizontal={1}
      paddingVertical={1}>
       <Text className="text-lg font-semibold">2. Aphid Colonies</Text>
        <Text className="text-neutral mt-1">
          Fresh leaf curling observed. Infestation spreading rapidly.
        </Text>
        <Text className="text-sm text-primary mt-2">
          Recommended: Neem Oil / Imidacloprid
        </Text>
</ZiraatCard>

      <Text className="text-2xl font-bold mb-2 mt-4">Disease Observations</Text>

     <ZiraatCard width="100%" height="5%" paddingHorizontal={1}
      paddingVertical={1} marginBottom={1}>
        <Text className="text-lg font-semibold">1. Apple Scab</Text>
        <Text className="text-neutral mt-1">
          Early lesions detected. Moisture conditions ideal for disease spread.
        </Text>
      </ZiraatCard>

      <ZiraatCard width="100%" height="5%" paddingHorizontal={1}
      paddingVertical={1}>
        <Text className="text-lg font-semibold">2. Powdery Mildew</Text>
        <Text className="text-neutral mt-1">
          White patches observed on tender shoots. Moderate but rising risk.
        </Text>
    </ZiraatCard>

      <Text className="text-2xl font-bold mt-5 mb-2">
        Spray Schedule & History
      </Text>

      <ZiraatCard width="100%" height="11%" paddingHorizontal={1}
      paddingVertical={1}>
        <Text className="font-semibold text-l">Last Applied Spray</Text>
        <Text className="text-neutral mt-2">
          Chlorantraniliprole — 3 days ago
        </Text>

        <View className="border-t my-2" />

        <Text className="font-semibold">Next Scheduled Spray</Text>
        <Text className="text-neutral mt-2">Neem Oil — In 5 days</Text>

        <View className="border-t my-2" />

        <Text className="font-semibold">Missed Sprays</Text>
        <Text className="text-error mt-2">2 missed sprays this month</Text>
      
       </ZiraatCard>

       <Text className="text-2xl font-bold mt-6 mb-2">
        Pest & Disease Trend (30 Days)
      </Text>
      <Text className="text-l   mb-4">
        Chart showing incidence trends to help plan interventions.
      </Text>

      <ZiraatCard width="100%" height="12%" paddingHorizontal={1}
      paddingVertical={1}>
         <View className="bg-light  p-5">
        <CustomBarChart labels={[]} values={[]} type="bar" />
        <Text className="text-center text-sm text-overlay mt-2">
          (Analytics integration coming soon)
        </Text>
      </View>
        </ZiraatCard>

      {/* <Text className="text-xl font-bold mt-5 mb-2">Photo Diagnoses</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[1, 2, 3, 4].map((i) => (
          <Image
            key={i}
            source={{
              uri: "https://images.pexels.com/photos/1119582/pexels-photo-1119582.jpeg",
            }}
            className="w-32 h-32 rounded-xl bg-neutral/50 mr-3"
          />
        ))}
      </ScrollView>

      <Text className="text-xl font-bold mt-6 mb-2">
        Prevention & Recommendations
      </Text>

      <View className="bg-white rounded-xl p-4 shadow mb-6">
        <Text className="text-overlay mb-1">
          • Prune canopy to reduce density
        </Text>
        <Text className="text-overlay mb-1">
          • Avoid repeating same pesticides
        </Text>
        <Text className="text-overlay mb-1">
          • Improve irrigation spacing
        </Text>
        <Text className="text-overlay mb-1">
          • Monitor humidity during rains
        </Text>
        <Text className="text-overlay">
          • Follow recommended spray schedule
        </Text>
      </View> */}

      {/* === MODAL (UNCHANGED) === */}
      {/* <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white w-80 p-5 rounded-xl">
            <Text className="text-lg font-bold text-center mb-3">
              Update Spray Compliance
            </Text>

            <TextInput
              className="border p-3 rounded-lg mb-4"
              keyboardType="numeric"
              placeholder="Enter %"
              value={sprayInput}
              onChangeText={setSprayInput}
            />

            <View className="flex-row justify-between">
              <Pressable onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </Pressable>

              <Pressable
                className="bg-primary px-4 py-2 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-secondary font-semibold">Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal> */}
    </ScrollView>
  );
}
