import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import {
  ArrowRight,
  CalendarDays,
  Ruler,
  ShieldCheck,
  Sprout,
  Trees,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface OrchardCardProps {
  orchard: any;
}

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
            backgroundColor: colors.light,
            borderWidth: 1,
            borderColor: colors.cardBorder,
          }}
        >

          <View
            className="px-5 pt-5 pb-7"
            style={{
              backgroundColor: colors.primary + "08",
            }}
          >
            <View className="flex-row items-center">
              <View
                className="h-16 w-16 rounded-[24px] items-center justify-center"
                style={{
                  backgroundColor: colors.light,
                }}
              >
                <Trees size={30} color={colors.primary} />
              </View>
              <View className="ml-4 flex-1">
                <Text
                  numberOfLines={2}
                  style={[
                    typography.Poppins_m_semibold,
                    {
                      fontSize: 22,
                      color: colors.dark,
                      lineHeight: 30,
                    },
                  ]}
                >
                  {orchard.orchardName}
                </Text>

                <View
                  className="self-start mt-3 px-4 py-1.5 rounded-full"
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
                        letterSpacing: 0.3,
                      },
                    ]}
                  >
                    {orchard.ownershipType}
                  </Text>
                </View>
              </View>
            </View>
          </View>


          <View className="p-5">

            <View className="flex-row items-center justify-between mb-4">
              <Text
                style={[
                  typography.Poppins_m_semibold,
                  {
                    color: colors.dark,
                    fontSize: 16,
                  },
                ]}
              >
                Orchard Information
              </Text>

              <View
                className="px-3 py-1 rounded-full"
                style={{
                  backgroundColor: colors.primary + "10",
                }}
              >
                <Text
                  style={[
                    typography.Poppins_m_medium,
                    {
                      fontSize: 10,
                      color: colors.primary,
                    },
                  ]}
                >
                  Registered
                </Text>
              </View>
            </View>


            <View className="flex-row gap-3 mb-3">

              <View
                className="flex-1 rounded-3xl p-4"
                style={{
                  backgroundColor: colors.light,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                }}
              >
                <View className="flex-row items-center mb-3">
                  <View
                    className="h-8 w-8 rounded-xl items-center justify-center"
                    style={{
                      backgroundColor: colors.primary + "12",
                    }}
                  >
                    <Ruler size={15} color={colors.primary} />
                  </View>

                  <Text
                    style={[
                      typography.Poppins_m_medium,
                      {
                        fontSize: 11,
                        color: colors.neutral,
                        marginLeft: 8,
                      },
                    ]}
                  >
                    Orchard Size
                  </Text>
                </View>

                <Text
                  style={[
                    typography.Poppins_m_semibold,
                    {
                      fontSize: 16,
                      color: colors.dark,
                    },
                  ]}
                >
                  {orchardSize}
                </Text>
              </View>
              <View
                className="flex-1 rounded-3xl p-4"
                style={{
                  backgroundColor: colors.light,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                }}
              >
                <View className="flex-row items-center mb-3">
                  <View
                    className="h-8 w-8 rounded-xl items-center justify-center"
                    style={{
                      backgroundColor: colors.primary + "12",
                    }}
                  >
                    <CalendarDays size={15} color={colors.primary} />
                  </View>

                  <Text
                    style={[
                      typography.Poppins_m_medium,
                      {
                        fontSize: 11,
                        color: colors.neutral,
                        marginLeft: 8,
                      },
                    ]}
                  >
                    Established
                  </Text>
                </View>

                <Text
                  style={[
                    typography.Poppins_m_semibold,
                    {
                      fontSize: 16,
                      color: colors.dark,
                    },
                  ]}
                >
                  {orchard.establishmentYear || "-"}
                </Text>
              </View>
            </View>


            <View className="flex-row gap-3">

              <View
                className="flex-1 rounded-3xl p-4"
                style={{
                  backgroundColor: colors.light,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                }}
              >
                <View className="flex-row items-center mb-3">
                  <View
                    className="h-8 w-8 rounded-xl items-center justify-center"
                    style={{
                      backgroundColor: colors.primary + "12",
                    }}
                  >
                    <Sprout size={15} color={colors.primary} />
                  </View>

                  <Text
                    style={[
                      typography.Poppins_m_medium,
                      {
                        fontSize: 11,
                        color: colors.neutral,
                        marginLeft: 8,
                      },
                    ]}
                  >
                    Plantation
                  </Text>
                </View>

                <Text
                  numberOfLines={1}
                  style={[
                    typography.Poppins_m_semibold,
                    {
                      fontSize: 16,
                      color: colors.dark,
                    },
                  ]}
                >
                  {orchard.plantationPattern || "-"}
                </Text>
              </View>


              <View
                className="flex-1 rounded-3xl p-4"
                style={{
                  backgroundColor: colors.light,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                }}
              >
                <View className="flex-row items-center mb-3">
                  <View
                    className="h-8 w-8 rounded-xl items-center justify-center"
                    style={{
                      backgroundColor: colors.primary + "12",
                    }}
                  >
                    <ShieldCheck size={15} color={colors.primary} />
                  </View>

                  <Text
                    style={[
                      typography.Poppins_m_medium,
                      {
                        fontSize: 11,
                        color: colors.neutral,
                        marginLeft: 8,
                      },
                    ]}
                  >
                    Ownership
                  </Text>
                </View>

                <Text
                  numberOfLines={1}
                  style={[
                    typography.Poppins_m_semibold,
                    {
                      fontSize: 16,
                      color: colors.dark,
                    },
                  ]}
                >
                  {orchard.ownershipType || "-"}
                </Text>
              </View>
            </View>


            <View
              className="flex-row items-center mt-5 px-4 py-4 rounded-3xl"
              style={{
                backgroundColor: colors.light,
                borderWidth: 1,
                borderColor: colors.cardBorder,
              }}
            >
              <View
                className="h-11 w-11 rounded-2xl items-center justify-center"
                style={{
                  backgroundColor: colors.primary + "12",
                }}
              >
                <CalendarDays size={18} color={colors.primary} />
              </View>

              <View className="ml-3 flex-1">
                <Text
                  style={[
                    typography.Poppins_m_semibold,
                    {
                      color: colors.dark,
                      fontSize: 13,
                    },
                  ]}
                >
                  Orchard Overview
                </Text>

                <Text
                  style={[
                    typography.Poppins_m_medium,
                    {
                      color: colors.neutral,
                      fontSize: 11,
                      marginTop: 2,
                    },
                  ]}
                >
                  Registered orchard information and details
                </Text>
              </View>
            </View>


            <Pressable
              onPress={() =>
                router.push({
                  pathname: ROUTES.ORCHARDS.DETAILS.ORCHARD_DETAILS,
                  params: { id: orchard.id },
                })
              }
              className="mt-5 rounded-[26px] py-4 px-5 flex-row items-center justify-between"
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
                      color: colors.light,
                      fontSize: 11,
                      marginTop: 3,
                      opacity: 0.9,
                    },
                  ]}
                >
                  Open complete orchard information
                </Text>
              </View>

              <View
                className="h-11 w-11 rounded-full items-center justify-center"
                style={{
                  backgroundColor: colors.light + "20",
                }}
              >
                <ArrowRight size={18} color={colors.light} />
              </View>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: colors.primary + "50",
            marginHorizontal: 2,
          }}
        />



      </ScreenContent>
    </ScreenLayout>
  );
}