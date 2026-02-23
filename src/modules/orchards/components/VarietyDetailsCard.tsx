import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { Edit, Plus, Trash2, TreePalm, TreePine, Trees } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

function VarietiesCard({
  varietiesData,
  onAdd,
  onEdit,
  onDelete,
}: {
  varietiesData: any[];
  onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <ScreenContent>
      <View style={{ marginVertical: 12 }}>

        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 18 }}>
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
            <Text style={{ fontSize: 17, fontWeight: "700", color: colors.dark }}>
              Varieties & Planting
            </Text>
            <Text style={{ fontSize: 12, color: colors.neutral }}>
              Variety-wise plantation details
            </Text>
          </View>
        </View>

        {/* EMPTY STATE */}
        {varietiesData.length === 0 && (
          <Pressable
            onPress={onAdd}
            style={({ pressed }) => ({
              paddingVertical: 14,
              borderRadius: 14,
              alignItems: "center",
              backgroundColor: `${colors.primary}12`,
              borderWidth: 1,
              borderColor: `${colors.primary}40`,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <Text style={{ color: colors.primary, fontWeight: "700" }}>
              + Add Variety
            </Text>
          </Pressable>
        )}

        {/* VARIETY CARDS */}
        {varietiesData.map((v) => (
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
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text
                numberOfLines={1}
                style={{ fontSize: 15, fontWeight: "700", color: colors.dark, flex: 1 }}
              >
                {v.varietyName}
              </Text>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <ActionIcon onPress={() => onEdit(v.id)}>
                  <Edit size={15} color={colors.primary} />
                </ActionIcon>

                <ActionIcon onPress={() => onDelete(v.id)}>
                  <Trash2 size={15} color={colors.error} />
                </ActionIcon>
              </View>
            </View>

            {/* INFO */}
            <View style={{ marginTop: 8 }}>
              <InfoRow label="Total Trees" value={v.numberOfTrees} />
              <InfoRow label="Rootstock Used" value={v.rootstockUsed} />
              <InfoRow label="Plant Density" value={v.plantDensity} />
            </View>

            {/* AGE GROUPS */}
            <View
              style={{
                marginTop: 12,
                padding: 10,
                borderRadius: 12,
                backgroundColor: `${colors.primary}06`,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "700", marginBottom: 8 }}>
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

        {/* ADD MORE */}
        {varietiesData.length > 0 && (
          <Pressable
            onPress={onAdd}
            style={({ pressed }) => ({
              paddingVertical: 14,
              borderRadius: 14,
              backgroundColor: colors.primary,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <Plus size={16} color="#fff" />
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              Add More Variety
            </Text>
          </Pressable>
        )}
      </View>
    </ScreenContent>
  );
}

/* ACTION ICON */
function ActionIcon({ children, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#f3f4f6",
        alignItems: "center",
        justifyContent: "center",
        transform: [{ scale: pressed ? 0.9 : 1 }],
      })}
    >
      {children}
    </Pressable>
  );
}

/* INFO ROW */
function InfoRow({ label, value }: any) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
      <Text style={{ color: colors.neutral, fontSize: 12 }}>{label}</Text>
      <Text style={{ color: colors.dark, fontWeight: "600", maxWidth: "50%" }}>
        {value ?? "—"}
      </Text>
    </View>
  );
}

/* AGE CHIP */
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

export default VarietiesCard;