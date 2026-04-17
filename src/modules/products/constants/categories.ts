import { CookingPotIcon, Layers2, LayoutGrid, Sofa } from "lucide-react-native";
import { Category } from "../types/productlist.types";

export const PRODUCT_CATEGORIES: Category[] = [
  { label: "All", icon: LayoutGrid },
  { label: "Furniture", icon: Sofa },
  { label: "Carpets", icon: Layers2 },
  { label: "Utensils", icon: CookingPotIcon },
];
