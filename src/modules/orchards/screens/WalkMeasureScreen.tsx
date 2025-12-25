import BackHeader from "@/src/components/shared/BackHeader";
import { hectaresToMarlas } from "@/src/utils/areaConversion";
import { router } from "expo-router";
import { useState } from "react";
import AreaBadge from "../components/AreaBadge";
import MeasureControls from "../components/MeasureControls";
import MeasureMap from "../components/MeasureMap";
import { useAreaCalculation } from "../hooks/useAreaCalculation";
import { useLocationPermission } from "../hooks/useLocationPermission";
import { useWalkMeasurement } from "../hooks/useWalkMeasurement";

export default function WalkMeasureScreen() {
  const location = useLocationPermission();
  const { path, start, stop, reset } = useWalkMeasurement();
  const [unit, setUnit] = useState("hectares");
  const [walking, setWalking] = useState(false);

  const area = useAreaCalculation(path, unit);

  if (!location) return null;

  const handlePrimary = () => {
    if (walking) {
      stop();

      const marlas = unit === "hectares" ? hectaresToMarlas(area) : area;

      router.push({
        pathname: "/orchards/add",
        params: { orchardSize: marlas.toFixed(2) },
      });
    } else {
      start();
    }
    setWalking(!walking);
  };

  return (
    <>
      <BackHeader title="Back" />

      <MeasureMap location={location} points={path} isWalking />
      <AreaBadge value={area} unit={unit} />
      <MeasureControls
        unit={unit}
        setUnit={setUnit}
        onPrimary={handlePrimary}
        onReset={reset}
        primaryLabel={walking ? "Stop & Apply" : "Start Walking"}
      />
    </>
  );
}
