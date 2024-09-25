import React, {useState} from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/app/index';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            console.log()
            const response = await axios.post('http://localhost:3000/login', {
                email,
                 password,
            });
            const token = response.data.token;

            await AsyncStorage.setItem('token', token);
            navigation.replace('Main');
        } catch (error) {
            Alert.alert('Erro', 'Credenciais inválidas.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <Button title="Entrar" onPress={handleLogin} />
            <Button title="Cadastrar-se" onPress={() => navigation.navigate('Register')} />
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
