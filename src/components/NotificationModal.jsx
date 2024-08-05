import { StyleSheet, Text, View, Modal, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import Theme from './Theme';
import theme from '../theme/theme';
import { Image } from 'react-native-elements/dist/image/Image';

const NotificationModal = ({ visible, setVisible, notification }) => {
    useEffect(()=>{
        console.log(notification);
    },[notification])
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image source={require('../assets/images/Logo.png')} style={styles.item} PlaceholderContent={<ActivityIndicator/>} />
                    <Theme.TextB>{notification?.title}</Theme.TextB>
                    <Theme.Text style={styles.modalText}>{notification?.body}</Theme.Text>
                    {/* <Text>{JSON.stringify(notification,null,2)}</Text> */}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setVisible(!visible)}
                    >
                        <Text style={styles.textStyle}>OK</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default NotificationModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: theme.colors.primary,
    },
    buttonClose: {
        backgroundColor: theme.colors.primary,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color:'grey'
    },
    item: {
        width: 100,
        height:40,
        resizeMode:'contain',
        marginBottom:20
    }
})