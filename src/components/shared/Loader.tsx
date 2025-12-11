import { colors } from "@/src/constants/colors";
import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function Loader() {
    return (
        <View className="w-full h-full flex items-center justify-center" style={{ backgroundColor: colors.light }}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
}
