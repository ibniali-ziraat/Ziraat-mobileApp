import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import { Eye, X } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";

const IMAGE_HEIGHT = 175;
const CARD_HEIGHT = 320;

const WishlistItem = ({ item, onRemove }) => {
  const handleViewDetails = () => {
    router.push({
      pathname: ROUTES.PRODUCTS.SINGLE_PRODUCT_DETAILS,
      params: {
        productId: item.productId,
        vendorId: item.vendorId,
        vendorProductId: item.vendorProductId,
      },
    });
  };
  if (!item) {
    return null;
  }

  return (
    <View className="w-1/2 px-1 mb-6">
      <View
        style={{
          height: CARD_HEIGHT,
          backgroundColor: colors.light,
          borderWidth: 2,
          borderColor: "#ededed",
        }}
      >
        <Pressable
          onPress={() => onRemove(item.id)}
          className="absolute right-2 top-2 z-10"
          style={{
            backgroundColor: colors.light,
            padding: 6,
            borderRadius: 20,

          }}
        >
          <X size={14} color="#222" />
        </Pressable>

        {/* IMAGE */}
        <View style={{ height: IMAGE_HEIGHT }}>
          <Image
            source={{ uri: item.productImage }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        {/* BODY */}
        {/* BODY */}
        <View className=" pt-2 ">
          <View className="px-3">
            {/* TITLE (LOCKED HEIGHT) */}
            <View style={{ minHeight: 34 }}>
              <CsText
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[typography.Poppins_xs_medium, { color: "#111" }]}
              >
                {item.productName}
              </CsText>
            </View>
          </View>

          {/* BUTTON (NO EXTRA MARGIN) */}
          <Pressable
            onPress={handleViewDetails}
            className="pt-6 pb-5 border-t items-center active:opacity-70"
            style={{ borderColor: "#e5e5e5", marginTop: 6 }}
          >
            <View className="flex-row items-center">
              <Eye size={16} color={colors.secondary} />
              <CsText
                className="ml-2"
                style={{
                  color: colors.secondary,
                  letterSpacing: 0.6,
                  fontFamily: typography.Poppins_m_semibold?.fontFamily,
                }}
              >
                VIEW DETAILS
              </CsText>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default WishlistItem;
