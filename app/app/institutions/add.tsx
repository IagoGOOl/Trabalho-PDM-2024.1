import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import MapView, { Marker, MapPressEvent, LatLng, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import api from '../../utils/api';

const AddInstitutionScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [coordinate, setCoordinate] = useState<LatLng | null>(null);
    const [region, setRegion] = useState<Region | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permissão negada', 'Permissão de acesso à localização negada.');
                    // Definir uma região padrão caso a permissão seja negada
                    setRegion({
                        latitude: -23.5505,
                        longitude: -46.6333,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    });
                } else {
                    const location = await Location.getCurrentPositionAsync({});
                    setRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    });
                }
            } catch (error) {
                console.error('Erro ao obter localização do usuário:', error);
            } finally {
                setLoading(false);
            }
        };
        getUserLocation();
    }, []);

    const handleMapPress = (event: MapPressEvent) => {
        const { coordinate } = event.nativeEvent;
        setCoordinate(coordinate);
    };

    const handleAdd = async () => {
        if (!name.trim()) {
            Alert.alert('Erro', 'Por favor, insira o nome da instituição.');
            return;
        }
        if (!coordinate) {
            Alert.alert('Erro', 'Por favor, selecione a localização da instituição no mapa.');
            return;
        }
        try {
            await api.post('/instituicao', {
                name,
                latitude: coordinate.latitude.toString(),
                longitude: coordinate.longitude.toString(),
            });
            Alert.alert('Sucesso', 'Instituição adicionada com sucesso!');
            router.back();
        } catch (error) {
            console.error('Erro ao adicionar instituição:', error);
            Alert.alert('Erro', 'Falha ao adicionar instituição.');
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
                <Button title="Adicionar" onPress={handleAdd} />
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

export default AddInstitutionScreen;
