import { colors } from "@/src/constants/colors";
import { menuGroups } from "@/src/navigation/menuGroups";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MenuScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <SectionTitle title="E-Commerce" />
        <MenuItem
          label="Marketplace"
          onPress={() => router.push("/marketplace")}
        />
        <MenuItem label="My Orders" onPress={() => router.push("/orders")} />
        <MenuItem label="My Cart" onPress={() => router.push("/cart")} />
        <MenuItem label="Wishlist" onPress={() => router.push("/wishlist")} />
        <MenuItem label="Profile" onPress={() => router.push("/profile")} />
        <MenuItem
          label="Saved Addresses"
          onPress={() => router.push("/addresses")}
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

/* ---------- COMPONENTS ---------- */

function SectionTitle({ title }) {
  return (
    <Text
      style={{
        color: colors.secondary,
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: 0.8,
      }}
    >
      {title}
    </Text>
  );
}

function MenuItem({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 14,
        backgroundColor: colors.light,
        borderBottomColor: colors.neutral,
        borderBottomWidth: 1,
      }}
    >
      <Text style={{ fontSize: 16, color: colors.dark }}>{label}</Text>
    </TouchableOpacity>
  );
}
