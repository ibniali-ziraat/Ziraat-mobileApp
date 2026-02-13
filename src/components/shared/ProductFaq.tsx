import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CsText from "./CsText";

export default function ProductFaq({ data }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <View className="mt-6">

      {/* Header */}
      <CsText
        style={[typography.Poppins_l_semibold, { color: colors.dark }]}
        className="mb-4"
      >
        Frequently Asked Questions
      </CsText>

      {data.faq.map((q, index) => {
        const isOpen = activeIndex === index;

        return (
          <View key={index}>

            {/* Row */}
            <TouchableOpacity
              onPress={() => toggleFAQ(index)}
              activeOpacity={0.85}
              className="px-2 py-4"
              style={{
                backgroundColor: isOpen ? colors.secondary + "08" : "transparent",
                borderRadius: 12,
              }}
            >
              <View className="flex-row items-start">

                {/* Active Bar */}
                <View
                  className="w-[3px] mr-3 rounded-full"
                  style={{
                    backgroundColor: isOpen ? colors.secondary : "transparent",
                  }}
                />

                <View className="flex-1">
                  <View className="flex-row justify-between items-center">
                    <CsText
                      style={[
                        typography.Poppins_s_medium,
                        {
                          color: isOpen ? colors.secondary : colors.dark,
                        },
                      ]}
                      className="flex-1 pr-3"
                    >
                      {q.question}
                    </CsText>

                    {isOpen ? (
                      <ChevronUp size={20} color={colors.secondary} />
                    ) : (
                      <ChevronDown size={20} color={colors.dark} />
                    )}
                  </View>

                  {/* Answer */}
                  {isOpen && (
                    <CsText
                      style={[
                        typography.Poppins_s_regular,
                        {
                          color: colors.dark,
                          opacity: 0.75,
                          lineHeight: 21,
                        },
                      ]}
                      className="mt-3 pl-1"
                    >
                      {q.answer}
                    </CsText>
                  )}
                </View>
              </View>
            </TouchableOpacity>

            {/* Divider */}
            {!isOpen && (
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.dark,
                  opacity: 0.06,
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}
