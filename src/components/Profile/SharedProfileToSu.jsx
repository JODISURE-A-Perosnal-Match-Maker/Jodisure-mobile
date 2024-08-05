import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import Theme from '../../components/Theme'
import Profile from '../../components/Profile';
import RoundDarkButton from '../../components/RoundDarkButton';
import RoundLightButton from "../../components/RoundLightButton";
import MutualContactsCard from '../../components/Profile/MutualContactsCard';
import { useNavigation } from '@react-navigation/native';
import { getMyProfile } from '../../services/UserService';


const SharedProfileToSu = ({ uid }) => {
    const navigation = useNavigation();
    const[isAbleToViewProfile, setIsAbleToViewProfile]=useState()
    useEffect(async () => {
        if (!uid) return;
       
            const result = await isPUserPremium();
            // console.log("--->", result);
            setIsAbleToViewProfile(result);
            
        
        // Stop listening for updates when no longer required
    }, [uid]);    
    return (
        <View style={{ width: '100%' }}>
            <View style={{ marginBottom: 10 }} >
                <Profile uid={uid} showProfilePhotoGrid={true} showAvatar={false} topMargin={0}>
                    <View style={{ padding: 16, marginBottom: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <MutualContactsCard uid={uid} isNameNotShow={!isAbleToViewProfile}/>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('ViewProfile', { id: uid });
                        }}>
                            <Theme.TextB color="#a05b85">Tap to view full profile</Theme.TextB>
                        </TouchableOpacity>
                    </View>
                </Profile>
            </View>

        </View>
    )
}

export default SharedProfileToSu

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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 26,
    }
})
