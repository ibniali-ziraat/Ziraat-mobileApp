import { View } from "react-native";
import { vendorOffers } from "./MockOffer";
import OfferCard from "./OfferCard";

export default function VendorOfferList() {
  return (
    <View>
      {vendorOffers.map((item, index) => (
        <OfferCard key={index} item={item} type="vendor" />
      ))}

     
    </View>
  );
}
