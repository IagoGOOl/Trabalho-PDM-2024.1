import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleRegister = async () => {
        try {

            console.log(name, email, password);
            await axios.post('http://localhost:3000/register', {
                name,
                email,
                password,
            });
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password,
            });
            const token = response.data.token;

            await AsyncStorage.setItem('token', token);
            console.log(token);
            console.log(token);
            navigation.navigate('Main');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
        }
    };

    return (
        <View style={styles.container}>
        <TextInput placeholder="Nome" value={name} onChangeText={setName} style={styles.input} />
    <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
    <TextInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
    <Button title="Cadastrar" onPress={handleRegister} />
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginVertical: 8,
        borderBottomWidth: 1,
    },
});
