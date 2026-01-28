// import { ScreenContent } from "@/src/components/shared/ScreenContent";
// import { colors } from "@/src/constants/colors";
// import { Edit, Trash2 } from "lucide-react-native";
// import { Pressable, Text, View } from "react-native";

// function VarietiesCard({
//   varietiesData,
//   onAdd,
//   onEdit,
//   onDelete,
// }: {
//   varietiesData: any[];
//   onAdd: () => void;
//   onEdit: (id: number) => void;
//   onDelete: (id: number) => void;
// }) {
//   return (
//     <ScreenContent>
//       <View
//         style={{
//           marginVertical: 12,
//           padding: 16,
//           backgroundColor: colors.light,
//           borderRadius: 16,
//           borderWidth: 1,
//           borderColor: colors.cardBorder,
//         }}
//       >
//         {/* ===== HEADER WITH GREEN ACCENT ===== */}
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             marginBottom: 18,
//           }}
//         >
//           {/* Light green accent bar */}
//           <View
//             style={{
//               width: 5,
//               height: 26,
//               borderRadius: 7,
//               backgroundColor:colors.primary,
//               marginRight: 10,
//             }}
//           />

//           <View>
//             <Text
//               style={{
//                 fontSize: 17,
//                 fontWeight: "600",
//                 color: colors.dark,
//               }}
//             >
//               Varieties & Planting
//             </Text>

//             <View
            
//             />
//           </View>
//         </View>

//         {/* ===== EMPTY STATE ===== */}
//         {varietiesData.length === 0 && (
//           <Pressable
//             onPress={onAdd}
//             style={{
//               paddingVertical: 12,
//               borderRadius: 10,
//               alignItems: "center",
//               backgroundColor: `${colors.primary}15`,
//               borderWidth: 1,
//               borderColor: `${colors.primary}40`,
//             }}
//           >
//             <Text
//               style={{
//                 color: colors.primary,
//                 fontWeight: "600",
//               }}
//             >
//               Add Variety
//             </Text>
//           </Pressable>
//         )}

//         {/* ===== VARIETY LIST ===== */}
//         {varietiesData.map((v) => (
//           <View
//             key={v.id}
//             style={{
//               marginBottom: 14,
//               padding: 14,
//               backgroundColor: colors.light,
//               borderRadius: 14,
//               borderWidth: 1,
//               borderColor: colors.cardBorder,
//             }}
//           >
//             {/* Title + actions */}
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginBottom: 10,
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: "600",
//                   color: colors.dark,
//                 }}
//               >
//                 {v.varietyName}
//               </Text>

//               <View style={{ flexDirection: "row", gap: 16 }}>
//                 <Pressable onPress={() => onEdit(v.id)}>
//                   <Edit size={18} color={colors.primary} />
//                 </Pressable>
//                 <Pressable onPress={() => onDelete(v.id)}>
//                   <Trash2 size={18} color={colors.error} />
//                 </Pressable>
//               </View>
//             </View>

//             {/* Details */}
//             <InfoRow label="Total Trees" value={v.numberOfTrees} />
//             <InfoRow label="Rootstock Used" value={v.rootstockUsed} />
//             <InfoRow label="Plant Density" value={v.plantDensity} />
//             <InfoRow label="Trees < 5 Years" value={v.treesLessThan5Years} />
//             <InfoRow label="Trees 5–10 Years" value={v.treesFiveToTenYears} />
//             <InfoRow label="Trees > 10 Years" value={v.treesMoreThan10Years} />
//           </View>
//         ))}

//         {/* ===== ADD MORE ===== */}
//         {varietiesData.length > 0 && (
//           <Pressable
//             onPress={onAdd}
//             style={{
//               marginTop: 8,
//               paddingVertical: 12,
//               borderRadius: 10,
//               alignItems: "center",
//               backgroundColor: colors.primary,
//             }}
//           >
//             <Text style={{ color: colors.light, fontWeight: "600" }}>
//               Add More Variety
//             </Text>
//           </Pressable>
//         )}
//       </View>
//     </ScreenContent>
//   );
// }

// /* ===== SMALL HELPER ROW ===== */
// function InfoRow({ label, value }: { label: string; value: any }) {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginBottom: 6,
//       }}
//     >
//       <Text style={{ color: colors.neutral, fontSize: 13 }}>
//         {label}
//       </Text>
//       <Text style={{ color: colors.dark, fontWeight: "500" }}>
//         {value ?? "—"}
//       </Text>
//     </View>
//   );
// }

// export default VarietiesCard;


import { ScreenContent } from "@/src/components/shared/ScreenContent";
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
    <ScreenContent>
      <View
        style={{
          marginVertical: 14,
          padding: 18,
       
          borderRadius: 18,
          borderWidth: 1,
          borderColor: colors.cardBorder,
          shadowColor: "#000",
          shadowOpacity: 0.04,
          shadowRadius: 10,
          elevation: 2,
        }}
      >
        {/* ===== HEADER WITH GREEN ACCENT ===== */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              width: 5,
              height: 28,
              borderRadius: 4,
              backgroundColor:colors.primary,
              marginRight: 12,
            }}
          />

          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: colors.dark,
                letterSpacing: 0.2,
              }}
            >
              Varieties & Planting
            </Text>

            <Text
              style={{
                marginTop: 2,
                fontSize: 12,
                color: colors.neutral,
              }}
            >
              Variety-wise plantation details
            </Text>
          </View>
        </View>

        {/* ===== EMPTY STATE ===== */}
        {varietiesData.length === 0 && (
          <Pressable
            onPress={onAdd}
            style={{
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: "center",
              backgroundColor: `${colors.primary}12`,
              borderWidth: 1,
              borderColor: `${colors.primary}35`,
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              Add Variety
            </Text>
          </Pressable>
        )}

        {/* ===== VARIETY LIST ===== */}
        {varietiesData.map((v) => (
          <View
            key={v.id}
            style={{
              marginBottom: 16,
              padding: 16,
              backgroundColor: colors.light,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.cardBorder,
            }}
          >
            {/* Title + actions */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.dark,
                }}
              >
                {v.varietyName}
              </Text>

              <View style={{ flexDirection: "row", gap: 14 }}>
                <Pressable onPress={() => onEdit(v.id)}>
                  <Edit size={17} color={colors.neutral} />
                </Pressable>
                <Pressable onPress={() => onDelete(v.id)}>
                  <Trash2 size={17} color={colors.error} />
                </Pressable>
              </View>
            </View>

            {/* Divider */}
            <View
              style={{
                height: 1,
                backgroundColor: colors.cardBorder,
                opacity: 0.6,
                marginBottom: 12,
              }}
            />

            {/* Details */}
            <InfoRow label="Total Trees" value={v.numberOfTrees} />
            <InfoRow label="Rootstock Used" value={v.rootstockUsed} />
            <InfoRow label="Plant Density" value={v.plantDensity} />

            {/* Age Groups */}
            <View style={{ marginTop: 10 }}>
              <AgeRow label="< 5 Years" value={v.treesLessThan5Years} />
              <AgeRow label="5 – 10 Years" value={v.treesFiveToTenYears} />
              <AgeRow label="> 10 Years" value={v.treesMoreThan10Years} />
            </View>
          </View>
        ))}

        {/* ===== ADD MORE ===== */}
        {varietiesData.length > 0 && (
          <Pressable
            onPress={onAdd}
            style={{
              marginTop: 10,
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: "center",
              backgroundColor: colors.primary,
            }}
          >
            <Text
              style={{
                color: colors.light,
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              Add More Variety
            </Text>
          </Pressable>
        )}
      </View>
    </ScreenContent>
  );
}

/* ===== INFO ROW ===== */
function InfoRow({ label, value }: { label: string; value: any }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
      }}
    >
      <Text style={{ color: colors.neutral, fontSize: 13 }}>
        {label}
      </Text>
      <Text style={{ color: colors.dark, fontWeight: "500" }}>
        {value ?? "—"}
      </Text>
    </View>
  );
}

/* ===== AGE ROW (SUBTLE BADGE FEEL) ===== */
function AgeRow({ label, value }: { label: string; value: any }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
      }}
    >
      <Text style={{ fontSize: 12, color: colors.neutral }}>
        {label}
      </Text>
      <View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 999,
          backgroundColor: `${colors.primary}12`,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: colors.primary,
          }}
        >
          {value ?? "—"}
        </Text>
      </View>
    </View>
  );
}

export default VarietiesCard;
