import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../utils/api';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await api.post('/register', { name, email, password });
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            const response = await api.post('/login', { email, password });
            const { token } = response.data;
            await AsyncStorage.setItem('userToken', token);
            router.replace('/(tabs)/posts');
        } catch (error) {
            console.error('Erro no cadastro:', error);
            Alert.alert('Erro', 'Falha no cadastro. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
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
            <Button title="Cadastrar" onPress={handleRegister} />
            <Button
                title="Voltar ao Login"
                onPress={() => router.replace('/')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 100,
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
