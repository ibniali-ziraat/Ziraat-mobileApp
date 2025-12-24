import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import { getAreaOfPolygon } from "geolib";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import MapView, { Polygon, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import BackHeader from "../components/shared/BackHeader";

const UNIT_CONVERSIONS = {
  hectares: 1,
  acres: 2.47105,
  marla: 247.105,
  kanal: 49.421,
  "square meters": 10000,
};

export default function WalkMeasureDeepZoom() {
  const [location, setLocation] = useState(null);
  const [path, setPath] = useState([]);
  const [watcher, setWatcher] = useState(null);
  const [walking, setWalking] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("hectares");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Location permission denied");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const startWalking = async () => {
    setPath([]);
    const locWatcher = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000, //update position every 1 second
        distanceInterval: 1, //update position every 1 meter
      },
      (loc) => {
        setPath((prev) => [...prev, loc.coords]);
      }
    );
    setWatcher(locWatcher);
    setWalking(true);
  };

  const stopWalking = () => {
    if (watcher) watcher.remove();
    setWalking(false);
  };

  const reset = () => {
    if (watcher) watcher.remove();
    setWatcher(null);
    setPath([]);
    setWalking(false);
  };

  const calculateArea = () => {
    if (path.length < 3) return 0;
    const closedPath = [...path, path[0]]; //By adding path[0] to the end of the array, you're effectively closing the polygon by repeating the first point at the end. This ensures that the shape you're working with is closed.
    const areaSqMeters = getAreaOfPolygon(
      closedPath.map((p) => ({ latitude: p.latitude, longitude: p.longitude }))
    );
    const areaHectares = areaSqMeters / 10000;
    const conversionRate = UNIT_CONVERSIONS[selectedUnit] || 1;
    return (areaHectares * conversionRate).toFixed(3);
  };

  if (!location) return <Text>Loading map and location...</Text>;

  return (
    <View style={styles.container}>
      <BackHeader />

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType="satellite"
        showsUserLocation
        zoomEnabled
        minZoomLevel={0}
        maxZoomLevel={21}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0008,
          longitudeDelta: 0.0008,
        }}
      >
        {path.length > 0 && (
          <>
            <Polyline coordinates={path} strokeColor="#00f" strokeWidth={4} />
            {path.length >= 3 && (
              <Polygon
                coordinates={[...path, path[0]]}
                fillColor="rgba(0,255,0,0.3)"
                strokeColor="#008000"
                strokeWidth={2}
              />
            )}
            {/* <Marker coordinate={path[0]} title="Start" pinColor="green" /> */}
          </>
        )}
      </MapView>

      <View style={styles.infoPanel}>
        <Text style={styles.label}>
          Area: {calculateArea()} {selectedUnit}
        </Text>

        <Picker
          selectedValue={selectedUnit}
          onValueChange={(itemValue) => setSelectedUnit(itemValue)}
          style={styles.picker}
        >
          {Object.keys(UNIT_CONVERSIONS).map((unit) => (
            <Picker.Item label={unit} value={unit} key={unit} />
          ))}
        </Picker>

        <View style={styles.buttonRow}>
          <Button
            title={walking ? "Stop" : "Start Walking"}
            onPress={walking ? stopWalking : startWalking}
            color={walking ? "#e53935" : "#43a047"}
          />
          <Button title="Reset" onPress={reset} color="#555" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  infoPanel: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  picker: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 10,
  },
});
