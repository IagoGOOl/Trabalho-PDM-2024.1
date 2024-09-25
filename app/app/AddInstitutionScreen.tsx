import React, {useState} from 'react';
import {Alert, Button, Keyboard, StyleSheet, Text, TextInput, View,} from 'react-native';
import MapView, {MapPressEvent, Marker} from 'react-native-maps';
import api from '../htpp/API';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {InstitutionStackParamList} from "@/components/InstitutionStackNavigator";

type Props = NativeStackScreenProps<InstitutionStackParamList, 'AddInstitution'>;
type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
};

export default function AddInstitutionScreen({ navigation }: Props) {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [region, setRegion] = useState<Region>({
        latitude: -15.7801,
        longitude: -47.9292,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const handleAddInstitution = async () => {
        if (!nome || latitude === null || longitude === null) {
            Alert.alert('Erro', 'Preencha todos os campos e selecione uma localização.');
            return;
        }

        try {
            await api.post('/instituicao', {
                nome,
                latitude,
                longitude,
            });
            Alert.alert('Sucesso', 'Instituição adicionada com sucesso!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível adicionar a instituição.');
        }
    };

    const handleMapPress = (event: MapPressEvent) => {
        const { coordinate } = event.nativeEvent;
        setLatitude(coordinate.latitude);
        setLongitude(coordinate.longitude);
        setRegion({
            ...region,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });
    };

    const handleGeocode = async () => {
        if (!endereco) {
            Alert.alert('Erro', 'Por favor, insira um endereço.');
            return;
        }

        try {
            // Usando a API Nominatim do OpenStreetMap para geocodificação
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const latitude = parseFloat(lat);
                const longitude = parseFloat(lon);
                setLatitude(latitude);
                setLongitude(longitude);
                setRegion({
                    ...region,
                    latitude,
                    longitude,
                });
                Keyboard.dismiss();
            } else {
                Alert.alert('Endereço não encontrado');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível geocodificar o endereço.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome da Instituição"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />
            <View style={styles.addressContainer}>
                <TextInput
                    placeholder="Endereço"
                    value={endereco}
                    onChangeText={setEndereco}
                    style={styles.addressInput}
                />
                <Button title="Buscar" onPress={handleGeocode} />
            </View>
            <Text style={styles.instructions}>
                Toque no mapa para selecionar a localização ou digite um endereço e pressione "Buscar".
            </Text>
            <MapView
                style={styles.map}
                region={region}
                onPress={handleMapPress}
            >
                {latitude !== null && longitude !== null && (
                    <Marker coordinate={{ latitude, longitude }} />
                )}
            </MapView>
            <Button title="Adicionar Instituição" onPress={handleAddInstitution} />
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
        padding: 8,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    addressInput: {
        flex: 1,
        borderBottomWidth: 1,
        padding: 8,
        marginRight: 8,
    },
    instructions: {
        textAlign: 'center',
        marginVertical: 8,
    },
    map: {
        flex: 1,
        marginVertical: 8,
    },
});
