import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { ChevronLeft, X } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { precautions } from "../../data/precaution";

const DiseasePrecautionScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState("Drug Reaction");
  const selectedDiseaseData = precautions.find(
    (disease) => disease.Disease === selectedDisease
  );

  const navigation = useNavigation();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDiseaseSelect = (disease) => {
    setSelectedDisease(disease);
    setModalVisible(false);
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          marginTop: 40,
          display: "flex",
          flexDirection: "row",
          gap: 25,
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <ChevronLeft color="#000" />
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2544F5" }}>
          Disease Precautuions
        </Text>
      </View>

      <ScrollView>
      <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Select Disease:</Text>
      <TouchableOpacity onPress={openModal} style={{ padding: 10, borderWidth: 1, marginTop: 10, borderRadius: 8 }}>
        <Text>{selectedDisease}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <TouchableOpacity onPress={closeModal} style={{ marginTop: 10 }}>
              <X color="#000" />
            </TouchableOpacity>
            <FlatList
              data={precautions}
              keyExtractor={(item) => item.Disease}
              renderItem={({ item }) => (
                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => handleDiseaseSelect(item.Disease)}>
                  <Text>{item.Disease}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {selectedDiseaseData && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 15, marginBottom: 8, fontWeight: 600 }}>Precautions:</Text>
          <View>
            {selectedDiseaseData.Precaution.map((precaution, index) => (
              <Text key={index} style={{ fontSize: 14, marginTop: 5 }}>
                {index + 1}. {precaution.charAt(0).toUpperCase()}{precaution.slice(1)}
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
      </ScrollView>
    </View>
  );
};

export default DiseasePrecautionScreen;
