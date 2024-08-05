import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../srceens/auth-screens/LoginScreen';
import IntroSliderScreen from '../srceens/auth-screens/IntroSliderScreen';
import PrimaryUserLoginScreen from '../srceens/auth-screens/PrimaryUserLoginScreen';
import SignupWebViewScreen from '../srceens/auth-screens/SignupWebViewScreen';
import LoginWithPhoneScreen from '../srceens/auth-screens/LoginWithPhoneScreen';
import ContactUs from '../srceens/ContactUs';
import LoginWithEmailScreen from '../srceens/auth-screens/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="IntroSlider" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="IntroSlider" component={IntroSliderScreen} />
      <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: true, headerTitle: 'Contact us' }} />
      <Stack.Screen name="PrimaryUserLogin" component={PrimaryUserLoginScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoginWithPhone" component={LoginWithPhoneScreen} />
      <Stack.Screen name="LoginWithEmail" component={LoginScreen} />

      <Stack.Screen name="Signup" component={SignupWebViewScreen} />
    </Stack.Navigator>
  )
}

export default AuthStackNavigator;