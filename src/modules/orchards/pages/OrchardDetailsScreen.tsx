import BackHeader from "@/src/components/shared/BackHeader";
import Loader from "@/src/components/shared/Loader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
  Activity,
  AlertCircle,
  Box,
  Building2,
  CalendarDays,
  Droplets,
  Gauge,
  Hash,
  Layers,
  Map,
  MapPin,
  Paperclip,
  Ruler,
  Smartphone,
  Sprout,
  ToolCase,
  ToolCaseIcon,
  Trees,
  User2,
  Users,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import OrchardDetailsCard from "../components/OrchardDetailsCard";
import SoilTestReportsCard from "../components/SoilTestReportsCard";
import VarietiesCard from "../components/VarietyDetailsCard";
import { OrchardDeleteKey } from "../config/orchardDeleteConfig";
import { useOrchardDeletion } from "../hooks/useOrchardDelete";
import {
  useInfrastructureQuery,
  useOrchardByIdQuery,
  useOrchardExtraQuery,
  useOrchardVarietiesQuery,
  useSoilWaterQuery,
} from "../hooks/useOrchardsQuery";
import { orchardRoutes } from "../routes/orchardRoutes";

type SectionKey =
  | "overview"
  | "varieties"
  | "soil"
  | "infrastructure"
  | "future";

const sections: { key: SectionKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "varieties", label: "Varieties" },
  { key: "soil", label: "Soil & Water" },
  { key: "infrastructure", label: "Infrastructure" },
  { key: "future", label: "Future Readiness" },
];

const orchardBackground = require("@/assets/images/orchard-card-bg.png");
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

export default function OrchardDetailsScreen() {
  const { setOrchardProfileId, orchardProfileId } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeSection, setActiveSection] = useState<SectionKey>("overview");
  const [sectionToDelete, setSectionToDelete] =
    useState<OrchardDeleteKey | null>(null);
  const [varietyToDelete, setVarietyToDelete] = useState<number | null>(null);
  const [showDeleteWhole, setShowDeleteWhole] = useState(false);
  const heroScale = useSharedValue(1.08);
  const { width: pageWidth } = useWindowDimensions();
  const pagerRef = useRef<ScrollView>(null);
  const tabsRef = useRef<ScrollView>(null);

  const { data: orchard, isPending } = useOrchardByIdQuery(id);
  const { data: infrastructureData } = useInfrastructureQuery(
    orchardProfileId!,
  );
  const { data: extraData } = useOrchardExtraQuery(orchardProfileId!);
  const { data: varietiesData } = useOrchardVarietiesQuery(orchardProfileId!);
  const { data: soilWaterData } = useSoilWaterQuery(orchardProfileId!);

  const {
    deleteSection,
    deleteVariety,
    deleteSoilTestReport,
    deleteEntireOrchard,
    isDeleting,
  } = useOrchardDeletion(orchardProfileId!);

  useEffect(() => {
    if (orchard?.id) setOrchardProfileId(orchard.id);
  }, [orchard, setOrchardProfileId]);

  useEffect(() => {
    heroScale.value = withTiming(1, {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    });
  }, [heroScale]);

  const heroImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heroScale.value }],
  }));

  const hasData = (value: any) => {
    if (!value) return false;
    if (Array.isArray(value)) return value.length > 0;
    return Object.keys(value).length > 0;
  };

  const goToSection = (
    section: keyof typeof orchardRoutes,
    varietyId?: number | string,
  ) => {
    const route = orchardRoutes[section];
    router.push(varietyId ? `${route}?varietyId=${varietyId}` : route);
  };

  const selectSection = (index: number) => {
    const section = sections[index];
    if (!section) return;

    setActiveSection(section.key);
    pagerRef.current?.scrollTo({
      x: index * pageWidth,
      animated: true,
    });
    tabsRef.current?.scrollTo({
      x: Math.max(0, index * 118 - 24),
      animated: true,
    });
  };

  const handlePageChange = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / pageWidth);
    const section = sections[index];
    if (!section) return;

    setActiveSection(section.key);
    tabsRef.current?.scrollTo({
      x: Math.max(0, index * 118 - 24),
      animated: true,
    });
  };

  if (isPending) return <Loader />;

  const orchardArea =
    [
      orchard?.kanals > 0 ? `${orchard.kanals} kanals` : null,
      orchard?.marlas > 0 ? `${orchard.marlas} marlas` : null,
    ]
      .filter(Boolean)
      .join(", ") || "Area not added";
  const orchardLocation =
    [orchard?.tehsil, orchard?.district].filter(Boolean).join(", ") ||
    "Location not added";

  const activeContent = {
    overview: (
      <>
        <OrchardDetailsCard
          heading="Basic Information"
          items={[
            {
              title: "Orchard Name",
              value: orchard?.orchardName,
              icon: <User2 size={20} color={colors.primary} />,
            },
            {
              title: "Area",
              value: orchardArea,
              icon: <Ruler size={20} color={colors.primary} />,
            },
            {
              title: "Ownership",
              value: orchard?.ownershipType,
              icon: <Map size={20} color={colors.primary} />,
            },
            {
              title: "Establishment Year",
              value: orchard?.establishmentYear
                ? String(orchard.establishmentYear)
                : "N/A",
              icon: <CalendarDays size={20} color={colors.primary} />,
            },
            {
              title: "Plantation Pattern",
              value: orchard?.plantationPattern,
              icon: <Sprout size={20} color={colors.primary} />,
            },
          ]}
          onEdit={() =>
            router.push({
              pathname: ROUTES.ORCHARDS.REGISTRATION.BASIC_INFO,
              params: { mode: "edit", id: String(orchardProfileId) },
            })
          }
        />

        <OrchardDetailsCard
          heading="Location Details"
          items={
            hasData(orchard?.district)
              ? [
                  {
                    title: "District",
                    value: orchard?.district,
                    icon: <Building2 size={20} color={colors.primary} />,
                  },
                  {
                    title: "Tehsil",
                    value: orchard?.tehsil,
                    icon: <MapPin size={20} color={colors.primary} />,
                  },
                  {
                    title: "Pin Code",
                    value: orchard?.pinCode,
                    icon: <Hash size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          emptyActionLabel="Add Location"
        />

        <ScreenContent>
          <Pressable
            onPress={() => setShowDeleteWhole(true)}
            className="mb-8 flex-row items-center justify-center rounded-2xl border py-4"
            style={{
              backgroundColor: "#FFF7F6",
              borderColor: colors.error + "40",
            }}
          >
            <AlertCircle size={19} color={colors.error} />
            <Text
              style={[
                typography.Poppins_s_semibold,
                { color: colors.error, marginLeft: 8 },
              ]}
            >
              Delete Entire Orchard
            </Text>
          </Pressable>
        </ScreenContent>
      </>
    ),
    varieties: (
      <VarietiesCard
        varietiesData={varietiesData || []}
        onAdd={() => router.push(ROUTES.ORCHARDS.REGISTRATION.VARIETY_INFO)}
        onEdit={(varietyId) => goToSection("varietyAndPlanting", varietyId)}
        onDelete={(varietyId) => setVarietyToDelete(varietyId)}
      />
    ),
    soil: (
      <>
        <OrchardDetailsCard
          heading="Soil & Water"
          subheading={
            !hasData(soilWaterData)
              ? "Add soil and irrigation details for this orchard"
              : undefined
          }
          items={
            hasData(soilWaterData)
              ? [
                  {
                    title: "Soil Type",
                    value: soilWaterData?.soilType,
                    icon: <Layers size={20} color={colors.primary} />,
                  },
                  {
                    title: "Soil Health Status",
                    value: soilWaterData?.soilHealthStatus?.join(", ") || "N/A",
                    icon: <Activity size={20} color={colors.primary} />,
                  },
                  {
                    title: "Last Soil Test Date",
                    value:
                      soilWaterData?.lastSoilTestDate?.split("T")[0] || "N/A",
                    icon: <CalendarDays size={20} color={colors.primary} />,
                  },
                  {
                    title: "Water Source",
                    value: soilWaterData?.waterSource || "N/A",
                    icon: <Droplets size={20} color={colors.primary} />,
                  },
                  {
                    title: "Irrigation Method",
                    value: soilWaterData?.irrigationMethod || "N/A",
                    icon: <Sprout size={20} color={colors.primary} />,
                  },
                  {
                    title: "Water Availability",
                    value: soilWaterData?.waterAvailability || "N/A",
                    icon: <Gauge size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={
            hasData(soilWaterData)
              ? () => goToSection("soilAndWater")
              : undefined
          }
          onDelete={
            hasData(soilWaterData)
              ? () => setSectionToDelete("soilAndWater")
              : undefined
          }
          onAdd={() =>
            router.push(ROUTES.ORCHARDS.REGISTRATION.SOIL_WATER_INFO)
          }
        />
        {soilWaterData ? (
          <SoilTestReportsCard
            reportUrls={soilWaterData?.soilTestReportUrls}
            onDeleteReport={(url) =>
              deleteSoilTestReport(url, soilWaterData.soilTestReportUrls)
            }
            onAdd={() =>
              router.push(ROUTES.ORCHARDS.REGISTRATION.SOIL_TEST_REPORTS)
            }
            deleting={isDeleting}
          />
        ) : null}
      </>
    ),
    infrastructure: (
      <OrchardDetailsCard
        heading="Infrastructure"
        items={
          hasData(infrastructureData)
            ? [
                {
                  title: "Equipment Owned",
                  value: infrastructureData?.equipmentOwned?.join(", "),
                  icon: <ToolCase size={20} color={colors.primary} />,
                },
                {
                  title: "Permanent Labor",
                  value: infrastructureData?.permanentLabor,
                  icon: <Users size={20} color={colors.primary} />,
                },
                {
                  title: "Seasonal Labour",
                  value: infrastructureData?.seasonalLabor,
                  icon: <Users size={20} color={colors.primary} />,
                },
                {
                  title: "Contract-based Labour",
                  value: infrastructureData?.contractBasedLabor,
                  icon: <Users size={20} color={colors.primary} />,
                },
                {
                  title: "Other Tools",
                  value: infrastructureData?.otherTools?.join(", "),
                  icon: <ToolCaseIcon size={20} color={colors.primary} />,
                },
                {
                  title: "Storage Facilities",
                  value: infrastructureData?.storageFacilities?.join(", "),
                  icon: <Box size={20} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={
          hasData(infrastructureData)
            ? () => goToSection("farmInfrastructure")
            : undefined
        }
        onDelete={
          hasData(infrastructureData)
            ? () => setSectionToDelete("farmInfrastructure")
            : undefined
        }
        onAdd={() => router.push(ROUTES.ORCHARDS.REGISTRATION.FARM_INFO)}
      />
    ),
    future: (
      <OrchardDetailsCard
        heading="Future Readiness"
        items={
          hasData(extraData)
            ? [
                {
                  title: "Digital Tools",
                  value: extraData?.digitalToolsUsed?.join(", ") || "N/A",
                  icon: <Smartphone size={20} color={colors.primary} />,
                },
                {
                  title: "Certifications",
                  value: extraData?.certifications?.join(", ") || "N/A",
                  icon: <Paperclip size={20} color={colors.primary} />,
                },
                {
                  title: "FPO / Cooperative Membership",
                  value:
                    extraData?.isFpoOrCooperativeMember === true
                      ? "Yes"
                      : extraData?.isFpoOrCooperativeMember === false
                        ? "No"
                        : "N/A",
                  icon: <Users size={20} color={colors.primary} />,
                },
                {
                  title: "Government Schemes Availed",
                  value:
                    extraData?.governmentSchemesAvailed?.join(", ") || "N/A",
                  icon: <ToolCaseIcon size={20} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={
          hasData(extraData) ? () => goToSection("futureReadiness") : undefined
        }
        onDelete={
          hasData(extraData)
            ? () => setSectionToDelete("futureReadiness")
            : undefined
        }
        onAdd={() => router.push(ROUTES.ORCHARDS.REGISTRATION.FUTURE_INFO)}
      />
    ),
  };

  return (
    <ScreenLayout>
      <BackHeader title="Orchard Details" />

      <Animated.View
        entering={FadeInDown.duration(500).springify()}
        style={{
          overflow: "hidden",
          marginBottom: 14,
          backgroundColor: colors.primary,
        }}
      >
        <AnimatedImageBackground
          source={orchardBackground}
          resizeMode="cover"
          style={[{ minHeight: 215 }, heroImageStyle]}
        >
          <LinearGradient
            colors={["rgba(12,42,6,0.08)", "rgba(12,42,6,0.94)"]}
            style={{
              minHeight: 215,
              paddingHorizontal: 22,
              paddingVertical: 20,
              justifyContent: "space-between",
            }}
          >
            <View className="flex-row items-start justify-between">
              <View className="h-11 w-11 items-center justify-center rounded-2xl bg-white/90">
                <Trees size={23} color={colors.primary} />
              </View>

              <View className="rounded-full bg-white/90 px-3 py-2">
                <Text
                  style={[
                    typography.Poppins_xs_semibold,
                    { color: colors.primary },
                  ]}
                >
                  {orchard?.ownershipType || "Registered"}
                </Text>
              </View>
            </View>

            <View>
              <Text
                numberOfLines={2}
                style={[
                  typography.Poppins_xl_semibold,
                  { color: colors.light, fontSize: 27, lineHeight: 34 },
                ]}
              >
                {orchard?.orchardName || "Unnamed Orchard"}
              </Text>
              <View className="mt-2 flex-row items-center">
                <MapPin size={15} color="rgba(255,255,255,0.82)" />
                <Text
                  numberOfLines={1}
                  style={[
                    typography.Poppins_s_regular,
                    {
                      color: "rgba(255,255,255,0.82)",
                      marginLeft: 5,
                      flex: 1,
                    },
                  ]}
                >
                  {orchardLocation} • {orchardArea}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </AnimatedImageBackground>
      </Animated.View>

      <View
        style={{
          backgroundColor: colors.light,
          marginBottom: 16,
          paddingVertical: 8,
          shadowColor: "#1B3A0A",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <ScrollView
          ref={tabsRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {sections.map((section, index) => {
            const selected = activeSection === section.key;
            return (
              <Pressable
                key={section.key}
                onPress={() => selectSection(index)}
                style={{
                  paddingHorizontal: 17,
                  paddingVertical: 10,
                  borderRadius: 22,
                  marginRight: 8,
                  backgroundColor: selected
                    ? colors.primary
                    : colors.primary + "0B",
                  borderWidth: 1,
                  borderColor: selected
                    ? colors.primary
                    : colors.primary + "18",
                }}
              >
                <Text
                  style={[
                    typography.Poppins_s_medium,
                    {
                      color: selected ? colors.light : colors.darkHover,
                      fontSize: 13,
                    },
                  ]}
                >
                  {section.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        ref={pagerRef}
        horizontal
        pagingEnabled
        nestedScrollEnabled
        directionalLockEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handlePageChange}
        scrollEventThrottle={16}
      >
        {sections.map((section) => (
          <View
            key={section.key}
            style={{
              width: pageWidth,
              minHeight: 320,
            }}
          >
            {activeContent[section.key]}
          </View>
        ))}
      </ScrollView>

      <ConfirmDeleteModal
        visible={!!sectionToDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this section?"
        onCancel={() => setSectionToDelete(null)}
        onConfirm={async () => {
          await deleteSection(sectionToDelete!);
          setSectionToDelete(null);
        }}
        loading={isDeleting}
      />
      <ConfirmDeleteModal
        visible={!!varietyToDelete}
        title="Delete Variety"
        description="This action will remove this variety from your orchard."
        onCancel={() => setVarietyToDelete(null)}
        onConfirm={async () => {
          await deleteVariety(varietyToDelete!);
          setVarietyToDelete(null);
        }}
        loading={isDeleting}
      />
      <ConfirmDeleteModal
        visible={showDeleteWhole}
        title="Delete Entire Orchard?"
        description="This will permanently remove all data associated with this orchard."
        onCancel={() => setShowDeleteWhole(false)}
        onConfirm={deleteEntireOrchard}
        loading={isDeleting}
      />
    </ScreenLayout>
  );
}
