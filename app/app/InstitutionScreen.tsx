import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import api from '../htpp/API';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {InstitutionStackParamList} from "@/components/InstitutionStackNavigator";

type Props = NativeStackScreenProps<InstitutionStackParamList, 'Institution'>;
type Institution = {
    id: number;
    nome: string;
    latitude: number;
    longitude: number;
};

export default function InstitutionScreen({ navigation }: Props) {
    const [instituicoes, setInstituicoes] = useState<Institution[]>([]);

    useEffect(() => {
        const fetchInstituicoes = async () => {
            try {
                const response = await api.get<Institution[]>('/instituicao');
                setInstituicoes(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInstituicoes();
    }, []);

    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
                {instituicoes.map((inst) => (
                    <Marker
                        key={inst.id}
                        coordinate={{ latitude: inst.latitude, longitude: inst.longitude }}
                        title={inst.nome}
                    />
                ))}
            </MapView>
            <Button title="Adicionar Instituição" onPress={() => navigation.navigate('AddInstitution')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});
