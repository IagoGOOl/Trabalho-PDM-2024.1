import Stack from "@/components/Stack";
import { MainTitle } from "@/components/styled/StyledComponents";
import { memo, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Button from "@/components/styled/Button";
import Input from "@/components/Input";
import api from "@/utils/api";

type Ingredients = {
  id: number;
  name: string;
};

interface IngredientsFormProps {
  idIngredient?: number | null;
  ingredients: Ingredients[];
  setIngredients: React.SetStateAction<Ingredients[]>;
  step: "form" | "ingredients" | "register_ingredient";
  setStep: React.Dispatch<
    React.SetStateAction<"form" | "ingredients" | "register_ingredient">
  >;
}

const IngredientsFormRegister = ({
  idIngredient = null,
  setIngredients,
  setStep,
}: IngredientsFormProps) => {
  const { height } = Dimensions.get("window");

  const [nameIngredient, setNameIngredient] = useState("");
  const [nameError, setNameError] = useState(false);

  const handleSubmit = async () => {
    if (!nameIngredient.trim()) {
      setNameError(true);
      return;
    }

    try {
      const response = await api.post("/ingredients", { name: nameIngredient });
      if (response.status === 201) {
        const { id, name } = response.data;
        alert("Ingrediente criado com sucesso");
        setIngredients((prevIngredients) => [...prevIngredients, { id, name }]);
        setStep("ingredients");
      }
    } catch (error) {
      console.log("Erro ao criar o ingrediente");
      console.log(error);
    }
  };

  const handleNameChange = (text: string) => {
    setNameIngredient(text);
    if (text.trim()) setNameError(false);
  };

  useEffect(() => {
    return () => {
      setNameIngredient("");
      setNameError(false);
    };
  }, []);

  return (
    <Stack
      direction="column"
      gap={16}
      alignItems="flex-start"
      justifyContent="flex-start"
      fullWidth
      height={height / 1.2}
    >
      <MainTitle>Novo ingrediente</MainTitle>

      <Input
        placeholder="Nome do ingrediente"
        fullWidth
        value={nameIngredient}
        onChange={handleNameChange}
        color={nameError ? "error" : "secondary"}
        hasHelperText={nameError}
        helperText="Preencha o campo “Nome do ingrediente”."
        hasError={nameError}
      />

      <Button
        onPress={handleSubmit}
        text="Adicionar ingrediente"
        color="primary"
        variant="filled"
        borderRadius={50}
        fullWidth
      />
      <Button
        onPress={() => {
          setStep("ingredients");
        }}
        text="Cancelar"
        color="error"
        variant="outlined"
        borderRadius={50}
        fullWidth
      />
    </Stack>
  );
};

export default memo(IngredientsFormRegister);
