import { FlatList, Linking, TouchableOpacity, View } from "react-native";

import FormFileInput from "@/src/components/form/inputs/FormFileInput";
import CsText from "@/src/components/shared/CsText";

export default function SoilTestReportsSection({
  control,
  errors,
  reports,
  onDelete,
}) {
  const renderItem = ({ item, index }) => (
    <View className="bg-white p-4 rounded-xl mb-3 border border-gray-200">
      <CsText className="font-semibold">Soil Report {index + 1}</CsText>

      <View className="flex-row gap-3 mt-3">
        <TouchableOpacity
          onPress={() => Linking.openURL(item.fileUrl)}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          <CsText className="text-white">View</CsText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          <CsText className="text-white">Delete</CsText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      {/* Upload */}
      <FormFileInput
        control={control}
        name="file"
        label="Upload Soil Test Report"
        error={errors?.file}
      />

      {/* List */}
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <CsText className="text-gray-400 mt-4">No reports uploaded</CsText>
        }
      />
    </View>
  );
}
