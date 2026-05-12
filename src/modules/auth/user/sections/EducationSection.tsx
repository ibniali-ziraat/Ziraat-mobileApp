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
        name="highestQualification"
        label="Highest Qualification"
        error={errors.highestQualification}
        type="address"
      />

      <FormTextInput
        name="instituteName"
        label="Institute / University Name"
        error={errors.instituteName}
        type="name"
      />

      <FormTextInput
        name="passingYear"
        label="Year of Passing"
        type="year"
        error={errors.passingYear}
      />

      <FormTextInput
        name="specialization"
        label="Specialization / Major (Optional)"
        error={errors.specialization}
      />
    </View>
  );
}
