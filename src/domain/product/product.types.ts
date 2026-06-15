export type NormalizedProduct = {
  _id: string;
  title: string;
  price: number;
  discountPrice: number | null;
  rating: number;
  photos: string[];
  inStock: boolean;
  label?: string | null;

  category?: string | null;
  description?: string | string[] | null;
  dosage?: string | null;
  packaging?: any[] | null;
  tag?: string | null;
  vendorId?: number | null;
  vendorProductId?: number | null;
  vendorName?: string;
};
