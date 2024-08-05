import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import Theme from '../../components/Theme'
import Profile from '../../components/Profile';
import RoundDarkButton from '../../components/RoundDarkButton';
import { getMyProfile, getUserPhoto } from '../../services/UserService';
import { Avatar } from 'react-native-elements';
import theme from '../../theme/theme';
import moment from 'moment';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


const ChatProfile = ({ uid, roomData }) => {
    const navigation = useNavigation();
    const [user, setUser] = useState();
    const [photo, setPhoto] = useState();
    useEffect(() => {
        async function setup() {
            init();
        }
        setup();
    }, []);

    const init = () => {
        getUserPhoto(uid).then(p => {
            setPhoto(p);
        });
        getMyProfile(uid).then(u => {
            setUser(u.data());
        });
    };

    return (
        <View>
            {/* <Text>{JSON.stringify(roomData,null,2)}</Text> */}
            <TouchableOpacity onPress={() => { navigation.navigate('ChatScreen', { roomId: roomData.data.id, toUid: uid, fromRoom: true, toUser: user, photo: photo, name: user?.first_name + ' ' + user?.last_name }) }}>
                <View style={styles.chatContainer}>
                    {photo ? (
                        <Avatar
                            rounded
                            size={42}
                            source={{ uri: photo }}
                        />
                    ) : null}

                    <View style={styles.nameContainer}>
                        <Theme.TextB color={theme.colors.primaryDark}>{user?.first_name} {user?.last_name}</Theme.TextB>
                        <View style={styles.recentMessageContainer}>
                            <AntDesignIcon name="check" size={14} color="green" />
                            <Theme.Text style={{ left: 5 }} numberOfLines={2} color="#000">{roomData.data.mostRecentMessage}</Theme.Text>
                        </View>

                    </View>
                    <View>
                        <Theme.Text color="#737373">{moment(new Date(roomData.data.lastActivitySeenAt?.toDate())).fromNow()}</Theme.Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ChatProfile

const styles = StyleSheet.create({

    chatContainer: {
        flexDirection: 'row',
        padding: 16
    },
    nameContainer: {
        flex: 1,
        left: 12,
    },
    recentMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center'
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
        marginTop: 26,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 26,
    }
})
