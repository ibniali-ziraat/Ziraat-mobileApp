import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MeasureMap from "./MeasureMap";

type Coordinate = {
  latitude: number;
  longitude: number;
};

type OrchardLocationPickerProps = {
  coordinate: Coordinate | null;
  loading?: boolean;
  error?: string | null;
  onSelect: (coordinate: Coordinate) => void;
  onRetry?: () => void;
};

export default function OrchardLocationPicker({
  coordinate,
  loading,
  error,
  onSelect,
  onRetry,
}: OrchardLocationPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={[typography.Poppins_m_semibold, styles.title]}>
        Orchard Location
      </Text>
      <Text style={[typography.Poppins_xs_regular, styles.hint]}>
        Tap the map to move the orchard marker. If you do not tap, your current
        location will be used.
      </Text>

      <View style={styles.mapContainer}>
        {coordinate ? (
          <MeasureMap
            location={coordinate}
            points={[coordinate]}
            onTap={(event: any) => onSelect(event.nativeEvent.coordinate)}
          />
        ) : (
          <View style={styles.stateContainer}>
            {loading ? (
              <>
                <ActivityIndicator color={colors.primary} />
                <Text style={styles.stateText}>Finding your location…</Text>
              </>
            ) : (
              <>
                <Text style={styles.errorText}>
                  {error || "Unable to determine your current location."}
                </Text>
                {onRetry ? (
                  <Pressable style={styles.retryButton} onPress={onRetry}>
                    <Text style={styles.retryText}>Try again</Text>
                  </Pressable>
                ) : null}
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 18 },
  title: { color: colors.dark, marginBottom: 4 },
  hint: { color: colors.neutral, lineHeight: 18, marginBottom: 10 },
  mapContainer: {
    height: 260,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 16,
    backgroundColor: "#F3F4F1",
  },
  stateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 10,
  },
  stateText: { color: colors.dark },
  errorText: { color: colors.error, textAlign: "center" },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.primary,
  },
  retryText: { color: colors.light, fontWeight: "600" },
});
