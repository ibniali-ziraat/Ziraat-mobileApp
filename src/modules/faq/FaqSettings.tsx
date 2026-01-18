import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
import {
    FlatList,
    LayoutAnimation,
    Platform,
    TouchableOpacity,
    UIManager,
    View
} from "react-native";

import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import settingsFaq from "@/src/data/settingFaq.json";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

/* ---------- FAQ ITEM ---------- */

const FaqItem = ({ item }: any) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );
    setOpen(!open);
  };

  return (
    <View
      style={{
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: colors.cardBorder,
      }}
    >
      <TouchableOpacity
        onPress={toggle}
        activeOpacity={0.85}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <CsText style={[typography.Poppins_s_regular,

            {
            flex: 1,
           
            color: colors.dark,
            lineHeight: 21,
            paddingRight: 12,
          }
        ]}
          
        >
          {item.question}
        </CsText>

         
        <ChevronDown
          size={16}
          color={open ? colors.primary : colors.neutral}
          style={{
            transform: [{ rotate: open ? "180deg" : "0deg" }],
          }}
        />
      </TouchableOpacity>

      {open && (
        <CsText  
          style={[typography.Poppins_xs_regular,
            {
            marginTop: 10,
          
            lineHeight: 20,
            color: colors.neutral,
            maxWidth: "95%",
            }
         ]} 
        >
          {item.answer}
        </CsText>
      )}
    </View>
  );
};

/* ---------- MAIN SCREEN ---------- */

const FaqSettings = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <FlatList
        data={settingsFaq.sections}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={
          <ScreenContent>
            <View style={{ paddingTop: 28, paddingBottom: 18 }}>
              {/* TITLE */}
              <CsText  style={[typography.Poppins_l_semibold,
            {
           
            }
         ]} 
                
              >
             FAQs
              </CsText>

              {/* ACCENT */}
              <View
                style={{
                  width: 48,
                  height: 3,
                  backgroundColor: colors.primary,
                  borderRadius: 2,
                  marginTop: 8,
                  marginBottom: 12,
                }}
              />

              {/* SUBTITLE */}
              <CsText
                style={[typography.Poppins_xs_regular,
                  
                  {
                  lineHeight: 20,
                  color: colors.darkHover,
                  maxWidth: "95%",
                  }
               ] }
              >
                Find answers about pesticides, crop safety, usage guidelines,
                and responsible farming practices.
              </CsText>
            </View>
          </ScreenContent>
        }
        renderItem={({ item }) => (
          <ScreenContent>
            <View style={{ marginTop: 24 }}>
              {/* SECTION TITLE */}
              <CsText
                style={[typography.Poppins_xs_medium,{
                     color: colors.primary,
                  marginBottom: 10,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                } ]
                  
                 
                }
              >
                {item.title}
              </CsText>

              <View
                style={{
                 
                  borderRadius: 14,
                  paddingHorizontal: 16,
                }}
              >
                {item.data.map((faq: any, index: number) => (
                  <FaqItem key={index} item={faq} />
                ))}
              </View>
            </View>
          </ScreenContent>
        )}
        ListFooterComponent={
          <ScreenContent>
  <View
    style={{
      marginTop: 32,
      marginBottom: 24,
      backgroundColor: "#F9FAFB",
      borderRadius: 16,
      padding: 18,
    }}
  >
    <CsText
      style={[typography.Poppins_s_semibold,]}
    >
      Need more help?
    </CsText>

    <CsText
      style={[typography.Poppins_xs_regular,{
        color: colors.neutral,
        marginTop: 6,
        lineHeight: 18,
      }]}
    >
      Didn’t find what you were looking for? Our support team is just a tap
      away.
    </CsText>

    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        marginTop: 16,
        borderWidth: 1,
        borderColor: colors.primary,
        height: 44,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:colors.primary,
      }}
    >
      <CsText
        style={[typography.Poppins_s_semibold,
{ color: colors.light,
          
          }
        ]}
      >
        Contact Support
      </CsText>
    </TouchableOpacity>
  </View>
</ScreenContent>

        }
      />
    </View>
  );
};

export default FaqSettings;
