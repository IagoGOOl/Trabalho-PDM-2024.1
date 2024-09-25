import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InstitutionScreen from '../screens/InstitutionScreen';
import AddInstitutionScreen from '../screens/AddInstitutionScreen';

export type InstitutionStackParamList = {
    Institution: undefined;
    AddInstitution: undefined;
};

const Stack = createNativeStackNavigator<InstitutionStackParamList>();

export default function InstitutionStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Institution">
            <Stack.Screen name="Institution" component={InstitutionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddInstitution" component={AddInstitutionScreen} options={{ title: 'Adicionar Instituição' }} />
        </Stack.Navigator>
    );
}
