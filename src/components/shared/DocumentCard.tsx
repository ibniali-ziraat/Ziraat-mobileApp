import { colors } from "@/src/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInLeft,
  FadeInUp,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// ======================= DOCUMENT DATA ==========================
const documents = [
  {
    title: "GST Certificate",
    status: "uploaded",
    type: "pdf",
    fileSize: "1.2 MB",
    category: "Tax Registration",
    updated: "12 Jan 2025",
    mandatory: true,
    validity: "Lifetime",
    id: "DOC-2281-GST",
    notes: "GST number matches business registry",
  },
  {
    title: "PAN Card",
    status: "uploaded",
    type: "image",
    fileSize: "420 KB",
    category: "Identity Verification",
    updated: "10 Jan 2025",
    mandatory: true,
    validity: "Lifetime",
    id: "DOC-9811-PAN",
    notes: "Clear and valid identity proof",
  },
  {
    title: "Bank Passbook",
    status: "verified",
    type: "image",
    fileSize: "610 KB",
    category: "Bank Information",
    updated: "14 Jan 2025",
    mandatory: true,
    validity: "Linked (Verified)",
    id: "DOC-4191-BNK",
    notes: "Account validation successful",
  },
  {
    title: "Business License",
    status: "verified",
    type: "pdf",
    fileSize: "2.4 MB",
    category: "Business Compliance",
    updated: "01 Jan 2025",
    mandatory: true,
    validity: "Expires 2028",
    id: "DOC-7811-LIC",
    notes: "Official trade license verified",
  },
  {
    title: "Food Safety Certificate",
    status: "pending",
    type: "pdf",
    fileSize: "1.1 MB",
    category: "Compliance",
    updated: "--",
    mandatory: false,
    validity: "--",
    id: "DOC-6611-FSC",
    notes: "Required only for perishable products",
  },
];

// ======================= STATUS BADGE ==========================
function StatusBadge({ status }) {
  const map = {
    verified: { icon: "checkmark-circle", text: "Verified", color: colors.primary },
    uploaded: { icon: "cloud-done-outline", text: "Uploaded", color: colors.secondary },
    pending: { icon: "alert-circle-outline", text: "Pending", color: colors.error },
  };

  const s = map[status];

  return (
    <View
      className="px-2 py-[3px] rounded-lg flex-row items-center"
      
    >
      <Ionicons name={s.icon} size={13} color={s.color} />
      <Text className="ml-1 text-[10px] font-semibold" style={{ color: s.color }}>
        {s.text}
      </Text>
    </View>
  );
}

// ======================= FILE ICON ==========================
function FileTypeIcon({ type, color }) {
  const icons = {
    pdf: "file-pdf-box",
    image: "image",
    zip: "zip-box",
    other: "file-document-outline",
  };

  return <MaterialCommunityIcons name={icons[type] || icons.other} size={24} color={color} />;
}

// ======================= INFO ROW ==========================
function InfoRow({ label, value }) {
  return (
    <Text className="text-[12px] mb-1" style={{ color: colors.dark }}>
      {label}: <Text className="font-semibold">{value}</Text>
    </Text>
  );
}

// ======================= MAIN CARD ==========================
export default function DocumentCard() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <Animated.View
      entering={FadeInUp.duration(650)}
      layout={Layout.springify()}
      className="mt-4 "
      
    >
      {/* ================= HEADER ================= */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-lg font-extrabold" style={{ color: colors.dark }}>
            Documents & Verification
          </Text>
          <Text className="text-[11px] mt-[2px]" style={{ color: colors.dark }}>
            Legal, compliance and business verification
          </Text>
        </View>

        <View
          className="w-10 h-10 rounded-xl items-center justify-center"
         
        >
          <Ionicons name="folder-open" size={22} color={colors.primary} />
        </View>
      </View>

      {/* ================= DOCUMENT LIST ================= */}
      <View className="mt-5">

        {documents.map((doc, index) => {
          const color =
            doc.status === "verified"
              ? colors.primary
              : doc.status === "uploaded"
              ? colors.secondary
              : colors.error;

          const isOpen = openIndex === index;

          // Press animation
          const scale = useSharedValue(1);
          const pressStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
          }));

          return (
            <Animated.View
              key={index}
              entering={FadeInLeft.delay(index * 90)}
              layout={Layout.springify()}
              className="rounded-xl overflow-hidden mb-3"
              
            >
              {/* CARD HEADER */}
              <Pressable
                onPressIn={() => (scale.value = withSpring(0.97))}
                onPressOut={() => (scale.value = withSpring(1))}
                onPress={() => toggle(index)}
                style={{ padding: 16 }}
                
              >
                <Animated.View style={pressStyle} className="flex-row justify-between">
                  {/* LEFT SIDE */}
                  <View className="flex-row items-center">
                    <View
                      className="w-12 h-12 rounded-xl items-center justify-center"
                      
                    >
                      <FileTypeIcon type={doc.type} color={color} />
                    </View>

                    {/* TEXT SECTION */}
                    <View className="ml-3">
                      <Text className="text-sm font-semibold" style={{ color: colors.dark }}>
                        {doc.title}
                      </Text>

                      <Text className="text-[10px] mt-[1px]" style={{ color: colors.dark }}>
                        Size: {doc.fileSize} • Type: {doc.type.toUpperCase()}
                      </Text>

                      <Text className="text-[10px] mt-[1px]" style={{ color: colors.dark }}>
                        Updated: {doc.updated}
                      </Text>

                      <Text className="text-[11px] mt-[1px]" style={{ color: colors.dark }}>
                        {doc.category}
                      </Text>
                    </View>
                  </View>

                  {/* RIGHT SIDE */}
                  <View className="items-end">
                    <StatusBadge status={doc.status} />

                    <Ionicons
                      name={isOpen ? "chevron-up" : "chevron-down"}
                      size={18}
                      color={colors.dark}
                      style={{ marginTop: 8 }}
                    />
                  </View>
                </Animated.View>
              </Pressable>

              {/* ================= EXPANDED SECTION ================= */}
              {isOpen && (
                <Animated.View
                  entering={FadeInUp.duration(300)}
                  className="px-5 pb-5 pt-2 border-t"
                  style={{ borderColor: colors.neutral }}
                >
                  <View className="mt-3">
                    <InfoRow label="Document ID" value={doc.id} />
                    <InfoRow label="File Size" value={doc.fileSize} />
                    <InfoRow label="Last Updated" value={doc.updated} />
                    <InfoRow label="Validity" value={doc.validity} />
                  </View>

                  <Text className="text-[12px] mt-3" style={{ color: colors.dark }}>
                    Notes: <Text className="font-medium">{doc.notes}</Text>
                  </Text>

                  <TouchableOpacity
                    className="rounded-full px-5 py-2 mt-4"
                    style={{
                      backgroundColor: colors.primary,
                      shadowColor: "#000",
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                  >
                    <Text className="text-white text-[12px] font-semibold text-center">
                      View Document
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </Animated.View>
          );
        })}
      </View>
    </Animated.View>
  );
}
