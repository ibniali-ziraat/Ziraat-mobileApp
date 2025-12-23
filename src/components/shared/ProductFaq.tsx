import { colors } from "@/src/constants/colors";
import {
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Sparkles,
} from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CsText from "./CsText";

export default function ProductFaq({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <View className="p-1 bg-white"> 
      <CsText className="text-2xl font-bold mb-4 ms-2 text-dark">
        Frequently Asked Questions
     </CsText>

      {data.faq.map((q, index) => {
        const isOpen = activeIndex === index;

        return (
          <View
            key={index}
            className="
              mb-4  rounded-2xl border border-neutral bg-white p-4"
          >
            <TouchableOpacity
              onPress={() => toggleFAQ(index)}
              className="flex-row items-center justify-between"
              activeOpacity={0.8}
            >
              <View className="flex-row items-center gap-3 flex-1">
                <View className="p-2">
                  <CircleHelp size={18} color={colors.secondary} />
                </View>

                <CsText className="text-[16px] text-dark flex-1">
                  {q.question}
               </CsText>
              </View>

              {isOpen ? (
                <ChevronUp size={22} color={colors.dark} />
              ) : (
                <ChevronDown size={22} color={colors.dark} />
              )}
            </TouchableOpacity>

            {isOpen && (
              <View className="flex-row mt-2 gap-3 items-start">
                <View className="p-2">
                  <Sparkles size={18} color={colors.secondary} />
                </View>

                <CsText className="text-[15px] text-dark flex-1">
                  {q.answer}
               </CsText>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}