import { Text, View } from "react-native";

export default function TabIcon({ icon, label }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 60, // fixed width to prevent label wrapping
      }}
    >
      {icon}
      <Text
        style={{
          fontSize: 12,
          marginTop: 2,
          textAlign: "center",
        }}
        numberOfLines={1}
        ellipsizeMode="clip"
      >
        {label}
      </Text>
    </View>
  );
}
