
import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import {
    ChevronRight,
    Facebook,
    Globe,
    Instagram,
    MessageCircle,
    Phone,
    Twitter,
} from "lucide-react-native";
import {
    Linking,
    ScrollView,
    TouchableOpacity,
    View
} from "react-native";

/* ---------- Contact Row ---------- */

const ContactRow = ({ icon, title, subtitle, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        backgroundColor: colors.light,
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
      }}
    >
      {/* Icon */}
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.primary + "18",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>

      {/* Text */}
      <View style={{ marginLeft: 14, flex: 1 }}>
        <CsText
          style={[typography.Poppins_s_semibold,{ 
            fontWeight: "600",
            color: colors.dark,}]}
        >
          {title}
        </CsText>

        <CsText
          style={[typography.Poppins_xs_regular,{
             
            color: colors.dark,
            marginTop: 4,
            opacity: 0.85,
          }]}
        >
          {subtitle}
        </CsText>
      </View>

      {/* Arrow */}
      <ChevronRight size={18} color={colors.dark} />
    </TouchableOpacity>
  );
};

/* ---------- Screen ---------- */

export default function ContactUsScreen() {
  return (
    <ScrollView
      style={{ backgroundColor: colors.light }}
      showsVerticalScrollIndicator={false}
    >
      <ScreenContent>
        {/* Header */}
        <View style={{ paddingTop: 28, paddingBottom: 22 }}>
           <CsText  style={[typography.Poppins_l_semibold,
                      {
                     
                      }
                   ]} 
                          
                        >
                       Contact Support
                        </CsText>

          <View
            style={{
              width: 44,
              height: 3,
              backgroundColor: colors.primary,
              borderRadius: 2,
              marginTop: 8,
              marginBottom: 12,
            }}
          />

          <CsText
                         style={[typography.Poppins_xs_regular,
                           
                           {
                           lineHeight: 20,
                           color: colors.darkHover,
                           maxWidth: "95%",
                           }
                        ] }
                       >
            Contact our support team through any of the options below.
          </CsText>
        </View>

        {/* Contact List */}
        <ContactRow
          icon={<Phone size={18} color={colors.primary} />}
          title="Customer Support"
          subtitle="+91 98765 43210 (Mon–Sat, 9 AM – 6 PM)"
          onPress={() => Linking.openURL("tel:+919876543210")}
        />

        <ContactRow
          icon={<MessageCircle size={18} color={colors.primary} />}
          title="WhatsApp"
          subtitle="Chat with our agriculture experts"
          onPress={() =>
            Linking.openURL(
              "https://wa.me/919876543210?text=Hello%20I%20need%20support"
            )
          }
        />

        <ContactRow
          icon={<Globe size={18} color={colors.primary} />}
          title="Official Website"
          subtitle="www.agripesticide.com"
          onPress={() => Linking.openURL("https://www.agripesticide.com")}
        />

        <ContactRow
          icon={<Facebook size={18} color={colors.primary} />}
          title="Facebook"
          subtitle="Follow us for farming tips"
          onPress={() => Linking.openURL("https://facebook.com")}
        />

        <ContactRow
          icon={<Twitter size={18} color={colors.primary} />}
          title="Twitter"
          subtitle="Latest updates & announcements"
          onPress={() => Linking.openURL("https://twitter.com")}
        />

        <ContactRow
          icon={<Instagram size={18} color={colors.primary} />}
          title="Instagram"
          subtitle="Stories from farmers & fields"
          onPress={() => Linking.openURL("https://instagram.com")}
        />

        {/* Emergency Note */}
        <View
          style={{
            marginTop: 24,
            backgroundColor: "#FFF5F5",
            borderRadius: 18,
            padding: 16,
            marginBottom: 32,
          }}
        >
          <CsText
            style={[typography.Poppins_xs_semibold,{
                color: colors.error,
            }]}
          >
            Emergency Safety Notice
          </CsText>

          <CsText
            style={[typography.Poppins_xs_regular,
                { marginTop: 6,
            
              color: colors.error,
              lineHeight: 18,
              opacity: 0.9,}]}
          >
            In case of pesticide poisoning or severe exposure, immediately
            contact local medical services.
          </CsText>
        </View>
      </ScreenContent>
    </ScrollView>
  );
}
