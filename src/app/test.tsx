import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import { getAreaOfPolygon } from "geolib";
import { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from "react-native-maps";
import BackHeader from "../components/shared/BackHeader";

const UNIT_CONVERSIONS = {
  hectares: 1,
  acres: 2.47105,
  marla: 247.105,
  kanal: 12.3553,
  "square meters": 10000,
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [pins, setPins] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("hectares");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);
  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    if (
      pins.some(
        (pin) => pin.latitude === latitude && pin.longitude === longitude
      )
    ) {
      return;
    }
    setPins([...pins, { latitude, longitude }]);
  };

  const onDragMarker = (index, e) => {
    const newPins = [...pins];
    newPins[index] = e.nativeEvent.coordinate;
    setPins(newPins);
  };

  const calculateArea = () => {
    if (pins.length < 3) return 0;
    const areaHectares =
      getAreaOfPolygon(
        pins.map((p) => ({ latitude: p.latitude, longitude: p.longitude }))
      ) / 10000;
    const conversionRate = UNIT_CONVERSIONS[selectedUnit];
    return (areaHectares * conversionRate).toFixed(3);
  };

  const resetPins = () => setPins([]);

  if (!location) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <BackHeader />
      <MapView
        style={styles.map}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
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
        onPress={handleMapPress}
      >
        {pins.map((pin, index) => (
          <Marker
            key={index}
            coordinate={pin}
            draggable
            onDragEnd={(e) => onDragMarker(index, e)}
            title={`Point ${index + 1}`}
          />
        ))}
        {pins.length >= 3 && (
          <Polygon coordinates={pins} fillColor="rgba(0,200,0,0.3)" />
        )}
      </MapView>
      <View style={styles.info}>
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
        <Button title="Reset" onPress={resetPins} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  info: {
    position: "absolute",
    bottom: 30,
    left: 10,
    right: 10,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 6,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    marginBottom: 10,
  },
});
