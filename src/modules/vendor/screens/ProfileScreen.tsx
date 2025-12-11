import BottomModal from "@/src/components/shared/BottomModal";
import DocumentCard from "@/src/components/shared/DocumentCard";
import OverviewCard from "@/src/components/shared/OverviewCard";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import TabBar from "@/src/components/shared/TabBar";
import TeamCard from "@/src/components/shared/TeamCard";
import WarehouseCard from "@/src/components/shared/WarehouseCard";
import { useState } from "react";
import { Modal, ScrollView } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const TABS = ["overview", "documents", "team", "warehouse"];

export default function ProfileScreen() {
  const [tab, setTab] = useState("overview");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenLayout >
      

      {/* TABS */}
      <TabBar tabs={TABS} activeTab={tab} onChange={setTab} />

      <ScrollView 
      showsVerticalScrollIndicator={false}
  persistentScrollbar={false}
  style={{ overflow: "hidden" }}   
     
  
>
        {tab === "overview" && (
          <Animated.View entering={FadeInUp}>
            <OverviewCard onEditPress={() => setModalVisible(true)} 
                
                />
          </Animated.View>
        )}

        {tab === "documents" && (
          <Animated.View entering={FadeInUp.delay(100)}>
            <DocumentCard />
          </Animated.View>
        )}

        {tab === "team" && (
          <Animated.View entering={FadeInUp.delay(100)}>
            <TeamCard />
          </Animated.View>
        )}

        {tab === "warehouse" && (
          <Animated.View entering={FadeInUp.delay(100)}>
            <WarehouseCard />
          </Animated.View>
        )}
      </ScrollView>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <BottomModal
          title="Edit Onboarding Status"
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </ScreenLayout>
  );
}
