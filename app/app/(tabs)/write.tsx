import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  ButtonGreen,
  ButtonText,
  Container,
  MainTitle,
} from "@/components/styled/StyledComponents";
import Stack from "@/components/Stack";
import Input from "@/components/Input";
import Button from "@/components/styled/Button";
import IngredientsForm from "../../components/IngredientsForm";
import IngredientsFormRegister from "../../components/IngredientsFormRegister";

type Ingredients = {
  id: number;
  name: string;
};

const WritePostScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [step, setStep] = useState<
    "form" | "ingredients" | "register_ingredient"
  >("form");
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredients[]>(
    []
  );
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);

  const handleSubmit = async () => {
    try {
      await api.post("/post", {
        title,
        description,
        ingredients: selectedIngredients,
      });
      alert("Post criado com sucesso");
      setTitle("");
      setDescription("");
      setTitleError(false);
      setDescriptionError(false);
      setSelectedIngredients([]);
      setStep("form");
      router.push("/posts");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar post");
    }
  };

  const getIngredients = async () => {
    try {
      await api.get("/ingredients").then((response) => {
        if (response.status === 200) {
          setIngredients(response.data);
        }
      });
    } catch (error) {
      console.log("Erro ao buscar os ingredientes");
      console.log(error);
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
    setTitle("");
    setDescription("");
    setTitleError(false);
    setDescriptionError(false);
    setSelectedIngredients([]);
    setStep("form");
  }, []);

  return (
    <Container>
      {step === "form" && (
        <Stack direction="column" gap={16} alignItems="flex-start" fullWidth>
          <MainTitle>Nova receita</MainTitle>

          <Input
            placeholder="Título"
            value={title}
            onChange={handleTitleChange}
            fullWidth
            color={titleError ? "error" : "secondary"}
            hasHelperText={titleError}
            helperText="Preencha o campo “Título” para criar um novo post."
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
            helperText="Preencha o campo “Descrição” para criar um novo post."
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

export default WritePostScreen;
