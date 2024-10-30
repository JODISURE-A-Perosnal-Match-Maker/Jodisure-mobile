import React from 'react';
import styled from 'styled-components/native';

const primaryCol = 'black';
const secondaryCol = '#2C251B';
const lightGray = '#696969';

const Text = styled.Text`
    font-family:Barlow-Regular;
    font-size:${props => (props.size) ? props.size : '16px'};
    color:${props => (props.color) ? props.color : primaryCol};
`;
const TextB = styled.Text`
    font-family:Barlow-SemiBold;
    font-size:${props => (props.size) ? props.size : '16px'};
    color:${props => (props.color) ? props.color : primaryCol};
`;

const RoundButton = styled.Text`
    font-family:Barlow-SemiBold;
    font-size:${props => (props.size) ? props.size : '14px'};
    color:${props => (props.color) ? props.color : '#ffffff'};
    background-color:${props => (props.bgcolor) ? props.bgcolor : secondaryCol};
    padding:20px;
    width:100%;
    text-align:center;
    border-radius:50px;
`;

const CustIcon = styled.Image`
    height:${props => (props.height) ? props.height : '16px'};
    width:${props => (props.width) ? props.width : '16px'};
    resize-mode: contain;
`;

const IconCal = (params) => {
    return (
        <CustIcon {...params} source={require('./../assets/images/cal.png')} />
    );
};
const IconScale = (params) => {
    return (
        <CustIcon {...params} source={require('./../assets/images/scale.png')} />
    );
};
const IconChat = (params) => {
    return (
        <CustIcon {...params} source={require('./../assets/images/chat.png')} />
    );
};
const IconLocation = (params) => {
    return (
        <CustIcon {...params} source={require('./../assets/images/location.png')} />
    );
};

export default {
    Text, TextB, IconCal, IconScale, IconChat, IconLocation, RoundButton
}