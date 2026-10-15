import BackHeader from "@/src/components/shared/BackHeader";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { colors } from "@/src/constants/colors";
import {
  AlertTriangle
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

const TermsScreen = () => {
  const [agreed, setAgreed] = useState(false);

  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By using Ziraat, you agree to comply with these Terms and all applicable agricultural safety regulations.",
     
    },
    {
      title: "Agricultural Usage",
      content:
        "The application is intended for lawful crop management, orchard tracking, and pesticide record keeping.",
   
    },
    {
      title: "Pesticide Responsibility",
      content:
        "Users are responsible for safe pesticide handling, correct dosage, and compliance with manufacturer instructions.",
    
    },
    {
      title: "Environmental Responsibility",
      content:
        "Ensure pesticide use does not cause harm to the environment, water sources, or public health.",
    
    },
    {
      title: "Data Protection",
      content:
        "Your agricultural data is securely stored and never sold to third parties.",
    
    },
    {
      title: "Limitation of Liability",
      content:
        "Ziraat is not liable for crop loss, financial damages, or regulatory penalties resulting from improper usage.",
     
    },
  ];

  return (
    <ScreenLayout>
      <BackHeader title="Terms & Conditions" />

      <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 60,
          }}
        >
          {/* Accent Line */}
          <View
            style={{
              height: 4,
              width: 60,
              backgroundColor: colors.primary,
              borderRadius: 10,
              marginBottom: 18,
            }}
          />

         <Text
  style={{
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.5,
  }}
>
  Terms of Service
</Text>

<Text
  style={{
    fontSize: 15,
    color: colors.darkHover,
    marginTop: 10,
    marginBottom: 36,
    lineHeight: 22,
  }}
>
  This document defines the legal conditions for using the Ziraat platform.
</Text>

          {/* Notice */}
         <View
  style={{
    borderRadius: 22,
    padding: 22,
    marginBottom: 44,
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.secondary + "40",
  }}
>
  {/* Top Row */}
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    }}
  >
    <View
      style={{
        backgroundColor: colors.secondary + "15",
        padding: 10,
        borderRadius: 12,
        marginRight: 12,
      }}
    >
      <AlertTriangle size={20} color={colors.secondary} />
    </View>

    <Text
      style={{
        fontSize: 16,
        fontWeight: "700",
        color: colors.secondary,
        letterSpacing: 0.3,
      }}
    >
      Important Safety Notice
    </Text>
  </View>

  {/* Divider */}
  <View
    style={{
      height: 1,
      backgroundColor: colors.cardBorder,
      marginBottom: 14,
    }}
  />

  {/* Content */}
  <Text
    style={{
      fontSize: 15,
      lineHeight: 24,
      color: colors.neutral,
    }}
  >
    This application provides agricultural guidance only. Always follow
    certified pesticide instructions, dosage standards, and local
    regulatory compliance requirements before application.
  </Text>
</View>

        {/* Section Heading */}
<View style={{ marginBottom: 18 }}>
  <Text
    style={{
      fontSize: 20,
      fontWeight: "700",
      color: colors.primary,
      marginBottom: 6,
    }}
  >
    Key Terms & Responsibilities
  </Text>

  <Text
    style={{
      fontSize: 14,
      color: colors.darkHover,
      lineHeight: 20,
    }}
  >
    The following terms define your responsibilities and safe usage
    guidelines while using the Ziraat agriculture platform.
  </Text>
</View>

{/* Sections Card */}
<View
  style={{
    backgroundColor: colors.light,
    borderRadius: 28,
    paddingVertical: 6,
   
    marginBottom: 40,
  }}
>
  {sections.map((item, index) => (
    <View
      key={index}
      style={{
        paddingVertical: 26,
        borderBottomWidth:
          index !== sections.length - 1 ? 1 : 0,
        borderBottomColor: colors.cardBorder,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        {/* Badge Column */}
        <View
          style={{
            alignItems: "center",
            marginRight: 16,
          }}
        >
          {/* Vertical Accent */}
          {index !== sections.length - 1 && (
            <View
              style={{
                position: "absolute",
                top: 42,
                width: 2,
                height: 75,
                backgroundColor: colors.primary + "20",
              }}
            />
          )}

          {/* Premium Number Badge */}
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
             
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: colors.light,
              }}
            >
              {index + 1}
            </Text>
          </View>
        </View>

        {/* Title + Content */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: colors.primary,
              marginBottom: 8,
            }}
          >
            {item.title}
          </Text>

          <Text
            style={{
              fontSize: 15,
              lineHeight: 24,
              color: colors.darkHover,
            }}
          >
            {item.content}
          </Text>
        </View>
      </View>
    </View>
  ))}
</View>

  

{/* Responsible Use Commitment */}
<View
  style={{
    backgroundColor: colors.primary + "08",
    borderRadius: 24,
    padding: 22,
    marginBottom: 36,
  }}
>
  <Text
    style={{
      fontSize: 16,
      fontWeight: "700",
      color: colors.primary,
      marginBottom: 10,
    }}
  >
    Responsible Agricultural Commitment
  </Text>

  <Text
    style={{
      fontSize: 14,
      lineHeight: 22,
      color: colors.darkHover,
    }}
  >
    By continuing to use this platform, you acknowledge your
    responsibility to apply agricultural chemicals safely,
    protect environmental resources, and comply with all
    regional farming regulations.
  </Text>
</View>

{/* Policy Version Info */}
<View
  style={{
    alignItems: "center",
    marginBottom: 28,
  }}
>
  <View
    style={{
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 50,
      backgroundColor: colors.primary + "12",
      marginBottom: 10,
    }}
  >
    <Text
      style={{
        fontSize: 12,
        fontWeight: "600",
        color: colors.primary,
        letterSpacing: 0.6,
      }}
    >
      POLICY VERSION 1.2
    </Text>
  </View>

  <Text
    style={{
      fontSize: 12,
      color: colors.darkHover,
      textAlign: "center",
      lineHeight: 18,
    }}
  >
    Effective from February 2026.  
    Ziraat reserves the right to update these terms as regulations evolve.
  </Text>
</View>

{/* Elegant Document End */}
<View
  style={{
    alignItems: "center",
    marginBottom: 10,
  }}
>
  <View
    style={{
      height: 1,
      width: "35%",
      backgroundColor: colors.cardBorder,
      marginBottom: 8,
    }}
  />
  <Text
    style={{
      fontSize: 12,
      color: colors.darkHover,
      letterSpacing: 0.6,
    }}
  >
    End of Legal Document
  </Text>
</View>

        
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              color: colors.darkHover,
            }}
          >
            Last Updated: February 2026
          </Text>
        </ScrollView>
      </View>
    </ScreenLayout>
  );
};

export default TermsScreen;