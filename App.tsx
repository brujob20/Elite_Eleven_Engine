import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { IoIosAdd } from "react-icons/io";
import {MdContentPasteGo} from "react-icons/md";
import showTeams from "./views/showTeams";
import AddTeam from "./views/AddTeam";
import {StyleSheet} from "react-native";
import LandingPage from "./views/LandingPage";
import {FaHome} from "react-icons/fa";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
            screenOptions={{
              headerShown: false  // Schaltet die Anzeige der Kopfzeile für alle Screens aus
            }}
        >
            <Tab.Screen
                name="Home"
                component={LandingPage}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FaHome  color={"#2a9d8f"} size={size}/>
                    ),
                }}
            />
          <Tab.Screen
              name="ShowTeams"
              component={showTeams}
              options={{
                tabBarLabel: 'show Teams',
                tabBarIcon: ({ color, size }) => (
                    <MdContentPasteGo color={"#2a9d8f"} size={size}/>
                ),
              }}
          />
          <Tab.Screen
              name="AddTeam"
              component={AddTeam}
              options={{
                tabBarLabel: 'Add Team',
                tabBarIcon: ({ color, size }) => (
                    <IoIosAdd color={"#2a9d8f"} size={size} />
                ),
              }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2a9d8f"',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});
