import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native'
import { useRoute, useIsFocused } from '@react-navigation/native';

import { getMyProfile, getReligions } from '../../../services/UserService';
import FullScreenLoader from '../../../theme/FullScreenLoader';
import EditProfileForm from './EditProfileForm';


const EditProfileScreen = () => {

    const [profile, setProfile] = useState();
    const [religions, setReligions]=useState([]);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
            setLoading(true);
            getReligions()
            .then(rs=>{
                setReligions(rs);
                return rs;
            })
            .then(()=>{
                return getMyProfile();
            })
            .then(profile => {
                setProfile(profile.data());
                setLoading(false);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [isFocused]);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                flexGrow: 1,
                marginTop:StatusBar.currentHeight+10,
            }}
        >
            {loading && <FullScreenLoader />}
            {(!loading && profile)&&<EditProfileForm initialValue={profile} religions={religions} />}
        </ScrollView>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    }
})
