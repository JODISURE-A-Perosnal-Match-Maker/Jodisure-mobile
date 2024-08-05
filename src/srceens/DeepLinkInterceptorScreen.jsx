import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { UserContext } from '../navigation';
import theme from '../theme/theme';
import FullScreenLoader from '../theme/FullScreenLoader';

const DeepLinkInterceptorScreen = () => {
    const route = useRoute();
    const cUser = useContext(UserContext);
    const navigation = useNavigation();
    useEffect(()=>{
        cUser.updateLoginAs('fnf');
        navigation.navigate('ChooseAccount', { ...route.params, screen: 'AddUser' });
    },[route]);
  return (
    <View style={styles.container}>
        <FullScreenLoader />
      <Text style={{marginTop:150}}>Please wait while we determine where to route you...</Text>
    </View>
  )
}

export default DeepLinkInterceptorScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:theme.colors.white,
        justifyContent:'center',
        alignItems:'center'
    }
})