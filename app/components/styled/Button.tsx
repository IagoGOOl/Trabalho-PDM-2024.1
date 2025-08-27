import { memo } from "react";
import { TouchableOpacity, Text, ViewStyle, StyleSheet, GestureResponderEvent, View } from "react-native";

interface ButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  fullWidth?: boolean;
  disabled?: boolean;
  width?: number;
  height?: number;
  variant?: "filled" | "outlined";
  color?: "primary" | "secondary" | "warning" | "error" | "info";
  borderRadius?: number;
  customStyles?: ViewStyle;
  padding?: number | [number, number, number, number];
  hasIcon?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = ({
  text,
  onPress,
  fullWidth,
  disabled = false,
  width,
  height = 60,
  variant = "filled",
  color = "primary",
  borderRadius = 10,
  padding = [16, 10, 16, 10],
  customStyles,
  hasIcon = false,
  icon,
  iconPosition = "left",
}: ButtonProps) => {
  const getVariantStyles = () => {
    if (disabled) {
      return variant === "filled"
        ? { backgroundColor: "#D3D3D3", textColor: "#7D7D7D", borderColor: "transparent" }
        : { borderColor: "#D3D3D3", borderWidth: 1, textColor: "#7D7D7D", backgroundColor: "transparent" };
    }
    switch (color) {
      case "primary":
        return variant === "filled"
          ? { backgroundColor: "#56A142", textColor: "#FFF", borderColor: "transparent" }
          : { borderColor: "#56A142", borderWidth: 1, textColor: "#56A142", backgroundColor: "transparent" };
      case "secondary":
        return variant === "filled"
          ? { backgroundColor: "#F6F6F6", textColor: "#FFF", borderColor: "transparent" }
          : { borderColor: "#E8E8E8", borderWidth: 1, textColor: "#111A4133", backgroundColor: "transparent" };
      case "error":
        return variant === "filled"
          ? { backgroundColor: "#FF7256", textColor: "#FFF", borderColor: "transparent" }
          : { borderColor: "#FF7256", borderWidth: 1, textColor: "#FF7256", backgroundColor: "transparent" };
      case "warning":
        return variant === "filled"
          ? { backgroundColor: "#FFC857", textColor: "#FFF", borderColor: "transparent" }
          : { borderColor: "#FFC857", borderWidth: 1, textColor: "#FFC857", backgroundColor: "transparent" };
      case "info":
        return variant === "filled"
          ? { backgroundColor: "#1E90FF", textColor: "#FFF", borderColor: "transparent" }
          : { borderColor: "#1E90FF", borderWidth: 1, textColor: "#1E90FF", backgroundColor: "transparent" };
      default:
        return {};
    }
  };

  const variantStyles = getVariantStyles();

  const paddingStyle =
    Array.isArray(padding) && padding.length === 4
      ? { paddingTop: padding[0], paddingRight: padding[1], paddingBottom: padding[2], paddingLeft: padding[3] }
      : { padding };

  const styles = StyleSheet.create({
    button: {
      width: fullWidth ? "100%" : width,
      height,
      borderRadius,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: (variantStyles as any).backgroundColor,
      borderColor: (variantStyles as any).borderColor,
      borderWidth: (variantStyles as any).borderWidth,
      ...paddingStyle,
      ...customStyles,
    },
    text: {
      color: (variantStyles as any).textColor,
      fontSize: 16,
      fontWeight: "600",
    },
    iconWrapper: {
      marginHorizontal: 6,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
      {hasIcon && iconPosition === "left" && <View style={styles.iconWrapper}>{icon}</View>}
      <Text style={styles.text}>{text}</Text>
      {hasIcon && iconPosition === "right" && <View style={styles.iconWrapper}>{icon}</View>}
    </TouchableOpacity>
  );
};

export default memo(Button);