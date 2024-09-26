import React, { useState, useEffect } from 'react';
import {View, TextInput, Button, StyleSheet, Alert, Text} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../../../utils/api';

const EditCommentScreen = () => {
    const router = useRouter();
    const { commentId, postId } = useLocalSearchParams();
    const [description, setDescription] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await api.get(`/post/${postId}/comment/${commentId}`);
                setDescription(response.data.description);
                setResponse(response.data);
            } catch (error) {
                console.error('Erro ao carregar comentário:', error);
                Alert.alert('Erro', 'Não foi possível carregar o comentário.');
            }
        };
        fetchComment();
    }, []);

    const handleSave = async () => {
        try {
            await api.put(`/post/${postId}/comment/${commentId}`, { description });
            Alert.alert('Sucesso', 'Comentário atualizado com sucesso!');
            router.push('/posts');
        } catch (error) {
            console.error('Erro ao atualizar comentário:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o comentário.');
        }
    };

    return (
        <View style={styles.container}>
            <Text></Text>
            <TextInput
                placeholder="Comentário"
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

export default EditCommentScreen;
