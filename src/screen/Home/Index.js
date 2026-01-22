import React, { useMemo, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Animated, {
    FadeInDown,
    FadeInUp,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_W = Math.min(300, width * 0.78);

const Index = () => {

    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const y = useSharedValue(0);

    const temples = useMemo(
        () => [
            { id: '1', name: 'Karnataka Jaga Jagann...', location: 'Bhubaneswar, Odisha', tag: 'New', rating: 4.8, reviews: 128 },
            { id: '2', name: 'Shree Lokanath Temple', location: 'Puri, Odisha', tag: 'Popular', rating: 4.7, reviews: 302 },
            { id: '3', name: 'Maa Tara Tarini', location: 'Ganjam, Odisha', tag: 'Trending', rating: 4.9, reviews: 211 },
        ],
        []
    );

    const onScroll = useAnimatedScrollHandler({
        onScroll: (e) => {
            y.value = e.contentOffset.y;
        },
    });

    const heroAnim = useAnimatedStyle(() => {
        // subtle parallax scale + translate
        const t = Math.min(1, y.value / 220);
        const scale = interpolate(t, [0, 1], [1, 0.965]);
        const translateY = interpolate(t, [0, 1], [0, -12]);
        return { transform: [{ translateY }, { scale }] };
    });

    const headerAnim = useAnimatedStyle(() => {
        const t = Math.min(1, y.value / 120);
        const opacity = interpolate(t, [0, 1], [1, 0.92]);
        return { opacity };
    });

    return (
        <LinearGradient colors={['#fff7ed', '#fef3c7', '#fff']} style={styles.bg}>
            <Animated.View style={[styles.header, headerAnim]} entering={FadeInDown.duration(450)}>
                <View style={styles.brand}>
                    <View style={styles.brandDot} />
                    <Text style={styles.brandText}>
                        Temple <Text style={styles.brandAccent}>Seva</Text>
                    </Text>
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.pillIcon} activeOpacity={0.88}>
                        <Feather name="search" size={18} color="#111827" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pillIcon} activeOpacity={0.88}>
                        <Feather name="user" size={18} color="#111827" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pillBtn} activeOpacity={0.9}>
                        <Text style={styles.pillBtnText}>Login</Text>
                        <Feather name="arrow-right" size={16} color="#111827" />
                    </TouchableOpacity>
                </View>
            </Animated.View>

            <Animated.ScrollView
                onScroll={onScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {/* HERO (premium) */}
                <Animated.View style={[styles.heroWrap, heroAnim]} entering={FadeInUp.duration(520)}>
                    {/* glow border */}
                    <LinearGradient
                        colors={['rgba(245,158,11,0.50)', 'rgba(251,191,36,0.20)', 'rgba(255,255,255,0.20)']}
                        style={styles.heroGlow}
                    />

                    <LinearGradient colors={['#111827', '#1f2937']} style={styles.hero}>
                        <View style={styles.heroTopRow}>
                            <View style={styles.badge}>
                                <Feather name="sun" size={14} color="#111827" />
                                <Text style={styles.badgeText}>Divine Services Online</Text>
                            </View>

                            <View style={styles.chipRow}>
                                <Chip icon="shield">Verified</Chip>
                                <Chip icon="clock">Quick</Chip>
                            </View>
                        </View>

                        <Text style={styles.heroTitle}>
                            Experience <Text style={styles.heroAccent}>Sacred</Text>{'\n'}
                            Blessings From Temples
                        </Text>

                        <Text style={styles.heroSub}>
                            Book puja, seva, and rituals with trusted temple priests. Receive blessings at home.
                        </Text>

                        {/* Premium search */}
                        <View style={styles.searchWrap}>
                            <View style={styles.searchInputWrap}>
                                <Feather name="search" size={18} color="rgba(255,255,255,0.75)" />
                                <TextInput
                                    value={query}
                                    onChangeText={setQuery}
                                    placeholder="Search temples, city, seva..."
                                    placeholderTextColor="rgba(255,255,255,0.60)"
                                    style={styles.searchInput}
                                    returnKeyType="search"
                                />
                            </View>

                            <TouchableOpacity style={styles.searchBtn} activeOpacity={0.9}>
                                <LinearGradient colors={['#fbbf24', '#f59e0b']} style={styles.searchBtnGrad}>
                                    <Text style={styles.searchBtnText}>Search</Text>
                                    <Feather name="arrow-right" size={18} color="#111827" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        {/* Hero quick stats */}
                        <View style={styles.statsRow}>
                            <Stat icon="map-pin" label="Temples" value="500+" />
                            <Divider />
                            <Stat icon="award" label="Priests" value="Verified" />
                            <Divider />
                            <Stat icon="heart" label="Devotees" value="20k+" />
                        </View>
                    </LinearGradient>
                </Animated.View>

                {/* FEATURES */}
                <Animated.View entering={FadeInUp.delay(120).duration(520)} style={styles.featuresWrap}>
                    <Feature icon="calendar" title="Easy Booking" desc="Book puja & seva in seconds. Instant confirmation." />
                    <Feature icon="truck" title="Blessings Delivered" desc="Prasad & blessings delivered safely to your door." />
                    <Feature icon="lock" title="Secure Payments" desc="Encrypted and safe payments with full transparency." />
                </Animated.View>

                {/* EXPLORE */}
                <Animated.View entering={FadeInUp.delay(200).duration(520)} style={styles.section}>
                    <View style={styles.sectionHead}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                Explore <Text style={styles.sectionAccent}>Sacred</Text> Temples
                            </Text>
                            <Text style={styles.sectionSub}>Handpicked temples and popular seva packages.</Text>
                        </View>

                        <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.9}>
                            <Text style={styles.viewAllText}>View All</Text>
                            <Feather name="chevron-right" size={18} color="#92400e" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CARD_W + 12}
                        decelerationRate="fast"
                        contentContainerStyle={{ paddingVertical: 10 }}
                    >
                        {temples.map((t) => (
                            <TempleCard key={t.id} item={t} />
                        ))}
                    </ScrollView>
                </Animated.View>

                {/* CTA */}
                <Animated.View entering={FadeInUp.delay(260).duration(520)} style={styles.ctaWrap}>
                    <LinearGradient colors={['#f59e0b', '#d97706']} style={styles.cta}>
                        <Text style={styles.ctaTitle}>Ready to start your spiritual journey?</Text>
                        <Text style={styles.ctaSub}>
                            Book temple services online and receive blessings with devotion.
                        </Text>

                        <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.92}>
                            <Text style={styles.ctaBtnText}>Get Started</Text>
                            <Feather name="arrow-right" size={18} color="#111827" />
                        </TouchableOpacity>
                    </LinearGradient>
                </Animated.View>

                <View style={{ height: 22 }} />
            </Animated.ScrollView>
        </LinearGradient>
    );
};

/* ---------------- Components ---------------- */

const Chip = ({ icon, children }) => (
    <View style={styles.chip}>
        <Feather name={icon} size={14} color="rgba(255,255,255,0.90)" />
        <Text style={styles.chipText}>{children}</Text>
    </View>
);

const Stat = ({ icon, label, value }) => (
    <View style={styles.stat}>
        <Feather name={icon} size={16} color="#fbbf24" />
        <View style={{ marginLeft: 8 }}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    </View>
);

const Divider = () => <View style={styles.divider} />;

const Feature = ({ icon, title, desc }) => (
    <View style={styles.featureCard}>
        <LinearGradient colors={['rgba(245,158,11,0.20)', 'rgba(245,158,11,0.06)']} style={styles.featureIcon}>
            <Feather name={icon} size={18} color="#92400e" />
        </LinearGradient>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDesc}>{desc}</Text>
    </View>
);

const TempleCard = ({ item }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity activeOpacity={0.92} style={styles.templeCard}>
            {/* Image / cover */}
            <LinearGradient colors={['#111827', '#f59e0b']} style={styles.templeCover}>
                <View style={styles.templeCoverTop}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>{item.tag}</Text>
                    </View>

                    <View style={styles.ratingPill}>
                        <Feather name="star" size={14} color="#fbbf24" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                </View>

                <View style={styles.templeMark}>
                    <Text style={styles.templeMarkText}>ॐ</Text>
                </View>

                <Text style={styles.coverTitle} numberOfLines={1}>
                    {item.name}
                </Text>
                <View style={styles.coverMeta}>
                    <Feather name="map-pin" size={14} color="rgba(255,255,255,0.90)" />
                    <Text style={styles.coverMetaText} numberOfLines={1}>
                        {item.location}
                    </Text>
                </View>
            </LinearGradient>

            {/* Body */}
            <View style={styles.templeBody}>
                <View style={styles.rowBetween}>
                    <Text style={styles.templeName} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text style={styles.reviewsText}>{item.reviews}+ reviews</Text>
                </View>

                <View style={styles.rowChips}>
                    <MiniPill icon="check-circle">Trusted</MiniPill>
                    <MiniPill icon="zap">Fast Booking</MiniPill>
                </View>

                <TouchableOpacity style={styles.bookBtn} activeOpacity={0.9} onPress={() => navigation.navigate('Temple', { templeId: item.id })}>
                    <LinearGradient colors={['#fbbf24', '#f59e0b']} style={styles.bookBtnGrad}>
                        <Text style={styles.bookBtnText}>View Seba</Text>
                        <Feather name="arrow-right" size={18} color="#111827" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const MiniPill = ({ icon, children }) => (
    <View style={styles.miniPill}>
        <Feather name={icon} size={14} color="#92400e" />
        <Text style={styles.miniPillText}>{children}</Text>
    </View>
);

export default Index;

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
    bg: { flex: 1 },
    container: { paddingBottom: 20 },

    /* Header */
    header: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    brandDot: { width: 10, height: 10, borderRadius: 10, backgroundColor: '#f59e0b' },
    brandText: { fontSize: 16, fontWeight: '900', color: '#111827' },
    brandAccent: { color: '#f59e0b' },
    headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    pillIcon: {
        width: 38,
        height: 38,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderWidth: 1,
        borderColor: 'rgba(17,24,39,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pillBtn: {
        height: 38,
        paddingHorizontal: 14,
        borderRadius: 14,
        backgroundColor: '#fbbf24',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: 'rgba(17,24,39,0.10)',
    },
    pillBtnText: { color: '#111827', fontWeight: '900', fontSize: 13 },

    /* Hero */
    heroWrap: { paddingHorizontal: 16, marginTop: 6 },
    heroGlow: {
        position: 'absolute',
        left: 16,
        right: 16,
        top: 8,
        bottom: -10,
        borderRadius: 24,
        opacity: 0.9,
    },
    hero: {
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
        shadowColor: '#000',
        shadowOpacity: Platform.OS === 'ios' ? 0.18 : 0.28,
        shadowRadius: 20,
        elevation: 8,
    },
    heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    badge: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: '#fbbf24',
    },
    badgeText: { color: '#111827', fontWeight: '900', fontSize: 12 },
    chipRow: { flexDirection: 'row', gap: 6 },
    chip: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.14)',
    },
    chipText: { color: 'rgba(255,255,255,0.90)', fontWeight: '800', fontSize: 12 },
    heroTitle: {
        marginTop: 14,
        fontSize: 24,
        lineHeight: 30,
        fontWeight: '900',
        color: '#fff',
    },
    heroAccent: { color: '#fbbf24' },
    heroSub: { marginTop: 8, color: 'rgba(255,255,255,0.78)', fontSize: 12.8, lineHeight: 18 },

    /* Search */
    searchWrap: { marginTop: 14, gap: 10 },
    searchInputWrap: {
        height: 48,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.10)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.18)',
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    searchInput: { flex: 1, color: '#fff', fontWeight: '700', fontSize: 13 },
    searchBtn: { height: 48, borderRadius: 16, overflow: 'hidden' },
    searchBtnGrad: {
        flex: 1,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    searchBtnText: { color: '#111827', fontWeight: '900', fontSize: 14 },

    /* Stats */
    statsRow: {
        marginTop: 14,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.14)',
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    stat: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    statValue: { color: '#fff', fontWeight: '900', fontSize: 13 },
    statLabel: { color: 'rgba(255,255,255,0.70)', fontWeight: '700', fontSize: 11 },
    divider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.14)', marginHorizontal: 10 },

    /* Features */
    featuresWrap: { marginTop: 14, paddingHorizontal: 16, gap: 10 },
    featureCard: {
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderRadius: 20,
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(17,24,39,0.08)',
        shadowColor: '#000',
        shadowOpacity: Platform.OS === 'ios' ? 0.08 : 0.18,
        shadowRadius: 14,
        elevation: 3,
    },
    featureIcon: {
        width: 44,
        height: 44,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureTitle: { marginTop: 10, fontSize: 14.5, fontWeight: '900', color: '#111827' },
    featureDesc: { marginTop: 4, fontSize: 12.4, lineHeight: 17, color: '#6b7280', fontWeight: '600' },

    /* Section */
    section: { marginTop: 18, paddingHorizontal: 16 },
    sectionHead: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
    sectionTitle: { fontSize: 18, fontWeight: '900', color: '#111827' },
    sectionAccent: { color: '#f59e0b' },
    sectionSub: { marginTop: 6, color: '#6b7280', fontSize: 12.5, lineHeight: 17, fontWeight: '600' },
    viewAllBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: 'rgba(245,158,11,0.14)',
        borderWidth: 1,
        borderColor: 'rgba(245,158,11,0.18)',
    },
    viewAllText: { fontWeight: '900', color: '#92400e', fontSize: 12.5 },

    /* Temple Card */
    templeCard: {
        width: CARD_W,
        marginRight: 12,
        borderRadius: 22,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(17,24,39,0.08)',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.22,
        shadowRadius: 16,
        elevation: 5,
    },
    templeCover: { padding: 14, height: 180 },
    templeCoverTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.22)',
    },
    tagText: { color: '#fff', fontWeight: '900', fontSize: 12 },
    ratingPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: 'rgba(17,24,39,0.35)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.16)',
    },
    ratingText: { color: '#fff', fontWeight: '900', fontSize: 12 },
    templeMark: {
        marginTop: 18,
        width: 58,
        height: 58,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.24)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    templeMarkText: { color: '#fff', fontSize: 24, fontWeight: '900' },
    coverTitle: { marginTop: 12, color: '#fff', fontWeight: '900', fontSize: 15 },
    coverMeta: { marginTop: 6, flexDirection: 'row', alignItems: 'center', gap: 6 },
    coverMetaText: { color: 'rgba(255,255,255,0.88)', fontWeight: '700', fontSize: 12, flex: 1 },

    templeBody: { padding: 12 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
    templeName: { flex: 1, fontSize: 14, fontWeight: '900', color: '#111827' },
    reviewsText: { fontSize: 12, fontWeight: '800', color: '#6b7280' },
    rowChips: { marginTop: 10, flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
    miniPill: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 999,
        backgroundColor: 'rgba(245,158,11,0.12)',
        borderWidth: 1,
        borderColor: 'rgba(245,158,11,0.16)',
    },
    miniPillText: { color: '#92400e', fontWeight: '900', fontSize: 12 },
    bookBtn: { marginTop: 12, height: 44, borderRadius: 16, overflow: 'hidden' },
    bookBtnGrad: {
        flex: 1,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    bookBtnText: { color: '#111827', fontWeight: '900', fontSize: 14 },

    /* CTA */
    ctaWrap: { marginTop: 18, paddingHorizontal: 16 },
    cta: {
        borderRadius: 22,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(17,24,39,0.10)',
        shadowColor: '#000',
        shadowOpacity: Platform.OS === 'ios' ? 0.12 : 0.22,
        shadowRadius: 18,
        elevation: 5,
    },
    ctaTitle: { color: '#fff', fontWeight: '900', fontSize: 16, textAlign: 'center' },
    ctaSub: { marginTop: 6, color: 'rgba(255,255,255,0.90)', fontWeight: '700', fontSize: 12.6, lineHeight: 17, textAlign: 'center' },
    ctaBtn: {
        marginTop: 12,
        alignSelf: 'center',
        height: 42,
        paddingHorizontal: 16,
        borderRadius: 14,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    ctaBtnText: { color: '#111827', fontWeight: '900', fontSize: 14 },
});