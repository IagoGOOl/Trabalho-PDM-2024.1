import { memo } from "react";
import { View, ViewStyle } from "react-native";

interface StackProps {
  direction?: "row" | "column";
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  alignItems?: "center" | "flex-start" | "flex-end" | "baseline" | "stretch";
  fullWidth?: boolean;
  width?: number;
  height?: number;
  gap?: number;
  children?: React.ReactNode;
  flex?: number
}

const Stack = ({
  direction = "row",
  justifyContent = "center",
  alignItems = "center",
  height,
  width,
  gap = 0,
  fullWidth = true,
  children,
  flex
}: StackProps) => {
  const stackStyles: ViewStyle = {
    flexDirection: direction,
    justifyContent,
    alignItems,
    width: fullWidth ? "100%" : width,
    height,
    gap,
    flex
  };

  return <View style={stackStyles}>{children}</View>;
};

export default memo(Stack);