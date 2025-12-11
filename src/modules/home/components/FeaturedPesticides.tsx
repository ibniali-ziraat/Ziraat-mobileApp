// components/home/FeaturedPesticides.tsx

import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

// ---------------- Skeleton Loader ----------------
function Skeleton({ width, height, radius = 8 }) {
  const opacity = useSharedValue(0.3);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
  }, []);

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: "#e5e5e5",
        },
      ]}
    />
  );
}

// ---------------- Product Card ----------------
function ProductCard({ product }) {
  const scale = useSharedValue(1);
  const fadeIn = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: fadeIn.value,
  }));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 500 });
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const productIcon =
    product.tag?.toLowerCase() === "organic"
      ? "leaf-outline"
      : "flask-outline";

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width: 185,
          backgroundColor: "#fff",
          borderRadius: 24,
          padding: 16,
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.06)",
        },
      ]}
      onTouchStart={() => (scale.value = withTiming(0.94))}
      onTouchEnd={() => (scale.value = withTiming(1))}
    >
      {/* PRODUCT IMAGE */}
      <View
        style={{
          width: "100%",
          height: 140,
          borderRadius: 18,
          overflow: "hidden",
          backgroundColor: "#f0f0f0",
          marginBottom: 12,
          position: "relative",
        }}
      >
        {loading ? (
          <Skeleton width="100%" height="100%" radius={18} />
        ) : (
          <>
            <Image
              source={{ uri: product.img }}
              className="w-full h-full"
              resizeMode="cover"
            />

           
            <View
              style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "#ffffffdd",
                padding: 6,
                borderRadius: 30,
              }}
            >
              <Ionicons name={productIcon} size={16} color={colors.secondary} />
            </View>
          </>
        )}
      </View>

      {/* PRODUCT NAME */}
      {!loading && (
        <Text
          className="text-[16px] font-semibold text-center"
          style={{ color: colors.dark }}
        >
          {product.name}
        </Text>
      )}

      {/* DESCRIPTION */}
      {!loading && (
        <Text
          className="text-[12px] text-center mt-1"
          style={{ color: colors.dark + "AA" }}
        >
          {product.desc}
        </Text>
      )}

      {/* VIEW BUTTON */}
      {!loading && (
        <TouchableOpacity
          className="mt-5 py-2 rounded-full flex-row items-center justify-center"
          style={{
            backgroundColor: colors.secondary,
            shadowColor: colors.secondary,
            shadowOpacity: 0.25,
            shadowRadius: 6,
          }}
        >
          <Text className="text-white ml-2 text-[13px] font-medium">View</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

// ---------------- MAIN LIST ----------------
export default function FeaturedPesticides() {
  const products = [
    {
      name: "CropGuard 250ml",
      desc: "Protects fruits & vegetables from pests.",
      img: "https://tse1.mm.bing.net/th/id/OIP.EOTkhBwoaG01U60HLEcDuQHaFj",
      new: true,
      category: "Pesticide",
    },
    {
      name: "GreenShield 500ml",
      desc: "Eco-friendly spray for orchard pest control.",
      img: "https://tse3.mm.bing.net/th/id/OIP.lrfsaUXeWZBgBu1ruNE6DwHaEo",
      discount: 15,
      category: "Eco Spray",
    },
    {
      name: "AgroMax 1L",
      desc: "Powerful insecticide for fruit trees.",
      img: "https://tse2.mm.bing.net/th/id/OIP.2vuUUPZEu218Jul7q9XIqwHaF7",
      tag: "Organic",
      category: "Organic",
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}
    >
      <View className="flex-row gap-6 mb-14">
        {products.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </View>
    </ScrollView>
  );
}
