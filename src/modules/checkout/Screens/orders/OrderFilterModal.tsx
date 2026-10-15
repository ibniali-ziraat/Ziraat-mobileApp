import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useOrderStatuses } from "../../hooks/orderStatusQueryHooks";

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedStatus: number | null;
  setSelectedStatus: (val: number | null) => void;
};

export default function OrderFilterModal({
  visible,
  onClose,
  selectedStatus,
  setSelectedStatus,
}: Props) {
  const [tempStatus, setTempStatus] = useState<number | null>(null);
  const { data: statuses = [] } = useOrderStatuses(); // ✅ from API

  useEffect(() => {
    setTempStatus(selectedStatus);
  }, [selectedStatus, visible]);

  const STATUS_OPTIONS = [
    { label: "All", value: null },
    ...statuses.map((s) => ({ label: s.name, value: s.id })),
  ];

  const Radio = ({ active }: { active: boolean }) => (
    <View
      style={{
        height: 22,
        width: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: active ? colors.primary : "#ccc",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {active && (
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}
        onPress={onClose}
      >
        <View
          style={{
            marginTop: "auto",
            backgroundColor: colors.light,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "85%",
          }}
        >
          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              borderBottomWidth: 1,
              borderColor: colors.cardBorder,
            }}
          >
            <Text
              style={[
                typography.Poppins_s_semibold,
                { fontSize: 17, color: colors.dark },
              ]}
            >
              Filter Orders
            </Text>
            <Pressable onPress={onClose}>
              <X size={20} color={colors.dark} />
            </Pressable>
          </View>

          {/* CONTENT */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          >
            <Text
              style={[
                typography.Poppins_s_semibold,
                {
                  marginTop: 16,
                  marginBottom: 10,
                  fontSize: 16,
                  color: colors.neutral,
                },
              ]}
            >
              Status
            </Text>

            {STATUS_OPTIONS.map((item) => {
              const isSelected = tempStatus === item.value;
              return (
                <Pressable
                  key={String(item.value ?? "all")}
                  onPress={() => setTempStatus(item.value)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    paddingVertical: 12,
                  }}
                >
                  <Radio active={isSelected} />
                  <Text style={{ fontSize: 16, color: colors.dark }}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* FOOTER */}
          <View
            style={{
              flexDirection: "row",
              padding: 16,
              borderTopWidth: 1,
              borderColor: colors.cardBorder,
              gap: 10,
            }}
          >
            <Pressable
              onPress={() => {
                setTempStatus(null);
                setSelectedStatus(null);
                onClose();
              }}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors.cardBorder,
                paddingVertical: 14,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "600", color: colors.dark }}>
                CLEAR FILTERS
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setSelectedStatus(tempStatus);
                onClose();
              }}
              style={{
                flex: 1,
                backgroundColor: colors.primary,
                paddingVertical: 14,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.light, fontWeight: "700" }}>
                APPLY
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
