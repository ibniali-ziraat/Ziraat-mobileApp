import BackHeader from "@/src/components/shared/BackHeader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { fonts } from "@/src/constants/fonts/font";
import { typography } from "@/src/constants/fonts/typography";
import { usePageDetail } from "@/src/navigation/hooks/usemenus";
import {
  ActivityIndicator,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHtml, {
  defaultSystemFonts,
  HTMLContentModel,
  HTMLElementModel,
  useContentWidth,
  type CustomBlockRenderer,
  type MixedStyleDeclaration,
} from "react-native-render-html";
import WebView from "react-native-webview";

type DetailsPageProps = {
  id: number;
  title?: string;
};

// the admin editor wraps text in <font>, which render-html doesn't know and
// drops along with its children, so treat it like a plain inline tag
const customHTMLElementModels = {
  font: HTMLElementModel.fromCustomModel({
    tagName: "font",
    contentModel: HTMLContentModel.textual,
  }),
};

// editor links can be protocol-relative ("//www.youtube.com/embed/...")
const toAbsoluteUrl = (src?: string) =>
  src?.startsWith("//") ? `https:${src}` : src;

// render-html has no renderer for <iframe> / <video>, so play them in a WebView
const IframeRenderer: CustomBlockRenderer = ({ tnode }) => {
  const width = useContentWidth();
  const src = toAbsoluteUrl(tnode.attributes.src);
  if (!src) return null;

  return (
    <WebView
      source={{ uri: src }}
      style={{ width, height: (width * 9) / 16, marginVertical: 8 }}
      allowsFullscreenVideo
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction={false}
    />
  );
};

const VideoRenderer: CustomBlockRenderer = ({ tnode }) => {
  const width = useContentWidth();
  // the url is either on <video src> or on a nested <source src>
  const sourceTag = tnode.domNode?.children.find(
    (child) => "name" in child && child.name === "source",
  ) as { attribs?: Record<string, string> } | undefined;
  const src = toAbsoluteUrl(tnode.attributes.src ?? sourceTag?.attribs?.src);
  if (!src) return null;

  const html = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
    <body style="margin:0;background:#000">
      <video src="${src}" controls playsinline style="width:100%;height:100%"></video>
    </body></html>`;

  return (
    <WebView
      source={{ html }}
      style={{ width, height: (width * 9) / 16, marginVertical: 8 }}
      allowsFullscreenVideo
      allowsInlineMediaPlayback
    />
  );
};

const renderers = {
  iframe: IframeRenderer,
  video: VideoRenderer,
};

// CSS for the admin's HTML, written as React Native styles per tag.
// render-html drops custom fonts unless they're listed in systemFonts.
const systemFonts = [...defaultSystemFonts, ...Object.values(fonts.poppins)];

const baseStyle: MixedStyleDeclaration = {
  fontFamily: fonts.poppins.regular,
  fontSize: 15,
  lineHeight: 24,
  color: colors.neutral,
};

const tagsStyles: Record<string, MixedStyleDeclaration> = {
  h1: {
    fontFamily: fonts.poppins.semibold,
    fontWeight: "normal",
    fontSize: 22,
    lineHeight: 30,
    color: colors.dark,
    marginTop: 0,
    marginBottom: 12,
  },
  h2: {
    fontFamily: fonts.poppins.semibold,
    fontWeight: "normal",
    fontSize: 19,
    lineHeight: 27,
    color: colors.dark,
    marginTop: 18,
    marginBottom: 10,
  },
  h3: {
    fontFamily: fonts.poppins.medium,
    fontWeight: "normal",
    fontSize: 17,
    lineHeight: 25,
    color: colors.dark,
    marginTop: 16,
    marginBottom: 8,
  },
  p: { marginTop: 0, marginBottom: 12 },
  b: { fontFamily: fonts.poppins.semibold, fontWeight: "normal" },
  strong: { fontFamily: fonts.poppins.semibold, fontWeight: "normal" },
  i: { fontFamily: fonts.poppins.regularItalic, fontStyle: "normal" },
  em: { fontFamily: fonts.poppins.regularItalic, fontStyle: "normal" },
  a: { color: colors.primary, textDecorationLine: "underline" },
  ul: { marginTop: 0, marginBottom: 12, paddingLeft: 18 },
  ol: { marginTop: 0, marginBottom: 12, paddingLeft: 18 },
  li: { marginBottom: 6 },
  img: { borderRadius: 12, marginVertical: 8 },
  blockquote: {
    marginVertical: 12,
    marginHorizontal: 0,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    color: colors.darkHover,
  },
  hr: { marginVertical: 16, height: 1, backgroundColor: colors.cardBorder },
};

const DetailsPage = ({ id, title }: DetailsPageProps) => {
  const { width } = useWindowDimensions();

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
          <RenderHtml
            contentWidth={width - 30} // ScreenContent pads 15 on each side
            source={{ html: data.body }}
            customHTMLElementModels={customHTMLElementModels}
            renderers={renderers}
            WebView={WebView}
            systemFonts={systemFonts}
            baseStyle={baseStyle}
            tagsStyles={tagsStyles}
            // the admin editor adds inline colours/fonts, so ignore them
            ignoredStyles={["color", "fontFamily", "fontSize"]}
          />
        )}
      </ScreenContent>
    </ScreenLayout>
  );
};

export default DetailsPage;
