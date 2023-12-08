import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Plus, Minus } from "lucide-react-native";
import { malariaIllnesses } from "../../data/malariaIllnessData";

const MalariaIllnessScreen = () => {
  const [symptoms, setSymptoms] = useState([]);

  const addSymptom = (value) => {
    const isSymptomPresent = symptoms.includes(value);
    if (!isSymptomPresent) setSymptoms([...symptoms, value]);
  };

  const removeSymptom = (value) => {
    const updatedSymptoms = symptoms.filter((item) => item !== value);
    setSymptoms(updatedSymptoms);
  };

  const renderSymptoms = () => {
    return malariaIllnesses.map((symptom, index) => (
      <TouchableOpacity
        key={index}
        style={styles.symptomContainer}
        onPress={() => addSymptom(symptom)}
      >
        <Text style={styles.symptomText}>{symptom}</Text>
        <View style={styles.symptomIconContainer}>
          <Plus color="#2544F5" size={25} />
        </View>
      </TouchableOpacity>
    ));
  };

  const renderChosenSymptoms = () => {
    return symptoms.map((symptom, index) => (
      <TouchableOpacity
        key={index}
        style={styles.symptomContainer}
        onPress={() => removeSymptom(symptom)}
      >
        <Text style={styles.symptomText}>{symptom}</Text>
        <View style={styles.symptomIconContainer}>
          <Minus color="#2544F5" size={25} />
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      {/* Malaria Info */}
      <View style={styles.infoContainer}>
        <Text style={{ color: "#fff", fontSize: 20 }}>Malaria</Text>
        <Text style={{ fontSize: 15, color: "#f5f5f5" }}>
          Select your malaria symptoms
        </Text>
      </View>

      {/* Symptoms Grid */}
      <View style={styles.symptomsContainer}>{renderSymptoms()}</View>

      {/* Chosen Symptoms */}
      {symptoms.length !== 0 && (
        <View style={styles.chosenSymptomsContainer}>
          <Text style={{ fontSize: 18 }}>Chosen symptoms</Text>
          <View style={styles.symptomsContainer}>{renderChosenSymptoms()}</View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 40,
    backgroundColor: "#2544F5",
    paddingHorizontal: 12,
    paddingVertical: 18,
    borderRadius: 8,
  },
  symptomsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  symptomContainer: {
    width: "48%", // Adjust as needed for spacing
    height: 80,
    borderRadius: 8,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Shadow properties for Android
    elevation: 5,
    padding: 10,
    marginBottom: 10,
  },
  symptomText: {
    fontSize: 18,
    marginLeft: 8,
    // flex: 1,
    width: 76,
  },
  symptomIconContainer: {
    padding: 5,
    backgroundColor: "#D1D8FD",
    borderRadius: 50,
    marginLeft: 8,
  },
  chosenSymptomsContainer: {
    marginTop: 20,
  },
});

export default MalariaIllnessScreen;
