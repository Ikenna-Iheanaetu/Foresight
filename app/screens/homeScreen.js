import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Clock4, Eye, Library, Infinity } from "lucide-react-native";
import { useNavigation, useFocusEffect, useIsFocused } from "@react-navigation/native";

const HomeScreen = () => {
  const [greeting, setGreeting] = useState("");
  const [username, setUsername] = useState("");

  const isFocused = useIsFocused()

  useEffect(() => {
    const date = new Date().getHours();

    if (date === 0 && date <= 11) {
      setGreeting("Good Morning");
    } else if (date >= 12 && date <= 15) {
      setGreeting("Good Afternoon");
    } else if (date >= 16 && date <= 23) {
      setGreeting("Good Evening");
    } else {
      setGreeting("");
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const value = JSON.parse(userData)
        console.log(value)
        if (value !== null) {
          setUsername(value.username);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, [isFocused]);

  const exitAppToast = useRef(null);

    useFocusEffect(
      useCallback(() => {
        const backAction = () => {
          if (exitAppToast.current && exitAppToast.current.isShowing) {
            BackHandler.exitApp();
          } else {
            ToastAndroid.showWithGravityAndOffset(
              "Press back again to exit",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
            exitAppToast.current = {
              isShowing: true,
              timeout: setTimeout(() => {
                exitAppToast.current.isShowing = false;
              }, 2000),
            };
          }
          return true;
        };

        // Add the event listener only when the screen is focused
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );

        return () => {
          // Remove the event listener when the screen is not focused
          backHandler.remove();
          if (exitAppToast.current) {
            clearTimeout(exitAppToast.current.timeout);
          }
        };
      }, [])
    );

  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={styles.greetingView}>
        <Text style={styles.greetingViewText}>
          {" "}
          {greeting} {username}{" "}
        </Text>
        <View style={styles.foresightLogoContainer}>
          <Image
            style={styles.foresightLogo}
            source={require("../assets/splash/app-eye.png")}
          />
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerBigText}>
          Predictive Wellness Unleashed With {""}
          <Text style={{ color: "#2544F5" }}>Foresight</Text>{" "}
        </Text>
        <Text style={styles.headerSmallText}>
          Gain the upper hand in health management - predict and prevent
          illnesses with our user-friendly mobile app designed for proactive
          well-being.
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionContainerRow}>
          <TouchableOpacity
            style={[
              styles.sectionContainerColumn,
              { backgroundColor: "#2544F5" },
            ]}
            onPress={() => navigation.navigate("Predict")}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 4,
                backgroundColor: "#fff",
                borderRadius: 50,
              }}
            >
              <Eye color="#2544F5" size={30} />
            </View>
            <Text style={{ fontSize: 15, color: "#fff" }}>Predict</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionContainerColumn}
            // onPress={() => navigation.navigate("Reminder")}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 4,
                backgroundColor: "#6A7AF8",
                borderRadius: 50,
              }}
            >
              <Clock4 color="#fff" size={30} />
            </View>
            <Text style={{ fontSize: 15, color: "#000" }}>Reminders</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainerRow}>
          <TouchableOpacity
            style={styles.sectionContainerColumn}
            onPress={() => navigation.navigate("History")}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 4,
                backgroundColor: "#6A7AF8",
                borderRadius: 50,
              }}
            >
              <Infinity color="#fff" size={30} />
            </View>
            <Text style={{ fontSize: 15, color: "#000" }}>Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionContainerColumn}
            onPress={() => navigation.navigate("Notes")}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 4,
                backgroundColor: "#6A7AF8",
                borderRadius: 50,
              }}
            >
              <Library color="#fff" size={30} />
            </View>
            <Text style={{ fontSize: 15, color: "#000" }}>Notes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  greetingView: {
    marginTop: 40,
    backgroundColor: "#2544F5",
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between"
  },
  greetingViewText: {
    color: "#fff",
    fontSize: 20,
    width: 220
  },
  foresightLogoContainer: {
    padding: 5,
    borderRadius: 1000,
    backgroundColor: "#fff",
  },
  foresightLogo: {
    width: 50,
    height: 50,
  },
  header: {
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  headerBigText: {
    fontSize: 25,
    marginBottom: 15,
  },
  headerSmallText: {
    color: "#797979",
  },
  sectionContainer: {
    // flex: 1,
    flexDirection: "column",
    gap: 10,
    marginVertical: 20,
  },
  sectionContainerRow: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  sectionContainerColumn: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    height: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
