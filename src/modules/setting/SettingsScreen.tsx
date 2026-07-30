import BackHeader from "@/src/components/shared/BackHeader";
import { Pressable } from "@/src/components/shared/Pressable";
import { ScreenContent } from "@/src/components/shared/ScreenContent";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import {
  cardShadow,
  cardTokens,
  chartTokens,
} from "@/src/constants/dashboardTheme";
import { typography } from "@/src/constants/fonts/typography";
import { ROUTES } from "@/src/constants/routes";
import { router } from "expo-router";
import {
  ChevronRight,
  FileText,
  HelpCircle,
  Lock,
  PhoneCall,
  Shield,
  type LucideIcon,
} from "lucide-react-native";
import { Text, View } from "react-native";

type SettingsRow = {
  label: string;
  /** One line on what the row does — the screen carries few rows, so each
   *  one says enough to be worth its space. */
  description: string;
  icon: LucideIcon;
  onPress: () => void;
};

type SettingsGroup = {
  title: string;
  rows: SettingsRow[];
};

const groups: SettingsGroup[] = [
  {
    title: "Account",
    rows: [
      {
        label: "Change Password",
        description: "Update the password you sign in with",
        icon: Lock,
        onPress: () => router.push(ROUTES.ACCOUNT.CHANGE_PASSWORD),
      },
    ],
  },
  {
    title: "Support & FAQs",
    rows: [
      {
        label: "Contact Support",
        description: "Talk to the Ziraat team about an issue",
        icon: PhoneCall,
        onPress: () => router.push("/contact-Support"),
      },
      {
        label: "FAQs",
        description: "Answers to the questions farmers ask most",
        icon: HelpCircle,
        onPress: () => router.push("/faq"),
      },
    ],
  },
  {
    title: "Privacy & Security",
    rows: [
      {
        label: "Privacy Policy",
        description: "What we collect and how it is handled",
        icon: Shield,
        onPress: () => router.push("/user/privacy"),
      },
      {
        label: "Terms & Conditions",
        description: "The terms you agreed to when you signed up",
        icon: FileText,
        onPress: () => router.push("/user/terms"),
      },
    ],
  },
];

function SettingsCard({ group }: { group: SettingsGroup }) {
  return (
    <View style={{ marginBottom: 22 }}>
      <Text
        style={[
          typography.Poppins_xs_medium,
          {
            color: cardTokens.inkMuted,
            fontSize: 11,
            marginBottom: 8,
            marginLeft: 4,
          },
        ]}
      >
        {group.title}
      </Text>

      <View
        style={[
          {
            borderRadius: cardTokens.radius,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: cardTokens.border,
            backgroundColor: cardTokens.surface,
            overflow: "hidden",
          },
          cardShadow,
        ]}
      >
        {group.rows.map((row, index) => {
          const Icon = row.icon;
          const isLast = index === group.rows.length - 1;

          return (
            <Pressable
              key={row.label}
              onPress={row.onPress}
              accessibilityRole="button"
              accessibilityHint={row.description}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                paddingVertical: 15,
                backgroundColor: pressed
                  ? cardTokens.mutedSurface
                  : cardTokens.surface,
              })}
            >
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 13,
                  borderCurve: "continuous",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: cardTokens.mutedSurface,
                }}
              >
                <Icon size={18} color={chartTokens.current} strokeWidth={1.9} />
              </View>

              <View style={{ flex: 1, marginLeft: 12, marginRight: 8 }}>
                <Text
                  numberOfLines={1}
                  style={[
                    typography.Poppins_s_medium,
                    { color: cardTokens.inkPrimary, fontSize: 14 },
                  ]}
                >
                  {row.label}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[
                    typography.Poppins_xs_regular,
                    {
                      color: cardTokens.inkMuted,
                      fontSize: 11,
                      marginTop: 2,
                    },
                  ]}
                >
                  {row.description}
                </Text>
              </View>

              <ChevronRight size={17} color={cardTokens.inkMuted} />

              {/* Hairline divider inset past the icon */}
              {!isLast ? (
                <View
                  style={{
                    position: "absolute",
                    left: 64,
                    right: 0,
                    bottom: 0,
                    height: 1,
                    backgroundColor: cardTokens.border,
                  }}
                />
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  return (
    <ScreenLayout>
      <BackHeader
        title="Settings"
        desc="Manage your account preferences and privacy"
      />

      {/* flex:1 + marginTop:auto on the footer keeps the version note pinned to
          the bottom, so a short list of rows still fills the screen. */}
      <ScreenContent className="flex-1">
        <View style={{ flex: 1, paddingTop: 8 }}>
          {groups.map((group) => (
            <SettingsCard key={group.title} group={group} />
          ))}

          <View style={{ marginTop: "auto", alignItems: "center", paddingTop: 32 }}>
            <View
              style={{
                width: 34,
                height: 3,
                borderRadius: 2,
                backgroundColor: chartTokens.track,
                marginBottom: 14,
              }}
            />
            <Text
              style={[
                typography.Poppins_xs_medium,
                { color: cardTokens.inkSecondary, fontSize: 12 },
              ]}
            >
              Version 1.2.0.1
            </Text>
            <Text
              style={[
                typography.Poppins_xs_regular,
                { color: cardTokens.inkMuted, fontSize: 11, marginTop: 3 },
              ]}
            >
              © 2026 Ziraat Smart Farming
            </Text>
          </View>
        </View>
      </ScreenContent>
    </ScreenLayout>
  );
}
