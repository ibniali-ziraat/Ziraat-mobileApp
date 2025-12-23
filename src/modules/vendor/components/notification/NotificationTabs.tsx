// components/notifications/NotificationTabs.jsx
import CsText from "@/src/components/shared/CsText";
import { Pressable, ScrollView, View } from "react-native";

export default function NotificationTabs({
  tabs,
  activeTab,
  setActiveTab,
  colors,
}) {
  return (
    <View className="mt-3 px-2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 7,
              marginRight: 10,
              borderRadius: 30,
              backgroundColor:
                activeTab === tab.key ? colors.secondaryLight : "#e5e7eb",
            }}
          >
            <CsText
              style={{
                fontSize: 12,
                fontWeight: "600",
                color:
                  activeTab === tab.key ? colors.secondary : "#4b5563",
              }}
            >
              {tab.label}
           </CsText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
