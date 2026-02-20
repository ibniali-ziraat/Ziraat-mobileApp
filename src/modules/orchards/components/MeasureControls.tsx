import { Button, View } from "react-native";

export default function MeasureControls({
  unit,
  // setUnit,
  onPrimary,
  onReset,
  primaryLabel,
}) {
  console.log(unit, "iniii");

  return (
    <View className="absolute bottom-6 left-4 right-4 bg-white p-4 rounded-xl gap-2">
      {/* <Picker selectedValue={unit} onValueChange={setUnit}>
        {Object.keys(UNIT_CONVERSIONS).map((u) => (
          <Picker.Item key={u} label={u} value={u} />
        ))}
      </Picker> */}

      <Button title={primaryLabel} onPress={onPrimary} />
      <Button title="Reset" onPress={onReset} color="#666" />
    </View>
  );
}
