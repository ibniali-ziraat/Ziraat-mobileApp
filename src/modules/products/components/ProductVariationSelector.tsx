import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { cardTokens, chartTokens } from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { Pressable, View } from "react-native";

type Props = {
  product: any;
  selectedVariation: any;
  onSelectVariation: (variation: any) => void;
};

export default function ProductVariationSelector({
  product,
  selectedVariation,
  onSelectVariation,
}: Props) {
  const options = product?.vendorProduct?.availableOptions ?? [];
  const variations = product?.vendorProduct?.variations ?? [];

  if (!options.length || !variations.length) return null;

  const selectedValues: Record<number, string> = {};
  selectedVariation?.optionCombinations?.forEach((oc: any) => {
    selectedValues[oc.optionId] = oc.value;
  });

  const handleSelect = (optionId: number, value: string) => {
    const nextValues = { ...selectedValues, [optionId]: value };

    const match = variations.find(
      (v: any) =>
        v.optionCombinations?.length === Object.keys(nextValues).length &&
        v.optionCombinations.every(
          (oc: any) => nextValues[oc.optionId] === oc.value,
        ),
    );

    if (match) onSelectVariation(match);
  };

  return (
    <View style={{ marginTop: 20 }}>
      {options.map((option: any) => (
        <View key={option.id} className="mb-3">
          <CsText
            style={[
              typography.Poppins_s_semibold,
              { color: cardTokens.inkPrimary, fontSize: 14, marginBottom: 10 },
            ]}
          >
            {option.name}
          </CsText>

          <View className="flex-row flex-wrap" style={{ gap: 8 }}>
            {option.values.map((val: any) => {
              const isSelected = selectedValues[option.id] === val.key;

              const matchingVariation = variations.find((v: any) =>
                v.optionCombinations?.some(
                  (oc: any) =>
                    oc.optionId === option.id && oc.value === val.key,
                ),
              );
              const isAvailable =
                !!matchingVariation &&
                matchingVariation.isActive &&
                matchingVariation.stockQuantity > 0;

              return (
                <Pressable
                  key={val.key}
                  onPress={() => handleSelect(option.id, val.key)}
                  disabled={!isAvailable}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 9,
                    borderRadius: 14,
                    borderWidth: 1.5,
                    borderColor: isSelected
                      ? chartTokens.current
                      : cardTokens.hairline,
                    backgroundColor: isSelected
                      ? chartTokens.tint
                      : colors.light,
                    opacity: isAvailable ? 1 : 0.4,
                  }}
                >
                  <CsText
                    style={[
                      typography.Poppins_s_semibold,
                      {
                        color: isSelected
                          ? chartTokens.current
                          : cardTokens.inkPrimary,
                        fontSize: 13,
                      },
                    ]}
                  >
                    {val.display}
                  </CsText>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}
