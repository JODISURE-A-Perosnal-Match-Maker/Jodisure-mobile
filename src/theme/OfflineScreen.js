import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'
import theme from './theme'

const OfflineScreen = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/images/splash_icon.png')} />
            <Text>You are offline! please connect with internet.</Text>
        </View>
    )
}

export default OfflineScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 155,
        width: 155,
        position: 'relative'
    }
})
