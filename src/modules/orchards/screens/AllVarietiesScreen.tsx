import BackHeader from "@/src/components/shared/BackHeader";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { useLocalSearchParams } from "expo-router";
import {
  TreePalm,
  TreePine,
  Trees
} from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

export default function AllVarieties() {
  const params = useLocalSearchParams();
  const varieties = params.varieties
    ? JSON.parse(params.varieties as string)
    : [];

  return (
   
     <ScrollView style={{ backgroundColor: "#fff" }}>
       <ScreenContent>
         <BackHeader title="All varieties" />
      <View style={{  }}>

        

        {varieties.map((v: any) => (
          <View
            key={v.id}
            style={{
              marginBottom: 14,
              padding: 14,
              borderRadius: 16,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
             
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "600", marginBottom: 6 }}>
              {v.varietyName}
            </Text>

            <InfoRow label="Total Trees" value={v.numberOfTrees} />
            <InfoRow label="Rootstock Used" value={v.rootstockUsed} />
            <InfoRow label="Plant Density" value={v.plantDensity} />

            {/* TREE AGE GROUPS */}
            <View
              style={{
                marginTop: 12,
                padding: 10,
                borderRadius: 12,
             
              }}
            >
              <Text style={{ fontWeight: "700", marginBottom: 8 }}>
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
        {/* END OF PAGE MESSAGE */}
<View
  style={{
    marginTop: 30,
    marginBottom: 40,
    alignItems: "center",
  }}
>
  <Text
    style={{
      color: colors.neutral,
      fontSize: 12,
      
    }}
  >
    — You’ve reached the end of the page —
  </Text>
</View>
      </View>
       </ScreenContent>
    </ScrollView>
  
  );
}

/* INFO ROW */
function InfoRow({ label, value }: any) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
      <Text style={{ color: colors.neutral }}>{label}</Text>
      <Text style={{ fontWeight: "600" }}>{value ?? "—"}</Text>
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
          <Text style={{ fontWeight: "600" }}>{label}</Text>
          <Text style={{ fontSize: 10 }}>{subtitle}</Text>
        </View>
      </View>

      <Text style={{ fontWeight: "700", color: colors.primary }}>
        {value ?? "—"}
      </Text>
    </View>
  );
}