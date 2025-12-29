import { colors } from "@/src/constants/colors";
import { Text, View } from "react-native";
import FormInput from "../../../../components/form/inputs/FormInput";

interface Props {
  control: any;
  errors: any;
}

/* 🔹 SECTION HEADER */
function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <View style={{ marginRight: 8 }}>{icon}</View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: colors.dark,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

/* 🔹 FIELD HEADER */
function FieldHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        marginBottom: 6,
      }}
    >
      <View style={{ marginRight: 6 }}>{icon}</View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: colors.dark,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export default function ProfessionSection({ control, errors }: Props) {
  return (
    <View style={{ paddingHorizontal: 8 }}>
      
       

      
      <FormInput
        control={control}
        name="professionType"
        label="Profession / Occupation"
        error={errors.professionType?.message}
      />

      
      <FormInput
        control={control}
        name="organizationName"
        label="Organization / Employer Name"
        error={errors.organizationName?.message}
      />

      <FormInput
        control={control}
        name="designation"
        label="Designation / Role"
        error={errors.designation?.message}
      />

     
      <FormInput
        control={control}
        name="experienceYears"
        label="Years of Experience"
        keyboardType="numeric"
        error={errors.experienceYears?.message}
      />

     
      <FormInput
        control={control}
        name="skills"
        label="Key Skills / Expertise (Optional)"
        error={errors.skills?.message}
        optional
      />
    </View>
  );
}
