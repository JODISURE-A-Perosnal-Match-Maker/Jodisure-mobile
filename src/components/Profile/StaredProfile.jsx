import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Alert, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { showMessage, hideMessage } from "react-native-flash-message";
import Profile from '../../components/Profile';
import RoundDarkButton from '../../components/RoundDarkButton';
import MutualContactsCard from '../../components/Profile/MutualContactsCard';
import { blockUser, isPUserPremium, starUser, unstarUser } from '../../services/UserService';
import { sendFriendRequest } from '../../services/RequestService';

const StaredProfile = ({ uid, refresh }) => {
    const [userImage, setUserImage] = useState("https://picsum.photos/200/300");
    const [isAbleToViewProfile, setIsAbleToViewProfile] = useState(false);

    useEffect(async () => {
        if (!uid) return;
        const result = await isPUserPremium();
        console.log("--->", result);
        setIsAbleToViewProfile(result);
        const subscriber = firestore().collection('users').doc(uid).collection('images').limit(1).onSnapshot(async querysnapshot => {
            // console.log('qs',querysnapshot);
            querysnapshot.forEach(doc => {
                if (doc.exists) {
                    setUserImage(doc.data().url)
                }
            })
        })
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [uid]);

    const doUnStarUser = () => {
        Alert.alert(
            "Are you sure?",
            "This profile will be removed your starred profile list.",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Ok",
                    onPress: () => {
                        unstarUser(uid).then(res => {
                            refresh();
                        })
                    },
                    style: 'default'
                }
            ]
        )
    }

    const sendRequest = () => {
        sendFriendRequest(uid).then(res => {
            showMessage({
                message: "Sent!",
                description: "A connection request is sent to this user",
                type: "none",
            });
        }).catch(err => {
            Alert.alert("Send request failed!!", err.message);
        })
    }

    return (

        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View style={styles.crossButton}>
                    <TouchableOpacity onPress={doUnStarUser}>
                        <AntDesign name="star" size={24} color="#a05b85" />
                    </TouchableOpacity>
                </View>
                {userImage ? (
                    <Image
                        style={styles.image}
                        blurRadius={40}
                        source={{ uri: userImage }}
                    />
                ) : null}
            </View>
            <View style={styles.profileDetailsContainer}>
                <Profile uid={uid}>
                    <View style={{ padding: 16, marginBottom: 40 }}>
                        <MutualContactsCard uid={uid} isNameNotShow={!isAbleToViewProfile} />
                    </View>
                </Profile>
            </View>
            <View style={styles.buttonContainer}>
                <RoundDarkButton onPress={sendRequest} name="REQUEST TO VIEW PROFILE" />
            </View>
        </View>
    )
}

export default StaredProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    paddedContainer: {
        padding: 16
    },
    imageContainer: {

    },
    image: {
        height: 400,
        width: '100%'
    },
    crossButton: {
        position: 'absolute',
        backgroundColor: '#d8d8d8',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        top: 1,
        right: 1,
        margin: 12,
        padding: 4,
        zIndex: 999
    },
    profileDetailsContainer: {
        marginTop:40,
        marginHorizontal: 16,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        top: -40,
        backgroundColor: '#ffffff',
        marginBottom: -50
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 26,
    }
});
