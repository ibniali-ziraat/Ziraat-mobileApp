import BackHeader from "@/src/components/shared/BackHeader";
import HtmlContent from "@/src/components/shared/HtmlContent";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { usePageDetail } from "@/src/navigation/hooks/usemenus";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type DetailsPageProps = {
  id: number;
  title?: string;
};

const DetailsPage = ({ id, title }: DetailsPageProps) => {
  const { data, isLoading, isError, refetch } = usePageDetail(
    Number.isNaN(id) ? undefined : id,
  );

  // the menu passes the page name, so the header is right before the api returns
  const headerTitle = data?.name ?? title ?? "Page";

  return (
    <ScreenLayout>
      <BackHeader
        title={headerTitle}
        desc={data?.metaDescription ?? undefined}
      />

      <ScreenContent className="flex-1">
        {isLoading ? (
          <View style={{ paddingTop: 48, alignItems: "center" }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : isError || !data ? (
          <View style={{ paddingTop: 48, alignItems: "center" }}>
            <Text style={[typography.Poppins_s_regular, { marginBottom: 12 }]}>
              Could not load this page.
            </Text>
            <Pressable onPress={() => refetch()}>
              <Text
                style={[typography.Poppins_s_semibold, { color: colors.primary }]}
              >
                Try again
              </Text>
            </Pressable>
          </View>
        ) : (
          <HtmlContent html={data.body} />
        )}
      </ScreenContent>
    </ScreenLayout>
  );
};

export default DetailsPage;
