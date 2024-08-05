import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Avatar = ({imageSource}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={imageSource}/>
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:62,
        height:62,
        borderRadius:62,
        resizeMode:'cover'
    }
})
