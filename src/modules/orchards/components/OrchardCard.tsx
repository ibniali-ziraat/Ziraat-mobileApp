import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { router } from "expo-router";
import OrchardDetails from "./OrchardDetails";

interface OrchardCardProps {
  orchard: any;
}

export default function OrchardCard({ orchard }: OrchardCardProps) {
  return (
    <ZiraatCard
      width="100%"
      marginBottom={2}
      onPress={() =>
        router.push({
          pathname: "/orchards/orchard-detail",
          params: { id: orchard.id },
        })
      }
    >
      <OrchardDetails orchard={orchard} />
    </ZiraatCard>
  );
}
