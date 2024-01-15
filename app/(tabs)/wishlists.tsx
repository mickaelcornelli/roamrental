import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Platform, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, query, getDocs } from 'firebase/firestore';
import db from '../../firebase'; // Importez la configuration Firestore que vous avez créée précédemment
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated"
import { defaultStyles } from '@/constants/Styles';
import Constants from 'expo-constants';
import Colors from '@/constants/Colors';

type RenderItemParams<T> = {
  item: T;
  index: number;
};


const statusBarHeight = Constants.statusBarHeight

const Page = () => {
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      setLoading(true)
      fetchFavoritesFromFirebase()
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }, []);

  const fetchFavoritesFromFirebase = async () => {
    const favoritesCollection = collection(db, 'favorites'); 

    try {
      const querySnapshot = await getDocs(query(favoritesCollection));
      const favoritesData: any = [];

      querySnapshot.forEach((doc) => {
        favoritesData.push(doc.data());
      });

      setFavorites(favoritesData);
    } catch (error) {
      setLoading(false)
      console.error('Erreur lors de la récupération des favoris depuis Firebase :', error);
      return [];
    } finally {
      setLoading(false)
    }
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
        <Text style={styles.header}>Mes favoris</Text>
        <Ionicons name="heart" size={26} color="red" />
      </View>

      {!loading && favorites.length > 0 &&
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }: RenderItemParams<any>) => (
            <Link href={`/listing/${item.id}`} asChild>
              <TouchableOpacity>
                <Animated.View
                  style={styles.listing}
                  entering={FadeInRight}
                  exiting={FadeOutLeft}
                >
                  <Image source={{ uri: item.medium_url }} style={styles.img} />

                  <View style={styles.content}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={[styles.row, { gap: 4 }]}>
                      <Ionicons name="star" size={16} />
                      <Text style={{ fontFamily: "mon-sb" }}>{item.review_scores_rating}/100</Text>
                    </View>
                  </View>

                  <Text style={{ fontFamily: "mon-sb" }}>{item.room_type}</Text>

                  <View style={styles.row}>
                    <Text style={{ fontFamily: "mon-sb" }}>{item.price}€</Text>
                    <Text style={{ fontFamily: "mon" }}>/nuit</Text>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </Link>
          )}
        />
      }
      {!loading && favorites.length === 0 &&
        <View style={styles.emptyFavorites}>
          <Text style={styles.emptyFavoritesText}>Vous n'avez aucun favoris</Text>
        </View>
      }

      {loading &&
        <ActivityIndicator size={"large"} color="red" />
      }

    </SafeAreaView>
  )
}


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
  emptyFavorites: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100
  },
  emptyFavoritesText: {
    fontFamily: "mon",
    color: Colors.grey,
    fontSize: 16
  },
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16
  },
  img: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  like: {
    position: 'absolute',
    right: 30,
    top: 30
  },
  name: {
    fontSize: 16,
    fontFamily: "mon-sb",
    flex: 1 // avoid overlap
  },
})

export default Page