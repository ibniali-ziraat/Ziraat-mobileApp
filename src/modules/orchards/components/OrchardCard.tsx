import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Ruler,
  Sprout,
} from "lucide-react-native";
import {
  ImageBackground,
  type ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

interface OrchardCardProps {
  orchard: any;
}

const fallbackImage = require("@/assets/images/orchard-card-bg.png");

function getBackgroundImage(orchard: any): ImageSourcePropType {
  const imageUrl =
    orchard?.imageUrl ??
    orchard?.orchardImageUrl ??
    orchard?.image ??
    orchard?.photoUrl;

  return typeof imageUrl === "string" && imageUrl.length > 0
    ? { uri: imageUrl }
    : fallbackImage;
}

function getOrchardSize(orchard: any): string {
  if (orchard?.kanals > 0) return `${orchard.kanals} kanals`;
  if (orchard?.marlas > 0) return `${orchard.marlas} marlas`;
  return "Not added";
}

export default function OrchardCard({ orchard }: OrchardCardProps) {
  const openDetails = () => {
    router.push({
      pathname: ROUTES.ORCHARDS.DETAILS.ORCHARD_DETAILS,
      params: { id: orchard.id },
    });
  };

  const location =
    orchard?.villageName ??
    orchard?.village ??
    orchard?.district ??
    orchard?.location;

  return (
    <View
      style={{
        marginBottom: 20,
        borderRadius: 28,
        borderCurve: "continuous",
        backgroundColor: colors.light,
        elevation: 7,
        shadowColor: "#17350A",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
      }}
    >
      <Pressable
        onPress={openDetails}
        accessibilityRole="button"
        accessibilityLabel={`View ${orchard?.orchardName ?? "orchard"} details`}
        style={({ pressed }) => ({
          borderRadius: 28,
          borderCurve: "continuous",
          opacity: pressed ? 0.94 : 1,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        })}
      >
        <View
          style={{
            minHeight: 290,
            borderRadius: 28,
            borderCurve: "continuous",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.38)",
            backgroundColor: colors.primary,
          }}
        >
          <ImageBackground
            source={getBackgroundImage(orchard)}
            resizeMode="cover"
            style={{
              minHeight: 290,
              width: "100%",
              borderRadius: 27,
              overflow: "hidden",
            }}
            imageStyle={{
              borderRadius: 27,
              borderCurve: "continuous",
            }}
          >
            <LinearGradient
              colors={[
                "rgba(8, 28, 5, 0.14)",
                "rgba(8, 28, 5, 0.42)",
                "rgba(8, 28, 5, 0.94)",
              ]}
              locations={[0, 0.38, 1]}
              style={{
                minHeight: 290,
                width: "100%",
                padding: 18,
                justifyContent: "space-between",
                borderRadius: 27,
                borderCurve: "continuous",
              }}
            >
              <View className="flex-row items-start justify-between">
                <View
                  className="flex-row items-center rounded-full px-3 py-2"
                  style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
                >
                  <View
                    className="mr-2 h-2 w-2 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <Text
                    style={[
                      typography.Poppins_s_medium,
                      { color: colors.primary, fontSize: 11 },
                    ]}
                  >
                    {orchard?.ownershipType || "Registered orchard"}
                  </Text>
                </View>

                <View
                  className="h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
                >
                  <ArrowUpRight size={21} color={colors.primary} />
                </View>
              </View>

              <View
                style={{
                  borderBottomLeftRadius: 27,
                  borderBottomRightRadius: 27,
                }}
              >
                {location ? (
                  <View className="mb-2 flex-row items-center">
                    <MapPin size={15} color="rgba(255,255,255,0.82)" />
                    <Text
                      numberOfLines={1}
                      style={[
                        typography.Poppins_s_medium,
                        {
                          color: "rgba(255,255,255,0.82)",
                          fontSize: 12,
                          marginLeft: 5,
                        },
                      ]}
                    >
                      {location}
                    </Text>
                  </View>
                ) : null}

                <Text
                  numberOfLines={2}
                  style={[
                    typography.Poppins_xl_semibold,
                    { color: colors.light, fontSize: 27, lineHeight: 34 },
                  ]}
                >
                  {orchard?.orchardName || "Unnamed Orchard"}
                </Text>

                <View
                  className="mt-4 flex-row rounded-2xl p-3"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.14)",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.18)",
                  }}
                >
                  <Metric
                    icon={Ruler}
                    label="Size"
                    value={getOrchardSize(orchard)}
                  />
                  <Divider />
                  <Metric
                    icon={CalendarDays}
                    label="Established"
                    value={String(orchard?.establishmentYear || "—")}
                  />
                  <Divider />
                  <Metric
                    icon={Sprout}
                    label="Plantation"
                    value={orchard?.plantationPattern || "—"}
                  />
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </Pressable>
    </View>
  );
}

type MetricProps = {
  icon: typeof Ruler;
  label: string;
  value: string;
};

function Metric({ icon: Icon, label, value }: MetricProps) {
  return (
    <View className="min-w-0 flex-1 items-center px-1">
      <Icon size={16} color="#DDF5CC" />
      <Text
        numberOfLines={1}
        style={[
          typography.Poppins_xs_regular,
          {
            color: "rgba(255,255,255,0.7)",
            fontSize: 9,
            marginTop: 5,
          },
        ]}
      >
        {label}
      </Text>
      <Text
        numberOfLines={1}
        style={[
          typography.Poppins_s_semibold,
          { color: colors.light, fontSize: 11, marginTop: 2 },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

function Divider() {
  return (
    <View
      style={{
        width: 1,
        height: 42,
        alignSelf: "center",
        backgroundColor: "rgba(255,255,255,0.2)",
      }}
    />
  );
}
