import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';
import {
    BoxLink,
    ButtonGreen, ButtonText,
    Container, Input, LinkText, LinkWrapper, TextGray,
    TitleAuth,
} from '@/components/styled/StyledComponents';

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
        <Container>
            <TitleAuth>Entrar</TitleAuth>
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}

                autoCapitalize="none"
            />
            <Input
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}

                secureTextEntry
            />
            <ButtonGreen  onPress={handleLogin} >
                <ButtonText>Entrar</ButtonText>
            </ButtonGreen>

            <BoxLink>
                <TextGray>Não tem uma conta? </TextGray>
                <LinkWrapper   onPress={() => router.push('/register')}>
                    <LinkText>
                        Cadastre-se
                    </LinkText>
                </LinkWrapper>

            </BoxLink>



        </Container>
    );
}
