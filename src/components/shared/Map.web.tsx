import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Map({ location }: any) {
  const [Map, setMap] = useState<any>(null);

  useEffect(() => {
    if (!location) return;

    const load = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      const { MapContainer, TileLayer, Marker } = await import("react-leaflet");

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      });

      const MapComponent = () => (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.latitude, location.longitude]} />
        </MapContainer>
      );

      setMap(() => MapComponent);
    };

    load();
  }, [location]);

  if (!location) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Waiting for location…</Text>
      </View>
    );
  }

  if (!Map) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading map…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Map />
    </View>
  );
}
