import CustomBarChart from "@/src/components/charts/CustomBarChart";
import ScoreGroup from "@/src/components/shared/ScoreGroup";
import {
    Activity,
    BookOpen,
    MessageCircle,
    Percent,
    PieChart,
    Sparkles,
    TrendingUp,
    Users
} from "lucide-react-native";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";

const kpis = [
    {
        id: 1,
        title: "Learning Progress",
        value: "76%",
        subtitle: "Growth Curve",
        icon: BookOpen,
        color: "#c7611f",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    {
        id: 2,
        title: "Seasonal Compliance",
        value: "92%",
        subtitle: "Advisories Followed",
        icon: Percent,
        color: "#c7611f",
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    },
    {
        id: 3,
        title: "Community Impact",
        value: "44",
        subtitle: "Posts & Answers",
        icon: Users,
        color: "#c7611f",
        image: "https://images.unsplash.com/photo-1494173853739-c21f58b16055",
    },
    {
        id: 4,
        title: "Expert Sessions",
        value: "08",
        subtitle: "This Month",
        icon: MessageCircle,
        color: "#c7611f",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
];

const recentActivities = [
    { id: "P-101", type: "Forum Question", status: "Approved" },
    { id: "C-310", type: "Complaint", status: "Resolved" },
    { id: "A-110", type: "Article Read", status: "Completed" },
    { id: "S-220", type: "Seasonal Advisory", status: "Followed" },
];

export default function AdvisoryScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="px-5 py-6" contentContainerStyle={{ paddingBottom: 120 }}>
                <View className="mb-4">
                    <Text className="text-3xl font-extrabold text-black">Knowledge & Advisory</Text>
                    <Text className="text-black opacity-90 mt-1">Track your engagement with advisories, community forums, and expert support.</Text>
                </View>

                <Text className="text-sm text-black font-semibold mb-2">Key Metrics</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                    {kpis.map((item) => {
                        const Icon = item.icon;
                        const numericProgress = (() => {
                            const raw = String(item.value).replace("%", "").trim();
                            const n = Number(raw);
                            return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0;
                        })();
                        return (
                            <View
                                key={item.id}
                                className="mr-4 w-64 rounded-3xl bg-white overflow-hidden shadow-md"
                                style={{ shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } }}
                            >
                                <View className="h-36 w-full overflow-hidden rounded-t-3xl relative">
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ width: "100%", height: "100%" }}
                                        resizeMode="cover"
                                    />
                                    <View
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: "40%",
                                            backgroundColor: "rgba(0,0,0,0.18)",
                                        }}
                                    />
                                    <View style={{ position: "absolute", bottom: 10, left: 12, right: 12 }}>
                                        <Text className="text-white font-bold text-base">{item.title}</Text>
                                        <Text className="text-white opacity-80 text-xs">{item.subtitle}</Text>
                                    </View>
                                </View>

                                <View className="p-4">
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center">
                                            <View
                                                className="w-12 h-12 rounded-xl justify-center items-center"
                                                style={{ backgroundColor: item.color + "22" }}
                                            >
                                                <Icon size={22} color={item.color} />
                                            </View>
                                            <View className="ml-3">
                                                <Text className="text-black font-semibold">{item.title}</Text>
                                                <Text className="text-xs text-black opacity-70">{item.subtitle}</Text>
                                            </View>
                                        </View>

                                        <View className="items-end">
                                            <Text className="font-extrabold text-black text-lg">{item.value}</Text>
                                        </View>
                                    </View>

                                    <View className="mt-4">
                                        <View className="h-2 w-full rounded-full bg-neutral/10 overflow-hidden">
                                            <View style={{ width: `${numericProgress}%`, height: 8, borderRadius: 999, backgroundColor: item.color }} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>

                <View className="bg-white rounded-3xl p-5 shadow-md mb-6" style={{ shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } }}>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <TrendingUp size={22} color="#c7611f" />
                            <Text className="ml-2 font-bold text-black text-base">Overall Engagement Score</Text>
                        </View>
                        <View className="px-3 py-1 rounded-full" style={{ backgroundColor: "#c7611f22" }}>
                            <Text className="text-black font-bold">87%</Text>
                        </View>
                    </View>

                    <Text className="text-4xl font-extrabold text-black text-center mt-4">87 / 100</Text>
                    <Text className="text-black text-center mt-2">Excellent—your engagement is higher than 92% of users.</Text>

                    <View className="mt-4 flex-row justify-center gap-3">
                        <View className="flex-1">
                            <Text className="text-xs text-black opacity-70">Consistency</Text>

                            <ScoreGroup
                                color="#c7611f"
                                data={[
                                    { label: "Trending", value: "49%" },
                                    { label: "Community Posts", value: "28%" },
                                ]}

                            />

                        </View>
                        <View className="ml-3 items-end">
                            <Text className="text-xs text-black opacity-70">Trend</Text>
                            <Text className="font-bold text-black mt-1">+12%</Text>
                        </View>
                    </View>
                </View>

                <View className="bg-white rounded-3xl p-5 shadow-md mb-6" style={{ shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } }}>
                    <View className="flex-row items-center mb-3 justify-between">
                        <View className="flex-row items-center">
                            <PieChart size={22} color="#c7611f" />
                            <Text className="ml-2 font-bold text-black text-base">Engagement Distribution</Text>
                        </View>

                        <View className="flex-row items-center">
                            <Text className="text-sm text-black opacity-70 mr-2">View</Text>
                            <Text className="text-sm font-semibold text-black">Monthly</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center justify-between">
                        <View className="flex-1 mr-4 h-44 rounded-2xl bg-neutral/10 items-center justify-center p-3">
                            <CustomBarChart />
                        </View>



                        <ScoreGroup
                            color="#c7611f"
                            data={[
                                { label: "Articles", value: "41%" },
                                { label: "Community Posts", value: "20%" },
                                { label: "Advisory Followed", value: "36%" },
                            ]}
                        />

                    </View>
                </View>

                <View className="bg-white rounded-3xl p-5 shadow-md mb-6" style={{ shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } }}>
                    <View className="flex-row items-center mb-3 justify-between">
                        <View className="flex-row items-center">
                            <Activity size={22} color="#c7611f" />
                            <Text className="ml-2 font-bold text-black text-base">Advisory Adoption Trend</Text>
                        </View>
                        <Text className="text-sm text-black opacity-70">This Season</Text>
                    </View>

                    <View className="h-44 rounded-2xl bg-neutral/10 items-center justify-center overflow-hidden p-3">
                        <CustomBarChart />
                    </View>

                    <Text className="text-black mt-3">You followed 82% of advisories this season—higher consistency compared to past months.</Text>
                </View>

                <Text className="text-xl font-bold text-black mt-2 mb-3">Participation Heat</Text>
                <View className="flex-row flex-wrap gap-3 mb-6">
                    <Tag label="Active Reader" color="#3B82F6" />
                    <Tag label="Top Contributor" color="#F97316" />
                    <Tag label="Forum Helper" color="#10B981" />
                    <Tag label="Seasonal Follower" color="#8B5CF6" />
                </View>

                <View className="bg-white p-4 rounded-3xl shadow-md mb-6" style={{ shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } }}>
                    <Text className="font-bold text-black text-lg mb-4">Recent Activities</Text>

                    {recentActivities.map((item) => (
                        <View key={item.id} className="flex-row items-center justify-between mb-3">
                            <View className="flex-row items-center">
                                <View className="w-12 h-12 rounded-xl justify-center items-center mr-3" style={{ backgroundColor: "#f7f7f7" }}>
                                    <Text className="font-bold text-black">{item.id}</Text>
                                </View>
                                <View>
                                    <Text className="font-semibold text-black">{item.type}</Text>
                                    <Text className="text-xs text-black opacity-60">Details & timestamp</Text>
                                </View>
                            </View>

                            <View>
                                <StatusBadge status={item.status} />
                            </View>
                        </View>
                    ))}
                </View>

                <View className="bg-light p-5 rounded-3xl shadow-md mb-10 flex-row items-start gap-3">
                    <View className="p-3 rounded-lg" style={{ backgroundColor: "#c7611f11" }}>
                        <Sparkles size={26} color="#c7611f" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-xl font-extrabold text-black">Keep Growing Your Knowledge 🌱</Text>
                        <Text className="text-black opacity-90 mt-1">Read more articles, engage in community, and follow seasonal advisories to boost crop productivity & decision-making accuracy.</Text>


                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>

    );
}

const ScoreRow = ({ label, value, color = "#c7611f" }) => (
    <View className="mb-3">
        <Text className="text-sm text-black font-medium">{label}</Text>
        <View className="h-2 w-full rounded-full bg-neutral/10 mt-2 overflow-hidden">
            <View style={{ width: `${Number(String(value).replace("%", ""))}%`, height: 8, backgroundColor: color, borderRadius: 999 }} />
        </View>
        <Text className="text-xs text-black opacity-60 mt-1">{value}</Text>
    </View>
);

const Tag = ({ label, color }) => (
    <View style={{ backgroundColor: color + "11", borderColor: color }} className="px-4 py-2 rounded-xl border">
        <Text style={{ color }} className="font-semibold text-sm">{label}</Text>
    </View>
);

const StatusBadge = ({ status }) => {
    const map = {
        Resolved: { bg: "#10B98122", text: "#10B981" },
        Approved: { bg: "#8B5CF622", text: "#8B5CF6" },
        Completed: { bg: "#3B82F622", text: "#3B82F6" },
        Followed: { bg: "#F9731622", text: "#F97316" },
    };
    const pick = map[status] || { bg: "#c7611f22", text: "#c7611f" };
    return (
        <View className="px-3 py-1 rounded-full" style={{ backgroundColor: pick.bg }}>
            <Text className="font-semibold" style={{ color: pick.text }}>{status}</Text>
        </View>
    );
};