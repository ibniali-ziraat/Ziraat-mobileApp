import BackHeader from "@/src/components/shared/BackHeader";
import { ROUTES } from "@/src/constants/routes";
import { UNIT_CONVERSIONS } from "@/src/utils/units";
import { router } from "expo-router";
import { useState } from "react";
import { Platform, Text, View } from "react-native";
import MeasureControls from "../components/MeasureControls";
import MeasureLocationState from "../components/MeasureLocationState";
import MeasureMap from "../components/MeasureMap";
import { useAreaCalculation } from "../hooks/useAreaCalculation";
import { useLocationPermission } from "../hooks/useLocationPermission";
import { setMeasuredArea, toKanalsAndMarlas } from "../utils/measuredArea";
import { useWalkMeasurement } from "../hooks/useWalkMeasurement";

export default function MeasureByWalk() {
  const { location, status } = useLocationPermission();
  const { path, start, stop, reset } = useWalkMeasurement();

  const [started, setStarted] = useState(false);

  const areaHectares = useAreaCalculation(path);

  if (!location) {
    return <MeasureLocationState status={status} title="Back" />;
  }

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

    // hand the result to the Basic Info form underneath and return to it —
    // pushing the form again would open a second, empty copy
    setMeasuredArea(toKanalsAndMarlas(allUnits.marlas));

    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(ROUTES.ORCHARDS.REGISTRATION.BASIC_INFO);
    }
  };

  if (Platform.OS === "web") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Map is only available on iOS and Android</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 18 }}>
      <BackHeader title="Back" />

      <MeasureMap location={location} points={path} isWalking={started} />

      <MeasureControls
        onPrimary={started ? applyArea : handleStart}
        onReset={reset}
        primaryLabel={started ? "Apply Area" : "Start Walking"}
      />
    </View>
  );
}
