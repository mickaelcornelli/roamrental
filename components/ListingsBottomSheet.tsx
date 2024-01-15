import { View, Text, StyleSheet } from 'react-native'
import React, { useRef, useMemo, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import Listings from './Listings';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler"
interface Props {
    listings: any[];
    category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10%', '100%'], [])
    const [refresh, setRefresh] = useState(0)

    const showMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1)
    }

    return (
        <BottomSheet
            index={1}
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            handleIndicatorStyle={{ backgroundColor: Colors.grey }}
            enablePanDownToClose={false}
            style={styles.sheetContainer}

        >
            <View style={{ flex: 1 }}>
                <Listings
                    listings={listings}
                    category={category}
                    refresh={refresh}
                />
                <View style={styles.absoluteBtn}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={showMap}
                    >
                        <Text style={styles.btnText}>Carte</Text>
                        <Ionicons name="map" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    sheetContainer: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    absoluteBtn: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: "center"
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 16,
        height: 50,
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: 30,
        gap: 8,
    },
    btnText: {
        fontFamily: "mon-sb",
        color: "#FFF"
    },
})

export default ListingsBottomSheet