import Stack from "@/components/Stack";
import { MainTitle } from "@/components/styled/StyledComponents";
import React, { memo, useState } from "react";
import { ScrollView, Dimensions, Text, View, TouchableOpacity, Alert } from "react-native";
import Ingredient from "./Ingredient";
import Button from "@/components/styled/Button";
import Input from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";
import api from "@/utils/api";
import Modal from "@/components/Modal";

type Ingredients = {
  id: number;
  name: string;
};

interface IngredientsFormProps {
  ingredients: Ingredients[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredients[]>>;
  selectedIngredients: Ingredients[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<Ingredients[]>>;
  step: "form" | "ingredients" | "register_ingredient";
  setStep: React.Dispatch<React.SetStateAction<"form" | "ingredients" | "register_ingredient">>;
  handleSubmit: () => void;
}

const IngredientsForm = ({
  ingredients,
  setIngredients,
  step,
  setStep,
  selectedIngredients,
  setSelectedIngredients,
  handleSubmit
}: IngredientsFormProps) => {
  const { height } = Dimensions.get("window");
  const [editingIngredient, setEditingIngredient] = useState<Ingredients | null>(null);
  const [nameIngredient, setNameIngredient] = useState("");

  const handleEditIngredient = (ingredient: Ingredients) => {
    setEditingIngredient(ingredient);
    setNameIngredient(ingredient.name);
  };

  const handleSaveIngredient = async () => {
    if (!editingIngredient || nameIngredient.trim() === "") {
      Alert.alert("Erro", "O nome do ingrediente não pode ficar vazio");
      return;
    }
    try {
      await api.put(`/ingredients/${editingIngredient.id}`, { name: nameIngredient });
      setIngredients(prev => prev.map(i => i.id === editingIngredient.id ? { ...i, name: nameIngredient } : i));
      setEditingIngredient(null);
      setNameIngredient("");
    } catch (error) {
      console.log("Erro ao editar ingrediente:", error);
    }
  };

  const handleDeleteIngredient = (ingredientId: number) => {
    Alert.alert(
      "Confirmação",
      "Deseja deletar este ingrediente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/ingredients/${ingredientId}`);
              setIngredients(prev => prev.filter(i => i.id !== ingredientId));
              setSelectedIngredients(prev => prev.filter(i => i.id !== ingredientId));
            } catch (error) {
              console.log("Erro ao deletar ingrediente:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <Stack
      direction="column"
      gap={16}
      alignItems="flex-start"
      justifyContent="flex-start"
      fullWidth
      height={height / 1.2}
    >
      <MainTitle>Ingredientes</MainTitle>
      {ingredients?.length > 0 ? (
        <ScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{ gap: 16 }}
        >
          {ingredients.map((ingredient) => (
            <View key={ingredient.id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Ingredient
                name={ingredient.name}
                isChecked={selectedIngredients.some((i) => i.id === ingredient.id)}
                setIsChecked={() => {
                  setSelectedIngredients((prevSelectedIngredients) => {
                    if (prevSelectedIngredients.some((i) => i.id === ingredient.id)) {
                      return prevSelectedIngredients.filter((i) => i.id !== ingredient.id);
                    } else {
                      return [...prevSelectedIngredients, ingredient];
                    }
                  });
                }}
              />
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableOpacity onPress={() => handleEditIngredient(ingredient)}>
                  <Ionicons name="pencil" size={22} color="#1E90FF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteIngredient(ingredient.id)}>
                  <Ionicons name="trash" size={22} color="#FF7256" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>Nenhum ingrediente cadastrado</Text>
      )}
      <Modal visible={!!editingIngredient} onClose={() => setEditingIngredient(null)}>
        <Stack direction="column" gap={16}>
          <Input
            placeholder="Nome do ingrediente"
            fullWidth
            value={nameIngredient}
            onChange={setNameIngredient}
            color="secondary"
          />
          <Button
            onPress={handleSaveIngredient}
            text="Salvar edição do ingrediente"
            color="primary"
            variant="filled"
            borderRadius={50}
            fullWidth
          />
          <Button
            onPress={() => setEditingIngredient(null)}
            text="Cancelar"
            color="error"
            variant="outlined"
            borderRadius={50}
            fullWidth
          />
        </Stack>
      </Modal>
      <Button
        onPress={handleSubmit}
        text="Salvar receita"
        color="primary"
        variant="filled"
        borderRadius={50}
        fullWidth
        disabled={ingredients?.length === 0 || selectedIngredients.length === 0}
      />
      <Button
        onPress={() => setStep("register_ingredient")}
        text="Cadastrar novo ingrediente"
        color="info"
        variant="filled"
        borderRadius={50}
        fullWidth
      />
      <Button
        onPress={() => setStep("form")}
        text="Voltar"
        color="primary"
        variant="outlined"
        borderRadius={50}
        fullWidth
      />
    </Stack>
  );
};

export default memo(IngredientsForm);
