import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import firebase from './firebase.service';
import auth from '@react-native-firebase/auth'
import { databaseUrl } from '../constants/firebase.config';
database().setPersistenceEnabled(true);
const roomsCollection = firestore().collection('rooms');
const roomRef = database().ref('rooms');
// const roomRef = firebase.app().database(databaseUrl).ref('rooms');
interface Reply {
    title: string
    value: string
    messageId?: any
}

interface QuickReplies {
    type: 'radio' | 'checkbox'
    values: Reply[]
    keepIt?: boolean
}

interface User{
    _id:string | number
    name?:string
    avatar?:string
}
export interface IMessage {
    _id: string | number
    text: string
    createdAt: Date | number
    user: User
    image?: string
    video?: string
    audio?: string
    system?: boolean
    sent?: boolean
    received?: boolean
    pending?: boolean
    quickReplies?: QuickReplies
}

export async function sendMessage(roomId:string,message:string,_id:string):Promise<any>{
    console.log(message,roomId,_id);
    return roomsCollection.doc(roomId).set({
        modifiedAt: firestore.FieldValue.serverTimestamp(),
        lastActivitySeenAt: firestore.FieldValue.serverTimestamp(),
        mostRecentMessage: message
    },{merge:true}).then(()=>{
        return database().ref('rooms/' + roomId).child(_id).set({
            _id: _id,
            text: message,
            user: {
                _id: auth().currentUser.uid
            },
            createdAt: database.ServerValue.TIMESTAMP,
            sent: true,
            received: false,
            pending: false,
        })
    });
    

    // return roomsCollection.doc(roomId).collection('chats').add({
    //     text:message,
    //     user:{
    //         _id:auth().currentUser.uid
    //     },
    //     createdAt:firestore.FieldValue.serverTimestamp(),
    //     sent:true,
    //     received:false,
    //     pending:false,
    // }).then(doc=>{
    //     console.log(doc)
    //     return roomsCollection.doc(roomId).update({
    //         modifiedAt: firestore.FieldValue.serverTimestamp(),
    //         lastActivitySeenAt: firestore.FieldValue.serverTimestamp(),
    //         mostRecentMessage:message
    //     })
    // });
}

export async function getMessages(roomId:string,callback):Promise<any>{
    return database().ref('rooms/' + roomId).orderByChild('createdAt').once('value',callback);
}

export function onMessage(roomId:string,callback){
    return database().ref('rooms/' + roomId).orderByChild('createdAt').on('child_added',callback);
}

export async function CreateRoomIfDosentExists(toUser:string,fromUser?:string):Promise<any>{
    if (!fromUser) {
        fromUser = auth().currentUser.uid;
    }
    // check if there is already a room with toUser
    const roomId = await getUsersRoom(toUser,fromUser);
    console.log(roomId);
    if (roomId){
        return roomId;
    }
    // create a room for these users if room don't exists
    return roomsCollection.add({
        members:[toUser,fromUser],
        status:'active',
        createdAt: firestore.FieldValue.serverTimestamp(),
        modifiedAt: firestore.FieldValue.serverTimestamp(),
        createdBy: fromUser,
        lastActivitySeenAt: firestore.FieldValue.serverTimestamp(),
        mostRecentMessage:'Chat room initiated',
    }).then(doc=>{
        return doc.id;
    })
}

export async function getUsersRoom(toUser: string, fromUser: string):Promise<boolean>{
    return roomsCollection.where('members', "array-contains", fromUser).get().then(qs=>{
        let count =0;
        let roomId;
        qs.forEach(doc=>{
            const data = doc.data();
            console.log(data);
            const members = data.members;
            console.log(members);
            console.log(toUser);

            if(members.includes(toUser)){
                count = count + 1;
                roomId = doc.id;
            }
            
        });
        if(count){
            return roomId;
        }
        return false;
    })
}

