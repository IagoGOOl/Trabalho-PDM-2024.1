import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Image, StatusBar} from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../utils/api';
import {
    AuthorImage,
    AuthorName,
    CardPost,
    ContainerGreen,
    InfoPost, TextContend,
    TitleLight,
    TitlePost
} from "@/components/styled/StyledComponents";

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
      <CardPost
          onPress={() => router.push({
            pathname: `/post/id`,
            params:{
              postId: item.id,
            }
          })}
             >
        <InfoPost >

          <AuthorImage
              source={
                item.author.image
                    ? { uri: item.author.image }
                    : require('../../assets/icons/user.png')
              }

          />
          <AuthorName >{item.author.name}</AuthorName>

        </InfoPost>

          <TitlePost>{item.title}</TitlePost>
          <TextContend numberOfLines={2} >{item.description}</TextContend>

      </CardPost>
  );

  return (
      <ContainerGreen>
          <TitleLight> Posts</TitleLight>
        <FlatList
            data={posts}
            keyExtractor={(item) => item}
            renderItem={renderItem}
        />
      </ContainerGreen>
  );
};


export default PostsScreen;
