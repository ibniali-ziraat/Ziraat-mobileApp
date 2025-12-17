import { useCallback, useState } from "react";
import {
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
import { Precipitation } from "@/src/components/Precipitation";

import FeelsLikeCard from "@/src/components/FeelsLikeCard";
import UVCard from "@/src/components/UVCard";
import SunsetCard from "@/src/components/SunsetCard";
import PressureCard from "@/src/components/PressureCard";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { MoonCard } from "@/src/components/MoonCard";
import PrecipitationCard from "@/src/components/PrecipitationCard";


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
        <ScreenLayout
            className="flex-1"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <BackHeader
                title="Weather"
                desc="Manage Your Weather & Orchards" />
            <View className="h-fit pb-10" >
                <SearchBar search={search} setSearch={setSearch} />

                <View className="mb-1">
                    <Text className="text-dark text-3xl font-semibold">
                        {current.location}
                    </Text>
                    <Text className="text-dark mt-1 text-md">
                        Updated: {current.lastUpdated}
                    </Text>
                </View>

                <WeatherCard
                    current={{
                        tempC: 27,
                        feelsLikeC: 29,
                        condition: "Partly cloudy",
                        humidity: 62,
                        windKph: 14,
                        windDir: "NE",
                    }} />
                <HourlyCard />
                <StormCard />
                <WeeklyCard />


                <View className="flex-row justify-between ">
                    <FeelsLikeCard temp={21} />
                    <UVCard
                        value={6}
                        level="High"
                        advice="Use sun protection until 5PM."
                    />
                </View>
                <WindCard
                    speed={10}
                    gusts={19}
                    degree={200}
                    direction="SSE / mph" />

                <View className="mt-4 flex-row justify-between">
                    <PressureCard value={1028} />
                    <HumidityCard />


                </View>




                <View className="mt-2 flex-row justify-between mb-3">
                    <VisibilityCard />
                    <SunsetCard />

                </View>
                <MoonCard />
                <View className=" flex-row justify-between">
                    <AveragesCard />
                    <Precipitation />

                </View>

                <PrecipitationCard />

            </View>
            <View className="h-16">
                <Text className="text-dark text-xl text-center font-semibold">
                    Weather for Srinagar

                </Text>
                <Text className=" mt-3 text-dark text-center text-sm">
                    Data provided by Zirat Weather Services.
                </Text>
            </View>
        </ScreenLayout >
    );
}
