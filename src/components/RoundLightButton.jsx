import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Theme from './Theme';

const RoundLightButton = ({ onPress, name, color, nameColor, style }) => {
    if(!color){
        color='#a05b85';
    }
    if(!nameColor){
        nameColor=color;
    }
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#ffffff',
            borderColor: color,
            borderWidth: 1,
            paddingVertical: 7,
            paddingHorizontal: 10,
            borderRadius: 50,
            justifyContent:'center',
            alignItems:'center'
        },
        title: {
            color: nameColor
        }
    });
    
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, style]}>
                <Theme.TextB color={nameColor} size="14px">{name}</Theme.TextB>
            </View>
        </TouchableOpacity>
    )
}

export default RoundLightButton


