import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { FormSectionProps } from "@/src/types/formSectionProps";
import { useEffect } from "react";
import { View } from "react-native";
import SingleSelectInput from "../../../../components/form/inputs/SingleSelectInput";

export default function ProfileSection({
  control,
  errors,
  data,
  setValue,
}: FormSectionProps) {
  useEffect(() => {
    if (data && setValue) {
      setValue("fullName", data.fullName || "");
      setValue("email", data.email || "");
      setValue("phone", data.phone || "");
      setValue("age", data.age != null ? String(data.age) : ""); // convert number to string
      setValue("gender", data.gender || "");
    }
  }, [data, setValue]);

  return (
    <View>
      <FormTextInput
        name="fullName"
        label="Full Name"
        type="name"
        error={errors?.fullName}
        required
      />
      {!data && (
        <FormTextInput
          name="phone"
          label="Mobile Number"
          error={errors.phone}
          type="phone"
          required
        />
      )}

      <FormTextInput
        name="email"
        label="Email (Optional)"
        error={errors.email}
        optional
        type="email"
        required
      />

      <FormTextInput
        name="age"
        label="Age"
        error={errors.age}
        type="age"
        required
      />

      <SingleSelectInput
        control={control}
        name="gender"
        label="Gender"
        modalLabel="Gender"
        showInputLabel={false}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
        error={errors.gender}
      />

      {!data && (
        <>
          <FormTextInput
            control={control}
            name="password"
            label="Password"
            error={errors.password}
            type="password"
            required
          />
          <FormTextInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            error={errors.confirmPassword}
            type="password"
            required
          />
        </>
      )}
    </View>
  );
}
