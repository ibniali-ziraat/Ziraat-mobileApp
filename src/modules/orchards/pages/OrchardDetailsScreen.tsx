import { router, useLocalSearchParams } from "expo-router";
import {
  Activity,
  AlertCircle,
  Building2, // Soil Health Status
  CalendarDays, // Last Soil Test Date
  Droplets, // Irrigation Method
  Gauge,
  Hash,
  Layers,
  Map,
  MapPin,
  Ruler,
  Smartphone, // Water Source
  Sprout,
  ToolCase,
  User2,
  Users,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";
import OrchardDetailsCard from "../components/OrchardDetailsCard";
import SoilTestReportsCard from "../components/SoilTestReportsCard";
import VarietiesCard from "../components/VarietyDetailsCard";

import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import { OrchardDeleteKey } from "../config/orchardDeleteConfig";
import { useOrchardDeletion } from "../hooks/useOrchardDelete";
import {
  useCropNutritionQuery,
  useInfrastructureQuery,
  useInputCostQuery,
  useOrchardByIdQuery,
  useOrchardExtraQuery,
  useOrchardVarietiesQuery,
  usePlantProtectionQuery,
  useProductionMarketingQuery,
  useSoilWaterQuery,
} from "../hooks/useOrchardsQuery";
import { orchardRoutes } from "../routes/orchardRoutes";

export default function OrchardDetailsScreen() {
  const { setOrchardProfileId, orchardProfileId } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Deletion States
  const [sectionToDelete, setSectionToDelete] =
    useState<OrchardDeleteKey | null>(null);
  const [varietyToDelete, setVarietyToDelete] = useState<number | null>(null);
  const [showDeleteWhole, setShowDeleteWhole] = useState(false);

  // Queries
  const { data: orchard, isPending } = useOrchardByIdQuery(id);
  const { data: cropNutritionData } = useCropNutritionQuery(orchardProfileId!);
  const { data: plantProtectionData } = usePlantProtectionQuery(
    orchardProfileId!,
  );
  const { data: infrastructureData } = useInfrastructureQuery(
    orchardProfileId!,
  );
  const { data: plantProductionData } = useProductionMarketingQuery(
    orchardProfileId!,
  );
  const { data: extraData } = useOrchardExtraQuery(orchardProfileId!);
  const { data: inputCostData } = useInputCostQuery(orchardProfileId!);
  const { data: varietiesData } = useOrchardVarietiesQuery(orchardProfileId!);
  const { data: soilWaterData } = useSoilWaterQuery(orchardProfileId!);

  // Hook Injection
  const {
    deleteSection,
    deleteVariety,
    deleteSoilTestReport,
    deleteEntireOrchard,
    isDeleting,
  } = useOrchardDeletion(orchardProfileId!);

  useEffect(() => {
    if (orchard?.id) setOrchardProfileId(orchard.id);
  }, [orchard]);

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

  if (isPending) return <Loader />;

  return (
    <ScreenLayout>
      <BackHeader title="Orchard Information" />
      <ScreenContent>
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
              value:
                orchard?.kanals > 0
                  ? `${orchard.kanals} kanals`
                  : orchard?.marlas > 0
                    ? `${orchard.marlas} marlas`
                    : "N/A",
              icon: <Ruler size={20} color={colors.primary} />,
            },
            {
              title: "Ownership",
              value: orchard?.ownershipType,
              icon: <Map size={20} color={colors.primary} />,
            },
          ]}
          onEdit={() =>
            router.push({
              pathname: ROUTES.ORCHARDS.REGISTRATION.BASIC_INFO,
              params: { mode: "edit", id: String(orchardProfileId) },
            })
          }
        />

        {/* Location */}
        <OrchardDetailsCard
          heading="Location"
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
          onAdd={() => router.push(ROUTES.ORCHARDS.REGISTRATION.FARM_INFO)}
          emptyActionLabel="Add Location"
        />

        <VarietiesCard
          varietiesData={varietiesData || []}
          onAdd={() => router.push(ROUTES.ORCHARDS.REGISTRATION.VARIETY_INFO)}
          onEdit={(id) => goToSection("varietyAndPlanting", id)}
          onDelete={(id) => setVarietyToDelete(id)}
        />

        <OrchardDetailsCard
          heading="Soil & Water"
          subheading={
            !hasData(soilWaterData)
              ? "Soil test reports can only be added after the Soil & Water section is filled."
              : undefined
          }
          items={
            hasData(soilWaterData)
              ? [
                  {
                    title: "Soil Type",
                    value: soilWaterData.soilType,
                    icon: <Layers size={20} color={colors.primary} />,
                  },
                  {
                    title: "Soil Health Status",
                    value: soilWaterData.soilHealthStatus?.join(", ") || "N/A",
                    icon: <Activity size={20} color={colors.primary} />,
                  },
                  {
                    title: "Last Soil Test Date",
                    value:
                      soilWaterData.lastSoilTestDate.split("T")[0] || "N/A",
                    icon: <CalendarDays size={20} color={colors.primary} />,
                  },
                  {
                    title: "Water Source",
                    value: soilWaterData.waterSource || "N/A",
                    icon: <Droplets size={20} color={colors.primary} />,
                  },
                  {
                    title: "Irrigation Method",
                    value: soilWaterData.irrigationMethod || "N/A",
                    icon: <Sprout size={20} color={colors.primary} />,
                  },
                  {
                    title: "Water Availability",
                    value: soilWaterData.waterAvailability || "N/A",
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

        {soilWaterData && (
          <SoilTestReportsCard
            reportUrls={soilWaterData?.soilTestReportUrls}
            onDeleteReport={(url) =>
              deleteSoilTestReport(url, soilWaterData.soilTestReportUrls)
            }
            onAdd={() =>
              router.push(ROUTES.ORCHARDS.REGISTRATION.SOIL_TEST_REPORTS)
            }
          />
        )}

        {/* Infrastructure */}
        <OrchardDetailsCard
          heading="Infrastructure"
          items={
            hasData(infrastructureData)
              ? [
                  {
                    title: "Equipment Owned",
                    value: infrastructureData.equipmentOwned?.join(", "),
                    icon: <ToolCase size={20} color={colors.primary} />,
                  },
                  {
                    title: "Permanent Labor",
                    value: infrastructureData.permanentLabor,
                    icon: <Users size={20} color={colors.primary} />,
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

        {/* Future Readiness */}
        <OrchardDetailsCard
          heading="Future Readiness"
          items={
            hasData(extraData)
              ? [
                  {
                    title: "Digital Tools",
                    value: extraData.digitalToolsUsed?.join(", ") || "N/A",
                    icon: <Smartphone size={20} color={colors.primary} />,
                  },
                  {
                    title: "FPO Member",
                    value: extraData.isFpoOrCooperativeMember ? "Yes" : "No",
                    icon: <Users size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={
            hasData(extraData)
              ? () => goToSection("futureReadiness")
              : undefined
          }
          onDelete={
            hasData(extraData)
              ? () => setSectionToDelete("futureReadiness")
              : undefined
          }
          onAdd={() => router.push(ROUTES.ORCHARDS.REGISTRATION.FUTURE_INFO)}
        />

        {/* Delete Entire Orchard Button */}
        <Pressable
          style={{ backgroundColor: colors.light, borderColor: colors.error }}
          onPress={() => setShowDeleteWhole(true)}
          className="mx-4 mt-6 flex-row items-center justify-center rounded-xl border py-4"
        >
          <AlertCircle size={20} color={colors.error} />
          <Text style={{ color: colors.error }} className="ml-2 font-semibold">
            Delete Entire Orchard
          </Text>
        </Pressable>

        {/* Modals */}
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
      </ScreenContent>
    </ScreenLayout>
  );
}
