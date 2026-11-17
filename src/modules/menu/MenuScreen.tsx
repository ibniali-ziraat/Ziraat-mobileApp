import AnimatedTabContent from "@/src/components/shared/AnimatedTabContent";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import { getPageArt } from "@/src/constants/iconArt";
import { useMenuList } from "@/src/navigation/hooks/usemenus";
import { MenuLinks, type MenuGroup } from "@/src/navigation/MenuLinks";
import { FileText } from "lucide-react-native";
import { useMemo } from "react";
import { View } from "react-native";
import MenuProfileCard from "./components/MenuProfileCard";
import MenuSection from "./components/MenuSection";

/** Short description for a server page, matched by its name. */
const pageHints: [RegExp, string][] = [
  [/faq|question/i, "Answers to common questions"],
  [/privacy/i, "How we handle your data"],
  [/contact|support/i, "Reach our team"],
  [/help/i, "Guides and support"],
  [/about/i, "Who we are"],
  [/term|condition|policy|legal/i, "Rules for using Ziraat"],
];
const getPageHint = (name: string) =>
  pageHints.find(([re]) => re.test(name))?.[1];

export default function MenuScreen() {
  // calls GET /api/pages when the menu opens
  const { data: pages } = useMenuList();

  // builds a "Pages" group from the api, in the same shape as the static groups,
  // so MenuSection renders and navigates it like the others
  const pagesGroup: MenuGroup | null = useMemo(() => {
    if (!pages || pages.length === 0) return null;

    return {
      title: "Pages",
      routes: pages.map((page) => ({
        label: page.name,
        screen: `/menupagedetatils?id=${page.id}&title=${encodeURIComponent(page.name)}`, // (menu-pages)/menupagedetatils.tsx reads ?id= and ?title=
        icon: FileText,
        art: getPageArt(page.name),
        hint: getPageHint(page.name),
      })),
    };
  }, [pages]);

  return (
    <ScreenLayout>
      <AnimatedTabContent>
        <View style={{ flex: 1, backgroundColor: colors.light }}>
          <ScreenContent>
            <MenuProfileCard />

            {MenuLinks.farmer.map((group) => (
              <MenuSection key={group.title} group={group} />
            ))}

            {pagesGroup && <MenuSection group={pagesGroup} />}

            <View style={{ height: 60 }} />
          </ScreenContent>
        </View>
      </AnimatedTabContent>
    </ScreenLayout>
  );
}
