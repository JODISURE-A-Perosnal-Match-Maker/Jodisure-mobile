import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import PushNotification, { Importance } from "react-native-push-notification";

// const sUsersCollection = firestore().collection('secondary_users');
// const suConnectionsRef = firestore().collection('su_connections');



export async function createChannel(uid,whenCreated) {
    if (!uid) {
        uid = auth().currentUser.uid;
    }
    PushNotification.createChannel(
        {
            channelId:'test-channel',
            channelName:'Test Channel:',
            // channelDescription:'A user level notification channel',
            // playSound:true,
            // soundName:'default',
            // importance:Importance.HIGH,
            // vibrate:true
        },
        (created)=>{
            console.log(`createChanel returned ${created}`);
            // whenCreated(created);
        }
    )
}

export async function sendTestNotification(){
    PushNotification.localNotification({
        channelId:'test-channel',
        title:'Test Message from JodiSure',
        message:'You got a message from JodiSure',
        bigText:'Yes you heard it right, not only we can go hiking but also picnic'
    });
}


