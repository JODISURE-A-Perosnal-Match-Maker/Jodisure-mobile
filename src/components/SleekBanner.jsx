import React from 'react';
import { EvilIcons } from '@expo/vector-icons';
import Theme from './Theme';

import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction:row;
    justify-content:center;
    align-items:center;
    background-color:#76B0C6;
`;

const LeftContent = styled.View`
    background-color:#76B0C6;
    width:50px;
    height:50px;
    margin-left:5px;
    margin-right:29px;
`;
const RightContent = styled.View`
   background-color:#7fc4d7;
   flex:1;
   padding:11px;
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

const SleekBanner = ({image,content}) => {
    return (
        <Container>
            <LeftContent>
                <Image source={image} ></Image>
            </LeftContent>
            <RightContent>
                <Theme.Text size="14px" color="#000000">{content}</Theme.Text>
            </RightContent>
        </Container>
    );
}

export default SleekBanner;