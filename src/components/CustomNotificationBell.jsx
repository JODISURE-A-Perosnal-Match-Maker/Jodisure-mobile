import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Badge } from 'react-native-elements';
import { liveAwaitingReceivedRequest } from '../services/RequestService';
const CustomNotificationBell = (props) => {
  const navigation = useNavigation();
  const [awaitingReceivedRequests, setAwaitingReceivedRequests]=useState(0);
  useEffect(() => {
    const subscriber = liveAwaitingReceivedRequest().onSnapshot(snapshot => {
      const totalRequests = [];
      snapshot.forEach(doc => {
        totalRequests.push(doc.data());
      });
      //if total request is greater then 9 then just show +9
      if(totalRequests.length>9){
        setAwaitingReceivedRequests('+9');
      }else{
        setAwaitingReceivedRequests(totalRequests.length);
      }
      
    })
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Notification');
    }} style={styles.container}>
      <SimpleLineIcons name="bell" size={24} color="#00333a" />
      {awaitingReceivedRequests > 0 ? <Badge value={awaitingReceivedRequests} status="error" containerStyle={styles.badge} /> : null}
    </TouchableOpacity>
  )
}

export default CustomNotificationBell

const styles = StyleSheet.create({
  container: { marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  badge:{ position: 'absolute', top: -4, }
})
