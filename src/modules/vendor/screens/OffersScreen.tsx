import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import OffersTabs from "@/src/modules/vendor/components/offers/OffersTabs";
import PlatformOfferList from "@/src/modules/vendor/components/offers/PlatformOfferList";
import VendorOfferList from "@/src/modules/vendor/components/offers/VendorOfferList";

export default function OffersScreen() {
  const [tab, setTab] = useState("vendor");

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* HEADER */}
      <View className="px-4 ">
        <Text className="text-[22px] font-bold text-black">Offers</Text>
        <Text className="text-[12px] text-gray-600 mt-[2px]">
          Manage running & platform offers
        </Text>
      </View>

      {/* TABS */}
      <View className="px-4 mt-4">
        <OffersTabs tab={tab} setTab={setTab} />
      </View>

      {/* LIST */}
      <ScrollView className="px-4 mt-3" showsVerticalScrollIndicator={false}>
        {tab === "vendor" ? <VendorOfferList /> : <PlatformOfferList />}
      </ScrollView>
    </SafeAreaView>
  );
}
