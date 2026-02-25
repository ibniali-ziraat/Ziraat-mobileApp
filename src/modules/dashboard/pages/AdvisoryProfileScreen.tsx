import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import {
  BookOpen,
  MessageCircle,
  Percent,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react-native";
import { Image, ScrollView, View, useWindowDimensions } from "react-native";
import kpis from "../../../data/kpis.json";
import tags from "../../../data/participationTags.json";
import recentActivities from "../../../data/recentActivities.json";

export default function AdvisoryScreen() {
  const ICONS: Record<string, any> = {
    BookOpen,
    Percent,
    Users,
    MessageCircle,
  };

  const { width } = useWindowDimensions();
  const isSmall = width < 380;

  return (
    <ScreenLayout scrollable>
      <ScreenContent className="pt-4 pb-10">
        <CsText
          style={typography.Poppins_m_semibold}
          className="mb-3  text-dark"
        >
          Key Metrics
        </CsText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 12 }}
        >
          {kpis.map((item) => {
            const Icon = ICONS[item.icon];
            const progress = Number(String(item.value).replace("%", "")) || 0;

            return (
              <View
                key={item.id}
                style={{ width: isSmall ? 250 : 280 }}
                className="mr-3 overflow-hidden rounded-xl border border-light"
              >
                <View className="relative h-36">
                  <Image
                    source={{ uri: item.image }}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                  <View className="absolute bottom-0 h-2/5 w-full bg-dark opacity-70" />
                  <View className="absolute bottom-3 left-3">
                    <CsText className="font-bold text-light">
                      {item.title}
                    </CsText>
                    <CsText className="text-xs text-light">
                      {item.subtitle}
                    </CsText>
                  </View>
                </View>

                <View className="p-3">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <View className="h-12 w-12 items-center justify-center rounded-xl">
                        {Icon && <Icon size={22} color={colors.secondary} />}
                      </View>

                      <View className="ml-1 flex-1">
                        <CsText
                          className="font-semibold text-dark"
                          numberOfLines={1}
                        >
                          {item.title}
                        </CsText>
                        <CsText className="text-xs text-dark" numberOfLines={1}>
                          {item.subtitle}
                        </CsText>
                      </View>
                    </View>

                    <CsText className="ml-2 text-lg font-extrabold text-black">
                      {item.value}
                    </CsText>
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
        <View className="w-full mt-5">
          <ZiraatCard width="100%" paddingHorizontal={1} paddingVertical={1}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <TrendingUp size={30} color={colors.secondary} />
                <CsText
                  style={typography.Poppins_m_semibold}
                  className="ml-2 text-[16px] text-dark flex-1"
                  numberOfLines={2}
                >
                  Overall Engagement Score
                </CsText>
              </View>

              <View className="rounded-full bg-secondary px-3 py-1">
                <CsText className="text-light font-semibold">87%</CsText>
              </View>
            </View>

            <CsText className="mt-4 text-center text-xl text-dark">
              87 / 100
            </CsText>

            <CsText
              style={typography.Poppins_s_medium}
              className="mt-2 text-center text-dark"
            >
              Excellent — higher than 92% of users.
            </CsText>
          </ZiraatCard>
        </View>

        <CsText
          style={typography.Poppins_m_semibold}
          className="mt-8 mb-4 text-2xl text-dark"
        >
          Participation Heat
        </CsText>

        <View className="w-full flex-row flex-wrap justify-between">
          {tags.map((tag) => (
            <Tag key={tag.label} label={tag.label} />
          ))}
        </View>

        <View className="w-full mt-6">
          <ZiraatCard width="100%" paddingHorizontal={1} paddingVertical={1}>
            <CsText
              style={typography.Poppins_m_semibold}
              className="mb-4 text-2xl text-black"
            >
              Recent Activities
            </CsText>

            {recentActivities.map((item) => (
              <View
                key={item.id}
                className="mb-3 flex-row items-center justify-between"
              >
                <View className="flex-1 pr-3">
                  <CsText
                    style={typography.Poppins_s_regular}
                    className="text-dark"
                    numberOfLines={1}
                  >
                    {item.type}
                  </CsText>
                  <CsText className="text-sm text-dark" numberOfLines={1}>
                    {item.id}
                  </CsText>
                </View>

                <StatusBadge status={item.status} />
              </View>
            ))}
          </ZiraatCard>
        </View>

        <View className="w-full mt-6">
          <ZiraatCard width="100%" paddingHorizontal={1} paddingVertical={1}>
            <View className="flex-row gap-3 items-start">
              <Sparkles size={30} color={colors.secondary} />
              <View className="flex-1">
                <CsText
                  style={typography.Poppins_m_semibold}
                  className="text-xl text-dark"
                >
                  Keep Growing Your Knowledge 🌱
                </CsText>
                <CsText
                  style={typography.Poppins_s_medium}
                  className="mt-1 text-dark"
                >
                  Read articles, engage with the community, and follow
                  advisories.
                </CsText>
              </View>
            </View>
          </ZiraatCard>
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}

const Tag = ({ label }: any) => {
  return (
    <View style={{ width: "48%", marginBottom: 12 }}>
      <ZiraatCard
        width="100%"
        height={42}
        paddingHorizontal={0.76}
        paddingVertical={0.7}
      >
        <CsText className="text-sm font-semibold" numberOfLines={1}>
          {label}
        </CsText>
      </ZiraatCard>
    </View>
  );
};

const StatusBadge = ({ status }: any) => {
  const styles: any = {
    Resolved: "bg-primary",
    Approved: "bg-primary",
    Completed: "bg-primary",
    Followed: "bg-primary",
  };

  return (
    <View
      className={`rounded-full px-3 py-1 ${styles[status] || "bg-secondary"}`}
    >
      <CsText className="text-light">{status}</CsText>
    </View>
  );
};
