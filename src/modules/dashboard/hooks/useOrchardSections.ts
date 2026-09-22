import { useQuery } from "@tanstack/react-query";
import {
  getOrchardAdvisory,
  getOrchardAlerts,
  getOrchardFinancial,
  getOrchardNutrient,
  getOrchardPestDisease,
  getOrchardResources,
} from "../services/orchardSections.service";

// Each hook only fires once its tab is actually mounted (the detail screen
// conditionally renders just the active tab's section component), and
// caches per orchard so flipping back to a previously-viewed tab is instant.

export const useOrchardNutrient = (orchardProfileId: number) =>
  useQuery({
    queryKey: ["orchard-nutrient", orchardProfileId],
    queryFn: ({ signal }) => getOrchardNutrient(orchardProfileId, signal),
    enabled: !!orchardProfileId,
    staleTime: 60_000,
  });

export const useOrchardPestDisease = (orchardProfileId: number) =>
  useQuery({
    queryKey: ["orchard-pest-disease", orchardProfileId],
    queryFn: ({ signal }) => getOrchardPestDisease(orchardProfileId, signal),
    enabled: !!orchardProfileId,
    staleTime: 60_000,
  });

export const useOrchardResources = (orchardProfileId: number) =>
  useQuery({
    queryKey: ["orchard-resources", orchardProfileId],
    queryFn: ({ signal }) => getOrchardResources(orchardProfileId, signal),
    enabled: !!orchardProfileId,
    staleTime: 60_000,
  });

export const useOrchardFinancial = (orchardProfileId: number) =>
  useQuery({
    queryKey: ["orchard-financial", orchardProfileId],
    queryFn: ({ signal }) => getOrchardFinancial(orchardProfileId, signal),
    enabled: !!orchardProfileId,
    staleTime: 60_000,
  });

export const useOrchardAdvisory = (orchardProfileId: number) =>
  useQuery({
    queryKey: ["orchard-advisory", orchardProfileId],
    queryFn: ({ signal }) => getOrchardAdvisory(orchardProfileId, signal),
    enabled: !!orchardProfileId,
    staleTime: 60_000,
  });

export const useOrchardAlerts = (orchardProfileId: number) =>
  useQuery({
    queryKey: ["orchard-alerts", orchardProfileId],
    queryFn: ({ signal }) => getOrchardAlerts(orchardProfileId, signal),
    enabled: !!orchardProfileId,
    staleTime: 60_000,
  });
