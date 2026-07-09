import { useCallback, useMemo, useState } from "react";
import { CartItemType } from "../types/cart.types";

interface ConflictInfo {
  hasConflict: boolean;
  conflictItemIds: Set<string>;
  message: string | null;
}

/**
 * Manages which cart items are selected for checkout, and blocks
 * checkout when the selection contains the same vendorProductId
 * under two different vendorIds (i.e. the same underlying product
 * from two different sellers).
 */
export function useCartSelection(cart: CartItemType[]) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(cart.map((item) => item.id)));
  }, [cart]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedIds.has(id),
    [selectedIds],
  );

  const selectedItems = useMemo(
    () => cart.filter((item) => selectedIds.has(item.id)),
    [cart, selectedIds],
  );

  // Group SELECTED items by vendorProductId, flag any group that spans >1 vendorId
  const conflict: ConflictInfo = useMemo(() => {
    const groups = new Map<number, Set<number>>();

    selectedItems.forEach((item) => {
      if (item.vendorProductId == null || item.vendorId == null) return;

      if (!groups.has(item.vendorProductId)) {
        groups.set(item.vendorProductId, new Set());
      }
      groups.get(item.vendorProductId)!.add(item.vendorId);
    });

    const conflictingVendorProductIds = Array.from(groups.entries())
      .filter(([, vendorIds]) => vendorIds.size > 1)
      .map(([vpId]) => vpId);

    if (conflictingVendorProductIds.length === 0) {
      return { hasConflict: false, conflictItemIds: new Set(), message: null };
    }

    const conflictItemIds = new Set(
      selectedItems
        .filter(
          (item) =>
            item.vendorProductId != null &&
            conflictingVendorProductIds.includes(item.vendorProductId),
        )
        .map((item) => item.id),
    );

    return {
      hasConflict: true,
      conflictItemIds,
      message:
        "You've selected the same product from different sellers. Please keep only one before checking out.",
    };
  }, [selectedItems]);

  return {
    selectedIds,
    selectedItems,
    selectedCount: selectedIds.size,
    toggleSelect,
    selectAll,
    clearSelection,
    isSelected,
    conflict,
  };
}
