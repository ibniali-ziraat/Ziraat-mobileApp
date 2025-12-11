import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Animated, {
  FadeInLeft,
  FadeInUp,
  Layout,
} from "react-native-reanimated";

// ROLE COLOR ACCENTS
const roleAccent = {
  Driver: colors.primary,
  "Delivery Helper": colors.secondary,
  "Fleet Manager": colors.warning,
};

// ROLE ICON MAP
const roleIcons = {
  Driver: "car-outline",
  "Delivery Helper": "person-outline",
  "Fleet Manager": "briefcase-outline",
};

// SAMPLE TEAM
const team = [
  {
    name: "Mehmet Can",
    role: "Driver",
    status: "Active",
    vehicle: { type: "Mini Truck", model: "Tata Ace", regNo: "MH 12 AB 4455" },
    manpower: 1,
  },
  {
    name: "Sevun",
    role: "Delivery Helper",
    status: "Active",
    vehicle: null,
    manpower: 1,
  },
  {
    name: "Ali Khan",
    role: "Fleet Manager",
    status: "Active",
    vehicle: { type: "Pickup Van", model: "Mahindra Bolero", regNo: "DL 09 XY 2291" },
    manpower: 3,
  },
  {
    name: "Rohan Singh",
    role: "Driver",
    status: "Inactive",
    vehicle: { type: "E-Scooter", model: "Ola S1", regNo: "UP 14 MN 9031" },
    manpower: 0,
  },
];

// STATUS BADGE (with online dot)
function StatusBadge({ status }) {
  const isActive = status === "Active";

  return (
    <View className="flex-row items-center">
      {/* ONLINE DOT */}
      <View
        className="w-2 h-2 rounded-full mr-1"
        style={{
          backgroundColor: isActive ? colors.primary : colors.error,
        }}
      />

      <Text
        className="text-[11px] font-semibold"
        style={{
          color: isActive ? colors.primary : colors.error,
        }}
      >
        {status}
      </Text>
    </View>
  );
}

// AVATAR INITIALS
function Avatar({ name, color }) {
  const initials = name
    .split(" ")
    .map((i) => i[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <View
      className="w-12 h-12 rounded-full items-center justify-center"
      style={{ backgroundColor: color + "22" }}
    >
      <Text
        className="font-bold text-base"
        style={{ color }}
      >
        {initials}
      </Text>
    </View>
  );
}

// MAIN COMPONENT
export default function TeamCard() {
  return (
    <Animated.View
      entering={FadeInUp.duration(600)}
      layout={Layout.springify()}
      className="mt-4"
     
    >
      {/* HEADER */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-extrabold" style={{ color: colors.dark }}>
            Delivery Team Overview
          </Text>
          <Text className="text-[11px] mt-[2px]" style={{ color: colors.dark }}>
            Team • Roles • Fleet Assignments
          </Text>
        </View>

        <Ionicons name="people-circle" size={28} color={colors.primary} />
      </View>

      {/* TEAM LIST */}
      <View className="mt-5">
        {team.map((member, index) => {
          const isActive = member.status === "Active";
          const accent = roleAccent[member.role] || colors.primary;

          return (
            <Animated.View
              key={index}
              entering={FadeInLeft.delay(index * 120)}
              layout={Layout.springify()}
              className="p-4 rounded-xl mb-3"
                 style={{
        backgroundColor: "#fff",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
         }}   >
              {/* TOP ROW — Avatar + Name + Status */}
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Avatar name={member.name} color={accent} />

                  <View className="ml-3">
                    <Text className="font-semibold text-sm" style={{ color: colors.dark }}>
                      {member.name}
                    </Text>
                    <View className="flex-row items-center mt-[1px]">
                      <Ionicons
                        name={roleIcons[member.role]}
                        size={16}
                        color={accent}
                      />
                      <Text className="ml-1 text-[11px]" style={{ color: colors.dark }}>
                        {member.role}
                      </Text>
                    </View>
                  </View>
                </View>

                <StatusBadge status={member.status} />
              </View>

              {/* DETAILS SECTION */}
              <View className="mt-3 ml-1">

                {/* VEHICLE DETAILS */}
                {member.vehicle && (
                  <>
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="car-sport-outline" size={16} color={colors.secondary} />
                      <Text className="ml-2 text-xs" style={{ color: colors.dark }}>
                        {member.vehicle.type} — {member.vehicle.model}
                      </Text>
                    </View>

                    <Text className="ml-8 text-[11px]" style={{ color: colors.dark }}>
                      Reg No: {member.vehicle.regNo}
                    </Text>
                  </>
                )}

                {/* MANPOWER */}
                <View className="flex-row items-center mt-2">
                  <Ionicons name="people-outline" size={16} color={colors.primary} />
                  <Text className="ml-2 text-xs" style={{ color: colors.dark }}>
                    Assigned Manpower: {member.manpower}
                  </Text>
                </View>
              </View>
            </Animated.View>
          );
        })}
      </View>
    </Animated.View>
  );
}
