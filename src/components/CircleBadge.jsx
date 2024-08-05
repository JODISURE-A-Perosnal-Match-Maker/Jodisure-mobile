import React from 'react';
import { View, TouchableOpacity } from "react-native";
import Theme from './Theme';

import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction:row;
    font-family:Barlow-SemiBold;
    background-color:${props => (props.color) ? props.color : '#579cad'};
    height:40px;
    width:40px;
    border-radius:40px;
    justify-content:center;
    align-items:center;
`;



const CircleBadge = ({ count, bgColor, txtColor, style, onPress }) => {
    return (
        <View style={{...style}}>
        <TouchableOpacity onPress={onPress}>
            <Container color={bgColor}>
                <Theme.TextB color={txtColor} style={{margin:0,padding:0}}>{count}</Theme.TextB>
            </Container>
        </TouchableOpacity>
        </View>
    );

}

export default CircleBadge;