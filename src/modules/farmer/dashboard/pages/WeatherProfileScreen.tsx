import AveragesCard from "@/src/components/AveragesCard";
// import CustomLineChart from "@/src/components/charts/CustomLineChart";
import HourlyCard from "@/src/components/HourlyCard";
import HumidityCard from "@/src/components/HumidityCard";
import MoonCard from "@/src/components/MoonCard";
import Precipitation from "@/src/components/Precipitation";
import PrecipitationCard from "@/src/components/PrecipitationCard";
import PressureCard from "@/src/components/PressureCard";
import BackHeader from "@/src/components/shared/BackHeader";
import SearchBar from "@/src/components/shared/SearchBar";
import StormCard from "@/src/components/StormCard";
import SunsetCard from "@/src/components/SunsetCard";
import SunriseCard from "@/src/components/SunsetCard";
import UVIndexCard from "@/src/components/UvIndex";
import VisibilityCard from "@/src/components/VisibilityCard";
import WeeklyCard from "@/src/components/WeeklyCard";
import WindCard from "@/src/components/WindCard";
import WeatherCard from "@/src/modules/home/components/weatherCard";


import {
    CloudLightning,
    CloudRain,
    Droplets,
    Sun,
    Wind
} from "lucide-react-native";
import { useCallback, useState } from "react";
import {
    Dimensions,
    FlatList,
    ImageBackground,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
type Hourly = { time: string; temp: number; precipProb?: number; icon: string };

const { width } = Dimensions.get("window");

export default function WeatherScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");
    const current = {
        location: "Srinagar",
        tempT: "Sunny",
        tempC: 22,
        feelsLikeC: 21,
        condition: "Partly Cloudy",
        humidity: 72,
        windKph: 12,
        windDir: "NE",
        windGustKph: 18,
        visibility: 9,
        pressure: 1012,
        uv: 6,
        aqi: 52,
        lastUpdated: "11:30 AM",
        sunrise: "06:42",
        sunset: "17:18",
        moonPhase: "Waxing Gibbous",
        avgTemp: 22,
    };
    const hourly: Hourly[] = Array.from({ length: 12 }).map((_, i) => ({
        time: `${(6 + i) % 24}:00`,
        temp: 18 + (i % 5),
        precipProb: Math.round(Math.abs(Math.sin(i / 2)) * 40),
        icon: i % 3 === 0 ? "sun" : i % 3 === 1 ? "rain" : "cloud",
    }));
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);
    const iconSwitch = (icon: string) => {
        switch (icon) {
            case "sun":
                return <Sun size={24} color="#c7611f" />;
            case "rain":
                return <CloudRain size={24} color="#c7611f" />;
            default:
                return <Wind size={24} color="rgba(0, 0, 0, 0.5)" />;
        }
    };
    return (
        <ScrollView
            className="flex-1 bg-white"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <BackHeader

                title="Weather"
                desc="Manage Your Weather & Orchards"
            ></BackHeader>
            <View className="pb-10">

                <SearchBar search={search} setSearch={setSearch} />

                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-black text-3xl font-bold">{current.location}</Text>
                        <Text className="text-black/70 mt-1 text-sm">
                            Updated: {current.lastUpdated}
                        </Text>
                    </View>
                </View>
                <WeatherCard
                    current={{
                        tempC: 27,
                        feelsLikeC: 29,
                        condition: "Partly cloudy",
                        humidity: 62,
                        windKph: 14,
                        windDir: "NE"
                    }}
                />
                <View className="h-3" />
                <HourlyCard />
                <StormCard />
                <WeeklyCard />
                <PrecipitationCard />
                <View className="h-7" />
                <WindCard />

                <View className="flex-row justify-between">
                    <VisibilityCard visibility={current.visibility} />
                    <HumidityCard humidity={current.humidity} />
                </View>

                <MoonCard phase={current.moonPhase} />
                <View className="flex-row justify-between">
                    <AveragesCard />
                    <PressureCard pressure={current.pressure} />
                </View>
                <View className="h-20" />
                <Text className="text-dark text-center text-sm mb-6">
                    Data provided by Zirat Weather Services.

                </Text>
            </View>
        </ScrollView>
    );
}
