import { Platform, View } from "react-native";
import BuyNowButton from "./BuyNowButton";
import ScreenLayout from "./ScreenLayout";

export function StickyBuyBar({ onPress }) {
    return (
        <ScreenLayout
            pointerEvents="box-none"
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100,
            }}
        >
            <View
                style={{
                    padding: 14,
                    backgroundColor: "#fff",
                    ...(Platform.OS === "android"
                        ? { elevation: 12 }
                        : {
                            shadowColor: "#000",
                            shadowOpacity: 0.18,
                            shadowRadius: 12,
                            shadowOffset: { width: 0, height: -4 },
                        }),
                }}
            >
                <BuyNowButton onPress={onPress} />
            </View>
        </ScreenLayout>
    );
}
