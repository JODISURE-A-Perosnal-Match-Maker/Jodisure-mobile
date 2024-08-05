import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {batchAddContact} from './UserService';

const sUsersCollection = firestore().collection('secondary_users');
const suConnectionsRef = firestore().collection('su_connections');
const usersCollection = firestore().collection('users');

/**
 * Get list of connected secondry users of primary user
 * @param pu_id uid of primary user
 * @returns Array of connected secondary users
 */
export async function getPuConnections(pu_id?: string): Promise<any> {
  if (!pu_id) {
    pu_id = auth()?.currentUser?.uid;
  }
  return suConnectionsRef
    .where('pu_id', '==', pu_id)
    .where('pu_approved', '==', true)
    .get()
    .then(qs => {
      const susers = [];
      qs.forEach(doc => {
        //@ts-ignore
        susers.push({id: doc.id, ...doc.data()});
      });
      return susers;
    });
}

export async function getSUProfile(
  uid?: string,
): Promise<FirebaseFirestoreTypes.DocumentData> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return sUsersCollection.doc(uid).get();
}

export async function updateSUProfile(data, uid: string): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return sUsersCollection.doc(uid).set(data, {merge: true});
}

export async function searchById(uid) {
  console.log('hbjbj');

  return usersCollection
    .where('UUID', '==', uid)
    .get()
    .then(querySnapshot => {
      const dataArray: any[] = [];
      querySnapshot.forEach(doc => {
        dataArray.push(doc);
      });
      return dataArray;
    })
    .then(dataArray => {
      // Now you have the array of document data
      console.log('Array of document data:', dataArray);
      // You can further process the array or return it from here
      return dataArray;
    })
    .catch(error => {
      console.error('Error getting documents: ', error);
      throw error; // Rethrow the error to handle it upstream
    });
}

export async function getSUConnections(
  uid?: string,
): Promise<FirebaseFirestoreTypes.DocumentData> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return suConnectionsRef.where('su_id', '==', uid).get();
}
export async function onSUConnections(uid?: string) {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return suConnectionsRef.where('su_id', '==', uid);
}

export async function isPuSuAlreadyConnected(
  pu_id: string,
  su_id: string,
): Promise<boolean> {
  if (!su_id) {
    su_id = auth()?.currentUser?.uid;
  }
  return suConnectionsRef
    .where('pu_id', '==', pu_id)
    .where('su_id', '==', su_id)
    .get()
    .then(querySnapshot => {
      const connections = [];
      querySnapshot.forEach(doc => {
        //@ts-ignore
        connections.push({id: doc.id, ...doc.data});
      });
      if (connections.length) {
        return true;
      }
      return false;
    });
}

export async function addSUConnections(data, uid?: string) {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  const {pu_id, su_id} = data;
  if (!pu_id || !su_id) {
    throw new Error('params data missing pu_id, su_id');
  }
  data.createdBy = uid;
  data.createdAt = firestore.FieldValue.serverTimestamp();
  return suConnectionsRef.doc(pu_id + '|' + su_id).set(data, {merge: true});
}

export function generateRandomString(length): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomString += chars[randomIndex];
  }
  return randomString;
}

export async function setShareContacts(pu_id: string, contacts: any[]) {
  const su_id = auth()?.currentUser?.uid;
  const updatedAt = firestore.FieldValue.serverTimestamp();
  return suConnectionsRef
    .doc(pu_id + '|' + su_id)
    .collection('sharedContacts')
    .doc(pu_id)
    .set({constacts: contacts, updatedAt})
    .then(res => {
      // console.log("Res---", res);
      return suConnectionsRef
        .doc(pu_id + '|' + su_id)
        .update({sharedContactsCount: contacts.length});
      // .then(async ()=>{
      //   const suDetails= (await suConnectionsRef.doc(pu_id + '|' + su_id).get()).data()
      //   console.log("Res", suDetails);
      //   if(suDetails && suDetails?.pu_approved){
      //     console.log("you should not be here");

      //     await batchAddContact(
      //       suDetails.pu_id,
      //     suDetails.su_id,
      //     suDetails.su_firstName,
      //     suDetails.su_lastName,
      //     suDetails.su_relationship,
      //     contacts
      //   );
      //   }

      // });
    });
}

export async function getSharedContacts(pu_id: string) {
  const su_id = auth()?.currentUser?.uid;
  console.log(pu_id + '|' + su_id);
  const result = suConnectionsRef
    .doc(pu_id + '|' + su_id)
    .collection('sharedContacts')
    .doc(pu_id)
    .get();
  console.log('result-->', result);
  return result;
}

/**
 *
 * @param data object that needs to updated
 * @param id id of su_connections
 * @returns Promise
 */
export async function updateSUConnections(data, id: string) {
  const updateSUconnection = suConnectionsRef.doc(id).update(data);
  const sucontact = (await suConnectionsRef.doc(id).get()).data();
  const pu_id = sucontact?.pu_id;
  const suContacts = (
    await suConnectionsRef.doc(id).collection('sharedContacts').doc(pu_id).get()
  ).data()?.constacts;
  console.log('ddfadfasfwe', id);
  await batchAddContact(
    sucontact?.pu_id,
    sucontact?.su_id,
    sucontact?.su_firstName,
    sucontact?.su_lastName,
    sucontact?.su_relationship,
    suContacts,
  );
  return sucontact;
}

export async function deleteSUConnection(id: string) {
  return suConnectionsRef.doc(id).delete();
}

/**
 * Share connection to secondary user
 * @param uid uid of profile to be shared
 * @param su_id uid of whom the profile to be shared
 * @param pu_id optional uid of user who is sharing the profile if not given curren auth user's uid will be used
 * @returns Promise
 */
export async function shareConnection(
  uid: string,
  su_id: string,
  pu_id?: string,
): Promise<any> {
  if (!pu_id) {
    pu_id = auth()?.currentUser?.uid;
  }
  return suConnectionsRef.doc(pu_id + '|' + su_id).update({
    sharedConnections: firestore.FieldValue.arrayUnion(uid),
  });
}

/**
 * Remove share connection from secondary user
 * @param uid uid of profile to be unshared
 * @param su_id uid of whom the profile to be unshared
 * @param pu_id optional uid of user who is unsharing the profile if not given curren auth user's uid will be used
 * @returns Promise
 */
export async function unShareConnection(
  uid: string,
  su_id: string,
  pu_id?: string,
): Promise<any> {
  if (!pu_id) {
    pu_id = auth()?.currentUser?.uid;
  }
  return suConnectionsRef.doc(pu_id + '|' + su_id).update({
    sharedConnections: firestore.FieldValue.arrayRemove(uid),
  });
}
