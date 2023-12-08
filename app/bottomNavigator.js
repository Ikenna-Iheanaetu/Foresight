import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Eye, User2 } from "lucide-react-native";

import HomeScreen from "./screens/homeScreen";
import PredictScreen from "./screens/predictScreen";
import ProfileScreen from "./screens/profileScreen";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const getTabIconColor = (focused) => {
    return focused ? "#2544F5" : "#000";
  };

  return (
    <Tab.Navigator
      useLegacyImplementation
      screenOptions={{
        tabBarActiveTintColor: "#2544F5",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Home color={getTabIconColor(focused)} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Predict"
        component={PredictScreen}
        options={{
          tabBarLabel: "Predict",
          tabBarIcon: ({ focused }) => <Eye color={getTabIconColor(focused)} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <User2 color={getTabIconColor(focused)} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
