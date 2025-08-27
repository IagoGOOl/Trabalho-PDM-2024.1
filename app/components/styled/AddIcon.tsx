import { memo } from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface AddIconProps  {
    onPress: () => void;
}

export const AddIcon = ({onPress}: AddIconProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={styles.textPlus}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  wrapper: {
    width: 40,
    height: 40,
    borderStyle: "solid",
    borderColor: "#FFF",
    borderWidth: 4,
    backgroundColor: "transparent",
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  textPlus: {
    color: "#FFF",
    fontSize: 28,
    lineHeight: 32,
  } as TextStyle,
};

export default memo(AddIcon);
