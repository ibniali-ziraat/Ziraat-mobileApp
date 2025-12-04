
import SearchBar from "@/src/components/shared/SearchBar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

type OrchardHealth = "healthy" | "at-risk" | "attention";

type Orchard = {
  id: string;
  name: string;
  crop: string;
  location: string;
  region: string;
  stage: string;
  trees: number;
  health: OrchardHealth;
  healthScore: number;
  healthTrend: number[];
  weatherRisk: "low" | "medium" | "high";
  pestRisk: "low" | "medium" | "high";
  yieldDelta: number;
  nextAction: string;
  priority: "low" | "medium" | "high";
};

const MOCK_ORCHARDS: Orchard[] = [
  {
    id: "1",
    name: "Sunrise Orchard",
    crop: "Apple",
    location: "Nashik • MH",
    region: "Nashik",
    stage: "Fruiting",
    trees: 450,
    health: "healthy",
    healthScore: 92,
    healthTrend: [86, 88, 90, 91, 92],
    weatherRisk: "low",
    pestRisk: "low",
    yieldDelta: 12,
    nextAction: "Foliar spray in 3 days",
    priority: "low",
  },
  {
    id: "2",
    name: "Green Valley",
    crop: "Orange",
    location: "Nagpur • MH",
    region: "Nagpur",
    stage: "Flowering",
    trees: 320,
    health: "at-risk",
    healthScore: 63,
    healthTrend: [72, 70, 68, 65, 63],
    weatherRisk: "medium",
    pestRisk: "high",
    yieldDelta: -5,
    nextAction: "Irrigation overdue by 1 day",
    priority: "high",
  },
  {
    id: "3",
    name: "Riverbend Orchard",
    crop: "Mango",
    location: "Ratnagiri • MH",
    region: "Konkan",
    stage: "Vegetative",
    trees: 280,
    health: "attention",
    healthScore: 78,
    healthTrend: [74, 76, 77, 79, 78],
    weatherRisk: "high",
    pestRisk: "medium",
    yieldDelta: 4,
    nextAction: "Pest scouting tomorrow",
    priority: "medium",
  },
  {
    id: "4",
    name: "Hilltop Farm",
    crop: "Pomegranate",
    location: "Solapur • MH",
    region: "Solapur",
    stage: "Fruiting",
    trees: 190,
    health: "healthy",
    healthScore: 88,
    healthTrend: [82, 84, 85, 87, 88],
    weatherRisk: "low",
    pestRisk: "low",
    yieldDelta: 9,
    nextAction: "Fertigation scheduled next week",
    priority: "low",
  },
];

type FilterKey = "all" | "healthy" | "at-risk" | "high-priority";

const OrchardsScreen: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const stats = useMemo(() => {
    const total = MOCK_ORCHARDS.length;
    const healthy = MOCK_ORCHARDS.filter((o) => o.health === "healthy").length;
    const atRisk = MOCK_ORCHARDS.filter((o) => o.health === "at-risk").length;
    const highPriority = MOCK_ORCHARDS.filter(
      (o) => o.priority === "high"
    ).length;
    return { total, healthy, atRisk, highPriority };
  }, []);

  const filteredOrchards = useMemo(() => {
    return MOCK_ORCHARDS.filter((orchard) => {
      if (filter === "healthy" && orchard.health !== "healthy") return false;
      if (filter === "at-risk" && orchard.health !== "at-risk") return false;
      if (filter === "high-priority" && orchard.priority !== "high")
        return false;


      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        orchard.name.toLowerCase().includes(q) ||
        orchard.crop.toLowerCase().includes(q) ||
        orchard.location.toLowerCase().includes(q) ||
        orchard.region.toLowerCase().includes(q)
      );
    });
  }, [filter, search]);

  const globalHealthAvg = useMemo(() => {
    const totalScore = MOCK_ORCHARDS.reduce(
      (sum, o) => sum + o.healthScore,
      0
    );
    return Math.round(totalScore / MOCK_ORCHARDS.length);
  }, []);

  const overallYieldDelta = useMemo(() => {
    const totalDelta = MOCK_ORCHARDS.reduce(
      (sum, o) => sum + o.yieldDelta,
      0
    );
    return Math.round(totalDelta / MOCK_ORCHARDS.length);
  }, []);

  const highWeatherRisk = useMemo(
    () => MOCK_ORCHARDS.filter((o) => o.weatherRisk === "high").length,
    []
  );
  const highPestRisk = useMemo(
    () => MOCK_ORCHARDS.filter((o) => o.pestRisk === "high").length,
    []
  );

  const renderOrchardCard = ({ item, index }: { item: Orchard; index: number }) => {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 80, damping: 16 }}
      >
        <TouchableOpacity
          className="mb-4 rounded-3xl bg-white p-4 border border-neutral shadow-lg shadow-neutral"
          activeOpacity={0.92}
          onPress={() => {
          }}
        >
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center flex-1 pr-2">
              <CropIcon crop={item.crop} />
              <View className="ml-2 flex-1">
                <Text className="text-base font-semibold text-black">
                  {item.name}
                </Text>
                <Text className="text-[11px] text-black mt-0.5">
                  {item.crop} • {item.stage}
                </Text>
              </View>
            </View>
            <HealthPill health={item.health} />
          </View>
          <View className="flex-row items-center mt-2">
            <View className="flex-row items-center flex-1">
              <Ionicons name="location-outline" size={16} color="#c7611f" />
              <Text className="ml-1 text-xs text-black">
                {item.location}
              </Text>
            </View>
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="tree-outline"
                size={20}
                color="#c7611f"
              />
              <Text className="ml-1 text-xs text-black">
                {item.trees} trees
              </Text>
            </View>
          </View>
          <View className="mt-3 flex-row items-center">
            <View className="flex-1 mr-3">
              <View className="flex-row justify-between items-center mb-1.5">
                <Text className="text-[11px] text-black">
                  Health score
                </Text>
                <Text className="text-xs font-semibold text-black">
                  {item.healthScore}%
                </Text>
              </View>
              <View className="h-2 w-full rounded-full bg-white overflow-hidden">
                <MotiView
                  from={{ width: "0%" }}
                  animate={{ width: `${item.healthScore}%` }}
                  transition={{ type: "timing", duration: 700 }}
                  className="h-full rounded-full bg-white"
                />
              </View>

              <View className="mt-1.5">
                <Sparkline values={item.healthTrend} />
              </View>
            </View>

            <View className="w-[1px] h-14 bg-white mx-1" />

            <View className="w-[36%]">
              <RiskBadge
                label="Weather"
                level={item.weatherRisk}
                icon="cloud-outline"
              />
              <View className="h-1" />
              <RiskBadge
                label="Pest"
                level={item.pestRisk}
                icon="bug-outline"
              />
            </View>
          </View>
          <View className="mt-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons
                name={item.yieldDelta >= 0 ? "trending-up-outline" : "trending-down-outline"}
                size={16}
                color={item.yieldDelta >= 0 ? "#c7611f" : "#c7611f"}
              />
              <Text
                className={`ml-1 text-xs font-medium ${item.yieldDelta >= 0
                  ? "text-black"
                  : "text-black"
                  }`}
              >
                {item.yieldDelta >= 0 ? "+" : ""}
                {item.yieldDelta}% yield forecast
              </Text>
            </View>

            <PriorityPill priority={item.priority} />
          </View>
          <View className="mt-3 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 pr-2">
              <MaterialCommunityIcons
                name="calendar-clock"
                size={16}
                color="#c7611f"
              />
              <Text
                className="ml-1 text-xs text-black"
                numberOfLines={1}
              >
                {item.nextAction}
              </Text>
            </View>

            <TouchableOpacity
              className="px-3 py-1.5 rounded-full bg-white border border-neutral"
              activeOpacity={0.9}
            >
              <Text className="text-[11px] font-semibold text-black">
                View actions
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </MotiView>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 pt-2 pb-4">
        <View className="flex-row items-center justify-between mb-3">
          <View>

            <Text className="mt-0.5 text-3xl font-bold text-black">
              Orchards
            </Text>
          </View>

          {/* <View className="flex-row items-center">
            <TouchableOpacity className="h-9 w-9 rounded-full bg-white items-center justify-center border border-neutral mr-2">
              <Ionicons name="notifications-outline" size={18} color="#c7611f" />
            </TouchableOpacity>
            <TouchableOpacity className="h-9 w-9 rounded-full bg-white items-center justify-center border border-neutral">
              <Ionicons name="person-outline" size={18} color="#c7611f" />
            </TouchableOpacity>
          </View> */}
        </View>
        <HeroOverviewCard
          globalHealthAvg={globalHealthAvg}
          overallYieldDelta={overallYieldDelta}
          highWeatherRisk={highWeatherRisk}
          highPestRisk={highPestRisk}
        />
        <View className="mt-4 mb-3">
          <SearchBar />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3"
          >
            <FilterChip
              label="All"
              active={filter === "all"}
              onPress={() => setFilter("all")}
            />
            <FilterChip
              label="Healthy"
              active={filter === "healthy"}
              onPress={() => setFilter("healthy")}
              icon="leaf-outline"
            />
            <FilterChip
              label="At risk"
              active={filter === "at-risk"}
              onPress={() => setFilter("at-risk")}
              icon="warning-outline"
            />
            <FilterChip
              label="High priority"
              active={filter === "high-priority"}
              onPress={() => setFilter("high-priority")}
              icon="alert-circle-outline"
            />
          </ScrollView>
        </View>
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          className="flex-row mb-4"
        >
          <SummaryCard
            label="Total orchards"
            value={stats.total.toString()}
            icon="grid-outline"
          />
          <View className="w-3" />
          <SummaryCard
            label="Healthy"
            value={stats.healthy.toString()}
            icon="leaf-outline"
          />
          <View className="w-3" />
          <SummaryCard
            label="High priority"
            value={stats.highPriority.toString()}
            icon="alert-circle-outline"
            tone="warning"
          />
        </MotiView>
        <View className="flex-1">
          <AnimatePresence>
            {filteredOrchards.length === 0 ? (
              <MotiView
                key="empty"
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 items-center justify-center"
              >
                <MaterialCommunityIcons
                  name="sprout-outline"
                  size={32}
                  color="#c7611f"
                />
                <Text className="mt-2 text-sm text-black">
                  No orchards match your filters.
                </Text>
                <Text className="mt-1 text-xs text-black">
                  Try clearing search or changing status.
                </Text>
              </MotiView>
            ) : (
              <FlatList
                key="list"
                data={filteredOrchards}
                keyExtractor={(item) => item.id}
                renderItem={renderOrchardCard}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
              />
            )}
          </AnimatePresence>
        </View>
        <MotiView
          from={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 200 }}
          className="absolute bottom-4 right-4"
        >
          <MotiView
            from={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{
              loop: true,
              type: "timing",
              duration: 1400,
            }}
            className="absolute inset-0 rounded-full bg-white"
            style={{ zIndex: -1 }}
          />
          <TouchableOpacity
            className="h-12 w-12 rounded-full bg-white items-center justify-center shadow-lg shadow-neutral"
            activeOpacity={0.9}
            onPress={() => {

            }}
          >
            <Ionicons name="add" size={24} color="#c7611f" />
          </TouchableOpacity>
        </MotiView>
      </View>
    </SafeAreaView>
  );
};

type FilterChipProps = {
  label: string;
  active?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`mr-2 flex-row items-center rounded-full border px-3 py-1.5 ${active
        ? "bg-white border border-neutral"
        : "bg-white border border-neutral"
        }`}
      activeOpacity={0.9}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={14}
          color={active ? "#c7611f" : "#c7611f"}
        />
      )}
      <Text
        className={`ml-1.5 text-xs font-medium ${active ? "text-black" : "text-black"
          }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

type SummaryCardProps = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  tone?: "default" | "warning";
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  label,
  value,
  icon,
  tone = "default",
}) => {
  const isWarning = tone === "warning";
  return (
    <View className="flex-1 rounded-3xl bg-white px-3.5 py-3 border border-neutral">
      <View className="flex-row items-center justify-between mb-2">
        <View className="h-8 w-8 rounded-2xl bg-white items-center justify-center border border-neutral">
          <Ionicons
            name={icon}
            size={16}
            color={isWarning ? "#c7611f" : "#c7611f"}
          />
        </View>
        <Text
          className={`text-[11px] ${isWarning ? "text-black" : "text-black"
            }`}
        >
          {label}
        </Text>
      </View>
      <Text className="text-xl font-bold text-black">{value}</Text>
    </View>
  );
};

const HealthPill: React.FC<{ health: OrchardHealth }> = ({ health }) => {
  let label = "";
  let bg = "";
  let text = "";

  if (health === "healthy") {
    label = "Healthy";
    bg = "bg-white border border-neutral";
    text = "text-black";
  } else if (health === "at-risk") {
    label = "At risk";
    bg = "bg-white border border-neutral";
    text = "text-black";
  } else {
    label = "Needs attention";
    bg = "bg-white border border-neutral";
    text = "text-black";
  }

  return (
    <View className={`px-3 py-1 rounded-full ${bg}`}>
      <Text className={`text-[11px] font-medium ${text}`}>{label}</Text>
    </View>
  );
};

const PriorityPill: React.FC<{ priority: Orchard["priority"] }> = ({
  priority,
}) => {
  let label = "";
  let bg = "";
  let text = "";

  if (priority === "high") {
    label = "High priority";
    bg = "bg-white border border-neutral";
    text = "text-black";
  } else if (priority === "medium") {
    label = "Medium";
    bg = "bg-white border border-neutral";
    text = "text-black";
  } else {
    label = "Low";
    bg = "bg-white border border-neutral";
    text = "text-black";
  }

  return (
    <View className={`px-3 py-1 rounded-full ${bg}`}>
      <Text className={`text-[11px] font-semibold ${text}`}>{label}</Text>
    </View>
  );
};

const Sparkline: React.FC<{ values: number[] }> = ({ values }) => {
  if (!values.length) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  return (
    <View className="flex-row items-end h-6">
      {values.map((v, idx) => {
        const normalized = (v - min) / range;
        const height = 8 + normalized * 16;
        return (
          <View
            key={`${v}-${idx}`}
            className="flex-1 mx-[0.5px] rounded-full bg-white"
            style={{ height }}
          />
        );
      })}
    </View>
  );
};

const CropIcon: React.FC<{ crop: string }> = ({ crop }) => {
  const name = crop.toLowerCase();
  let icon: keyof typeof MaterialCommunityIcons.glyphMap = "sprout-outline";

  if (name.includes("apple")) icon = "apple";
  else if (name.includes("mango")) icon = "fruit-mango";
  else if (name.includes("orange")) icon = "fruit-citrus";
  else if (name.includes("pomegranate")) icon = "fruit-watermelon";

  return (
    <View className="h-8 w-8 rounded-2xl bg-white items-center justify-center border border-neutral">
      <MaterialCommunityIcons name={icon} size={16} color="#c7611f" />
    </View>
  );
};

const RiskBadge: React.FC<{
  label: string;
  level: "low" | "medium" | "high";
  icon: keyof typeof Ionicons.glyphMap;
}> = ({ label, level, icon }) => {
  let bg = "";
  let text = "";
  let dot = "";

  if (level === "low") {
    bg = "bg-white border border-neutral";
    text = "text-black";
    dot = "bg-white";
  } else if (level === "medium") {
    bg = "bg-white border border-neutral";
    text = "text-black";
    dot = "bg-secondary";
  } else {
    bg = "bg-white border border-n";
    text = "text-black";
    dot = "bg-secondary";
  }

  return (
    <View className={`flex-row items-center justify-between px-2.5 py-1.5 rounded-2xl ${bg}`}>
      <View className="flex-row items-center">
        <View className={`h-1.5 w-1.5 rounded-full ${dot} mr-1.5`} />
        <Text className={`text-[11px] ${text}`}>{label}</Text>
      </View>
      <Ionicons name={icon} size={14} color="#c7611f" />
    </View>
  );
};

const HeroOverviewCard: React.FC<{
  globalHealthAvg: number;
  overallYieldDelta: number;
  highWeatherRisk: number;
  highPestRisk: number;
}> = ({
  globalHealthAvg,
  overallYieldDelta,
  highWeatherRisk,
  highPestRisk,
}) => {
    return (
      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        className="rounded-3xl bg-white border border-neutral px-4 py-3.5"
      >
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1 pr-4">
            <Text className="text-xs text-black">
              Today&apos;s orchard health
            </Text>
            <View className="flex-row items-baseline mt-1">
              <Text className="text-3xl font-bold text-black">
                {globalHealthAvg}%
              </Text>
              <Text className="ml-1 text-[11px] text-black">
                overall score
              </Text>
            </View>
            <View className="mt-1.5 flex-row items-center">
              <Ionicons
                name={
                  overallYieldDelta >= 0
                    ? "trending-up-outline"
                    : "trending-down-outline"
                }
                size={14}
                color={overallYieldDelta >= 0 ? "#c7611f" : "#c7611f"}
              />
              <Text
                className={`ml-1 text-[11px] ${overallYieldDelta >= 0
                  ? "text-black"
                  : "text-secondary"
                  }`}
              >
                {overallYieldDelta >= 0 ? "+" : ""}
                {overallYieldDelta}% yield vs last season
              </Text>
            </View>
          </View>

          <View className="items-end">
            <View className="flex-row items-center mb-1">
              <MaterialCommunityIcons
                name="weather-partly-rainy"
                size={18}
                color="#c7611f"
              />
              <Text className="ml-1 text-[11px] text-neutral">
                {highWeatherRisk} orchards high weather risk
              </Text>
            </View>
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="ladybug"
                size={18}
                color="#c7611f"
              />
              <Text className="ml-1 text-[11px] text-secondary">
                {highPestRisk} orchards high pest risk
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-1 flex-row justify-between">
          <View className="flex-1 mr-2">
            <Text className="text-[11px] text-black mb-1">
              NDVI trend
            </Text>
            <View className="flex-row h-5 items-end">
              {[70, 74, 76, 78, 80].map((v, idx) => (
                <View
                  key={v + idx}
                  className="flex-1 mx-[0.5px] rounded-full bg-white"
                  style={{ height: 6 + (idx + 1) * 4 }}
                />
              ))}
            </View>
          </View>
          <View className="flex-1 ml-2">
            <Text className="text-[11px] text-black mb-1">
              Irrigation window
            </Text>
            <View className="flex-row items-center">
              <View className="h-1.5 flex-1 rounded-full bg-white overflow-hidden">
                <View className="h-full w-[60%] rounded-full bg-secondary" />
              </View>
              <Text className="ml-2 text-[11px] text-black">
                Good next 2 days
              </Text>
            </View>
          </View>
        </View>
      </MotiView>
    );
  };

export default OrchardsScreen;