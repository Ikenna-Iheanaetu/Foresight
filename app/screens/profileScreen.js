import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChevronRight, History, User2, UserCircle } from "lucide-react-native";

import { useNavigation, useIsFocused } from "@react-navigation/native";

const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  // console.log(userData);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const value = JSON.parse(userData);
        if (value !== null) {
          console.log(value);
          setUserData({ ...userData, ...value });
          console.log(userData);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, [isFocused]);

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login")
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            backgroundColor: "#2544F5",
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 8,

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {!userData?.image ? (
            <View
              style={{
                backgroundColor: "#fff",
                padding: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
                marginRight: 20,
              }}
            >
              <User2 color="#2544F5" />
            </View>
          ) : (
            <Image
              source={{ uri: userData?.image }}
              style={{
                width: 40,
                height: 40,
                marginRight: 12,
                borderRadius: 50,
              }}
            />
          )}
          <View style={{ display: "flex", gap: 4 }}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              {userData.username}
            </Text>
            <Text style={{ color: "#fff" }}>{userData.email}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={{ marginTop: 25 }}>
        <Pressable
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 20,
          }}
          onPress={() => navigation.navigate("Edit")}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#cecece",
                padding: 5,
                borderRadius: 50,
                marginRight: 12,
              }}
            >
              <UserCircle color="black" />
            </View>

            <Text>Edit profile</Text>
          </View>
          <ChevronRight color="black" />
        </Pressable>
        <Pressable
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
          onPress={() => navigation.navigate("History")}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#cecece",
                padding: 5,
                borderRadius: 50,
                marginRight: 12,
              }}
            >
              <History color="black" />
            </View>

            <Text>History</Text>
          </View>
          <ChevronRight color="black" />
        </Pressable>
        <Pressable
          style={{
            marginTop: 50,
            backgroundColor: "#2445F5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 8,
          }}
          onPress={() => logOut()}
        >
          <Text style={{ color: "#fff" }}>Logout</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
