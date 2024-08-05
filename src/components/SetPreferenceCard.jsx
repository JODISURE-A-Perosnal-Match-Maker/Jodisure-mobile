import React, { useEffect, useRef } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import { TouchableOpacity, Animated, Easing, View, Text } from 'react-native';
import theme from '../theme/theme';
import Theme from './Theme';

const AnimatedContainer = styled(Animated.View)`
  flex-direction: column;
  font-family: Barlow-SemiBold;
  padding: 21px;
`;

const AnimatedShakeContainer = styled(Animated.View)`
  /* Add styles for shaking effect here */
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Col = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const SetPreferenceCard = ({ title, title2, content, navigation }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Wave background animation
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 2000, // 2 seconds
                easing: Easing.linear,
                useNativeDriver: false,
            })
        ).start();

        // Shake animation every 2 seconds
        const shakeInterval = setInterval(() => {
            Animated.sequence([
                Animated.timing(shakeAnimation, {
                    toValue: 10,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: -10,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: 0,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 2000);

        return () => clearInterval(shakeInterval);
    }, [animatedValue, shakeAnimation]);

    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 0.5, 0.75, 1],
        outputRange: ["#dab8cc", theme.colors.boneWhite, theme.colors.secondary, "#dab8cc"],
    });

    const shakeStyles = {
        transform: [{ translateX: shakeAnimation }],
    };

    return (
        <AnimatedContainer style={{ backgroundColor }}>
            <AnimatedShakeContainer style={shakeStyles}>
                <Row>
                    <Col style={{ flex: 1 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: 'transparent', padding: 5 }}
                            onPress={() => navigation.navigate('DigitalMatchMaker')}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: '800', fontSize: 20, color: theme.colors.primaryDark, }}>{title}</Text>
                                <Text style={{ fontWeight: '800', fontSize: 20, color: theme.colors.secondaryDark2 }}>{title2}</Text>
                            </View>
                            {content ? <Theme.Text>{content}</Theme.Text> : null}
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity
                            style={{ backgroundColor: 'transparent', padding: 5 }}
                            onPress={() => navigation.navigate('DigitalMatchMaker')}
                        >
                            <AntDesign name="right" size={18} color="#05626e" />
                        </TouchableOpacity>
                    </Col>
                </Row>
            </AnimatedShakeContainer>
        </AnimatedContainer>
    );
};

export default SetPreferenceCard;
