import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/api';

const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const response = await api.get('/user/me');
        setUser(response.data.user);
        const postsResponse = await api.get('/post');
        const userPosts = postsResponse.data.filter(
            (post: any) => post.author.id === response.data.user.id
        );
        setPosts(userPosts);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };
    fetchUserAndPosts();
  }, []);

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
                // Atualizar a lista de posts
                const postsResponse = await api.get('/post');
                const userPosts = postsResponse.data.filter(
                    (post: any) => post.author.id === user.id
                );
                setPosts(userPosts);
              } catch (error) {
                console.error('Erro ao excluir post:', error);
              }
            },
          },
        ],
        { cancelable: true }
    );
  };

  const renderItem = ({ item }: any) => (
      <View style={styles.postItem}>
        <Text>{item.title}</Text>
        <View style={styles.postActions}>
          <Button
              title="Editar"
              // onPress={() => router.push(`/home/posts/edit/${item.id}`)}
          />
          <Button
              title="Excluir"
              onPress={() => handleDeletePost(item.id)}
          />
        </View>
      </View>
  );

  if (!user) {
    return null;
  }

  return (
      <View style={styles.container}>
        <Text style={styles.name}>{user.name}</Text>
        <Text>{user.email}</Text>
        <Button
            title="Configurações"
            onPress={() => router.push('/user/settings')}
        />
        <Button title="Logout" onPress={handleLogout} />
        <Text style={styles.postsHeader}>Seus Posts</Text>
        <FlatList
            data={posts}
            keyExtractor={(item) => item}
            renderItem={renderItem}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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

export default (ProfileScreen);
