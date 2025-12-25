import { Droplets } from "lucide-react-native";
import { View } from "react-native";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
    amount?: string;
    note?: string;
};

export function Precipitation({
    amount = `0"`,
    note = "None expected in next 10 days.",
}: Props) {
    return (
        <ZiraatCard
            width="48%"
            paddingHorizontal={1}
            paddingVertical={1}
            className="justify-between"
        >

            <View className="flex-row items-center mb-1">
                <Droplets size={16} color="#c7611f" />
                <CsText className="ml-2 text-sm font-bold tracking-wide text-dark">
                    PRECIPITATION
                </CsText>
            </View>

            <CsText className="text-3xl font-bold text-dark">
                {amount}
            </CsText>

            <CsText className="text-sm text-dark pt-2">
                In last 24 hours
            </CsText>

            <CsText className="text-xs text-dark pt-2">
                {note}
            </CsText>
        </ZiraatCard >
    );
}
