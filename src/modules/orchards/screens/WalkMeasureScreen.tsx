import BackHeader from "@/src/components/shared/BackHeader";
import { UNIT_CONVERSIONS } from "@/src/utils/units";
import { router } from "expo-router";
import { useState } from "react";
import { Platform, Text, View } from "react-native";
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
  if (!location) return null;

  const areaHectares = useAreaCalculation(path, unit);

  const displayArea = (areaHectares * UNIT_CONVERSIONS[unit]).toFixed(3);
  const marlas = areaHectares * UNIT_CONVERSIONS.marla;

  const handlePrimary = () => {
    if (!areaHectares) return;

    if (walking) {
      stop();
      router.push({
        pathname: "/orchards/basic-info",
        params: {
          orchardSize: marlas.toFixed(2),
          areaValue: displayArea,
          areaUnit: unit,
          areaLabel: `${displayArea} ${unit}`,
        },
      });
    } else {
      start();
    }
    setWalking(!walking);
  };

  if (Platform.OS === "web") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text>Map is only available on iOS and Android</Text>
      </View>
    );
  }

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
