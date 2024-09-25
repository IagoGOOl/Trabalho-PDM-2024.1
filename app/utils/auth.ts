import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'userToken';

export const storeToken = async (token: string) => {
    try {
        console.log('Token recebido:', token);
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.error('Error storing token', error);
    }
};

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        console.log('Token recebido:', token);
        return token;
    } catch (error) {
        console.error('Error getting token', error);
    }
};

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
        console.error('Error removing token', error);
    }
};
