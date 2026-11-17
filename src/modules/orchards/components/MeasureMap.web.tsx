import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function MeasureMap(props: any) {
  const [LeafletMap, setLeafletMap] = useState<any>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Runs ONLY in browser
    const loadMap = async () => {
      // Expo's Metro web bundler cannot load package CSS through a dynamic
      // import. Let the browser load Leaflet's stylesheet as a stylesheet.
      if (!document.getElementById("leaflet-styles")) {
        const stylesheet = document.createElement("link");
        stylesheet.id = "leaflet-styles";
        stylesheet.rel = "stylesheet";
        stylesheet.href =
          "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(stylesheet);
      }

      const L = await import("leaflet");

      const {
        MapContainer,
        TileLayer,
        Marker,
        Polygon,
        Polyline,
        useMapEvents,
      } = await import("react-leaflet");

      // Fix marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      });

      const MapClickHandler = ({ onTap }: any) => {
        useMapEvents({
          click(e) {
            onTap({
              nativeEvent: {
                coordinate: {
                  latitude: e.latlng.lat,
                  longitude: e.latlng.lng,
                },
              },
            });
          },
        });
        return null;
      };

      const MapComponent = ({ location, points, onTap, isWalking }: any) => (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={18}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler onTap={onTap} />

          {!isWalking &&
            points.map((p: any, i: number) => (
              <Marker key={i} position={[p.latitude, p.longitude]} />
            ))}

          {isWalking && (
            <Polyline
              positions={points.map((p: any) => [p.latitude, p.longitude])}
            />
          )}

          {points.length >= 3 && (
            <Polygon
              positions={points.map((p: any) => [p.latitude, p.longitude])}
            />
          )}
        </MapContainer>
      );

      setLeafletMap(() => MapComponent);
    };

    loadMap().catch((error) => {
      console.error("Failed to load orchard map", error);
      setMapError(true);
    });
  }, []);

  if (mapError) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Could not load the map. Please refresh and try again.</Text>
      </View>
    );
  }

  if (!LeafletMap) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading map…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <LeafletMap {...props} />
    </View>
  );
}
