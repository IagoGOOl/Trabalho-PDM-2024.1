// app/institutions/edit/[id].tsx

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker, MapPressEvent, LatLng, Region } from 'react-native-maps'; // Importar LatLng e Region
import api from '../../../utils/api';

const EditInstitutionScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [name, setName] = useState('');
    const [coordinate, setCoordinate] = useState<LatLng | null>(null); // Definir o tipo de coordinate
    const [region, setRegion] = useState<Region | null>(null); // Definir o tipo de region
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstitution = async () => {
            try {
                const response = await api.get(`/instituicao/${id}`);
                setName(response.data.name);
                const latitude = parseFloat(response.data.latitude);
                const longitude = parseFloat(response.data.longitude);
                const coord = { latitude, longitude };
                setCoordinate(coord);
                setRegion({
                    ...coord,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                });
            } catch (error) {
                console.error('Erro ao carregar instituição:', error);
                Alert.alert('Erro', 'Não foi possível carregar a instituição.');
                router.back();
            } finally {
                setLoading(false);
            }
        };
        fetchInstitution();
    }, []);

    const handleMapPress = (event: MapPressEvent) => {
        const { coordinate } = event.nativeEvent;
        setCoordinate(coordinate);
    };

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert('Erro', 'Por favor, insira o nome da instituição.');
            return;
        }
        if (!coordinate) {
            Alert.alert('Erro', 'Por favor, selecione a localização da instituição no mapa.');
            return;
        }
        try {
            await api.put(`/instituicao/${id}`, {
                name,
                latitude: coordinate.latitude.toString(),
                longitude: coordinate.longitude.toString(),
            });
            Alert.alert('Sucesso', 'Instituição atualizada com sucesso!');
            router.back();
        } catch (error) {
            console.error('Erro ao atualizar instituição:', error);
            Alert.alert('Erro', 'Não foi possível atualizar a instituição.');
        }
    };

    if (loading || !region) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
                onPress={handleMapPress}
            >
                {coordinate && (
                    <Marker
                        coordinate={coordinate}
                        draggable
                        onDragEnd={(e) => setCoordinate(e.nativeEvent.coordinate)}
                    />
                )}
            </MapView>
            <View style={styles.form}>
                <TextInput
                    placeholder="Nome da Instituição"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <Button title="Salvar" onPress={handleSave} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    form: {
        padding: 16,
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditInstitutionScreen;
