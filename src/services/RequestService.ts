import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import randomize, {isCrypto} from 'randomatic';
import firebase from './firebase.service';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';

const requestsCollection = firestore().collection('requests');
const usersCollection = firestore().collection('users');

/**
 * status of request can be one of pending,approved,rejected
 */

/**
 * Create a request, will throw error when there is pending or duplicate request with approperiate message. this message should be use for user's alert
 * @param whichUserId the user who will receive the request
 * @param uid from user (optional) default to auth user
 * @returns Promise
 */
export async function sendFriendRequest(
  whichUserId: string,
  uid?: string,
): Promise<any> {
  if (!uid) {
    uid = auth().currentUser.uid;
  }

  // check if there is already a request created by this user
  return checkDuplicateRequest(uid, whichUserId)
    .then(doc => {
      if (doc.exists) {
        throw new Error(
          'You have already created the request, which is ' +
            doc.data().status +
            '.',
        );
      }
      // check if there is pending request
      return checkDuplicateRequest(whichUserId, uid);
    })
    .then(async doc => {
      if (doc.exists) {
        throw new Error(
          'You already have a request from this user, which is ' +
            doc.data().status +
            '.',
        );
      }
      await analytics().logEvent('friend_request', {
        fromUserId: whichUserId,
        toUserId: uid,
        description: 'A request has been created',
        status: 'pending',
      });
      return requestsCollection.doc(uid + '|' + whichUserId).set(
        {
          fromUID: uid,
          toUID: whichUserId,
          status: 'pending',
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        {merge: true},
      );
    });
}

export async function sendFriendRequestAgain(
  whichUserId: string,
  uid?: string,
): Promise<any> {
  try {
    if (!uid) {
      uid = auth().currentUser.uid;
    }
    return checkDuplicateRequest(uid, whichUserId)
      .then(async doc => {
        if (doc.exists) {
            console.log("doc exists 1");
            
          return requestsCollection.doc(uid + '|' + whichUserId).set(
            {
              fromUID: uid,
              toUID: whichUserId,
              status: 'pending',
              createdAt: firestore.FieldValue.serverTimestamp(),
            },
            {merge: true},
          );
        }
        // check if there is pending request
        return checkDuplicateRequest(whichUserId, uid).then(async doc => {
            if (doc.exists) {
                console.log("doc exist 2");
                
                await requestsCollection.doc(whichUserId + '|' + uid).delete();
                console.log(`Deleted request from ${whichUserId} to ${uid}`);
                
                // Optionally, you can also create a new request from uid to whichUserId here
                return requestsCollection.doc(uid + '|' + whichUserId).set(
                  {
                    fromUID: uid,
                    toUID: whichUserId,
                    status: 'pending',
                    createdAt: firestore.FieldValue.serverTimestamp(),
                  },
                  {merge: true},
                );
            }
            //   await analytics().logEvent('friend_request', {
            //     fromUserId: whichUserId,
            //     toUserId: uid,
            //     description: 'A request has been created',
            //     status: 'pending',
            //   });
            //   return requestsCollection.doc(uid + '|' + whichUserId).set(
            //     {
            //       fromUID: uid,
            //       toUID: whichUserId,
            //       status: 'pending',
            //       createdAt: firestore.FieldValue.serverTimestamp(),
            //     },
            //     {merge: true},
            //   );
          });;
      })
      
  } catch (e) {
    console.error(e);
  }

  // check if there is already a request created by this user
}

export async function CloseFriendRequest(
  whichUserId: string,
  uid?: string,
): Promise<any> {
  if (!uid) {
    uid = auth().currentUser.uid;
  }
  return requestsCollection.doc(uid + '|' + whichUserId).delete();
}

export async function RejectFriendRequest(
  whichUserId: string,
  uid?: string,
): Promise<any> {
  if (!uid) {
    uid = auth().currentUser?.uid;
  }
  await analytics().logEvent('friend_request', {
    fromUserId: whichUserId,
    toUserId: uid,
    description: 'A request has been rejected',
    status: 'rejected',
  });
  return requestsCollection.doc(whichUserId + '|' + uid).set(
    {
      fromUID: whichUserId,
      toUID: uid,
      status: 'rejected',
      modifiedAt: firestore.FieldValue.serverTimestamp(),
    },
    {merge: true},
  );
}
export async function disconnectProfile(whichUserId: string, uid?: string) {
  if (!uid) {
    uid = auth().currentUser.uid;
  }
  await analytics().logEvent('friend_request_disconnected', {
    fromUserId: whichUserId,
    toUserId: uid,
    description: 'A request has been disconnected',
    status: 'disconnected',
  });

  // Delete the document with the concatenation of whichUserId and uid from requestsCollection
  await requestsCollection.doc(whichUserId + '|' + uid).delete();
  await requestsCollection.doc(uid + '|' + whichUserId).delete();

  // Remove user ID from the connectedUsers array field in the preferences document of both users
  await usersCollection
    .doc(whichUserId)
    .collection('preferences')
    .doc('1')
    .update({
      connectedUsers: firestore.FieldValue.arrayRemove(uid),
    });

  await usersCollection
    .doc(uid)
    .collection('preferences')
    .doc('1')
    .update({
      connectedUsers: firestore.FieldValue.arrayRemove(whichUserId),
    });

  // Add user ID to the disconnectedUsers array field in the preferences document of both users
  await usersCollection
    .doc(whichUserId)
    .collection('preferences')
    .doc('1')
    .update({
      disconnectedUsers: firestore.FieldValue.arrayUnion(uid),
    });

  await usersCollection
    .doc(uid)
    .collection('preferences')
    .doc('1')
    .update({
      disconnectedUsers: firestore.FieldValue.arrayUnion(whichUserId),
    });
}

export async function AcceptFriendRequest(
  whichUserId: string,
  uid?: string,
): Promise<any> {
  if (!uid) {
    uid = auth().currentUser.uid;
  }
  await analytics().logEvent('friend_request', {
    fromUserId: whichUserId,
    toUserId: uid,
    description: 'A request has been accepted',
    status: 'accepted',
  });
  return requestsCollection
    .doc(whichUserId + '|' + uid)
    .set(
      {
        fromUID: whichUserId,
        toUID: uid,
        status: 'accepted',
        modifiedAt: firestore.FieldValue.serverTimestamp(),
      },
      {merge: true},
    )
    .then(() => {
      // add it as connections for sender
      return usersCollection
        .doc(whichUserId)
        .collection('preferences')
        .doc('1')
        .update({
          connectedUsers: firestore.FieldValue.arrayUnion(uid),
          disconnectedUsers: firestore.FieldValue.arrayRemove(uid),
        });
    })
    .then(() => {
      // add it as connections for approver
      return usersCollection
        .doc(uid)
        .collection('preferences')
        .doc('1')
        .update({
          connectedUsers: firestore.FieldValue.arrayUnion(whichUserId),
          disconnectedUsers: firestore.FieldValue.arrayRemove(whichUserId),
        });
    });
}

export async function checkDuplicateRequest(
  fromUID: string,
  toUID: string,
): Promise<FirebaseFirestoreTypes.DocumentData> {
  return requestsCollection.doc(fromUID + '|' + toUID).get();
}

export async function getRequest(activeTab, activeButton): Promise<any[]> {
  const uid = auth().currentUser.uid;
  if (activeTab === 'sent') {
    return requestsCollection
      .where('fromUID', '==', uid)
      .where('status', '==', activeButton)
      .get()
      .then(qs => {
        const uids = [];
        qs.forEach(doc => {
          uids.push(doc.data().toUID);
        });
        return uids;
      });
  }
  if (activeTab === 'received') {
    return requestsCollection
      .where('toUID', '==', uid)
      .where('status', '==', activeButton)
      .get()
      .then(qs => {
        const uids = [];
        qs.forEach(doc => {
          uids.push(doc.data().fromUID);
        });
        return uids;
      });
  }
}

export async function getAwaitingSentRequest(uid?: string): Promise<any[]> {
  if (!uid) {
    uid = auth().currentUser.uid;
  }
  return requestsCollection
    .where('fromUID', '==', uid)
    .where('status', '==', 'pending')
    .get()
    .then(qs => {
      const uids = [];
      qs.forEach(doc => {
        uids.push(doc.data().toUID);
      });
      return uids;
    });
}
export async function getAwaitingReceivedRequest(uid?: string): Promise<any[]> {
  if (!uid) {
    uid = auth().currentUser.uid;
  }
  return requestsCollection
    .where('toUID', '==', uid)
    .where('status', '==', 'pending')
    .get()
    .then(qs => {
      const uids = [];
      qs.forEach(doc => {
        uids.push(doc.data().toUID);
      });
      return uids;
    });
}

export function liveAwaitingReceivedRequest(uid?: string) {
  if (!uid) {
    uid = auth().currentUser.uid;
  }
  return requestsCollection
    .where('toUID', '==', uid)
    .where('status', '==', 'pending');
}
