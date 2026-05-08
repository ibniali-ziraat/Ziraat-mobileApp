import { colors } from "@/src/constants/colors";

import {
  Check,
  Clock3,
  Eye,
  Filter,
  MessageSquareOff,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Trophy,
  X,
} from "lucide-react-native";

import { useState } from "react";

import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ───────────────── TYPES ─────────────────
type FilterState = {
  sort: string;
  noAnswers: boolean;
  closed: boolean;
  mostViewed: boolean;
  mostVoted: boolean;
  days: string;
};

// ───────────────── CHECKBOX ROW ─────────────────
const CheckboxRow = ({
  label,
  subtitle,
  active,
  onPress,
  icon,
}: {
  label: string;
  subtitle?: string;
  active: boolean;
  onPress: () => void;
  icon: React.ReactNode;
}) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: active ? colors.primary + "0d" : "#fff",
      borderWidth: 1.5,
      borderColor: active ? colors.primary + "50" : "#e8edf4",
      borderRadius: 18,
      paddingVertical: 14,
      paddingHorizontal: 14,
      marginBottom: 10,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 13,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: active ? colors.primary + "15" : "#f1f5f9",
        }}
      >
        {icon}
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "800",
            color: "#0f172a",
          }}
        >
          {label}
        </Text>

        {subtitle ? (
          <Text
            style={{
              fontSize: 12,
              color: "#94a3b8",
              marginTop: 2,
              lineHeight: 17,
            }}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>

    <View
      style={{
        width: 24,
        height: 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: active ? colors.primary : "transparent",
        borderWidth: active ? 0 : 2,
        borderColor: "#cbd5e1",
      }}
    >
      {active && <Check size={14} color="#fff" strokeWidth={3} />}
    </View>
  </TouchableOpacity>
);

// ───────────────── SORT ROW ─────────────────
const SortRow = ({
  label,
  subtitle,
  active,
  onPress,
  icon,
}: {
  label: string;
  subtitle: string;
  active: boolean;
  onPress: () => void;
  icon: React.ReactNode;
}) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: active ? colors.primary + "0d" : "#fff",
      borderWidth: 1.5,
      borderColor: active ? colors.primary + "50" : "#e8edf4",
      borderRadius: 18,
      paddingVertical: 14,
      paddingHorizontal: 14,
      marginBottom: 10,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 13,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: active ? colors.primary + "15" : "#f1f5f9",
        }}
      >
        {icon}
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "800",
            color: "#0f172a",
          }}
        >
          {label}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: "#94a3b8",
            marginTop: 2,
            lineHeight: 17,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </View>

    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 99,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: active ? colors.primary : "transparent",
        borderWidth: active ? 0 : 2,
        borderColor: "#cbd5e1",
      }}
    >
      {active && (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 99,
            backgroundColor: "#fff",
          }}
        />
      )}
    </View>
  </TouchableOpacity>
);

// ───────────────── SECTION HEADER ─────────────────
const SectionHeader = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      marginTop: 24,
      marginBottom: 12,
    }}
  >
    {icon}

    <Text
      style={{
        fontSize: 11,
        fontWeight: "800",
        color: "#94a3b8",
        letterSpacing: 1,
        textTransform: "uppercase",
      }}
    >
      {label}
    </Text>
  </View>
);

// ───────────────── STEPPER ─────────────────
const Stepper = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f1f5f9",
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: "#e8edf4",
      overflow: "hidden",
    }}
  >
    <TouchableOpacity
      onPress={() => onChange(Math.max(1, value - 1))}
      style={{
        width: 36,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          color: "#64748b",
          fontWeight: "700",
        }}
      >
        −
      </Text>
    </TouchableOpacity>

    <View
      style={{
        minWidth: 36,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "800",
          color: "#0f172a",
        }}
      >
        {value}
      </Text>
    </View>

    <TouchableOpacity
      onPress={() => onChange(value + 1)}
      style={{
        width: 36,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          color: "#64748b",
          fontWeight: "700",
        }}
      >
        +
      </Text>
    </TouchableOpacity>
  </View>
);

// ───────────────── MAIN MODAL ─────────────────
export default function FilterModal({
  visible,
  onClose,
  onApply,
}: {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}) {
  const [sort, setSort] = useState("newest");

  const [noAnswers, setNoAnswers] = useState(false);

  const [closed, setClosed] = useState(false);

  const [mostViewed, setMostViewed] = useState(false);

  const [mostVoted, setMostVoted] = useState(false);

  const [days, setDays] = useState(7);

  const handleReset = () => {
    setSort("newest");
    setNoAnswers(false);
    setClosed(false);
    setMostViewed(false);
    setMostVoted(false);
    setDays(7);
  };

  const handleApply = () => {
    onApply({
      sort,
      noAnswers,
      closed,
      mostViewed,
      mostVoted,
      days: String(days),
    });

    onClose();
  };

  const activeCount = [
    noAnswers,
    closed,
    mostViewed,
    mostVoted,
  ].filter(Boolean).length;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(2,6,23,0.5)",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose}
        />

        <View
          style={{
            backgroundColor: "#f8fafc",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 14,
            paddingHorizontal: 18,
            paddingBottom: 32,
            maxHeight: "88%",
          }}
        >
          {/* HANDLE */}
          <View
            style={{
              width: 42,
              height: 4,
              borderRadius: 99,
              backgroundColor: "#cbd5e1",
              alignSelf: "center",
              marginBottom: 18,
            }}
          />

          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "800",
                  color: "#0f172a",
                }}
              >
                Filters
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  color: "#94a3b8",
                  marginTop: 2,
                }}
              >
                Customize your discussion feed
              </Text>
            </View>

            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 40,
                height: 40,
                borderRadius: 99,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                borderWidth: 1.5,
                borderColor: "#e8edf4",
              }}
            >
              <X size={18} color="#64748b" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 10,
            }}
          >
            {/* FILTER BY */}
            <SectionHeader
              icon={<Filter size={13} color={colors.primary} />}
              label="Filter by"
            />

            <CheckboxRow
              label="No answers"
              subtitle="Questions with zero responses"
              active={noAnswers}
              onPress={() => setNoAnswers(!noAnswers)}
              icon={<MessageSquareOff size={18} color={colors.primary} />}
            />


            <CheckboxRow
              label="Most viewed"
              subtitle="Questions with highest views"
              active={mostViewed}
              onPress={() => setMostViewed(!mostViewed)}
              icon={<Eye size={18} color={colors.primary} />}
            />

            <CheckboxRow
              label="Most voted"
              subtitle="Questions with highest votes"
              active={mostVoted}
              onPress={() => setMostVoted(!mostVoted)}
              icon={<Trophy size={18} color={colors.primary} />}
            />

            {/* SORT BY */}
            <SectionHeader
              icon={<TrendingUp size={13} color={colors.primary} />}
              label="Sort by"
            />

            <SortRow
              label="Newest"
              subtitle="Most recently posted questions"
              active={sort === "newest"}
              onPress={() => setSort("newest")}
              icon={<Sparkles size={18} color={colors.primary} />}
            />

            <SortRow
              label="Recent Activity"
              subtitle="Questions with latest activity"
              active={sort === "activity"}
              onPress={() => setSort("activity")}
              icon={<Clock3 size={18} color={colors.primary} />}
            />

            <SortRow
              label="Trending"
              subtitle="Popular and active discussions"
              active={sort === "trending"}
              onPress={() => setSort("trending")}
              icon={<TrendingUp size={18} color={colors.primary} />}
            />

            {/* TIME RANGE */}
            <SectionHeader
              icon={<Clock3 size={13} color={colors.primary} />}
              label="Time range"
            />

            <View
              style={{
                backgroundColor: "#fff",
                borderWidth: 1.5,
                borderColor: "#e8edf4",
                borderRadius: 18,
                padding: 14,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "800",
                      color: "#0f172a",
                    }}
                  >
                    Days old
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      color: "#94a3b8",
                      marginTop: 2,
                    }}
                  >
                    Show questions older than
                  </Text>
                </View>

                <Stepper value={days} onChange={setDays} />
              </View>
            </View>
          </ScrollView>

          {/* ACTION BUTTONS */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginTop: 18,
            }}
          >
            <TouchableOpacity
              onPress={handleReset}
              activeOpacity={0.85}
              style={{
                flex: 1,
                backgroundColor: "#fff",
                borderWidth: 1.5,
                borderColor: "#e8edf4",
                borderRadius: 18,
                paddingVertical: 15,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 7,
              }}
            >
              <RotateCcw size={15} color="#64748b" />

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: "#64748b",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleApply}
              activeOpacity={0.85}
              style={{
                flex: 1.5,
                backgroundColor: colors.primary,
                borderRadius: 18,
                paddingVertical: 15,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 8,
              }}
            >
              <Sparkles size={15} color="#fff" />

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "800",
                  color: "#fff",
                  letterSpacing: 0.2,
                }}
              >
                Apply Filters
                {activeCount > 0 ? ` (${activeCount})` : ""}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}