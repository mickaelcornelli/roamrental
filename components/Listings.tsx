import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated"
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';

interface Props {
  listings: any[],
  category: string;
  refresh: number;
}

type RenderItemParams<T> = {
  item: T;
  index: number;
};

const Listings = ({ listings: items, category, refresh }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  const renderRow = ({ item, index }: RenderItemParams<any>) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Image source={{ uri: item.medium_url }} style={styles.img} />
          <TouchableOpacity style={styles.like}>
            <Ionicons name="heart-outline" size={24} />
          </TouchableOpacity>

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
  );

  useEffect(() => {
    // Scroll down BottomSheet
    if (refresh) {
      listRef.current?.scrollToOffset({
        offset: 0, animated: true
      })
    }
  }, [refresh])

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        ListHeaderComponent={<Text style={styles.info}>{items.length} résultats</Text>}
        showsVerticalScrollIndicator={false}
        ref={listRef}
        data={loading ? [] : items}
        renderItem={renderRow}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
  info: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
  }
})

export default Listings