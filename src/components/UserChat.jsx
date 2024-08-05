import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import Theme from './Theme';
import Avatar from './Avatar';


import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    width:100%;
`;

const LeftContent = styled.View`
    flex-grow:0;
`;
const RightContent = styled.View`
    flex-direction:row;
    width:120px;
    justify-content:flex-end;
    align-items:flex-end;
`;
const CenterContent = styled.View`
    flex-direction:column;
    flex:1;
`;

const Text = styled.Text`
    color:#000;
    font-size:14px;
    padding:4px;
`;

const Image = styled.Image`
    top:-5px;
    left:-2px;
    width:80px;
    height:120px;
    resize-mode: contain;
    margin-right:12px;
`;

const UserChat = ({ image, name, lastMessage, time, badgeType }) => {
    let TextBadge;
    if(badgeType==='recent'){
        TextBadge=<Theme.TextB size="11px" color="#2A7B85" style={styles.titleText}>Recently connected</Theme.TextB>;
    }
    return (
        <Container style={styles.container}>
            {TextBadge}
            <LeftContent>
                <Avatar style={{ width: 42, height: 42 }} image={image} ></Avatar>
            </LeftContent>
            <CenterContent>
                <Theme.TextB size="16px" color="#a05b85">{name}</Theme.TextB>
                <Theme.Text size="14px" color="#000000">{lastMessage}</Theme.Text>
            </CenterContent>
            <RightContent>
                <Theme.Text style={{flexShrink: 1}} size="14px" color="#969696">{time}</Theme.Text>
            </RightContent>
        </Container>
    );
}

const styles = StyleSheet.create({
    container:{
        borderBottomWidth:1, 
        paddingVertical:20, 
        borderBottomColor:'#e2e2e2'
    },
    titleText: {
        position:'absolute',
        top:0,
        backgroundColor:'#E1F5F7'
    }
});

export default UserChat;