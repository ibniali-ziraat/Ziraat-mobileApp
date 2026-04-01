import MapView, { Marker, Polygon, Polyline } from "react-native-maps";

export default function MeasureMap({
  location,
  points,
  onTap,
  isWalking,
}: any) {
  return (
    <MapView
      style={{ flex: 1 }}
      // provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
      mapType="satellite"
      showsUserLocation
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0008,
        longitudeDelta: 0.0008,
      }}
      onPress={onTap}
    >
      {!isWalking &&
        points.map((p: any, i: number) => <Marker key={i} coordinate={p} />)}

      {isWalking && <Polyline coordinates={points} strokeWidth={4} />}

      {points.length >= 3 && (
        <Polygon
          coordinates={points}
          fillColor="rgba(0,200,0,0.3)"
          strokeColor="#008000"
        />
      )}
    </MapView>
  );
}
