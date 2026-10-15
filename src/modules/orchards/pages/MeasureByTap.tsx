import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { ROUTES } from "@/src/constants/routes";
import { UNIT_CONVERSIONS } from "@/src/utils/units";
import { router } from "expo-router";
import { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MeasureControls from "../components/MeasureControls";
import MeasureLocationState from "../components/MeasureLocationState";
import MeasureMap from "../components/MeasureMap";
import { useAreaCalculation } from "../hooks/useAreaCalculation";
import { useLocationPermission } from "../hooks/useLocationPermission";
import { setMeasuredArea, toKanalsAndMarlas } from "../utils/measuredArea";
import { useTapMeasurement } from "../hooks/useTapMeasurement";

export default function MeasureByTap() {
  const { location, status } = useLocationPermission();
  const { points, addPoint, reset } = useTapMeasurement();
  const [unit, setUnit] = useState("hectares");

  const areaHectares = useAreaCalculation(points);

  if (!location) {
    return <MeasureLocationState status={status} title="Measure Area" />;
  }

  const allUnits = {
    kanals: areaHectares * UNIT_CONVERSIONS.kanals,
    marlas: areaHectares * UNIT_CONVERSIONS.marlas,
  };

  const applyArea = () => {
    if (!areaHectares) return;

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
      <View style={styles.webContainer}>
        <Text style={styles.webText}>
          Map is only available on iOS and Android
        </Text>
      </View>
    );
  }

  return (
    <ScreenLayout>
      <BackHeader title="Measure Area" />
      <View style={styles.areaCard}>
        <Text style={styles.areaLabel}>Measured Area</Text>

        <View style={styles.areaGrid}>
          <View style={styles.areaBox}>
            <Text style={styles.areaValue}>{allUnits.kanals.toFixed(2)}</Text>
            <Text style={styles.areaUnit}>Kanals</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.areaBox}>
            <Text style={styles.areaValue}>{allUnits.marlas.toFixed(2)}</Text>
            <Text style={styles.areaUnit}>Marlas</Text>
          </View>
        </View>

        {points.length === 0 && (
          <Text style={styles.hint}>Tap on map to start measuring</Text>
        )}
      </View>

      <MeasureMap
        location={location}
        points={points}
        onTap={(e) => addPoint(e.nativeEvent.coordinate)}
      />

      <View style={styles.controlsContainer}>
        <MeasureControls
          unit={unit}
          onPrimary={applyArea}
          onReset={reset}
          primaryLabel="Apply Area"
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  webText: {
    fontSize: 17,
    color: "#666",
  },

  areaGrid: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },

  areaBox: {
    flex: 1,
    alignItems: "center",
  },

  divider: {
    width: 1,
    height: 32,
    backgroundColor: "#e5e7eb",
  },

  areaValue: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  areaUnit: {
    fontSize: 15,
    color: "#6b7280",
    marginTop: 2,
  },

  areaCard: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    alignItems: "center",

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  areaLabel: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 4,
  },

  areaRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  areaValue: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  areaUnit: {
    fontSize: 17,
    color: "#6b7280",
    marginLeft: 6,
    marginBottom: 4,
  },

  hint: {
    marginTop: 4,
    fontSize: 14,
    color: "#9ca3af",
  },

  mapContainer: {
    flex: 1,
    marginHorizontal: 12,
    borderRadius: 16,
    overflow: "hidden",
  },

  controlsContainer: {
    height: 84,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,

    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
  },
});
