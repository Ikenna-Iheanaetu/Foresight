import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react-native";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image as Img } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Trash } from "lucide-react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REQ_URL } from '@env'


const EditProfileScreen = () => {
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    imgBase64: null,
  });
  const [currrentUserData, setCurrentUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Updated editData:", editData);
  }, [editData]);

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const value = JSON.parse(userData);
        if (value !== null) {
          console.log(value);
          setCurrentUserData({ ...currrentUserData, ...value });
          console.log(userData);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  const navigation = useNavigation();

  const saveEdittedProfile = async () => {
    const newUserData = {
      id: currrentUserData.id,
      username: editData.name || currrentUserData.name,
      email: editData.email || currrentUserData.email,
      image:
        editData.imgBase64 !== null
          ? editData.imgBase64
          : currrentUserData.imgBase64,
    };

    return await AsyncStorage.mergeItem(
      "userData",
      JSON.stringify(newUserData)
    );
  };

  const updateInfo = async () => {
    setLoading(true);

    const response = await axios
      .post(
        `${REQ_URL}/api/v1/users/update/${currrentUserData.id}`,
        editData
      )
      .then(async (res) => {
        console.log(res.data);

        if (res.data?.message === "User information updated successfully") {
          await saveEdittedProfile();

          setLoading(false);

          navigation.goBack();
        } else if (res.data?.message === "Invalid email") {
          setLoading(false);

          Alert.alert(res.data?.message);
        } else {
          return;
        }
      });
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      const imageUri = result.assets[0]?.uri;
      console.log(imageUri);

      if (!result.canceled) {
        if (imageUri) {
          console.log(imageUri);
          // const base64 = await convertImageToBase64(imageUri);
          const base64 = result.assets[0]?.uri;
          addTheImgUri(base64);
          console.log(editData);
        } else {
          console.error("Image URI is null or undefined");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  // const convertImageToBase64 = async (uri) => {
  //   try {
  //     if (!uri) {
  //       throw new Error("Image URI is null or undefined");
  //     }

  //     const base64 = await FileSystem.readAsStringAsync(uri, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });
  //     return base64;
  //   } catch (error) {
  //     console.error("Error converting image to base64:", error);
  //     throw error; // Re-throw the error to propagate it further if needed
  //   }
  // };

  const addTheImgUri = (uri) => {
    setEditData({ ...editData, imgBase64: uri });
    // setImage(uri);
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
          Edit Profile
        </Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          placeholder="Enter your new name"
          style={styles.inputStyles}
          cursorColor="#000"
          placeholderTextColor="#898989"
          value={editData.name}
          onChangeText={(name) => setEditData({ ...editData, name })}
        />
        <TextInput
          placeholder="Enter your new email"
          style={styles.inputStyles}
          cursorColor="#000"
          placeholderTextColor="#898989"
          value={editData.email}
          onChangeText={(email) => setEditData({ ...editData, email })}
        />
        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            gap: 4,
            marginTop: 10,
          }}
          onPress={() => pickImage()}
        >
          <Img color="#000" />
          <Text>Select an image for your profile photo</Text>
        </Pressable>
      </View>

      {editData.imgBase64 && (
        <View
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: editData.imgBase64 }}
            style={{ width: 200, height: 200 }}
            onError={(e) =>
              console.error("Error loading image:", e.nativeEvent.error)
            }
          />
          <Pressable
            onPress={() => setEditData({ ...editData, imgBase64: null })}
          >
            <Trash color="#000" />
          </Pressable>
        </View>
      )}

      <View style={{ marginTop: 40 }}>
        <Pressable
          style={{
            backgroundColor: "#2544F5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 8,
          }}
          onPress={() => updateInfo()}
        >
          {!loading ? (
            <Text style={{ color: "#fff" }}>Update</Text>
          ) : (
            <ActivityIndicator color="#fff" size="small" />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  inputView: {
    display: "flex",
    gap: 15,
    marginTop: 40,
  },
  inputStyles: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});
