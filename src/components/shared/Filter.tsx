import { FilterProps } from "@/src/types/filter.type";
import { Pressable, View } from "react-native";
import CsText from "./CsText";

export const FILTERS = {
  LATEST: "Latest",
  HELPFUL: "Most Helpful",
  HIGH_RATING: "Highest Rating",
  LOW_RATING: "Lowest Rating",
};

export default function Filter({ filter, setFilter }: FilterProps) {
  return (
    <View className="flex-row  mb-4 flex-wrap">
      {Object.values(FILTERS).map((f) => (
        <Pressable
          key={f}
          onPress={() => setFilter(f)}
          className={`px-3 py-2 rounded-xl mr-2 mb-5 shadow-sm  border border-secondary ${
            filter === f ? "bg-secondary" : "bg-light"
          }`}
        >
          <CsText
            className={`text-sm ${filter === f ? "text-light" : "text-dark"}`}
          >
            {f}
          </CsText>
        </Pressable>
      ))}
    </View>
  );
}
