import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';

import {Ionicons} from "@expo/vector-icons";
import TabBarIconWithCircle from "@/components/styled/TabBarIconWithCircle";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

import ProfileIcon from '../../assets/icons/user-tab.png';
import PostsIcon from '../../assets/icons/post.png';
import WriteIcon from '../../assets/icons/write.png';
import InstitutionsIcon from '../../assets/icons/institution.png';
import TabBarIconUser from "@/components/styled/iconUser";


export default function TabLayout() {

    const ICONS = {
        profile: ProfileIcon,
        posts: PostsIcon,
        write: WriteIcon,
        institutions: InstitutionsIcon,
    };

  return (
    <Tabs
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#F6F6F6', // Cor de fundo da tab bar
                height: 65, // Altura da tab bar
                elevation: 0, // Remove a sombra no Android
            },

        }}
     >
      <Tabs.Screen
        name="profile"
        options={{
            headerShown: false,
            tabBarIcon: ({  focused}) => (
                <TabBarIconUser
                    focused={focused}
                    icon={ICONS.profile}
                   />
            ),
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
            headerShown: false,
            tabBarIcon: ({  focused}) => (
                <TabBarIconWithCircle
                    focused={focused}
                    icon={ICONS.posts}
                />
            ),
        }}
      />
        <Tabs.Screen
            name="write"
            options={{
                headerShown: false,
                tabBarIcon: ({  focused}) => (
                    <TabBarIconWithCircle
                        focused={focused}
                        icon={ICONS.write}
                    />
                ),
            }}
        />
        <Tabs.Screen
            name="institutions"
            options={{
                headerShown: false,
                tabBarIcon: ({  focused}) => (
                    <TabBarIconWithCircle
                        focused={focused}
                        icon={ICONS.institutions}
                    />
                ),
            }}
        />
    </Tabs>
  );
}
