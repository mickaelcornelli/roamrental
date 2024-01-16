import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated';
import { FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
// @ts-ignore
import Checkbox from 'expo-checkbox';
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

const mealPlanGroups = [
    {
        name: "Formule Tout Compris",
        description: "Inclut le petit-déjeuner, le déjeuner et le dîner.",
        count: 0
    },
    {
        name: "Demi-Pension",
        description: "Inclut le petit-déjeuner et le dîner.",
        count: 0
    },
    {
        name: "Pension Complète",
        description: "Inclut le petit-déjeuner, le déjeuner et le dîner.",
        count: 0
    },
    {
        name: "Petit-Déjeuner Inclus",
        description: "Inclut uniquement le petit-déjeuner.",
        count: 0
    },
    {
        name: "Sans Repas",
        description: "Aucun repas inclus dans le logement.",
        count: 0
    },
    {
        name: "Repas Sur Demande",
        description: "Vous pouvez commander des repas au besoin.",
        count: 0
    },
];


const Page = () => {
    const [openCard, setOpenCard] = useState(0);
    const [pricePerNight, setPricePerNight] = useState(50);
    const [bedding, setBedding] = useState(beddingGroups);
    const [meal, setMeal] = useState(mealPlanGroups);
    const [selectedMeal, setSelectedMeal] = useState<string | null>(null)
    const [amenitiesStates, setAmenitiesStates] = useState(Array(amenitiesGroups.length).fill(false));
    const [animalCheck, setAnimalCheck] = useState(Boolean(false))

    const router = useRouter();

    const goBack = () => {
        router.push("/")
    };

    const closeModal = () => {
        setOpenCard(999)
    }

    const onPriceChange = (value: any) => {
        setPricePerNight(value.toFixed(0));
    };

    const handleAmenityToggle = (index: any) => {
        const newAmenitiesStates = [...amenitiesStates];
        newAmenitiesStates[index] = !newAmenitiesStates[index];
        setAmenitiesStates(newAmenitiesStates);
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
                        <Text style={styles.previewdData}><FontAwesome name="sliders" size={20} /></Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard == 0 &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.cardHeader}>Filtrer le prix</Text>
                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ marginTop: 5, marginRight: 5, backgroundColor: "#C8C8C8", borderRadius: 50, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Ionicons name="close" size={20} style={{ zIndex: 99 }} />
                        </TouchableOpacity>
                    </View>
                }
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
                        <Text style={styles.previewdData}><Fontisto name="bed-patient" size={20} /></Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard == 1 &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.cardHeader}>Combien de lit avez vous besoin?</Text>
                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ marginTop: 5, marginRight: 5, backgroundColor: "#C8C8C8", borderRadius: 50, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Ionicons name="close" size={20} style={{ zIndex: 99 }} />
                        </TouchableOpacity>
                    </View>
                }

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
            <View style={openCard == 2 ? [styles.card, { flex: 1 }] : styles.card}>
                {openCard != 2 && (
                    <AnimatedTouchableOpacity
                        onPress={() => setOpenCard(2)}
                        style={styles.cardPreview}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}>
                        <Text style={styles.previewText}>Commodités</Text>
                        <Text style={styles.previewdData}><FontAwesome5 name="tv" size={20} /></Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard == 2 &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.cardHeader}>Que désirez-vous ?</Text>
                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ marginTop: 5, marginRight: 5, backgroundColor: "#C8C8C8", borderRadius: 50, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Ionicons name="close" size={20} style={{ zIndex: 99 }} />
                        </TouchableOpacity>
                    </View>
                }

                {openCard == 2 && (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 90 }}
                    >
                        <Animated.View>
                            {amenitiesGroups.map((amenity, index) => (
                                <View key={index} style={styles.amenityItem}>
                                    <View>
                                        <Text style={{ fontFamily: 'mon-sb', fontSize: 14 }}>{amenity}</Text>
                                    </View>
                                    <View style={styles.checkboxContainer}>
                                        <Checkbox
                                            style={{ margin: 8 }}
                                            value={amenitiesStates[index]}
                                            onValueChange={() => handleAmenityToggle(index)}
                                            color={amenitiesStates[index] ? '#007AFF' : undefined}
                                        />
                                    </View>
                                </View>
                            ))}
                        </Animated.View>
                    </ScrollView>
                )}
            </View>

            {/* Dog */}
            <View style={openCard == 3 ? [styles.card, { flex: 1 }] : styles.card}>
                {openCard != 3 && (
                    <AnimatedTouchableOpacity
                        onPress={() => setOpenCard(3)}
                        style={styles.cardPreview}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}>
                        <Text style={styles.previewText}>Animal</Text>
                        <Text style={styles.previewdData}><MaterialCommunityIcons name="dog" size={20} /></Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard == 3 &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.cardHeader}>Amenez-vous des animaux ?</Text>
                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ marginTop: 5, marginRight: 5, backgroundColor: "#C8C8C8", borderRadius: 50, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Ionicons name="close" size={20} style={{ zIndex: 99 }} />
                        </TouchableOpacity>
                    </View>
                }
                {openCard == 3 && (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 90 }}
                    >
                        <Animated.View>


                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontFamily: 'mon-sb', fontSize: 14, paddingLeft: 10, paddingRight: 10 }}>Cocher la case si vous venez avec votre animal</Text>
                                <Checkbox
                                    value={animalCheck}
                                    onValueChange={() => setAnimalCheck(!animalCheck)}
                                    color={animalCheck ? '#007AFF' : undefined}
                                />
                            </View>

                        </Animated.View>
                    </ScrollView>
                )}
            </View>

            {/* Restaurant */}
            <View style={openCard == 4 ? [styles.card, { flex: 1 }] : styles.card}>
                {openCard != 4 && (
                    <AnimatedTouchableOpacity
                        onPress={() => setOpenCard(4)}
                        style={styles.cardPreview}
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}>
                        <Text style={styles.previewText}>Repas</Text>
                        <Text style={styles.previewdData}><Ionicons name="restaurant" size={20} /></Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard == 4 &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.cardHeader}>Désirez-vous une formule spéciale ?</Text>
                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ marginTop: 5, marginRight: 5, backgroundColor: "#C8C8C8", borderRadius: 50, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Ionicons name="close" size={20} style={{ zIndex: 99 }} />
                        </TouchableOpacity>
                    </View>
                }

                {openCard == 4 && (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    >
                        <Animated.View style={styles.cardBody}>
                            {mealPlanGroups.map((item, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.guestItem,
                                        index + 1 < mealPlanGroups.length ? styles.itemBorder : null,
                                    ]}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontFamily: 'mon-sb', fontSize: 14 }}>{item.name}</Text>
                                        <Text
                                            style={{
                                                paddingRight: 5,
                                                fontFamily: 'mon',
                                                fontSize: 14,
                                                color: Colors.grey,
                                            }}
                                        >
                                            {item.description}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            gap: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                const newGroups = [...meal];


                                                if (item.name !== selectedMeal) {

                                                    if (selectedMeal) {
                                                        const prevIndex = meal.findIndex(
                                                            (mealItem) => mealItem.name === selectedMeal
                                                        );
                                                        if (prevIndex !== -1) {
                                                            newGroups[prevIndex].count = 0;
                                                        }
                                                    }


                                                    newGroups[index].count = 1;
                                                    setSelectedMeal(item.name);
                                                } else {
                                                    newGroups[index].count = 0;
                                                    setSelectedMeal(null);
                                                }

                                                setMeal(newGroups);
                                            }}
                                        >
                                            <Ionicons
                                                name="remove-circle-outline"
                                                size={26}
                                                color={meal[index].count > 0 ? Colors.grey : '#cdcdcd'}
                                            />
                                        </TouchableOpacity>
                                        <Text
                                            style={{
                                                fontFamily: 'mon',
                                                fontSize: 16,
                                                minWidth: 18,
                                                textAlign: 'center',
                                            }}
                                        >
                                            {item.count}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                const newGroups = [...meal];

                                                if (item.name !== selectedMeal) {

                                                    if (selectedMeal) {
                                                        const prevIndex = meal.findIndex(
                                                            (mealItem) => mealItem.name === selectedMeal
                                                        );
                                                        if (prevIndex !== -1) {
                                                            newGroups[prevIndex].count = 0;
                                                        }
                                                    }

                                                    newGroups[index].count = 1;
                                                    setSelectedMeal(item.name);
                                                } else {

                                                    newGroups[index].count = 0;
                                                    setSelectedMeal(null);
                                                }

                                                setMeal(newGroups);
                                            }}
                                        >
                                            <Ionicons name="add-circle-outline" size={26} color={Colors.grey} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </Animated.View>
                    </ScrollView>
                )}
            </View>

            {/* Footer */}
            <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ height: '100%', justifyContent: 'center' }}
                        onPress={goBack}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontFamily: 'mon-sb',
                                textDecorationLine: 'underline',
                            }}>Retour
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