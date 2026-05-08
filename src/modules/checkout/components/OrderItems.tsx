import { typography } from "@/src/constants/fonts/typography";
import { Image, Text, View } from "react-native";

interface OrderItem {
  id: string;
  productImage: string;
  productName: string;
  quantity: number;
  totalString: string;
}

interface Props {
  items: OrderItem[];
}

const formatRs = (value: string) => value?.replace("$", "₹");

export const OrderItems = ({ items }: Props) => (
  <View className="mx-4 mt-4 rounded-2xl bg-white p-4">
    <Text
      style={typography.Poppins_s_bold}
      className="mb-3 text-lg text-neutral-900"
    >
      Items
    </Text>

    {items.map((item) => (
      <View key={item.id} className="mb-4 flex-row items-center">
        <Image
          source={{ uri: item.productImage }}
          className="mr-3 h-16 w-16 rounded-xl"
        />
        <View className="flex-1">
          <Text className="text-base font-semibold text-neutral-900">
            {item.productName}
          </Text>
          <Text className="text-sm text-neutral-500">Qty: {item.quantity}</Text>
        </View>
        <Text className="text-base font-semibold text-neutral-900">
          {formatRs(item.totalString)}
        </Text>
      </View>
    ))}
  </View>
);
