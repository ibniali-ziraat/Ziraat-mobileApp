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
import { useTapMeasurement } from "../hooks/useTapMeasurement";

export default function MeasureByTap() {
  const location = useLocationPermission();
  const { points, addPoint, reset } = useTapMeasurement();
  const [unit, setUnit] = useState("hectares");

  const areaHectares = useAreaCalculation(points);

  if (!location) return null;

  const displayArea = (areaHectares * UNIT_CONVERSIONS[unit]).toFixed(3);

  const marlas = areaHectares * UNIT_CONVERSIONS.marla;

  const applyArea = () => {
    if (!areaHectares) return;

    router.push({
      pathname: "/orchards/basic-info",
      params: {
        orchardSize: marlas.toFixed(2), // ALWAYS marla
        areaValue: displayArea,
        areaUnit: unit,
        areaLabel: `${displayArea} ${unit}`,
      },
    });
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
      <MeasureMap
        location={location}
        points={points}
        onTap={(e) => addPoint(e.nativeEvent.coordinate)}
      />
      <AreaBadge value={displayArea} unit={unit} />
      <MeasureControls
        unit={unit}
        setUnit={setUnit}
        onPrimary={applyArea}
        onReset={reset}
        primaryLabel="Apply Area"
      />
    </>
  );
}
