import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Theme from './Theme';

const RoundDarkButton = ({ onPress, name, color, disabled, style }) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: (disabled)?'#e4e4e4':(color)?color:'#a05b85',
            borderColor: (disabled) ? '#e4e4e4':(color)?color:'#a05b85',
            borderWidth: 1,
            paddingVertical: 7,
            paddingHorizontal: 33,
            borderRadius: 50,
        },
        title: {
            color: '#a05b85'
        },
        
    });
    if(disabled){
        return (
            <View style={[styles.container, style]}>
                <Theme.TextB color={'#ffffff'} size="14px" style={{ textAlign: 'center' }}>{name}</Theme.TextB>
            </View>
        )
    }
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, style]}>
                <Theme.TextB color={'#ffffff'} size="14px" style={{textAlign:'center'}}>{name}</Theme.TextB>
            </View>
        </TouchableOpacity>
    )
}

export default RoundDarkButton


