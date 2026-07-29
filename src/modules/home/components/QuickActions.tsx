import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ArrowUpRight, CirclePlus } from "lucide-react-native";
import { useMemo } from "react";
import {
  ImageBackground,
  type ImageSourcePropType,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { useOrchardsByUserQuery } from "../../orchards/hooks/useOrchardsQuery";

const CARD_WIDTH = 156;
const CARD_HEIGHT = 140;
const fallbackImage = require("@/assets/images/orchard-card-bg.png");

type OrchardSummary = {
  id: string | number;
  orchardName?: string;
  ownershipType?: string;
  kanals?: number;
  marlas?: number;
  imageUrl?: string;
  orchardImageUrl?: string;
  image?: string;
  photoUrl?: string;
  createdAt?: string;
  createdOn?: string;
  createdDate?: string;
};

const getCreatedTime = (orchard: OrchardSummary): number => {
  const createdValue =
    orchard.createdAt ?? orchard.createdOn ?? orchard.createdDate;
  const timestamp = createdValue ? new Date(createdValue).getTime() : NaN;

  if (Number.isFinite(timestamp)) return timestamp;

  const numericId = Number(orchard.id);
  return Number.isFinite(numericId) ? numericId : 0;
};

const getOrchardImage = (orchard: OrchardSummary): ImageSourcePropType => {
  const imageUrl =
    orchard.imageUrl ??
    orchard.orchardImageUrl ??
    orchard.image ??
    orchard.photoUrl;

  return imageUrl ? { uri: imageUrl } : fallbackImage;
};

const getOrchardSize = (orchard: OrchardSummary): string => {
  if (orchard.kanals) return `${orchard.kanals} kanals`;
  if (orchard.marlas) return `${orchard.marlas} marlas`;
  return "View details";
};

export default function QuickActions() {
  const { data: orchardData } = useOrchardsByUserQuery();

  const recentOrchards = useMemo(
    () =>
      ([...(orchardData ?? [])] as OrchardSummary[])
        .sort((a, b) => getCreatedTime(b) - getCreatedTime(a))
        .slice(0, 3),
    [orchardData],
  );

  const openOrchard = (id: string | number) => {
    router.push({
      pathname: ROUTES.ORCHARDS.DETAILS.ORCHARD_DETAILS,
      params: { id: String(id) },
    });
  };

  const addOrchard = () => {
    router.push({
      pathname: ROUTES.ORCHARDS.REGISTRATION.BASIC_INFO,
      params: { mode: "create" },
    });
  };

  if (recentOrchards.length === 0) {
    return (
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <AddOrchardAction onPress={addOrchard} fullWidth />
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 20, marginTop: 20 }}>
      <View className="mb-3 flex-row items-center justify-between">
        <CsText
          style={[typography.Poppins_m_semibold, { color: colors.dark }]}
        >
          Recent Orchards
        </CsText>
        {/* <CsText
          style={[typography.Poppins_xs_medium, { color: colors.darkHover }]}
        >
          Quick access
        </CsText> */}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 8, gap: 12 }}
      >
        {recentOrchards.map((orchard) => (
          <Pressable
            key={String(orchard.id)}
            onPress={() => openOrchard(orchard.id)}
            style={({ pressed }) => ({
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              borderRadius: 22,
              borderCurve: "continuous",
              backgroundColor: colors.light,
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
              shadowColor: "#17350A",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 3,
            })}
          >
            <View
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                borderRadius: 22,
                borderCurve: "continuous",
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.35)",
              }}
            >
              <ImageBackground
                source={getOrchardImage(orchard)}
                resizeMode="cover"
                style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                imageStyle={{
                  borderRadius: 21,
                  borderCurve: "continuous",
                }}
              >
                <LinearGradient
                  colors={[
                    "rgba(8,28,5,0.06)",
                    "rgba(8,28,5,0.34)",
                    "rgba(8,28,5,0.94)",
                  ]}
                  locations={[0, 0.4, 1]}
                  style={{
                    flex: 1,
                    padding: 11,
                    justifyContent: "space-between",
                    borderRadius: 21,
                  }}
                >
                  <View className="flex-row items-start justify-between">
                    <View
                      className="max-w-[100px] rounded-full px-2 py-1"
                      style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
                    >
                      <CsText
                        numberOfLines={1}
                        style={[
                          typography.Poppins_xs_semibold,
                          { color: colors.primary, fontSize: 8 },
                        ]}
                      >
                        {orchard.ownershipType || "Registered"}
                      </CsText>
                    </View>

                    <View
                      className="h-7 w-7 items-center justify-center rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
                    >
                      <ArrowUpRight size={14} color={colors.primary} />
                    </View>
                  </View>

                  <View>
                    <CsText
                      numberOfLines={2}
                      style={[
                        typography.Poppins_s_semibold,
                        {
                          color: colors.light,
                          fontSize: 14,
                          lineHeight: 18,
                        },
                      ]}
                    >
                      {orchard.orchardName || "Unnamed Orchard"}
                    </CsText>
                    <CsText
                      numberOfLines={1}
                      style={[
                        typography.Poppins_xs_medium,
                        {
                          color: "rgba(255,255,255,0.76)",
                          marginTop: 2,
                          fontSize: 9,
                        },
                      ]}
                    >
                      {getOrchardSize(orchard)}
                    </CsText>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
          </Pressable>
        ))}

        <AddOrchardAction onPress={addOrchard} />
      </ScrollView>
    </View>
  );
}

type AddOrchardActionProps = {
  onPress: () => void;
  fullWidth?: boolean;
};

function AddOrchardAction({
  onPress,
  fullWidth = false,
}: AddOrchardActionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: fullWidth ? "100%" : CARD_WIDTH,
        minHeight: fullWidth ? 108 : CARD_HEIGHT,
        borderRadius: 22,
        borderCurve: "continuous",
        backgroundColor: colors.light,
        opacity: pressed ? 0.86 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
        shadowColor: "#17350A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      })}
    >
      <View
        style={{
          width: "100%",
          minHeight: fullWidth ? 108 : CARD_HEIGHT,
          padding: 12,
          borderRadius: 22,
          borderCurve: "continuous",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.light,
          borderWidth: 1,
          borderColor: colors.primary + "28",
        }}
      >
        <View
          className="mb-2.5 h-11 w-11 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 3,
          }}
        >
          <CirclePlus size={25} color={colors.light} />
        </View>
        <CsText
          style={[typography.Poppins_s_semibold, { color: colors.dark }]}
        >
          Add Orchard
        </CsText>
        <CsText
          style={[
            typography.Poppins_xs_regular,
            { color: colors.darkHover, fontSize: 9, marginTop: 2 },
          ]}
        >
          Create new orchard
        </CsText>

        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: 48,
            height: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            backgroundColor: colors.primary,
          }}
        />
      </View>
    </Pressable>
  );
}
