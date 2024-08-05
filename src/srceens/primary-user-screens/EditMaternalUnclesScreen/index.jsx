import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useRoute, useIsFocused } from '@react-navigation/native';

import { getMyProfile } from '../../../services/UserService';
import FullScreenLoader from '../../../theme/FullScreenLoader';
import EditMaternalUncleForm from './EditMaternalUncleForm';

const EditMaternalUnclesScreen = () => {

    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
            setLoading(true);
            getMyProfile().then(profile => {
                setProfile(profile.data());
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [isFocused]);

    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.container}
        >
            {loading ? <FullScreenLoader />:null}
            {(!loading && profile) && <EditMaternalUncleForm initialValue={profile.m_uncleInfo} />}
        </ScrollView>

    )
}

export default EditMaternalUnclesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
