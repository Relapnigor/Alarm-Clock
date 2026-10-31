import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import StartScreen from './components/StartScreen';
import MainScreen from './components/MainScreen';
import AddScreen from './components/AddScreen';
import EditScreen from './components/EditScreen';

const Stack = createNativeStackNavigator();

// Configures the navigation stack and keeps screens below the phone status bar.
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#512DA8' }} edges={['top']}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="start" component={StartScreen} />
            <Stack.Screen options={{ headerShown: false }} name="main" component={MainScreen} />
            <Stack.Screen options={{ headerShown: false }} name="add" component={AddScreen} />
            <Stack.Screen options={{ headerShown: false }} name="edit" component={EditScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
