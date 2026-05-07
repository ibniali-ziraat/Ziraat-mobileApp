import { RatingStarsProps } from "@/src/types/rating-stars.types";
import { Star } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { colors } from "../../constants/colors";

export default function RatingStars({
  rating,
  size = 16,
  editable = false,
  onChange,
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {[...Array(5)].map((_, i) => {
        const handlePress = () => {
          if (editable && onChange) onChange(i + 1);
        };

        const isFull = i < fullStars;
        const isHalf = i === fullStars && hasHalfStar;

        return (
          <Pressable
            key={i}
            activeOpacity={0.7}
            onPress={handlePress}
            disabled={!editable}
          >
            {isFull ? (
              <Star
                size={size}
                color={colors.secondary}
                fill={colors.secondary}
                style={{ marginRight: 2 }}
              />
            ) : isHalf ? (
              <View style={{ position: "relative", marginRight: 2 }}>
                <Star size={size} color={colors.secondary} fill="none" />
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    overflow: "hidden",
                    width: size / 2,
                  }}
                >
                  <Star
                    size={size}
                    color={colors.secondary}
                    fill={colors.secondary}
                  />
                </View>
              </View>
            ) : (
              <Star
                size={size}
                color={colors.secondary}
                fill="none"
                style={{ marginRight: 2 }}
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
