import { memo, ReactNode } from "react";
import { Modal as RNModal, View, StyleSheet, TouchableOpacity } from "react-native";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ visible, onClose, children }: ModalProps) => {
  return (
    <RNModal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={styles.background}
        />
        <View style={styles.container}>
          {children}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    width: "85%",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 6,
  },
});

export default memo(Modal);
