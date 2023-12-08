import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const PredictScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View
        style={{
          marginTop: 40,
          display: "flex",
          gap: 8,
          backgroundColor: "#fff",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ fontSize: 20, color: "#000" }}>
          Predict your illness
        </Text>
        <Text style={{ color: "#797979" }}>
          Select one of the illnesses below so you can check if you actually do
          have it
        </Text>
      </View>
      <ScrollView style={{ marginTop: 20 }}>
        <View>
          <TouchableOpacity
            style={[styles.illness, { backgroundColor: '#2544F5' }]}
            onPress={() => navigation.navigate("General")}
          >
            <Text style={{ marginLeft: 12, flex: 1, fontSize: 18, color: '#fff' }}>
              Predict 
            </Text>
            <ChevronRight color="#fff" size={25} />
          </TouchableOpacity>
        </View>

{/* 
        <View style={{ marginTop: 25 }}>
          <View style={{ marginBottom: 5, padding: 8 }}>
            <Text style={{ fontSize: 20 }}>Confirm your illness</Text>
            <Text style={{ color: "#797979" }}>
              Do you feel like you have a particular illness? Select the one you
              feel you have and confirm whether you really have it or not
            </Text>
          </View>
          <TouchableOpacity
            style={styles.illness}
            onPress={() => navigation.navigate("Malaria")}
          >
            <Text style={{ marginLeft: 12, flex: 1, fontSize: 18 }}>
              Malaria
            </Text>
            <ChevronRight color="#000" size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.illness}
            onPress={() => navigation.navigate("Hepatitis")}
          >
            <Text style={{ marginLeft: 12, flex: 1, fontSize: 18 }}>
              Hepatitis
            </Text>
            <ChevronRight color="#000" size={25} />
          </TouchableOpacity>
        </View> */}

      </ScrollView>
    </View>
  );
};

export default PredictScreen;

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
