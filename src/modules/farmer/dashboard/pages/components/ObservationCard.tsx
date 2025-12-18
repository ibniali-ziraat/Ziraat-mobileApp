import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { Text, View } from "react-native";

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
        <Text className="text-xl font-semibold">
          {title}
        </Text>

        <Text className="text-neutral leading-relaxed">
          {description}
        </Text>

        {recommended && (
          <Text className="text-sm text-primary">
            Recommended: {recommended}
          </Text>
        )}
      </View>
    </ZiraatCard>
  );
};

export default ObservationCard;
