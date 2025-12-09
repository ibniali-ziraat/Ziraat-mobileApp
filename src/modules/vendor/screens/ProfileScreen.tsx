import BottomModal from "@/src/components/shared/BottomModal";
import DocumentCard from "@/src/components/shared/DocumentCard";
import OverviewCard from "@/src/components/shared/OverviewCard";
import TabBar from "@/src/components/shared/TabBar";
import TeamCard from "@/src/components/shared/TeamCard";
import WarehouseCard from "@/src/components/shared/WarehouseCard";
import { useState } from "react";
import { Modal, ScrollView } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const TABS = ["overview", "documents", "team", "warehouse"];

export default function ProfileScreen() {
  const [tab, setTab] = useState("overview");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white ">
      

      {/* TABS */}
      <TabBar tabs={TABS} activeTab={tab} onChange={setTab} />

      <ScrollView >
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
    </SafeAreaView>
  );
}
