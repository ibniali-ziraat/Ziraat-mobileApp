import BackHeader from "@/src/components/shared/BackHeader";
import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";
import { colors } from "@/src/constants/colors";
import { showSuccessToast } from "@/src/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import {
  Droplet,
  IndianRupee,
  Leaf,
  Link,
  MapPin,
  ShieldCheck,
  Sprout,
  TrendingUp,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView } from "react-native";
import OrchardDetailsCard from "../components/OrchardDetailsCard";
import {
  orchardDeleteConfig,
  OrchardDeleteKey,
} from "../config/orchardDeleteConfig";
import { useOrchardByIdQuery } from "../hooks/useOrchardsQuery";
import { orchardRoutes } from "../routes/orchardRoutes";

export default function OrchardDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: orchard, isPending } = useOrchardByIdQuery(id);

  const [deleteSection, setDeleteSection] = useState<OrchardDeleteKey | null>(
    null
  );
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

  const handleDelete = async (section: OrchardDeleteKey) => {
    try {
      setDeleting(true);
      const config = orchardDeleteConfig[section];

      // 🔴 API call here
      // await deleteOrchardSection({ orchardId: orchard.id, section });

      showSuccessToast(config.success);
      queryClient.invalidateQueries([config.queryKey, orchard.id]);
      setDeleteSection(null);
    } finally {
      setDeleting(false);
    }
  };

  if (isPending) return <Loader />;

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
                    title: "Mulching",
                    value: orchard.cropNutrition?.isMulchingApplied
                      ? "Yes"
                      : "No",
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
            hasData(orchard.district)
              ? () => setDeleteSection("nutrition")
              : undefined
          }
          onAdd={() => goToSection("nutrition")}
          emptyActionLabel="Add Crop Nutrition"
        />

        {/* LOCATION */}
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
          onEdit={
            hasData(orchard.district) ? () => goToSection("farm") : undefined
          }
          onDelete={
            hasData(orchard.district)
              ? () => setDeleteSection("location")
              : undefined
          }
          onAdd={() => goToSection("farm")}
          emptyActionLabel="Add Location"
        />

        {/* VARIETY & PLANTING */}
        <OrchardDetailsCard
          heading="Varieties & Planting"
          items={
            hasData(orchard.varieties)
              ? orchard.varieties.map((v: any) => ({
                  title: v.varietyName,
                  value: `Trees: ${v.numberOfTrees}`,
                  icon: <Leaf size={20} color={colors.primary} />,
                }))
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

        {/* SOIL & WATER */}
        <OrchardDetailsCard
          heading="Soil & Water"
          items={
            hasData(orchard.soilAndWater)
              ? [
                  {
                    title: "Soil Type",
                    value: orchard.soilAndWater.soilType,
                    icon: <Droplet size={20} color={colors.primary} />,
                  },
                  {
                    title: "Water Source",
                    value: orchard.soilAndWater.waterSource,
                    icon: <Droplet size={20} color={colors.primary} />,
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

        {/* PLANT PROTECTION */}
        <OrchardDetailsCard
          heading="Plant Protection"
          items={
            hasData(orchard.plantHealth)
              ? [
                  {
                    title: "Diseases",
                    value: orchard.plantHealth.diseaseHistory?.join(", "),
                    icon: <ShieldCheck size={20} color={colors.primary} />,
                  },
                  {
                    title: "Pests",
                    value: orchard.plantHealth.pestHistory?.join(", "),
                    icon: <ShieldCheck size={20} color={colors.primary} />,
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
                    value: orchard.production.averageAnnualYield,
                    icon: <TrendingUp size={20} color={colors.primary} />,
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
                    value: orchard.inputCost.paymentType,
                    icon: <IndianRupee size={20} color={colors.primary} />,
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
                    title: "Certifications",
                    value: orchard.optionalFields.certifications?.join(", "),
                    icon: <Link size={20} color={colors.primary} />,
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

      <ConfirmDeleteModal
        visible={!!deleteSection}
        title="Confirm deletion"
        description="Are you sure you want to delete this orchard information?"
        onCancel={() => setDeleteSection(null)}
        onConfirm={() => handleDelete(deleteSection!)}
        loading={deleting}
      />
    </ScreenLayout>
  );
}
