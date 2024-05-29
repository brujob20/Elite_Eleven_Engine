import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Frontpage from './views/Frontpage';
import AddTeam from './views/AddTeam';
import showTeams from "./views/showTeams";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Frontpage">
          <Stack.Screen name="Frontpage" component={Frontpage} />
          <Stack.Screen name="AddTeam" component={AddTeam} />
          <Stack.Screen name="ShowTeams" component={showTeams} />
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
    color: '#2a9d8f',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});
