import AnimatedScreen from "@/src/components/shared/wrappers/animationWraper";
import MyOrchardsScreen from "@/src/modules/orchards/OrchardScreen";
export default function Crops() {
  return (
    <AnimatedScreen animation="slideRight">
      <MyOrchardsScreen />
    </AnimatedScreen>
  );
}
