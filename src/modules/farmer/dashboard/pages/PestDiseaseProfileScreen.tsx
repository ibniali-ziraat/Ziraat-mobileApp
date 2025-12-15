import CustomBarChart from "@/src/components/charts/CustomBarChart";
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
          size={26}
          color={colors.secondary}
        />
      );
    }

    return <Ionicons name={item.icon} size={26} color={colors.secondary} />;
  };

  return (
    <ScrollView className="flex-1 bg-light p-4">
      <Text className="text-3xl font-extrabold mb-3">
        Pest & Disease Management
      </Text>

      <Text className="text-black mb-4">
        Real-time tracking and risk analytics to manage orchard health.
      </Text>

      {statTileData.map((item) => {
        const tile = (
          <StatTile
            key={item.id}
            title={item.title}
            value={item.value}
            footer={item.footer}
            color={item.color}
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

      <Text className="text-2xl font-bold mb-2">High-Risk Pests Identified</Text>

      <View className="bg-light rounded-xl p-4 border border-dark mb-4">
        <Text className="text-lg font-semibold">1. Codling Moth</Text>
        <Text className="text-neutral/100 mt-1">
          Humidity & temperature favour rapid development. Trap counts rising.
        </Text>
        <Text className="text-sm text-primary mt-2">
          Recommended: Chlorantraniliprole
        </Text>
      </View>

      <View className="bg-white rounded-xl p-4 border border-dark mb-4">
        <Text className="text-lg font-semibold">2. Aphid Colonies</Text>
        <Text className="text-neutral mt-1">
          Fresh leaf curling observed. Infestation spreading rapidly.
        </Text>
        <Text className="text-sm text-primary mt-2">
          Recommended: Neem Oil / Imidacloprid
        </Text>
      </View>

      <Text className="text-2xl font-bold mb-2 mt-4">Disease Observations</Text>

      <View className="bg-light rounded-xl p-4 border border-dark mb-4">
        <Text className="text-lg font-semibold">1. Apple Scab</Text>
        <Text className="text-neutral mt-1">
          Early lesions detected. Moisture conditions ideal for disease spread.
        </Text>
      </View>

      <View className="bg-light rounded-xl p-4 border border-dark mb-4">
        <Text className="text-lg font-semibold">2. Powdery Mildew</Text>
        <Text className="text-neutral mt-1">
          White patches observed on tender shoots. Moderate but rising risk.
        </Text>
      </View>

      <Text className="text-2xl font-bold mt-5 mb-2">
        Spray Schedule & History
      </Text>

      <View className="bg-light p-4 border border-dark rounded-lg mb-4">
        <Text className="font-semibold text-l">Last Applied Spray</Text>
        <Text className="text-neutral">
          Chlorantraniliprole — 3 days ago
        </Text>

        <View className="border-t my-2" />

        <Text className="font-semibold">Next Scheduled Spray</Text>
        <Text className="text-neutral/100">Neem Oil — In 5 days</Text>

        <View className="border-t my-2" />

        <Text className="font-semibold">Missed Sprays</Text>
        <Text className="text-error">2 missed sprays this month</Text>
      </View>
    
       <Text className="text-2xl font-bold mt-6 mb-2">
        Pest & Disease Trend (30 Days)
      </Text>
      <Text className="text-xl font-bold  mb-2">
        Chart showing incidence trends to help plan interventions.
      </Text>
       <View className="bg-light rounded-xl p-5 border border-dark mb-6">
        <CustomBarChart labels={[]} values={[]} type="bar" />
        <Text className="text-center text-sm text-overlay mt-2">
          (Analytics integration coming soon)
        </Text>
      </View>

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
