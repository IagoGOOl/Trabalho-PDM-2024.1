import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PostDetailScreen from "@/screens/PostDetailScreen";

export type ProfileStackParamList = {
    Profile: undefined;
    Settings: undefined;
    PostDetail: { postId: number; isUserPost?: boolean };
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{  headerShown: false  }} />
            <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ headerShown: false }} />


        </Stack.Navigator>
    );
}
