import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../../../utils/api';

const EditPostScreen = () => {
    const router = useRouter();
    const { postId } = useLocalSearchParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/post/${postId}`);
                setTitle(response.data.title);
                setDescription(response.data.description);
            } catch (error) {
                console.error('Erro ao carregar post:', error);
                Alert.alert('Erro', 'Não foi possível carregar o post.');
            }
        };
        fetchPost();
    }, []);

    const handleSave = async () => {
        try {
            await api.put(`/post/${postId}`, { title, description });
            Alert.alert('Sucesso', 'Post atualizado com sucesso!');
            router.push('/(tabs)/profile');
        } catch (error) {
            console.error('Erro ao atualizar post:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o post.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, styles.description]}
                multiline
            />
            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 100,
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
    },
    description: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default EditPostScreen;
