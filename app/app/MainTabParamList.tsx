import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WriteScreen from '../screens/WriteScreen';
import HomeStackNavigator from "@/components/HomeStackNavigator";
import ProfileStackNavigator from "@/components/ProfileStackNavigator";
import InstitutionStackNavigator from "@/components/InstitutionStackNavigator";

export type MainTabParamList = {
    HomeStack: undefined;
    ProfileStack: undefined;
    Write: undefined;
    InstitutionStack: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator initialRouteName="HomeStack">
            <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{  headerShown: false  }} />
            <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} options={{  headerShown: false }} />
            <Tab.Screen name="Write" component={WriteScreen} options={{  headerShown: false }} />
            <Tab.Screen name="InstitutionStack" component={InstitutionStackNavigator} options={{  headerShown: false  }} />
        </Tab.Navigator>
    );
}
