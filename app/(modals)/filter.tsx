import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
// @ts-ignore
import CheckBox from '@react-native-community/checkbox';
import Slider from '@react-native-community/slider';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const beddingGroups = [
    {
        name: 'Lit simple',
        text: 'Une personne',
        count: 0,
    },
    {
        name: 'Lit double',
        text: 'Deux personnes',
        count: 0,
    }
]

const amenitiesGroups = [
    'Internet',
    'WIFI',
    'Cuisine',
    'Chauffage',
    'Lave-linge',
    'Sèche-linge',
    'Télévision',
    'Téléphone',
    'Douche',
    'Bain',
    'Climatisation',
    'Balcon',
    'Terasse',
    'Parking',
    'Ascenseur'
];

const pageViewPositionSlider = {
    trackColor: '#6390C8',
    thumbColor: '#1411AB',
    style: {
        width: '100%',
        height: 20,
    },
};

const Page = () => {
    const [openCard, setOpenCard] = useState(0);
    const [pricePerNight, setPricePerNight] = useState(50);
    const [amenities, setAmenities] = useState<any>([])
    const [bedding, setBedding] = useState(beddingGroups);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const router = useRouter();

    const onClearAll = () => {
        setOpenCard(0);
    };

    const handleAmenityToggle = (amenity: string) => {

        if (amenities.includes(amenity)) {

            setAmenities(amenities.filter((item: any) => item !== amenity));
        } else {

            setAmenities([...amenities, amenity]);
        }
    };


    const onPriceChange = (value: any) => {
        setPricePerNight(value.toFixed(0));
    };

    return (
        <BlurView intensity={70} style={styles.container} tint="light">

            {/*  Price */}
            <View style={styles.card}>
                {openCard != 0 && (
                    <AnimatedTouchableOpacity
                        onPress={() => setOpenCard(0)}
                        style={styles.cardPreview}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}>
                        <Text style={styles.previewText}>A quel prix</Text>
                        <Text style={styles.previewdData}>Filtrer</Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard == 0 && <Text style={styles.cardHeader}>Filtrer le prix</Text>}
                {openCard == 0 && (
                    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.cardBody}>
                        <View>
                            <Text style={styles.label}>Supérieur à {pricePerNight}€</Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={1}
                                maximumValue={200}
                                thumbTintColor="silver"
                                maximumTrackTintColor={pageViewPositionSlider.trackColor}
                                minimumTrackTintColor={pageViewPositionSlider.trackColor}
                                onValueChange={onPriceChange}
                            />
                        </View>
                    </Animated.View>
                )}
            </View>

            {/* Bedding */}
            <View style={styles.card}>
                {openCard != 1 && (
                    <AnimatedTouchableOpacity
                        onPress={() => setOpenCard(1)}
                        style={styles.cardPreview}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}>
                        <Text style={styles.previewText}>Chambre</Text>
                        <Text style={styles.previewdData}>Combien de lits</Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard == 1 && <Text style={styles.cardHeader}>Combien de lit avez vous besoin?</Text>}

                {openCard == 1 && (
                    <Animated.View style={styles.cardBody}>
                        {beddingGroups.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.guestItem,
                                    index + 1 < beddingGroups.length ? styles.itemBorder : null,
                                ]}>
                                <View>
                                    <Text style={{ fontFamily: 'mon-sb', fontSize: 14 }}>{item.name}</Text>
                                    <Text style={{ fontFamily: 'mon', fontSize: 14, color: Colors.grey }}>
                                        {item.text}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        gap: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            const newGroups = [...bedding];
                                            newGroups[index].count =
                                                newGroups[index].count > 0 ? newGroups[index].count - 1 : 0;
                                            setBedding(newGroups);
                                        }}>
                                        <Ionicons
                                            name="remove-circle-outline"
                                            size={26}
                                            color={bedding[index].count > 0 ? Colors.grey : '#cdcdcd'}
                                        />
                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            fontFamily: 'mon',
                                            fontSize: 16,
                                            minWidth: 18,
                                            textAlign: 'center',
                                        }}>
                                        {item.count}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            const newGroups = [...bedding];
                                            newGroups[index].count++;
                                            setBedding(newGroups);
                                        }}>
                                        <Ionicons name="add-circle-outline" size={26} color={Colors.grey} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </Animated.View>
                )}
            </View>

            {/* Convenience */}
            <View style={styles.card}>
                {openCard != 2 && (
                    <AnimatedTouchableOpacity
                        onPress={() => setOpenCard(2)}
                        style={styles.cardPreview}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}>
                        <Text style={styles.previewText}>Commodités</Text>
                        <Text style={styles.previewdData}>Filtrer</Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard == 2 && <Text style={styles.cardHeader}>Que désirez-vous ?</Text>}

                {openCard == 2 && (
                    <Animated.View style={styles.cardBody}>
                        {amenitiesGroups.map((amenity, index) => (
                            <View key={index} style={styles.amenityItem}>
                                <View>
                                    <Text style={{ fontFamily: 'mon-sb', fontSize: 14 }}>{amenity}</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    {/* <CheckBox
                                        value={amenities.includes(amenity)}
                                        onValueChange={() => handleAmenityToggle(amenity)}
                                    />
 */}
                                    <CheckBox
                                        disabled={false}
                                        value={toggleCheckBox}
                                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                    />
                                    
                                </View>
                            </View>
                        ))}
                    </Animated.View>
                )}
            </View>

            {/* Footer */}
            <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ height: '100%', justifyContent: 'center' }}
                        onPress={onClearAll}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontFamily: 'mon-sb',
                                textDecorationLine: 'underline',
                            }}>
                            Effacer tout
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[defaultStyles.btn, { paddingLeft: 10, paddingRight: 10 }]}
                        onPress={() => router.back()}>
                        <Text style={defaultStyles.btnText}>Appliquer</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        margin: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        gap: 20,
    },
    cardHeader: {
        fontFamily: 'mon-b',
        fontSize: 24,
        padding: 20,
    },
    cardBody: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    cardPreview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },

    searchSection: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ABABAB',
        borderRadius: 8,
        marginBottom: 16,
    },
    searchIcon: {
        padding: 10,
    },
    inputField: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    placesContainer: {
        flexDirection: 'row',
        gap: 25,
    },
    place: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    placeSelected: {
        borderColor: Colors.grey,
        borderWidth: 2,
        borderRadius: 10,
        width: 100,
        height: 100,
    },
    previewText: {
        fontFamily: 'mon-sb',
        fontSize: 14,
        color: Colors.grey,
    },
    previewdData: {
        fontFamily: 'mon-sb',
        fontSize: 14,
        color: Colors.dark,
    },

    guestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grey,
    },


    label: {
        fontSize: 16,
        marginBottom: 5,
        color: Colors.grey,
        fontFamily: 'mon'
    },
    slider: {
        width: "100%",
        height: 35,
        backgroundColor: "#6A645A",
        marginBottom: 20,
    },
    amenityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export default Page;