import { View, Text, Dimensions, SafeAreaView, Platform, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight
const screenW = Dimensions.get('window').width;

const categories = [
    {
        name: 'Petites maisons',
        icon: 'home',
    },
    {
        name: 'Cabanes',
        icon: 'house-siding',
    },
    {
        name: 'Tendances',
        icon: 'local-fire-department',
    },
    {
        name: 'Jouer',
        icon: 'videogame-asset',
    },
    {
        name: 'Ville',
        icon: 'apartment',
    },
    {
        name: 'Bord de mer',
        icon: 'beach-access',
    },
    {
        name: 'Campagne',
        icon: 'nature-people',
    },
];

interface Props {
    onCategoryChanged: (category: string) => void
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
    const scrollRef = useRef<ScrollView>(null)
    const itemsRef = useRef<Array<TouchableOpacity | null>>([])
    const [activeIndex, setActiveIndex] = useState(0)

    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index);
        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onCategoryChanged(categories[index].name);
    };

    return (

        <SafeAreaView
            style={Platform.OS === "android" ?
                { marginTop: statusBarHeight, backgroundColor: "#FFF" }
                : { backgroundColor: "#FFF" }}
        >
            <View style={styles.container}>
                <View style={styles.actionRow}>
                    <Link href={'/(modals)/booking'} asChild>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Ionicons name="search" size={24} />
                            <View>
                                <Text style={{ fontFamily: "mon-sb" }}>Destination ?</Text>
                                <Text style={{ fontFamily: "mon", color: Colors.grey }}>N'importe où/quand</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity style={styles.filterBtn} onPress={() => { }}>
                        <Ionicons name="options-outline" size={24} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    ref={scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollviewContainerStyle}
                >
                    {categories.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            ref={(el) => itemsRef.current[index] = el}
                            style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                            onPress={() => selectCategory(index)}
                        >
                            <MaterialIcons size={24} name={item.icon as any} color={activeIndex === index ? "#000" : "#cacaca"} />
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: Platform.OS === "ios" ? 130 : 145,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
        paddingTop: Platform.OS === "ios" ? 0 : 10,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    searchBtn: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 10,
        padding: 14,
        alignItems: 'center',
        width: screenW - 120,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c2c2c2',
        borderRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#A2A0A2',
        borderRadius: 24,
    },
    scrollviewContainerStyle: {
        alignItems: 'center',
        gap: 30,
        paddingHorizontal: 16,
    },
    categoryText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: Colors.grey,
    },
    categoryTextActive: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: '#000',
    },
    categoriesBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
    },
    categoriesBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: 8,
    },

})
export default ExploreHeader