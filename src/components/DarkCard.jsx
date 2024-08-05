import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import Theme from './Theme'
import CircleBadge from './CircleBadge';

const DarkCard = ({ bgColor, iconImage, title, count, onPress }) => {
    // console.log(onPress);
    return (
        <View style={[{ backgroundColor: bgColor }, styles.container]}>
            <Image style={styles.icon} source={iconImage} />
            <Theme.TextB color="#ffffff" size="18px">{title}</Theme.TextB>
            <TouchableWithoutFeedback onPress={onPress}>
                <CircleBadge onPress={onPress} count={count} txtColor="#fff" bgColor="#84b6c0"></CircleBadge>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default DarkCard

const styles = StyleSheet.create({
    container: {
        padding: 16,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
    },
    icon: {
        width: 42,
        height: 38
    }
})
