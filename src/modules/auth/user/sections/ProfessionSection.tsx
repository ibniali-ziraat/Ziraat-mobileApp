import FormTextInput from "@/src/components/shared/inputs/FormTextInput";
import { View } from "react-native";

// interface Props {
//   control: any;
//   errors: any;
// }

// /* 🔹 SECTION HEADER */
// function SectionHeader({
//   icon,
//   title,
// }: {
//   icon: React.ReactNode;
//   title: string;
// }) {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 16,
//       }}
//     >
//       <View style={{ marginRight: 8 }}>{icon}</View>
//       <Text
//         style={{
//           fontSize: 17,
//           fontWeight: "700",
//           color: colors.dark,
//         }}
//       >
//         {title}
//       </Text>
//     </View>
//   );
// }

// /* 🔹 FIELD HEADER */
// function FieldHeader({
//   icon,
//   title,
// }: {
//   icon: React.ReactNode;
//   title: string;
// }) {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: 12,
//         marginBottom: 6,
//       }}
//     >
//       <View style={{ marginRight: 6 }}>{icon}</View>
//       <Text
//         style={{
//           fontSize: 16,
//           fontWeight: "600",
//           color: colors.dark,
//         }}
//       >
//         {title}
//       </Text>
//     </View>
//   );
// }

export default function ProfessionSection({ errors }: any) {
  return (
    <View style={{ paddingHorizontal: 8 }}>
      <FormTextInput
        name="professionType"
        label="Profession / Occupation"
        error={errors.professionType}
        type="name"
      />

      <FormTextInput
        name="organizationName"
        label="Organization / Employer Name"
        error={errors.organizationName}
        type="username"
      />

      <FormTextInput
        name="designation"
        label="Designation / Role"
        error={errors.designation}
        type="username"
      />

      <FormTextInput
        name="experienceYears"
        label="Years of Experience"
        error={errors.experienceYears}
        type="age"
      />

      <FormTextInput
        name="skills"
        label="Key Skills / Expertise (Optional)"
        placeholder="Key Skills / Expertise"
        error={errors.skills}
      />
    </View>
  );
}
