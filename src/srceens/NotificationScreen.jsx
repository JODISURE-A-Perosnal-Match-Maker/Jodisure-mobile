import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, StatusBar, Text, Linking } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import UList from '../components/UList'
import Theme from '../components/Theme';
import DarkCard from '../components/DarkCard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ConnectionsCard from '../components/ConnectionsCard';
import FnfLoginRequestCard from '../components/PuComponents/FnfLoginRequestCard';
import { createChannel, sendTest } from '../services/NotificationService';

import { getAwaitingReceivedRequest, getAwaitingSentRequest } from '../services/RequestService';
import { getConnectedUsers } from '../services/UserService';
import InviteFnFCard from '../components/InviteFnFCard';
import { UserContext } from '../navigation';
import theme from '../theme/theme';



const NotificationScreen = () => {
    const userC = useContext(UserContext);
    const [secondaryUsers, setSecondaryUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(auth().currentUser.uid);
    const [isUserFetched, setIsUserFetched] = useState(false);
    const [awaitingReceivedRequests, setAwaitingReceivedRequests] = useState([]);
    const [awaitingSentRequests, setAwaitingSentRequests] = useState([]);
    const [connections, setConnections] = useState([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        // create channel
        createChannel().then(res => console.log(res)).catch(err => { console.log(err) });

        // subscribe to connected users        
        const subscriber = firestore().collection('su_connections').where('pu_id', '==', auth().currentUser.uid).onSnapshot(async querySnapshot => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ id: doc.id, ...doc.data() })
            })
            setSecondaryUsers(docs);
            setIsUserFetched(true);
        })
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [navigation])

    useEffect(() => {
        getAwaitingReceivedRequest().then(receivedRequests => {
            setAwaitingReceivedRequests(receivedRequests);
        });
        getAwaitingSentRequest().then(sentRequests => {
            setAwaitingSentRequests(sentRequests);
        });
        getConnectedUsers().then(cons => {
            setConnections(cons);
        })
    }, [isFocused]);

    const handleSentRequestCallForAction = () => {
        navigation.navigate('Requests', { activeButton: 'pending', activeTab: 'sent' });
    }

    const handleAwaitingRequestCallForAction = () => {
        navigation.navigate('Requests', { activeButton: 'pending', activeTab: 'received' });
    }

    const handleNotification = () => {
        // sendTestNotification()
    }

    const handleVerifyNowPress = () => {
        Linking.openURL(`https://api.whatsapp.com/send?phone=9748548623&text=Hi,%20my%20JodiSure%20ID%20is%20${userC.profile?.UUID}`); // Replace with your WhatsApp link
    };


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: StatusBar.currentHeight - 10 }}>
            {userC.profile.status === 'approved' ? (
                <View style={styles.container}>
                    {/* <UList /> */}
                    <View>
                        <TouchableOpacity onPress={handleNotification}>
                            <Theme.TextB color="#93bbca" size="18px">Connection Status</Theme.TextB>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 12 }}></View>
                    <ConnectionsCard title="New connected user" content={connections.length} ></ConnectionsCard>
                    <View style={{ marginTop: 12 }}></View>
                    <DarkCard onPress={handleAwaitingRequestCallForAction} bgColor="#9fcdd6" title="Awaiting received request" iconImage={require('../assets/images/text_chat_icon.png')} count={awaitingReceivedRequests.length} />
                    <View style={{ marginTop: 12 }}></View>
                    <DarkCard onPress={handleSentRequestCallForAction} bgColor="#9fcdd6" title="Awaiting sent request" iconImage={require('../assets/images/text_chat_icon.png')} count={awaitingSentRequests.length} />
                </View>
            ) : null}

            {userC?.profile?.status !== 'approved' ? (
                <View style={styles.container}>
                    <View style={styles.alert}>
                        <Theme.TextB style={{ color: theme.colors.white, textAlign: 'center' }} size='18'>Your profile status : {userC.profile.status}</Theme.TextB>
                        <Theme.Text style={{ color: theme.colors.white, textAlign: 'justify', padding: 10 }} size='14'>Your profile is currently under review. Our team will be in touch with you soon.

                            For faster verification, simply click <Text style={styles.link}  onPress={handleVerifyNowPress}> "Verify now ✅" </Text> to message us on WhatsApp, and we'll guide you through the easy steps.</Theme.Text>
                    </View>
                </View>
            ) : null}

            <View style={styles.container}>
                <Theme.TextB color="#93bbca" size="18px" style={{ textAlign: 'center', paddingBottom: "10%" }}>Family and friends login request</Theme.TextB>
                <View style={{ flex: 1, ...styles.childContainer }}>

                    {secondaryUsers.map(connectionData => {
                        return <FnfLoginRequestCard key={connectionData.id} data={connectionData} />
                    })}
                    {(isUserFetched && secondaryUsers.length === 0) ? (
                        <View style={{ marginVertical: 20 }}>
                            <Theme.Text style={{ textAlign: 'center', marginBottom: 20 }}>No pending login requests. Ask your family members to connect and share contacts.</Theme.Text>
                        </View>
                    ) : null}

                </View>
            </View>


            <InviteFnFCard />
        </ScrollView>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
        // alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 0,
        width: '100%',
        

    },
    link: {
        color: theme.colors.secondaryDark, // You can replace this with your theme color
        // textDecorationLine: 'underline',
        borderRadius:2,
        borderWidth:2,
        borderColor:'black',
        backgroundColor:theme.colors.boneWhite,
        overflow: 'hidden', 
        textDecorationColor:'bold',
        fontWeight: "bold",

    },
    childContainer: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: theme.colors.boneWhite,
        borderRadius: 10,
        padding: 16,
        paddingTop: '20%',
        paddingBottom: '20%',
        marginBottom: 30,
        width: '100%',

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
    alert: {
        marginVertical: 16,
        backgroundColor: theme.colors.error,
        borderColor: '#cfcfcf',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        padding: 16,
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
    card: {
        marginVertical: 16,
        backgroundColor: '#ffffff',
        borderColor: '#cfcfcf',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        padding: 16
    },
    hr: {
        backgroundColor: '#e8e8e8',
        height: 8,
        width: '100%'
    },
    row: {
        marginVertical: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row2: {
        marginVertical: 17,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    col: {
        flexDirection: 'column'
    }
});