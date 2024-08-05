import React, { useState } from 'react';
import { View, StyleSheet, Image } from "react-native";
import CircleBadge from './CircleBadge';
import Avatar from './Avatar';
import Theme from './Theme';

import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';


const Row = styled.View`
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
`;
const Col = styled.View`
    flex-direction:column;
    /* align-items:center; */
    justify-content:center;
`;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9fcdd6',
        borderRadius: 4,
    },
    innerContent: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    img: {
        marginLeft: 35,
        width: 90,
        height: 90,
        resizeMode: 'contain'
    },
    line: {
        height: 1,
        width: '90%',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
    }
})

const AwaitingResponseCard = ({ awaitingReceivedRequests, awaitingSentRequests }) => {
    const navigation = useNavigation();
    return (

        <View style={styles.container}>
            <Row>
                <Col style={{ width: 80, alignItems: 'center', marginRight: 14 }}>
                    <Image style={styles.img} source={require('./../assets/images/awaiting_response.png')}></Image>
                </Col>
                <Col style={{ flex: 1 }}>
                    <View style={styles.innerContent}>
                        <Theme.TextB onPress={() => navigation.navigate('Requests', { activeTab: 'received', activeButton: 'pending' })} count={awaitingReceivedRequests.length} style={{ flexShrink: 1 }} color="#ffffff">Awaiting received requests</Theme.TextB>
                        <CircleBadge onPress={() => navigation.navigate('Requests', { activeTab: 'received', activeButton: 'pending' })} count={awaitingReceivedRequests.length} txtColor="#fff" bgColor="#84b6c0"></CircleBadge>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.innerContent}>
                        <Theme.TextB onPress={() => navigation.navigate('Requests', { activeTab: 'sent', activeButton: 'pending' })} style={{ flexShrink: 1 }} color="#ffffff">Awaiting sent requests</Theme.TextB>
                        <CircleBadge onPress={() => navigation.navigate('Requests', { activeTab: 'sent', activeButton: 'pending' })} count={awaitingSentRequests.length} txtColor="#fff" bgColor="#84b6c0"></CircleBadge>
                    </View>

                </Col>
            </Row>
        </View>

    );

}

export default AwaitingResponseCard;