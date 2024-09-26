import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../utils/api';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState(''); // Senha atual
    const [newPassword, setNewPassword] = useState(''); // Nova senha
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/user/me');
                setName(response.data.user.name);
                setEmail(response.data.user.email);
                setImageUri(response.data.user.image);
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
                Alert.alert('Erro', 'Não foi possível carregar seus dados.');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleSave = async () => {
        if (!name.trim() || !email.trim()) {
            Alert.alert('Erro', 'Nome e email não podem estar vazios.');
            return;
        }

        setSaving(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);

            // Inclui a nova senha se fornecida
            if (newPassword) {
                formData.append('password', newPassword);
            }

            // Inclui a imagem se selecionada
            if (imageUri) {
                const filename = imageUri.split('/').pop() || 'profile.jpg';
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;
                formData.append('image', {
                    uri: imageUri,
                    type,
                    name: filename,
                } as any);
            }

            const response = await api.patch('/user/me', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            router.back();
        } catch (error: any) {
            console.error('Erro ao atualizar dados:', error);
            const message =
                error.response?.data?.message ||
                'Não foi possível atualizar seus dados.';
            Alert.alert('Erro', message);
        } finally {
            setSaving(false);
        }
    };

    const pickImage = async () => {
        // Solicitar permissão para acessar a galeria
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                'Permissão negada',
                'Permissão para acessar a galeria é necessária!'
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Para imagem quadrada
            quality: 0.7, // Qualidade da imagem
        });

        if (!result.canceled && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setImageUri(uri);
        }
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                <Image
                    source={
                        imageUri
                            ? { uri: imageUri }
                            : require('../../assets/icons/user.png') // Certifique-se de que o caminho está correto
                    }
                    style={styles.avatar}
                />
                <Text style={styles.changePhotoText}>Alterar foto</Text>
                {uploading && <ActivityIndicator size="small" color="#0000ff" />}
            </TouchableOpacity>

            <TextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Nova Senha"
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title="Salvar" onPress={handleSave} />

            <View style={styles.separator} />

            {/* Removido o botão separado para atualização de senha */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        alignItems: 'center', // Centraliza os itens horizontalmente
        backgroundColor: '#fff',
    },
    input: {
        width: '100%', // Ocupa toda a largura disponível
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8, // Adiciona borda arredondada
        fontSize: 16,
    },
    avatar: {
        width: 128,
        height: 128,
        borderRadius: 64,
        marginBottom: 8,
        backgroundColor: '#eee',
    },
    changePhotoText: {
        color: '#6200ee',
        marginBottom: 16,
        textAlign: 'center', // Centraliza o texto
        fontSize: 16,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    separator: {
        height: 20,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SettingsScreen;
