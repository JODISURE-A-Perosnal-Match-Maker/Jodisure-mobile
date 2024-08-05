import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';

const SignupWebViewScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://rivayatt-3c9d5.firebaseapp.com/' }}
      />
    </View>
  )
}

export default SignupWebViewScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'red'
  }
})
