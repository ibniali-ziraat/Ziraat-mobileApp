import CsText from "@/src/components/shared/CsText";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { View } from "react-native";

type ObservationCardProps = {
  title: string;
  description: string;
  recommended?: string;
};

const ObservationCard = ({
  title,
  description,
  recommended,
}: ObservationCardProps) => {
  return (
    <ZiraatCard
      width="100%"
      paddingHorizontal={1}
      paddingVertical={1.2}
      marginBottom={1}
    >
      <View className="gap-2">
        <CsText className="text-xl font-semibold">
          {title}
       </CsText>

        <CsText className="text-neutral leading-relaxed">
          {description}
       </CsText>

        {recommended && (
          <CsText className="text-sm text-primary">
            Recommended: {recommended}
         </CsText>
        )}
      </View>
    </ZiraatCard>
  );
};

export default ObservationCard;
