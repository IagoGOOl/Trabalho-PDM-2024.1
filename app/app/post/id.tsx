import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import api from "../../utils/api";
import {
  AuthorImageComment,
  BoxComments,
  BoxContendComments,
  BoxEdtDelete,
  ButtonEdit,
  ButtonTrash,
  Container,
  InfoPost,
  TextContendComment,
  TextContendDetails,
  TextGreen,
  TitleGreenLight,
} from "@/components/styled/StyledComponents";
import Stack from "@/components/Stack";
import Modal from "@/components/Modal";
import Button from "@/components/styled/Button";
import Input from "@/components/Input";

const PostDetailsScreen = () => {
  const router = useRouter();
  const { postId } = useLocalSearchParams();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<any>(null);
  const [nameIngredient, setNameIngredient] = useState("");

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const userResponse = await api.get("/user/me");
        setCurrentUserId(userResponse.data.user.id);

        const response = await api.get(`/post/${postId}`);
        setPost(response.data);
        const commentsResponse = await api.get(`/post/${postId}/comment`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do post:", error);
      }
    };
    fetchPostAndComments();
  }, []);

  const refreshPost = async () => {
    const response = await api.get(`/post/${postId}`);
    setPost(response.data);
  };

  const handleEditIngredient = (ingredient: any) => {
    setEditingIngredient(ingredient);
    setNameIngredient(ingredient.ingredient.name);
    setModalVisible(true);
  };

  const handleSaveIngredient = async () => {
    try {
      await api.put(`/ingredients/${editingIngredient.ingredient.id}`, {
        name: nameIngredient,
      });
      setModalVisible(false);
      setEditingIngredient(null);
      refreshPost();
    } catch (error) {
      console.log("Erro ao editar ingrediente:", error);
    }
  };

  const handleDeleteIngredient = (ingredientId: number) => {
    Alert.alert(
      "Confirmação",
      "Deseja remover este ingrediente da receita?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/post/${post.id}/ingredient/${ingredientId}`);
              refreshPost();
            } catch (error) {
              console.log("Erro ao remover ingrediente da receita:", error);
            }
          },
        },
      ]
    );
  };

  const handleAddComment = async () => {
    try {
      await api.post(`/post/${postId}/comment`, { description: newComment });
      setNewComment("");
      const commentsResponse = await api.get(`/post/${postId}/comment`);
      setComments(commentsResponse.data);
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir este comentário?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/post/${postId}/comment/${commentId}`);
              Alert.alert("Sucesso", "Comentário excluído com sucesso!");
              const commentsResponse = await api.get(`/post/${postId}/comment`);
              setComments(commentsResponse.data);
              router.push("/posts");
            } catch (error) {
              console.error("Erro ao excluir comentário:", error);
            }
          },
        },
      ]
    );
  };

  const renderComment = ({ item }: any) => (
    <BoxComments>
      <InfoPost>
        <AuthorImageComment
          source={
            item.author.image
              ? { uri: item.author.image }
              : require("../../assets/icons/user.png")
          }
        />

        <TextContendComment>{item.author.name}</TextContendComment>
      </InfoPost>
      <BoxContendComments>
        <TextContendComment>{item.description}</TextContendComment>
        {currentUserId === item.author.id && (
          <BoxEdtDelete>
            <ButtonEdit
              onPress={() =>
                router.push({
                  pathname: "/comments/edit/id",
                  params: { commentId: item.id, postId: postId },
                })
              }
            >
              <Image source={require("../../assets/icons/edit.png")} />
            </ButtonEdit>

            <ButtonTrash onPress={() => handleDeleteComment(item.id)}>
              <Image source={require("../../assets/icons/trash.png")} />
            </ButtonTrash>
          </BoxEdtDelete>
        )}
      </BoxContendComments>
    </BoxComments>
  );

  if (!post) return null;

  return (
    <Container>
      <Stack
        direction="column"
        fullWidth
        flex={1}
        alignItems="flex-start"
        justifyContent="flex-start"
        gap={8}
      >
        <TitleGreenLight>{post.title}</TitleGreenLight>
        <TextContendDetails>{post.description}</TextContendDetails>

        <TitleGreenLight>Ingredientes</TitleGreenLight>
        <View style={{ marginTop: 8, width: "100%" }}>
          {post?.ingredients?.length > 0 ? (
            post?.ingredients?.map((item: any) => (
              <Stack
                key={item.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                fullWidth={true}
              >
                <View style={{width: "40%"}}>
                  <Text style={{ fontSize: 18 }}>{item?.ingredient?.name}</Text>
                </View>
                <Stack direction="row" gap={4}>
                  <TouchableOpacity onPress={() => handleEditIngredient(item)}>
                    <Ionicons name="pencil" size={22} color="#1E90FF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteIngredient(item.ingredient.id)}
                  >
                    <Ionicons name="trash" size={22} color="#FF7256" />
                  </TouchableOpacity>
                </Stack>
              </Stack>
            ))
          ) : (
            <Text>Nenhum ingrediente cadastrado</Text>
          )}
        </View>

        <TextGreen>Comentários</TextGreen>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderComment}
        />

        <TextGreen>Comente o post</TextGreen>
        <Input
          placeholder="Comente Aqui"
          value={newComment}
          onChange={setNewComment}
          color="secondary"
          height={60}
          fullWidth
        />
        <Button variant="filled" color="primary" text="Comentar" fullWidth onPress={handleAddComment} />
        <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <Stack direction="column" gap={16}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              Editar ingrediente
            </Text>
            <Input
              placeholder="Nome do ingrediente"
              fullWidth
              value={nameIngredient}
              onChange={setNameIngredient}
              color="secondary"
            />
            <Button
              onPress={handleSaveIngredient}
              text="Salvar"
              color="primary"
              variant="filled"
              borderRadius={50}
              fullWidth
            />
            <Button
              onPress={() => setModalVisible(false)}
              text="Cancelar"
              color="error"
              variant="outlined"
              borderRadius={50}
              fullWidth
            />
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
};

export default PostDetailsScreen;
