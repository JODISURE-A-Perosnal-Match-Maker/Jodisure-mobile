import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Theme from './Theme';

import styled from 'styled-components/native';
import { UserContext } from '../navigation';
import moment from 'moment';

const Col = styled.View`
    flex-direction:column;
    align-items:flex-start;
    justify-content:space-between;
`;

const Row = styled.View`
    flex-direction:row;

`;

const ManageButton = styled.View`
    width:93px;
    height:32px;
    /* background-color:'#fff'; */
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',

        padding: 24,
        backgroundColor: '#c3719b',
        borderRadius: 4,
    },
    img: {
        width: 90,
        height: 87,
        right: -15,
        top: 3,
        resizeMode: 'contain'
    },
    button: {
        height: 32,
        width: 93,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
    imgLeftTopCorner: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: -25,
        left: -25,
    }
});

const RechargeInfoCard = ({ navigation }) => {
    const cUser = useContext(UserContext);
    return (
        <TouchableOpacity onPress={() => navigation.navigate('WalleteMeetingRecharge', { reason: "Wallet Recharge" })} activeOpacity={0.7}>
        <View style={styles.container} >
            <Row >
                <Col style={{ flex: 1 }}>
                    <Image style={styles.imgLeftTopCorner} source={require('./../assets/images/left-top-corner.png')} />
                    <Theme.TextB style={{ marginBottom: 13 }} size="16px" color="#ffffff">Your Wallet</Theme.TextB>
                    <Col style={{ marginBottom: 13 }}>
                        <Theme.Text size="14px" color="#ffffff">Choose the plan that suits your need and discover meaningful connections with a Meeting Recharge or Monthly Subscription</Theme.Text>
                        {/* <Theme.TextB size="14px" color="#ffffff">{cUser?.profile?.walletBalence}pt.</Theme.TextB> */}
                    </Col>
                    {/* <Col style={{ marginBottom: 13 }}>
                        <Theme.Text size="14px" color="#ffffff">Last recharged</Theme.Text>
                        {
                            cUser?.profile?.lastRecharged
                                ? <Theme.TextB size="14px" color="#ffffff">{moment(cUser?.profile?.lastRecharged.toDate()).fromNow()}</Theme.TextB>
                                : <Theme.TextB size="14px" color="#ffffff">Please Recharge</Theme.TextB>
                        }
                    </Col> */}


                </Col>
                <Col>
                    <Row style={{ alignSelf: 'flex-end' }}>
                        <Image style={styles.img} source={require('./../assets/images/wallet.png')} />
                    </Row>
                    <Row>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('WalleteMeetingRecharge', { reason: "Wallet Recharge" })}>
                            <View style={styles.button}>
                                <Theme.TextB color="#a05b85">Recharge</Theme.TextB>
                            </View>
                        </TouchableOpacity> */}
                    </Row>
                </Col>
            </Row>
        </View>
        </TouchableOpacity>
    );

}

export default RechargeInfoCard;