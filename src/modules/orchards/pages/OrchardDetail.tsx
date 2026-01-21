import BackHeader from "@/src/components/shared/BackHeader";
import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";
import { colors } from "@/src/constants/colors";
import { showErrorToast, showSuccessToast } from "@/src/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import {
  AlertCircle,
  BadgeCheck,
  Bug,
  Calendar,
  CalendarClock,
  Droplet,
  FileText,
  IndianRupee,
  Landmark,
  Leaf,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  Smartphone,
  Sprout,
  Store,
  ToolCase,
  TrendingUp,
  User,
  Users,
  Warehouse,
  Waves,
  Wrench,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import OrchardDetailsCard from "../components/OrchardDetailsCard";
import { OrchardDeleteKey } from "../config/orchardDeleteConfig";

import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/contexts/AuthContext";
import VarietiesCard from "../components/VarietyDetailsCard";
import {
  useCropNutritionQuery,
  useDeleteInfrastructureMutation,
  useDeleteInputCostMutation,
  useDeleteOrchardEntireMutation,
  useDeleteOrchardExtraMutation,
  useDeleteOrchardSectionMutation,
  useDeletePlantProtectionMutation,
  useDeleteProductionMarketingMutation,
  useDeleteSoilWaterMutation,
  useDeleteVarietyMutation,
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

export default function OrchardDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { setOrchardProfileId, orchardProfileId } = useAuth();
  const queryClient = useQueryClient();

  const [deleteSection, setDeleteSection] = useState<OrchardDeleteKey | null>(
    null,
  );

  const [varietyToDelete, setVarietyToDelete] = useState<number | null>(null);

  const { mutateAsync: deleteNutrition } = useDeleteOrchardSectionMutation();

  const { mutateAsync: deleteInfrastructure } =
    useDeleteInfrastructureMutation();

  const { mutateAsync: deleteSoilWater } = useDeleteSoilWaterMutation();

  const { mutateAsync: deletePlantHealth } = useDeletePlantProtectionMutation();

  const { mutateAsync: deleteProduction } =
    useDeleteProductionMarketingMutation();

  const { mutateAsync: deleteInputCost } = useDeleteInputCostMutation();

  const { mutateAsync: deleteFutureReadiness } =
    useDeleteOrchardExtraMutation();

  const { data: orchard, isPending } = useOrchardByIdQuery(id);
  const { mutateAsync: deleteOrchard, isPending: isDeletingOrchard } =
    useDeleteOrchardEntireMutation();
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
  const { mutateAsync: deleteVariety } = useDeleteVarietyMutation();

  console.log(varietiesData, "varieties data....");

  const { data: soilWaterData } = useSoilWaterQuery(orchardProfileId!);

  // const [deleteSection, setDeleteSection] = useState<OrchardDeleteKey | null>(
  //   null,
  // );
  const [deleteWhole, setDeleteWhole] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const hasData = (value: any) => {
    if (!value) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") return Object.keys(value).length > 0;
    return true;
  };

  const goToSection = (
    section: OrchardRouteKey,
    varietyId: number | string,
  ) => {
    router.push(`${orchardRoutes[section]}?varietyId=${varietyId}`);
  };

  useEffect(() => {
    setOrchardProfileId(orchard?.id ?? null);
  }, [orchard]);

  const deleteSectionMap: Record<
    OrchardDeleteKey,
    (orchardId: string) => Promise<any>
  > = {
    nutrition: deleteNutrition,
    farmInfrastructure: deleteInfrastructure,
    // varieties: deleteVarieties,
    soilAndWater: deleteSoilWater,
    plantHealth: deletePlantHealth,
    production: deleteProduction,
    inputCost: deleteInputCost,
    futureReadiness: deleteFutureReadiness,
  };

  const handleDelete = async (section: OrchardDeleteKey) => {
    try {
      setDeleting(true);

      const deleteFn = deleteSectionMap[section];
      if (!deleteFn) throw new Error("Invalid delete section");

      await deleteFn(orchardProfileId!);

      queryClient.invalidateQueries({
        queryKey: ["orchard", orchardProfileId],
      });

      showSuccessToast("Section deleted successfully");
      setDeleteSection(null);
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to delete section");
    } finally {
      setDeleting(false);
    }
  };

  if (isPending) return <Loader />;

  const handleDeleteSingleVariety = async () => {
    if (!varietyToDelete) return;

    try {
      setDeleting(true);

      await deleteVariety({
        id: orchardProfileId!, // ✅ orchard id
        varietyId: varietyToDelete, // ✅ variety id
      });

      queryClient.invalidateQueries({
        queryKey: ["orchard", orchardProfileId],
      });

      showSuccessToast("Variety deleted successfully");
      setVarietyToDelete(null);
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to delete variety");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteWholeOrchard = async (section: OrchardDeleteKey) => {
    try {
      setDeleting(true);

      await deleteOrchard(orchardProfileId!);

      showSuccessToast("orchard deleted successfully");

      queryClient.invalidateQueries(["deleteOrchard", orchard.id]);

      setDeleteSection(null);
      setDeleting(false);
      router.replace(ROUTES.TABS.ORCHARDS);
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to delete section");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteAllVarieties = async () => {
    try {
      setDeleting(true);

      await deleteAllVarieties(orchardProfileId!);

      queryClient.invalidateQueries({
        queryKey: ["orchard", orchardProfileId],
      });

      showSuccessToast("All varieties deleted successfully");
      setDeleteSection(null);
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to delete varieties");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <ScreenLayout>
      <BackHeader
        title="Orchard Details"
        desc="Detailed orchard profile and management information"
      />

      <ScrollView>
        {/* BASIC INFORMATION */}
        <OrchardDetailsCard
          heading="Basic Information"
          items={[
            {
              title: "Orchard Name",
              value: orchard?.orchardName,
              icon: <Leaf size={20} color={colors.primary} />,
            },
            {
              title: "Area",
              value:
                orchard?.kanals > 0
                  ? `${orchard.kanals} kanals`
                  : orchard?.marlas > 0
                    ? `${orchard.marlas} marlas`
                    : "",

              icon: <Sprout size={20} color={colors.primary} />,
            },
            {
              title: "Ownership",
              value: orchard?.ownershipType,
              icon: <Leaf size={20} color={colors.primary} />,
            },
          ]}
          onEdit={() => goToSection("basicInformation")}
        />
        <OrchardDetailsCard
          heading="Location"
          items={
            hasData(orchard?.district)
              ? [
                  {
                    title: "District",
                    value: orchard?.district,
                    icon: <MapPin size={20} color={colors.primary} />,
                  },
                  {
                    title: "Tehsil",
                    value: orchard?.tehsil,
                    icon: <MapPin size={20} color={colors.primary} />,
                  },
                  {
                    title: "Pin Code",
                    value: orchard.pinCode,
                    icon: <MapPin size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          // onEdit={
          //   hasData(orchard.district) ? () => goToSection("farm") : undefined
          // }
          // onDelete={
          //   hasData(orchard.district)
          //     ? () => setDeleteSection("location")
          //     : undefined
          // }
          onAdd={() => goToSection("farm")}
          emptyActionLabel="Add Location"
        />

        <OrchardDetailsCard
          heading="Crop Nutrition"
          items={
            hasData(cropNutritionData)
              ? [
                  {
                    title: "Fertilizer Practice",
                    value: cropNutritionData?.fertilizerPractices,
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Fertigation",
                    value: cropNutritionData?.hasFertigation ? "Yes" : "No",
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Nutrition Plan",
                    value: cropNutritionData?.nutritionPlan,
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Mulching",
                    value: cropNutritionData?.isMulchingApplied ? "Yes" : "No",
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Last Fertilizer Application Date",
                    value: cropNutritionData?.lastFertilizerApplicationDate
                      ? new Date(
                          cropNutritionData.lastFertilizerApplicationDate,
                        ).toLocaleDateString()
                      : "-",
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Fertilizer Application Mode",
                    value: cropNutritionData?.fertilizerApplicationMode,
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={
            hasData(orchard?.district)
              ? () => goToSection("nutrition")
              : undefined
          }
          onDelete={
            orchard?.district ? () => handleDelete("nutrition") : undefined
          }
          onAdd={() => router.push(ROUTES.ORCHARDS.REGISTRATION.CROP_INFO)}
          emptyActionLabel="Add Crop Nutrition"
        />

        <OrchardDetailsCard
          heading="Infrastructure"
          items={
            hasData(infrastructureData)
              ? [
                  {
                    title: "Equipment Owned",
                    value: infrastructureData?.equipmentOwned?.length
                      ? infrastructureData.equipmentOwned.join(", ")
                      : "—",
                    icon: <ToolCase size={20} color={colors.primary} />,
                  },
                  {
                    title: "Storage Facilities",
                    value: infrastructureData?.storageFacilities?.length
                      ? infrastructureData.storageFacilities.join(", ")
                      : "—",
                    icon: <Warehouse size={20} color={colors.primary} />,
                  },
                  {
                    title: "Other Tools",
                    value: infrastructureData?.otherTools?.length
                      ? infrastructureData.otherTools.join(", ")
                      : "—",
                    icon: <Wrench size={20} color={colors.primary} />,
                  },
                  {
                    title: "Permanent Labor",
                    value: infrastructureData?.permanentLabor ?? "—",
                    icon: <Users size={20} color={colors.primary} />,
                  },
                  {
                    title: "Seasonal Labor",
                    value: infrastructureData?.seasonalLabor ?? "—",
                    icon: <Users size={20} color={colors.primary} />,
                  },
                  {
                    title: "Contract-based Labor",
                    value: infrastructureData?.contractBasedLabor ?? "—",
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
          // onDelete={
          //   hasData(infrastructureData)
          //     ? () => setDeleteSection("farmInfrastructure")
          //     : undefined
          // }
          onDelete={
            orchard?.district
              ? () => handleDelete("farmInfrastructure")
              : undefined
          }
          onAdd={() => goToSection("farmInfrastructure")}
          emptyActionLabel="Add Infrastructure"
        />

        <VarietiesCard
          varietiesData={varietiesData || []}
          onAdd={() => goToSection("varietyAndPlanting")}
          onEdit={(id) => goToSection("varietyAndPlanting", id)}
          onDelete={(id) => setVarietyToDelete(id)}
        />

        <OrchardDetailsCard
          heading="Soil & Water"
          items={
            hasData(soilWaterData)
              ? [
                  {
                    title: "Soil Type",
                    value: soilWaterData.soilType || "—",
                    icon: <Droplet size={20} color={colors.primary} />,
                  },
                  {
                    title: "Soil Health Status",
                    value: soilWaterData.soilHealthStatus?.length
                      ? soilWaterData.soilHealthStatus.join(", ")
                      : "—",
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  // {
                  //   title: "Soil pH",
                  //   value: orchard.soilAndWater.soilPh ?? "—",
                  //   icon: <Beaker size={20} color={colors.primary} />,
                  // },
                  // {
                  //   title: "Nitrogen (N)",
                  //   value: orchard.soilAndWater.soilNitrogen ?? "—",
                  //   icon: <FlaskConicalIcon size={20} color={colors.primary} />,
                  // },
                  // {
                  //   title: "Phosphorus (P)",
                  //   value: orchard.soilAndWater.soilPhosphorus ?? "—",
                  //   icon: <FlaskConical size={20} color={colors.primary} />,
                  // },
                  // {
                  //   title: "Potassium (K)",
                  //   value: orchard.soilAndWater.soilPotassium ?? "—",
                  //   icon: <FlaskConical size={20} color={colors.primary} />,
                  // },
                  // {
                  //   title: "Organic Carbon",
                  //   value: orchard.soilAndWater.soilOrganicCarbon ?? "—",
                  //   icon: <Leaf size={20} color={colors.primary} />,
                  // },
                  // {
                  //   title: "Micronutrients",
                  //   value: orchard.soilAndWater.soilMicronutrients ?? "—",
                  //   icon: <Leaf size={20} color={colors.primary} />,
                  // },
                  {
                    title: "Last Soil Test",
                    value: soilWaterData.lastSoilTestDate
                      ? new Date(
                          soilWaterData.lastSoilTestDate,
                        ).toLocaleDateString()
                      : "—",
                    icon: <Calendar size={20} color={colors.primary} />,
                  },
                  {
                    title: "Water Source",
                    value: soilWaterData.waterSource || "—",
                    icon: <Droplet size={20} color={colors.primary} />,
                  },
                  {
                    title: "Irrigation Method",
                    value: soilWaterData.irrigationMethod || "—",
                    icon: <Waves size={20} color={colors.primary} />,
                  },
                  {
                    title: "Water Availability",
                    value: soilWaterData.waterAvailability || "—",
                    icon: <AlertCircle size={20} color={colors.primary} />,
                  },
                  {
                    title: "Soil Test Report",
                    value: soilWaterData.soilTestReportUrl
                      ? "View Report"
                      : "—",
                    icon: <FileText size={20} color={colors.primary} />,
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
              ? () => setDeleteSection("soilAndWater")
              : undefined
          }
          onAdd={() => goToSection("soilAndWater")}
          emptyActionLabel="Add Soil & Water"
        />

        <OrchardDetailsCard
          heading="Plant Protection"
          items={
            hasData(plantProtectionData)
              ? [
                  {
                    title: "Diseases",
                    value:
                      plantProtectionData.diseaseHistory?.join(", ") || "-",
                    icon: <ShieldCheck size={20} color={colors.primary} />,
                  },
                  {
                    title: "Pests",
                    value: plantProtectionData.pestHistory?.join(", ") || "-",
                    icon: <Bug size={20} color={colors.primary} />,
                  },
                  {
                    title: "Spray Schedule",
                    value: plantProtectionData.spraySchedule?.join(", ") || "-",
                    icon: <Calendar size={20} color={colors.primary} />,
                  },
                  {
                    title: "Crop Insurance",
                    value: plantProtectionData.isCropInsuranceCovered
                      ? "Covered"
                      : "Not Covered",
                    icon: <Shield size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={
            hasData(orchard?.plantHealth)
              ? () => goToSection("plantProtection")
              : undefined
          }
          onDelete={
            hasData(orchard?.plantHealth)
              ? () => setDeleteSection("plantHealth")
              : undefined
          }
          onAdd={() => goToSection("plantProtection")}
          emptyActionLabel="Add Plant Protection"
        />

        {/* PRODUCTION & MARKETING */}
        <OrchardDetailsCard
          heading="Production & Marketing"
          items={
            hasData(plantProductionData)
              ? [
                  {
                    title: "Average Yield",
                    value: `${plantProductionData.averageAnnualYield} ${plantProductionData.yieldUnit || ""}`,
                    icon: <TrendingUp size={20} color={colors.primary} />,
                  },
                  {
                    title: "Peak Harvest (From)",
                    value: plantProductionData.peakHarvestFromMonth
                      ? new Date(
                          plantProductionData.peakHarvestFromMonth,
                        ).toLocaleDateString()
                      : "-",
                    icon: <Calendar size={20} color={colors.primary} />,
                  },
                  {
                    title: "Peak Harvest (To)",
                    value: plantProductionData.peakHarvestToMonth
                      ? new Date(
                          plantProductionData.peakHarvestToMonth,
                        ).toLocaleDateString()
                      : "-",
                    icon: <Calendar size={20} color={colors.primary} />,
                  },
                  {
                    title: "Selling Preference",
                    value: plantProductionData.sellingPreference || "-",
                    icon: <Store size={20} color={colors.primary} />,
                  },
                  {
                    title: "Buyer Name",
                    value: plantProductionData.buyerName || "-",
                    icon: <User size={20} color={colors.primary} />,
                  },
                  {
                    title: "Buyer Contact",
                    value: plantProductionData.buyerContact || "-",
                    icon: <Phone size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={
            hasData(plantProductionData)
              ? () => goToSection("productionAndMarketing")
              : undefined
          }
          onDelete={
            hasData(plantProductionData)
              ? () => setDeleteSection("production")
              : undefined
          }
          onAdd={() => goToSection("productionAndMarketing")}
          emptyActionLabel="Add Production"
        />

        {/* INPUT COST */}
        <OrchardDetailsCard
          heading="Input Cost"
          items={
            hasData(inputCostData)
              ? [
                  {
                    title: "Payment Type",
                    value: inputCostData.paymentType || "-",
                    icon: <IndianRupee size={20} color={colors.primary} />,
                  },
                  {
                    title: "Credit Period",
                    value: inputCostData.creditPeriod || "-",
                    icon: <CalendarClock size={20} color={colors.primary} />,
                  },
                  {
                    title: "Pesticide Supplier Location",
                    value: inputCostData.pesticideSupplierLocation || "-",
                    icon: <MapPin size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={
            hasData(inputCostData) ? () => goToSection("inputCost") : undefined
          }
          onDelete={
            hasData(inputCostData)
              ? () => setDeleteSection("inputCost")
              : undefined
          }
          onAdd={() => goToSection("inputCost")}
          emptyActionLabel="Add Input Cost"
        />

        {/* FUTURE READINESS */}
        <OrchardDetailsCard
          heading="Future Readiness"
          items={
            hasData(extraData)
              ? [
                  {
                    title: "Government Schemes Availed",
                    value:
                      extraData.governmentSchemesAvailed?.join(", ") || "-",
                    icon: <Landmark size={20} color={colors.primary} />,
                  },
                  {
                    title: "FPO / Cooperative Member",
                    value: extraData.isFpoOrCooperativeMember ? "Yes" : "No",
                    icon: <Users size={20} color={colors.primary} />,
                  },
                  {
                    title: "Certifications",
                    value: extraData.certifications?.join(", ") || "-",
                    icon: <BadgeCheck size={20} color={colors.primary} />,
                  },
                  {
                    title: "Digital Tools Used",
                    value: extraData.digitalToolsUsed?.join(", ") || "-",
                    icon: <Smartphone size={20} color={colors.primary} />,
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
              ? () => setDeleteSection("futureReadiness")
              : undefined
          }
          onAdd={() => goToSection("futureReadiness")}
          emptyActionLabel="Add Future Readiness"
        />
      </ScrollView>
      <ScreenLayout>
        <Pressable
          onPress={() => setDeleteWhole(true)}
          className="mx-4 mb-4 flex-row items-center justify-center rounded-xl border border-red-500 py-4"
        >
          <AlertCircle size={20} color={colors.error} />
          <Text className="ml-2 font-semibold text-red-500">
            Delete Entire Orchard
          </Text>
        </Pressable>
      </ScreenLayout>

      <ConfirmDeleteModal
        visible={!!deleteSection}
        title="Confirm deletion"
        description="Are you sure you want to delete this orchard information?"
        onCancel={() => setDeleteSection(null)}
        onConfirm={() => handleDelete(deleteSection!)}
        loading={deleting}
      />

      <ConfirmDeleteModal
        visible={deleteWhole}
        title="Delete entire orchard?"
        description="This action will permanently delete all orchard data. This cannot be undone."
        onCancel={() => setDeleteWhole(false)}
        onConfirm={() => handleDeleteWholeOrchard()}
        loading={isDeletingOrchard}
      />
      <ConfirmDeleteModal
        visible={!!varietyToDelete}
        title="Delete Variety?"
        description="Are you sure you want to delete this variety?"
        onCancel={() => setVarietyToDelete(null)}
        onConfirm={handleDeleteSingleVariety}
        loading={deleting}
      />
      <ConfirmDeleteModal
        visible={deleteSection === "varieties"}
        title="Delete all varieties?"
        description="This will delete all varieties in this orchard."
        onCancel={() => setDeleteSection(null)}
        onConfirm={handleDeleteAllVarieties}
        loading={deleting}
      />
    </ScreenLayout>
  );
}
