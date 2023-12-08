import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import { Eye } from "lucide-react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REQ_URL } from '@env'

const RegisterScreen = () => {
  const [loading, setLoading] = useState(false);
  const [secureInput, setSecureInput] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userPassword: "",
  });
  const navigation = useNavigation();

  const onSubmit = async () => {
    setLoading(!loading);

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      Alert.alert("All inputs are needed");
      setLoading(false);
      return;
    }

    await axios
      .post(`${REQ_URL}/auth/register`, {
        name: formData.name,
        email: formData.email.toLocaleLowerCase(),
        userPassword: formData.userPassword,
      })
      .then((res) => {
        if (res.data?.message === "User already exist") {
          Alert.alert(res.data?.message);
          setLoading(false);
        } else if (res.data?.message === "User registered successfully") {
          navigation.navigate("Login");
          setFormData({
            name: "",
            email: "",
            userPassword: "",
          });
          setLoading(false);
        } else if (res.data?.message === "Invalid email address") {
          Alert.alert(res.data?.message);
          setLoading(false);
        } else Alert.alert("Something went worng, try again later");
        console.log(res);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Something went wrong please try again later.");

        console.log(error);
      });
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          navigation.navigate("BottomNavigator", { screen: "Home" });
        }
      } catch (e) {
        // error reading value
      }
    };
    const removeValue = async () => {
      try {
        await AsyncStorage.removeItem("token");
      } catch (e) {
        // remove error
      }

      console.log("Done.");
    };

    getData();
    // removeValue();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image
            style={styles.foresightLogo}
            source={require("../assets/splash/app-eye.png")}
          />
          <Text style={styles.foresightLogoText}>
            <Text style={styles.blueText}>F</Text>oresight
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.registerView}>
            <Text style={styles.registerViewText}>Register</Text>
          </View>
          <View style={styles.formView}>
            <View style={styles.inputView}>
              <Text style={styles.inputViewText}>Name</Text>
              <TextInput
                placeholder="Enter your name..."
                style={styles.input}
                cursorColor="#000"
                placeholderTextColor="#898989"
                value={formData.name}
                onChangeText={(name) =>
                  setFormData({ ...formData, name: name })
                }
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputViewText}>Email</Text>
              <TextInput
                placeholder="Enter your email..."
                style={styles.input}
                cursorColor="#000"
                placeholderTextColor="#898989"
                value={formData.email}
                onChangeText={(email) =>
                  setFormData({ ...formData, email: email })
                }
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.inputViewText}>Password</Text>
              <View style={styles.inputPassword}>
                <TextInput
                  placeholder="Enter your password..."
                  style={styles.inputP}
                  cursorColor="#000"
                  placeholderTextColor="#898989"
                  secureTextEntry={secureInput}
                  value={formData.password}
                  onChangeText={(password) =>
                    setFormData({ ...formData, userPassword: password })
                  }
                />
                <Eye
                  color="black"
                  onPress={() => setSecureInput(!secureInput)}
                />
              </View>
            </View>
          </View>
          <View style={styles.registerButtonView}>
            {loading ? (
              <View style={styles.indicator}>
                <ActivityIndicator size="large" color="#2544F5" />
              </View>
            ) : (
              <Text style={styles.registerButtonText} onPress={onSubmit}>
                Register
              </Text>
            )}
          </View>
          <View style={styles.loginView}>
            <Text style={styles.login}>
              <Text style={styles.loginText}>
                If you already have an account?
              </Text>{" "}
              <Text
                style={styles.login}
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  foresightLogo: {
    width: 200,
    height: 200,
  },
  foresightLogoText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  blueText: {
    color: "#2544F5",
  },
  formContainer: {
    backgroundColor: "#2544F5",
    marginTop: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: Platform.OS === "ios" ? 120 : 0,
  },
  registerView: {
    display: "flex",
    alignItems: "center",
    marginTop: 15,
  },
  registerViewText: {
    fontSize: 20,
    color: "#fff",
  },
  formView: {
    marginTop: 30,
    paddingHorizontal: 20,
    display: "flex",
    gap: 20,
  },
  inputView: {
    display: "flex",
    gap: 15,
  },
  inputViewText: {
    fontSize: 18,
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputPassword: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    gap: 150,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  inputP: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 8,
  },
  registerButtonView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 80 : 30,
    marginBottom: 25,
  },
  registerButtonText: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  indicator: {
    backgroundColor: "#fff",
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 5,
  },
  loginView: {
    marginBottom: 20,
    marginLeft: 25,
  },
  login: {
    fontSize: 15,
    color: "#fff",
  },
  loginText: {
    color: "#000",
  },
});

// import React from 'react'
// import { View, Text } from 'react-native'

// const LoginScreen = () => {
//     return(
//         <View>
//             <Text>Login Screen</Text>
//         </View>
//     )
// }
