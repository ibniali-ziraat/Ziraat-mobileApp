// components/layout/ContentContainer.tsx
import { View } from "react-native";

export default function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ paddingHorizontal: 15 }}>
      {children}
    </View>
  );
}
