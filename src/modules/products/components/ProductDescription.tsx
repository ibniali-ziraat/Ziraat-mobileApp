import { cardTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { menuArt, pageArt } from "@/src/constants/iconArt";
import { Text } from "react-native";
import { stripHtml } from "../utils/stripHtml";
import DetailSection from "./DetailSection";

const body = [
  typography.Poppins_s_regular,
  { color: cardTokens.inkSecondary, fontSize: 13.5, lineHeight: 22 },
];

export default function ProductDescription({ product }: any) {
  return (
    <>
      {product.shortDescription ? (
        <DetailSection title="Overview" art={pageArt.terms}>
          <Text style={body}>{stripHtml(product.shortDescription)}</Text>
        </DetailSection>
      ) : null}

      {product.description ? (
        <DetailSection title="Product description" art={menuArt.page}>
          <Text style={body}>{stripHtml(product.description)}</Text>
        </DetailSection>
      ) : null}
    </>
  );
}
