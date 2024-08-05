import { StyleSheet, Text, View, Image, Share } from 'react-native'
import React, { useContext } from 'react'
import Theme from './Theme'
import RoundLightButton from './RoundLightButton'
import { UserContext } from '../navigation'

const InviteFnFCard = () => {
    const userData = useContext(UserContext);
    const onShare = async () => {
        try {
            const link = `https://play.google.com/store/apps/details?id=com.jodisure.app&invitedBy=${userData.profile.UUID}`;
            const result = await Share.share({
                message:
`Hi everyone,

I've recently joined JodiSure, a platform dedicated to finding compatible matches. 
Knowing your wonderful judgment and the strong connections we share, it would be fantastic if you could consider joining as well.
My profile ID is *${userData.profile.UUID}*

${link}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                Alert.alert('Failed', 'You did not shared the invite link');
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <View style={styles.addContainer}>
            <Theme.TextB color="#494a51" size="16px">Invite your more friends and family members</Theme.TextB>
            <Theme.Text color="#494a51" size="14px">Get help to take right decision.</Theme.Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <RoundLightButton onPress={onShare} name="Invite" titleStyle={{ paddingHorizontal: 31 }} />
                </View>
                <View>
                    <Image source={require('../assets/images/group_4_copy_3.png')} style={{ width: 173, height: 144, resizeMode: 'contain' }} />
                </View>
            </View>
        </View>
    )
}

export default InviteFnFCard

const styles = StyleSheet.create({
    addContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#b0ced9',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
})