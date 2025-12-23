import { Droplets } from "lucide-react-native";
import { View } from "react-native";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    value: number;
    note: string;
};

export default function HumidityCard({ value, note }: Props) {
    return (
        <ZiraatCard
            width="48%"
            paddingHorizontal={1.4}
            paddingVertical={1.7}
        >

            <View className="flex-row items-center mb-2">
                <Droplets size={18} color="#c7611f" />
                <CsText className="ml-2 text-md font-semibold tracking-wide text-dark">
                    HUMIDITY
               </CsText>
            </View>


            <CsText className="text-3xl font-bold text-dark">
                {value} 89%
           </CsText>


            <CsText className="mt-2 text-sm leading-5 text-dark">
                {note} "The dew point is 13° right now.




           </CsText>
        </ZiraatCard>
    );
}
