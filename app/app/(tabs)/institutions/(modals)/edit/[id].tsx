// app/home/institutions/edit/[id].tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../../../../../utils/api';
import withAuth from '../../../../../utils/withAuth';

const EditInstitutionScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        const fetchInstitution = async () => {
            try {
                const response = await api.get(`/instituicao/${id}`);
                setName(response.data.name);
                setLatitude(response.data.latitude);
                setLongitude(response.data.longitude);
            } catch (error) {
                console.error('Erro ao carregar instituição:', error);
                Alert.alert('Erro', 'Não foi possível carregar a instituição.');
            }
        };
        fetchInstitution();
    }, []);

    const handleSave = async () => {
        try {
            await api.put(`/instituicao/${id}`, { name, latitude, longitude });
            Alert.alert('Sucesso', 'Instituição atualizada com sucesso!');
            router.back();
        } catch (error) {
            console.error('Erro ao atualizar instituição:', error);
            Alert.alert('Erro', 'Não foi possível atualizar a instituição.');
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

export default withAuth(EditInstitutionScreen);
