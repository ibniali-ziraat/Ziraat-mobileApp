import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/fonts/typography";
import { Search, X } from "lucide-react-native";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CsText from "./CsText";
import SearchBar from "./SearchBar";

const SprayHeader = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <View className="w-full bg-light px-1">
      {/* HEADER ROW */}
      <View className="flex-row items-center justify-between h-16">
        {/* Left */}
        <View>
          <CsText
            style={[typography.Poppins_m_semibold, { color: colors.dark }]}
          >
            Spray Records
          </CsText>
          <CsText
            style={[typography.Poppins_xs_regular, { color: colors.dark }]}
          >
            Manage your spray activities
          </CsText>
        </View>

        {/* Right */}
        <TouchableOpacity
          className="p-2 rounded-full"
          onPress={() => setShowSearch((prev) => !prev)}
        >
          <Search size={25} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      {showSearch && (
        <View
          className="
      absolute top-0 left-0 
      w-full h-full 
      bg-light 
      z-50
      justify-center
    "
        >
          <SearchBar
            search={search}
            setSearch={setSearch}
            RightIcon={X}
            onIconPress={() => {
              setSearch("");
              setShowSearch(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default React.memo(SprayHeader);
