import { colors } from "@/src/constants/colors";
import kpis from "@/src/Data/advisoryKpis.json";
import tags from "@/src/Data/participationTags.json";
import recentActivities from "@/src/Data/recentActivities.json";
import {
    BookOpen,
    MessageCircle,
    Percent,
    Sparkles,
    TrendingUp,
    Users
} from "lucide-react-native";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
export default function AdvisoryScreen() {
  const ICONS: Record<string, any> = {
    BookOpen,
    Percent,
    Users,
    MessageCircle
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-5 py-6" contentContainerClassName="pb-32">

        {/* Header */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-dark">
            Knowledge & Advisory
          </Text>
          <Text className="mt-1 text-dark">
            Track your engagement with advisories, community forums, and expert support.
          </Text>
        </View>

        {/* KPIs */}
        <Text className="mb-2 text-xl font-semibold text-black">Key Metrics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          {kpis.map((item) => {
            const Icon = ICONS[item.icon];
            const progress = Number(String(item.value).replace("%", "")) || 0;

            return (
              <View
                key={item.id}
                className="mr-2 w-64 overflow-hidden border border-dark rounded-lg"
              >
                <View className="relative h-36">
                  <Image
                    source={{ uri: item.image }}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                  <View className="absolute bottom-0 h-2/5 w-full bg-dark" />
                  <View className="absolute bottom-3 left-3">
                    <Text className="font-bold text-light">{item.title}</Text>
                    <Text className="text-xs text-light">{item.subtitle}</Text>
                  </View>
                </View>

                <View className="p-2">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <View className="h-12 w-12 items-center justify-center rounded-xl">
                        <Icon size={22} color={colors.secondary} />
                      </View>
                      <View className="ml-1">
                        <Text className="font-semibold text-dark">{item.title}</Text>
                        <Text className="text-xs text-dark">{item.subtitle}</Text>
                      </View>
                    </View>

                    <Text className="text-lg ml-1 font-extrabold text-black">
                      {item.value}
                    </Text>
                  </View>

                  <View className="mt-4 h-2 w-full overflow-hidden rounded-xl border border-dark">
                    <View
                      className="h-full rounded-full bg-secondary"
                      style={{ width: `${progress}%` }}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Engagement Score */}
        <View className="mb-6 rounded-2xl bg-white p-5 border border-dark">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TrendingUp size={30} color={colors.secondary} />
              <Text className="ml-2 font-bold text-dark text-xl">
                Overall Engagement Score
              </Text>
            </View>
            <Text className="rounded-full bg-secondary px-3 py-1 font-bold text-light">
              87%
            </Text>
          </View>

          <Text className="mt-4 text-center text-xl font-bold text-dark">
            87 / 100
          </Text>
          <Text className="mt-2 text-center font-bold text-dark">
            Excellent — higher than 92% of users.
          </Text>
        </View>

        {/* Participation Tags */}
        <Text className="mb-3 text-2xl font-bold">
          Participation Heat
        </Text>
        <View className="mb-6 flex-row flex-wrap gap-3">
          {tags.map((tag) => (
            <Tag key={tag.label} {...tag} />
          ))}
        </View>

        {/* Recent Activities */}
        <View className="mb-6 rounded-2xl bg-light border border-dark p-4">
          <Text className="mb-4 text-2xl font-bold text-black">
            Recent Activities
          </Text>

          {recentActivities.map((item) => (
            <View key={item.id} className="mb-3 flex-row items-center justify-between">
              <View>
                <Text className="font-semibold text-dark">{item.type}</Text>
                <Text className="text-sm text-dark">{item.id}</Text>
              </View>
              <StatusBadge status={item.status} />
            </View>
          ))}
        </View>

        {/* Footer */}
        <View className="flex-row gap-3 rounded-2xl  p-5 ">
          <Sparkles size={30} color={colors.secondary} />
          <View className="flex-1">
            <Text className="text-xl font-extrabold text-black">
              Keep Growing Your Knowledge  🌱
            </Text>
            <Text className="mt-1 text-dark">
              Read articles, engage with the community, and follow advisories.
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ------------------ Helpers ------------------ */

const Tag = ({ label, color }: any) => (
  <View className={`rounded-xl border px-4 py-2 bg-${color}-100 border-${color}-400`}>
    <Text className={`text-sm font-semibold text-${color}-600`}>
      {label}
    </Text>
  </View>
);

const StatusBadge = ({ status }: any) => {
  const styles: any = {
    Resolved: "bg-green-100 text-green-600",
    Approved: "bg-violet-100 text-violet-600",
    Completed: "bg-blue-100 text-blue-600",
    Followed: "bg-orange-100 text-orange-600"
  };

  return (
    <View className={`rounded-full px-3 py-1 ${styles[status]}`}>
      <Text className="font-semibold">{status}</Text>
    </View>
  );
};
