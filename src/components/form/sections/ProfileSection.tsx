import { FormSectionProps } from "@/src/types/formSectionProps";
import { useEffect } from "react";
import { View } from "react-native";
import FormInput from "../inputs/FormInput";
import SingleSelectInput from "../inputs/SingleSelectInput";

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
      <FormInput
        control={control}
        name="fullName"
        label="Full Name"
        error={errors?.fullName?.message}
      />

      <FormInput
        control={control}
        name="email"
        label="Email"
        error={errors.email?.message}
        type="email"
      />

      {!data &&
        <FormInput
          control={control}
          name="phone"
          label="Mobile Number"
          error={errors.phone?.message}
          type="phone"
        />}

      <FormInput
        control={control}
        name="age"
        label="Age"
        error={errors.age?.message}
        type="phone"
      />

      <SingleSelectInput
        control={control}
        name="gender"
        label="Gender"
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
        error={errors.gender}
      />

      {/* Show password fields only if creating a new profile */}
      {!data && (
        <>
          <FormInput
            control={control}
            name="password"
            label="Password"
            error={errors.password?.message}
            type="password"
          />
          <FormInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            error={errors.confirmPassword?.message}
            type="password"
          />
        </>
      )}
    </View>
  );
}
