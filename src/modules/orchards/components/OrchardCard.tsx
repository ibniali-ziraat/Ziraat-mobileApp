
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import OrchardDetails from "./OrchardDetails";

interface OrchardCardProps {
  orchard: any;
}

export default function OrchardCard({ orchard }: OrchardCardProps) {
  return (
    <ScreenContent>
      <View className="mb-3">
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/orchards/orchard-detail",
              params: { id: orchard.id },
            })
          }
          className="active:opacity-90"
        >
          <ZiraatCard
            width="100%"
            marginBottom={2}
           
           
          
          >
            <OrchardDetails orchard={orchard} />
          </ZiraatCard>
        </Pressable>
      </View>
    </ScreenContent>
  );
}

