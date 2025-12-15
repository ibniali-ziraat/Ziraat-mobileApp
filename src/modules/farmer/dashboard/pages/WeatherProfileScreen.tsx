import { useCallback, useState } from "react";
import {
    ScrollView,
    RefreshControl,
    Text,
    View,
} from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import SearchBar from "@/src/components/shared/SearchBar";
import WeatherCard from "@/src/modules/home/components/weatherCard";
import HourlyCard from "@/src/components/HourlyCard";
import StormCard from "@/src/components/StormCard";
import WeeklyCard from "@/src/components/WeeklyCard";
import WindCard from "@/src/components/WindCard";
import VisibilityCard from "@/src/components/VisibilityCard";
import HumidityCard from "@/src/components/HumidityCard";
import AveragesCard from "@/src/components/AveragesCard";
import { SunsetCard } from "@/src/components/SunsetCard";
import { Precipitation } from "@/src/components/Precipitation";
import { PressureCard } from "@/src/components/PressureCard";
import { UVIndexCard } from "@/src/components/UVIndexCard";
// import MoonCard from "@/src/components/MoonCard"; // optional

export default function WeatherScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");

    const current = {
        location: "Srinagar",
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
        lastUpdated: "11:30 AM",
        sunrise: "06:42",
        sunset: "17:18",
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <ScrollView
            className="flex-1 bg-white"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <BackHeader
                title="Weather"
                desc="Manage Your Weather & Orchards"
            />

            <View className="pb-10 ">
                <SearchBar search={search} setSearch={setSearch} />

                {/* Location */}
                <View className="mb-4">
                    <Text className="text-black text-3xl font-bold">
                        {current.location}
                    </Text>
                    <Text className="text-black/70 mt-1 text-sm">
                        Updated: {current.lastUpdated}
                    </Text>
                </View>

                {/* Main Weather */}
                <WeatherCard
                    current={{
                        tempC: 27,
                        feelsLikeC: 29,
                        condition: "Partly cloudy",
                        humidity: 62,
                        windKph: 14,
                        windDir: "NE",
                    }}
                />


                <HourlyCard />
                <StormCard />
                <WeeklyCard />

                <View className="h-4" />

                <WindCard />

                {/* GRID ROW 1 */}
                <View className="flex-row justify-between mt-4">
                    <VisibilityCard visibility={current.visibility} />
                    <SunsetCard sunset={current.sunset} sunrise={current.sunrise} />
                </View>

                {/* GRID ROW 2 */}
                <View className="flex-row justify-between">

                    <UVIndexCard value={current.uv} />
                    <Precipitation />
                </View>

                {/* GRID ROW 3 */}
                <View className="flex-row justify-between">
                    <HumidityCard humidity={current.humidity} />
                    <PressureCard pressure={current.pressure} />
                </View>

                {/* Optional full-width */}
                {/* <MoonCard /> */}

                <View className="h-6" />

                <View className="flex-row justify-between">
                    <AveragesCard />

                </View>

                <View className="h-16" />

                <Text className="text-dark text-center text-sm">
                    Data provided by Zirat Weather Services.
                </Text>
            </View>
        </ScrollView>
    );
}
