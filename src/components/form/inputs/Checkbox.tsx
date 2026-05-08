import { Controller, useFormContext } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

export default function Checkbox({ control: controlProp, name, label }) {
  let formContext;

  try {
    formContext = useFormContext();
  } catch {
    formContext = null;
  }

  const controllerControl = controlProp || formContext?.control;
  const clearErrors = formContext?.clearErrors;

  return (
    <Controller
      control={controllerControl}
      name={name}
      defaultValue={true}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const toggle = () => {
          const updated = !value;
          onChange(updated);

          if (updated && typeof clearErrors === "function") {
            clearErrors(name);
          }
        };

        return (
          <View style={{ marginBottom: 20 }}>
            <Pressable
              onPress={toggle}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* CHECKBOX */}

              <View
                style={{
                  width: 22,
                  height: 22,
                  borderWidth: 2,
                  borderColor: "#2d6b06",
                  borderRadius: 4,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                {value && (
                  <Text
                    style={{
                      color: "#2d6b06",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </Text>
                )}
              </View>

              {/* LABEL */}

              <Text>{label}</Text>
            </Pressable>

            {error && (
              <Text style={{ color: "red", marginTop: 4 }}>
                {error.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
}
