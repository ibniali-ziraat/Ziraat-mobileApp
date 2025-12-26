import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";
import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { useCascadingLocation } from "@/src/hooks/useCascadingLocation";
import { BusinessSectionProps } from "@/src/types/BusinessSection.types";
import { Briefcase, MapPin } from "lucide-react-native";
import { useEffect } from "react";
import { View } from "react-native";

export default function BusinessSection({
  control,
  errors,
  data,
}: BusinessSectionProps) {
  const { states, districts, tehsils, setSelectedState, setSelectedDistrict } =
    useCascadingLocation();

  useEffect(() => {
    if (data?.state) setSelectedState(data.state);
    if (data?.district) setSelectedDistrict(data.district);
  }, [data]);

  return (
    <View
      className="bg-light"
      style={{
        padding: 16,
        borderRadius: 16,
      }}
    >
      {/* ---------------- Business Info Section ---------------- */}
      <View style={{ marginBottom: 8 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Briefcase size={22} color={colors.secondary} style={{ marginRight: 8 }} />
          <CsText
            style={[typography.Poppins_l_semibold]
            
            
            }
          >
            Business Information
          </CsText>
        </View>

        <CsText
          style={[typography.Poppins_xs_regular,
            {
               color: colors.neutral,
            lineHeight: 18,
            }
          ]
            
           
          }
        >
          Provide basic details about your shop or business for identification
          and communication purposes.
        </CsText>
      </View>

      <View style={{ marginTop: 12 }}>
        <FormInput
          control={control}
          name="shopName"
          label="Shop / Business Name"
          error={errors?.shopName?.message}
        />

        <FormInput
          control={control}
          name="ownerName"
          label="Owner Name"
          error={errors?.ownerName?.message}
        />

        <FormInput
          control={control}
          name="email"
          label="Email (Optional)"
          type="email"
          optional
          error={errors?.email?.message}
        />

        <FormInput
          control={control}
          name="contactNumberPrimary"
          label="Business Contact Number"
          type="phone"
          error={errors?.contactNumberPrimary?.message}
        />

        <FormInput
          control={control}
          name="contactNumberAlternate"
          label="Alternate Contact (Optional)"
          type="phone"
          optional
          error={errors?.contactNumberAlternate?.message}
        />
      </View>

      {/* ---------------- Divider ---------------- */}
      <View
        style={{
          height: 1,
          backgroundColor: colors.border ?? "#E5E7EB",
          marginVertical: 20,
        }}
      />

      {/* ---------------- Business Address Section ---------------- */}
      <View style={{ marginBottom: 8 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <MapPin size={22} color={colors.secondary} style={{ marginRight: 8 }} />
         <CsText
            style={[typography.Poppins_l_semibold]
            
            
            }
          >
            Business Address
          </CsText>
        </View>

        <CsText
          style={{
            fontSize: 13,
            color: colors.neutral,
            lineHeight: 18,
          }}
        >
          Enter the complete address of your shop or business location to ensure
          accurate records and communication.
        </CsText>
      </View>

      <View style={{ marginTop: 12 }}>
        <SingleSelectInput
          control={control}
          name="state"
          label="State"
          modalLabel="State"
          options={states.map((s) => ({ label: s, value: s }))}
          onValueChange={(value) => {
            setSelectedState(value as string);
            setSelectedDistrict(null);
          }}
          error={errors?.state}
        />

        <SingleSelectInput
          control={control}
          name="district"
          label="District"
          searchable
          modalLabel="District"
          options={districts.map((d) => ({ label: d, value: d }))}
          onValueChange={(value) => setSelectedDistrict(value as string)}
          disabled={!districts.length && !data?.district}
          error={errors?.district}
        />

        <SingleSelectInput
          control={control}
          name="tehsil"
          label="Tehsil"
          searchable
          modalLabel="Tehsil"
          options={tehsils.map((t) => ({ label: t, value: t }))}
          disabled={!tehsils.length}
          error={errors?.tehsil}
        />

        <FormInput
          control={control}
          name="village"
          label="Shop Address"
          error={errors?.village?.message}
        />

        <FormInput
          control={control}
          name="pincode"
          label="Pincode"
          type="phone"
          error={errors?.pincode?.message}
        />
      </View>
    </View>
  );
}
