import { useState } from "react";
import { useRouter } from "expo-router";
import { Hash, TagIcon } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import BackHeader from "@/src/components/shared/BackHeader";
import SearchBar from "@/src/components/shared/SearchBar";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { useForumTags } from "../hooks/useQuestion";

export default function TagsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data, isLoading } = useForumTags(search.trim() || undefined);

  const tags: any[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.tags)
      ? data.tags
      : [];

  const goToTag = (tagName: string) => {
    router.push({
      pathname: ROUTES.Discussion.discussionForum,
      params: { tag: tagName },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <BackHeader title="Browse Tags" />

      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Search tags..."
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {isLoading ? (
          <Text style={{ textAlign: "center", marginTop: 40, color: colors.overlay }}>
            Loading tags...
          </Text>
        ) : tags.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <TagIcon size={40} color={colors.secondary} />
            <Text style={{ marginTop: 10, fontWeight: "700", fontSize: 16 }}>
              No tags found
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              paddingHorizontal: 16,
            }}
          >
            {tags.map((tag: any, index: number) => {
              const name =
                typeof tag === "string" ? tag : tag.name || tag.tag || tag.label;
              const count = typeof tag === "object" ? tag.count ?? tag.questionsCount : null;

              return (
                <TouchableOpacity
                  key={`${name}-${index}`}
                  onPress={() => goToTag(name)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    borderWidth: 1,
                    borderColor: colors.cardBorder,
                    backgroundColor: colors.primary + "10",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 999,
                  }}
                >
                  <Hash size={12} color={colors.primary} strokeWidth={2.5} />
                  <Text style={{ color: colors.primary, fontSize: 13, fontWeight: "700" }}>
                    {name}
                  </Text>
                  {count != null && (
                    <Text style={{ fontSize: 11, color: colors.overlay }}>
                      {count}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
