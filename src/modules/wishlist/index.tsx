import { toast } from "@backpackapp-io/react-native-toast";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import ArtStrip from "@/src/components/shared/ArtStrip";
import CsText from "@/src/components/shared/CsText";
import Loader from "@/src/components/shared/Loader";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { shoppingArt } from "@/src/constants/iconArt";

import { ROUTES } from "@/src/constants/routes";
import WishlistItem from "./components/WishListItem";
import WishlistEmpty from "./components/WishlistEmpty";
import { useWishlist } from "./hooks/useWishlist";

const Wishlist = () => {
  const router = useRouter();

  const {
    wishlist,
    isLoading,
    isFetchingWishlist,
    removeFromWishlist,
    refetch,
  } = useWishlist();

  const handleRemoveFromWishlist = async (id: number) => {
    try {
      await removeFromWishlist({ id });
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  if (isLoading && wishlist.length === 0) {
    return <Loader />;
  }

  if (!isLoading && wishlist.length === 0) {
    return (
      <WishlistEmpty
        onStartShopping={() => router.push(ROUTES.TABS.PRODUCTS)}
      />
    );
  }

  return (
    <View style={{ backgroundColor: colors.light }} className="flex-1">
      <BackHeader
        title="My Wishlist"
        desc={`${wishlist.length} ${wishlist.length === 1 ? "item" : "items"} saved`}
      />

      <FlatList
        data={wishlist}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
       
        columnWrapperStyle={{
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 80,
        }}
        ListHeaderComponent={
          <View style={{ paddingHorizontal: 14, marginBottom: 12 }}>
            <ArtStrip
              art={shoppingArt.heart}
              tint="#F7F7F7"
              title={`${wishlist.length} ${wishlist.length === 1 ? "item" : "items"} saved`}
              subtitle="Prices and stock can change — add them to your cart soon"
            />
          </View>
        }
        renderItem={({ item }) => (
          <WishlistItem
            item={item}
            onRemove={() => handleRemoveFromWishlist(item.id)}
          />
        )}
        ListFooterComponent={
          <View className="py-12 w-full">
            <CsText
              className="text-center opacity-40"
              style={typography.Poppins_s_regular}
            >
              You’ve reached the end
            </CsText>
          </View>
        }
      />
    </View>
  );
};

export default Wishlist;
