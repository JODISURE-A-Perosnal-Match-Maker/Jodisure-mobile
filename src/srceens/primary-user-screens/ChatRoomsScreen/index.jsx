import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

import Theme from '../../../components/Theme';
import FullScreenLoader from '../../../theme/FullScreenLoader';
import theme from '../../../theme/theme';
import ChatProfile from '../../../components/Profile/ChatProfile';



const Devider = styled.View`
  height:2px;
  background-color:#e8e8e8;
`;

const ChatRoomsScreen = () => {
    const [users, setUsers] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const subscriber = firestore().collection('rooms').where('members', "array-contains", auth().currentUser.uid).onSnapshot(async qs => {

            const members = [];
            qs.forEach(doc => {
                const data = { id: doc.id, ...doc.data() };
                // console.log(data);
                const toUser = data.members.filter(m => m !== auth().currentUser.uid)[0];
                members.push({ uid: toUser, ...{ data } });
            });
            setUsers(members);
            setLoading(false);
        });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, []);
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}
        >
            {loading ? <FullScreenLoader /> : null}
            <View style={{ marginVertical: 12, marginLeft: 12 }}>
                <Theme.TextB>List of connected members to chat</Theme.TextB>
            </View>
            <View style={styles.container}>

                {fetched && !users?.length ? (
                    <View>
                        <View style={{ padding: 25, marginTop: 25, backgroundColor: theme.colors.primary }}>
                            <Theme.TextB color="white" style={{ textAlign: 'center' }}>No Chats!!</Theme.TextB>
                        </View>
                    </View>
                ) : null}

                {/* <Text>
                    {JSON.stringify(users,null,2)}
                </Text> */}
                {users?.map(u => (
                    <View key={u.uid}>
                        <ChatProfile uid={u.uid} roomData={u} />
                        <Devider />
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default ChatRoomsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
    }
});
