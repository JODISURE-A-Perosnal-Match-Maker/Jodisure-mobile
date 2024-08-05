import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ReceivedRequestScreen from './ReceivedRequestScreen';
import SentRequestScreen from './SentRequestScreen';
import theme from '../../../theme/theme';
import { useIsFocused, useRoute } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

const tabBarOptions = {
  activeTintColor: 'white',
  inactiveTintColor: 'black',
  indicatorStyle: { backgroundColor: 'red', height: '100%' },
  pressOpacity: 1,
}

function RequestsTab({navigation,activeTab}) {
useEffect(()=>{
  if(activeTab){
    navigation.navigate(activeTab)
  }
},[activeTab]);
  return (
    <Tab.Navigator
      initialRouteName={activeTab}
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        // tabBarInactiveTintColor:'red',
        tabBarStyle: { backgroundColor: 'white', borderBottomColor: 'red' },
        tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
      }}>
      <Tab.Screen name="SentRequests" component={SentRequestScreen} />
      <Tab.Screen name="ReceivedRequests" component={ReceivedRequestScreen} />
    </Tab.Navigator>
  );
}
const RequestScreenTab = ({ navigation }) => {
  // const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState();
  useEffect(() => {
    console.log(route.params);
    if(route?.params?.activeTab==='sent'){
      setActiveTab('SentRequests');
    }else{
      setActiveTab('ReceivedRequests');
    }
  }, [isFocused]);
  return (
    <View style={{ flex: 1 }}>
      <RequestsTab navigation={navigation} activeTab={activeTab} />
    </View>
  )
}

export default RequestScreenTab

const styles = StyleSheet.create({})