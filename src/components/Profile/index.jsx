import React, { memo, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ProfilePhotoGrid from './ProfilePhotoGrid';
import Avatar from './Avatar';
import TopDetails from './TopDetails';
import ProfileDetails from './ProfileDetails';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import FullProfileDetails from './FullProfileDetails';
import { Button } from 'react-native-elements';
import { getReligions } from '../../services/UserService';
const Profile = 
memo(({ uid, showProfilePhotoGrid, showAvatar, children, topMargin, showFullProfile, isFirstNameVisible, overRideHazy }) => {
    if (!showFullProfile) {
        showFullProfile = false;
    }
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);
    const [pics, setPics] = useState();
    // const privacy= await checkOtherUserFullPrivacy(uid)
    // const [isFullyPrivate,setFullyPrivate]=useState(false)

    const [fullProfileView, setFullProfileView] = useState(showFullProfile);

    useMemo(() => {
        setFullProfileView(showFullProfile);
    }, [showFullProfile]);

    useEffect(() => {
        if (!uid) return;
        setLoading(true);
        const subscriber = firestore().collection('users').doc(uid).onSnapshot(doc => {
            if (doc.exists && doc.data()) {
                setProfile({ id: doc.id, ...doc.data() });
            } else {
                setProfile(null);
            }
            setLoading(false);
        })

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [uid]);

    useEffect(() => {
        if (!uid) return;
        const subscriber = firestore().collection('users').doc(uid).collection('images').onSnapshot(querySnapshot => {
            const images = [];
            querySnapshot.forEach(documentSnapshot => {
                images.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
            });
            setPics(images);
        })
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [uid]);

    let Photos;
    let AvatarEle;
    if (showProfilePhotoGrid) {
        const images = [];
        pics && pics.map((pic) => {
            images.push(pic.url);
        })
        if (images.length) {
            Photos = (
                <View style={{ height: 500, }}>
                    <ProfilePhotoGrid images={images} postedBy={profile?.profile_created_by} />
                </View>
            );
        }
    }
    if (showAvatar) {
        AvatarEle = (
            <View style={styles.div}>
                <Avatar imageSource={require('../../assets/images/g-avatar1.jpg')} />
            </View>
        );
    }

    // console.log('details',profile);

    return (
        <View style={styles.container}>
            {Photos}
            {AvatarEle}
            <View style={styles.div}>
                {profile ? <TopDetails profile={profile} isFirstNameVisible={isFirstNameVisible} overRideHazy={overRideHazy} /> : null}
            </View>
            <View style={{ marginVertical: 16, marginHorizontal: 16 }}>
                {profile ? <ProfileDetails profile={profile} overRideHazy={overRideHazy} /> : null}
            </View>
            <View style={{ marginHorizontal: 16 }}>
                {(profile && fullProfileView) ? <FullProfileDetails profile={profile} /> : null}
            </View>
            <View>
                {children}
            </View>
        </View>
    )
})

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    div: {
        marginVertical: 4,
        flexDirection: 'column',
        width: '100%',
    }
})
