import { View } from "react-native";
import FormInput from "../../../../components/form/inputs/FormInput";

interface Props {
  control: any;
  errors: any;
}

export default function ProfessionSection({ control, errors }: Props) {
  return (
    <View>
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
