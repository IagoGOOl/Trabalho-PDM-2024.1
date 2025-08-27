import { memo } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IngredientProps {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  name: string;
}

const Ingredient = ({ isChecked, setIsChecked, name }: IngredientProps) => {
  return (
    <TouchableOpacity
      onPress={() => setIsChecked(!isChecked)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 4,
          backgroundColor: isChecked ? "#56A142" : "#FFF",
          borderWidth: 2,
          borderColor: "#56A142",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isChecked && <Ionicons name="checkmark" size={16} color="#FFF" />}
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#264929",
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(Ingredient);
