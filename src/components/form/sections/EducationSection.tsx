import { View } from "react-native";
import FormInput from "../inputs/FormInput";

interface Props {
  control: any;
  errors: any;
}

export default function EducationSection({ control, errors }: Props) {
  return (
    <View>
      <FormInput
        control={control}
        name="highestQualification"
        label="Highest Qualification"
        error={errors.highestQualification}
      />

      <FormInput
        control={control}
        name="instituteName"
        label="Institute / University Name"
        error={errors.instituteName}
      />

      <FormInput
        control={control}
        name="passingYear"
        label="Year of Passing"
        type="phone"
        error={errors.passingYear}
      />

      <FormInput
        control={control}
        name="specialization"
        label="Specialization / Major (Optional)"
        error={errors.specialization}
        optional
      />
    </View>
  );
}
