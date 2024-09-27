import React, { useState } from 'react';
import api from '../../utils/api';
import { useRouter } from 'expo-router';
import {ButtonGreen, ButtonText, Container, Input, TextGreen, TitleGreen} from "@/components/styled/StyledComponents";

const WritePostScreen = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handlePost = async () => {
        try {
            await api.post('/post', { title, description });
            alert('Post criado com sucesso');
            router.push('/posts');
        } catch (error) {
            console.error(error);
            alert('Erro ao criar post');
        }
    };

    return (
        <Container >
            <TitleGreen>Novo Post</TitleGreen>
            <TextGreen>Inserir conteúdo do post</TextGreen>
            <Input
                placeholder="Título"
                value={title}
                onChangeText={setTitle}

            />
            <Input
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <ButtonGreen  onPress={handlePost} >
                <ButtonText>Adicionar Post</ButtonText>
            </ButtonGreen>


        </Container>
    );
};



export default WritePostScreen;
