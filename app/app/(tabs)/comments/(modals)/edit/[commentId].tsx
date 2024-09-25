// app/home/comments/edit/[commentId].tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../../../../../utils/api';
import withAuth from '../../../../../utils/withAuth';

const EditCommentScreen = () => {
    const router = useRouter();
    const { commentId } = useLocalSearchParams();
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await api.get(`/comment/${commentId}`);
                setDescription(response.data.description);
            } catch (error) {
                console.error('Erro ao carregar comentário:', error);
                Alert.alert('Erro', 'Não foi possível carregar o comentário.');
            }
        };
        fetchComment();
    }, []);

    const handleSave = async () => {
        try {
            await api.put(`/comment/${commentId}`, { description });
            Alert.alert('Sucesso', 'Comentário atualizado com sucesso!');
            router.back();
        } catch (error) {
            console.error('Erro ao atualizar comentário:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o comentário.');
        }
    };

    return (
        <View style={styles.container}>
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

export default withAuth(EditCommentScreen);
