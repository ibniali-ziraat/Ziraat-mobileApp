import BackHeader from "@/src/components/shared/BackHeader";
import { UNIT_CONVERSIONS } from "@/src/utils/units";
import { router } from "expo-router";
import { useState } from "react";
import { Platform, Text, View } from "react-native";
import MeasureControls from "../components/MeasureControls";
import MeasureMap from "../components/MeasureMap";
import { useAreaCalculation } from "../hooks/useAreaCalculation";
import { useLocationPermission } from "../hooks/useLocationPermission";
import { useWalkMeasurement } from "../hooks/useWalkMeasurement";

export default function MeasureByWalk() {
  const location = useLocationPermission();
  const { path, start, stop, reset } = useWalkMeasurement();

  const [started, setStarted] = useState(false);

  const areaHectares = useAreaCalculation(path);

  if (!location) return null;

  const allUnits = {
    kanals: areaHectares * UNIT_CONVERSIONS.kanals,
    marlas: areaHectares * UNIT_CONVERSIONS.marlas,
  };

  const handleStart = () => {
    start();
    setStarted(true);
  };

  const applyArea = () => {
    if (!areaHectares) return;

    stop();

    router.push({
      pathname: "/orchards/basic-info",
      params: {
        kanals: allUnits.kanals.toFixed(2),
        marlas: allUnits.marlas.toFixed(2),
      },
    });
  };

  if (Platform.OS === "web") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Map is only available on iOS and Android</Text>
      </View>
    );
  }

  return (
    <>
      <BackHeader title="Back" />

      <MeasureMap location={location} points={path} />

      <MeasureControls
        onPrimary={started ? applyArea : handleStart}
        onReset={reset}
        primaryLabel={started ? "Apply Area" : "Start Walking"}
      />
    </>
  );
}
