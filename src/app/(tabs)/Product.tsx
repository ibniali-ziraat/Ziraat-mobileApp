import AnimatedScreen from "@/src/components/shared/wrappers/animationWraper";
import ProductScreen from "@/src/modules/products/ProductScreen";
export default function Product() {
  return (
    <AnimatedScreen animation="slideRight">
      <ProductScreen />
    </AnimatedScreen>
  );
}
