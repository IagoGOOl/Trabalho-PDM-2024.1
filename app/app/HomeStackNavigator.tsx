import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import PostDetailScreen from '../screens/PostDetailScreen';

export type HomeStackParamList = {
    Home: undefined;
    PostDetail: { postId: number; isUserPost?: boolean };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
