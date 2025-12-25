import { Moon } from "lucide-react-native";
import { Image, View } from "react-native";
import CsText from "./shared/CsText";
import ZiraatCard from "./shared/ZiraatProfileCard";

type Props = {
  phase?: string;
  illumination?: number;
  nextRise?: string;
  nextFullMoon?: string;
};

export function MoonCard({
  phase = "Waxing Cresent",
  illumination = 90,
  nextRise = "6:50",
  nextFullMoon = "17 days",
}: Props) {
  return (
    <ZiraatCard
      width="100%"
      paddingHorizontal={1}
      paddingVertical={1}
      marginBottom={1}
      className="justify-between"
    >
      <View className="flex-row items-center">
        <Moon size={18} color="#c7611f" />
        <CsText className="ml-2 text-sm font-bold tracking-wide text-neutral-400 uppercase">
          {phase}
       </CsText>
      </View>

      <View className="flex-row justify-between items-center mt-2">
        <View className="flex-1 pr-3">
          <InfoRow label="Illumination" value={`${illumination}%`} />
          <Divider />
          <InfoRow label="Next Moonrise" value={nextRise} />
          <Divider />
          <InfoRow label="Next Full Moon" value={nextFullMoon} />
        </View>

        <View className=" w-28 h-28 rounded-full">
          <Image
            source={require("../../assets/images/moon.png")}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </View>
    </ZiraatCard>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-2">
      <CsText className="text-sm text-neutral-400">{label}</CsText>
      <CsText className="text-sm text-neutral-300 font-medium">{value}</CsText>
    </View>
  );
}

function Divider() {
  return <View className="h-px bg-dark" />;
}
