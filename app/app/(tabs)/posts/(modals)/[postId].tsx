// app/home/posts/[postId].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../../../../utils/api';
import withAuth from '../../../../utils/withAuth';

const PostDetailsScreen = () => {
    const router = useRouter();
    const { postId } = useLocalSearchParams();
    const [post, setPost] = useState<any>(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const response = await api.get(`/post/${postId}`);
                setPost(response.data);
                const commentsResponse = await api.get(`/post/${postId}/comment`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do post:', error);
            }
        };
        fetchPostAndComments();
    }, []);

    const handleAddComment = async () => {
        try {
            await api.post(`/post/${postId}/comment`, { description: newComment });
            setNewComment('');
            // Atualizar a lista de comentários
            const commentsResponse = await api.get(`/post/${postId}/comment`);
            setComments(commentsResponse.data);
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir este comentário?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/comment/${commentId}`);
                            Alert.alert('Sucesso', 'Comentário excluído com sucesso!');
                            // Atualizar a lista de comentários
                            const commentsResponse = await api.get(`/post/${postId}/comment`);
                            setComments(commentsResponse.data);
                        } catch (error) {
                            console.error('Erro ao excluir comentário:', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const renderComment = ({ item }: any) => (
        <View style={styles.commentItem}>
            <Text style={styles.commentAuthor}>{item.author.name}</Text>
            <Text>{item.description}</Text>
            {/* Se o usuário for o autor do comentário, mostrar opções de editar/excluir */}
            {item.isAuthor && (
                <View style={styles.commentActions}>
                    <Button
                        title="Editar"
                        onPress={() => router.push(`/home/comments/edit/${item.id}`)}
                    />
                    <Button
                        title="Excluir"
                        onPress={() => handleDeleteComment(item.id)}
                    />
                </View>
            )}
        </View>
    );

    if (!post) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.description}</Text>
            <Text style={styles.commentsHeader}>Comentários</Text>
            <FlatList
                data={comments}
                keyExtractor={(item) => item}
                renderItem={renderComment}
            />
            <TextInput
                placeholder="Adicionar comentário"
                value={newComment}
                onChangeText={setNewComment}
                style={styles.input}
            />
            <Button title="Comentar" onPress={handleAddComment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 8,
    },
    description: {
        marginBottom: 16,
    },
    commentsHeader: {
        fontSize: 20,
        marginBottom: 8,
    },
    commentItem: {
        marginBottom: 12,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    commentAuthor: {
        fontWeight: 'bold',
    },
    commentActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    input: {
        marginTop: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
    },
});

export default withAuth(PostDetailsScreen);
