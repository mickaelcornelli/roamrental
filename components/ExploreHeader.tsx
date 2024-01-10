import { View, Text, SafeAreaView, Platform, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight

const ExploreHeader = () => {

    const catégories = [
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


    return (

        <SafeAreaView style={Platform.OS === "android" ? { flex: 1, marginTop: statusBarHeight } : { flex: 1 }}>
            <View>
                <View style={styles.container}>
                    <View style={styles.actionRow}>
                        <Link href={'/(modals)/booking'}>
                            Réservation
                        </Link>
                    </View>
                </View>
            </View>
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    actionRow: {
        flexDirection: "row"
    }
})
export default ExploreHeader