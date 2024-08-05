import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { Easing, SlideOutUp, set, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const LogoIcon = require('../assets/images/splash_icon.png');
const LogoText = require('../assets/images/Logo.png');
const { width, height } = Dimensions.get('screen');
export default function AnimatedLogo() {
    const sharedVal =useSharedValue(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
            sharedVal.value = withTiming(360, { duration: 2000, easing: Easing.quad });
        }, 200);
    },[])

    const aStyle = useAnimatedStyle(() => {
        return {
            width: sharedVal.value/2,
            transform: [
                {
                    rotate: `${sharedVal.value} deg`,
                },
                {
                    translateY: sharedVal.value-250
                }
            ]
        }
    });

    const tStyle = useAnimatedStyle(() => {
        return{
            transform:[
                {
                    translateY: sharedVal.value-100
                }
            ]
        }
    });

    if(!loaded) return null;

    return (
        <Animated.View
            style={styles.container}
        >
            <Animated.Image entering={SlideOutUp} source={LogoIcon} style={[styles.image,aStyle]} />
            <Animated.Image entering={SlideOutUp} source={LogoText} style={[styles.logoText,tStyle]} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        width: width,
    },
    image: { 
        marginTop: 100,
        height: 150, 
        resizeMode: 'contain'
    },
    logoText: {
        height: 35
    }
})