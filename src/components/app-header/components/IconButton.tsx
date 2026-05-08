import { colors } from "@/src/constants/colors";
import React from "react";
import { Pressable } from "react-native";

interface IconButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}

const IconButton = ({ onPress, children }: IconButtonProps) => (
  <Pressable
    onPress={onPress}
    className="p-2.5 rounded-full bg-white border"
    style={({ pressed }) => ({
      borderColor: colors.neutral,
      opacity: pressed ? 0.6 : 1,
    })}
  >
    {children}
  </Pressable>
);

export default IconButton;
