import React, {useEffect, useState} from 'react';
import {Alert, Button, Image, StyleSheet, TextInput, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../htpp/API';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from "@/components/ProfileStackNavigator";

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;
type User = {
    nome: string;
    email: string;
    image?: string;
};

export default function SettingsScreen({ navigation }: Props) {
    const [nome, setNome] = useState('');
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await api.get<User>('/user/me');
                setNome(userResponse.data.nome);
                if (userResponse.data.image) {
                    setImage(userResponse.data.image);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
    }, []);

    const handleUpdate = async () => {
        try {
            await api.patch('/user/me', { nome });
            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar os dados.');
        }
    };

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permissão Necessária', 'Você precisa permitir o acesso à galeria para alterar a foto.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);
            handleUploadImage(uri);
        }
    };

    const handleUploadImage = async (uri: string) => {
        const formData = new FormData();
        formData.append('image', {
            uri,
            name: 'profile.jpg',
            type: 'image/jpeg',
        } as any); // Adicione 'as any' para resolver problemas de tipagem

        try {
            await api.patch('/user/me/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            Alert.alert('Sucesso', 'Foto atualizada com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar a foto.');
        }
    };

    return (
        <View style={styles.container}>
            {image && <Image source={{ uri: image }} style={styles.profileImage} />}
            <Button title="Alterar Foto de Perfil" onPress={handlePickImage} />
            <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
            <Button title="Atualizar Dados" onPress={handleUpdate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        alignSelf: 'center',
    },
    input: {
        marginVertical: 8,
        borderBottomWidth: 1,
    },
});
