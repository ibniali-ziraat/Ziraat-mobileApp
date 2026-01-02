import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { orchardImagesById } from "@/src/data/orchardImages";
import { router } from "expo-router";
import OrchardDetails from "./OrchardDetails";
import OrchardImage from "./OrchardImage";

interface OrchardCardProps {
  orchard: any;
}

export default function OrchardCard({ orchard }: OrchardCardProps) {
  const imageSource = orchardImagesById[String(orchard.id)];

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
      <OrchardImage source={imageSource} />
      <OrchardDetails orchard={orchard} />
    </ZiraatCard>
  );
}
