import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'
import theme from './theme'

const FullScreenLoader = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/images/splash_icon.png')} />
            <ActivityIndicator size={100} color={theme.colors.white} />
        </View>
    )
}

export default FullScreenLoader

const styles = StyleSheet.create({
    container: {
        top:0,
        left:0,
        right:0,
        bottom:0,
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute',
        zIndex:999999,
    },
    image: {
        height: 90,
        width: 90,
        position: 'absolute'
    }
})
