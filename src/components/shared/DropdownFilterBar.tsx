import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { ChevronDown, Filter, Search } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  label?: string;
  options: Option[];
  value: string | number | null;
  onChange: (value: string | number) => void;
  searchable?: boolean;
}

export default function SimpleDropdownFilter({
  label,
  options,
  value,
  onChange,
  searchable = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const selectedLabel =
    options.find((o) => o.value === value)?.label || label || "Select";

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchText) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [options, searchText, searchable]);

  return (
    <View style={{ marginBottom: 16 }}>
      {/* Selector */}
      <Pressable
        onPress={() => setOpen((p) => !p)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: colors.neutral,
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: 12,
          backgroundColor: colors.light,
        }}
      >
        {/* Left: Filter icon + label */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Filter size={18} color={colors.dark} />

          <Text style={[typography.Poppins_m_regular, { color: colors.dark }]}>
            {selectedLabel}
          </Text>
        </View>

        {/* Right: Dropdown arrow */}
        <ChevronDown size={18} color={colors.dark} />
      </Pressable>

      {/* Dropdown */}
      {open && (
        <View
          style={{
            marginTop: 6,
            borderWidth: 1,
            borderColor: colors.neutral,
            borderRadius: 12,
            backgroundColor: colors.light,
            maxHeight: 220,
            overflow: "hidden",
          }}
        >
          {/* Search */}
          {searchable && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.neutral,
              }}
            >
              <Search size={16} color={colors.neutral} />
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search..."
                style={[
                  typography.Poppins_m_regular,
                  {
                    flex: 1,
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    color: colors.dark,
                  },
                ]}
              />
            </View>
          )}

          {/* Options */}
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.value.toString()}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onChange(item.value);
                  setOpen(false);
                  setSearchText("");
                }}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  backgroundColor:
                    item.value === value ? colors.primary + "22" : colors.light,
                }}
              >
                <Text
                  style={[
                    typography.Poppins_m_regular,
                    {
                      color:
                        item.value === value ? colors.primary : colors.dark,
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}
