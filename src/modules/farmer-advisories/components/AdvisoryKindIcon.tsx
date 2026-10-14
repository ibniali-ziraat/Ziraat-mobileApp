import { getAdvisoryKindArt } from "@/src/constants/iconArt";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

type AdvisoryKindIconProps = {
  kind: string;
  size?: number;
};

export default function AdvisoryKindIcon({ kind, size = 44 }: AdvisoryKindIconProps) {
  const { art, tile } = getAdvisoryKindArt(kind);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        borderCurve: "continuous",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: tile,
      }}
    >
      <SvgXml xml={art} width={size * 0.66} height={size * 0.66} />
    </View>
  );
}
