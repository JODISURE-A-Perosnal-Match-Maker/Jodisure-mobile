import React from 'react';
import { EvilIcons } from '@expo/vector-icons';

import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
    flex-direction:row;
    padding-right:10px;
`;

const TabBadge = styled.View`
    position: absolute;
    top: -5px;
    right: 5px;
    background-color: #BD6098;
    border-radius: 16px;
    padding-right: 6px;
    padding-left:6px;
    padding-top:2px;
    width:20px;
    height:20px;
    z-index: 2;
`;

const TabBadgeText = styled.Text`
    color:white;
    font-size:11px;
    font-weight:600;
`;

const NotificationBell = ({ count, navigation }) => {

    return (
        <TouchableOpacity onPress={()=>navigation.navigate('RootDrawer',{screen:'Notifications'})}>
            <Container>
                <EvilIcons name="bell" size={30} color="#00333a" />
                {(count) ? <TabBadge>
                    <TabBadgeText>{count}</TabBadgeText>
                </TabBadge> : null}
            </Container>
        </TouchableOpacity>
    );

}

export default NotificationBell;