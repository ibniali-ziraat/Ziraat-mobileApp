// CheckboxGroup.jsx
import { Controller, useFormContext } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";
import CsText from "../../shared/CsText";

/**
 * Props:
 *  - control: react-hook-form control (optional if using FormProvider)
 *  - name: field name (required)
 *  - label: string label
 *  - options: string[] (list of option labels/values)
 *
 * Usage: Ensure your form is wrapped with <FormProvider {...methods}> if you
 * want to rely on useFormContext(). Otherwise pass control prop from useForm().
 */
export default function CheckboxGroup({ control: controlProp, name, label, options }) {
  // Try to grab form API from context (recommended) — provides clearErrors, setValue, etc.
  let formContext;
  try {
    formContext = useFormContext();
  } catch (e) {
    formContext = null;
  }

  // If user passed control, prefer that; else we still pass control from context to Controller
  const controllerControl = controlProp || formContext?.control;

  // For clearing errors we need clearErrors from form API (not from control)
  const clearErrors = formContext?.clearErrors;

  return (
    <Controller
      control={controllerControl}
      name={name}
      defaultValue={[]}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => {
        const toggle = (opt) => {
          const already = value.includes(opt);
          const updated = already ? value.filter((i) => i !== opt) : [...value, opt];

          onChange(updated);

          if (updated.length > 0 && typeof clearErrors === "function") {
            clearErrors(name);
          }
        };

        return (
          <View style={{ marginBottom: 20 }}>
            <CsText style={{ fontSize: 16, fontWeight: "bold", marginBottom: 6 }}>
              {label}
           </CsText>

            {options.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() => toggle(opt)}
                activeOpacity={0.7}
                style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}
              >
                <Checkbox
                  status={value.includes(opt) ? "checked" : "unchecked"}
                  onPress={() => toggle(opt)}
                />
                <CsText>{opt}</CsText>
              </TouchableOpacity>
            ))}

            {error && (
              <CsText style={{ color: "red", marginTop: 4 }}>
                {error.message}
             </CsText>
            )}
          </View>
        );
      }}
    />
  );
}
