import React from 'react';
import { View, StyleSheet, Image } from "react-native";



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    img: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderWidth:4,
        borderColor:'#ffffff',
        borderRadius:50,
    }
})

const ConnectionsCard = ({ image, style }) => {

    return (

        <View style={styles.container}>
            <Image style={[styles.img,style]} source={image}/>
        </View>

    );

}

export default ConnectionsCard;