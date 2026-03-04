import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import OrchardDetails from "./OrchardDetails";

interface OrchardCardProps {
  orchard: any;
}

export default function OrchardCard({ orchard }: OrchardCardProps) {
  return (
    <ScreenContent>
      <View
        className="mb-3 rounded-xl bg-white"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 7,
          elevation: 3, 
        }}
      >
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/orchards/orchard-detail",
              params: { id: orchard.id },
            })
          }
          className="active:opacity-90"
        >
          <OrchardDetails orchard={orchard} />
        </Pressable>
      </View>
    </ScreenContent>
  );
}
