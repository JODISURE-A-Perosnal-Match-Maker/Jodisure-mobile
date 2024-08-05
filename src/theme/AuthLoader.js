import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'
import theme from './theme'
import Video from 'react-native-video'

const AuthLoader = () => {
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require('../assets/images/splash_animation.gif')} /> */}
      {/* <ActivityIndicator size={200} color={theme.colors.white} /> */}
      <Video style={styles.backgroundVideo} resizeMode="cover" source={require('../assets/images/splash-video.mp4')} />
    </View>
  )
}

export default AuthLoader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundVideo: {
    position: 'absolute',
    height: 850,
    width: 410,
    // bottom: 0,
    // right: 0,
  },
  image: {
    height: 1000,
    width: 500,
    position: 'absolute',

  }
})
