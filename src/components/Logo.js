import React from 'react';

import styled from 'styled-components/native';

import { View,Text } from 'react-native';

const Container = styled.View`
    /* flex:1; */
    flex-direction:row;
    align-items:center;
    justify-content:center;
    height:200px;
    width:100%;
    background-color:white;
`;

const Logo = styled.Text`
    color:#00333a;
    font-size:44px;
    font-family:rofi-taste;
`;

const WelcomeScreen = ()=>{
    return <React.Fragment>
        <Container>
            <Logo>JODISURE</Logo>
        </Container>
    </React.Fragment>
};

export default WelcomeScreen;