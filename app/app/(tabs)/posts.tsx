import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../utils/api';

const PostsScreen = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/post');
        setPosts(response.data);
      } catch (error) {
        console.error('Erro ao buscar post:', error);
      }
    };
    fetchPosts();
  }, []);

  const renderItem = ({ item }: any) => (
      <TouchableOpacity
          onPress={() => router.push({
            pathname: `/post/id`,
            params:{
              postId: item.id,
            }
          })}
          style={styles.postItem}
      >
        <View >
          <Image
              source={
                item.author.image
                    ? { uri: item.author.image }
                    : require('../../assets/icons/user.png')
              }

          />
          <Text >{item.author.name}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
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
  postItem: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
  },
  description: {
    color: '#666',
  },
});

export default PostsScreen;
