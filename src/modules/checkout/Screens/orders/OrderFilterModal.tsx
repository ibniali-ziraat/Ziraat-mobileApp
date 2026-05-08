import { colors } from "@/src/constants/colors";
import { X } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    Modal,
    Pressable,
    Text,
    View
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedStatus: number | null;
  setSelectedStatus: (val: number | null) => void;
};

const STATUS_OPTIONS = [
  { label: "All", value: null },
  { label: "On the way", value: 50 },
  { label: "Delivered", value: 70 },
  { label: "Cancelled", value: 80 },
  { label: "Returned", value: 90 },
];

const TIME_OPTIONS = [
  { label: "Anytime", value: "all" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 6 months", value: "180" },
  { label: "Last year", value: "365" },
];

export default function OrderFilterModal({
  visible,
  onClose,
  selectedStatus,
  setSelectedStatus,
}: Props) {
  const [tempStatus, setTempStatus] = useState<number | null>(null);
  const [time, setTime] = useState("all");

  useEffect(() => {
    setTempStatus(selectedStatus);
  }, [selectedStatus, visible]);

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
            backgroundColor:colors.primary,
          }}
        />
      )}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      {/* BACKDROP */}
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
        onPress={onClose}
      >
        {/* SHEET */}
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
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              Filter Orders
            </Text>

            <Pressable onPress={onClose}>
              <X size={20}  />
            </Pressable>
          </View>

          {/* CONTENT */}
          <View style={{ paddingHorizontal: 16 }}>

            {/* STATUS */}
            <Text
              style={{
                marginTop: 16,
                marginBottom: 10,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Status
            </Text>

            {STATUS_OPTIONS.map((item) => {
              const isSelected = tempStatus === item.value;

              return (
                <Pressable
                  key={item.label}
                  onPress={() => setTempStatus(item.value)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    paddingVertical: 12,
                  }}
                >
                  <Radio active={isSelected} />
                  <Text style={{ fontSize: 14 }}>{item.label}</Text>
                </Pressable>
              );
            })}

            {/* TIME */}
            <Text
              style={{
                marginTop: 20,
                marginBottom: 10,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Time
            </Text>

            {TIME_OPTIONS.map((item) => {
              const isSelected = time === item.value;

              return (
                <Pressable
                  key={item.value}
                  onPress={() => setTime(item.value)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    paddingVertical: 12,
                  }}
                >
                  <Radio active={isSelected} />
                  <Text style={{ fontSize: 14 }}>{item.label}</Text>
                </Pressable>
              );
            })}
          </View>

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
                setTime("all");
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
              <Text style={{ fontWeight: "600", color: "#333" }}>
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