import React, { useRef, useEffect } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { X } from "lucide-react-native";

const SlideDownModal = ({ isVisible, onClose, children }) => {
  const translateY = useRef(new Animated.Value(-300)).current;

  const showModal = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  useEffect(() => {
    if (isVisible) {
      showModal();
    }
  }, [isVisible]);

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={hideModal}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[styles.modalContent, { transform: [{ translateY }] }]}
        >
          <TouchableOpacity
            onPress={() => hideModal()}
            style={styles.closeButton}
          >
            <X color="#2544F5" size={25} />
          </TouchableOpacity>
          <View
            style={{
              marginTop: 40,
            }}
          >
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 5,
    backgroundColor: "#D1D8FD",
    borderRadius: 50,
    marginLeft: 8,
  },
});

export default SlideDownModal;
