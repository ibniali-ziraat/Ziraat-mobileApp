import { Controller, useFormContext } from "react-hook-form";
import { Pressable, View } from "react-native";
import CsText from "../../shared/CsText";

export default function RadioGroup({
  control: controlProp,
  name,
  label,
  options,
  error,
}) {
  let formContext;

  try {
    formContext = useFormContext();
  } catch (e) {
    formContext = null;
  }

  const controllerControl = controlProp || formContext?.control;
  const clearErrors = formContext?.clearErrors;

  return (
    <Controller
      control={controllerControl}
      name={name}
      render={({ field: { value, onChange }, fieldState }) => {
        const liveError = fieldState?.error || error;

        const handleSelect = (selected) => {
          onChange(selected);

          if (selected && typeof clearErrors === "function") {
            clearErrors(name);
          }
        };

        return (
          <View style={{ marginBottom: 20 }}>
            {/* Label */}
            <CsText
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {label}
            </CsText>

            {/* Options */}
            {options.map((opt) => {
              const selected = value === opt;

              return (
                <Pressable
                  key={opt}
                  onPress={() => handleSelect(opt)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  {/* Radio Outer Circle */}
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: selected ? "#2d6b06" : "#aaa",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 10,
                    }}
                  >
                    {/* Inner Circle */}
                    {selected && (
                      <View
                        style={{
                          height: 10,
                          width: 10,
                          borderRadius: 5,
                          backgroundColor: "#2d6b06",
                        }}
                      />
                    )}
                  </View>

                  <CsText>{opt}</CsText>
                </Pressable>
              );
            })}

            {/* Error */}
            {liveError && (
              <CsText style={{ color: "red", marginTop: 4 }}>
                {liveError.message}
              </CsText>
            )}
          </View>
        );
      }}
    />
  );
}
