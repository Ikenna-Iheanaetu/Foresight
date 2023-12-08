import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/registerScreen";
import BottomNavigator from "./bottomNavigator";
import RemindersScreen from "./screens/remindersScreen";
import HistoryScreen from "./screens/historyScreen";
import NotesScreen from "./screens/notesScreen";

// Illness screens
import GeneralIllnessScreen from "./screens/illnessScreen/generalIllnessScreen";
import MalariaIllnessScreen from "./screens/illnessScreen/malariaIllnnessScreen";
import HepatitisIllnessScreen from "./screens/illnessScreen/hepatatisIllnessScreen";

// Profile Sub screens
import EditProfileScreen from "./screens/profileSubScreens/editScreen";

// Notes Sub Screens 
import DiseasePrecautionScreen from "./screens/notesSubScreen.js/diseasePrecautionScreen";
import MainNotesScreen from "./screens/notesSubScreen.js/mainNotesScreen";
import AddNotes from "./screens/notesSubScreen.js/addNotesScreen";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Register"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={({ route, navigation }) => {
            return {
              gestureEnabled: false, // Disable swipe gesture to navigate back
            };
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ route, navigation }) => {
            return {
              gestureEnabled: false, // Disable swipe gesture to navigate back
            };
          }}
        />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Reminder" component={RemindersScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Notes" component={NotesScreen} />

        {/* Illness screens  */}

        <Stack.Screen name="Malaria" component={MalariaIllnessScreen} />
        <Stack.Screen name="Hepatitis" component={HepatitisIllnessScreen} />
        <Stack.Screen name="General" component={GeneralIllnessScreen} />

        {/* Profile Sub Screens  */}
        <Stack.Screen name="Edit" component={EditProfileScreen} />

        {/* Notes Sub Screens  */}
        <Stack.Screen name="Precaution" component={DiseasePrecautionScreen} />
        <Stack.Screen name="Mainnotes" component={MainNotesScreen} />
        <Stack.Screen name="Addnotes" component={AddNotes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
