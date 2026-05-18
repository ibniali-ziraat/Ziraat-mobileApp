import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import { colors } from "@/src/constants/colors";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import {
  ChevronRight,
  FileText,
  HelpCircle,
  Lock,
  MapPin,
  PhoneCall,
  Shield,
  Trash2,
  User,
} from "lucide-react-native";
import { useRef } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";

/* ---------------- ROW ---------------- */

const Row = ({ icon, label, onPress, danger = false }) => {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
      }}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() =>
          Animated.spring(scale, {
            toValue: 0.985,
            useNativeDriver: true,
          }).start()
        }
        onPressOut={() =>
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }).start()
        }
        className="flex-row items-center justify-between py-4"
      >
        {/* LEFT */}
        <View className="flex-row items-center flex-1">
          <View className="mr-4">{icon}</View>

          <CsText
            style={{
              fontSize: 15,
              color: danger ? colors.error : colors.dark,
              fontWeight: "500",
            }}
          >
            {label}
          </CsText>
        </View>

        {/* RIGHT */}
        <ChevronRight
          size={18}
          color={colors.neutral}
          style={{ opacity: 0.5 }}
        />
      </Pressable>
    </Animated.View>
  );
};

/* ---------------- DIVIDER ---------------- */

const Divider = () => (
  <View
    className="ml-9 h-[1px]"
    style={{
      backgroundColor: colors.cardBorder,
    }}
  />
);

/* ---------------- SECTION TITLE ---------------- */

const SectionTitle = ({ title }) => (
  <Text
    style={{
      fontSize: 16,
      color: colors.neutral,
      fontWeight: "600",
      marginBottom: 12,
      marginTop: 28,
    }}
  >
    {title}
  </Text>
);

/* ---------------- SETTINGS SCREEN ---------------- */

export default function SettingsScreen() {
  return (
    <View
      className="py-4"
      style={{
        backgroundColor: colors.light,
      }}
    >
      <BackHeader
        title="Settings"
        desc="Manage your account preferences and privacy"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        <ScreenContent>
          <View>
            <SectionTitle title="Account" />

            <Row
              label="Profile"
              icon={<User size={22} color={colors.primary} />}
              onPress={() => router.push("/profile-view")}
            />

            <Divider />

            {/* <Row
              label="Change Password"
              icon={<Lock size={22} color={colors.dark} />}
              onPress={() =>
                router.push(ROUTES.ACCOUNT.CHANGE_PASSWORD)
              }
            /> */}

            {/* SUPPORT */}
            <SectionTitle title="Support & FAQs" />

            <Row
              label="Contact Support"
              icon={<PhoneCall size={22} color={colors.primary} />}
              onPress={() => router.push("/contact-Support")}
            />

            <Divider />

            <Row
              label="Add Address"
              icon={<MapPin size={22} color={colors.primary} />}
              onPress={() =>
                router.push(ROUTES.SHOPPING.CHECKOUT.CREATE_ADDRESS)
              }
            />

            <Divider />

            <Row
              label="FAQs"
              icon={<HelpCircle size={22} color={colors.primary} />}
              onPress={() => router.push("/faq")}
            />

            {/* PRIVACY */}
            <SectionTitle title="Privacy & Security" />

            <Row
              label="Privacy Policy"
              icon={<Shield size={22} color={colors.primary} />}
              onPress={() => router.push("/user/privacy")}
            />
            <Divider />

            <Row
              label="Terms & Conditions"
              icon={<FileText size={22} color={colors.primary} />}
              onPress={() => router.push("/user/terms")}
            />

            {/* ACCOUNT MANAGEMENT */}
            <SectionTitle title="Account Management" />

            <Row
              label="Change Password"
              icon={<Lock size={22} color={colors.primary} />}
              onPress={() => router.push(ROUTES.ACCOUNT.CHANGE_PASSWORD)}
            />
            <Row
              danger
              label="Delete Account"
              icon={<Trash2 size={22} color={colors.error} />}
              onPress={() => router.push("/user/delete-account")}
            />

            {/* FOOTER */}
            <View className="items-center mt-14">
              <CsText
                style={{
                  fontSize: 12,
                  color: colors.neutral,
                }}
              >
                Version 1.2.0.1
              </CsText>

              <CsText
                style={{
                  fontSize: 11,
                  color: colors.neutral,
                  marginTop: 4,
                }}
              >
                © 2026 Ziraat Smart Farming
              </CsText>
            </View>
          </View>
        </ScreenContent>
      </ScrollView>
    </View>
  );
}
