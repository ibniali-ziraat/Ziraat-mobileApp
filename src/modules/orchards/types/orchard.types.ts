export type ID = string | number;

/* ---------- Base ---------- */
export interface BaseEntity {
  id: ID;
  orchardId?: ID;
}

/* ---------- Orchard ---------- */
export interface Orchard extends BaseEntity {
  name: string;
  location: string;
  area: number;
  userId: ID;
}

export type CreateOrchardDTO = Omit<Orchard, "id">;
export type UpdateOrchardDTO = Partial<Orchard> & { id: ID };

/* ---------- Generic Child ---------- */
export type CreateChildDTO<T> = Omit<T, "id">;
export type UpdateChildDTO<T> = Partial<T> & { id: ID };
