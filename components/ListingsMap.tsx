import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { memo, useEffect, useRef } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import * as Location from 'expo-location';
import { ListingGeo } from '@/interfaces/listingGeo';

interface Props {
    listings: any;
}

const INITIAL_REGION = {
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.09,
    longitudeDelta: 0.09
}

const ListingsMap = ({ listings }: Props) => {

    const router = useRouter()

    const onMarkerSelected = (item: ListingGeo) => {
        router.push(`/listing/${item.properties.id}`)
    }

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster
        const points = properties.point_count

        return (
            <Marker
                key={`cluster-${id}`}
                onPress={onPress}
                coordinate={{
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1],
                }}
            >
                <View style={styles.clusterMarker}>
                    <Text style={{ textAlign: 'center', fontFamily: "mon-sb", color: "#FFF" }}>{points}</Text>
                </View>
            </Marker >
        )
    }

    return (
        <View style={defaultStyles.container}>
            <MapView
                animationEnabled={false}
                style={StyleSheet.absoluteFill}
                showsUserLocation
                showsMyLocationButton
                initialRegion={INITIAL_REGION}
                provider={PROVIDER_GOOGLE}
                clusterColor={Colors.primary}
                clusterFontFamily='mon-sb'
                renderCluster={renderCluster}
            >
                {listings.features.map((item: ListingGeo) => (
                    <Marker
                        key={item.properties.id}
                        onPress={() => onMarkerSelected(item)}
                        coordinate={{
                            latitude: +item.properties.latitude,
                            longitude: +item.properties.longitude
                        }}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>{item.properties.price}€</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    marker: {
        backgroundColor: "#FFF",
        padding: 6,
        borderRadius: 12,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
        alignItems: "center",
        justifyContent: "center"
    },
    markerText: {
        fontSize: 14,
        fontFamily: "mon-sb",
    },
    clusterMarker: {
        borderWidth:0.5,
        borderRadius: 50,
        backgroundColor: Colors.primary,
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center"
    }
})
export default ListingsMap