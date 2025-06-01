import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext';
import AppContainer from './src/components/common/AppContainer';

export default function App() {
  return (
    <AppContainer>
      <SafeAreaProvider>
        <UserProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </UserProvider>
      </SafeAreaProvider>
    </AppContainer>
  );
}