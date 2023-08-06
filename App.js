import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/pages/LoginScreen';
import HomeScreen from './src/pages/HomeScreen';
import PdfWebView from './src/pages/PdfWebView';
import MasterData from './src/pages/MasterData';
import Division from './src/pages/Division';
import ManualMaster from './src/pages/ManualMaster';
import AddUser from './src/pages/AddUser';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login'}}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Home'}}
        />

        <Stack.Screen
          name="PdfWebView"
          component={PdfWebView}
          options={{title: 'Manual'}}
        />

        <Stack.Screen
          name="MasterData"
          component={MasterData}
          options={{title: 'Master Data'}}
        />

        <Stack.Screen
          name="Division"
          component={Division}
          options={{title: 'Division'}}
        />

        <Stack.Screen
          name="ManualMaster"
          component={ManualMaster}
          options={{title: 'Manual Master'}}
        />

        <Stack.Screen
          name="AddUser"
          component={AddUser}
          options={{title: 'Add User'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
