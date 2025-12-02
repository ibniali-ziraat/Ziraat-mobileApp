import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Image, ScrollView, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function AlertsTrackingScreen() {
    return (
        <ScrollView className="flex-1 bg-white">


            <View className="relative mb-6">
                <Image
                    source={{ uri: "https://images.pexels.com/photos/6633043/pexels-photo-6633043.jpeg" }}
                    className="w-full h-48"
                />
                <View className="absolute inset-0 bg-black/30"></View>

                <Text className="absolute bottom-6 left-4 text-white text-3xl font-extrabold">
                    Alerts & Notifications
                </Text>
                <Text className="absolute bottom-2 left-4 text-white/90 font-medium">
                    Real-time warnings • Risk insights • Advisory actions
                </Text>
            </View>


            <Text className="text-xl font-bold px-4 mb-2">Alert Summary</Text>

            <View className="px-4">

                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 80 }}
                    className="bg-white rounded-xl shadow p-4 mb-4 flex-row items-center"
                >
                    <View className=" p-3 rounded-xl mr-4">
                        <Ionicons name="alert-circle" size={28} color="#c7611f" />
                    </View>

                    <View className="flex-1">
                        <Text className="text-sm text-neutral-600">Total Alerts Triggered</Text>
                        <Text className="text-3xl font-extrabold">48</Text>
                        <Text className="text-xs text-neutral-500 mt-1">Weather / Pest / Nutrient systems</Text>
                    </View>
                </MotiView>


                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 150 }}
                    className="bg-white rounded-xl shadow p-4 mb-4 flex-row items-center"
                >
                    <View className=" p-3 rounded-xl mr-4">
                        <Ionicons name="checkbox-outline" size={28} color="#c7611f" />
                    </View>

                    <View className="flex-1">
                        <Text className="text-sm text-neutral-600">Alerts Acknowledged</Text>
                        <Text className="text-3xl font-extrabold">86%</Text>
                        <Text className="text-xs text-neutral-500 mt-1">Farmer response rate</Text>
                    </View>
                </MotiView>


                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 220 }}
                    className="bg-white rounded-xl shadow p-4 mb-4 flex-row items-center"
                >
                    <View className=" p-3 rounded-xl mr-4">
                        <MaterialCommunityIcons name="account-check-outline" size={28} color="#c7611f" />
                    </View>

                    <View className="flex-1">
                        <Text className="text-sm text-neutral-600">Advisory Tickets Resolved</Text>
                        <Text className="text-3xl font-extrabold">72%</Text>
                        <Text className="text-xs text-neutral-500 mt-1">Expert team performance</Text>
                    </View>
                </MotiView>


                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 290 }}
                    className="bg-white rounded-xl shadow p-4 mb-4 flex-row items-center"
                >
                    <View className=" p-3 rounded-xl mr-4">
                        <Ionicons name="list" size={28} color="#c7611f" />
                    </View>

                    <View className="flex-1">
                        <Text className="text-sm text-neutral-600">Pending Actions</Text>
                        <Text className="text-3xl font-extrabold">14</Text>
                        <Text className="text-xs text-neutral-500 mt-1">
                            Fertigation • Sprays • Pruning tasks
                        </Text>
                    </View>
                </MotiView>


                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 360 }}
                    className="bg-white rounded-xl shadow p-4 mb-4 flex-row items-center"
                >
                    <View className="p-3 rounded-xl mr-4">
                        <Ionicons name="construct-outline" size={28} color="#c7611f" />
                    </View>

                    <View className="flex-1">
                        <Text className="text-sm text-neutral-600">Services Booked</Text>
                        <Text className="text-3xl font-extrabold">09</Text>
                        <Text className="text-xs text-neutral-500 mt-1">
                            Orchard care / spraying / consulting
                        </Text>
                    </View>
                </MotiView>
            </View>




            <Text className="text-xl font-bold px-4 mt-4 mb-2">Alert Categories</Text>

            <View className="px-4 mb-6">

                <Animated.View
                    entering={FadeInUp.delay(80)}
                    className="bg-white rounded-xl shadow p-4 mb-3 flex-row items-center"
                >
                    <Ionicons name="rainy-outline" size={32} color="#c7611f" />
                    <Text className="ml-3 text-lg font-semibold">Weather Alerts</Text>
                </Animated.View>

                <Animated.View
                    entering={FadeInUp.delay(150)}
                    className="bg-white rounded-xl shadow p-4 mb-3 flex-row items-center"
                >
                    <Ionicons name="bug-outline" size={32} color="#c7611f" />
                    <Text className="ml-3 text-lg font-semibold">Pest Alerts</Text>
                </Animated.View>

                <Animated.View
                    entering={FadeInUp.delay(220)}
                    className="bg-white rounded-xl shadow p-4 mb-3 flex-row items-center"
                >
                    <MaterialCommunityIcons name="leaf-circle-outline" size={32} color="#c7611f" />
                    <Text className="ml-3 text-lg font-semibold">Nutrient Alerts</Text>
                </Animated.View>

                <Animated.View
                    entering={FadeInUp.delay(290)}
                    className="bg-white rounded-xl shadow p-4 mb-3 flex-row items-center"
                >
                    <Ionicons name="flask-outline" size={32} color="#c7611f" />
                    <Text className="ml-3 text-lg font-semibold">Spray Advisory Alerts</Text>
                </Animated.View>
            </View>



            <Text className="text-xl font-bold px-4 mt-4 mb-2">Recent Alert Timeline</Text>

            <View className="px-4 mb-20">

                {[
                    {
                        time: "2 hrs ago",
                        message: "High humidity—risk of fungal spread",
                        icon: <Ionicons name="cloud-outline" size={28} color="#c7611f" />,
                    },
                    {
                        time: "6 hrs ago",
                        message: "Codling moth trap count rising",
                        icon: <Ionicons name="bug-outline" size={28} color="#c7611f" />,
                    },
                    {
                        time: "Yesterday",
                        message: "Nitrogen deficiency detected in Block C",
                        icon: <MaterialCommunityIcons name="leaf-outline" size={28} color="#c7611f" />,
                    },
                    {
                        time: "2 days ago",
                        message: "Recommended spray overdue by 3 days",
                        icon: <Ionicons name="alert-circle-outline" size={28} color="#c7611f" />,
                    },
                ].map((item, i) => (
                    <MotiView
                        key={i}
                        from={{ opacity: 0, translateY: 15 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: 100 * i }}
                        className="bg-white rounded-xl shadow p-4 flex-row items-start mb-3"
                    >
                        <View className="mr-4 mt-1">{item.icon}</View>
                        <View className="flex-1">
                            <Text className="text-base font-semibold">{item.message}</Text>
                            <Text className="text-xs text-neutral-500 mt-1">{item.time}</Text>
                        </View>
                    </MotiView>
                ))}
            </View>

        </ScrollView>
    );
}
