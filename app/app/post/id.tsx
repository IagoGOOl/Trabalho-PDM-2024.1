import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import api from '../../utils/api';
import {
    AuthorImageComment,
    BoxComments,
    BoxContendComments,
    BoxEdtDelete,
    ButtonEdit,
    ButtonGreen,
    ButtonText,
    ButtonTrash,
    Container,
    InfoPost,
    Input,
    TextContendComment,
    TextContendDetails,
    TextGreen,
    TitleGreenLight
} from "@/components/styled/StyledComponents";

const PostDetailsScreen = () => {
    const router = useRouter();
    const { postId } = useLocalSearchParams();
    console.log(postId);
    const [post, setPost] = useState<any>(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const userResponse = await api.get('/user/me');
                setCurrentUserId(userResponse.data.user.id);

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
                            await api.delete(`/post/${postId}/comment/${commentId}`);
                            Alert.alert('Sucesso', 'Comentário excluído com sucesso!');
                            const commentsResponse = await api.get(`/post/${postId}/comment`);
                            setComments(commentsResponse.data);
                            router.push('/posts')
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
        <BoxComments >
            <InfoPost >
                <AuthorImageComment
                    source={
                        item.author.image
                            ? { uri: item.author.image }
                            : require('../../assets/icons/user.png')
                    }
                />


                <TextContendComment >{item.author.name}</TextContendComment>
            </InfoPost>
            <BoxContendComments>

            <TextContendComment>{item.description}</TextContendComment>
            {currentUserId === item.author.id && (
                <BoxEdtDelete>

                    <ButtonEdit  onPress={() => router.push({
                        pathname: '/comments/edit/id',
                        params: { commentId: item.id , postId: postId }
                    })}>
                        <Image source={require('../../assets/icons/edit.png')}/>
                    </ButtonEdit>

                    <ButtonTrash  onPress={() => handleDeleteComment(item.id)}>
                        <Image source={require('../../assets/icons/trash.png')}/>
                    </ButtonTrash>



                </BoxEdtDelete>
            )}
        </BoxContendComments>

</BoxComments>
    );
    if (!post) {
        return null;
    }

    return (
        <Container>

            <TitleGreenLight>{post.title}</TitleGreenLight>
            <TextContendDetails >{post.description}</TextContendDetails>
            <TextGreen>Comentários</TextGreen>
            <FlatList
                data={comments}
                keyExtractor={(item) => item}
                renderItem={renderComment}
            />
            <TextGreen>Comente o post</TextGreen>
            <Input
                placeholder="Comente Aqui"
                value={newComment}
                onChangeText={setNewComment}
            />
            <ButtonGreen  onPress={handleAddComment} >
            <ButtonText>
                Comentar
            </ButtonText></ButtonGreen>
        </Container>
    );
};


export default PostDetailsScreen;
