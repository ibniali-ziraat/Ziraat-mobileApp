import CustomBarChart from "@/src/components/charts/CustomBarChart";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";


const StatTile = ({ title, value, footer, color, icon }: any) => (
    <View className="w-full rounded-xl bg-white shadow flex-row items-center p-4 mb-4">
        <View style={{ width: 6, height: "100%", borderRadius: 6, backgroundColor: color }} />
        <View className="ml-3 mr-3 bg-neutral/10 p-3 rounded-xl">
            {icon}
        </View>
        <View className="flex-1">
            <Text className="text-sm text-black font-medium">{title}</Text>
            <Text className="text-2xl font-extrabold mt-1">{value}</Text>
            {footer && <Text className="text-xs text-overlay mt-1">{footer}</Text>}
        </View>

    </View>
);
export default function PestDiseaseProfile() {
    const [modalVisible, setModalVisible] = useState(false);
    const [sprayInput, setSprayInput] = useState("");

    return (
        <ScrollView className="flex-1 bg-white p-4">
            <Text className="text-3xl font-extrabold mb-3">Pest & Disease Management</Text>
            <Text className="text-black mb-4">
                Real-time tracking and risk analytics to manage orchard health.
            </Text>
            <StatTile
                title="Pest Incidence (per 100 trees)"
                value="23"
                footer="Admin fed"
                color="#10B981"
                icon={<Ionicons name="bug-outline" size={24} color="#10B981" />}
            />
            <StatTile
                title="Disease Incidence Rate (%)"
                value="12%"
                footer="Admin / RimPro API"
                color="#3B82F6"
                icon={<MaterialCommunityIcons name="virus-outline" size={24} color="#3B82F6" />}
            />

            <Pressable onPress={() => setModalVisible(true)}>
                <StatTile
                    title="Spray Compliance (%)"
                    value="Tap to Update"
                    footer="User input required"
                    color="#F59E0B"
                    icon={<Ionicons name="color-wand-outline" size={24} color="#F59E0B" />}
                />
            </Pressable>

            <StatTile
                title="Pest/Disease Risk Level"
                value="Medium"
                footer="Based on last 7 days"
                color="#EF4444"
                icon={<Ionicons name="alert-circle-outline" size={24} color="#EF4444" />}
            />
            <StatTile
                title="Resistance Developed?"
                value="Possible"
                footer="Repeated pesticide usage"
                color="#8B5CF6"
                icon={<Ionicons name="shield-half-outline" size={24} color="#8B5CF6" />}
            />
            <StatTile
                title="Photo Diagnoses Submitted"
                value="18"
                color="#06B6D4"
                icon={<Ionicons name="image-outline" size={24} color="#06B6D4" />}
            />
            <StatTile
                title="Avg Response Time"
                value="4.5 hrs"
                footer="Expert Team"
                color="#F43F5E"
                icon={<Ionicons name="time-outline" size={24} color="#F43F5E" />}
            />
            <Text className="text-xl font-bold mt-6 mb-2">Pest & Disease Trend (30 Days)</Text>

            <View className="bg-white rounded-xl p-5 shadow mb-6">
                <CustomBarChart labels={[]} values={[]} type="bar" />

                <Text className="text-center text-xs text-overlay mt-2">
                    (Analytics integration coming soon)
                </Text>
            </View>

            <Text className="text-xl font-bold mb-2">High-Risk Pests Identified</Text>

            <View className="bg-white rounded-xl p-4 shadow mb-4">
                <Text className="text-lg font-semibold">1. Codling Moth</Text>
                <Text className="text-neutral/100 mt-1">
                    Humidity & temperature favour rapid development. Trap counts rising.
                </Text>
                <Text className="text-xs text-primary mt-2">Recommended: Chlorantraniliprole</Text>
            </View>

            <View className="bg-white rounded-xl p-4 shadow mb-4">
                <Text className="text-lg font-semibold">2. Aphid Colonies</Text>
                <Text className="text-neutral/100 mt-1">
                    Fresh leaf curling observed. Infestation spreading rapidly.
                </Text>
                <Text className="text-xs text-error mt-2">Recommended: Neem Oil / Imidacloprid</Text>
            </View>

            <Text className="text-xl font-bold mb-2 mt-4">Disease Observations</Text>

            <View className="bg-white rounded-xl p-4 shadow mb-4">
                <Text className="text-lg font-semibold">Apple Scab</Text>
                <Text className="text-neutral/100 mt-1">
                    Early lesions detected. Moisture conditions ideal for disease spread.
                </Text>
            </View>

            <View className="bg-white rounded-xl p-4 shadow mb-4">
                <Text className="text-lg font-semibold">Powdery Mildew</Text>
                <Text className="text-neutral/100 mt-1">
                    White patches observed on tender shoots. Moderate but rising risk.
                </Text>
            </View>

            <Text className="text-xl font-bold mt-5 mb-2">Spray Schedule & History</Text>

            <View className="bg-white p-4 rounded-xl shadow mb-4">
                <View className="mb-3">
                    <Text className="font-semibold">Last Applied Spray</Text>
                    <Text className="text-neutral/100">Chlorantraniliprole — 3 days ago</Text>
                </View>

                <View className="border-t my-2" />

                <View className="mb-3">
                    <Text className="font-semibold">Next Scheduled Spray</Text>
                    <Text className="text-neutral/100">Neem Oil — In 5 days</Text>
                </View>

                <View className="border-t my-2" />

                <View>
                    <Text className="font-semibold">Missed Sprays</Text>
                    <Text className="text-error">2 missed sprays this month</Text>
                </View>
            </View>
            <Text className="text-xl font-bold mt-5 mb-2">Photo Diagnoses</Text>

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
            <Text className="text-xl font-bold mt-6 mb-2">Prevention & Recommendations</Text>

            <View className="bg-white rounded-xl p-4 shadow mb-6">
                <Text className="text-overlay mb-1">• Prune canopy to reduce density</Text>
                <Text className="text-overlay mb-1">• Avoid repeating same pesticides</Text>
                <Text className="text-overlay mb-1">• Improve irrigation spacing</Text>
                <Text className="text-overlay mb-1">• Monitor humidity during rains</Text>
                <Text className="text-overlay">• Follow recommended spray schedule</Text>
            </View>


            <Modal visible={modalVisible} transparent animationType="fade">
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
                            <Pressable
                                className="px-4 py-2 rounded-lg"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text>Cancel</Text>
                            </Pressable>

                            <Pressable
                                className="bg-primary px-4 py-2 rounded-lg"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="text-secondary font-semibold">
                                    Save
                                </Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}
