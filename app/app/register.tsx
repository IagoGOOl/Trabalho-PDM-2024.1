import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../utils/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    BoxLink,
    ButtonGreen, ButtonText,
    Container, Input, LinkText, LinkWrapper, TextGray,
    TitleAuth,
} from '@/components/styled/StyledComponents';

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
        <Container>
            <TitleAuth >Cadastro</TitleAuth>
            <Input
                placeholder="Nome"
                value={name}
                onChangeText={setName}

            />
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
            <ButtonGreen onPress={handleRegister} >
                <ButtonText>Cadastrar</ButtonText>
            </ButtonGreen>
            <BoxLink>
                <TextGray> Já é cadastrado ? realize seu  </TextGray>
                <LinkWrapper   onPress={() => router.push('/')}>
                    <LinkText>
                        Login
                    </LinkText>
                </LinkWrapper>

            </BoxLink>

        </Container>
    );
}

