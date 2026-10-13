import { useEffect, useMemo, useRef } from "react";
import { View } from "react-native";
import { WebView, type WebViewMessageEvent } from "react-native-webview";

// Leaflet inside a WebView: no Google Maps key needed. Satellite imagery is
// Esri World Imagery (free, attribution required); OpenStreetMap is offered as
// a street-map toggle. Same onTap contract as MeasureMap.web.tsx.

const buildHtml = (lat: number, lon: number) => `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css" />
<style>
  html, body, #map { height: 100%; width: 100%; margin: 0; padding: 0; background: #e5e5e5; }
</style>
</head>
<body>
<div id="map"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"></script>
<script>
  var map = L.map('map', { zoomControl: false }).setView([${lat}, ${lon}], 18);

  var satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { maxNativeZoom: 19, maxZoom: 21, attribution: 'Tiles &copy; Esri' }
  ).addTo(map);
  var streets = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxNativeZoom: 19, maxZoom: 21, attribution: '&copy; OpenStreetMap contributors'
  });
  L.control.layers({ Satellite: satellite, Streets: streets }, null, { position: 'topright' }).addTo(map);

  // current position
  L.circleMarker([${lat}, ${lon}], {
    radius: 8, color: '#fff', weight: 2, fillColor: '#1a73e8', fillOpacity: 1
  }).addTo(map);

  var layer = L.layerGroup().addTo(map);

  function post(msg) {
    window.ReactNativeWebView.postMessage(JSON.stringify(msg));
  }

  map.on('click', function (e) {
    post({ type: 'tap', latitude: e.latlng.lat, longitude: e.latlng.lng });
  });

  // called from React Native with the full point list on every change
  window.render = function (points, isWalking) {
    layer.clearLayers();
    var latlngs = points.map(function (p) { return [p.latitude, p.longitude]; });

    if (isWalking) {
      if (latlngs.length > 1) L.polyline(latlngs, { color: '#ffd400', weight: 4 }).addTo(layer);
    } else {
      latlngs.forEach(function (ll) {
        L.circleMarker(ll, { radius: 6, color: '#fff', weight: 2, fillColor: '#e53935', fillOpacity: 1 }).addTo(layer);
      });
    }

    if (latlngs.length >= 3) {
      L.polygon(latlngs, { color: '#008000', weight: 2, fillColor: '#00c800', fillOpacity: 0.3 }).addTo(layer);
    }
  };

  post({ type: 'ready' });
</script>
</body>
</html>`;

export default function MeasureMap({
  location,
  points,
  onTap,
  isWalking,
}: any) {
  const webRef = useRef<WebView>(null);
  const ready = useRef(false);

  // location is only used for the initial view — don't rebuild the page when
  // GPS refines it, or the map would reset while the farmer is measuring
  const html = useMemo(
    () => buildHtml(location.latitude, location.longitude),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const push = () => {
    if (!ready.current) return;
    webRef.current?.injectJavaScript(
      `window.render(${JSON.stringify(points ?? [])}, ${!!isWalking}); true;`,
    );
  };

  useEffect(push, [points, isWalking]);

  const onMessage = (event: WebViewMessageEvent) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.type === "ready") {
        ready.current = true;
        push();
      } else if (msg.type === "tap" && onTap) {
        onTap({
          nativeEvent: {
            coordinate: { latitude: msg.latitude, longitude: msg.longitude },
          },
        });
      }
    } catch {
      // ignore malformed messages
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webRef}
        originWhitelist={["*"]}
        source={{ html, baseUrl: "https://localhost" }}
        onMessage={onMessage}
        javaScriptEnabled
        domStorageEnabled
        style={{ flex: 1 }}
      />
    </View>
  );
}
