import React, { useState, useEffect } from 'react';
import {View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image} from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../utils/api';
import * as ImagePicker from 'expo-image-picker';
import {token} from "stylis";
import values from "ajv/lib/vocabularies/jtd/values";

const SettingsScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/user/me');
                setName(response.data.user.name);
                setEmail(response.data.user.email);
                setPassword(response.data.user.password);
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
                Alert.alert('Erro', 'Não foi possível carregar seus dados.');
            }
        };
        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            await api.patch('/user/me', { name, email });
            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            router.back();
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            Alert.alert('Erro', 'Não foi possível atualizar seus dados.');
        }
    };

    return (
        <View style={styles.container}>
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
                onChangeText={setPassword}
                style={styles.input}
                autoCapitalize="none"
            />
            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 100,
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
    },
    avatar: {
        width: 128,
        height: 128,
        borderRadius: 64,
        marginBottom: 8,
    },
    changePhotoText: {
        color: 'blue',
        marginBottom: 16,
    },
});

export default SettingsScreen;
