import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationScreen from '../srceens/NotificationScreen';
import HomeSceen from '../srceens/HomeSceen';
import theme from '../theme/theme';
import RecommendationsScreen from '../srceens/primary-user-screens/RecommendationsScreen';
import ConnectionsScreen from '../srceens/primary-user-screens/ConnectionsScreen';
import RequestsScreen from '../srceens/primary-user-screens/RequestsScreen';
import ChatRoomsScreen from '../srceens/primary-user-screens/ChatRoomsScreen';
import RequestScreenTab from '../srceens/primary-user-screens/RequestsScreen/RequestScreenTab';



// import SearchScreen from '../screens/SearchScreen';
// import InboxScreen from '../screens/InboxScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import UploadScreen from '../screens/UploadPost/UploadScreen';

const Tab = createBottomTabNavigator();

const CustomUploadButton = ({ children, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -10,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
  >
    <View style={{
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor:'#333',
      borderTopRightRadius: 35,
      borderTopLeftRadius: 35,
      borderBottomLeftRadius: 35,
      borderBottomRightRadius: 35,
      backgroundColor: '#000000',
      ...styles.shadow
    }}>
      {children}
    </View>
  </TouchableOpacity>
);

const HomeBotomTabNavigator = () => {
  const options = {};
  return (
    <Tab.Navigator initialRouteName="MyProfile" detachInactiveScreens={true} screenOptions={{
      tabBarShowLabel: false,
      "tabBarItemStyle": {},
      "tabBarStyle": [
        {
          "display": "flex",
          // backgroundColor:'black'
        },
        null
      ],
      tabBarActiveTintColor: theme.colors.primary,
    }}>
      <Tab.Screen
        name="MyProfile"
        component={HomeSceen}
        options={{
          tabBarIcon: (({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          )),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Recommendations"
        component={RecommendationsScreen}
        options={{
          tabBarIcon: (({ color }) => (
            <Ionicons name="list-outline" size={30} color={color} />
          )),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Connections"
        component={ConnectionsScreen}
        options={{
          tabBarIcon: (({ color }) => (
            <Ionicons name="people" size={30} color={color} />
          )),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestScreenTab}
        options={{
          tabBarIcon: (({ color }) => (
            <MaterialCommunityIcons name="format-list-checks" size={30} color={color} />
          )),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatRoomsScreen}
        options={{
          tabBarIcon: (({ color }) => (
            <MaterialIcons name="chat-bubble-outline" size={24} color={color} />
          )),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5
  }
});

export default HomeBotomTabNavigator
