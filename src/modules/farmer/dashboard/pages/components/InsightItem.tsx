import { Text, View } from "react-native";


export default function InsightItem({ item }) {
  return (
  
      <View className="flex-row items-center mb-2 justify-between">
        <Text className="font-bold text-xl  text-black w-[30%]">
          {item.id}
        </Text>

        <Text className="text-dark mt-1 w-[45%]">
          {item.type}
        </Text>

        <Text
          className={`w-[25%] text-right font-medium ${
            item.status === "Improved"
              ? "text-primary"
              : item.status === "Positive"
              ? "text-secondary"
              : "text-error"
          }`}
        >
          {item.status}
        </Text>
      </View>
  );
}
