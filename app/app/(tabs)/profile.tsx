import React, {useState} from 'react';
import {Alert, Button, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/api';
import {
    BoxComments,
    BoxEdtDeleteProfile,
    ButtonEdit,
    ButtonTrash,
    ContainerProfile,
    TextGreen,
    TextRed,
    TitleGreenProfile,
    TitlePostProfile
} from "@/components/styled/StyledComponents";

interface Post {
  id: number;
  title: string;
  description: string;
  author: {
    id: number;
    name: string;
    image: string | null;
  };
  comments?: any[];
}

interface User {
  id: number;
  name: string;
  email: string;
  image: string | null;
}

const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);



    const fetchUserAndPosts = async () => {
      try {
        const response = await api.get<{ user: User }>('/user/me');
        setUser(response.data.user);

        const postsResponse = await api.get<Post[]>('/post');
        const userPosts = postsResponse.data.filter(
            (post) => post.author.id === response.data.user.id
        );
        setPosts(userPosts);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };




    useFocusEffect(
        React.useCallback(() => {
            fetchUserAndPosts();
        }, [])
    );



  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    router.replace('/');
  };

  const handleDeletePost = async (postId: number) => {
    Alert.alert(
        'Confirmação',
        'Tem certeza que deseja excluir este post?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
              try {
                await api.delete(`/post/${postId}`);
                Alert.alert('Sucesso', 'Post excluído com sucesso!');
                router.push('/posts')


              } catch (error) {
                console.error('Erro ao excluir post:', error);
              }
            },
          },
        ],
        { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: Post }) => (
      <BoxComments>
                  <TitlePostProfile>{item.title}</TitlePostProfile>


        <BoxEdtDeleteProfile>

            <ButtonEdit  onPress={() => router.push({
                pathname: '/post/edit/id',
                params: { postId: item.id.toString() },
            })}>
                <Image source={require('../../assets/icons/edit.png')}/>
                <TextGreen>Editar</TextGreen>
            </ButtonEdit>

            <ButtonTrash    onPress={() => handleDeletePost(item.id)}>
                <Image source={require('../../assets/icons/trash.png')}/>
                <TextRed> Excluir</TextRed>
            </ButtonTrash>
        </BoxEdtDeleteProfile>
      </BoxComments>
  );

  if (!user) {
    return null;
  }

    return (
        <ContainerProfile>
            <View style={styles.profileHeader}>
                <Image
                    source={
                        user.image
                            ? { uri: user.image }
                            : require('../../assets/icons/user.png')
                    }
                    style={styles.avatar}
                />
                <View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text>{user.email}</Text>
                </View>
            </View>
            <Button
                title="Configurações"
                onPress={() => router.push('/user/settings')}
            />
            <Button title="Logout" onPress={handleLogout} />
            <TitleGreenProfile>Posts</TitleGreenProfile>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </ContainerProfile>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16,
    },
  name: {
    fontSize: 24,
    marginBottom: 8,
  },
  postsHeader: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  postItem: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default ProfileScreen;
