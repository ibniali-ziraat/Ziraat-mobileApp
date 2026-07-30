import { useMemo } from "react";
import { useOrchardCompleteness } from "../../orchards/hooks/useOrchardCompleteness";
import { useOrchardsByUserQuery } from "../../orchards/hooks/useOrchardsQuery";
import { getOrchardCreatedTimestamp } from "../../orchards/utils/orchardDates";

export function useActiveOrchardCompleteness() {
  const { data: orchardData } = useOrchardsByUserQuery();

  const targetOrchard = useMemo(() => {
    if (!orchardData?.length) return null;
    return [...orchardData].sort(
      (a, b) =>
        getOrchardCreatedTimestamp(b) - getOrchardCreatedTimestamp(a),
    )[0];
  }, [orchardData]);

  const completeness = useOrchardCompleteness(targetOrchard?.id);

  return { targetOrchard, ...completeness };
}
