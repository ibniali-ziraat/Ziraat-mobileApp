import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const colors = {
  primary: "#2d6b06",
  primaryDark: "#245805",
  secondary: "#c7611f",
  secondaryDark: "#a64f18",
  secondaryLight: "#f7e9df",
};

const ALL_ROLES = ["Admin", "Billing", "Stock Manager", "Delivery Manager"];

export default function UserScreen() {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Arjun Singh",
      role: "Admin",
      email: "arjun.manager@example.com",
      active: true,
    },
    {
      id: 2,
      name: "Ravi Kumar",
      role: "Billing",
      email: "ravi.billing@example.com",
      active: true,
    },
    {
      id: 3,
      name: "Neha Sharma",
      role: "Stock Manager",
      email: "neha.stock@example.com",
      active: false,
    },
    {
      id: 4,
      name: "Danish Ali",
      role: "Delivery Manager",
      email: "danish.delivery@example.com",
      active: true,
    },
  ]);

  const activityLog = [
    { id: 1, text: "Arjun updated stock levels", time: "2 hrs ago" },
    { id: 2, text: "Ravi generated a new invoice", time: "5 hrs ago" },
    { id: 3, text: "Danish marked an order as delivered", time: "Yesterday" },
  ];

  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Admin");
  const [newActive, setNewActive] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);

  const filteredMembers =
    filter === "Active"
      ? teamMembers.filter((u) => u.active)
      : filter === "Disabled"
      ? teamMembers.filter((u) => !u.active)
      : teamMembers;

  // INITIALS FOR USER CARDS
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // INITIALS FOR ACTIVITY LOG USERS
  const getLogInitials = (text) => {
    const firstName = text.split(" ")[0];
    return firstName[0].toUpperCase();
  };

  // ICON SELECTOR
  const getActivityIcon = (text) => {
    if (text.includes("stock")) return "cube-outline";
    if (text.includes("invoice")) return "document-text-outline";
    if (text.includes("delivered")) return "bicycle-outline";
    return "time-outline";
  };

  // GROUP LOGS BY DATE
  const groupByDate = (logs) => {
    const groups = {};
    logs.forEach((item) => {
      const dateKey = item.time === "Yesterday" ? "Yesterday" : "Today";
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(item);
    });
    return groups;
  };

  const groupedLogs = groupByDate(activityLog);

  return (
    <View className="flex-1 bg-white">

       <ScrollView className="px-4 py-4">
              {/* Header */}
              <View className="mb-3">
                <Text className="text-[22px] font-extrabold" style={{ color: colors.primaryDark }}>
                users Overview
                </Text>
                <Text className="text-[12px] mt-1" style={{ color: "#6b7280" }}>
                  Cash & Credit Sale Management Dashboard
                </Text>
              </View>

        {/* FILTER TABS */}
        <View className="flex-row mb-4 mt-1">
          {["All", "Active", "Disabled"].map((item) => {
            const active = filter === item;
            return (
              <TouchableOpacity
                key={item}
                onPress={() => setFilter(item)}
                className="px-4 py-2 rounded-full mr-2"
                style={{
                  
                  borderWidth: active ? 1 : 0,
                  borderColor: active ? colors.secondaryDark : "transparent",
                }}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{ color: active ? colors.secondaryDark : "#777" }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* TEAM MEMBERS */}
        <Text className="text-black font-bold text-lg mb-3">Team Members</Text>

        {filteredMembers.map((user) => (
          <View
            key={user.id}
            className="bg-white rounded-xl p-4 mb-4 border"
            style={{ borderColor: "#e5e5e5" }}
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">

                <View
                  className="w-11 h-11 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.secondaryLight }}
                >
                  <Text className="font-bold" style={{ color: colors.secondaryDark }}>
                    {getInitials(user.name)}
                  </Text>
                </View>

                <View>
                  <Text className="font-semibold text-gray-900 text-sm">
                    {user.name}
                  </Text>
                  <Text className="text-xs text-gray-500">{user.email}</Text>
                </View>
              </View>

              <View
                className="px-3 py-[3px] rounded-full"
                style={{
                  backgroundColor: user.active ? "#e7f5ea" : "#fdeeee",
                }}
              >
                <Text
                  className="text-[11px] font-semibold"
                  style={{
                    color: user.active ? colors.primary : colors.secondaryDark,
                  }}
                >
                  {user.active ? "Active" : "Disabled"}
                </Text>
              </View>
            </View>

            <View
              className="mt-3 self-start px-3 py-[4px] rounded-full"
              style={{ backgroundColor: colors.secondaryLight }}
            >
              <Text
                className="text-[11px] font-semibold"
                style={{ color: colors.secondaryDark }}
              >
                {user.role}
              </Text>
            </View>
          </View>
        ))}

        {/* ROLES ACCORDION */}
        <Text className="text-black font-bold text-lg mt-5 mb-2">
          Available Roles & Permissions
        </Text>

        {[  
          {
            role: "Admin",
            desc: "Full control over billing, stock, team & settlements.",
            perms: [
              "Add/Delete team",
              "Manage stock",
              "Manage billing",
              "View all reports",
            ],
            icon: "shield-checkmark-outline",
            color: colors.secondary,
          },
          {
            role: "Billing",
            desc: "Handles invoices, payments & settlements.",
            perms: ["Create invoices", "Process payments", "View settlements"],
            icon: "document-text-outline",
            color: colors.secondary,
          },
          {
            role: "Stock Manager",
            desc: "Manages stock levels & product updates.",
            perms: ["Update stock", "Manage products", "Adjust quantities"],
            icon: "cube-outline",
            color: colors.secondary,
          },
          {
            role: "Delivery Manager",
            desc: "Handles dispatch & delivery completion.",
            perms: ["Assign delivery", "Track status", "Mark delivery done"],
            icon: "bicycle-outline",
            color: colors.secondary,
          },
        ].map((r, i) => (
          <View
            key={i}
            className="bg-white rounded-xl p-5 mb-4 border border-gray-200"
          >
            <TouchableOpacity
              onPress={() => setOpenAccordion(openAccordion === i ? null : i)}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-xl items-center justify-center">
                  <Ionicons name={r.icon} size={22} color={r.color} />
                </View>

                <View className="ml-3">
                  <Text className="font-semibold text-black">{r.role}</Text>
                  <Text className="text-xs text-black">{r.desc}</Text>
                </View>
              </View>

              <Ionicons
                name={openAccordion === i ? "chevron-up" : "chevron-down"}
                size={20}
                color="#777"
              />
            </TouchableOpacity>

            {openAccordion === i && (
              <View className="mt-3 pl-1">
                {r.perms.map((p, idx) => (
                  <Text key={idx} className="text-xs text-gray-700 mb-1">
                    • {p}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* ACTIVITY LOG */}
        <Text className="text-black font-bold text-lg mb-3">Activity Log</Text>

        {Object.keys(groupedLogs).map((date) => (
          <View key={date} className="mb-4">

            <Text className="text-xs text-gray-500 mb-2">{date}</Text>

            <View className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {groupedLogs[date].map((l, index) => (
                <View
                  key={l.id}
                  className="flex-row items-center px-4 py-4"
                  style={{
                    borderBottomWidth:
                      index !== groupedLogs[date].length - 1 ? 1 : 0,
                    borderBottomColor: "#e5e5e5",
                  }}
                >
                  {/* Avatar Initials */}
                  <View
                    className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-3"
                  >
                    <Text className="font-bold text-gray-700">
                      {getLogInitials(l.text)}
                    </Text>
                  </View>

                  {/* Text */}
                  <Text className="text-gray-800 text-sm flex-1 font-medium">
                    {l.text}
                  </Text>

                  {/* Icon */}
                  <Ionicons
                    name={getActivityIcon(l.text)}
                    size={22}
                    color={colors.secondary}
                    style={{ marginRight: 8 }}
                  />

                  {/* Time */}
                  <Text className="text-gray-500 text-[11px]">{l.time}</Text>
                </View>
              ))}
            </View>

          </View>
        ))}

      </ScrollView>

      {/* ADD MEMBER MODAL */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Add Team Member
            </Text>

            <TextInput
              placeholder="Full Name"
              className="border border-gray-300 rounded-xl px-4 py-3 mb-3"
              value={newName}
              onChangeText={setNewName}
            />

            <TextInput
              placeholder="Email Address"
              className="border border-gray-300 rounded-xl px-4 py-3 mb-3"
              value={newEmail}
              onChangeText={setNewEmail}
            />

            {/* Role Picker */}
            <View className="border border-gray-300 rounded-xl px-4 py-3 mb-3">
              <Text className="text-xs text-gray-600 mb-2">Role</Text>

              {ALL_ROLES.map((role) => (
                <TouchableOpacity
                  key={role}
                  onPress={() => setNewRole(role)}
                  className="py-2"
                >
                  <Text
                    style={{
                      color: newRole === role ? colors.primary : "#444",
                      fontWeight: newRole === role ? "700" : "400",
                    }}
                  >
                    {role}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ACTIVE SWITCH */}
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-gray-700">Active User</Text>
              <Switch
                value={newActive}
                onValueChange={setNewActive}
                trackColor={{ true: colors.secondaryLight, false: "#ccc" }}
                thumbColor={newActive ? colors.secondaryDark : "#666"}
              />
            </View>

            {/* FOOTER BUTTONS */}
            <View className="flex-row justify-end mt-2">
              <TouchableOpacity
                className="px-4 py-3 mr-3"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-gray-700 font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}
