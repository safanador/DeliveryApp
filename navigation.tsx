import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Auth from './auth/screens/Login';
import Welcome from './auth/screens/Welcome';
import SignUp from './auth/screens/SignUp';
import UsersHome from './users/screens/UsersHome';
import Receiver from './auth/screens/Receiver';
import UpdateProfile from './auth/screens/UpdateProfile';
import LoadingUpdateProfile from './auth/screens/LoadingUpdateProfile';

export type RootStackParamList = {
  Receiver: any;
  Welcome: any;
  Login: any;
  SignUp: any;
  LoadingProfileUpdate: any;
  UpdateProfile: any;
  UsersHome: any;

  // otras rutas
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Receiver" component={Receiver} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Auth} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="LoadingProfileUpdate"
          component={LoadingUpdateProfile}
        />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="UsersHome" component={UsersHome} />
        {/*
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen
          name="Cart"
          options={{presentation: 'modal'}}
          component={CartScreen}
        />
         */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
