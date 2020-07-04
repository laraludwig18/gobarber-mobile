import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppProvider from './context';
import Routes from './routes';

import { Colors } from './constants';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar
      barStyle="light-content"
      backgroundColor={Colors.BACKGROUND}
      translucent
    />
    <AppProvider>
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: Colors.BACKGROUND }}>
          <Routes />
        </View>
      </SafeAreaProvider>
    </AppProvider>
  </NavigationContainer>
);

export default App;
