import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Trees } from "lucide-react-native";
import { Text, View } from "react-native";
import DetailRow from "./DetailRow";

interface OrchardDetailsProps {
  orchard: any;
}

export default function OrchardDetails({ orchard }: OrchardDetailsProps) {
  return (
    <View style={{ backgroundColor: colors.light }} className="py-4">
      <View className=" rounded-3xl  mb-6 ">
        <View className="flex-row items-center">
          <View
            className="h-14 w-14 rounded-full items-center justify-center mr-4"
            style={{ backgroundColor: colors.primary + "20" }}
          >
            <Trees size={24} color={colors.primary} />
          </View>

          <View className="flex-1">
            <Text
              style={[
                typography.Poppins_m_semibold,
                { fontSize: 22, color: colors.dark },
              ]}
              numberOfLines={2}
            >
              {orchard.orchardName}
            </Text>

            <View className="flex-row items-center">
              <View
                className="h-2 w-2 rounded-full mr-2"
                style={{ backgroundColor: colors.primary }}
              />

              <Text style={[{ color: colors.primary }]}>
                {orchard.ownershipType}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <View className="flex-row items-center mb-3">
          <View
            className="w-1 h-5 rounded-full mr-2"
            style={{ backgroundColor: colors.primary }}
          />

          <Text style={[typography.Poppins_m_medium, { color: colors.dark }]}>
            Orchard Information
          </Text>
        </View>

        <View className="">
          <DetailRow
            label="Size"
            value={
              orchard?.kanals > 0
                ? `${orchard.kanals} kanals`
                : orchard?.marlas > 0
                  ? `${orchard.marlas} marlas`
                  : "-"
            }
          />

          <DetailRow
            label="Established"
            value={orchard.establishmentYear || "-"}
          />

          <DetailRow
            label="Plantation"
            value={orchard.plantationPattern || "-"}
          />

          {/* <DetailRow label="Ownership" value={orchard.ownershipType} isLast /> */}
        </View>
      </View>
    </View>
  );
}
