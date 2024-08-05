import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from "react-native";
import CircleBadge from './CircleBadge';
import Theme from './Theme';
import { TouchableOpacity } from "react-native";

import styled from 'styled-components/native';
const Container = styled.View`
    flex-direction:column;
    font-family:Barlow-SemiBold;
    padding:21px;
    /* padding-top:30px;
    padding-bottom:45px; */
    background-color:#579cad;
`;
const Row = styled.View`
  flex-direction:row;
  align-items:center;
  /* justify-content:flex-end; */
`;
const Col = styled.View`
    flex-direction:column;
    /* align-items:center; */
    justify-content:center;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    backgroundColor: '#4596ac',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  img: {
    width: 62,
    height: 77,
    top: 24,
    marginRight: 20,
    resizeMode: 'contain'
  }
})

const ConnectedNetworkCard = ({ title, content, onPress }) => {

  return (
    <View style={styles.linearGradient}>
      <Row>
        <Col>
          <TouchableOpacity style={{ backgroundColor: 'transparent', padding: 5 }} onPress={onPress}>
            <Image style={styles.img} source={require('./../assets/images/network_people.png')}></Image>
          </TouchableOpacity>

        </Col>
        <Col style={{ flex: 1, padding: 15 }}>
          <TouchableOpacity style={{ backgroundColor: 'transparent', padding: 5 }} onPress={onPress}>
            <Theme.TextB color="#fff">{title}</Theme.TextB>
          </TouchableOpacity>
        </Col>
        <Col style={{ marginRight: 10 }}>
          <CircleBadge onPress={onPress} count={content} txtColor="#fff"></CircleBadge>
        </Col>
      </Row>
    </View>
  )

}

export default ConnectedNetworkCard;