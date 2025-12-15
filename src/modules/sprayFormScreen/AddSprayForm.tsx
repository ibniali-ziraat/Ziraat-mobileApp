import FormFileInput from "@/src/components/form/inputs/FormFileInput";
import FormInput from "@/src/components/form/inputs/FormInput";
import SingleSelectInput from "@/src/components/form/inputs/SingleSelectInput";

import { colors } from "@/src/constants/colors";
import { X } from "lucide-react-native";
import { FormProvider } from "react-hook-form";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import FormDateInput from "@/src/components/form/inputs/FormDateInput";
import { useZodForm } from "@/src/hooks/useZodForm";
import { SpraySchema } from "@/src/schemas/spraySchema/spraySchema";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddSprayScreen() {
  const methods = useZodForm(SpraySchema);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = methods;

  const orchards = [
    { label: "Apple Orchard A - Block 1", value: "Apple Orchard A - Block 1" },
    { label: "Apple Orchard A - Block 2", value: "Apple Orchard A - Block 2" },
    { label: "Cherry Lane - South", value: "Cherry Lane - South" },
    { label: "Vineyard Estate - North", value: "Vineyard Estate - North" },
  ];

  const units = [
    { label: "kg", value: "kg" },
    { label: "L", value: "L" },
    { label: "ml", value: "ml" },
    { label: "g", value: "g" },
  ];

  const onSubmit = (dta: any) => {
    console.log("Form Data:", dta);
  };

  return (
    <FormProvider {...methods}>
      <SafeAreaView className="flex-1" >
        <StatusBar barStyle="dark-content" backgroundColor={colors.light} />

        {/* HEADER */}
        <View className="px-4 py-3 flex-row items-center justify-between border-b border-neutral bg-light">
          <TouchableOpacity className="p-2 -ml-1">
            <X size={24} color={colors.dark} />
          </TouchableOpacity>

          <Text className="text-lg font-bold text-dark">New Spray Record</Text>

          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text className="text-primary font-bold text-base">Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-4 py-4">

          {/* LOCATION DETAILS */}
          <Text className="text-xs uppercase font-bold mb-2 ml-1 text-dark">
            Location Details
          </Text>

          <View className="rounded-xl p-4 mb-6 border border-neutral bg-light">

            <SingleSelectInput
              control={control}
              name="orchard"
              label="Orchard"
              options={orchards}
              error={errors?.orchard}
            />

            <FormInput
                  control={control}
                  name="targetCrop"
                  label="Target Crop"
                  error={errors?.targetCrop}
      
                />
          </View>

          {/* CHEMICAL INFO */}
          <Text className="text-xs uppercase font-bold mb-2 ml-1 text-dark">
            Chemical Info
          </Text>

          <View className="rounded-xl p-4 mb-6 border border-neutral bg-light">
            <FormInput
              control={control}
              name="pesticideName"
              label="Pesticide Name"
              error={errors?.pesticideName}
            
              
            />
            <FormInput
            control = {control}
            name = "brand"
            label = "Brand"
            error = {errors?.brand}
            // optional = {true}
            >
              

            </FormInput>

          
          </View>

          {/* APPLICATION DATA */}
          <Text className="text-xs uppercase font-bold mb-2 ml-1 text-dark">
            Application Data
          </Text>

          <View className="rounded-xl p-4 mb-6 border border-neutral bg-light">

            <View className="flex">
              <View className="flex-1">
                <SingleSelectInput
                  control={control}
                  name="unit"
                  label="Unit"
                  options={units}
                  error={errors?.unit}
                />
              </View>
              <View className="flex">
                <FormInput
                  control={control}
                  name="quantity"
                  label="Quantity"
                  keyboardType="numeric"
                  error={errors?.quantity}
                />
              </View>

              
            </View>

            <View className="flex-row gap-2 mt-2">
              <View className="flex-1">
                <FormInput
                  control={control}
                  name="cost"
                  label="Cost (₹)"
                  type="phone"
                
                  error={errors?.cost}
                />
              </View>

              <View className="flex">
                <FormDateInput
                  control={control}
                  name="sprayDate"
                  label="Date"
                  error={errors?.sprayDate}
                />
              </View>
            </View>
          </View>

          {/* MEDIA & NOTES */}
          <Text className="text-xs uppercase font-bold mb-2 ml-1 text-dark">
            Media & Notes
          </Text>

          <View className="rounded-xl p-4 mb-20 border border-neutral bg-light">
            <FormFileInput
              control={control}
              name="photo"
              label="Upload Spray Photo"
              optional
              error={errors?.photo}
            />

            <FormInput
              control={control}
              name="notes"
              label="Field Notes"
              optional
              multiline
              numberOfLines={3}
              error={errors?.notes}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </FormProvider>
  );
}
