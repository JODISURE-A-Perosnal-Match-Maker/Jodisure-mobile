import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Profile from '../../components/Profile';


const ViewProfileScreen = () => {
    const route = useRoute();
    return (
        <ScrollView>
            <Profile uid={route.params?.id} showProfilePhotoGrid={true} showFullProfile={true} overRideHazy={true}/>
        </ScrollView>
    )
}

export default ViewProfileScreen

const styles = StyleSheet.create({})
