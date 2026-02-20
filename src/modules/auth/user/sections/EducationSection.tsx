import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { View } from "react-native";

interface Props {
  control: any;
  errors: any;
}

export default function EducationSection({ control, errors }: Props) {
  return (
    <View>
      <FormTextInput
        control={control}
        name="highestQualification"
        label="Highest Qualification"
        error={errors.highestQualification}
      />

      <FormTextInput
        control={control}
        name="instituteName"
        label="Institute / University Name"
        error={errors.instituteName}
      />

      <FormTextInput
        control={control}
        name="passingYear"
        label="Year of Passing"
        type="phone"
        error={errors.passingYear}
      />

      <FormTextInput
        control={control}
        name="specialization"
        label="Specialization / Major (Optional)"
        error={errors.specialization}
        optional
      />
    </View>
  );
}

