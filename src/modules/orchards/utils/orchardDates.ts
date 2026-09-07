export type OrchardDateSource = {
  id?: string | number;
  createdAt?: string;
  createdOn?: string;
  createdDate?: string;
};

export function getOrchardCreatedTimestamp(orchard: OrchardDateSource): number {
  const createdValue =
    orchard.createdAt ?? orchard.createdOn ?? orchard.createdDate;
  const timestamp = createdValue ? new Date(createdValue).getTime() : NaN;

  if (Number.isFinite(timestamp)) return timestamp;

  const numericId = Number(orchard.id);
  return Number.isFinite(numericId) ? numericId : 0;
}

export function getOrchardCreatedDate(orchard: OrchardDateSource): Date | null {
  const createdValue =
    orchard.createdAt ?? orchard.createdOn ?? orchard.createdDate;
  if (!createdValue) return null;

  const date = new Date(createdValue);
  return Number.isNaN(date.getTime()) ? null : date;
}
