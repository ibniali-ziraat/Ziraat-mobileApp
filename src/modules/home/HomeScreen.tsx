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
import FarmOverviewChart from "./components/FarmOverviewChart";
import FarmerTipsCard from "./components/FarmerTipsCard";
import QuickActions from "./components/QuickActions";
import SectionTitle from "./components/SectionTitle";
import WeatherCard from "./components/weatherCard";

export default function HomeScreen() {
  const { coords, loading: locLoading } = useLocation();
  const {
    wishlist,
    isWishlistBusy,
    addToWishlist,
    removeFromWishlist,
    isAdding,
    isRemoving,
  } = useWishlist();
  // const { products, isLoading: productsLoading } = useProductsData();
  const {
    products: allProducts = [],
    filterOptions = [],
    isLoading: productsLoading,
  } = useProductsData();

  const { data, isLoading: weatherLoading } = useWeatherQuery({
    lat: coords?.lat ?? 34.0837,
    lon: coords?.lon ?? 74.7973,
    asl: 1593,
  });

  const currentWeather = useMemo(() => {
    if (!data) return null;

    if (data.data_current) {
      return {
        tempC: Math.round(data.data_current.temperature),
        feelsLikeC: Math.round(data.data_current.temperature),
        condition: data.data_current.pictocode,
        humidity: data.data_current.relativehumidity ?? 0,
        windKph: Math.round(data.data_current.windspeed),
        windDir: 0,
        isDaylight: data.data_current.isdaylight,
        highTemp: Math.round(data.data_day.temperature_max[0]),
        lowTemp: Math.round(data.data_day.temperature_min[0]),
      };
    }

    const hour = new Date().getHours();

    return {
      tempC: Math.round(data.data_1h.temperature[hour]),
      feelsLikeC: Math.round(data.data_1h.felttemperature[hour]),
      condition: data.data_1h.pictocode[hour],
      humidity: data.data_1h.relativehumidity[hour],
      windKph: Math.round(data.data_1h.windspeed[hour]),
      windDir: data.data_1h.winddirection[hour],
      highTemp: Math.round(data.data_day.temperature_max[0]),
      lowTemp: Math.round(data.data_day.temperature_min[0]),
    };
  }, [data]);

  const handleAddToWishlist = async (productId: string) => {
    await addToWishlist({ productId });
    toast.success("Added to wishlist");
  };

  const handleRemoveFromWishlist = async (id: number) => {
    await removeFromWishlist({ id });
    toast.success("Removed from wishlist");
  };

  // if (locLoading || weatherLoading || productsLoading) {
  //   return <Loader />;
  // }

  return (
    <ScreenLayout>
      <ScreenContent>
        <AnimatedTabContent>
          <View
            style={{ backgroundColor: colors.light }}
            className="flex-1  pt-4"
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

            {/* <ProductCarousel items={products.slice(0, 8)} /> */}

            <ProductsList
              items={allProducts}
              wishlistItems={wishlist}
              onToggleWishlist={(id) => {
                const exists = wishlist.some(
                  (w) => String(w.productId) === String(id),
                );

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

            <SectionTitle title="Farmer Tips & Awareness" icon="bulb-outline" />
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
