import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Platform } from 'react-native'

const Layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarLabelStyle: {
                fontFamily: 'mon-sb',
                ...Platform.select({
                    android: {
                        paddingBottom: 7
                    },
                }),
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: 'Explorer',
                    tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />
                }}
            />

            <Tabs.Screen
                name="wishlists"
                options={{
                    tabBarLabel: 'Favoris',
                    tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} />
                }}
            />

            <Tabs.Screen
                name="trips"
                options={{
                    tabBarLabel: 'Voyages',
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="airbnb" color={color} size={size} />
                }}
            />

            <Tabs.Screen
                name="inbox"
                options={{
                    tabBarLabel: 'Boîte de réception',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="message-outline" color={color} size={size} />
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: 'Profil',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} />
                }}
            />
        </Tabs>
    )
}

export default Layout