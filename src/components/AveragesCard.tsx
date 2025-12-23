import { GitGraph } from "lucide-react-native";
import { View } from "react-native";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

export default function AveragesCard() {
    return (
        <ZiraatCard
            width="48%"
            paddingHorizontal={1}
            paddingVertical={1}
            className="border border-white"
        >
            <View className=" flex justify-center">
                <View className="flex-row items-center mb-1">
                    <GitGraph size={16} color="#c7611f"/>
                    <CsText className="ml-2 text-sm font-bold tracking-wide text-dark">
                        AVERAGES
                   </CsText>
                </View>

                <CsText className="text-3xl font-bold text-dark">
                    +1°
               </CsText>


                <CsText className=" text-xs text-dark pt-2">
                    Above average daily high.
               </CsText>
                <CsText className="text-xs text-dark pt-2">
                    Today Average --- H:15 --- H:8

               </CsText>
            </View>
        </ZiraatCard>
    );
}
