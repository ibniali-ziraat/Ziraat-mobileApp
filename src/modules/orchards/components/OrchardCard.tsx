import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import {
  ArrowRight,
  CalendarDays,
  Trees
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface OrchardCardProps {
  orchard: any;
}

const DetailChip = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <View
      className="flex-1 rounded-2xl p-4"
      style={{
        backgroundColor: "#FAFAFA",
      }}
    >
      <Text
        style={[
          typography.Poppins_m_medium,
          {
            fontSize: 11,
            color: "#8D8D8D",
            marginBottom: 6,
          },
        ]}
      >
        {label}
      </Text>

      <Text
        numberOfLines={1}
        style={[
          typography.Poppins_m_semibold,
          {
            fontSize: 15,
            color: colors.dark,
          },
        ]}
      >
        {value || "-"}
      </Text>
    </View>
  );
};

export default function OrchardCard({ orchard }: OrchardCardProps) {
  const orchardSize =
    orchard?.kanals > 0
      ? `${orchard.kanals} kanals`
      : orchard?.marlas > 0
        ? `${orchard.marlas} marlas`
        : "-";

  return (
    <ScreenLayout>
      <ScreenContent>
        <View
          className="rounded-[32px] overflow-hidden mb-6"
          style={{
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#F1F1F1",
          }}
        >
          {/* TOP SECTION */}
          <View
            className="px-5 pt-5 pb-6"
            style={{
              backgroundColor: colors.primary + "08",
            }}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-row flex-1">
                {/* ICON */}
                <View
                  className="h-14 w-14 rounded-2xl items-center justify-center"
                  style={{
                    backgroundColor: "#fff",
                  }}
                >
                  <Trees size={28} color={colors.primary} />
                </View>

                {/* TITLE */}
                <View className="ml-4 flex-1">
                  <Text
                    numberOfLines={2}
                    style={[
                      typography.Poppins_m_semibold,
                      {
                        fontSize: 21,
                        color: colors.dark,
                        lineHeight: 28,
                      },
                    ]}
                  >
                    {orchard.orchardName}
                  </Text>

                  <View
                    className="self-start mt-3 px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: colors.primary + "15",
                    }}
                  >
                    <Text
                      style={[
                        typography.Poppins_m_medium,
                        {
                          fontSize: 11,
                          color: colors.primary,
                        },
                      ]}
                    >
                      {orchard.ownershipType}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* CONTENT */}
          <View className="p-5">
            {/* GRID */}
            <View className="flex-row gap-3 mb-3">
              <DetailChip
                label="Orchard Size"
                value={orchardSize}
              />

              <DetailChip
                label="Established"
                value={orchard.establishmentYear || "-"}
              />
            </View>

            <View className="flex-row gap-3">
              <DetailChip
                label="Plantation"
                value={orchard.plantationPattern || "-"}
              />

              <DetailChip
                label="Ownership"
                value={orchard.ownershipType || "-"}
              />
            </View>

            {/* MINI INFO */}
            <View
              className="flex-row items-center mt-5 px-4 py-3 rounded-2xl"
              style={{
                backgroundColor: colors.light,
              }}
            >
              <CalendarDays size={18} color={colors.primary} />

              <Text
                style={[
                  typography.Poppins_m_medium,
                  {
                    marginLeft: 10,
                    color: colors.dark,
                    fontSize: 13,
                    flex: 1,
                  },
                ]}
              >
                Orchard registered information overview
              </Text>
            </View>

            {/* BUTTON */}
            <Pressable
              onPress={() =>
                router.push({
                  pathname: ROUTES.ORCHARDS.DETAILS.ORCHARD_DETAILS,
                  params: { id: orchard.id },
                })
              }
              className="mt-5 rounded-2xl py-4 px-5 flex-row items-center justify-between"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              <View>
                <Text
                  style={[
                    typography.Poppins_m_semibold,
                    {
                      color: colors.light,
                      fontSize: 15,
                    },
                  ]}
                >
                  View Orchard Details
                </Text>

                <Text
                  style={[
                    typography.Poppins_m_medium,
                    {
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 11,
                      marginTop: 2,
                    },
                  ]}
                >
                  Open complete orchard information
                </Text>
              </View>

              <View
                className="h-10 w-10 rounded-full items-center justify-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
              >
                <ArrowRight size={18} color={colors.light} />
              </View>
            </Pressable>
          </View>
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}