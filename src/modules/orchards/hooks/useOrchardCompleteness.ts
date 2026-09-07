import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  getInfrastructureByOrchard,
  getOrchardExtraByOrchard,
  getOrchardVarieties,
  getSoilWaterByOrchard,
} from "../services/orchard.service";

export type OrchardSectionKey =
  | "basic"
  | "location"
  | "varieties"
  | "soil"
  | "infrastructure"
  | "future";

export type OrchardSectionState = {
  key: OrchardSectionKey;
  label: string;
  done: boolean;
};

export type OrchardCompleteness = {
  id: string;
  name: string;
  sections: OrchardSectionState[];
  done: number;
  total: number;
  /** 0-100. */
  percent: number;
  missing: string[];
};

export type OrchardCompletenessSummary = {
  orchards: OrchardCompleteness[];
  /** Sections filled across every orchard. */
  done: number;
  total: number;
  percent: number;
  /** Orchards with at least one section still empty. */
  incomplete: number;
  isLoading: boolean;
};

const SECTION_LABELS: Record<OrchardSectionKey, string> = {
  basic: "Basic details",
  location: "Location",
  varieties: "Varieties",
  soil: "Soil & water",
  infrastructure: "Infrastructure",
  future: "Future readiness",
};

const hasContent = (value: any): boolean => {
  if (!value) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
};

/**
 * Which registration sections each orchard still has empty.
 *
 * There is no bulk endpoint for this, so it fans out the same per-orchard
 * section queries the details screen already uses — matching their query keys,
 * so opening an orchard afterwards reads straight from cache instead of
 * refetching.
 */
export function useOrchardCompleteness(
  orchards: any[],
): OrchardCompletenessSummary {
  const ids = useMemo(
    () => (orchards ?? []).map((orchard) => orchard?.id).filter(Boolean),
    [orchards],
  );

  const queries = useQueries({
    queries: ids.flatMap((id) => [
      {
        queryKey: ["orchardVarieties", id],
        queryFn: () => getOrchardVarieties(id),
      },
      { queryKey: ["soilWater", id], queryFn: () => getSoilWaterByOrchard(id) },
      {
        queryKey: ["infrastructure", id],
        queryFn: () => getInfrastructureByOrchard(id),
      },
      {
        queryKey: ["orchardExtra", id],
        queryFn: () => getOrchardExtraByOrchard(id),
      },
    ]),
  });

  const isLoading = queries.some((query) => query.isPending);

  return useMemo(() => {
    const rows: OrchardCompleteness[] = (orchards ?? [])
      .filter((orchard) => orchard?.id)
      .map((orchard, index) => {
        const base = index * 4;
        const [varieties, soil, infrastructure, extra] = [
          queries[base],
          queries[base + 1],
          queries[base + 2],
          queries[base + 3],
        ];

        const sections: OrchardSectionState[] = [
          {
            key: "basic",
            label: SECTION_LABELS.basic,
            done: Boolean(
              orchard?.orchardName &&
                orchard?.ownershipType &&
                orchard?.plantationPattern &&
                orchard?.establishmentYear,
            ),
          },
          {
            key: "location",
            label: SECTION_LABELS.location,
            done: Boolean(orchard?.district || orchard?.tehsil),
          },
          {
            key: "varieties",
            label: SECTION_LABELS.varieties,
            done: hasContent(varieties?.data),
          },
          {
            key: "soil",
            label: SECTION_LABELS.soil,
            done: hasContent(soil?.data),
          },
          {
            key: "infrastructure",
            label: SECTION_LABELS.infrastructure,
            done: hasContent(infrastructure?.data),
          },
          {
            key: "future",
            label: SECTION_LABELS.future,
            done: hasContent(extra?.data),
          },
        ];

        const done = sections.filter((section) => section.done).length;

        return {
          id: String(orchard.id),
          name: orchard?.orchardName || "Unnamed Orchard",
          sections,
          done,
          total: sections.length,
          percent: Math.round((done / sections.length) * 100),
          missing: sections
            .filter((section) => !section.done)
            .map((section) => section.label),
        };
      })
      // Least complete first — the work still to do belongs at the top.
      .sort((a, b) => a.done - b.done || a.name.localeCompare(b.name));

    const done = rows.reduce((sum, row) => sum + row.done, 0);
    const total = rows.reduce((sum, row) => sum + row.total, 0);

    return {
      orchards: rows,
      done,
      total,
      percent: total ? Math.round((done / total) * 100) : 0,
      incomplete: rows.filter((row) => row.done < row.total).length,
      isLoading,
    };
  }, [orchards, queries, isLoading]);
}
