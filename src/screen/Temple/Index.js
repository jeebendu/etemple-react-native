import React, { useMemo, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const TABS = [
    { key: 'member', label: 'Member Services' },
    { key: 'special', label: 'Special Puja' },
    { key: 'vehicle', label: 'Vehicle Puja' },
    { key: 'outside', label: 'Outside Seva' },
    { key: 'abhishek', label: 'Abhishek' },
];

const Index = () => {

    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('member');

    const temple = useMemo(
        () => ({
            name: 'Karnataka Jaya Jagannath Seva Samiti',
            address: '4 Williston Residential Layout, HSR Layout, Agara, Bangalore - 560102',
            phone: '+91 98765 43210',
            open: '06:00 AM - 09:00 PM (Daily)',
        }),
        []
    );

    const services = useMemo(
        () => ({
            member: [
                { id: 'm1', title: 'Oneday in month member puja', sub: 'Monthly member puja', price: 1200 },
                { id: 'm2', title: 'Temple membership per month', sub: 'Monthly membership', price: 500 },
            ],
            special: [
                { id: 's1', title: 'Marriage', sub: 'Marriage puja', price: 5200 },
                { id: 's2', title: 'Sraddha', sub: 'Sraddha ritual', price: 500 },
                { id: 's3', title: 'Anna Prasan', sub: 'Anna Prasan', price: 500 },
                { id: 's4', title: 'Bratopanayan', sub: 'Bratopanayan', price: 4100 },
                { id: 's5', title: 'Satya Narayan Puja', sub: 'Satya Narayan Puja', price: 1000 },
                { id: 's6', title: 'Rudra Abhisheka', sub: 'Rudra Abhisheka', price: 2100 },
                { id: 's7', title: 'Narayan Tulashi Puja', sub: 'Tulashi puja', price: 2800 },
                { id: 's8', title: 'Siva Puja', sub: 'Siva puja', price: 151 },
                { id: 's9', title: 'Geeta Yajna', sub: 'Geeta Yajna', price: 2100 },
            ],
            vehicle: [
                { id: 'v1', title: 'Two-wheeler Puja', sub: 'Vehicle blessing', price: 251 },
                { id: 'v2', title: 'Four-wheeler Puja', sub: 'Vehicle blessing', price: 501 },
            ],
            outside: [
                { id: 'o1', title: 'Griha Pravesh', sub: 'At your home', price: 3100 },
                { id: 'o2', title: 'Lakshmi Puja', sub: 'At your home', price: 1500 },
            ],
            abhishek: [
                { id: 'a1', title: 'Abhishek (Basic)', sub: 'Standard abhishek', price: 501 },
                { id: 'a2', title: 'Abhishek (Premium)', sub: 'Premium abhishek', price: 1501 },
            ],
        }),
        []
    );

    const timingCards = useMemo(
        () => [
            { id: 't1', title: 'Morning Darshan', time: '06:00 AM - 12:00 PM', tone: 'good' },
            { id: 't2', title: 'Afternoon Break', time: 'Closed', tone: 'muted' },
            { id: 't3', title: 'Evening Darshan', time: '04:00 PM - 09:00 PM', tone: 'good' },
            { id: 't4', title: 'Special Pujas', time: 'By Appointment', tone: 'warn' },
        ],
        []
    );

    const list = services[activeTab] || [];

    return (
        <View style={styles.root}>
            {/* Top gradient header background */}
            <LinearGradient colors={['#f59e0b', '#d97706', '#fff7ed']} style={styles.topBg} />

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                {/* Header Card */}
                <Animated.View entering={FadeInDown.duration(400)} style={styles.headerCard}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                        style={styles.headerIcon}
                    >
                        <Feather name="arrow-left" size={20} color="#111827" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Temple Details</Text>
                </Animated.View>
                {/* Om + hero spacing */}
                <Animated.View entering={FadeInDown.duration(450)} style={styles.omWrap}>
                    <View style={styles.omMark}>
                        <Text style={styles.omText}>ॐ</Text>
                    </View>
                </Animated.View>

                {/* Temple info card */}
                <Animated.View entering={FadeInUp.duration(520)} style={styles.infoCard}>
                    <View style={styles.infoHeadRow}>
                        <Text style={styles.templeName}>{temple.name}</Text>

                        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.9}>
                            <Feather name="bookmark" size={16} color="#111827" />
                            <Text style={styles.saveBtnText}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <InfoRow icon="map-pin" text={temple.address} />
                    <InfoRow icon="phone" text={temple.phone} />
                    <InfoRow icon="clock" text={`Open: ${temple.open}`} />

                    {/* Tiny action row */}
                    <View style={styles.infoActions}>
                        <TouchableOpacity style={styles.actionPill} activeOpacity={0.9}>
                            <Feather name="navigation" size={16} color="#92400e" />
                            <Text style={styles.actionPillText}>Directions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionPill} activeOpacity={0.9}>
                            <Feather name="share-2" size={16} color="#92400e" />
                            <Text style={styles.actionPillText}>Share</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionPill} activeOpacity={0.9}>
                            <Feather name="phone-call" size={16} color="#92400e" />
                            <Text style={styles.actionPillText}>Call</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Services */}
                <Animated.View entering={FadeInUp.delay(120).duration(520)} style={styles.section}>
                    <View style={styles.sectionTitleRow}>
                        <View style={styles.sectionLeft}>
                            <Text style={styles.sectionTitle}>Available Services</Text>
                            <Text style={styles.sectionSub}>Select a category and add services to cart.</Text>
                        </View>

                        <TouchableOpacity style={styles.cartBtn} activeOpacity={0.92}>
                            <Feather name="shopping-bag" size={16} color="#111827" />
                            <Text style={styles.cartBtnText}>Cart</Text>
                            <View style={styles.cartDot}>
                                <Text style={styles.cartDotText}>0</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Tabs */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
                        {TABS.map((t) => {
                            const active = t.key === activeTab;
                            return (
                                <TouchableOpacity
                                    key={t.key}
                                    onPress={() => setActiveTab(t.key)}
                                    activeOpacity={0.9}
                                    style={[styles.tabPill, active && styles.tabPillActive]}
                                >
                                    <Text style={[styles.tabText, active && styles.tabTextActive]}>{t.label}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    {/* Service cards grid */}
                    <View style={styles.grid}>
                        {list.map((s) => (
                            <ServiceCard key={s.id} item={s} />
                        ))}
                    </View>
                </Animated.View>

                {/* Timings */}
                <Animated.View entering={FadeInUp.delay(200).duration(520)} style={styles.timingWrap}>
                    <View style={styles.timingHead}>
                        <Feather name="clock" size={16} color="#92400e" />
                        <Text style={styles.timingTitle}>Temple Timings</Text>
                    </View>

                    <View style={styles.timingGrid}>
                        {timingCards.map((t) => (
                            <TimingCard key={t.id} item={t} />
                        ))}
                    </View>
                </Animated.View>

                {/* Bottom CTA */}
                <Animated.View entering={FadeInUp.delay(260).duration(520)} style={styles.ctaWrap}>
                    <LinearGradient colors={['#f59e0b', '#d97706']} style={styles.cta}>
                        <Text style={styles.ctaTitle}>Ready to Book a Service?</Text>
                        <Text style={styles.ctaSub}>
                            Select from a wide range of pujas, sevas, and spiritual services. Experience divine blessings.
                        </Text>

                        <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.92}>
                            <Text style={styles.ctaBtnText}>Proceed to Booking</Text>
                            <Feather name="arrow-right" size={18} color="#111827" />
                        </TouchableOpacity>
                    </LinearGradient>
                </Animated.View>

                <View style={{ height: 22 }} />
            </ScrollView>
        </View>
    );
};

/* ---------------- Components ---------------- */

const InfoRow = ({ icon, text }) => {
    return (
        <View style={styles.infoRow}>
            <Feather name={icon} size={16} color="#9ca3af" />
            <Text style={styles.infoText} numberOfLines={2}>
                {text}
            </Text>
        </View>
    );
};

const ServiceCard = ({ item }) => {
    return (
        <View style={styles.serviceCard}>
            <Text style={styles.serviceTitle} numberOfLines={2}>
                {item.title}
            </Text>
            <Text style={styles.serviceSub} numberOfLines={1}>
                {item.sub}
            </Text>

            <View style={styles.serviceBottom}>
                <Text style={styles.priceText}>₹ {Number(item.price).toLocaleString('en-IN')}</Text>

                <TouchableOpacity style={styles.addBtn} activeOpacity={0.9}>
                    <Feather name="plus" size={16} color="#111827" />
                    <Text style={styles.addBtnText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const TimingCard = ({ item }) => {
    const tone =
        item.tone === 'warn'
            ? styles.toneWarn
            : item.tone === 'muted'
                ? styles.toneMuted
                : styles.toneGood;

    return (
        <View style={[styles.timingCard, tone]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.timingCardTitle}>{item.title}</Text>
                <Feather name="clock" size={14} color="#92400e" />
            </View>
            <Text style={styles.timingCardTime}>{item.time}</Text>
        </View>
    );
};

export default Index;

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#fff7ed' },
    topBg: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 240,
    },
    container: { paddingBottom: 18 },

    /* Header Card */
    headerCard: {
        marginTop: 8,
        marginHorizontal: 16,
        height: 52,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.96)',
        borderWidth: 1,
        borderColor: 'rgba(17,24,39,0.08)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        shadowColor: '#000',
        shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.22,
        shadowRadius: 14,
        elevation: 4,
    },
    headerIcon: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: 'rgba(245,158,11,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(245,158,11,0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 15.5,
        fontWeight: '900',
        color: '#111827',
        marginLeft: 16,
    },

    /* OM mark */
    omWrap: { alignItems: 'center', marginTop: 18 },
    omMark: {
        width: 66,
        height: 66,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.20)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.40)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    omText: { color: '#fff', fontSize: 28, fontWeight: '900' },

    /* Info Card */
    infoCard: {
        marginTop: 14,
        marginHorizontal: 16,
        borderRadius: 18,
        padding: 14,
        backgroundColor: 'rgba(255,255,255,0.94)',
        borderWidth: 1,
        borderColor: 'rgba(17,24,39,0.08)',
        shadowColor: '#000',
        shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.22,
        shadowRadius: 16,
        elevation: 4,
    },
    infoHeadRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 },
    templeName: { flex: 1, fontSize: 16, lineHeight: 22, fontWeight: '900', color: '#111827' },

    saveBtn: {
        height: 34,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: 'rgba(245,158,11,0.18)',
        borderWidth: 1,
        borderColor: 'rgba(245,158,11,0.25)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
    },
    saveBtnText: { fontWeight: '900', color: '#111827', fontSize: 12.5 },

    infoRow: { marginTop: 10, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
    infoText: { flex: 1, color: '#6b7280', fontWeight: '700', fontSize: 12.5, lineHeight: 18 },

    infoActions: { marginTop: 12, flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
    actionPill: {
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderRadius: 999,
        backgroundColor: 'rgba(245,158,11,0.10)',
        borderWidth: 1,
        borderColor: 'rgba(245,158,11,0.18)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actionPillText: { color: '#92400e', fontWeight: '900', fontSize: 12.5 },

    /* Section */
    section: { marginTop: 16, paddingHorizontal: 16 },
    sectionTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 10 },
    sectionLeft: { flex: 1 },
    sectionTitle: { fontSize: 16, fontWeight: '900', color: '#111827' },
    sectionSub: { marginTop: 4, color: '#6b7280', fontWeight: '700', fontSize: 12.5 },

    cartBtn: {
        height: 38,
        paddingHorizontal: 12,
        borderRadius: 14,
        backgroundColor: '#fbbf24',
        borderWidth: 1,
        borderColor: 'rgba(17,24,39,0.10)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cartBtnText: { fontWeight: '900', color: '#111827', fontSize: 13 },
    cartDot: {
        minWidth: 22,
        height: 22,
        borderRadius: 999,
        backgroundColor: 'rgba(17,24,39,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    cartDotText: { fontWeight: '900', color: '#111827', fontSize: 12 },

    /* Tabs */
    tabs: { paddingVertical: 12, gap: 10 },
    tabPill: {
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderWidth: 1,
        borderColor: 'rgba(17,24,39,0.08)',
    },
    tabPillActive: {
        backgroundColor: '#f59e0b',
        borderColor: 'rgba(17,24,39,0.10)',
    },
    tabText: { fontWeight: '900', color: '#6b7280', fontSize: 12.5 },
    tabTextActive: { color: '#111827' },

    /* Grid */
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },

    serviceCard: {
        width: (width - 16 * 2 - 12) / 2, // 2 columns with gap
        borderRadius: 16,
        padding: 12,
        backgroundColor: 'rgba(255,255,255,0.96)',
        borderWidth: 1,
        borderColor: 'rgba(17,24,39,0.08)',
        shadowColor: '#000',
        shadowOpacity: Platform.OS === 'ios' ? 0.06 : 0.16,
        shadowRadius: 12,
        elevation: 2,
    },
    serviceTitle: { fontWeight: '900', color: '#111827', fontSize: 13.2, lineHeight: 18 },
    serviceSub: { marginTop: 6, color: '#6b7280', fontWeight: '700', fontSize: 12 },
    serviceBottom: { marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    priceText: { color: '#b45309', fontWeight: '900', fontSize: 13 },

    addBtn: {
        height: 32,
        paddingHorizontal: 10,
        borderRadius: 12,
        backgroundColor: '#fbbf24',
        borderWidth: 1,
        borderColor: 'rgba(17,24,39,0.10)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    addBtnText: { fontWeight: '900', color: '#111827', fontSize: 12.5 },

    /* Timings */
    timingWrap: {
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 18,
        padding: 14,
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderWidth: 1,
        borderColor: 'rgba(17,24,39,0.08)',
    },
    timingHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    timingTitle: { fontWeight: '900', color: '#111827', fontSize: 14.5 },

    timingGrid: {
        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // makes two columns
    },
    timingCard: {
        flexBasis: '48%',       // ✅ 2 cards in one row
        maxWidth: '48%',        // ✅ prevent stretching
        borderRadius: 14,
        padding: 12,
        borderWidth: 1,
        marginBottom: 10,       // ✅ vertical spacing (no rowGap needed)
    },
    timingCardTitle: { fontWeight: '900', color: '#111827', fontSize: 12.8 },
    timingCardTime: { marginTop: 6, fontWeight: '800', color: '#6b7280', fontSize: 12 },

    toneGood: { backgroundColor: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.20)' },
    toneMuted: { backgroundColor: 'rgba(107,114,128,0.08)', borderColor: 'rgba(107,114,128,0.16)' },
    toneWarn: { backgroundColor: 'rgba(245,158,11,0.10)', borderColor: 'rgba(245,158,11,0.22)' },

    /* CTA */
    ctaWrap: { marginTop: 16, paddingHorizontal: 16 },
    cta: {
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(17,24,39,0.10)',
        shadowColor: '#000',
        shadowOpacity: Platform.OS === 'ios' ? 0.12 : 0.22,
        shadowRadius: 16,
        elevation: 5,
    },
    ctaTitle: { textAlign: 'center', fontWeight: '900', color: '#fff', fontSize: 16 },
    ctaSub: { marginTop: 6, textAlign: 'center', fontWeight: '700', color: 'rgba(255,255,255,0.92)', fontSize: 12.5, lineHeight: 17 },
    ctaBtn: {
        marginTop: 12,
        alignSelf: 'center',
        height: 42,
        paddingHorizontal: 14,
        borderRadius: 14,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    ctaBtnText: { fontWeight: '900', color: '#111827', fontSize: 13.5 },
});