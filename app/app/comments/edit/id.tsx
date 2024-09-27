import React, { useState, useEffect } from 'react';
import {View, TextInput, Button, StyleSheet, Alert, Text} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../../../utils/api';
import {ButtonGreen, ButtonText, Container, Input, TitleGreenLight} from "@/components/styled/StyledComponents";

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
        <Container>
            <TitleGreenLight>Editar Comentario</TitleGreenLight>
            <Input
                placeholder="Comentário"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <ButtonGreen onPress={handleSave} >
                <ButtonText>Salvar</ButtonText>
            </ButtonGreen>
        </Container>
    );
};


export default EditCommentScreen;
