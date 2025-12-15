import React from "react";
import { Text, View } from "react-native";

function TabIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 100,
      }}
    >
      {icon}
      <Text
        style={{
          fontSize: 14,
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

export default React.memo(TabIcon);
