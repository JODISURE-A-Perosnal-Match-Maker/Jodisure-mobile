import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import Theme from '../../components/Theme'
import Profile from '../../components/Profile';
import RoundDarkButton from '../../components/RoundDarkButton';
import RoundLightButton from "../../components/RoundLightButton";
import MutualContactsCard from '../../components/Profile/MutualContactsCard';
import { useNavigation } from '@react-navigation/native';
import { getMyProfile, isPUserPremium } from '../../services/UserService';
import { Button, ButtonGroup } from 'react-native-elements';
import { RoundedButton } from '../../theme';
import { disconnectProfile } from '../../services/RequestService';


const ConnectedProfile = ({ uid, image }) => {
    const navigation = useNavigation();
    const [user, setUser] = useState();
    const [showFullProfile, setShowFullProfile] = useState(false);
    const [isAbleToViewProfile, setIsAbleToViewProfile] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await getMyProfile(uid);
                setUser(userProfile.data());

                const result = await isPUserPremium();
                console.log("--->", result);
                setIsAbleToViewProfile(result);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);
    const handleDisconnect = () => {
        console.log("UID---->", uid)
        Alert.alert(
            'Are you sure?',
            'Are you sure you want to disconnect from this user?',
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Ok",
                    onPress: async () => {
                       await  disconnectProfile(uid)
                        showMessage({
                            message: "Success!",
                            description: "User is disconnected now!",
                            type: "success",
                        });
                    },
                    style: 'default'
                }
            ]
        );
    };
    return (
        <View style={{ width: '100%' }}>
            <View style={{ marginBottom: 10 }} >

                <Profile uid={uid} showProfilePhotoGrid={true} showFullProfile={showFullProfile} showAvatar={false} topMargin={10} overRideHazy={true}>
                    <View style={{ padding: 16, marginBottom: 40 }}>
                        <MutualContactsCard uid={uid} isNameNotShow={!isAbleToViewProfile} isUserConnected={true}/>
                    </View>
                    <View style={{ padding: 0, marginBottom: 40, justifyContent: 'center', alignItems: 'center' }}>

                        <TouchableOpacity onPress={() => navigation.navigate('ViewProfile', { id: uid })}>
                            <Theme.TextB color="#a05b85">Tap to view full profile</Theme.TextB>
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                            <Button
                                type='outline'
                                buttonStyle={styles.buttonStyle}
                                title={'Disconnect'}
                                onPress={handleDisconnect}
                            />
                            <Button
                                buttonStyle={styles.buttonStyle}
                                title={'Share Profile'}
                                onPress={() => { navigation.navigate('ShareProfile', { uid: uid }) }}
                            />
                            <Button
                                buttonStyle={styles.buttonStyle}
                                title={'Chat'}
                                onPress={() => {
                                    navigation.navigate('ChatScreen', { toUid: uid, toUser: user, name: user?.first_name + " " + user?.last_name })
                                }}
                            />
                            {/* <RoundLightButton onPress={handleDisconnect} name="Disconnect" />
                            <RoundDarkButton onPress={()=>{navigation.navigate('ShareProfile',{uid:uid})}}  name="Share Profile"/>
                            <RoundDarkButton onPress={() => {
                                navigation.navigate('ChatScreen', { toUid: uid, toUser: user, name: user?.first_name + " " + user?.last_name })
                            }} name="Chat" /> */}
                        </View>
                        <TouchableOpacity>

                            <Theme.TextB onPress={() => {
                                navigation.navigate(
                                    'ContactUs'
                                )
                            }} color="#a05b85">Report abuse</Theme.TextB>
                        </TouchableOpacity>
                    </View>
                </Profile>
            </View>

        </View>
    )
}

export default ConnectedProfile

const styles = StyleSheet.create({

    paddedContainer: {
        padding: 16
    },
    imageContainer: {

    },
    image: {
        height: 174,
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
        backgroundColor: '#ffffff',
        marginBottom: -50
    },
    buttonContainer: {
        width: '100%',
        marginTop: 26,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 26,
    },
    buttonStyle: {
        borderWidth: 2,
        borderRadius: 60,
        minWidth: 100,
    }
})
