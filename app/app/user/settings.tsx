import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../utils/api';

const SettingsScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/user/me');
                setName(response.data.user.name);
                setEmail(response.data.user.email);
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
});

export default SettingsScreen;
