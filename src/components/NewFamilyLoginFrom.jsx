import React, { useState } from 'react';

import styled from 'styled-components/native';

import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity, StyleSheet } from 'react-native';
// import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';


const Container = styled.View`
    /* flex:1; */
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


const NewFamilyLoginFrom = (props) => {

    const [newActive, setNewActive] = useState(true);
    return (
        <Container>
            <InputContainer>
                <TextInputLabel>Name of the family member</TextInputLabel>
                <TextInput placeholder="Name" />
            </InputContainer>
            <InputContainer>
                <TextInputLabel>Relation with the primary user</TextInputLabel>
                <TextInput placeholder="Relation" />
            </InputContainer>
            <InputContainer>
                <TextInputLabel>Primary user’s Email ID</TextInputLabel>
                <TextInput keyboardType="email-address" placeholder="Enter Email ID" />
            </InputContainer>
            {/* <InputContainer>
                <TextInputLabel>Phone Number</TextInputLabel>
                <TextInput keyboardType="phone-pad" placeholder="+91" />
            </InputContainer>
            <InputContainer>
                <TextInputLabel>OTP</TextInputLabel>
                <TextInput keyboardType="number-pad" placeholder="Enter OTP" />
            </InputContainer> */}
        </Container>
    );
}

export default NewFamilyLoginFrom;