import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import {useRouter} from 'expo-router';
import MapView, {LatLng, MapPressEvent, Marker, Region} from 'react-native-maps';
import * as Location from 'expo-location';
import api from '../../utils/api';
import {
    ButtonGreen,
    ButtonText,
    ContainerMap,
    Input,
    TextGreen,
    TitleGreen
} from "@/components/styled/StyledComponents";

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
        <ContainerMap>
            <TitleGreen>Nova Instituição</TitleGreen>
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
            <View >
                <TextGreen>
                    Toque no mapa para adicionar o local da Instituição
                </TextGreen>
                <Input
                    placeholder="Nome da Instituição"
                    value={name}
                    onChangeText={setName}
                />
                <ButtonGreen  onPress={handleAdd} >
                    <ButtonText>Adicionar Instituição</ButtonText>
                </ButtonGreen>
            </View>
        </ContainerMap>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: '60%',
        width: '100%',
        marginTop:5,
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
