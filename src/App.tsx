import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import AppProvider from './context';
import Routes from './routes';

import { Colors } from './constants';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
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
};

export default App;
