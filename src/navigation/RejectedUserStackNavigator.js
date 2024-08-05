import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../theme/theme'
import Theme from '../components/Theme'

const RejectedUserStackNavigator = () => {
  return (
    <View style={styles.container}>
      <Theme.TextB size="43px" color="white">!!! Alert !!!</Theme.TextB>
      <Theme.TextB color="white">Your profile has been rejected</Theme.TextB>
      <Theme.Text style={{textAlign:'center'}} color="white">There could be many reason when a profile is rejected. which includes voilation of code of conduct, useage policy, etc. Please contact our support center to know more!!</Theme.Text>
    </View>
  )
}

export default RejectedUserStackNavigator

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:24,
        backgroundColor:theme.colors.error,
        color:theme.colors.white,
    }
})