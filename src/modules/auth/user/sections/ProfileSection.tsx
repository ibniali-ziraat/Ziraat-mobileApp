import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { FormSectionProps } from "@/src/types/formSectionProps";
import { useEffect } from "react";
import { View } from "react-native";
import SingleSelectInput from "../../../../components/form/inputs/SingleSelectInput";

export default function ProfileSection({
  errors,
  data,
  setValue,
}: FormSectionProps) {
  useEffect(() => {
    if (data && setValue) {
      setValue("fullName", data.fullName || "");
      setValue("email", data.email || "");
      setValue("phone", data.phone || "");
      setValue("age", data.age != null ? String(data.age) : "");
      setValue("gender", data.gender || "");
    }
  }, [data, setValue]);

  // console.log(errors, "errors in profile");

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
        type="email"
        placeholder={"e,g, ziraat@gmail.com"}
      />

      <FormTextInput
        name="age"
        label="Age"
        error={errors.age}
        type="age"
        required
      />

      <SingleSelectInput
        name="gender"
        label="Gender"
        modalLabel="Gender"
        showInputLabel={false}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ]}
        error={errors.gender}
        optional={false}
      />

      {!data && (
        <>
          <FormTextInput
            name="password"
            label="Password"
            error={errors.password}
            type="password"
            required
          />
          <FormTextInput
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
