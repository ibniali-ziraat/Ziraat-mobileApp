import { colors } from "@/src/constants/colors";
import { Edit, Trash2 } from "lucide-react-native";
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
    <View
      style={{
        marginVertical: 12,
        padding: 16,
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
        Varieties & Planting
      </Text>

      {varietiesData.length === 0 && (
        <Pressable
          onPress={onAdd}
          style={{
            padding: 12,
            backgroundColor: colors.primary,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Add Variety</Text>
        </Pressable>
      )}

      {varietiesData.map((v) => (
        <View
          key={v.id}
          style={{
            marginBottom: 12,
            padding: 12,
            backgroundColor: "white",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ddd",
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}>
            {v.varietyName}
          </Text>
          <Text>Total Trees: {v.numberOfTrees}</Text>
          <Text>Rootstock Used: {v.rootstockUsed}</Text>
          <Text>Plant Density: {v.plantDensity}</Text>
          <Text>Trees (&lt;5 Years): {v.treesLessThan5Years}</Text>
          <Text>Trees (5–10 Years): {v.treesFiveToTenYears}</Text>
          <Text>Trees (&gt;10 Years): {v.treesMoreThan10Years}</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <Pressable onPress={() => onEdit(v.id)} style={{ marginRight: 16 }}>
              <Edit size={20} color={colors.primary} />
            </Pressable>
            <Pressable onPress={() => onDelete(v.id)}>
              <Trash2 size={20} color="red" />
            </Pressable>
          </View>
        </View>
      ))}

      {/* Always show Add button at bottom if there are varieties */}
      {varietiesData.length > 0 && (
        <Pressable
          onPress={onAdd}
          style={{
            padding: 12,
            backgroundColor: colors.primary,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            Add More Variety
          </Text>
        </Pressable>
      )}
    </View>
  );
}

export default VarietiesCard;
