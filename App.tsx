import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IoIosAdd } from "react-icons/io";
import { MdContentPasteGo } from "react-icons/md";
import AddTeam from "./views/AddTeam";
import LandingPage from "./views/LandingPage";
import RandomMatch from "./views/RandomMatch";
import { StyleSheet } from "react-native";
import { FaHome } from "react-icons/fa";
import ShowTeams from "./views/ShowTeams";
import { TbTournament } from "react-icons/tb";
import MatchResult from "./views/MatchResult";
import {createStackNavigator} from "@react-navigation/stack";
import EditTeam from "./views/EditTeam";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={LandingPage}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FaHome color={"#2a9d8f"} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="ShowTeams"
                component={ShowTeams}
                options={{
                    tabBarLabel: 'Show Teams',
                    tabBarIcon: ({ color, size }) => (
                        <MdContentPasteGo color={"#2a9d8f"} size={size} />
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
            <Tab.Screen
                name="RandomMatch"
                component={RandomMatch}
                options={{
                    tabBarLabel: 'Random Match',
                    tabBarIcon: ({ color, size }) => (
                        <TbTournament color={"#2a9d8f"} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
                <Stack.Screen name="EditTeam" component={EditTeam} />
                <Stack.Screen name="MatchResult" component={MatchResult} />
            </Stack.Navigator>
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
