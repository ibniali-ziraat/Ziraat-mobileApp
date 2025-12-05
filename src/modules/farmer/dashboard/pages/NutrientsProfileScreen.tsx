import CustomBarChart from "@/src/components/charts/CustomBarChart";
import {
    Entypo,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    ImageBackground,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

// full width for slider
const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Slider images
const headerImages = [
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    "https://images.pexels.com/photos/1003973/pexels-photo-1003973.jpeg",
    "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg",
];

// Reusable Card
const EnhancedCard = ({
    title,
    subtitle,
    value,
    icon,
    accent,
    onPress,
}: any) => {
    const Wrapper: any = onPress ? TouchableOpacity : View;

    return (
        <Wrapper onPress={onPress} activeOpacity={0.85} style={styles.card}>
            <View style={styles.cardRow}>
                <View
                    style={[
                        styles.iconWrap,
                        { backgroundColor: accent || "#c7611f" },
                    ]}
                >
                    {icon}
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
                </View>
            </View>

            {value && <Text style={styles.cardValue}>{value}</Text>}
        </Wrapper>
    );
};

export default function SoilWaterNutrientScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [fertigationInput, setFertigationInput] = useState("");

    const sliderRef = useRef<FlatList<any> | null>(null);
    const slideIndexRef = useRef(0);
    const [, setTick] = useState(0); // force re-render when slide changes (for indicator)
    const headerTimerRef = useRef<number | null>(null);

    // Auto slide every 3s - improved stable interval using refs
    useEffect(() => {
        headerTimerRef.current = setInterval(() => {
            const next = (slideIndexRef.current + 1) % headerImages.length;
            slideIndexRef.current = next;
            sliderRef.current?.scrollToIndex({ index: next, animated: true });
            setTick((t) => t + 1);
        }, 3000) as unknown as number;

        return () => {
            if (headerTimerRef.current) clearInterval(headerTimerRef.current as any);
        };
    }, []);

    // deficiency items converted to objects for better card content
    const deficiencyPhotos = [
        {
            uri: "https://images.pexels.com/photos/33303307/pexels-photo-33303307.jpeg",
            title: "Nitrogen Deficiency",
            note: "Yellowing of older leaves",
            date: "Nov 22, 2025",
        },
        {
            uri: "https://images.pexels.com/photos/1758413/pexels-photo-1758413.jpeg",
            title: "Potassium Burn",
            note: "Leaf scorch edges",
            date: "Nov 18, 2025",
        },
        {
            uri: "https://images.pexels.com/photos/1711962/pexels-photo-1711962.jpeg",
            title: "Phosphorus Lack",
            note: "Stunted growth, purpling",
            date: "Nov 10, 2025",
        },
        {
            uri: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
            title: "Salt Stress",
            note: "White crusty deposits",
            date: "Oct 30, 2025",
        },
    ];

    return (
        <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
            {/* ----- HEADER IMAGE SLIDER ----- */}
            <FlatList
                ref={sliderRef}
                data={headerImages}
                pagingEnabled
                horizontal
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <ImageBackground
                        source={{ uri: item }}
                        style={[styles.header, { width: SCREEN_WIDTH - 32 }]}
                        imageStyle={{ borderRadius: 16 }}
                    >
                        <View style={styles.headerOverlay}>
                            <Text style={styles.headerTitle}>Soil, Water & Nutrient</Text>
                            <Text style={styles.headerSub}>
                                Real-time insight into soil health.
                            </Text>
                        </View>
                    </ImageBackground>
                )}
                style={{ marginBottom: 8 }}
            />

            {/* slider indicators */}
            <View style={styles.indicatorRow}>
                {headerImages.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.indicator,
                            i === slideIndexRef.current && styles.indicatorActive,
                        ]}
                    />
                ))}
            </View>

            {/* ----- CLEAN VERTICAL CARDS ----- */}
            <EnhancedCard
                title="Soil pH & EC Status"
                subtitle="Latest reading"
                value="pH 6.5 • EC 0.8"
                accent="#c7611f"
                icon={<Ionicons name="leaf-outline" size={24} color="white" />}
            />

            <EnhancedCard
                title="Organic Matter %"
                subtitle="Current level"
                value="2.3%"
                accent="#c7611f"
                icon={<MaterialCommunityIcons name="compost" size={24} color="white" />}
            />

            <EnhancedCard
                title="N-P-K Levels"
                subtitle="Status"
                value="N: Low • P: Med • K: High"
                accent="#c7611f"
                icon={<Entypo name="bar-graph" size={20} color="white" />}
            />

            <EnhancedCard
                title="Fertigation Compliance (%)"
                subtitle="Tap to update"
                value="Tap to Update"
                onPress={() => setModalVisible(true)}
                accent="#c7611f"
                icon={<Ionicons name="water" size={24} color="white" />}
            />

            <EnhancedCard
                title="Irrigation Volume Applied"
                subtitle="Last cycle"
                value="4,200 L/ha"
                accent="#c7611f"
                icon={
                    <MaterialCommunityIcons
                        name="watering-can"
                        size={24}
                        color="white"
                    />
                }
            />

            <EnhancedCard
                title="Water Use Efficiency"
                subtitle="Seasonal"
                value="78%"
                accent="#c7611f"
                icon={<Ionicons name="analytics-outline" size={24} color="white" />}
            />

            <EnhancedCard
                title="Deficiency Symptoms"
                subtitle="Auto-detected"
                value="5 Issues"
                accent="#c7611f"
                icon={<Ionicons name="warning" size={24} color="white" />}
            />

            {/* ----- CHART ----- */}
            <Text style={styles.sectionTitle}>Soil Health Trend</Text>
            <View style={styles.chartCard}>
                <View style={{ height: 200 }}>
                    <CustomBarChart />
                </View>
                <Text style={styles.chartCaption}>(pH, EC & NPK trend)</Text>
            </View>

            {/* ----- NUTRIENT ANALYSIS ----- */}
            <Text style={styles.sectionTitle}>Nutrient Analysis</Text>

            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Nitrogen (N)</Text>
                <Text style={styles.infoText}>Low — weak vegetative growth.</Text>
                <Text style={styles.infoSmall}>Compost, Urea, Green Manure</Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Phosphorus (P)</Text>
                <Text style={styles.infoText}>Medium — adequate absorption.</Text>
                <Text style={[styles.infoSmall, { color: "#c7611f" }]}>
                    DAP, Rock Phosphate
                </Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Potassium (K)</Text>
                <Text style={styles.infoText}>High — improves fruit quality.</Text>
                <Text style={styles.infoSmall}>
                    Reduce potassium application
                </Text>
            </View>

            {/* ----- IRRIGATION INSIGHTS ----- */}
            <Text style={styles.sectionTitle}>Irrigation Insights</Text>

            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Water Distribution Balance</Text>
                <Text style={styles.infoText}>
                    Blocks A & C require slightly higher flow.
                </Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Soil Moisture Variability</Text>
                <Text style={styles.infoText}>
                    Moisture decreasing — increase irrigation frequency 10%.
                </Text>
            </View>

            {/* ----- UPDATED: DEFICIENCY CARDS ----- */}
            <Text style={styles.sectionTitle}>Deficiency Photo Records</Text>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={deficiencyPhotos}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.9} style={styles.photoCard}>
                        <ImageBackground
                            source={{ uri: item.uri }}
                            style={styles.photoCardImage}
                            imageStyle={{ borderRadius: 12 }}
                        >
                            <View style={styles.photoOverlayTop}>
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>Auto</Text>
                                </View>
                            </View>

                            <View style={styles.photoOverlayBottom}>
                                <Text style={styles.photoTitle} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                <Text style={styles.photoNote} numberOfLines={1}>
                                    {item.note}
                                </Text>
                                <Text style={styles.photoDate}>{item.date}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                style={{ marginBottom: 16 }}
                contentContainerStyle={{ paddingRight: 8 }}
            />

            {/* ----- SUGGESTIONS ----- */}
            <Text style={styles.sectionTitle}>Improvement Suggestions</Text>
            <View style={[styles.infoCard, { marginBottom: 40 }]}>
                <Text style={styles.bullet}>• Add organic matter (compost, biomass)</Text>
                <Text style={styles.bullet}>• Improve fertigation timing</Text>
                <Text style={styles.bullet}>• Monitor EC weekly</Text>
                <Text style={styles.bullet}>• Apply balanced NPK</Text>
                <Text style={styles.bullet}>• Maintain pH between 6.0–7.0</Text>
            </View>

            {/* ----- MODAL ----- */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Update Fertigation (%)</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter %"
                            keyboardType="numeric"
                            value={fertigationInput}
                            onChangeText={setFertigationInput}
                        />

                        <View style={styles.modalBtns}>
                            <Pressable
                                style={[styles.modalBtn, { backgroundColor: "#eee" }]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text>Cancel</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.modalBtn, { backgroundColor: "#c7611f" }]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={{ color: "white", fontWeight: "700" }}>
                                    Save
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: { backgroundColor: "#fff" },

    /* HEADER SLIDER */
    header: {
        height: 160,
        borderRadius: 16,
        justifyContent: "flex-end",
        overflow: "hidden",
    },
    headerOverlay: {
        backgroundColor: "rgba(0,0,0,0.28)",
        padding: 14,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    headerTitle: { color: "white", fontSize: 22, fontWeight: "800" },
    headerSub: { color: "white", fontSize: 13, marginTop: 4 },

    indicatorRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#eee",
        marginHorizontal: 4,
    },
    indicatorActive: {
        width: 18,
        borderRadius: 8,
        backgroundColor: "#c7611f",
    },

    /* CARDS */
    card: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 14,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 3,
    },
    cardRow: { flexDirection: "row", alignItems: "center" },
    iconWrap: {
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    cardTitle: { fontSize: 15, fontWeight: "700", color: "#111" },
    cardSubtitle: { fontSize: 12, color: "#666", marginTop: 2 },
    cardValue: { fontSize: 14, fontWeight: "800", marginTop: 10 },

    /* SECTIONS */
    sectionTitle: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: "800",
        color: "#111",
    },

    /* CHART */
    chartCard: {
        backgroundColor: "#fafafa",
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: "#eee",
        marginBottom: 12,
    },
    chartCaption: { textAlign: "center", fontSize: 11, marginTop: 6, color: "#666" },

    /* INFO CARDS */
    infoCard: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 2,
    },
    infoTitle: { fontSize: 15, fontWeight: "700", color: "#111" },
    infoText: { marginTop: 4, color: "#555" },
    infoSmall: { marginTop: 6, fontSize: 12, color: "#666" },

    /* UPDATED PHOTO CARDS */
    photoCard: {
        width: 220,
        borderRadius: 12,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 4,
    },
    photoCardImage: {
        width: "100%",
        height: 140,
        justifyContent: "space-between",
        padding: 10,
    },
    photoOverlayTop: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    badge: {
        backgroundColor: "rgba(255,255,255,0.9)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#444",
    },
    photoOverlayBottom: {
        backgroundColor: "rgba(0,0,0,0.36)",
        padding: 8,
        borderRadius: 8,
    },
    photoTitle: {
        color: "white",
        fontWeight: "800",
        fontSize: 14,
    },
    photoNote: {
        color: "white",
        fontSize: 12,
        marginTop: 2,
    },
    photoDate: {
        color: "#ddd",
        fontSize: 11,
        marginTop: 6,
    },

    /* PHOTOS (legacy size kept if needed) */
    photo: {
        width: 120,
        height: 120,
        borderRadius: 12,
    },

    bullet: { marginBottom: 6, color: "#222" },

    /* MODAL */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: "85%",
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 14,
        elevation: 4,
    },
    modalTitle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "800",
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        padding: 12,
        marginBottom: 14,
    },
    modalBtns: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalBtn: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 12,
        minWidth: 100,
        alignItems: "center",
    },
});
