import { Pressable } from "@/src/components/shared/Pressable";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import {
  ChevronRight,
  Droplets,
  MapPin,
  Thermometer,
  Umbrella,
  Wind,
  type LucideIcon,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getWeatherPresentation } from "../../utils/weatherPictogram";
import type { WeatherHourPoint, WeatherState } from "../../utils/weatherUtils";
import HourlyTemperatureChart from "./HourlyTemperatureChart";

type Props = {
  visible: boolean;
  onClose: () => void;
  weather: WeatherState | null;
  hourly: WeatherHourPoint[];
};

function DetailTile({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        minWidth: "45%",
        borderRadius: 18,
        borderCurve: "continuous",
        borderWidth: 1,
        borderColor: cardTokens.hairline,
        backgroundColor: cardTokens.surface,
        paddingHorizontal: 14,
        paddingVertical: 13,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon size={13} color={chartTokens.current} strokeWidth={2} />
        <Text
          numberOfLines={1}
          style={[
            typography.Poppins_xs_regular,
            { color: cardTokens.inkMuted, fontSize: 13, marginLeft: 5 },
          ]}
        >
          {label}
        </Text>
      </View>

      <Text
        style={[
          typography.Poppins_m_semibold,
          { color: cardTokens.inkPrimary, fontSize: 18, marginTop: 5 },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

/**
 * Today's weather in one glance: the current reading, the four numbers that
 * change what a farmer does today, and the next twelve hours as a chart.
 * The full multi-day forecast stays one tap away rather than being duplicated
 * here.
 */
export default function WeatherDetailSheet({
  visible,
  onClose,
  weather,
  hourly,
}: Props) {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(0);

  // Reopening should always land on "now", not on last session's selection.
  useEffect(() => {
    if (visible) setSelected(0);
  }, [visible]);

  const presentation = getWeatherPresentation(
    weather?.condition ?? 0,
    weather?.conditionSet ?? "daily",
    weather?.isDaylight !== 0,
  );
  const Icon = presentation.icon;

  const point = hourly[selected];
  const rainChance = point?.rainChance ?? null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        onPress={onClose}
        accessibilityLabel="Close weather details"
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}
      />

      <View
        style={{
          backgroundColor: cardTokens.surface,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          borderCurve: "continuous",
          paddingTop: 10,
          paddingBottom: Math.max(insets.bottom, 16) + 8,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.14,
          shadowRadius: 24,
          elevation: 24,
        }}
      >
        <View
          style={{
            alignSelf: "center",
            width: 40,
            height: 4,
            borderRadius: 2,
            backgroundColor: chartTokens.track,
          }}
        />

        <ScrollView
          style={{ maxHeight: 560 }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Current reading */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 54,
                height: 54,
                borderRadius: 27,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: chartTokens.tint,
              }}
            >
              <Icon size={26} color={chartTokens.current} strokeWidth={1.8} />
            </View>

            <View style={{ flex: 1, marginLeft: 14 }}>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text
                  style={[
                    typography.Poppins_xl_semibold,
                    {
                      color: cardTokens.inkPrimary,
                      fontSize: 40,
                      lineHeight: 46,
                    },
                  ]}
                >
                  {typeof weather?.tempC === "number"
                    ? `${weather.tempC}°`
                    : "--°"}
                </Text>
                <Text
                  style={[
                    typography.Poppins_xs_medium,
                    {
                      color: cardTokens.inkSecondary,
                      fontSize: 14,
                      marginLeft: 10,
                    },
                  ]}
                >
                  H {weather?.highTemp ?? "--"}° · L {weather?.lowTemp ?? "--"}°
                </Text>
              </View>

              <Text
                numberOfLines={1}
                style={[
                  typography.Poppins_s_medium,
                  { color: cardTokens.inkSecondary, fontSize: 15 },
                ]}
              >
                {presentation.label}
              </Text>

              {weather?.locationName ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 3,
                  }}
                >
                  <MapPin size={12} color={cardTokens.inkMuted} />
                  <Text
                    numberOfLines={1}
                    style={[
                      typography.Poppins_xs_regular,
                      {
                        color: cardTokens.inkMuted,
                        fontSize: 13.5,
                        marginLeft: 4,
                      },
                    ]}
                  >
                    {weather.locationName}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* The four numbers worth acting on */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 20,
            }}
          >
            <DetailTile
              icon={Thermometer}
              label="Feels like"
              value={
                typeof weather?.feelsLikeC === "number"
                  ? `${weather.feelsLikeC}°`
                  : "--"
              }
            />
            <DetailTile
              icon={Droplets}
              label="Humidity"
              value={
                typeof weather?.humidity === "number"
                  ? `${Math.round(weather.humidity)}%`
                  : "--"
              }
            />
            <DetailTile
              icon={Wind}
              label="Wind"
              value={
                typeof weather?.windKph === "number"
                  ? `${weather.windKph} km/h`
                  : "--"
              }
            />
            <DetailTile
              icon={Umbrella}
              label="Rain chance"
              value={rainChance === null ? "--" : `${rainChance}%`}
            />
          </View>

          {/* Hourly chart */}
          {hourly.length > 1 ? (
            <View
              style={{
                marginTop: 20,
                borderRadius: 22,
                borderCurve: "continuous",
                borderWidth: 1,
                borderColor: cardTokens.hairline,
                backgroundColor: cardTokens.surface,
                paddingHorizontal: 16,
                paddingTop: 16,
                paddingBottom: 14,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text
                    style={[
                      typography.Poppins_s_semibold,
                      { color: cardTokens.inkPrimary, fontSize: 16 },
                    ]}
                  >
                    Next 12 hours
                  </Text>
                  <Text
                    style={[
                      typography.Poppins_xs_regular,
                      {
                        color: cardTokens.inkMuted,
                        fontSize: 13,
                        marginTop: 1,
                      },
                    ]}
                  >
                    Tap an hour to read its temperature
                  </Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={[
                      typography.Poppins_l_semibold,
                      { color: chartTokens.current, fontSize: 22 },
                    ]}
                  >
                    {point ? `${point.tempC}°` : "--"}
                  </Text>
                  <Text
                    style={[
                      typography.Poppins_xs_regular,
                      { color: cardTokens.inkMuted, fontSize: 13 },
                    ]}
                  >
                    {selected === 0 ? "Now" : point?.label}
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 16 }}>
                <HourlyTemperatureChart
                  hours={hourly}
                  selected={selected}
                  onSelect={setSelected}
                />
              </View>
            </View>
          ) : null}

          <Pressable
            onPress={() => {
              onClose();
              router.push(ROUTES.WEATHER.DETAILS);
            }}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 16,
              paddingVertical: 14,
              borderRadius: 18,
              borderCurve: "continuous",
              backgroundColor: chartTokens.tint,
              opacity: pressed ? 0.75 : 1,
            })}
          >
            <Text
              style={[
                typography.Poppins_s_semibold,
                { color: chartTokens.current, fontSize: 15.5 },
              ]}
            >
              View full forecast
            </Text>
            <ChevronRight size={16} color={chartTokens.current} />
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
}
