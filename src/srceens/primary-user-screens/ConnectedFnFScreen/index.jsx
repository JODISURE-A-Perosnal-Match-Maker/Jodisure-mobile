import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Image, FlatList, Share, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Theme from '../../../components/Theme'
import { RoundedButton } from '../../../theme'
import theme from '../../../theme/theme'
import FbConnectedUserCard from '../../../components/FbConnectedUserCard';
import FnfLoginRequestCard from '../../../components/PuComponents/FnfLoginRequestCard';
import RoundLightButton from '../../../components/RoundLightButton';
import { UserContext } from '../../../navigation';
import InviteFnFCard from '../../../components/InviteFnFCard';

const ConnectedFnFScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const userData = useContext(UserContext);

    useEffect(() => {
        // subscribe to connected users
        const subscriber = firestore().collection('su_connections').where('pu_id', '==', auth().currentUser.uid).onSnapshot(async querySnapshot => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ id: doc.id, ...doc.data() })
            })
            setUsers(docs);
        })
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [navigation]);


    const onShare = async () => {

        try {
            const link = `https://rivayatt.page.link/fnf?invitedBy=${userData.profile.UUID}`;
            const result = await Share.share({
                message:
                    `I am using JodiSure and looking for your help to choose my better half. tap  to support me. ${link}`,
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
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Theme.TextB color="#000" size="18px">All connected Family & Friends</Theme.TextB>
                {!users.length ? (
                    <View style={styles.noConnectionContainer}>
                        <Image source={require('../../../assets/images/group_19.png')} style={{ width: 66, height: 66, resizeMode: 'contain' }} />
                        <Theme.Text color="#000000" size="14px">No family members are connected!</Theme.Text>
                        <Theme.Text style={{ textAlign: 'center' }} color="#ce3636" size="14px">We recommend to connect with at least one member to use the app</Theme.Text>
                    </View>
                ) : null}

                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={users}
                        renderItem={({ item }) => <View style={{ marginVertical: 10 }}>
                            <FnfLoginRequestCard key={item.id} data={item} />
                        </View>}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            </View>
            <InviteFnFCard />
        </View>
    )
}

export default ConnectedFnFScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    noConnectionContainer: {
        marginTop: 16,
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 30,
        alignItems: 'center',
        height: 186,
        borderColor: '#cfcfcf',
        borderWidth: 1,
        borderRadius: 8,
    },
    addContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#b0ced9',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
})
