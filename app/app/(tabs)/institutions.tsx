// app/institutions/index.tsx

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import {useRouter} from 'expo-router';
import api from '../../utils/api';
import * as Location from 'expo-location';
import {ButtonGreen, ButtonText, ContainerMap, TitleGreen} from "@/components/styled/StyledComponents";

const InstitutionsScreen = () => {
    const router = useRouter();
    const [institutions, setInstitutions] = useState<any[]>([]);
    const [region, setRegion] = useState<Region | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                const response = await api.get('/instituicao');
                setInstitutions(response.data);
            } catch (error) {
                console.error('Erro ao buscar instituições:', error);
            }
        };

        const getUserLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permissão negada', 'Permissão de acesso à localização negada.');
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

        fetchInstitutions();
        getUserLocation();
    }, []);

    const handleDeleteInstitution = async (id: number) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir esta instituição?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/instituicao/${id}`);
                            Alert.alert('Sucesso', 'Instituição excluída com sucesso!');
                            // Atualizar a lista de instituições
                            const response = await api.get('/instituicao');
                            setInstitutions(response.data);
                        } catch (error) {
                            console.error('Erro ao excluir instituição:', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
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
            <TitleGreen>Instituições</TitleGreen>
            <MapView
                style={styles.map}
                initialRegion={region}
            >
                {institutions.map((institution: any) => (
                    <Marker
                        key={institution.id}
                        coordinate={{
                            latitude: parseFloat(institution.latitude),
                            longitude: parseFloat(institution.longitude),
                        }}
                        title={institution.name}
                        onCalloutPress={() => {
                            Alert.alert(
                                'Opções',
                                'Escolha uma opção',
                                [
                                    {
                                        text: 'Editar',
                                        onPress: () =>
                                            router.push({
                                                pathname: '/institutions/edit/id',
                                                params: { id: institution.id },
                                            }),
                                    },
                                    {
                                        text: 'Excluir',
                                        style: 'destructive',
                                        onPress: () => handleDeleteInstitution(institution.id),
                                    },
                                    { text: 'Cancelar', style: 'cancel' },
                                ],
                                { cancelable: true }
                            );
                        }}
                    />
                ))}
            </MapView>
            <ButtonGreen
                onPress={() => router.push('/institutions/add')}
            >
                <ButtonText>
                    Adicionar Instituição
                </ButtonText>
            </ButtonGreen>
        </ContainerMap>
    );
};

const styles = StyleSheet.create({

    map: {

        height: '75%',
        width: '100%',
        marginTop:5,


    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default InstitutionsScreen;
