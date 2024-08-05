import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import CircleBadge from './CircleBadge';
import Avatar from './Avatar';
import Theme from './Theme';

import styled from 'styled-components/native';
import { getUserPhoto } from '../services/UserService';
import { useNavigation } from '@react-navigation/native';


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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#decbd5',
        borderRadius: 4,
    },
    linearGradient: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 62,
        height: 77,
        top: 24,
        marginRight: 20,
        resizeMode: 'contain'
    }
})

const ConnectionsCard = ({ title, content, onPress, uids }) => {
    const [images, setImages] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        async function getImages() {
            if (uids && uids.length) {
                uids.splice(3);
                const lImages = [];
                for (let i = 0; i < uids.length; i++) {
                    lImages[i] = await getUserPhoto(uids[i]);
                }
                setImages(lImages);
            }
        }
        getImages();
    }, [])

    return (
        <View style={styles.container}>
            <Row>
                <Col style={{ flex: 1, padding: 15, paddingTop: 20 }}>
                    <TouchableWithoutFeedback onPress={onPress}>
                        <Theme.TextB onPress={() => navigation.navigate('Connections')} color="#ac7a94">{title}</Theme.TextB>
                    </TouchableWithoutFeedback>

                    <Row style={{ marginTop: 9 }}>
                        {images.map(i => <Avatar key={i} image={{ uri: i }} style={{ marginLeft: -10 }} />)}
                        {/* <Avatar image={require('./../assets/images/avatar1.jpeg')} />
                        <Avatar style={{ marginLeft: -10 }} image={require('./../assets/images/avatar2.jpeg')} />
                        <Avatar style={{ marginLeft: -10 }} image={require('./../assets/images/avatar3.jpeg')} /> */}
                    </Row>
                </Col>
                <Col style={{ marginRight: 20 }}>
                    <TouchableWithoutFeedback onPress={onPress}>
                        <CircleBadge onPress={() => navigation.navigate('Connections')} count={content} txtColor="#fff" bgColor="#bd6f9e"></CircleBadge>
                    </TouchableWithoutFeedback>
                </Col>
            </Row>
        </View>

    );

}

export default ConnectionsCard;