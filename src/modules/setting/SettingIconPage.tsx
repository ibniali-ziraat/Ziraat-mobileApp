import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import { colors } from "@/src/constants/colors";
import Constants from "expo-constants";
import { router } from "expo-router";
import {
    Bell,
    BookOpen,
    ChevronRight,
    HelpCircle,
    Lock,
    PhoneCall,
    Trash2,
    User,
} from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";


const appVersion =
  Constants.expoConfig?.version ??
  Constants.manifest?.version ??
  "1.0.0";


const Row = ({ icon, label, onPress, danger = false }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.65}
    className="flex-row items-center justify-between  py-4"
  >
    <View className="flex-row items-center">
      <View
        className="w-10 h-10 rounded-full items-center justify-center mr-4"
        style={{
          backgroundColor: danger ? "#FEE2E2" : "#F3F4F6",
        }}
      >
        {icon}
      </View>

      <CsText
        style={{
          fontSize: 15,
          color: danger ? "#DC2626" : colors.dark,
        }}
      >
        {label}
      </CsText>
    </View>

    <ChevronRight
      size={18}
      color={danger ? "#DC2626" : "#9CA3AF"}
    />
  </TouchableOpacity>
);

/* ------------------ DIVIDER ------------------ */
const Divider = () => (
  <View
  className="h-[1px] ml-16"
  style={{ backgroundColor: `${colors.neutral}20` }}
/>
);

/* ------------------ SECTION ------------------ */
const Section = ({ title, children }) => (
  <View className="mb-8">
    {title && (
      <CsText className="text-xs font-semibold mb-2 uppercase" >
       
        {title}
      </CsText>
    )}

    <View
  className="rounded-2xl shadow-sm overflow-hidden"
  style={{ backgroundColor: colors.light }}
>
  {children}
</View>
  </View>
);

/* ------------------ SETTINGS PAGE ------------------ */
export default function SettingsPage() {
  return (
    <View className="flex-1"
    style={{backgroundColor:colors.light}}>
      <BackHeader title="Settings & Support" desc="Settings Hub" />

      <View className="px-4 mt-5">
        {/* Account */}
        <Section title="Account">
          <Row
            label="Profile"
            icon={<User size={22} color={colors.neutral} />}
            onPress={() => router.push("/user/user-profile")}
          />
          <Divider />

          <Row
            label="Change Password"
            icon={<Lock size={22} color={colors.neutral} />}
            onPress={() => router.push("/user/change-password")}
          />
          <Divider />

          <Row
            label="Notifications"
            icon={<Bell size={22} color={colors.neutral} />}
            onPress={() => router.push("/user/notifications")}
          />
        </Section>

        {/* Support */}
        <Section title="Support & FAQs">
          <Row
            label="Search FAQ"
            icon={<HelpCircle size={22} color={colors.neutral} />}
            onPress={() => router.push("/support/faq")}
          />
          <Divider />

          <Row
            label="Contact Support"
            icon={<PhoneCall size={22} color={colors.neutral} />}
            onPress={() => router.push("/support/contact")}
          />
          <Divider />

          <Row
            label="Help Center"
            icon={<BookOpen size={22} color={colors.neutral} />}
            onPress={() => router.push("/support/help-center")}
          />
        </Section>

        {/* Account Management */}
        <Section title="Account Management">
          <Row
            label="Delete Account"
            danger
            icon={<Trash2 size={22} color="#DC2626" />}
            onPress={() => router.push("/user/delete-account")}
          />
        </Section>

        {/* App Version (Centered, System Style) */}
        <View className="items-center mt-10 mb-4">
          <CsText
            style={{
              fontSize: 12,
              color: colors.neutral,
              letterSpacing: 0.6,
            }}
          >
            App Version v{appVersion}
          </CsText>
        </View>

        {/* Footer */}
        <View className="items-center mb-4">
          <CsText style={{ fontSize: 12, color: colors.neutral }}>
            © 2026 Ziraat • Smart Farming Solutions
          </CsText>
        </View>
      </View>
    </View>
  );
}
