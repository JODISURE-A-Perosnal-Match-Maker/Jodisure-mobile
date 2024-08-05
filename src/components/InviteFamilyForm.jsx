import React, { useState } from 'react';

import styled from 'styled-components/native';

import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity, StyleSheet } from 'react-native';
// import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';


const Container = styled.View`
    flex:1;
    justify-content:flex-start;
    align-items:center;
    background-color:transparent;
`;

const TextInput = styled.TextInput`
    height:42px;
    width:100%;
    background-color:#fff;
    padding:4px;
    border-radius:4px;
    margin-top:8px;
`;

const TextInputLabel = styled.Text`
    /* font-weight:bold; */
    font-family:Barlow-SemiBold;
`;

const InputContainer = styled.View`
    flex-direction:column;
    width:100%;
    margin-top:24px;
`;

const styles = StyleSheet.create({
    tab: {
        flex: 1,
    }
});


const InviteFamilyForm = (props) => {

    const [newActive, setNewActive] = useState(true);
    return (
        <Container>
            <InputContainer>
                <TextInputLabel>Email ID</TextInputLabel>
                <TextInput placeholder="Enter Email ID" />
            </InputContainer>
            <InputContainer>
                <TextInputLabel>Email ID</TextInputLabel>
                <TextInput placeholder="Enter Email ID" />
            </InputContainer>
            <InputContainer>
                <TextInputLabel>Email ID</TextInputLabel>
                <TextInput placeholder="Enter Email ID" />
            </InputContainer>
            <InputContainer>
                <TextInputLabel>Email ID</TextInputLabel>
                <TextInput placeholder="Enter Email ID" />
            </InputContainer>
        </Container>
    );
}

export default InviteFamilyForm;