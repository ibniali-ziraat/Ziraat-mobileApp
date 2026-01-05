import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ConfirmDeleteModal from "@/src/components/ui/ConfirmDeleteModal";

import { colors } from "@/src/constants/colors";
import orchardsData from "@/src/data/myOrchardsData.json";
import { showSuccessToast } from "@/src/utils/toast";

import {
  orchardDeleteConfig,
  OrchardDeleteKey,
} from "../config/orchardDeleteConfig";

// Icons
import {
  Droplet,
  IndianRupee,
  Leaf,
  Link,
  MapPin,
  Navigation,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Warehouse,
} from "lucide-react-native";
import OrchardDetailsCard from "../components/OrchardDetailsCard";
import { OrchardRouteKey, orchardRoutes } from "../routes/orchardRoutes";

export default function OrchardDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const orchard = orchardsData.find((o) => o.id === String(id));

  const [deleteSection, setDeleteSection] = useState<OrchardDeleteKey | null>(
    null
  );
  const [deleting, setDeleting] = useState(false);

  /* -------------------- NAVIGATION -------------------- */
  const goToSection = (section: OrchardRouteKey) => {
    router.push({
      pathname: orchardRoutes[section],
      params: { id: orchard.id },
    });
  };

  /* -------------------- DELETE -------------------- */
  const handleDelete = async (section: OrchardDeleteKey) => {
    try {
      setDeleting(true);

      const config = orchardDeleteConfig[section];

      // 🔴 API call goes here
      // await deleteOrchardSection({ orchardId: orchard.id, section });

      showSuccessToast(config.success);
      queryClient.invalidateQueries([config.queryKey, orchard.id]);

      setDeleteSection(null);
    } finally {
      setDeleting(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <ScreenLayout>
      <BackHeader
        title="Orchard Details"
        desc="Detailed orchard profile and management information"
      />

      {/* BASIC INFORMATION */}
      <OrchardDetailsCard
        heading="Basic Information"
        items={[
          {
            title: "Orchard Name",
            value: orchard.name,
            icon: <Leaf size={22} color={colors.primary} />,
          },
          {
            title: "Area",
            value: orchard.area,
            icon: <Sprout size={22} color={colors.primary} />,
          },
        ]}
        onEdit={() => goToSection("basicInformation")}
      />

      {/* ADDRESS */}
      <OrchardDetailsCard
        heading="Address"
        items={
          orchard.address
            ? [
                {
                  title: "Village",
                  value: orchard.address.village,
                  icon: <MapPin size={22} color={colors.primary} />,
                },
                {
                  title: "District",
                  value: orchard.address.district,
                  icon: <Navigation size={22} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={() => goToSection("crop")}
        onDelete={orchard.address ? () => setDeleteSection("crop") : undefined}
        onAdd={() => goToSection("crop")}
        emptyActionLabel="Add Address"
      />

      {/* VARIETY & PLANTING */}
      <OrchardDetailsCard
        heading="Variety & Planting"
        items={
          orchard.variety_and_planting_details
            ? [
                {
                  title: "Variety",
                  value: orchard.variety_and_planting_details.variety,
                  icon: <Leaf size={22} color={colors.primary} />,
                },
                {
                  title: "Spacing",
                  value: orchard.variety_and_planting_details.spacing,
                  icon: <Sprout size={22} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={() => goToSection("varietyAndPlanting")}
        onDelete={
          orchard.variety_and_planting_details
            ? () => setDeleteSection("varietyAndPlanting")
            : undefined
        }
        onAdd={() => goToSection("varietyAndPlanting")}
        emptyActionLabel="Add Variety & Planting"
      />

      {/* SOIL & WATER */}
      <OrchardDetailsCard
        heading="Soil & Water"
        items={
          orchard.soil_and_water_profile
            ? [
                {
                  title: "Soil Type",
                  value: orchard.soil_and_water_profile.soil_type,
                  icon: <Droplet size={20} color={colors.primary} />,
                },
                {
                  title: "Irrigation",
                  value: orchard.soil_and_water_profile.irrigation_method,
                  icon: <Droplet size={20} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={() => goToSection("soilAndWater")}
        onDelete={
          orchard.soil_and_water_profile
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
          orchard.plant_protection_and_health
            ? [
                {
                  title: "Protection Method",
                  value: orchard.plant_protection_and_health.method,
                  icon: <ShieldCheck size={22} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={() => goToSection("plantProtection")}
        onDelete={
          orchard.plant_protection_and_health
            ? () => setDeleteSection("plantProtection")
            : undefined
        }
        onAdd={() => goToSection("plantProtection")}
        emptyActionLabel="Add Plant Protection"
      />

      {/* FARM INFRASTRUCTURE */}
      <OrchardDetailsCard
        heading="Farm Infrastructure"
        items={
          orchard.farm_infrastructure_and_resources
            ? [
                {
                  title: "Storage",
                  value: orchard.farm_infrastructure_and_resources.storage,
                  icon: <Warehouse size={22} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={() => goToSection("farmInfrastructure")}
        onDelete={
          orchard.farm_infrastructure_and_resources
            ? () => setDeleteSection("farmInfrastructure")
            : undefined
        }
        onAdd={() => goToSection("farmInfrastructure")}
        emptyActionLabel="Add Infrastructure"
      />

      {/* PRODUCTION & MARKETING */}
      <OrchardDetailsCard
        heading="Production & Marketing"
        items={
          orchard.production_and_marketing
            ? [
                {
                  title: "Yield",
                  value: orchard.production_and_marketing.yield,
                  icon: <TrendingUp size={22} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={() => goToSection("productionAndMarketing")}
      />

      {/* INPUT COST */}
      <OrchardDetailsCard
        heading="Input Cost Details"
        items={
          orchard.input_cost_details
            ? [
                {
                  title: "Total Cost",
                  value: orchard.input_cost_details.total_cost,
                  icon: <IndianRupee size={22} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={() => goToSection("inputCost")}
      />

      {/* FUTURE READINESS */}
      <OrchardDetailsCard
        heading="Future Readiness & Linkages"
        items={
          orchard.future_readiness_and_linkages
            ? [
                {
                  title: "Market Linkage",
                  value: orchard.future_readiness_and_linkages.market_linkage,
                  icon: <Link size={22} color={colors.primary} />,
                },
              ]
            : []
        }
        onEdit={() => goToSection("futureReadiness")}
      />

      {/* CONFIRM DELETE */}
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
