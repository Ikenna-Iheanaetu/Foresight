import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Plus, Minus } from "lucide-react-native";
import { generalIllnesses } from "../../data/generalIlnessData";
import SlideDownModal from "../../components/modal";
import { checkNetworkConnection } from "../../lib/checkNetwork";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REQ_URL } from '@env'

const GeneralIllnessScreen = () => {
  const [generalSymptoms, setGeneralSymptoms] = useState(generalIllnesses);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [predictedIllness, setPredictedIllness] = useState("");

  const storeDataInHistory = async (illness) => {
    try {
      const userHistoryObj = {
        id: Date.now(),
        prognosis: illness,
        symptoms: selectedSymptoms,
      };
  
      // Retrieve existing history and/or an empty array
      const history = await AsyncStorage.getItem("userHistory");
      let parsedHistory = JSON.parse(history) || [];
  
      console.log("Parsed History Before:", parsedHistory);
  
      // Add the new userHistoryObj to the array
      parsedHistory.push(userHistoryObj);
  
      console.log("Parsed History After:", parsedHistory);
  
      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem("userHistory", JSON.stringify(parsedHistory));
  
      // Check the saved data
      const savedHistory = await AsyncStorage.getItem("userHistory");
      console.log("Saved History:", JSON.parse(savedHistory));
    } catch (error) {
      console.error("Error saving prediction:", error);
      Alert.alert(
        "An error has just occurred while trying to save this prediction"
      );
    }
  };
  

  // UseEffects
  useEffect(() => {
    // Check if predictedIllness is updated
    if (predictedIllness !== "") {
      // Perform actions or show modal here
      console.log(`Predicted Illness updated: ${predictedIllness}`);
    }
  }, [predictedIllness]);

  const Symtoms = () => {
    return (
      <View>
        <Text style={{ fontSize: 18, marginVertical: 2 }}>Symtoms</Text>
        <View style={styles.symptomsContainer}>
          {generalSymptoms.map((symptom, index) => (
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
          ))}
        </View>
      </View>
    );
  };

  const SearchedSymtoms = () => {
    return (
      <View>
        <Text style={{ fontSize: 18, marginVertical: 2 }}>Symtoms</Text>
        <View style={styles.symptomsContainer}>
          {searchedResults.map((symptom, index) => (
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
          ))}
        </View>
      </View>
    );
  };

  const renderChosenSymptoms = () => {
    return selectedSymptoms.map((symptom, index) => (
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

  const PredictButton = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => predictIllness()}
        >
          <Text style={styles.buttonText}>Predict</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ModalForInfo = ({ children }) => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <SlideDownModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          {children}
        </SlideDownModal>
      </View>
    );
  };

  // Function to prdict the illness based on the symtoms

  const predictIllness = async () => {
    // Algorithm to populate the new array that will consist of 1's and 0's
    const resultArray = [];

    for (let i = 0; i < generalIllnesses.length + 1; i++) {
      const index = generalIllnesses[i];
      console.log(index);

      resultArray.push(selectedSymptoms.includes(index) ? 1 : 0);
    }

    console.log(resultArray);

    try {
      const networkConnection = await checkNetworkConnection();
      console.log(networkConnection);

      if (!networkConnection) {
        showModal(
          <View>
            <Text>No network connection</Text>
            <TouchableOpacity onPress={() => hideModal()}>
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        setPredictedIllness("");

        if (!resultArray.includes(1)) {
          return showModal(
            <View>
              <View style={{ marginTop: 1 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "col",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20,
                    gap: 20,
                  }}
                >
                  <Image
                    style={styles.modalImg}
                    source={require("../../assets/images/choose.png")}
                  />
                  <Text style={{ fontSize: 18 }}>
                    You haven't selected any symptoms, kindly do so
                  </Text>
                </View>
              </View>
            </View>
          );
        }

        const predict = await axios.post(
          `${REQ_URL}/api/v1/predict/general`,
          { resultArray }
        );
        const predictedIllnessData = predict.data;
        setPredictedIllness(predictedIllnessData);

        console.log(
          `From the request ${predictedIllnessData}, from the setter hook ${predictedIllness}`
        );

        await storeDataInHistory(predictedIllnessData);

        showModal(
          <View>
            <View style={{ marginTop: 1 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "col",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 20,
                }}
              >
                {predictedIllnessData === "No illness" ? (
                  <Image
                    style={styles.modalImg}
                    source={require("../../assets/images/feelinghappy.png")}
                  />
                ) : (
                  <Image
                    style={styles.modalImg}
                    source={require("../../assets/images/feelingBlue.png")}
                  />
                )}
                <Text style={{ fontSize: 18 }}>
                  Your Illness is {predictedIllnessData}
                </Text>
              </View>
            </View>
          </View>
        );

      }
    } catch (error) {
      console.error("Error checking network connection:", error);
    }
  };

  // Functionality for the modal

  const showModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  // Functionality for the screen

  // Ading user selected symptoms and removing it
  const addSymptom = (value) => {
    const isSymptomPresent = selectedSymptoms.includes(value);
    if (!isSymptomPresent) {
      setSelectedSymptoms([...selectedSymptoms, value]);
      setGeneralSymptoms(
        generalSymptoms.filter((symptom) => symptom !== value)
      );
    }
  };

  // Removing user selected symptoms and adding it back to is original position
  const removeSymptom = (value) => {
    setSelectedSymptoms(selectedSymptoms.filter((item) => item !== value));

    const index = generalIllnesses.indexOf(value);
    setGeneralSymptoms([
      ...generalSymptoms.slice(0, index),
      value,
      ...generalSymptoms.slice(index + 1),
    ]);
  };

  // This is to remove all the chosen symtoms and add them back to their former positions
  const removeAllChosenSymptoms = () => {
    setGeneralSymptoms((prevGeneralSymptoms) => {
      const updatedGeneralSymptoms = [...prevGeneralSymptoms];

      // Iterate over selectedSymptoms and find their original positions
      selectedSymptoms.forEach((symptom) => {
        const index = generalIllnesses.indexOf(symptom);
        console.log(index);

        if (index !== -1) {
          // If found, insert the symptom back to its original position
          updatedGeneralSymptoms.splice(index, 0, symptom);
        }
      });

      return updatedGeneralSymptoms;
    });
    const removeAllChosenSymptoms = () => {
      setGeneralSymptoms((prevGeneralSymptoms) => {
        const updatedGeneralSymptoms = [...prevGeneralSymptoms];

        // Iterate over selectedSymptoms and find their original positions
        selectedSymptoms.forEach((symptom) => {
          const index = generalIllnesses.indexOf(symptom);

          if (index !== -1) {
            // If found, insert the symptom back to its original position
            updatedGeneralSymptoms.splice(index, 0, symptom);
          }
        });

        return updatedGeneralSymptoms;
      });

      setSelectedSymptoms([]);
    };

    setSelectedSymptoms([]);
  };

  // filtering illness based on what the user searches for
  const filterIllnesses = (text) => {
    const regex = new RegExp(text, "i");
    return generalIllnesses.filter((illness) => regex.test(illness));
  };

  // This is to handle the general search functionaity
  const handleSearchChange = (text) => {
    setSearchText(text);
    console.log(searchText);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterIllnesses(text);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 18 }}>
          Let's <Text style={{ color: "#2544F5" }}>Foresee</Text> your illness
        </Text>
      </View>
      <View style={{ marginVertical: 20 }}>
        <TextInput
          placeholder="Search for your symtoms"
          style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8 }}
          value={searchText}
          onChangeText={(text) => handleSearchChange(text)}
        />
      </View>

      <ModalForInfo>{modalContent}</ModalForInfo>

      <ScrollView>
        {/* Chosen Symptoms */}
        {selectedSymptoms.length !== 0 && (
          <View style={styles.chosenSymptomsContainer}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18 }}>Chosen symptoms</Text>
              <TouchableOpacity onPress={() => removeAllChosenSymptoms()}>
                <Text style={{ fontSize: 14, color: "#2544F4" }}>Clear</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.symptomsContainer}>
              {renderChosenSymptoms()}
            </View>
          </View>
        )}

        {/* Symtpoms and searched/filtered symptoms  */}
        <View>{searchText ? <SearchedSymtoms /> : <Symtoms />}</View>
      </ScrollView>

      <PredictButton />
    </View>
  );
};

export default GeneralIllnessScreen;

const styles = StyleSheet.create({
  symptomsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  symptomContainer: {
    width: "48%", // Adjust as needed for spacing
    height: 90,
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
    fontSize: 15,
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
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: "#2544F5",
    padding: 20,
    borderRadius: 1500,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  modalImg: {
    width: 150,
    height: 150,
  },
});
