import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Person, AuthorizationResponse } from '../types';

import ScanScreen from '../screens/ScanScreen';
import AuthorizationScreen from '../screens/AuthorizationScreen';
import DrinksMenuScreen from '../screens/DrinksMenuScreen';

export type RootStackParamList = {
  Scan: undefined;
  Authorization: { person: Person };
  DrinksMenu: { person: Person; authResponse: AuthorizationResponse };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Scan"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: "", 
          headerLeftContainerStyle: { paddingLeft: 10 },
        }}
      >
        <Stack.Screen 
          name="Scan" 
          component={ScanScreen} 
          options={{ title: 'Escanear Documento' }} 
        />
        <Stack.Screen 
          name="Authorization" 
          component={AuthorizationScreen} 
          options={{ title: 'Verificación de Acceso' }} 
        />
        <Stack.Screen 
          name="DrinksMenu" 
          component={DrinksMenuScreen} 
          options={{ title: 'Menú de Bebidas' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
