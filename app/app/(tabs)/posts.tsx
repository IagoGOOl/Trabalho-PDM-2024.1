import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import api from "../../utils/api";
import {
  AuthorImage,
  AuthorName,
  CardPost,
  ContainerGreen,
  InfoPost,
  TextContend,
  TitleLight,
  TitlePost,
} from "@/components/styled/StyledComponents";
import AddIcon from "@/components/styled/AddIcon";
import Stack from "@/components/Stack";
import AsyncStorage from "@react-native-async-storage/async-storage";


const PostsScreen = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/post");
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar post:", error);
    }
  };

  const handleGoToWriteScreen = useCallback(() => {
    router.push('/(tabs)/write')
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    router.replace('/');
  };

  const renderItem = ({ item }: any) => (
    <CardPost
      onPress={() =>
        router.push({
          pathname: `/post/id`,
          params: {
            postId: item.id,
          },
        })
      }
    >
      <InfoPost>
        <AuthorImage
          source={
            item.author.image
              ? { uri: item.author.image }
              : require("../../assets/icons/user.png")
          }
        />
        <AuthorName>{item.author.name}</AuthorName>
      </InfoPost>

      <TitlePost>{item.title}</TitlePost>
      <TextContend numberOfLines={2}>{item.description}</TextContend>
    </CardPost>
  );

  return (
    <ContainerGreen>
      <Stack alignItems="center" justifyContent="space-between">
        <AddIcon onPress={handleGoToWriteScreen} />
        <TitleLight>Receitas</TitleLight>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{color: '#FFF', fontSize: 16}}>Sair</Text>
        </TouchableOpacity>
      </Stack>
      <FlatList
        data={posts}
        keyExtractor={(item) => item}
        renderItem={renderItem}
      />
    </ContainerGreen>
  );
};

export default PostsScreen;
