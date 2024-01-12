import { View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import listingsData from '@/assets/data/airbnb-listings.json'
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import Listings from '@/components/Listings'
import ListingsMap from '@/components/ListingsMap'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'

const Page = () => {
  const [category, setCategory] = useState('Petites maisons')
  const items = useMemo(() => listingsData as any, [])
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
      {/* <Listings listings={items} category={category} /> */}
      <ListingsMap listings={geoItems} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  )
}

export default Page