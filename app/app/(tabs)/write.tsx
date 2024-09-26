import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import api from '../../utils/api';
import { useRouter } from 'expo-router';

const WritePostScreen = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handlePost = async () => {
        try {
            await api.post('/post', { title, description });
            alert('Post criado com sucesso');
            router.replace('/posts');
        } catch (error) {
            console.error(error);
            alert('Erro ao criar post');
        }
    };

    return (
        <View >
            <TextInput
                placeholder="Título"
                value={title}
                onChangeText={setTitle}

            />
            <TextInput
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}

                multiline
            />
            <Button title="Publicar" onPress={handlePost} />
        </View>
    );
};

const styles = StyleSheet.create({
    // Your styles here
});

export default WritePostScreen;
