import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { ChevronLeft, DeleteIcon, Plus, Trash2 } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import dayjs from "dayjs";
import { ScrollView } from "react-native-gesture-handler";

const MainNotesScreen = () => {
  const [notes, setNotes] = useState([]);

  const isFocused = useIsFocused();
  

  const getNotesData = async () => {
    try {
      const value = await AsyncStorage.getItem("userNotes");
      if (value !== null) {
        // Update the notes state using setNotes
        console.log(JSON.parse(value));
        return JSON.parse(value);
      }
    } catch (e) {
      // Handle error reading value
      console.error("Error reading notes:", e);
    }
  };

  const deleteNote = async (id) => {
    try {
      // Retrieve existing notes from AsyncStorage
      const existingNotes = await AsyncStorage.getItem("userNotes");
      const parsedNotes = JSON.parse(existingNotes) || [];

      // Filter out the note with the specified ID
      const updatedNotes = parsedNotes.filter((note) => note.id !== id);

      // Save the updated notes back to AsyncStorage
      await AsyncStorage.setItem("userNotes", JSON.stringify(updatedNotes));

      // Update the state to reflect the changes
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
      Alert.alert("An error occurred while trying to delete the note");
    }
  };

  useEffect(() => {
    getNotesData().then((value) => setNotes(value || []));
  }, [isFocused]);

  const AddNotesButtonNoNotes = () => {
    return (
      <View
        style={{
          position: "absolute",
          bottom: "-110%",
          right: "40%",
        }}
      >
        <TouchableOpacity
          style={{ padding: 15, backgroundColor: "#2544F5", borderRadius: 50 }}
          onPress={() =>
            navigation.navigate("Addnotes", {
              title: "",
              note: "",
            })
          }
        >
          <Plus color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  const AddNotesButtonYesNotes = () => {
    return (
      <View
        style={{
          position: "absolute",
          bottom: -550,
          right: 130,
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "#2544F5", borderRadius: 150, padding: 10 }}
          onPress={() =>
            navigation.navigate("Addnotes", {
              title: "",
              note: "",
            })
          }
        >
          <Plus color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  const navigation = useNavigation();

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
          All Notes
        </Text>
      </View>

      <View>
        {notes.length !== 0 ? (
          <View style={{ marginTop: 20 }}>
            {notes.map((note, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  navigation.navigate("Addnotes", {
                    title: note.title,
                    note: note.note,
                  });
                }}
              >
                <View
                  style={{
                    backgroundColor: "#DBE2E9",
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    marginTop: 10,
                    display: "flex",
                    gap: 10,
                    justifyContent: "column",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: 600 }}>
                      {note.title}
                    </Text>
                    <Text>
                      {dayjs(note.id).format("dddd, MMMM D, YYYY h:mm A")}
                    </Text>
                  </View>
                  <Pressable onPress={() => deleteNote(note.id)}>
                    <Trash2 color="#fd0000" />
                  </Pressable>
                </View>
              </Pressable>
            ))}

            <AddNotesButtonYesNotes />
          </View>
        ) : (
          <View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "95%",
              }}
            >
              <Text style={{ fontSize: 20 }}>
                You don't have any note yet!!
              </Text>
            </View>
            <AddNotesButtonNoNotes />
          </View>
        )}
      </View>
    </View>
  );
};

export default MainNotesScreen;
