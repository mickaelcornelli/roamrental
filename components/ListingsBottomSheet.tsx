import { View, Text } from 'react-native'
import React, { useRef, useMemo } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import Listings from './Listings';

interface Props {
    listings: any[];
    category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10%', '100%'], [])

    return (
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>

            <Listings listings={listings} category={category} />

        </BottomSheet >
    )
}

export default ListingsBottomSheet