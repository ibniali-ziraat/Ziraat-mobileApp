import { useState } from "react";
import { ScrollView, View } from "react-native";

import ScreenLayout from "@/src/components/shared/ScreenLayout";
import OffersTabs from "@/src/modules/vendor/components/offers/OffersTabs";
import PlatformOfferList from "@/src/modules/vendor/components/offers/PlatformOfferList";
import VendorOfferList from "@/src/modules/vendor/components/offers/VendorOfferList";

export default function OffersScreen() {
  const [tab, setTab] = useState("vendor");

  return (
    <ScreenLayout>

      

      {/* TABS */}
      <View className="">
        <OffersTabs tab={tab} setTab={setTab} />
      </View>

      {/* LIST */}
      <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
        {tab === "vendor" ? <VendorOfferList /> : <PlatformOfferList />}
      </ScrollView>
    </ScreenLayout>
  );
}
