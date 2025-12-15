import { View, Text, Image } from "react-native";
import ZiraatCard from "./shared/ZiraatProfileCard";
import { Moon } from "lucide-react-native";

type Props = {
    phase?: string;
    illumination?: number;
    nextRise?: string;
    nextFullMoon?: string;
};

export function MoonCard({
    phase = "GIBBEUSE DÉCROISSANTE",
    illumination = 90,
    nextRise = "00:57",
    nextFullMoon = "26 j",
}: Props) {
    return (
        <ZiraatCard
            width="100%"
            height="9%"
            paddingHorizontal={1}
            paddingVertical={1}
            marginBottom={1}
            className="justify-between"
        >
            <View className="flex-row items-center">
                <Moon size={16} color="#9CA3AF" />
                <Text className="ml-2 text-xs font-bold tracking-wide text-neutral-400 uppercase">
                    {phase}
                </Text>
            </View>

            <View className="flex-row justify-between items-center mt-2">
                <View className="flex-1 pr-3">
                    <InfoRow label="Illumination" value={`${illumination} %`} />
                    <Divider />
                    <InfoRow label="Prochain lever" value={nextRise} />
                    <Divider />
                    <InfoRow label="Prochaine pleine lune" value={nextFullMoon} />
                </View>

                <Image
                    source={{
                        uri: "https://images.pexels.com/photos/30243836/pexels-photo-30243836.jpeg",
                    }}
                    className="w-28 h-28 rounded-full"
                />
            </View>
        </ZiraatCard>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <View className="flex-row justify-between py-2">
            <Text className="text-sm text-neutral-400">{label}</Text>
            <Text className="text-sm text-neutral-300 font-medium">{value}</Text>
        </View>
    );
}

function Divider() {
    return <View className="h-px bg-white/10" />;
}
