import React from 'react';

import styled from 'styled-components/native';

import { View, Text, TouchableOpacity } from 'react-native';
import Theme from './Theme';
import { Image } from 'react-native';

const Container = styled.View`
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    background-color: #ffffff;
    padding-right: 40px;
    padding-left: 40px;
    padding-bottom: 40px;
`;

const Button = styled.TouchableOpacity`
    width:100%;
    background-color:#bd6f9e;
    padding:15px;
    border-radius:50px;
    margin-top:20px;
`
const ButtonText = styled.Text`
    text-align:center;
    color:white;
    font-weight:bold;
    font-size:14px;
`;
const SignupText = styled.Text`
    text-align:center;
    color:#a05b85;
    font-size:16px;
    font-weight:bold;
`;

const LoginChoice = (props) => {

    const goToLoginPage = () => {
        props.onPrimaryUserLoginPress();
        // props.navigation.replace('PrimaryLogin');
    }

    const onFriendsAndFamilyLoginPress = () => {
        props.onFriendsAndFamilyLoginPress();
    }
 
    

    return <React.Fragment>
        
        <Container>
            <Image  source={require('../assets/images/Logo.png')}></Image>
            <Theme.TextB color="#969696" size="14px">Continue using the App</Theme.TextB>
            <Button onPress={goToLoginPage}>
                <Theme.TextB color="#ffffff" size="14px" style={{ textAlign: 'center' }}>Primary User Login</Theme.TextB>
            </Button>
            <Button onPress={onFriendsAndFamilyLoginPress}>
                <Theme.TextB color="#ffffff" size="14px" style={{ textAlign: 'center' }}>Family & Friends Login</Theme.TextB>
            </Button>
            <Theme.TextB color="#998390" size="14px" style={{marginTop:60}}>New to this App?</Theme.TextB>
            <TouchableOpacity style={{ marginTop: 12 }}>
                <Theme.TextB color="#a05b85" size="20px">Sign Up</Theme.TextB>
            </TouchableOpacity>
        </Container>
    </React.Fragment>
};

export default LoginChoice;