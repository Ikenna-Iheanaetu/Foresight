import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { ChevronLeft, Scroll } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

const HistoryScreen = () => {
  const [userHistory, setUserHistory] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem("userHistory");
        console.log(value)
        if (value !== null) {
          const parsedValue = JSON.parse(value);
          setUserHistory(parsedValue);
          console.log(parsedValue);
        }
      } catch (e) {
        // error reading value
      }
    };

     getUserData();
  }, []);

  const renderActivities = () => {
    return (
      <View>
        {userHistory.reverse().map((history, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#fff",
              marginTop: 10,
              paddingHorizontal: 8,
              paddingVertical: 10,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text>{dayjs(history.id).format("dddd, MMMM D, YYYY h:mm A")}</Text>
            <Text>{history.prognosis}</Text>
            <View>
              <Text>
                Selected symptoms are{" "}
                {history.symptoms.map((ill, index) => (
                  <Text key={index}>
                    {index > 0 && index === history.symptoms.length - 1
                      ? " and "
                      : ""}
                    {ill}
                    {index < history.symptoms.length - 2 ? ", " : ""}
                  </Text>
                ))}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={{ paddingHorizontal: 20 }}>
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
          History
        </Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ color: "#797979" }}>
          Uncover the path of foresight. Review your previously predicted and
          prognosed illnesses to stay informed about your health journey. Your
          health history, at your fingertips, for a proactive and empowered
          tomorrow.
        </Text>
      </View>

      <ScrollView>
        {userHistory === null ? (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "75%",
            }}
          >
            <Text style={{ fontSize: 20 }}>No activities yet</Text>
          </View>
        ) : (
          <View style={{ marginBottom: 10 }}>{renderActivities()}</View>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default HistoryScreen;
