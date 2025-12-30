import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import {
  ChevronDown,
  ChevronUp
} from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CsText from "./CsText";
import ZiraatCard from "./ZiraatProfileCard";

export default function ProductFaq({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <View className=" bg-light"> 
      <CsText 
      style={[typography.Poppins_l_semibold]}
      
      className=" mb-4 ms-2 text-dark">
        Frequently Asked Questions
     </CsText>

      {data.faq.map((q, index) => {
        const isOpen = activeIndex === index;

        return (
          <ZiraatCard
          width="100%"
          marginBottom={1}
          paddingHorizontal={1}
          paddingVertical={1.5}
          >
            <View
            key={index}
            
          >
            <TouchableOpacity
              onPress={() => toggleFAQ(index)}
              className="flex-row items-center justify-between"
              activeOpacity={0.8}
            >
              <View className="flex-row items-center flex-1">
                <View className="p-2">
                </View>

                <CsText 
                style={[typography.Poppins_s_medium]}
                
                className=" text-dark flex-1">
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
              <View className="flex-row pt-3 gap-3 items-start">
                <View className="p-2">
                </View>

                <CsText 
                
                style={[typography.Poppins_s_regular]}
                
                className=" text-dark flex-1">
                  {q.answer}
               </CsText>
              </View>
            )}
          </View>
          </ZiraatCard>
        );
      })}
    </View>
  );
}