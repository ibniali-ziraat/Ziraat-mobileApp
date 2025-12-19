import { ScrollView, View, useWindowDimensions } from "react-native";
import AnimatedTabContent from "../components/shared/AnimatedTabContent";
import Skeleton from "../components/shared/HomeSkelton";
import ScreenLayout from "../components/shared/ScreenLayout";

export default function UniversalSkeleton() {
  const { height } = useWindowDimensions();

  // Average block height to calculate how many rows we need
  const BLOCK_HEIGHT = 110;
  const blocks = Math.ceil(height / BLOCK_HEIGHT);

  return (
    <ScreenLayout>
      <AnimatedTabContent>
        <View className="flex-1 bg-white px-4 pt-4">
          <ScrollView showsVerticalScrollIndicator={false}>
            {Array.from({ length: blocks }).map((_, index) => (
              <View key={index} className="mb-6">
                {/* Section title */}
                <Skeleton width={180} height={18} className="mb-3" />

                {/* Content card */}
                <Skeleton height={90} borderRadius={16} />
              </View>
            ))}
          </ScrollView>
        </View>
      </AnimatedTabContent>
    </ScreenLayout>
  );
}
