import { Thermometer } from "lucide-react-native";
import { View } from "react-native";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    temp: number;
};

export default function FeelsLikeCard({ temp }: Props) {
    return (
        <ZiraatCard
            width="48%"
            // height="15%"
            marginVertical={1}
            paddingHorizontal={1}
            paddingVertical={1}

        >
            <View className="flex-row items-center mb-2">
                <Thermometer size={18} color="#c7611f" />
                <CsText className="ml-2 text-sm font-semibold tracking-wide text-dark">
                    Feels Like
               </CsText>
            </View>


            <CsText className="mt-1 text-3xl font-bold text-dark">
                {temp}°
           </CsText>
            <CsText className="mt-1 text-sm  text-dark">
                use sun protection as a weather becomes day.
           </CsText>


            <CsText className="mt-1 text-sm leading-5 text-dark">
                Similar to the actual temperature.
           </CsText>
        </ZiraatCard>
    );
}
