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
import { useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import OrchardDetailsCard from "../components/OrchardDetailsCard";
import { OrchardDeleteKey } from "../config/orchardDeleteConfig";
import {
  useDeleteOrchardEntire,
  useDeleteOrchardSection,
  useOrchardByIdQuery,
} from "../hooks/useOrchardsQuery";
import { orchardRoutes } from "../routes/orchardRoutes";

export default function OrchardDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: orchard, isPending } = useOrchardByIdQuery(id);
  const { mutateAsync: deleteOrchard, isPending: isDeletingOrchard } =
    useDeleteOrchardEntire();

  const { mutateAsync: deleteOrchardSection } = useDeleteOrchardSection();
  console.log(orchard, "orchard detailsllls");

  const [deleteSection, setDeleteSection] = useState<OrchardDeleteKey | null>(
    null
  );
  const [deleteWhole, setDeleteWhole] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const hasData = (value: any) => {
    if (!value) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") return Object.keys(value).length > 0;
    return true;
  };

  const goToSection = (section: OrchardRouteKey) => {
    router.push(`${orchardRoutes[section]}?id=${orchard?.id}`);
  };

  console.log(orchard, "orchard....+++++");
  const getDeletePayload = (section: OrchardDeleteKey) => {
    switch (section) {
      case "nutrition":
        return {
          ...orchard,
          cropNutrition: null,
        };

      case "farmInfrastructure":
        return {
          ...orchard,
          infrastructure: null,
        };

      case "varieties":
        return {
          ...orchard,
          varieties: null,
        };

      case "soilAndWater":
        return {
          ...orchard,
          soilAndWater: null,
        };

      case "plantHealth":
        return {
          ...orchard,
          plantHealth: null,
        };

      case "production":
        return {
          ...orchard,
          production: null,
        };

      case "inputCost":
        return {
          ...orchard,
          inputCost: null,
        };

      case "futureReadiness":
        return {
          ...orchard,
          optionalFields: null,
        };

      default:
        throw new Error("Unknown delete section");
    }
  };

  const handleDelete = async (section: OrchardDeleteKey) => {
    try {
      setDeleting(true);

      const payload = getDeletePayload(section, orchard.id);
      console.log(payload, "payload...");

      await deleteOrchardSection(payload);
      // queryClient.invalidateQueries([section, orchard.id], null);

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

  const handleDeleteWholeOrchard = async (section: OrchardDeleteKey) => {
    try {
      setDeleting(true);

      await deleteOrchard(orchard.id);

      showSuccessToast("orchard deleted successfully");

      queryClient.invalidateQueries(["deleteOrchard", orchard.id]);

      setDeleteSection(null);
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to delete section");
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
              value: `${orchard?.kanals} kanals ${orchard.marlas} marlas`,
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
            hasData(orchard.district)
              ? [
                  {
                    title: "District",
                    value: orchard.district,
                    icon: <MapPin size={20} color={colors.primary} />,
                  },
                  {
                    title: "Tehsil",
                    value: orchard.tehsil,
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
            hasData(orchard?.cropNutrition)
              ? [
                  {
                    title: "Fertilizer Practice",
                    value: orchard.cropNutrition?.fertilizerPractices,
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Fertigation",
                    value: orchard.cropNutrition?.hasFertigation ? "Yes" : "No",
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Nutrition Plan",
                    value: orchard.cropNutrition?.nutritionPlan,
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Mulching",
                    value: orchard.cropNutrition?.isMulchingApplied
                      ? "Yes"
                      : "No",
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Last Fertilizer Application Date",
                    value: orchard.cropNutrition?.lastFertilizerApplicationDate
                      ? new Date(
                          orchard.cropNutrition.lastFertilizerApplicationDate
                        ).toLocaleDateString()
                      : "-",
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Fertilizer Application Mode",
                    value: orchard.cropNutrition?.fertilizerApplicationMode,
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={
            hasData(orchard.district)
              ? () => goToSection("nutrition")
              : undefined
          }
          onDelete={
            orchard.district ? () => handleDelete("nutrition") : undefined
          }
          onAdd={() => goToSection("nutrition")}
          emptyActionLabel="Add Crop Nutrition"
        />

        <OrchardDetailsCard
          heading="Infrastructure"
          items={
            hasData(orchard?.infrastructure)
              ? [
                  {
                    title: "Equipment Owned",
                    value: orchard?.infrastructure?.equipmentOwned?.length
                      ? orchard.infrastructure.equipmentOwned.join(", ")
                      : "—",
                    icon: <ToolCase size={20} color={colors.primary} />,
                  },
                  {
                    title: "Storage Facilities",
                    value: orchard?.infrastructure?.storageFacilities?.length
                      ? orchard.infrastructure.storageFacilities.join(", ")
                      : "—",
                    icon: <Warehouse size={20} color={colors.primary} />,
                  },
                  {
                    title: "Other Tools",
                    value: orchard?.infrastructure?.otherTools?.length
                      ? orchard.infrastructure.otherTools.join(", ")
                      : "—",
                    icon: <Wrench size={20} color={colors.primary} />,
                  },
                  {
                    title: "Permanent Labor",
                    value: orchard?.infrastructure?.permanentLabor ?? "—",
                    icon: <Users size={20} color={colors.primary} />,
                  },
                  {
                    title: "Seasonal Labor",
                    value: orchard?.infrastructure?.seasonalLabor ?? "—",
                    icon: <Users size={20} color={colors.primary} />,
                  },
                  {
                    title: "Contract-based Labor",
                    value: orchard?.infrastructure?.contractBasedLabor ?? "—",
                    icon: <Users size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={
            hasData(orchard?.infrastructure)
              ? () => goToSection("farmInfrastructure")
              : undefined
          }
          // onDelete={
          //   hasData(orchard?.infrastructure)
          //     ? () => setDeleteSection("farmInfrastructure")
          //     : undefined
          // }
          onDelete={
            orchard.district
              ? () => handleDelete("farmInfrastructure")
              : undefined
          }
          onAdd={() => goToSection("farmInfrastructure")}
          emptyActionLabel="Add Infrastructure"
        />

        {/* LOCATION */}

        <OrchardDetailsCard
          heading="Varieties & Planting"
          items={
            hasData(orchard.varieties)
              ? orchard.varieties.flatMap((v: any) => [
                  {
                    title: "Variety Name",
                    value: v.varietyName,
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Total Trees",
                    value: v.numberOfTrees,
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Rootstock Used",
                    value: v.rootstockUsed,
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Plant Density",
                    value: v.plantDensity,
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Trees (< 5 Years)",
                    value: v.treesLessThan5Years,
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Trees (5–10 Years)",
                    value: v.treesFiveToTenYears,
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                  {
                    title: "Trees (> 10 Years)",
                    value: v.treesMoreThan10Years,
                    icon: <Leaf size={20} color={colors.primary} />,
                  },
                ])
              : []
          }
          onEdit={
            hasData(orchard.varieties)
              ? () => goToSection("varietyAndPlanting")
              : undefined
          }
          onDelete={
            hasData(orchard.varieties)
              ? () => setDeleteSection("varieties")
              : undefined
          }
          onAdd={() => goToSection("varietyAndPlanting")}
          emptyActionLabel="Add Varieties"
        />

        <OrchardDetailsCard
          heading="Soil & Water"
          items={
            hasData(orchard.soilAndWater)
              ? [
                  {
                    title: "Soil Type",
                    value: orchard.soilAndWater.soilType || "—",
                    icon: <Droplet size={20} color={colors.primary} />,
                  },
                  {
                    title: "Soil Health Status",
                    value: orchard.soilAndWater.soilHealthStatus?.length
                      ? orchard.soilAndWater.soilHealthStatus.join(", ")
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
                    value: orchard.soilAndWater.lastSoilTestDate
                      ? new Date(
                          orchard.soilAndWater.lastSoilTestDate
                        ).toLocaleDateString()
                      : "—",
                    icon: <Calendar size={20} color={colors.primary} />,
                  },
                  {
                    title: "Water Source",
                    value: orchard.soilAndWater.waterSource || "—",
                    icon: <Droplet size={20} color={colors.primary} />,
                  },
                  {
                    title: "Irrigation Method",
                    value: orchard.soilAndWater.irrigationMethod || "—",
                    icon: <Waves size={20} color={colors.primary} />,
                  },
                  {
                    title: "Water Availability",
                    value: orchard.soilAndWater.waterAvailability || "—",
                    icon: <AlertCircle size={20} color={colors.primary} />,
                  },
                  {
                    title: "Soil Test Report",
                    value: orchard.soilAndWater.soilTestReportUrl
                      ? "View Report"
                      : "—",
                    icon: <FileText size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={
            hasData(orchard.soilAndWater)
              ? () => goToSection("soilAndWater")
              : undefined
          }
          onDelete={
            hasData(orchard.soilAndWater)
              ? () => setDeleteSection("soilAndWater")
              : undefined
          }
          onAdd={() => goToSection("soilAndWater")}
          emptyActionLabel="Add Soil & Water"
        />

        <OrchardDetailsCard
          heading="Plant Protection"
          items={
            hasData(orchard.plantHealth)
              ? [
                  {
                    title: "Diseases",
                    value:
                      orchard.plantHealth.diseaseHistory?.join(", ") || "-",
                    icon: <ShieldCheck size={20} color={colors.primary} />,
                  },
                  {
                    title: "Pests",
                    value: orchard.plantHealth.pestHistory?.join(", ") || "-",
                    icon: <Bug size={20} color={colors.primary} />,
                  },
                  {
                    title: "Spray Schedule",
                    value: orchard.plantHealth.spraySchedule?.join(", ") || "-",
                    icon: <Calendar size={20} color={colors.primary} />,
                  },
                  {
                    title: "Crop Insurance",
                    value: orchard.plantHealth.isCropInsuranceCovered
                      ? "Covered"
                      : "Not Covered",
                    icon: <Shield size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={
            hasData(orchard.plantHealth)
              ? () => goToSection("plantProtection")
              : undefined
          }
          onDelete={
            hasData(orchard.plantHealth)
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
            hasData(orchard.production)
              ? [
                  {
                    title: "Average Yield",
                    value: `${orchard.production.averageAnnualYield} ${orchard.production.yieldUnit || ""}`,
                    icon: <TrendingUp size={20} color={colors.primary} />,
                  },
                  {
                    title: "Peak Harvest (From)",
                    value: orchard.production.peakHarvestFromMonth
                      ? new Date(
                          orchard.production.peakHarvestFromMonth
                        ).toLocaleDateString()
                      : "-",
                    icon: <Calendar size={20} color={colors.primary} />,
                  },
                  {
                    title: "Peak Harvest (To)",
                    value: orchard.production.peakHarvestToMonth
                      ? new Date(
                          orchard.production.peakHarvestToMonth
                        ).toLocaleDateString()
                      : "-",
                    icon: <Calendar size={20} color={colors.primary} />,
                  },
                  {
                    title: "Selling Preference",
                    value: orchard.production.sellingPreference || "-",
                    icon: <Store size={20} color={colors.primary} />,
                  },
                  {
                    title: "Buyer Name",
                    value: orchard.production.buyerName || "-",
                    icon: <User size={20} color={colors.primary} />,
                  },
                  {
                    title: "Buyer Contact",
                    value: orchard.production.buyerContact || "-",
                    icon: <Phone size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={
            hasData(orchard.production)
              ? () => goToSection("productionAndMarketing")
              : undefined
          }
          onDelete={
            hasData(orchard.production)
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
            hasData(orchard.inputCost)
              ? [
                  {
                    title: "Payment Type",
                    value: orchard.inputCost.paymentType || "-",
                    icon: <IndianRupee size={20} color={colors.primary} />,
                  },
                  {
                    title: "Credit Period",
                    value: orchard.inputCost.creditPeriod || "-",
                    icon: <CalendarClock size={20} color={colors.primary} />,
                  },
                  {
                    title: "Pesticide Supplier Location",
                    value: orchard.inputCost.pesticideSupplierLocation || "-",
                    icon: <MapPin size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={
            hasData(orchard.inputCost)
              ? () => goToSection("inputCost")
              : undefined
          }
          onDelete={
            hasData(orchard.inputCost)
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
            hasData(orchard.optionalFields)
              ? [
                  {
                    title: "Government Schemes Availed",
                    value:
                      orchard.optionalFields.governmentSchemesAvailed?.join(
                        ", "
                      ) || "-",
                    icon: <Landmark size={20} color={colors.primary} />,
                  },
                  {
                    title: "FPO / Cooperative Member",
                    value: orchard.optionalFields.isFpoOrCooperativeMember
                      ? "Yes"
                      : "No",
                    icon: <Users size={20} color={colors.primary} />,
                  },
                  {
                    title: "Certifications",
                    value:
                      orchard.optionalFields.certifications?.join(", ") || "-",
                    icon: <BadgeCheck size={20} color={colors.primary} />,
                  },
                  {
                    title: "Digital Tools Used",
                    value:
                      orchard.optionalFields.digitalToolsUsed?.join(", ") ||
                      "-",
                    icon: <Smartphone size={20} color={colors.primary} />,
                  },
                ]
              : []
          }
          onEdit={
            hasData(orchard.optionalFields)
              ? () => goToSection("futureReadiness")
              : undefined
          }
          onDelete={
            hasData(orchard.optionalFields)
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
    </ScreenLayout>
  );
}
