import HtmlContent from "@/src/components/shared/HtmlContent";
import { menuArt, pageArt } from "@/src/constants/iconArt";
import DetailSection from "./DetailSection";

export default function ProductDescription({ product }: any) {
  return (
    <>
      {product.shortDescription ? (
        <DetailSection title="Overview" art={pageArt.terms}>
          <HtmlContent html={product.shortDescription} />
        </DetailSection>
      ) : null}

      {product.description ? (
        <DetailSection title="Product description" art={menuArt.page}>
          <HtmlContent html={product.description} />
        </DetailSection>
      ) : null}
    </>
  );
}
