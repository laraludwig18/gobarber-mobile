import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppointmentCreated from '../pages/AppointmentCreated';
import CreateAppointment from '../pages/CreateAppointment';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

import { Colors } from '../constants';

const App = createStackNavigator();

const AppRouter: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: Colors.BACKGROUND,
        },
      }}
    >
      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen name="AppointmentCreated" component={AppointmentCreated} />
      <App.Screen name="CreateAppointment" component={CreateAppointment} />

      <App.Screen name="Profile" component={Profile} />
    </App.Navigator>
  );
};

export default AppRouter;
