import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { View } from "react-native";
import DiscussionSection from "../components/DiscussionSection";

export default function DiscussionScreen() {
  return (
    <ScreenLayout scrollable={false}>
      
   
      <BackHeader
        title="Discussion"
       
      />

    
      <View style={{ flex: 1 }}>
        <DiscussionSection />
      </View>

    </ScreenLayout>
  );
}