// src/screens/PostDetailScreen.tsx

import React, {useEffect, useState} from 'react';
import {Alert, Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import api from '../htpp/API';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from "@/components/HomeStackNavigator";

type Props = NativeStackScreenProps<HomeStackParamList, 'PostDetail'>;
type Post = {
    id: number;
    titulo: string;
    conteudo: string;
};

type Comment = {
    id: number;
    conteudo: string;
    usuario: {
        nome: string;
    };
    isUserComment: boolean;
};

export default function PostDetailScreen({ route, navigation }: Props) {
    const { postId, isUserPost } = route.params;
    const [post, setPost] = useState<Post | null>(null);
    const [comentarios, setComentarios] = useState<Comment[]>([]);
    const [novoComentario, setNovoComentario] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postResponse = await api.get<Post>(`/post/${postId}`);
                setPost(postResponse.data);

                const commentsResponse = await api.get<Comment[]>(`/post/${postId}/comment`);
                setComentarios(commentsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPost();
    }, [postId]);

    const handleAddComment = async () => {
        try {
            await api.post(`/post/${postId}/comment`, { conteudo: novoComentario });
            setNovoComentario('');
            // Atualiza a lista de comentários
            const commentsResponse = await api.get<Comment[]>(`/post/${postId}/comment`);
            setComentarios(commentsResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditPost = () => {
        // Implementar a lógica de edição do post
        Alert.alert('Editar Post', 'Funcionalidade de edição ainda não implementada.');
    };

    const handleDeletePost = async () => {
        try {
            await api.delete(`/post/${postId}`);
            Alert.alert('Sucesso', 'Post excluído com sucesso!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o post.');
        }
    };

    if (!post) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: Comment }) => (
        <View style={styles.commentItem}>
            <Text style={styles.commentAuthor}>{item.usuario.nome}:</Text>
            <Text>{item.conteudo}</Text>
            {item.isUserComment && (
                <View style={styles.commentActions}>
                    <Button
                        title="Editar"
                        onPress={() => {
                            // Implementar a lógica de edição do comentário
                            Alert.alert('Editar Comentário', 'Funcionalidade de edição ainda não implementada.');
                        }}
                    />
                    <Button
                        title="Excluir"
                        onPress={async () => {
                            try {
                                await api.delete(`/post/${postId}/comment/${item.id}`);
                                // Atualiza a lista de comentários
                                const commentsResponse = await api.get<Comment[]>(`/post/${postId}/comment`);
                                setComentarios(commentsResponse.data);
                            } catch (error) {
                                Alert.alert('Erro', 'Não foi possível excluir o comentário.');
                            }
                        }}
                    />
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.postTitle}>{post.titulo}</Text>
            <Text style={styles.postContent}>{post.conteudo}</Text>
            {isUserPost && (
                <View style={styles.postActions}>
                    <Button title="Editar Post" onPress={handleEditPost} />
                    <Button title="Excluir Post" onPress={handleDeletePost} />
                </View>
            )}
            <Text style={styles.commentsTitle}>Comentários:</Text>
            <FlatList
                data={comentarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text>Nenhum comentário ainda.</Text>}
            />
            <TextInput
                placeholder="Adicionar comentário"
                value={novoComentario}
                onChangeText={setNovoComentario}
                style={styles.input}
            />
            <Button title="Comentar" onPress={handleAddComment} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    postTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    postContent: {
        fontSize: 16,
        marginVertical: 16,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 24,
    },
    commentItem: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8,
    },
    commentAuthor: {
        fontWeight: 'bold',
    },
    commentActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    input: {
        marginVertical: 8,
        borderBottomWidth: 1,
    },
});
