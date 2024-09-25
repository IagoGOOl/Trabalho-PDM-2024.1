import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="profile/index"
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="posts/index"
                options={{
                    tabBarLabel: 'Posts',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="write/index"
                options={{
                    tabBarLabel: 'Escrever',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="create" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="institutions/index"
                options={{
                    tabBarLabel: 'Instituições',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="map" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}
