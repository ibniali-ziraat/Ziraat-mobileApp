import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import {
  BookOpen,
  MessageCircle,
  Percent,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react-native";
import { Image, ScrollView, Text, View } from "react-native";
import kpis from "../../../../data/kpis.json";
import tags from "../../../../data/participationTags.json";
import recentActivities from "../../../../data/recentActivities.json";

export default function AdvisoryScreen() {
  const ICONS: Record<string, any> = {
    BookOpen,
    Percent,
    Users,
    MessageCircle,
  };

  return (
    <View className="flex-1 bg-white">
      <ScreenLayout className="px-5 py-6">
        <BackHeader
          title="Advisory Profile"
          desc="   Track your engagement with advisories, community forums, and expert support."
        />

        {/* KPIs */}
        <Text className="mb-2 text-xl font-semibold text-black">
          Key Metrics
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {kpis.map((item) => {
            const Icon = ICONS[item.icon];
            const progress = Number(String(item.value).replace("%", "")) || 0;

            return (
              <View
                key={item.id}
                className="mr-2 w-64 overflow-hidden rounded-lg border border-white"
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
                        {Icon && <Icon size={22} color={colors.secondary} />}
                      </View>
                      <View className="ml-1">
                        <Text className="font-semibold text-dark">
                          {item.title}
                        </Text>
                        <Text className="text-xs text-dark">
                          {item.subtitle}
                        </Text>
                      </View>
                    </View>

                    <Text className="ml-1 text-lg font-extrabold text-black">
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
        <ZiraatCard
          width="100%"
          height={140}
          paddingHorizontal={1}
          paddingVertical={1}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TrendingUp size={30} color={colors.secondary} />
              <Text className="ml-2 text-xl font-bold text-dark">
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
        </ZiraatCard>

        {/* Participation Tags */}
        <Text className="mt-8 mb-6 text-2xl font-bold">Participation Heat</Text>
        <View className="mb-6 flex-row flex-wrap gap-3">
          {tags.map((tag) => (
            <Tag key={tag.label} {...tag} />
          ))}
        </View>

        {/* Recent Activities */}
        <ZiraatCard
          width="100%"
          height="25%"
          paddingHorizontal={1}
          paddingVertical={1}
        >
          <View className="mb-6 ">
            <Text className="mb-4 text-2xl font-bold text-black">
              Recent Activities
            </Text>

            {recentActivities.map((item) => (
              <View
                key={item.id}
                className="mb-3 flex-row items-center justify-between"
              >
                <View>
                  <Text className="font-semibold text-dark">{item.type}</Text>
                  <Text className="text-sm text-dark">{item.id}</Text>
                </View>
                <StatusBadge status={item.status} />
              </View>
            ))}
          </View>
        </ZiraatCard>

        {/* Footer */}
        <ZiraatCard width="100%" height="10%" marginTop={1}>
          <View className="mt-4 flex-row gap-3 p-5">
            <Sparkles size={30} color={colors.secondary} />
            <View className="flex-1">
              <Text className="text-xl font-extrabold text-black">
                Keep Growing Your Knowledge 🌱
              </Text>
              <Text className="mt-1 text-dark">
                Read articles, engage with the community, and follow advisories.
              </Text>
            </View>
          </View>
        </ZiraatCard>
      </ScreenLayout>
    </View>
  );
}

/* ------------------ Helpers ------------------ */

const Tag = ({ label }: any) => (
  <View style={{ width: "30%" }}>
    <ZiraatCard
      width="100%"
      height={36}
      paddingHorizontal={0.76}
      paddingVertical={0.7}
    >
      <Text className={`text-sm font-semibold`}>{label}</Text>
    </ZiraatCard>
  </View>
);

const StatusBadge = ({ status }: any) => {
  const styles: any = {
    Resolved: "bg-primary",
    Approved: "bg-primary",
    Completed: "bg-primary",
    Followed: "bg-primary",
  };

  return (
    <View className={`rounded-full px-3 py-1 ${styles[status]}`}>
      <Text className=" text-light">{status}</Text>
    </View>
  );
};
