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
            className="flex-1 bg-white"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <BackHeader
                title="Weather"
                desc="Manage Your Weather & Orchards"
            />


            <View className="h-fit pb-10"
                style={{ backgroundColor: "red" }}
            >
                <SearchBar search={search} setSearch={setSearch} />

                <View className="mb-4">
                    <Text className="text-dark text-3xl font-bold">
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
                    }}
                />


                <HourlyCard />
                {/* <StormCard /> */}
                {/* <WeeklyCard /> */}


                {/* <View className="mt-6 flex-row justify-between ">
                    <UVCard />
                    <FeelsLikeCard />
                </View> */}
                {/* <WindCard /> */}
                {/* <View className="mt-6 flex-row justify-between ">
                    <PressureCard />
                    <Precipitation />

                </View> */}


                {/* <View className="mt-6 flex-row justify-between">
                    <VisibilityCard />
                    <SunsetCard />

                </View> */}
                {/* <View className="mt-6 flex-row justify-between">
                    <MoonCard />
                    <AveragesCard />
                    <HumidityCard />

                </View> */}
                {/* <PrecipitationCard /> */}

            </View>
            <View className="h-16">

                <Text className="text-dark text-center text-sm">
                    Data provided by Zirat Weather Services.
                </Text>
            </View>
        </ScreenLayout >
    );
}
