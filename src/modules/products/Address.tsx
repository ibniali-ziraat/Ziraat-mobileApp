import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddressScreen() {
    const [addresses, setAddresses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [mode, setMode] = useState("add");
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        mobile: "",
        pin: "",
        house: "",
        area: "",
    });

    useEffect(() => {
        (async () => {
            const saved = await AsyncStorage.getItem("ADDRESSES");
            if (saved) setAddresses(JSON.parse(saved));
        })();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("ADDRESSES", JSON.stringify(addresses));
    }, [addresses]);

    const openAddModal = () => {
        setMode("add");
        setEditId(null);
        setForm({ name: "", mobile: "", pin: "", house: "", area: "" });
        setModalVisible(true);
    };

    const openEditModal = (item) => {
        setMode("edit");
        setEditId(item.id);
        setForm(item);
        setModalVisible(true);
    };

    const saveAddress = () => {
        if (mode === "edit") {
            setAddresses((prev) =>
                prev.map((a) => (a.id === editId ? { ...a, ...form } : a))
            );
        } else {
            setAddresses((prev) => [...prev, { id: Date.now(), ...form }]);
        }
        setModalVisible(false);
    };

    const removeAddress = (id) => {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <View className="flex-1 bg-white px-4 pt-4">
            <Text className="text-lg font-bold mb-4">Select Delivery Address</Text>

            {addresses.map((item) => (
                <View
                    key={item.id}
                    className="border border-gray-300 rounded-lg p-4 mb-4"
                >
                    <Text className="font-bold">{item.name}</Text>

                    <Text className="mt-1">
                        {item.house}, {item.area}
                    </Text>

                    <Text>Mobile: {item.mobile}</Text>

                    <View className="flex-row mt-3">
                        <TouchableOpacity
                            onPress={() => openEditModal(item)}
                            className="border px-4 py-2 rounded mr-3"
                        >
                            <Text className="text-xs font-semibold">EDIT</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => removeAddress(item.id)}
                            className="border px-4 py-2 rounded"
                        >
                            <Text className="text-xs font-semibold">REMOVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            <TouchableOpacity
                onPress={openAddModal}
                className="border border-dashed border-gray-500 rounded-lg p-4 items-center"
            >
                <Text className="font-semibold">+ Add New Address</Text>
            </TouchableOpacity>

            {/* POPUP */}
            <Modal
                transparent
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 bg-black/50 justify-center px-4">
                    <View className="bg-white rounded-2xl w-full max-h-[92%] shadow-xl">

                        <View className="border-b px-5 py-4">
                            <Text className="text-base font-bold">
                                {mode === "edit" ? "EDIT ADDRESS" : "ADD NEW ADDRESS"}
                            </Text>
                        </View>

                        <View className="flex-1">
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 120 }}
                                className="px-5 py-4"
                            >
                                <TextInput
                                    placeholder="Name*"
                                    value={form.name}
                                    onChangeText={(t) => setForm({ ...form, name: t })}
                                    className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
                                />

                                <TextInput
                                    placeholder="Mobile No*"
                                    keyboardType="number-pad"
                                    value={form.mobile}
                                    onChangeText={(t) => setForm({ ...form, mobile: t })}
                                    className="border border-gray-300 rounded-lg px-4 py-3 mb-6"
                                />

                                <TextInput
                                    placeholder="Pin Code*"
                                    keyboardType="number-pad"
                                    value={form.pin}
                                    onChangeText={(t) => setForm({ ...form, pin: t })}
                                    className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
                                />

                                <TextInput
                                    placeholder="House No / Building / Street*"
                                    value={form.house}
                                    onChangeText={(t) => setForm({ ...form, house: t })}
                                    className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
                                />

                                <TextInput
                                    placeholder="Locality / Town*"
                                    value={form.area}
                                    onChangeText={(t) => setForm({ ...form, area: t })}
                                    className="border border-gray-300 rounded-lg px-4 py-3"
                                />
                            </ScrollView>
                        </View>

                        {/* STICKY FOOTER */}
                        <View className="border-t px-5 py-4 flex-row justify-between bg-white">
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                className="border px-8 py-3 rounded-lg"
                            >
                                <Text className="font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={saveAddress}
                                className="px-10 py-3 rounded-lg"
                                style={{ backgroundColor: "black" }}
                            >
                                <Text style={{ color: "white", fontWeight: "bold" }}>
                                    SAVE
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
}
