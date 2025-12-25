import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import sprayData from "@/src/data/SprayData.json";
import { Droplets, Edit, Trash2, Trees } from "lucide-react-native";
import { FlatList, View } from "react-native";

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
            >
              {/* Top Row */}
              <View className="flex-row justify-between items-center ">
                <View className="flex-row items-center gap-2">
                  <Droplets size={20} color={colors.secondary} />
                  <CsText
                    style={[
                      typography.Poppins_m_medium,
                      { color: colors.neutral }
                    ]}
                  >
                    {item.name}
                 </CsText>
                </View>

                <View
                  className="px-3 py-1 rounded-full "
                  style={{
                    backgroundColor: colors.secondary,
                  }}
                >
                  <CsText
                     style={[
                      typography.Poppins_xs_medium,
                      { color: colors.light }
                    ]}
                  >
                    {item.type}
                 </CsText>
                </View>
              </View>

              {/* Middle Row */}
              <View className="flex-row justify-between items-center mt-3">
                <View className="flex-row items-center gap-2">
                  <Trees size={15} color={colors.secondary} />
                  <CsText  style={[
                      typography.Poppins_s_medium,
                      { color: colors.neutral }
                    ]}>
                    {item.orchardName}
                 </CsText>
                </View>

                <CsText
                  style={[
                      typography.Poppins_s_semibold,
                      { color: colors.neutral }
                    ]}
                >
                  {item.price}
               </CsText>
              </View>

              {/* Bottom Row */}
              <View className="flex-row justify-between items-center mt-3">
                <CsText
                  className="text-sm pl-1 "
                   style={[
                      typography.Poppins_xs_regular,
                      { color: colors.neutral }
                    ]}
                >
                  {item.brand} • {item.quantity}
               </CsText>

                <CsText  style={[
                      typography.Poppins_xs_regular,
                      { color: colors.neutral }
                    ]}>
                  Date: {item.date}
               </CsText>
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
