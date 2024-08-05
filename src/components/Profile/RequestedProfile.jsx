import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Alert, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { showMessage, hideMessage } from "react-native-flash-message";
import Profile from '../../components/Profile';
import RoundDarkButton from '../../components/RoundDarkButton';
import MutualContactsCard from '../../components/Profile/MutualContactsCard';
import { blockUser, checkOtherUserDPVisible, checkOtherUserFullPrivacy, isPUserPremium } from '../../services/UserService';
import { AcceptFriendRequest, CloseFriendRequest, RejectFriendRequest, sendFriendRequest, sendFriendRequestAgain } from '../../services/RequestService';
import RoundLightButton from '../RoundLightButton';
import { useNavigation } from '@react-navigation/native';
import theme from '../../theme/theme';

const RequestedProfile = ({ uid, activeTab, activeButton, refresh }) => {
    const [userImage, setUserImage] = useState("https://picsum.photos/200/300");
    const [isFirstNameVisible, setIsFirstNameVisible] = useState(false)
    const [isOtherDPVisible, setIsOtherDPVisible] = useState(false)
    const [isAbleToViewProfile, setIsAbleToViewProfile] = useState(false);

    const navigation = useNavigation();
    useEffect(() => {
        if (!uid) return;
        const subscriber = firestore().collection('users').doc(uid).collection('images').limit(1).onSnapshot(async querysnapshot => {
            // console.log('qs',querysnapshot);
            const visibility = await checkOtherUserDPVisible(uid)
            const privacy = await checkOtherUserFullPrivacy(uid)
            console.log("checksssssss--->", visibility);
            setIsOtherDPVisible(visibility)
            const result = await isPUserPremium();
            // console.log("--->", result);
            setIsAbleToViewProfile(result);
            querysnapshot.forEach(doc => {
                if (doc.exists) {
                    setUserImage(doc.data().url)
                }
            })
        })
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [uid]);

    const doBlockUser = () => {
        Alert.alert(
            "Are you sure?",
            "You are about to block this profile.",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Ok",
                    onPress: () => {
                        blockUser(uid).then(res => {
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

    const sendRequestAgain = () => {
        sendFriendRequestAgain(uid).then(res => {
            showMessage({
                message: "Sent!",
                description: "A connection request is sent to this user",
                type: "none",
            });
        }).catch(err => {
            Alert.alert("Send request failed!!", err.message);
            console.error(err)
        })
    }

    const closeRequest = () => {
        CloseFriendRequest(uid).then(res => {
            showMessage({
                message: "Request Closed!",
                description: "Connection request closed",
                type: "none",
            });
            refresh();
        }).catch(err => {
            Alert.alert("Send request failed!!", err.message);
        })
    }

    const acceptRequest = () => {
        AcceptFriendRequest(uid).then(res => {
            showMessage({
                message: "Request Accepted!",
                description: "Connection request accepted",
                type: "none",
            });
            refresh();
        }).catch(err => {
            Alert.alert("Accept request failed!!", err.message);
        });
    }
    const rejectRequest = () => {
        RejectFriendRequest(uid).then(res => {
            showMessage({
                message: "Request Rejected!",
                description: "Connection request rejected",
                type: "none",
            });
            refresh();
        }).catch(err => {
            Alert.alert("Reject request failed!!", err.message);
        });
    }

    const viewProfile = () => {
        navigation.navigate('ViewProfile', { id: uid })
    }



    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {/* <View style={styles.crossButton}>
                    <TouchableOpacity onPress={doBlockUser}>
                        <AntDesign name="close" size={14} color="#a05b85" />
                    </TouchableOpacity>
                </View> */}
                {userImage ? (
                    <Image
                        style={styles.image}
                        blurRadius={(activeButton === 'accepted') || isOtherDPVisible ? 0 : 40}
                        source={{ uri: userImage }}
                    />
                ) : null}
            </View>
            <View style={styles.profileDetailsContainer}>
                <Profile uid={uid} isFirstNameVisible={isFirstNameVisible} overRideHazy={activeButton === 'accepted'} >
                    <View style={{ padding: 16, marginBottom: 40 }}>
                        <MutualContactsCard uid={uid} isNameNotShow={!isAbleToViewProfile} />
                    </View>
                </Profile>
            </View>
            <View style={styles.buttonContainer}>
                {(activeTab == "sent" && activeButton === "rejected") && <RoundDarkButton onPress={sendRequestAgain} name="SEND REQUEST AGAIN" style={styles.shadow} />}
                {(activeTab == "sent" && activeButton === "accepted") && <RoundDarkButton onPress={viewProfile} name="VIEW FULL PROFILE" style={styles.shadow} />}
                {(activeTab == "sent" && activeButton === "pending") && <RoundDarkButton onPress={closeRequest} name="CLOSE REQUEST" style={styles.shadow} />}
                {(activeTab == "received" && activeButton === "rejected") && <RoundDarkButton onPress={sendRequestAgain} name="SEND REQUEST AGAIN" style={styles.shadow} />}
                {(activeTab == "received" && activeButton === "accepted") && <RoundDarkButton onPress={viewProfile} name="VIEW FULL PROFILE" style={styles.shadow} />}
                {(activeTab == "received" && activeButton === "pending") && <RoundLightButton onPress={rejectRequest} name="DENY" style={styles.shadow} />}
                {(activeTab == "received" && activeButton === "pending") && <RoundDarkButton onPress={acceptRequest} name="ACCEPT" style={styles.shadow} />}
            </View>
        </View>
    )
}

export default RequestedProfile

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
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Shadow properties for Android
        elevation: 5,
    },
    image: {
        height: 500,
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
        marginHorizontal: 16,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        top: -40,
        backgroundColor: theme.colors.white,
        marginBottom: -50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Shadow properties for Android
        elevation: 5,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 26,
    }
});
