import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import sprayData from "@/src/data/SprayData.json";
import { Droplets, Edit, Trash2, Trees } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";

const SprayScreen = () => {
  return (
    <ScreenLayout>
      <FlatList
        data={sprayData}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingLeft: 2,
          paddingRight: 2,
        }}
        renderItem={({ item }) => (
          <ZiraatCard width="100%" marginBottom={1}>
            <View
              className=" p-5 rounded-2xl"
              // style={{
              //   backgroundColor: colors.light,
              //   borderWidth: 1,
              //   borderColor: colors.primary,
              // }}
            >
              {/* Top Row */}
              <View className="flex-row justify-between items-center ">
                <View className="flex-row items-center gap-2">
                  <Droplets size={20} color={colors.secondary} />
                  <Text
                    className="text-lg font-bold"
                    style={{ color: colors.neutral }}
                  >
                    {item.name}
                  </Text>
                </View>

                <View
                  className="px-3 py-1 rounded-full "
                  style={{
                    backgroundColor: colors.secondary,
                  }}
                >
                  <Text
                    className="text-sm font-bold "
                    style={{ color: colors.light }}
                  >
                    {item.type}
                  </Text>
                </View>
              </View>

              {/* Middle Row */}
              <View className="flex-row justify-between items-center mt-3">
                <View className="flex-row items-center gap-2">
                  <Trees size={15} color={colors.secondary} />
                  <Text className="text-sm" style={{ color: colors.darkHover }}>
                    {item.orchardName}
                  </Text>
                </View>

                <Text
                  className="text-md font-semibold"
                  style={{ color: colors.dark }}
                >
                  {item.price}
                </Text>
              </View>

              {/* Bottom Row */}
              <View className="flex-row justify-between items-center mt-3">
                <Text
                  className="text-sm pl-1 "
                  style={{ color: colors.darkHover }}
                >
                  {item.brand} • {item.quantity}
                </Text>

                <Text className="text-sm" style={{ color: colors.darkHover }}>
                  Date: {item.date}
                </Text>
              </View>

              {/* Actions */}
              <View className="flex-row justify-end items-center gap-3 mt-3">
                <Edit size={20} color={colors.neutral} />
                <Trash2 size={20} color={colors.error} />
              </View>
            </View>
          </ZiraatCard>
        )}
      />
    </ScreenLayout>
  );
};

export default SprayScreen;
