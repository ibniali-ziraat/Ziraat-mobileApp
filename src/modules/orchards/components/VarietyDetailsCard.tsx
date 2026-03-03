import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { router } from "expo-router";
import {
  Edit,
  Plus,
  Trash2,
  TreePalm,
  TreePine,
  Trees,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type Props = {
  varietiesData: any[];
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  showAll?: boolean;
};

export default function VarietiesCard({
  varietiesData,
  onAdd,
  onEdit,
  onDelete,
  showAll = false,
}: Props) {
  const hasVarieties = varietiesData.length > 0;
  const showSeeMore = !showAll && varietiesData.length > 2;

  const visibleVarieties = showAll
    ? varietiesData
    : showSeeMore
      ? varietiesData.slice(0, 2)
      : varietiesData;

  return (
    <ScreenContent>
      <View style={{ marginVertical: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <View
            style={{
              width: 5,
              height: 28,
              borderRadius: 4,
              backgroundColor: colors.primary,
              marginRight: 12,
            }}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 17, fontWeight: "700", color: colors.dark }}
            >
              Varieties & Planting
            </Text>
            <Text style={{ fontSize: 12, color: colors.neutral }}>
              Variety-wise plantation details
            </Text>
          </View>

          {hasVarieties && (
            <Pressable
              onPress={onAdd}
              style={{
                height: 36,
                paddingHorizontal: 12,
                borderRadius: 18,
                backgroundColor: colors.primary,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Plus size={14} color="#fff" />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: "600",
                  marginLeft: 6,
                }}
              >
                Add Variety
              </Text>
            </Pressable>
          )}
        </View>

        {!hasVarieties && (
          <Pressable
            onPress={onAdd}
            style={{
              height: 44,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: `${colors.primary}12`,
              borderWidth: 1,
              borderColor: `${colors.primary}40`,
            }}
          >
            <Text style={{ color: colors.primary, fontWeight: "700" }}>
              + Add Variety
            </Text>
          </Pressable>
        )}

        {visibleVarieties.map((v) => (
          <View
            key={v.id}
            style={{
              marginBottom: 14,
              padding: 14,
              borderRadius: 16,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              elevation: 2,
            }}
          >
            {/* TITLE + ACTIONS */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: colors.dark,
                  flex: 1,
                }}
              >
                {v.varietyName}
              </Text>

              <View style={{ flexDirection: "row" }}>
                <ActionIcon onPress={() => onEdit(v.id)}>
                  <Edit size={15} color={colors.primary} />
                </ActionIcon>

                <View style={{ width: 8 }} />

                <ActionIcon onPress={() => onDelete(v.id)}>
                  <Trash2 size={15} color={colors.error} />
                </ActionIcon>
              </View>
            </View>

            {/* PLANTATION STRIP */}
            <View
              style={{
                marginTop: 6,
                paddingVertical: 12,
                borderRadius: 14,

                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#EEE",
              }}
            >
              <StripItem label="Trees" value={v.numberOfTrees} />
              <View style={{ width: 1, backgroundColor: "#EEE" }} />
              <StripItem label="Rootstock" value={v.rootstockUsed} />
              <View style={{ width: 1, backgroundColor: "#EEE" }} />
              <StripItem label="Density" value={v.plantDensity} />
            </View>

            {/* ORIGINAL TREE AGE GROUP UI */}
            <View
              style={{
                marginTop: 12,
                padding: 10,
                borderRadius: 12,
              }}
            >
              <Text
                style={{ fontSize: 13, fontWeight: "700", marginBottom: 8 }}
              >
                Tree Age Groups
              </Text>

              <AgeChip
                icon={<TreePalm size={15} color={colors.primary} />}
                label="Young Trees"
                subtitle="Below 5 years"
                value={v.treesLessThan5Years}
                bg={`${colors.primary}15`}
              />

              <AgeChip
                icon={<TreePine size={15} color={colors.primary} />}
                label="Mature Trees"
                subtitle="5 – 10 years"
                value={v.treesFiveToTenYears}
                bg={`${colors.primary}15`}
              />

              <AgeChip
                icon={<Trees size={15} color={colors.primary} />}
                label="Old Trees"
                subtitle="Above 10 years"
                value={v.treesMoreThan10Years}
                bg={`${colors.primary}15`}
              />
            </View>
          </View>
        ))}

        {showSeeMore && (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/orchards/all-varieties",
                params: {
                  varieties: JSON.stringify(varietiesData),
                },
              })
            }
            style={{
              marginTop: 6,
              paddingVertical: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.primary,
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.primary, fontWeight: "700" }}>
              See more Varieties ({varietiesData.length - 2})
            </Text>
          </Pressable>
        )}
      </View>
    </ScreenContent>
  );
}

function ActionIcon({ children, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#f3f4f6",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Pressable>
  );
}

function AgeChip({ icon, label, subtitle, value, bg }: any) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
        padding: 10,
        borderRadius: 12,
        backgroundColor: bg,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        {icon}

        <View style={{ marginLeft: 6 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: colors.dark }}>
            {label}
          </Text>

          <Text style={{ fontSize: 10, color: colors.neutral }}>
            {subtitle}
          </Text>
        </View>
      </View>

      <View
        style={{
          minWidth: 34,
          height: 26,
          borderRadius: 20,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 8,
        }}
      >
        <Text style={{ fontWeight: "700", color: colors.primary }}>
          {value ?? "—"}
        </Text>
      </View>
    </View>
  );
}
function StripItem({ label, value }: any) {
  const isEmpty = value === null || value === undefined || value === "";

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* LABEL */}
      <Text
        numberOfLines={1}
        style={{
          fontSize: 11,
          fontWeight: "500",
          color: colors.neutral,
          marginBottom: 6,
          letterSpacing: 0.4,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>

      {/* VALUE */}
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{
          fontSize: 12,
          fontWeight: "700",
          color: colors.primary,
        }}
      >
        {isEmpty ? "N/A" : String(value)}
      </Text>
    </View>
  );
}
