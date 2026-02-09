import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Trees } from "lucide-react-native";
import { View } from "react-native";
import DetailRow from "./DetailRow";

interface OrchardDetailsProps {
  orchard: any;
}

export default function OrchardDetails({ orchard }: OrchardDetailsProps) {
  return (
    <ScreenContent>

      {/* Soft background */}
      <View
      style={{backgroundColor:colors.light}}
       className="py-6 ">

        {/* ================= HERO ================= */}

        <View
          className=" rounded-3xl  mb-6 "
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.04,
            shadowRadius: 12,
            elevation: 2,
          }}
        >

          <View className="flex-row items-center">

            {/* Orchard Avatar */}

            <View
              className="h-14 w-14 rounded-full items-center justify-center mr-4"
              style={{ backgroundColor: colors.primary + "20" }}
            >
              <Trees size={24} color={colors.primary} />
            </View>

            <View className="flex-1">

              <CsText
                style={[
                  typography.Poppins_m_semibold,
                  { fontSize: 22, color: colors.dark }
                ]}
                numberOfLines={2}
              >
                {orchard.orchardName}
              </CsText>

             

              {/* Ownership */}

              <View className="flex-row items-center mt-2">

                <View
                  className="h-2 w-2 rounded-full mr-2"
                  style={{ backgroundColor: colors.primary }}
                />

                <CsText
                  style={[
                    typography.caption_xs_bold,
                    { color: colors.primary }
                  ]}
                >
                  {orchard.ownershipType}
                </CsText>

              </View>

            </View>

          </View>

        </View>

        {/* ================= DETAILS ================= */}

        <View>

          {/* Section title */}

          <View className="flex-row items-center mb-3">

            <View
              className="w-1 h-5 rounded-full mr-2"
              style={{ backgroundColor: colors.primary }}
            />

            <CsText
              style={[
                typography.Poppins_m_medium,
                { color: colors.dark }
              ]}
            >
              Orchard Information
            </CsText>

          </View>

          <View
            className=""
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.03,
              shadowRadius: 10,
              elevation: 1,
            }}
          >

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

            <DetailRow
              label="Ownership"
              value={orchard.ownershipType}
              isLast
            />

          </View>

        </View>

      </View>

    </ScreenContent>
  );
}
