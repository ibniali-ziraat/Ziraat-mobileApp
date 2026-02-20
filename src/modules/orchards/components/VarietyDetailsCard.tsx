import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { Edit, Plus, Trash2 } from "lucide-react-native";
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
      {/* MAIN WRAPPER */}
      <View
        style={{
          marginVertical: 14,
        
        }}
      >
        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 22 }}>
          <View
            style={{
              width: 6,
              height: 32,
              borderRadius: 4,
              backgroundColor: colors.primary,
              marginRight: 14,
            }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: colors.dark }}>
              Varieties & Planting
            </Text>
            <Text style={{ fontSize: 12, color: colors.neutral }}>
              Variety-wise plantation details
            </Text>
          </View>
        </View>

        {/* EMPTY */}
        {varietiesData.length === 0 && (
          <Pressable
            onPress={onAdd}
            style={({ pressed }) => ({
              paddingVertical: 16,
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
              marginBottom: 18,
              padding: 16,
              borderRadius: 18,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#F0F0F0",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 2,
            }}
          >
            {/* TITLE + ACTIONS */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "700", color: colors.dark }}>
                {v.varietyName}
              </Text>

              <View style={{ flexDirection: "row", gap: 12 }}>
                <ActionIcon onPress={() => onEdit(v.id)}>
                  <Edit size={16} color={colors.primary} />
                </ActionIcon>

                <ActionIcon onPress={() => onDelete(v.id)}>
                  <Trash2 size={16} color={colors.error} />
                </ActionIcon>
              </View>
            </View>

            {/* INFO */}
            <InfoRow label="Total Trees" value={v.numberOfTrees} />
            <InfoRow label="Rootstock Used" value={v.rootstockUsed} />
            <InfoRow label="Plant Density" value={v.plantDensity} />

            {/* AGE GROUPS */}
            <View
              style={{
                marginTop: 14,
                padding: 12,
                borderRadius: 14,
                backgroundColor: `${colors.primary}06`,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: colors.dark,
                  marginBottom: 10,
                }}
              >
                Tree Age Groups
              </Text>

              <AgeChip label="🌱 Young Trees" subtitle="Below 5 years" value={v.treesLessThan5Years} bg={`${colors.primary}15`} />
              <AgeChip label="🌿 Mature Trees" subtitle="5 – 10 years" value={v.treesFiveToTenYears} bg={`${colors.primary}15`} />
              <AgeChip label="🌳 Old Trees" subtitle="Above 10 years" value={v.treesMoreThan10Years} bg={`${colors.primary}15`} />
            </View>
          </View>
        ))}

        {/* ADD MORE */}
        {varietiesData.length > 0 && (
          <Pressable
            onPress={onAdd}
            style={({ pressed }) => ({
              marginTop: 6,
              paddingVertical: 16,
              borderRadius: 14,
              alignItems: "center",
              backgroundColor: colors.primary,
              flexDirection: "row",
              justifyContent: "center",
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
        width: 32,
        height: 32,
        borderRadius: 16,
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
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
      <Text style={{ color: colors.neutral, fontSize: 13 }}>{label}</Text>
      <Text style={{ color: colors.dark, fontWeight: "600" }}>{value ?? "—"}</Text>
    </View>
  );
}

/* AGE CHIP */
function AgeChip({ label, subtitle, value, bg }: any) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
        padding: 10,
        borderRadius: 12,
        backgroundColor: bg,
      }}
    >
      <View>
        <Text style={{ fontSize: 13, fontWeight: "600", color: colors.dark }}>
          {label}
        </Text>
        <Text style={{ fontSize: 11, color: colors.neutral }}>
          {subtitle}
        </Text>
      </View>

      <View
        style={{
          minWidth: 34,
          height: 28,
          borderRadius: 999,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
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