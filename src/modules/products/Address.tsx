import BackHeader from "@/src/components/shared/BackHeader";
import CsText from "@/src/components/shared/CsText";
import ScreenLayout from "@/src/components/shared/ScreenLayout";
import ZiraatCard from "@/src/components/shared/ZiraatProfileCard";
import { typography } from "@/src/constants/fonts/typography";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    FlatList,
    Modal,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";



const AddressPage = () => {
    const [addresses, setAddresses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        pincode: "",
    });

    const loadAddresses = async () => {
        const saved = await AsyncStorage.getItem("addresses");
        if (saved) setAddresses(JSON.parse(saved));
    };

    const saveAddresses = async (data: Address[]) => {
        setAddresses(data);
        await AsyncStorage.setItem("addresses", JSON.stringify(data));
    };

    useEffect(() => {
        loadAddresses();
    }, []);

    const openAddModal = () => {
        setEditingAddress(null);
        setForm({ name: "", phone: "", address: "", pincode: "" });
        setModalVisible(true);
    };

    const openEditModal = (item: Address) => {
        setEditingAddress(item);
        setForm(item);
        setModalVisible(true);
    };

    const handleSave = () => {
        if (!form.name || !form.phone || !form.address || !form.pincode) {
            ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
            return;
        }

        if (editingAddress) {
            const updated = addresses.map((a) =>
                a.id === editingAddress.id ? { ...editingAddress, ...form } : a
            );

            saveAddresses(updated);
            ToastAndroid.show("Address updated", ToastAndroid.SHORT);
        } else {
            const newAddress: Address = {
                id: Date.now().toString(),
                ...form,
            };

            saveAddresses([...addresses, newAddress]);
            ToastAndroid.show("Address added", ToastAndroid.SHORT);
        }

        setModalVisible(false);
    };

    const handleRemove = (id: string) => {
        const filtered = addresses.filter((a) => a.id !== id);
        saveAddresses(filtered);
        ToastAndroid.show("Address removed", ToastAndroid.SHORT);
    };

    return (
        <ScreenLayout>
            <BackHeader title="Address Details" desc="Select delivery address" />

            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <ZiraatCard
                        width={"100%"}
                        paddingVertical={1}
                        paddingHorizontal={1}
                        marginBottom={1}
                        borderWidth={1}
                        borderRadius={16}
                    >
                        <CsText style={[typography.Poppins_s_bold]} className="text-base">
                            {item.name}
                        </CsText>

                        <CsText className="mt-2">
                            <CsText style={[typography.Poppins_s_regular]}>Mobile : </CsText>
                            {item.phone}
                        </CsText>

                        <CsText className="mt-2">{item.address}</CsText>
                        <CsText className="mt-2">{item.pincode}</CsText>

                        <View className="flex-row gap-3 mt-3">
                            <TouchableOpacity
                                onPress={() => openEditModal(item)}
                                className="flex-1 border rounded-xl py-2 items-center"
                            >
                                <CsText>Edit</CsText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleRemove(item.id)}
                                className="flex-1 border rounded-xl py-2 items-center"
                            >
                                <CsText>Remove</CsText>
                            </TouchableOpacity>
                        </View>
                    </ZiraatCard>
                )}
                ListFooterComponent={
                    <TouchableOpacity
                        onPress={openAddModal}
                        className="border border-dashed py-3 rounded-full mt-4"
                    >
                        <CsText
                            style={[typography.Poppins_s_bold]}
                            className="text-center text-dark"
                        >
                            Add New Address
                        </CsText>
                    </TouchableOpacity>
                }
            />

            <Modal visible={modalVisible} transparent animationType="fade">
                <View className="flex-1 bg-bgColor justify-center items-center px-3">
                    <ZiraatCard
                        width={"100%"}
                        borderRadius={18}
                        paddingHorizontal={1}
                        paddingVertical={1}
                    >
                        <View className="border-b px-5 py-4">
                            <CsText style={[typography.Poppins_s_bold]} className="text-base">
                                {editingAddress ? "Edit Address" : "Add New Address"}
                            </CsText>
                        </View>

                        <ScrollView
                            className="px-5 py-4 max-h-[70vh]"
                            showsVerticalScrollIndicator={false}
                        >
                            <CsText className="mb-2">CONTACT DETAILS</CsText>

                            <View className="mb-4">
                                <CsText className="mb-1">Name*</CsText>
                                <TextInput
                                    placeholder="Full Name"
                                    className="border rounded-xl px-3 py-2"
                                    value={form.name}
                                    onChangeText={(t) => setForm({ ...form, name: t })}
                                />
                            </View>

                            <View className="mb-6">
                                <CsText className="mb-1">Mobile No*</CsText>
                                <TextInput
                                    placeholder="Mobile Number"
                                    keyboardType="phone-pad"
                                    className="border rounded-xl px-3 py-2"
                                    value={form.phone}
                                    onChangeText={(t) => setForm({ ...form, phone: t })}
                                />
                            </View>

                            <CsText className="mb-2">ADDRESS</CsText>

                            <View className="mb-4">
                                <CsText className="mb-1">Pin Code*</CsText>
                                <TextInput
                                    placeholder="Pincode"
                                    keyboardType="number-pad"
                                    className="border rounded-xl px-3 py-2"
                                    value={form.pincode}
                                    onChangeText={(t) => setForm({ ...form, pincode: t })}
                                />
                            </View>

                            <View className="mb-2">
                                <CsText className="mb-1">
                                    Address (House No, Building, Street, Area)*
                                </CsText>
                                <TextInput
                                    placeholder="Address"
                                    multiline
                                    className="border rounded-xl  py-2 h-24 text-top"
                                    value={form.address}
                                    onChangeText={(t) => setForm({ ...form, address: t })}
                                />
                            </View>

                            <CsText style={[typography.Poppins_xs_regular]}
                                className="text-secondary mt-1">
                                *Please update flat/house no and society/apartment details
                            </CsText>
                        </ScrollView>

                        <View className="border-t px-5 py-4 flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                className="flex-1 border rounded-xl py-3 items-center"
                            >
                                <CsText>Cancel</CsText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSave}
                                className="flex-1 bg-primary rounded-xl py-3 items-center"
                            >
                                <CsText className="text-light" style={[typography.Poppins_s_medium]}>
                                    {editingAddress ? "Update" : "Save"}
                                </CsText>
                            </TouchableOpacity>
                        </View>
                    </ZiraatCard>
                </View>
            </Modal>
        </ScreenLayout>
    );
};

export default AddressPage;
