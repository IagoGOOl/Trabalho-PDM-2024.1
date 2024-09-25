// app/home/institutions/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import api from '../../../utils/api';
import withAuth from '../../../utils/withAuth';

const InstitutionsScreen = () => {
    const router = useRouter();
    const [institutions, setInstitutions] = useState([]);

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                const response = await api.get('/instituicao');
                setInstitutions(response.data);
            } catch (error) {
                console.error('Erro ao buscar instituições:', error);
            }
        };
        fetchInstitutions();
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

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -23.5505, // Substitua pela latitude inicial desejada
                    longitude: -46.6333, // Substitua pela longitude inicial desejada
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
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
                                            router.push(`/home/institutions/edit/${institution.id}`),
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
            <Button
                title="Adicionar Instituição"
                onPress={() => router.push('/home/institutions/add')}
            />
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
});

export default withAuth(InstitutionsScreen);
