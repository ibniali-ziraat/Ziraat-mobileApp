// src/components/shared/Heading.tsx
import React from "react";
import { View, Text } from "react-native";
import { colors } from "@/src/constants/colors";

interface HeadingProps {
    title: string;
    subtitle?: string;
    titleSize?: number;      // optional, default 32
    subtitleSize?: number;   // optional, default 16
}

export default function Heading({
    title,
    subtitle,
    titleSize = 28,
    subtitleSize = 14,
}: HeadingProps) {
    return (
        <View style={{ marginBottom: 16 }}>
            <Text
                style={{
                    fontSize: titleSize,
                    color: colors.dark,
                    fontWeight: "medium",
                }}
            >
                {title}
            </Text>

            {subtitle ? (
                <Text
                    style={{
                        fontSize: subtitleSize,
                        color: colors.dark,
                        marginTop: 4,
                    }}
                >
                    {subtitle}
                </Text>
            ) : null}
        </View>
    );
}
