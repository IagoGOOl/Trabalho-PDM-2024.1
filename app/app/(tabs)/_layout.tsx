import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import {Ionicons} from "@expo/vector-icons";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  return (
    <Tabs
     >
      <Tabs.Screen
        name="profile"
        options={{
            title: 'Perfil',
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
            ),
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
            title: 'Posts',
            tabBarLabel: 'Posts',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="list" color={color} size={size} />
            ),
        }}
      />
        <Tabs.Screen
            name="write"
            options={{
                tabBarLabel: 'Escrever',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="create" color={color} size={size} />
                ),
            }}
        />
        <Tabs.Screen
            name="institutions"
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
