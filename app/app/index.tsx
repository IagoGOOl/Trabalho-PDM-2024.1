import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                router.replace('/(tabs)/posts');
            }
        };
        checkAuth();
    }, []);

    const handleLogin = async () => {
        try {
            const response = await api.post('/login', { email, password });
            const { token } = response.data;
            await AsyncStorage.setItem('userToken', token);
            router.replace('/(tabs)/posts');
        } catch (error) {
            console.error('Erro no login:', error);
            Alert.alert('Erro', 'Falha no login. Verifique suas credenciais.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title="Entrar" onPress={handleLogin} />
            <Button
                title="Cadastrar-se"
                onPress={() => router.push('/register')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 100,
        borderColor: '#FFF'
    },
    title: {
        fontSize: 32,
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
    },
});
