import { memo } from "react";
import { TextInput, Text, View, ViewStyle, StyleSheet } from "react-native";

interface InputProps {
  fullWidth?: boolean;
  placeholder?: string;
  value?: string;
  onChange: (text: string) => void;
  width?: number;
  height?: number;
  variant?: "filled" | "outlined";
  color?: "primary" | "secondary" | "warning" | "error";
  borderRadius?: number;
  customStyles?: ViewStyle;
  padding?: number;
  multiline?: boolean;
  hasHelperText?: boolean;
  helperText?: string;
  hasError?: boolean;
}

const Input = ({
  fullWidth,
  placeholder,
  value,
  onChange,
  width,
  height = 60,
  variant = "outlined",
  color = "primary",
  borderRadius = 8,
  padding = 16,
  multiline = false,
  customStyles,
  hasHelperText = false,
  helperText = "",
  hasError = false,
}: InputProps) => {
  const getVariantStyles = () => {
    switch (color) {
      case "primary":
        return variant === "filled"
          ? { backgroundColor: "#56A142", color: "#FFF", placeholderColor: "#FFF" }
          : { borderColor: "#56A142", borderWidth: 1, color: "#56A142", placeholderColor: "#56A142" };
      case "secondary":
        return variant === "filled"
          ? { backgroundColor: "#F6F6F6", color: "#FFF", placeholderColor: "#FFF" }
          : { borderColor: "#E8E8E8", borderWidth: 1, color: "#070e2a7f", placeholderColor: "#111A4133" };
      case "error":
        return variant === "filled"
          ? { backgroundColor: "#FF7256", color: "#FFF", placeholderColor: "#FFF" }
          : { borderColor: "#FF7256", borderWidth: 1, color: "#FF7256", placeholderColor: "#FF7256" };
      case "warning":
        return variant === "filled"
          ? { backgroundColor: "#FFC857", color: "#FFF", placeholderColor: "#FFF" }
          : { borderColor: "#FFC857", borderWidth: 1, color: "#FFC857", placeholderColor: "#FFC857" };
      default:
        return {};
    }
  };

  const variantStyles = getVariantStyles();

  const styles = StyleSheet.create({
    input: {
      width: fullWidth ? "100%" : width,
      height: multiline ? undefined : height,
      minHeight: multiline ? 100 : height,
      borderRadius,
      paddingHorizontal: 12,
      justifyContent: "center",
      padding,
      color: variantStyles.color,
      borderColor: (variantStyles as any).borderColor,
      borderWidth: (variantStyles as any).borderWidth,
      backgroundColor: (variantStyles as any).backgroundColor,
      textAlignVertical: multiline ? "top" : "center",
      ...customStyles,
    },
    helperText: {
      fontSize: 12,
      color: hasError ? "#FF7256" : variantStyles.color,
      marginTop: 4,
    },
  });

  return (
    <View style={{ width: fullWidth ? "100%" : width }}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={variantStyles.placeholderColor}
        value={value}
        onChangeText={onChange}
        multiline={multiline}
      />
      {hasHelperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

export default memo(Input);
