import { useAuth } from "@/src/contexts/AuthContext";
import { useMemo } from "react";
import { useOrchardsByUserQuery } from "../../orchards/hooks/useOrchardsQuery";
import {
  useBestDeals,
  useTrendingProducts,
} from "../../products/hooks/queries/products.queries";
import type { FarmActivityComparison } from "../types/farmerDashboard";
import { toKanals, toNumber } from "../utils/dashboardFormat";
import { useFarmerDashboard } from "./useFarmerDashboard";

export type OrchardRecord = Record<string, any>;

/**
 * Activity rows the farmer dashboard sends that we deliberately do not surface
 * on the home screen. Matched case-insensitively against the row label.
 */
const HIDDEN_ACTIVITY_LABELS = ["harvest", "spray"];

export type OrchardHistoryEntry = {
  id: string;
  name: string;
  areaKanals: number;
  location: string;
  ownership: string;
  establishmentYear: number | null;
  createdAt: number | null;
};

export type TrendPoint = {
  label: string;
  value: number;
};

export type ProductMetric = "rating" | "price";

export type ProductBar = {
  key: string;
  productId: string;
  vendorId?: string;
  vendorProductId?: string;
  label: string;
  value: number;
  vendor: string;
};

const readCreatedAt = (orchard: OrchardRecord): number | null => {
  const raw =
    orchard?.createdAt ??
    orchard?.createdOn ??
    orchard?.createdDate ??
    orchard?.created_at;

  if (!raw) return null;

  const timestamp = new Date(raw).getTime();
  return Number.isFinite(timestamp) ? timestamp : null;
};

const readLocation = (orchard: OrchardRecord): string =>
  orchard?.villageName ??
  orchard?.village ??
  orchard?.tehsil ??
  orchard?.district ??
  orchard?.location ??
  "Location not added";

const readDistrict = (orchard: OrchardRecord): string | null => {
  const district = orchard?.district ?? orchard?.tehsil;
  return typeof district === "string" && district.trim() ? district.trim() : null;
};

const asArray = (payload: unknown): OrchardRecord[] => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray((payload as any)?.products)) return (payload as any).products;
  if (Array.isArray((payload as any)?.data)) return (payload as any).data;
  if (Array.isArray((payload as any)?.content)) return (payload as any).content;
  return [];
};

const readProductName = (product: OrchardRecord): string =>
  product?.name ??
  product?.productName ??
  product?.title ??
  product?.product?.name ??
  "Product";

const readProductPrice = (product: OrchardRecord): number =>
  toNumber(
    product?.price ??
      product?.sellingPrice ??
      product?.finalPrice ??
      product?.mrp ??
      product?.discountPrice,
  );

const readProductRating = (product: OrchardRecord): number =>
  toNumber(product?.ratingAverage ?? product?.rating ?? product?.avgRating);

const readVendor = (product: OrchardRecord): string =>
  product?.vendor?.name ?? product?.vendorName ?? product?.brand ?? "Marketplace";

export type PriceBand = {
  label: string;
  count: number;
};

const PRICE_BANDS = 5;
const TOP_ORCHARD_BARS = 5;

/** Spread of what things cost, split into equal bands between min and max. */
const buildPriceBands = (prices: number[]): PriceBand[] => {
  if (prices.length < PRICE_BANDS) return [];

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (max <= min) return [];

  const step = (max - min) / PRICE_BANDS;

  return Array.from({ length: PRICE_BANDS }, (_, index) => {
    const from = min + step * index;
    const isLast = index === PRICE_BANDS - 1;
    const to = isLast ? max : from + step;

    return {
      label:
        from >= 1000
          ? `${Math.round(from / 100) / 10}k`
          : `${Math.round(from)}`,
      count: prices.filter((price) =>
        isLast ? price >= from && price <= to : price >= from && price < to,
      ).length,
    };
  });
};

/**
 * Orchards registered per month across a continuous trailing window. Empty
 * months are kept so the axis does not silently compress a quiet stretch.
 */
const buildMonthlyRegistrations = (
  entries: OrchardHistoryEntry[],
  months = 6,
): TrendPoint[] => {
  const dated = entries.filter((entry) => entry.createdAt !== null);
  if (dated.length === 0) return [];

  const now = new Date();
  const buckets: TrendPoint[] = [];

  for (let offset = months - 1; offset >= 0; offset -= 1) {
    const month = new Date(now.getFullYear(), now.getMonth() - offset, 1);

    const value = dated.filter((entry) => {
      const created = new Date(entry.createdAt as number);
      return (
        created.getFullYear() === month.getFullYear() &&
        created.getMonth() === month.getMonth()
      );
    }).length;

    buckets.push({
      label: month.toLocaleDateString("en-IN", { month: "short" }),
      value,
    });
  }

  return buckets.some((bucket) => bucket.value > 0) ? buckets : [];
};

/**
 * How the orchard count grew over a trailing window — each column is the total
 * registered by the end of that month, not the handful added during it.
 *
 * Per-month additions are almost always a single spike surrounded by zeros,
 * which draws as stray dashes rather than a trend. A running total gives the
 * strip an actual shape. A flat run says nothing worth a chart, so it returns
 * empty and the caller draws nothing.
 */
const buildOrchardGrowth = (
  entries: OrchardHistoryEntry[],
  months = 6,
): TrendPoint[] => {
  const dated = entries.filter((entry) => entry.createdAt !== null);
  if (dated.length === 0) return [];

  const now = new Date();
  const series: TrendPoint[] = [];

  for (let offset = months - 1; offset >= 0; offset -= 1) {
    const month = new Date(now.getFullYear(), now.getMonth() - offset + 1, 1);

    series.push({
      label: new Date(
        now.getFullYear(),
        now.getMonth() - offset,
        1,
      ).toLocaleDateString("en-IN", { month: "short" }),
      value: dated.filter(
        (entry) => (entry.createdAt as number) < month.getTime(),
      ).length,
    });
  }

  const values = series.map((point) => point.value);
  const flat = Math.max(...values) === Math.min(...values);

  return flat ? [] : series;
};

/** Cumulative planted area, bucketed into the months that actually have data. */
const buildAreaTrend = (entries: OrchardHistoryEntry[]): TrendPoint[] => {
  const dated = entries
    .filter((entry) => entry.createdAt !== null)
    .sort((a, b) => (a.createdAt as number) - (b.createdAt as number));

  if (dated.length < 2) return [];

  const buckets = new Map<string, { at: number; area: number }>();

  dated.forEach((entry) => {
    const date = new Date(entry.createdAt as number);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const bucket = buckets.get(key);

    if (bucket) {
      bucket.area += entry.areaKanals;
    } else {
      buckets.set(key, {
        at: new Date(date.getFullYear(), date.getMonth(), 1).getTime(),
        area: entry.areaKanals,
      });
    }
  });

  const ordered = [...buckets.values()].sort((a, b) => a.at - b.at).slice(-6);

  let running = 0;
  const series = ordered.map((bucket) => {
    running += bucket.area;
    return {
      label: new Date(bucket.at).toLocaleDateString("en-IN", { month: "short" }),
      value: Number(running.toFixed(2)),
    };
  });

  // No areas recorded means every column is zero; nothing to plot.
  return running > 0 ? series : [];
};

export function useHomeDashboard() {
  const { userId } = useAuth();

  const orchardsQuery = useOrchardsByUserQuery();
  const dashboardQuery = useFarmerDashboard(userId ?? undefined);
  const trendingQuery = useTrendingProducts();
  const bestDealsQuery = useBestDeals();

  const orchards = useMemo(
    () => asArray(orchardsQuery.data),
    [orchardsQuery.data],
  );

  const history = useMemo<OrchardHistoryEntry[]>(
    () =>
      orchards
        .map((orchard) => ({
          id: String(orchard?.id ?? orchard?.orchardProfileId ?? ""),
          name: orchard?.orchardName ?? orchard?.name ?? "Unnamed orchard",
          areaKanals: toKanals(orchard?.kanals, orchard?.marlas),
          location: readLocation(orchard),
          ownership: orchard?.ownershipType ?? "Registered",
          establishmentYear: orchard?.establishmentYear
            ? toNumber(orchard.establishmentYear)
            : null,
          createdAt: readCreatedAt(orchard),
        }))
        .filter((entry) => entry.id !== "")
        .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)),
    [orchards],
  );

  const stats = useMemo(() => {
    const totalArea = history.reduce((sum, entry) => sum + entry.areaKanals, 0);

    const districts = new Set(
      orchards.map(readDistrict).filter((district): district is string =>
        Boolean(district),
      ),
    );

    const years = orchards
      .map((orchard) => toNumber(orchard?.establishmentYear))
      .filter((year) => year > 1900);

    const currentYear = new Date().getFullYear();
    const averageAge = years.length
      ? Math.round(
          years.reduce((sum, year) => sum + (currentYear - year), 0) /
            years.length,
        )
      : 0;

    const measured = history.filter((entry) => entry.areaKanals > 0).length;
    const dated = history.filter((entry) => entry.establishmentYear).length;

    return {
      totalOrchards: history.length,
      datedPercent: history.length
        ? Math.round((dated / history.length) * 100)
        : 0,
      totalArea,
      averageArea: history.length ? totalArea / history.length : 0,
      districts: districts.size,
      averageAge,
      measured,
      completeness: history.length
        ? Math.round((measured / history.length) * 100)
        : 0,
    };
  }, [history, orchards]);

  const areaTrend = useMemo(() => buildAreaTrend(history), [history]);

  /** Area per orchard, biggest first, with the tail rolled into one bar. */
  const areaByOrchard = useMemo(() => {
    const ranked = history
      .filter((entry) => entry.areaKanals > 0)
      .sort((a, b) => b.areaKanals - a.areaKanals);

    const top = ranked.slice(0, TOP_ORCHARD_BARS).map((entry) => ({
      id: entry.id,
      label: entry.name,
      area: entry.areaKanals,
    }));

    const restArea = ranked
      .slice(TOP_ORCHARD_BARS)
      .reduce((sum, entry) => sum + entry.areaKanals, 0);

    if (restArea > 0) {
      top.push({
        id: "__others__",
        label: `${ranked.length - TOP_ORCHARD_BARS} other orchards`,
        area: restArea,
      });
    }

    return {
      bars: top,
      unmeasured: history.length - ranked.length,
    };
  }, [history]);

  const ownershipMix = useMemo(() => {
    const counts = new Map<string, number>();

    history.forEach((entry) => {
      const label = entry.ownership?.trim() || "Not specified";
      counts.set(label, (counts.get(label) ?? 0) + 1);
    });

    return [...counts.entries()]
      .map(([label, count]) => ({
        label,
        count,
        share: history.length ? (count / history.length) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [history]);

  const monthlyRegistrations = useMemo(
    () => buildMonthlyRegistrations(history),
    [history],
  );

  const orchardGrowth = useMemo(() => buildOrchardGrowth(history), [history]);

  const completion = useMemo(() => {
    const checks: { label: string; test: (orchard: OrchardRecord) => boolean }[] =
      [
        {
          label: "Area recorded",
          test: (orchard) => toKanals(orchard?.kanals, orchard?.marlas) > 0,
        },
        {
          label: "District added",
          test: (orchard) => Boolean(orchard?.district || orchard?.tehsil),
        },
        {
          label: "Establishment year",
          test: (orchard) => toNumber(orchard?.establishmentYear) > 1900,
        },
        {
          label: "Ownership type",
          test: (orchard) => Boolean(orchard?.ownershipType),
        },
        {
          label: "Plantation pattern",
          test: (orchard) => Boolean(orchard?.plantationPattern),
        },
      ];

    const rows = checks.map((check) => ({
      label: check.label,
      done: orchards.filter(check.test).length,
      total: orchards.length,
    }));

    const filled = rows.reduce((sum, row) => sum + row.done, 0);
    const possible = rows.length * orchards.length;

    return {
      percent: possible ? Math.round((filled / possible) * 100) : 0,
      rows,
    };
  }, [orchards]);

  const activity = useMemo<FarmActivityComparison[]>(
    () =>
      (dashboardQuery.data?.home?.farmOverview?.activityComparison ?? []).filter(
        (item) => {
          if (!item?.label) return false;

          const hasValue =
            (item.currentValue ?? 0) > 0 || (item.previousValue ?? 0) > 0;
          if (!hasValue) return false;

          const label = item.label.toLowerCase();
          return !HIDDEN_ACTIVITY_LABELS.some((hidden) =>
            label.includes(hidden),
          );
        },
      ),
    [dashboardQuery.data],
  );

  const products = useMemo(() => {
    const trending = asArray(trendingQuery.data);
    const deals = asArray(bestDealsQuery.data);
    const pool = [...trending, ...deals];

    const rated = pool.filter((product) => readProductRating(product) > 0);
    const metric: ProductMetric = rated.length >= 3 ? "rating" : "price";

    const source = metric === "rating" ? rated : pool;

    const bars: ProductBar[] = source
      .map((product, index) => {
        const productId = String(
          product?.productId ?? product?.id ?? product?._id ?? "",
        );
        const vendorId = product?.vendorId ?? product?.vendor?.id;

        return {
          key: productId || `${readProductName(product)}-${index}`,
          productId,
          vendorId: vendorId ? String(vendorId) : undefined,
          vendorProductId: product?.vendorProductId
            ? String(product.vendorProductId)
            : undefined,
          label: readProductName(product),
          value:
            metric === "rating"
              ? readProductRating(product)
              : readProductPrice(product),
          vendor: readVendor(product),
        };
      })
      .filter((bar) => bar.value > 0 && bar.productId !== "")
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    const prices = pool.map(readProductPrice).filter((price) => price > 0);

    return {
      metric,
      bars,
      priceBands: buildPriceBands(prices),
      trendingCount: trending.length,
      dealsCount: deals.length,
      averagePrice: prices.length
        ? prices.reduce((sum, price) => sum + price, 0) / prices.length
        : 0,
    };
  }, [trendingQuery.data, bestDealsQuery.data]);

  const isLoading =
    orchardsQuery.isLoading ||
    dashboardQuery.isLoading ||
    trendingQuery.isLoading;

  const refetchAll = async () => {
    await Promise.all([
      orchardsQuery.refetch(),
      dashboardQuery.refetch(),
      trendingQuery.refetch(),
      bestDealsQuery.refetch(),
    ]);
  };

  return {
    /** Raw orchard records, for consumers that need fields we do not distil. */
    orchards,
    stats,
    history,
    areaTrend,
    orchardGrowth,
    areaByOrchard,
    ownershipMix,
    monthlyRegistrations,
    completion,
    activity,
    products,
    period: dashboardQuery.data?.home?.farmOverview?.period ?? "",
    tips: dashboardQuery.data?.home?.tips,
    legalDisclaimer: dashboardQuery.data?.home?.legalDisclaimer,
    isLoading,
    refetchAll,
  };
}
