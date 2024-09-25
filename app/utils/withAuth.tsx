// utils/withAuth.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    return (props: any) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const checkAuth = async () => {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    router.replace('/');
                } else {
                    setLoading(false);
                }
            };
            checkAuth();
        }, []);

        if (loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
