import { colors } from "@/src/constants/colors";
import { usePageDetail } from "@/src/navigation/hooks/usemenus";
import { Stack } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHtml from "react-native-render-html";

type DetailsPageProps = {
  id: number;
};

const DetailsPage = ({ id }: DetailsPageProps) => {
  const { width } = useWindowDimensions();

  const { data, isLoading, isError, refetch } = usePageDetail(
    Number.isNaN(id) ? undefined : id,
  );

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.light,
        }}
      >
        <Stack.Screen options={{ title: "Loading..." }} />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          backgroundColor: colors.light,
        }}
      >
        <Stack.Screen options={{ title: "Page" }} />
        <Text style={{ marginBottom: 12 }}>Could not load this page.</Text>
        <Pressable onPress={() => refetch()}>
          <Text style={{ fontWeight: "600" }}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: data.name }} />
      <ScrollView
        style={{ backgroundColor: colors.light }}
        contentContainerStyle={{ padding: 16 }}
      >
        <RenderHtml
          contentWidth={width - 32}
          source={{ html: data.body }}
          baseStyle={{ fontSize: 16 }}
          // the admin editor adds inline colours/fonts, so ignore them
          ignoredStyles={["color", "fontFamily", "fontSize"]}
        />
      </ScrollView>
    </>
  );
};

export default DetailsPage;
