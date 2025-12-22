import AnimatedScreen from "@/src/components/shared/wrappers/animationWraper";
import SprayScreen from "@/src/modules/spray/spray-screen";

export default function Spray() {
  return (
    <AnimatedScreen animation="slideRight">
      <SprayScreen />
    </AnimatedScreen>
  );
}
