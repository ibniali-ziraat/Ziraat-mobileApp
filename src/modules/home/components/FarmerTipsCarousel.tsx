import {
  cardShadow,
  cardTokens,
  chartTokens,
} from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { getTipArt, homeArt, tipTint } from "@/src/constants/iconArt";
import { AlertTriangle } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Text,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import type { FarmerDashboardTip } from "../types/farmerDashboard";
import { getTipPresentation } from "../utils/tipPresentation";

type FarmerTipsCarouselProps = {
  tips?: FarmerDashboardTip[];
};

const SCREEN_PADDING = 15;
const CARD_GAP = 12;
const PEEK = 34;
const CARD_WIDTH = Dimensions.get("window").width - SCREEN_PADDING * 2 - PEEK;
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;
/**
 * Room for the card shadow to fall outside the cards themselves. A horizontal
 * list clips at its own bounds, so without this the shadow is sliced off flat
 * along the top, bottom and left edges.
 */
const SHADOW_ROOM = 22;

export default function FarmerTipsCarousel({
  tips = [],
}: FarmerTipsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<FarmerDashboardTip>>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SNAP_INTERVAL);
    setActiveIndex(Math.max(0, Math.min(index, tips.length - 1)));
  };

  if (tips.length === 0) {
    return (
      <View
        style={[
          {
            backgroundColor: cardTokens.surface,
            borderRadius: cardTokens.radius,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: cardTokens.border,
            paddingVertical: 22,
            paddingHorizontal: 18,
            alignItems: "center",
          },
          cardShadow,
        ]}
      >
        <SvgXml xml={homeArt.tipsEmpty} width={112} height={112} />
        <Text
          style={[
            typography.Poppins_s_semibold,
            {
              color: cardTokens.inkPrimary,
              fontSize: 15.5,
              marginTop: 10,
              textAlign: "center",
            },
          ]}
        >
          Fresh tips are on the way
        </Text>
        <Text
          style={[
            typography.Poppins_xs_regular,
            { color: cardTokens.inkMuted, textAlign: "center", marginTop: 4 },
          ]}
        >
          Seasonal tips will appear here once your advisory syncs.
        </Text>
      </View>
    );
  }

  return (
    <View>
      {/* Bled to the screen edges and padded back in: the padding gives the
          shadow somewhere to land, the negative margin keeps the block the
          same size it was. */}
      <View
        style={{
          marginHorizontal: -SCREEN_PADDING,
          marginVertical: -SHADOW_ROOM,
        }}
      >
        <FlatList
        ref={listRef}
        data={tips}
        keyExtractor={(tip) => tip.code}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          gap: CARD_GAP,
          paddingVertical: SHADOW_ROOM,
          paddingLeft: SCREEN_PADDING,
          paddingRight: SCREEN_PADDING + PEEK,
        }}
        renderItem={({ item }) => {
          const { description, warning } = getTipPresentation(item);

          return (
            <View
              style={[
                {
                  width: CARD_WIDTH,
                  minHeight: 172,
                  backgroundColor: tipTint[item.code] ?? tipTint.default,
                  borderRadius: 22,
                  borderCurve: "continuous",
                  borderWidth: 1,
                  borderColor: cardTokens.hairline,
                  padding: 18,
                },
                cardShadow,
              ]}
            >
              <SvgXml xml={getTipArt(item.code)} width={66} height={66} />

              <Text
                style={[
                  typography.Poppins_s_semibold,
                  {
                    color: cardTokens.inkPrimary,
                    fontSize: 16,
                    marginTop: 14,
                    lineHeight: 23,
                  },
                ]}
              >
                {item.title}
              </Text>

              {description ? (
                <Text
                  style={[
                    typography.Poppins_xs_regular,
                    {
                      color: cardTokens.inkSecondary,
                      fontSize: 14,
                      lineHeight: 23,
                      marginTop: 6,
                    },
                  ]}
                >
                  {description}
                </Text>
              ) : null}

              {warning ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "auto",
                    paddingTop: 12,
                  }}
                >
                  <AlertTriangle size={13} color={chartTokens.accent} />
                  <Text
                    style={[
                      typography.Poppins_xs_medium,
                      {
                        color: chartTokens.accent,
                        fontSize: 13,
                        marginLeft: 6,
                        flex: 1,
                      },
                    ]}
                  >
                    {warning}
                  </Text>
                </View>
              ) : null}
            </View>
          );
        }}
        />
      </View>

      {tips.length > 1 ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 6,
            marginTop: 14,
          }}
        >
          {tips.map((tip, index) => (
            <View
              key={`dot-${tip.code}`}
              style={{
                width: index === activeIndex ? 18 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor:
                  index === activeIndex
                    ? chartTokens.current
                    : chartTokens.grid,
              }}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
