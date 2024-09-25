// app/home/institutions/add.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../../../utils/api';
import withAuth from '../../../../utils/withAuth';

const AddInstitutionScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleAdd = async () => {
        try {
            await api.post('/instituicao', { name, latitude, longitude });
            Alert.alert('Sucesso', 'Instituição adicionada com sucesso!');
            router.back();
        } catch (error) {
            console.error('Erro ao adicionar instituição:', error);
            Alert.alert('Erro', 'Falha ao adicionar instituição.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome da Instituição"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Latitude"
                value={latitude}
                onChangeText={setLatitude}
                style={styles.input}
            />
            <TextInput
                placeholder="Longitude"
                value={longitude}
                onChangeText={setLongitude}
                style={styles.input}
            />
            <Button title="Adicionar" onPress={handleAdd} />
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

export default withAuth(AddInstitutionScreen);
