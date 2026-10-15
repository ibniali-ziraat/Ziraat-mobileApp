import { colors } from "@/src/constants/colors";
import { menuGroups } from "@/src/navigation/MenuLinks";
import { router } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import CsText from "./shared/CsText";

export default function MenuList() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <SectionTitle title="E-Commerce" />
        <MenuItem
          label="Marketplace"
          menu
          onPress={() => router.push("/marketplace")}
        />
        <MenuItem label="My Orders" onPress={() => router.push("/orders")} />
        <MenuItem label="My Cart" onPress={() => router.push("/cart")} />
        <MenuItem label="Wishlist" onPress={() => router.push("/wishlist")} />
        <MenuItem label="Profile" onPress={() => router.push("/profile")} />
        <MenuItem
          label="Saved Addresses"
          onPress={() => router.push("/ad dresses")}
        />

        <MenuItem
          label="Payment Methods"
          onPress={() => router.push("/payments")}
        />
        <MenuItem label="Support" onPress={() => router.push("/support")} />

        {menuGroups.map((group) => (
          <View key={group.title} style={{ marginTop: 28 }}>
            <SectionTitle title={group.title} />
            {group.routes.map((route) => (
              <MenuItem
                key={route.screen}
                label={route.label}
                onPress={() => router.push(`/${route.screen}`)}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function SectionTitle({ title }) {
  return (
    <CsText
      style={{
        color: colors.secondary,
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: 0.8,
      }}
    >
      {title}
    </CsText>
  );
}

function MenuItem({ label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 14,
        backgroundColor: colors.light,
        borderBottomColor: colors.neutral,
        borderBottomWidth: 1,
      }}
    >
      <CsText style={{ fontSize: 17, color: colors.dark }}>{label}</CsText>
    </Pressable>
  );
}
