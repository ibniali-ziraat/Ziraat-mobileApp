import Loader from "@/src/components/shared/Loader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { toKanals } from "@/src/modules/home/utils/dashboardFormat";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import AddOrchardFAB from "../components/AddOrchardFab";
import NoOrchardsEmpty from "../components/NoOrchardsEmpty";
import OrchardFilterSheet, {
  ANY,
  DEFAULT_FILTERS,
  type FacetOption,
  type OrchardFacets,
  type OrchardFilters,
} from "../components/OrchardFilterSheet";
import OrchardList from "../components/OrchardList";
import { OWNERSHIP_TYPES } from "../constants/orchardOptions";
import { useOrchardsByUserQuery } from "../hooks/useOrchardsQuery";

/** Facet chips read "All types", "All locations", … before any is picked. */
const ANY_LABELS = {
  ownershipType: "All types",
  district: "All locations",
  plantationPattern: "All patterns",
} as const;

const orchardLocation = (orchard: any): string =>
  orchard?.district || orchard?.tehsil || "";

/**
 * Options for one facet: the known values first so the order is stable, then
 * anything the API returned that the form no longer offers — otherwise those
 * orchards would be unreachable.
 */
function buildFacet(
  orchards: any[],
  read: (orchard: any) => string,
  anyLabel: string,
  known: readonly string[] = [],
): FacetOption[] {
  const counts = new Map<string, number>();
  for (const orchard of orchards) {
    const value = read(orchard);
    if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  const extras = [...counts.keys()]
    .filter((value) => !known.includes(value))
    .sort((a, b) => a.localeCompare(b));

  const values = [...known, ...extras].filter(
    (value) => known.includes(value) || counts.has(value),
  );

  return [
    { value: ANY, label: anyLabel, count: orchards.length },
    ...values.map((value) => ({
      value,
      label: value,
      count: counts.get(value) ?? 0,
    })),
  ];
}

const compare = (sort: OrchardFilters["sort"]) => (a: any, b: any) => {
  switch (sort) {
    case "name-desc":
      return String(b?.orchardName ?? "").localeCompare(
        String(a?.orchardName ?? ""),
      );
    case "area-desc":
      return (
        toKanals(b?.kanals, b?.marlas) - toKanals(a?.kanals, a?.marlas)
      );
    case "year-desc":
      return Number(b?.establishmentYear ?? 0) - Number(a?.establishmentYear ?? 0);
    default:
      return String(a?.orchardName ?? "").localeCompare(
        String(b?.orchardName ?? ""),
      );
  }
};

export default function MyOrchardsScreen() {
  const {
    data: orchardData,
    isPending,
    isError,
    refetch,
  } = useOrchardsByUserQuery();
  const { setOrchardProfileId } = useAuth();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<OrchardFilters>(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!orchardData?.length) setOrchardProfileId(null);
  }, [orchardData, setOrchardProfileId]);

  // Search first: the facet counts describe what the current search left
  // behind, so the numbers always match the list the user is looking at.
  const searchMatches = useMemo(() => {
    const orchards = orchardData ?? [];
    if (!search) return orchards;
    const text = search.toLowerCase();
    return orchards.filter(
      (o: any) =>
        o?.orchardName?.toLowerCase().includes(text) ||
        o?.ownershipType?.toLowerCase().includes(text) ||
        o?.plantationPattern?.toLowerCase().includes(text) ||
        o?.district?.toLowerCase().includes(text) ||
        o?.tehsil?.toLowerCase().includes(text) ||
        String(o?.kanals || "").includes(text) ||
        String(o?.marlas || "").includes(text),
    );
  }, [orchardData, search]);

  const facets = useMemo<OrchardFacets>(
    () => ({
      ownershipType: buildFacet(
        searchMatches,
        (o) => o?.ownershipType,
        ANY_LABELS.ownershipType,
        OWNERSHIP_TYPES,
      ),
      district: buildFacet(
        searchMatches,
        orchardLocation,
        ANY_LABELS.district,
      ),
      plantationPattern: buildFacet(
        searchMatches,
        (o) => o?.plantationPattern,
        ANY_LABELS.plantationPattern,
      ),
    }),
    [searchMatches],
  );

  const visibleOrchards = useMemo(() => {
    const matches = searchMatches.filter((o: any) => {
      if (
        filters.ownershipType !== ANY &&
        o?.ownershipType !== filters.ownershipType
      ) {
        return false;
      }
      if (
        filters.district !== ANY &&
        orchardLocation(o) !== filters.district
      ) {
        return false;
      }
      if (
        filters.plantationPattern !== ANY &&
        o?.plantationPattern !== filters.plantationPattern
      ) {
        return false;
      }
      return true;
    });

    return [...matches].sort(compare(filters.sort));
  }, [searchMatches, filters]);

  const activeFilters = [
    filters.ownershipType,
    filters.district,
    filters.plantationPattern,
  ].filter((value) => value !== ANY);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();

    setRefreshing(false);
  };

  if (isPending) return <Loader />;
  if (isError) return <Loader />;

  const hasNoOrchards = !orchardData || orchardData.length === 0;

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      {hasNoOrchards ? (
        <ScreenLayout>
          <NoOrchardsEmpty />
        </ScreenLayout>
      ) : (
        <OrchardList
          orchards={visibleOrchards}
          search={search}
          setSearch={setSearch}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onOpenFilters={() => setFiltersOpen(true)}
          activeFilterLabel={activeFilters.join(" • ") || undefined}
          onClearFilters={
            activeFilters.length ? () => setFilters(DEFAULT_FILTERS) : undefined
          }
        />
      )}

      {!hasNoOrchards && <AddOrchardFAB />}

      <OrchardFilterSheet
        visible={filtersOpen}
        facets={facets}
        value={filters}
        onApply={setFilters}
        onClose={() => setFiltersOpen(false)}
      />
    </View>
  );
}
