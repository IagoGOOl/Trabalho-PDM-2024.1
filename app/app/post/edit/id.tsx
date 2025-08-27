import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {

  Container,
  MainTitle,
} from "@/components/styled/StyledComponents";
import Stack from "@/components/Stack";
import Input from "@/components/Input";
import Button from "@/components/styled/Button";
import api from "@/utils/api";
import IngredientsForm from "../../../components/IngredientsForm";
import IngredientsFormRegister from "../../../components/IngredientsFormRegister";


type Ingredients = {
  id: number;
  name: string;
};

const EditPostScreen = () => {
  const router = useRouter();
  const { postId } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [step, setStep] = useState<"form" | "ingredients" | "register_ingredient">("form");
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredients[]>([]);
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);

  const handleSubmit = async () => {
    try {
      await api.put(`/post/${postId}`, {
        title,
        description,
        ingredientsRecipe: selectedIngredients,
    });
      alert("Post atualizado com sucesso");
      router.push("/posts");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar post");
    }
  };

  const getIngredients = async () => {
    try {
      const response = await api.get("/ingredients");
      if (response.status === 200) setIngredients(response.data);
    } catch (error) {
      console.log("Erro ao buscar os ingredientes");
    }
  };

  const getPostData = async () => {
    try {
      const response = await api.get(`/post/${postId}`);
      if (response.status === 200) {
        setTitle(response.data.title);
        setDescription(response.data.description);
        const initialSelected = response.data.ingredients.map(
          (i: any) => i.ingredient
        );
        setSelectedIngredients(initialSelected);
      }
    } catch (error) {
      console.log("Erro ao buscar os dados do post");
    }
  };

  const handleNextStep = () => {
    let valid = true;
    if (!title.trim()) {
      setTitleError(true);
      valid = false;
    }
    if (!description.trim()) {
      setDescriptionError(true);
      valid = false;
    }
    if (valid) setStep("ingredients");
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
    if (text.trim()) setTitleError(false);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    if (text.trim()) setDescriptionError(false);
  };

  useEffect(() => {
    getIngredients();
    getPostData();
  }, []);

  return (
    <Container>
      {step === "form" && (
        <Stack direction="column" gap={16} alignItems="flex-start" fullWidth>
          <MainTitle>Editar receita</MainTitle>
          <Input
            placeholder="Título"
            value={title}
            onChange={handleTitleChange}
            fullWidth
            color={titleError ? "error" : "secondary"}
            hasHelperText={titleError}
            helperText="Preencha o campo “Título”."
            hasError={titleError}
          />
          <Input
            placeholder="Descrição"
            value={description}
            onChange={handleDescriptionChange}
            fullWidth
            color={descriptionError ? "error" : "secondary"}
            multiline
            hasHelperText={descriptionError}
            helperText="Preencha o campo “Descrição”."
            hasError={descriptionError}
          />
          <Button
            text="Escolha os ingredientes"
            variant="filled"
            color="primary"
            fullWidth
            onPress={handleNextStep}
            hasIcon
            iconPosition="right"
            icon={<Ionicons name="arrow-forward" size={20} color="#FFF" />}
            borderRadius={50}
          />
          <Button
            text="Cancelar"
            variant="outlined"
            color="error"
            fullWidth
            onPress={() => router.back()}
            borderRadius={50}
          />
        </Stack>
      )}

      {step === "ingredients" && (
        <Stack direction="column" gap={16} alignItems="flex-start" fullWidth>
          <IngredientsForm
            ingredients={ingredients}
            handleSubmit={handleSubmit}
            setIngredients={setIngredients}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
            step={step}
            setStep={setStep}
          />
        </Stack>
      )}

      {step === "register_ingredient" && (
        <Stack direction="column" gap={16} alignItems="flex-start" fullWidth>
          <IngredientsFormRegister
            step={step}
            setStep={setStep}
            setIngredients={setIngredients}
          />
        </Stack>
      )}
    </Container>
  );
};

export default EditPostScreen;
