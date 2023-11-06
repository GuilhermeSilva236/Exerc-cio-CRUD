import React from 'react';
import DrawerRoutes from './src/routes/DrawerRoutes';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <DrawerRoutes />
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
}
