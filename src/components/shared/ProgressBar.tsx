import { colors } from "@/src/constants/colors";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

export default function ProgressBar({ progress }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = anim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={{ marginVertical: 15 }}>
      <Text style={{ fontWeight: "600", marginBottom: 5, }}>
        Profile Completion: {progress}%
      </Text>

      <View
        style={{
          height: 10,
          backgroundColor: "#e5e7eb",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            width,
            backgroundColor: colors.primary,
          }}
        />
      </View>
    </View>
  );
}
