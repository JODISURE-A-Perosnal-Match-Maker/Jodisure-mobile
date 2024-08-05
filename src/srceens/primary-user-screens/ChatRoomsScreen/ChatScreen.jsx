import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useIsFocused, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import Theme from '../../../components/Theme';
import FullScreenLoader from '../../../theme/FullScreenLoader';
import theme from '../../../theme/theme';
import { CreateRoomIfDosentExists, getMessages, onMessage, sendMessage } from '../../../services/ChatRoomService';
// import { GiftedChat, Send } from 'react-native-gifted-chat';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { GiftedMessenger } from 'react-native-gifted-messenger';

import { getMyProfile, getUserPhoto, isPUserPremium } from '../../../services/UserService';
import FeatherIcon from 'react-native-vector-icons/Feather';

import moment from 'moment';

const ChatScreen = () => {
    const navigation = useNavigation();
    const[isPremium, setIspremium]=useState(false)
    const isFocused = useIsFocused();
    const route = useRoute();
    const [toUserId, setToUserId] = useState(route?.params?.toUid);
    const [userId, setUserId] = useState(auth().currentUser.uid);
    const [roomId, setRoomId] = useState('');
    const [messages, setMessages] = useState([]);
    const [photo, setPhoto] = useState();
    const [toUser, setToUser] = useState();

    useEffect(() => {
        // console.log('isFocused effect');
        // console.log(route.params)
        async function init() {
            const { toUid, roomId, fromRoom, photo, toUser } = route.params;
            if (toUid && !fromRoom) {
                // console.log('from profile screen');
                initChat();
            }
            // if user has came from room then it should contain roomId in it's param
            if (roomId) {
                setRoomId(roomId);
                setToUserId(toUid);
                setUserId(auth().currentUser.uid);
            }
            if (photo) {
                setPhoto(photo);
            } else {
                getUserPhoto(toUid).then(p => {
                    setPhoto(p);
                });
            }
            if (toUser) {
                setToUser(toUser)
            } else {
                getMyProfile(toUid).then(toUserProfile => {
                    setToUser(toUserProfile);
                })
            }

        }
        init();
    }, [isFocused]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await isPUserPremium();
            // console.log("---> in full profile", result);
            setIspremium(result);
            // console.log("Able to see???", isAbleToViewProfile)
          } catch (error) {
            console.error("Error checking profile access:", error);
          }
        };
    
        fetchData();
    
        // Clean-up function
        return () => {
          // Cleanup code here if needed
        };
      }, []);

    useEffect(() => {
        // console.log('roomId effect');
        // console.log(toUser);
        let subscriber;
        if (roomId) {
            // first time get all messages
            // getMessages(roomId, (snapshot) => {
            //     console.log(snapshot);
            //     if (!snapshot) return;
            //     const messages = [];
            //     snapshot.forEach(doc => {
            //         console.log(doc.val());
            //         const key = doc.key;
            //         const chat = doc.val();
            //         chat.createdAt = moment(chat.createdAt).toDate();
            //         if (chat && chat.user && chat.user._id && chat.user._id !== userId) {
            //             chat.user.avatar = photo;
            //             chat.user.name = toUser.first_name + " " + toUser.last_name
            //         };
            //         if (chat && chat._id) {
            //             messages.push(chat);
            //         }
            //     });
            //     console.log(messages);
            //     const revMessages = messages.reverse();
            //     setMessages(revMessages);
            // });
            subscriber = onMessage(roomId, (snapshot) => {
                if (!snapshot) return;
                // let chat = JSON.parse(message);
                const key = snapshot.key;
                const chat = snapshot.val();

                if (!chat) return;
                const { _id } = chat;
                if (!_id) return;
                const dupMessages = messages.filter(m => m._id === _id);
                // console.log(dupMessages);
                if (!dupMessages.length) {
                    chat.createdAt = moment(chat.createdAt).toDate();
                    if (chat.user._id !== userId) {
                        chat.user.avatar = photo;
                        chat.user.name = toUser.first_name + " " + toUser.last_name
                    };
                    setMessages(previousMessages => GiftedChat.append(previousMessages, [chat]));
                }

            });
            return subscriber;
        }
        return () => {
            if (subscriber) {
                return subscriber;
            } else {
                return () => { }
            }
        }
    }, [roomId]);

    const onSend = (messages) => {
        sendMessage(roomId, messages[0].text, messages[0]._id).then(res => {
            // console.log(res);
        }).catch(err => {
            console.log(err);
        });
    };

    const initChat = () => {
        setToUserId(route.params.toUid);
        setUserId(auth().currentUser.uid);
        CreateRoomIfDosentExists(toUserId, userId).then(rId => {
            setRoomId(rId);
        }).catch(err => {
            console.log(err);
        })
    };

    const renderSend = (props) => (
        <>
        <Send
            {...props}
            disabled={!props.text || !isPremium}
            containerStyle={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 4,
            }}
        >
            {isPremium ? (
        <FeatherIcon name="send" size={24} color={theme.colors.primary} />
      ) : (
        <FeatherIcon name="lock" size={24} color={theme.colors.primary} />
      )}
        </Send>
        </>
    );

    return (
        <View style={{ flex: 1 }}>
            {/* <Text>{roomId}</Text> */}
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userId,
                }}
                textInputStyle={{color:theme.colors.black}}
                renderSend={renderSend}
            />
        </View>

    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
    }
});
