import { colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import Animated, {
  FadeInLeft,
  FadeInUp,
  Layout,
} from "react-native-reanimated";
import CsText from "./CsText";

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

      <CsText
        className="text-[12.5px] font-semibold"
        style={{
          color: isActive ? colors.primary : colors.error,
        }}
      >
        {status}
     </CsText>
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
      <CsText
        className="font-bold text-base"
        style={{ color }}
      >
        {initials}
     </CsText>
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
          <CsText className="text-lg font-extrabold" style={{ color: colors.dark }}>
            Delivery Team Overview
         </CsText>
          <CsText className="text-[12.5px] mt-[2px]" style={{ color: colors.dark }}>
            Team • Roles • Fleet Assignments
         </CsText>
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
                    <CsText className="font-semibold text-sm" style={{ color: colors.dark }}>
                      {member.name}
                   </CsText>
                    <View className="flex-row items-center mt-[1px]">
                      <Ionicons
                        name={roleIcons[member.role]}
                        size={16}
                        color={accent}
                      />
                      <CsText className="ml-1 text-[12.5px]" style={{ color: colors.dark }}>
                        {member.role}
                     </CsText>
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
                      <CsText className="ml-2 text-xs" style={{ color: colors.dark }}>
                        {member.vehicle.type} — {member.vehicle.model}
                     </CsText>
                    </View>

                    <CsText className="ml-8 text-[12.5px]" style={{ color: colors.dark }}>
                      Reg No: {member.vehicle.regNo}
                   </CsText>
                  </>
                )}

                {/* MANPOWER */}
                <View className="flex-row items-center mt-2">
                  <Ionicons name="people-outline" size={16} color={colors.primary} />
                  <CsText className="ml-2 text-xs" style={{ color: colors.dark }}>
                    Assigned Manpower: {member.manpower}
                 </CsText>
                </View>
              </View>
            </Animated.View>
          );
        })}
      </View>
    </Animated.View>
  );
}
