import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { ChevronRight, ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const NotesScreen = () => {
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
          Notes
        </Text>
      </View>

      <ScrollView style={{ marginTop: 20 }}>
        <View>
          <Pressable
            style={[styles.illness, { backgroundColor: "#2544F5" }]}
            onPress={() => navigation.navigate("Mainnotes")}
          >
            <Text
              style={{ marginLeft: 12, flex: 1, fontSize: 18, color: "#fff" }}
            >
              Take notes
            </Text>
            <ChevronRight color="#fff" size={25} />
          </Pressable>
          <Pressable
            style={styles.illness}
            onPress={() => navigation.navigate("Precaution")}
          >
            <Text style={{ marginLeft: 12, flex: 1, fontSize: 18 }}>
              Precations to illnesses
            </Text>
            <ChevronRight color="#000" size={25} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  illness: {
    backgroundColor: "#fff",
    marginVertical: 8,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Shadow properties for Android
    elevation: 5,
  },
});
