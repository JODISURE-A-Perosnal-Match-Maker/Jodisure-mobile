import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useIsFocused, useRoute } from '@react-navigation/native';
import SentRequestScreen from '../RequestsScreen/SentRequestScreen';
import ReceivedRequestScreen from '../RequestsScreen/ReceivedRequestScreen';
import theme from '../../../theme/theme';
import UserPreference from './UserPreference';
import AdditionalUserInfo from './AdditionalUserInfo';
const Tab = createMaterialTopTabNavigator();

const tabBarOptions = {
  activeTintColor: 'white',
  inactiveTintColor: 'black',
  indicatorStyle: { backgroundColor: 'red', height: '100%' },
  pressOpacity: 1,
}

function RequestsTab({ navigation, activeTab }) {
  useEffect(() => {
    if (activeTab) {
      console.log("ACTIVE TAB", activeTab);

      navigation.navigate(activeTab)
    }
  }, [activeTab]);
  return (
    <Tab.Navigator
      initialRouteName={activeTab}
    // screenOptions={{
    //   tabBarActiveTintColor: theme.colors.primary,
    //   // tabBarInactiveTintColor:'red',
    //   tabBarStyle: { backgroundColor: 'white', borderBottomColor: 'red' },
    //   tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
    // }}
    >
      <Tab.Screen name="My Information"
        options={{
          tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
          tabBarActiveTintColor: theme.colors.primaryMedium, // Active color for "Your Information"
          tabBarInactiveTintColor: theme.colors.secondary, // Inactive color for "Your Preference"
        }}
        
        component={AdditionalUserInfo}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            console.log("Hope it works");

            navigation.navigate('My Preference');

          },
        })}
      />
      <Tab.Screen name="My Preference"
        options={{
          tabBarIndicatorStyle: { backgroundColor: theme.colors.secondaryDark2 },
          tabBarActiveTintColor: theme.colors.secondaryMedium, // Active color for "Your Preference"
          tabBarInactiveTintColor: theme.colors.primary, // Inactive color for "Your Information"
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            console.log("Hope it works xoxo");

            navigation.navigate('My Information');
            e.preventDefault();

          },
        })}
        component={UserPreference} />
    </Tab.Navigator>
  );
}
const DigiMatchMakerTab = ({ navigation }) => {
  // const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState();
  useEffect(() => {
    console.log(route.params);
    if (route?.params?.activeTab === 'sent') {
      setActiveTab('My Preference');
    } else {
      setActiveTab('My Information');
    }
  }, [isFocused]);
  return (
    <View style={{ flex: 1 }}>
      <RequestsTab navigation={navigation} activeTab={activeTab} />
    </View>
  )
}

export default DigiMatchMakerTab

const styles = StyleSheet.create({})