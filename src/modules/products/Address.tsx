import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import { typography } from "@/src/constants/fonts/typography";
import { toast } from "@backpackapp-io/react-native-toast";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useCountries, useStates } from "./hooks/Address/useAddress";
import { useCreateAddress } from "./hooks/data/useCheckout";

const AddressPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [stateModalVisible, setStateModalVisible] = useState(false);

  const [form, setForm] = useState({
    id: 0,
    contactName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    zipCode: "",
    city: "",
    stateOrProvinceId: 0,
    districtId: 0,
    countryId: "",
    countryName: "",
    stateName: "",
  });

  const { data: countries, isLoading } = useCountries();
  const { data: states, isLoading: statesLoading } = useStates(form.countryId);

  const { mutate: handleCreateAddress, isPending } = useCreateAddress();

  /* ================= SAVE ADDRESS ================= */
  const handleSave = () => {
    if (
      !form.contactName ||
      !form.phone ||
      !form.addressLine1 ||
      !form.zipCode ||
      !form.city ||
      !form.countryId ||
      !form.stateOrProvinceId
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      ...form,
      stateOrProvinceId: Number(form.stateOrProvinceId),
      districtId: Number(form.districtId),
      displayDistrict: true,
      displayZipCode: true,
      displayCity: true,
    };

    console.log("ADDRESS PAYLOAD:", payload);

    handleCreateAddress(payload, {
      onSuccess: () => {
        toast.success("Address saved successfully");
        setModalVisible(false);
      },
      onError: () => toast.error("Failed to save address"),
    });
  };

  /* ================= COUNTRY SELECT ================= */
  const handleSelectCountry = (country) => {
    setForm({
      ...form,
      countryId: country.id,
      countryName: country.name,
      stateOrProvinceId: 0,
      stateName: "",
    });

    setCountryModalVisible(false);
  };

  /* ================= STATE SELECT ================= */
  const handleSelectState = (state) => {
    setForm({
      ...form,
      stateOrProvinceId: state.id,
      stateName: state.name,
    });

    setStateModalVisible(false);
  };

  const InputLabel = ({ children }) => (
    <CsText
      style={[typography.Poppins_xs_medium]}
      className="text-gray-500 mb-1 ml-1 uppercase"
    >
      {children}
    </CsText>
  );

  return (
    <ScreenLayout>
      <BackHeader
        title="Address Details"
        desc="Manage your delivery locations"
      />

      <View className="px-4 mt-6">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
          className="border-2 border-dashed border-primary/30 bg-primary/5 py-4 rounded-2xl items-center justify-center"
        >
          <CsText style={[typography.Poppins_s_bold]} className="text-primary">
            + Add New Address
          </CsText>
        </TouchableOpacity>
      </View>

      {/* ================= MAIN ADDRESS MODAL ================= */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 bg-black/50 justify-end">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View className="bg-white rounded-t-[30px] px-6 pt-6 pb-10 shadow-xl">
              <View className="flex-row justify-between items-center mb-6">
                <CsText style={[typography.Poppins_m_bold]}>New Address</CsText>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <CsText className="text-gray-400">Close</CsText>
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                className="max-h-[65vh]"
              >
                <View className="space-y-4">
                  <View>
                    <InputLabel>Contact Name</InputLabel>
                    <TextInput
                      placeholder="e.g. John Doe"
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                      value={form.contactName}
                      onChangeText={(t) => setForm({ ...form, contactName: t })}
                    />
                  </View>

                  <View>
                    <InputLabel>Phone Number</InputLabel>
                    <TextInput
                      placeholder="+1 234 567 890"
                      keyboardType="phone-pad"
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                      value={form.phone}
                      onChangeText={(t) => setForm({ ...form, phone: t })}
                    />
                  </View>

                  <View className="h-[1px] bg-gray-100 my-2" />

                  {/* COUNTRY */}
                  <View>
                    <InputLabel>Country</InputLabel>
                    <TouchableOpacity
                      onPress={() => setCountryModalVisible(true)}
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row justify-between"
                    >
                      <CsText
                        className={
                          form.countryName ? "text-black" : "text-gray-400"
                        }
                      >
                        {form.countryName || "Select Country"}
                      </CsText>
                      <CsText className="text-gray-400">▼</CsText>
                    </TouchableOpacity>
                  </View>

                  {/* STATE */}
                  <View>
                    <InputLabel>State / Province</InputLabel>
                    <TouchableOpacity
                      onPress={() => {
                        if (!form.countryId) {
                          toast.error("Please select country first");
                          return;
                        }
                        setStateModalVisible(true);
                      }}
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row justify-between"
                    >
                      <CsText
                        className={
                          form.stateName ? "text-black" : "text-gray-400"
                        }
                      >
                        {form.stateName || "Select State"}
                      </CsText>
                      <CsText className="text-gray-400">▼</CsText>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <InputLabel>Street Address</InputLabel>
                    <TextInput
                      placeholder="House number and street name"
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-2"
                      value={form.addressLine1}
                      onChangeText={(t) =>
                        setForm({ ...form, addressLine1: t })
                      }
                    />
                    <TextInput
                      placeholder="Apartment, suite, unit (optional)"
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                      value={form.addressLine2}
                      onChangeText={(t) =>
                        setForm({ ...form, addressLine2: t })
                      }
                    />
                  </View>

                  <View className="flex-row gap-3">
                    <View className="flex-1">
                      <InputLabel>City</InputLabel>
                      <TextInput
                        placeholder="City"
                        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                        value={form.city}
                        onChangeText={(t) => setForm({ ...form, city: t })}
                      />
                    </View>

                    <View className="flex-1">
                      <InputLabel>Zip Code</InputLabel>
                      <TextInput
                        placeholder="12345"
                        keyboardType="number-pad"
                        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                        value={form.zipCode}
                        onChangeText={(t) => setForm({ ...form, zipCode: t })}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>

              <TouchableOpacity
                onPress={handleSave}
                disabled={isPending}
                className="bg-primary h-14 rounded-2xl items-center justify-center mt-6"
              >
                {isPending ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <CsText
                    style={[typography.Poppins_s_bold]}
                    className="text-white"
                  >
                    Save Address
                  </CsText>
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* ================= COUNTRY MODAL ================= */}
      <Modal visible={countryModalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-center px-8">
          <View className="bg-white rounded-[24px] max-h-[70vh]">
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={countries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectCountry(item)}
                    className="p-4 border-b"
                  >
                    <CsText>{item.name}</CsText>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* ================= STATE MODAL ================= */}
      <Modal visible={stateModalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-center px-8">
          <View className="bg-white rounded-[24px] max-h-[70vh]">
            {statesLoading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={states}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectState(item)}
                    className="p-4 border-b"
                  >
                    <CsText>{item.name}</CsText>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </ScreenLayout>
  );
};

export default AddressPage;
