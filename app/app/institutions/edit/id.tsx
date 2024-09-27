import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import MapView, {LatLng, MapPressEvent, Marker, Region} from 'react-native-maps';
import api from '../../../utils/api';
import {
    ButtonGreen,
    ButtonText,
    ContainerMap,
    Input,
    TextGreen,
    TitleGreen
} from "@/components/styled/StyledComponents";

const EditInstitutionScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [name, setName] = useState('');
    const [coordinate, setCoordinate] = useState<LatLng | null>(null);
    const [region, setRegion] = useState<Region | null>(null);
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
        <ContainerMap>
            <TitleGreen>Editar Instituição</TitleGreen>
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
            <View>
                <TextGreen>Inserir Nome da Instituição</TextGreen>
                <Input
                    placeholder="Nome da Instituição"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <ButtonGreen onPress={handleSave} >
                    <ButtonText>Salvar</ButtonText>
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
        height:'60%',
        width: '100%',
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
