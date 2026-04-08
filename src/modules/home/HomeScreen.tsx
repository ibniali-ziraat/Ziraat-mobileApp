import { router } from "expo-router";
import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

import AnimatedTabContent from "@/src/components/shared/AnimatedTabContent";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";

import { useLocation } from "@/src/hooks/useLocationPermission";
import { useWeatherQuery } from "@/src/hooks/useWeatherQuery";

import LegalDisclaimer from "@/src/components/shared/LegalDisclaimer";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { toast } from "@backpackapp-io/react-native-toast";

import ProductsList from "../products/components/AllProductsCarousel";
import { useProductsData } from "../products/hooks/data/useProductsData";
import { useWishlist } from "../wishlist/hooks/useWishlist";

import FarmerTipsCard from "./components/FarmerTipsCard";
import FarmOverviewChart from "./components/FarmOverviewChart";
import QuickActions from "./components/QuickActions";
import SectionTitle from "./components/SectionTitle";
import WeatherCard from "./components/weatherCard";

export default function HomeScreen() {
  const { coords } = useLocation();

  const {
    wishlist,
    isWishlistBusy,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const {
    products: allProducts = [],
  } = useProductsData();

  const { data } = useWeatherQuery({
    lat: coords?.lat ?? 34.0837,
    lon: coords?.lon ?? 74.7973,
    asl: 1593,
  });

  const currentWeather = useMemo(() => {
    if (!data) return null;
    if (data.data_current) {
      return {
        tempC: data.data_current.temperature,
        condition: data.data_current.pictocode,
        highTemp: Math.round(data.data_day.temperature_max[0]),
        lowTemp: Math.round(data.data_day.temperature_min[0]),
      };
    }
    return null;
  }, [data]);

  const handleAddToWishlist = async (productId: string) => {
    await addToWishlist({ productId });
    toast.success("Added to wishlist");
  };

  const handleRemoveFromWishlist = async (id: number) => {
    await removeFromWishlist({ id });
    toast.success("Removed from wishlist");
  };

  return (
    <ScreenLayout>
      <ScreenContent>
        <AnimatedTabContent>
          <View
            style={{ backgroundColor: colors.light }}
            className="flex-1 pt-4"
          >
            <TouchableOpacity
              onPress={() => router.push(ROUTES.WEATHER.DETAILS)}
            >
              <WeatherCard current={currentWeather} />
            </TouchableOpacity>

            <QuickActions />

            <SectionTitle
              title="Top Pesticides for Healthy Crop Growth"
              icon="cube-outline"
            />

            <ProductsList
              items={allProducts}
              wishlistItems={wishlist}
              onToggleWishlist={(id) => {
                const exists = wishlist.some(
                  (w) => String(w.productId) === String(id)
                );
                router.push("/notifications");

                if (exists) {
                  handleRemoveFromWishlist(id);
                } else {
                  handleAddToWishlist(id);
                }
              }}
              isWishlistBusy={isWishlistBusy}
              variant="carousel"
            />

            <SectionTitle title="Farm Overview" icon="stats-chart-outline" />
            <FarmOverviewChart />

            <SectionTitle
              title="Farmer Tips & Awareness"
              icon="bulb-outline"
            />
            <FarmerTipsCard />

            <View className="mb-20">
              <LegalDisclaimer />
            </View>
          </View>
        </AnimatedTabContent>
      </ScreenContent>
    </ScreenLayout>
  );
}