import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import {
  ChevronRight,
  HelpCircle,
  Lock,
  PhoneCall,
  Trash2,
  User
} from "lucide-react-native";
import { useRef } from "react";
import { Animated, Pressable, View } from "react-native";

const Row = ({ icon, label, onPress, danger = false }) => {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={() =>
          Animated.spring(scale, {
            toValue: 0.97,
            useNativeDriver: true,
          }).start()
        }
        onPressOut={() =>
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }).start()
        }
        className="flex-row items-center justify-between py-4 px-4"
      >
        <View className="flex-row items-center">
          {/* Icon bubble */}
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-4"
            style={{
              backgroundColor: danger
                ? `${colors.error}15`
                : `${colors.neutral}15`,
            }}
          >
            {icon}
          </View>

          <CsText
            style={{
              fontSize: 15,
              color: danger ? colors.error : colors.dark,
            }}
          >
            {label}
          </CsText>
        </View>

        <ChevronRight
          size={18}
          color={colors.neutral}
          style={{ opacity: 0.6 }}
        />
      </Pressable>
    </Animated.View>
  );
};

/* ---------------- DIVIDER ---------------- */

const Divider = () => (
  <View
    className="h-[1px] ml-16"
    style={{ backgroundColor: `${colors.neutral}15` }}
  />
);

/* ---------------- SECTION ---------------- */

const Section = ({ title, children }) => (
  <View className="mb-8">
    {title && (
      <CsText
        className="text-xs font-semibold mb-2 uppercase ml-1"
        style={{ color: colors.neutral }}
      >
        {title}
      </CsText>
    )}

    <View
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: colors.light,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      {children}
    </View>
  </View>
);

/* ---------------- SETTINGS PAGE ---------------- */

export default function SettingsScreen() {
  return (
    <View className="flex-1" style={{ backgroundColor: colors.light }}>
      <BackHeader title="Settings & Support" desc="Settings Hub" />

      <View className="px-4 mt-5">
        {/* Account */}
        <Section title="Account">
          <Row
            label="Profile"
            icon={<User size={22} color={colors.neutral} />}
            onPress={() => router.push("/profile-view")}
          />
          <Divider />

          <Row
            label="Change Password"
            icon={<Lock size={22} color={colors.neutral} />}
            onPress={() => router.push(ROUTES.ACCOUNT.CHANGE_PASSWORD)}
          />
        </Section>

        {/* Support */}
        <Section title="Support & FAQs">
          <Row
            label="Contact Support"
            icon={<PhoneCall size={22} color={colors.neutral} />}
            onPress={() => router.push("/contact-Support")}
          />
          <Divider />

          {/* <Row
            label="Add Address"
            icon={<MapPin size={22} color={colors.neutral} />}
            onPress={() => router.push("/user/add-addresses")}
          /> */}
          <Row
            label="FAQs"
            icon={<HelpCircle size={22} color={colors.neutral} />}
            onPress={() => router.push("/faq")}
          />
        </Section>

        {/* Privacy */}
        <Section title="Privacy & Security">
          {/* <Row
            label="Privacy Policy"
            icon={<Shield size={22} color={colors.neutral} />}
            onPress={() => router.push("/user/privacy")}
          /> */}
          <Divider />

          {/* <Row
            label="Terms & Conditions"
            icon={<FileText size={22} color={colors.neutral} />}
            onPress={() => router.push("/user/terms")}
          /> */}
        </Section>

        {/* Danger */}
        <Section title="Account Management">
          <Row
            label="Delete Account"
            danger
            icon={<Trash2 size={22} color={colors.error} />}
            onPress={() => router.push("/user/delete-account")}
          />
        </Section>

        {/* VERSION */}
        <View className="items-center mt-10 mb-2">
          <CsText
            style={{
              fontSize: 12,
              color: colors.neutral,
              letterSpacing: 0.6,
            }}
          >
            App Version v 1.2.0.1
          </CsText>
        </View>

        {/* FOOTER */}
        <View className="items-center mb-4">
          <CsText style={{ fontSize: 12, color: colors.neutral }}>
            © 2026 Ziraat • Smart Farming Solutions
          </CsText>
        </View>
      </View>
    </View>
  );
}
