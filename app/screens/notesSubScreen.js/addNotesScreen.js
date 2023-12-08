import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, Check } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AddNotes = ({ route }) => {
  const [noteDetails, setNoteDetails] = useState({
    title: "",
    note: "",
  });

  const navigation = useNavigation();
  const { title, note } = route.params

  useEffect(() => { 
     if(title && note) setNoteDetails({ ...noteDetails, title , note})
     console.log(title, note)
  }, [])

  const saveNotes = async (illness) => {
    try {
      const userNotesObj = {
        id: Date.now(),
        ...noteDetails,
      };

      // Retrieve existing history or initialize an empty array
      const notes = await AsyncStorage.getItem("userNotes");
      let parsedNotes = JSON.parse(notes) || [];

      console.log("Parsed Notes Before:", parsedNotes);

      // Add the new userHistoryObj to the array
      parsedNotes.push(userNotesObj);

      console.log("Parsed History After:", parsedNotes);
      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem("userNotes", JSON.stringify(parsedNotes));

      // Check the saved data
      const savedNotes = await AsyncStorage.getItem("userNotes");
      console.log("Saved Notes:", JSON.parse(savedNotes));

      navigation.goBack()
    } catch (error) {
      console.error("Error saving prediction:", error);
      Alert.alert(
        "An error has just occurred while trying to save this prediction"
      );
    }
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
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
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
            All Notes
          </Text>
        </View>
        {noteDetails.title && noteDetails.note && (
          <Pressable wstyle={{ alignItems: "center", display: "flex" }} onPress={() => saveNotes()}>
            <Check color="#000" />
          </Pressable>
        )}
      </View>

      <View
        style={{
          display: "flex",
          marginTop: 30,
          display: "flex",
          gap: 20,
          marginBottom: 5,
        }}
      >
        <TextInput
          placeholder="Title"
          multiline
          style={{ fontSize: 20 }}
          value={noteDetails.title}
          cursorColor="#2544F5"
          onChangeText={(title) => setNoteDetails({ ...noteDetails, title })}
        />
        <TextInput
          placeholder="Note something down"
          multiline
          cursorColor="#2544F5"
          style={{ marginBottom: 10 }}
          selectionColor="#2544F5"
          value={noteDetails.note}
          onChangeText={(note) => setNoteDetails({ ...noteDetails, note })}
        />
      </View>
    </View>
  );
};

export default AddNotes;
