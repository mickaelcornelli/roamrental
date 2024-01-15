import { View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import listingsData from '@/assets/data/airbnb-listings.json'
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingsMap from '@/components/ListingsMap'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'

console.log(JSON.stringify(listingsData[10], null, 2))
const Page = () => {
  const [category, setCategory] = useState('Petites maisons')
  const items = useMemo(() => {
    // Filtrer les données en fonction de la catégorie sélectionnée
    switch (category) {
      case 'Petites maisons':
        return listingsData.filter(element => element.property_type === 'Apartment' || 'Loft');
      case 'Cabanes':
        return []
      case 'Tendances':
        return listingsData.filter(element => element.review_scores_value === 10);
      case 'Jouer':
        return listingsData.filter(element =>
          element.amenities.some(amenity =>
            amenity.includes('TV') || amenity.includes('Wireless Internet') || amenity.includes('Internet')
          )
        );
      case 'Ville':
        return listingsData
      case 'Bord de mer':
        return []
      case 'Campagne':
        return []
      default:
        return listingsData;
    }
  }, [category]);

  const geoItems = useMemo(() => listingsDataGeo, [])

  const onDataChanged = (category: string) => {
    setCategory(category)
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
        }}
      />
      <ListingsMap listings={geoItems} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  )
}

export default Page