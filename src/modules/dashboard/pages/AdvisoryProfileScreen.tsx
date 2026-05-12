import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shadows } from "@/src/constants/shadows";

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

        {/* Key Metrics */}
        <CsText
          style={[
            typography.Poppins_m_semibold,
            { color: colors.dark }
          ]}
          className="mb-3"
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
                style={[
                  {
                    width: isSmall ? 250 : 280,
                    marginRight: 12,
                    backgroundColor: colors.light,
                    borderRadius: 16,

                    borderColor: colors.neutral,
                    overflow: "hidden",
                  },
                  shadows.profile_card,
                ]}
              >
                {/* Image Header */}
                <View style={{ height: 140 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ height: "100%", width: "100%" }}
                    resizeMode="cover"
                  />

                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      height: "40%",
                      width: "100%",
                      backgroundColor: colors.dark,
                      opacity: 0.7,
                    }}
                  />

                  <View style={{ position: "absolute", bottom: 10, left: 10 }}>
                    <CsText style={{ color: colors.light, fontWeight: "700" }}>
                      {item.title}
                    </CsText>

                    <CsText style={{ color: colors.light, fontSize: 12 }}>
                      {item.subtitle}
                    </CsText>
                  </View>
                </View>

                {/* Card Content */}
                <View style={{ padding: 12 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row", flex: 1 }}>
                      <View
                        style={{
                          height: 48,
                          width: 48,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {Icon && (
                          <Icon size={22} color={colors.secondary} />
                        )}
                      </View>

                      <View style={{ marginLeft: 6, flex: 1 }}>
                        <CsText
                          style={{ color: colors.dark, fontWeight: "600" }}
                          numberOfLines={1}
                        >
                          {item.title}
                        </CsText>

                        <CsText
                          style={{ fontSize: 12, color: colors.neutral }}
                          numberOfLines={1}
                        >
                          {item.subtitle}
                        </CsText>
                      </View>
                    </View>

                    <CsText
                      style={{
                        fontSize: 18,
                        fontWeight: "800",
                        color: colors.dark,
                      }}
                    >
                      {item.value}
                    </CsText>
                  </View>

                  {/* Progress */}
                  <View
                    style={{
                      marginTop: 14,
                      height: 8,
                      width: "100%",
                      borderRadius: 12,

                      borderColor: colors.neutral,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        backgroundColor: colors.secondary,
                        width: `${progress}%`,
                      }}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Engagement Score */}
        <View
          style={[
            {
              width: "100%",
              marginTop: 16,
              backgroundColor: colors.light,
              borderRadius: 16,

              borderColor: colors.neutral,
              padding: 14,
            },
            shadows.profile_card,
          ]}
        >
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

            <View
              style={{
                backgroundColor: colors.secondary,
                borderRadius: 999,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              <CsText style={{ color: colors.light, fontWeight: "600" }}>
                87%
              </CsText>
            </View>
          </View>

          <CsText
            style={{ marginTop: 14, textAlign: "center", fontSize: 20, color: colors.dark }}
          >
            87 / 100
          </CsText>

          <CsText
            style={typography.Poppins_s_medium}
            className="mt-2 text-center text-dark"
          >
            Excellent — higher than 92% of users.
          </CsText>
        </View>

        {/* Participation Heat */}
        <CsText
          style={typography.Poppins_m_semibold}
          className="mt-8 mb-4 text-2xl text-dark"
        >
          Participation Heat
        </CsText>

        <View className="flex-row flex-wrap justify-between">
          {tags.map((tag) => (
            <Tag key={tag.label} label={tag.label} />
          ))}
        </View>

        {/* Recent Activities */}
        <View
          style={[
            {
              width: "100%",
              marginTop: 20,
              backgroundColor: colors.light,
              borderRadius: 16,

              borderColor: colors.neutral,
              padding: 14,
            },
            shadows.profile_card,
          ]}
        >
          <CsText
            style={typography.Poppins_m_semibold}
            className="mb-4 text-2xl text-dark"
          >
            Recent Activities
          </CsText>

          {recentActivities.map((item) => (
            <View
              key={item.id}
              style={{
                marginBottom: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1, paddingRight: 10 }}>
                <CsText
                  style={typography.Poppins_s_regular}
                  className="text-dark"
                  numberOfLines={1}
                >
                  {item.type}
                </CsText>

                <CsText style={{ fontSize: 12, color: colors.neutral }}>
                  {item.id}
                </CsText>
              </View>

              <StatusBadge status={item.status} />
            </View>
          ))}
        </View>

        {/* Knowledge Tip */}
        <View
          style={[
            {
              width: "100%",
              marginTop: 20,
              backgroundColor: colors.light,
              borderRadius: 16,

              borderColor: colors.neutral,
              padding: 14,
            },
            shadows.profile_card,
          ]}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Sparkles size={20} color={colors.secondary} />

            <View style={{ flex: 1 }}>
              <CsText
                style={typography.Poppins_m_semibold}
                className="text-xl text-dark"
              >
                Keep Growing Your Knowledge
              </CsText>

              <CsText
                style={typography.Poppins_s_medium}
                className="mt-1 text-dark"
              >
                Read articles, engage with the community, and follow advisories.
              </CsText>
            </View>
          </View>
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}

const Tag = ({ label }: any) => {
  return (
    <View style={{ width: "48%", marginBottom: 12 }}>
      <View
        style={[
          {
            height: 42,
            justifyContent: "center",
            paddingHorizontal: 10,
            backgroundColor: colors.light,
            borderRadius: 12,

            borderColor: colors.neutral,
          },
          shadows.profile_card,
        ]}
      >
        <CsText style={{ fontWeight: "600", color: colors.dark }}>
          {label}
        </CsText>
      </View>
    </View>
  );
};

const StatusBadge = ({ status }: any) => {
  const styles: any = {
    Resolved: colors.primary,
    Approved: colors.primary,
    Completed: colors.primary,
    Followed: colors.primary,
  };

  return (
    <View
      style={{
        backgroundColor: styles[status] || colors.secondary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
      }}
    >
      <CsText style={{ color: colors.light }}>{status}</CsText>
    </View>
  );
};