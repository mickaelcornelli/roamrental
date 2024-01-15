import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, SafeAreaView, FlatList, Image } from 'react-native'
import listingsData from '@/assets/data/airbnb-listings.json'
import { defaultStyles } from '@/constants/Styles';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { ListingLocation } from '@/interfaces/listingLocation';


const statusBarHeight = Constants.statusBarHeight

const Page = () => {
  const [randomLocations, setRandomLocations] = useState<ListingLocation[]>([]);

  useEffect(() => {
    const selectedRandomLocations = getRandomLocations(listingsData as any, 10);
    setRandomLocations(selectedRandomLocations);
  }, []);

  const getRandomLocations = (data: ListingLocation[], count: number): ListingLocation[] => {
    const selectedLocations = new Set<ListingLocation>();
    while (selectedLocations.size < count && selectedLocations.size < data.length) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomLocation = data[randomIndex];
      if (!selectedLocations.has(randomLocation) && randomLocation.house_rules !== null) {
        selectedLocations.add(randomLocation);
      }
    }
    return Array.from(selectedLocations);
  };

  const getRandomNumberBetween = (min: number) => {
    const max = 10
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const calculateRandomStayDuration = (minimumNights: number) => {
    const randomNumber = getRandomNumberBetween(minimumNights);
    return randomNumber;
  };

  const getRandomHour = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  };


  const generateRandomCheckInAndCheckOutTime = () => {
    const randomCheckInTime = getRandomHour();
    const randomCheckOutTime = getRandomHour();

    return (
      <>
        <Text>Heure d'arrivée : {randomCheckInTime}</Text>
        <Text>Heure de départ : {randomCheckOutTime}</Text>
      </>
    )
  };


  return (
    <SafeAreaView
      style={
        Platform.OS === "android"
          ? [defaultStyles.container, { marginTop: statusBarHeight }]
          : defaultStyles.container
      }
    >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Vos locations</Text>
        <MaterialIcons title="travel-explore" size={26} />
      </View>

      <FlatList
        data={randomLocations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <Image
              source={{ uri: item.medium_url }}
              style={styles.bookingImage}
            />
            <Text style={styles.bookingTitle}>Nom : {item.name}</Text>
            <Text style={styles.bookingPrice}>Prix à la nuit: {item.price}€</Text>
            <Text style={styles.bookingDuration}>Durée du séjour : {calculateRandomStayDuration(item.minimum_nights)} jours</Text>
            <View style={styles.hostContainer}>
              <Image
                source={{ uri: item.host_picture_url }}
                style={styles.hostImage}
              />
              <Text style={styles.hostInitial}>{item.host_name.charAt(0)}</Text>
              <Text style={styles.hostName}>Hôte : {item.host_name}</Text>
            </View>
            <Text style={styles.bookingLocation}>Emplacement : {item.host_location}</Text>
            <Text style={styles.bookingGuests}>Nombre d'invités : {Math.floor(Math.random() * 5) + 1}</Text>
            <Text style={styles.bookingAmenities}>Équipements : {item.amenities.join(', ')}</Text>
            {generateRandomCheckInAndCheckOutTime()}
            <Text style={styles.bookingRating}>Évaluation : {item.review_scores_rating} ({item.number_of_reviews} avis)</Text>
          </View>
        )}
        contentContainerStyle={{ paddingLeft: 25, paddingRight: 25, gap: 10 }}
      />

    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    fontFamily: 'mon-b',
    fontSize: 24,
  },
  bookingItem: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  bookingImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 12,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookingPrice: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  bookingDuration: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  hostImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#CCC',
    position: 'relative'
  },
  hostInitial: {
    position: "absolute",
    left: 10
  },
  hostName: {
    marginLeft: 10,
    fontSize: 14,
  },
  bookingLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  bookingGuests: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  bookingAmenities: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  bookingRating: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default Page;
