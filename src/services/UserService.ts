import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import randomize, {isCrypto} from 'randomatic';
import firebase from './firebase.service';
import auth from '@react-native-firebase/auth';
import {baseApiUrl} from '../constants/firebase.config';
import moment from 'moment';
import {string} from 'yup';
import base64 from 'base-64';

const usersCollection = firestore().collection('users');
const religionCollection = firestore().collection('religions');
const additionalInfoCollection = firestore().collection('preference_and_about').doc("preference_and)about");
const suConnectionsRef = firestore().collection('su_connections');
export const razorpayKeyId = 'rzp_live_yA0QsE8viCtFkd';
export const razorpayKeySecret = 'CHKtALraimWO1sVSjC24WzaF';
export const recommendationURL="https://asia-south1-rivayatt-3c9d5.cloudfunctions.net/getRecomendationFromFirebase/?id=";
export async function genUUID(uid: string): Promise<any> {
  const UUID = randomize('A0', 6, undefined);
  usersCollection
    .where('UUID', '==', UUID)
    .get()
    .then(querySnapshot => {
      let count = 0;
      querySnapshot.forEach(doc => {
        count++;
      });
      if (count) {
        return genUUID(uid);
      } else {
        return usersCollection.doc(uid).update({UUID});
      }
    });
}

export async function getUserByUUID(UUID: string): Promise<any> {
  return usersCollection
    .where('UUID', '==', UUID)
    .get()
    .then(querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        // @ts-ignore
        users.push(data);
      });
      if (users.length) {
        return users[0];
      }
      throw new Error('Invalid User Id');
    });
}

/**
 * get religions from database
 * @returns array of religion names
 */
export async function getReligions(): Promise<any[]> {
  return religionCollection
    .get()
    .then(qs => {
      const religions = [];
      qs.forEach(doc => {
        //@ts-ignore
        religions.push(doc.data().name);
      });
      return religions;
    })
    .catch(err => {
      return [];
    });
}
export function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

export async function addPayment(
  paymentIntentId: string,
  amount: string,
  success: boolean,
  reason: string,
  pKey: string,
  isMeeting: boolean,
  uid?: string,
): Promise<any> {
  console.log('this should work');
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection
    .doc(uid)
    .collection('payments')
    .doc(paymentIntentId)
    .set(
      {
        paymentIntentId,
        amount,
        success,
        pKey,
        reason,
        cratedAt: firestore.FieldValue.serverTimestamp(),
      },
      {merge: true},
    )
    .then(res => {
      const updatedAmount = firestore.FieldValue.increment(parseInt(amount));
      if (!isMeeting) {
        return usersCollection.doc(uid).update({
          walletBalence: updatedAmount,
          lastRecharged: firestore.FieldValue.serverTimestamp(),
        });
      }
    });
}
export async function checkOtherUserDPVisible(uid) {
  try {
    const data=(await usersCollection.doc(uid).get()).data()
      ?.isPhotoVisibilityEnabled;

      console.log("photo visible", data);

      return data;
      
  } catch (error) {
    console.log('Error getting documents: ', error);
    return false;
  }
}

export async function checkOtherUserFullPrivacy(uid) {
  try {
    return (await usersCollection.doc(uid).get()).data()?.isTotalPrivacyEnabled;
  } catch (error) {
    console.log('Error getting documents: ', error);
    return false;
  }
}

export async function isPUserPremium() {
  try {
    const uid = auth()?.currentUser?.uid;
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Retrieve the last record based on the createdAt field
    const querySnapshot = await usersCollection
      .doc(uid)
      .collection('payments')
      .where("reason","==","Wallet Recharge")
      .orderBy('cratedAt', 'desc')
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      console.log('No documents found');
      return false;
    }

    let isWithinLastMonth = false;
    querySnapshot.forEach(doc => {
      // Get the createdAt date from the last document
      const createdAt = doc.data().cratedAt.toDate();

      // Check if the createdAt date is within the last month
      isWithinLastMonth = createdAt >= oneMonthAgo && createdAt <= currentDate;

      // Log the result
      console.log('Is within last month:', isWithinLastMonth);
    });

    return isWithinLastMonth;
  } catch (error) {
    console.log('Error getting documentssssssssss: ', error);
    return false;
  }
}

export async function getProfile(
  uid: string,
): Promise<FirebaseFirestoreTypes.DocumentData> {
  return usersCollection.doc(uid).get();
}
export async function updateProfile(data, uid?: string): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection.doc(uid).set(data, {merge: true});
}

export async function deleteProfile(): Promise<any> {
  const uid = auth()?.currentUser?.uid;
  return usersCollection.doc(uid).delete();
}
export const createOrder = async (currency, amount) => {
  const credentials = base64.encode(`${razorpayKeyId}:${razorpayKeySecret}`);
  const headers = new Headers();
  headers.append('Authorization', `Basic ${credentials}`);
  headers.append('Content-Type', 'application/json');
  console.log('Amount--->', amount);

  const body = JSON.stringify({
    amount: amount,
    currency: currency,
    receipt: 'qwsaq1',
    partial_payment: false,
    // accept_partial:false,
    first_payment_min_amount: amount,
    notes: {
      key1: 'value3',
      key2: 'value2',
    },
  });

  try {
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok' + response.statusText);
    }

    const data = await response.json();
    // console.log("datadatadata",data)
    return data;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
};

export async function updateSiblingInfo(siblings, uid?: string): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection.doc(uid).update({siblingInfo: siblings});
}

export async function updateUncleInfo(uncles, uid?: string): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection.doc(uid).update({uncleInfo: uncles});
}
export async function updateMeternalUncleInfo(
  uncles,
  uid?: string,
): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection.doc(uid).update({m_uncleInfo: uncles});
}

export async function getMyProfile(
  uid?: string,
): Promise<FirebaseFirestoreTypes.DocumentData> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection.doc(uid).get();
}

export const getHeightAndCity=async ()=>{
  try{
   const {city, height}=await (await additionalInfoCollection.get()).data()
   console.log("city", height);
   
   return {city, height}
  }catch(e){
    console.error(e)
    return {}
  }
}

export const getPreferenceAndAbout= async () =>{
  try{
    return await (await additionalInfoCollection.get()).data()
  }catch(e){
    console.error(e)
    return {}
  }
}

// export const getMyAdditionalPreferenceAndAbout=async(uid)=>{
//   try{
//     if(!uid){
//       uid = auth()?.currentUser?.uid;

//     }
//     return await ( await usersCollection())
//   }catch(e){
//     console.error(e)
//     return {}
//   }
// }

export async function autoGenPreferences(uid?: string): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  // get user's value
  const user = await getMyProfile(uid);
  const userProfile = user.data();
  const {dob, marital_status, gender, religion} = userProfile;
  if (!(dob || marital_status || gender || religion)) {
    throw new Error('required param not set! prefrenc not generated');
  }
  const age = moment().diff(moment(dob, 'DD/MM/YYYY'), 'years');
  console.log('age', age);
  // set fromDate
  let fromAge = 21;
  if (age - 5 > fromAge) {
    fromAge = age - 5;
  }
  let toAge = 50;
  if (age + 5 < toAge) {
    toAge = age + 5;
  }
  let pGender = 'male';
  if (gender === 'male') {
    pGender = 'female';
  }

  return setMyPreferences(
    {
      fromValue: fromAge,
      toValue: toAge,
      gender: pGender,
      religion: religion,
      marital_status: marital_status,
    },
    uid,
  );
}

export async function getMyPreferences(
  uid?: string,
): Promise<FirebaseFirestoreTypes.DocumentData> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection.doc(uid).collection('preferences').doc('1').get();
}

export async function getMyAdditionalPreferences(
  uid?: string,
): Promise<FirebaseFirestoreTypes.DocumentData> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection.doc(uid).collection('preferences').doc('1').collection('more-preference').doc('1').get();
}

export async function setMyAdditionalPreferences(data, uid?: string): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection
    .doc(uid)
    .collection('preferences')
    .doc('1').collection('more-preference').doc('1')
    .set(data, {merge: false});
}

export async function setMyPreferences(data, uid?: string): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection
    .doc(uid)
    .collection('preferences')
    .doc('1')
    .set(data, {merge: true});
}

export async function starUser(
  whichUserId: string,
  uid?: string,
): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection
    .doc(uid)
    .collection('preferences')
    .doc('1')
    .update({
      staredUsers: firestore.FieldValue.arrayUnion(whichUserId),
    });
}
export async function unstarUser(
  whichUserId: string,
  uid?: string,
): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection
    .doc(uid)
    .collection('preferences')
    .doc('1')
    .update({
      staredUsers: firestore.FieldValue.arrayRemove(whichUserId),
    });
}

export async function getStaredProfiles(uid?: string): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection
    .doc(uid)
    .collection('preferences')
    .doc('1')
    .get()
    .then(doc => {
      return doc.data().staredUsers;
    });
}

/**
 * block user from recomendation
 * @param whichUserId Id of user who should be blocked
 * @param uid Optional (if not given auth user will be used)
 * @returns Promise
 */
export async function blockUser(
  whichUserId: string,
  uid?: string,
): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection
    .doc(uid)
    .collection('preferences')
    .doc('1')
    .update({
      blockedUsers: firestore.FieldValue.arrayUnion(whichUserId),
    });
}

/**
 * unblock user from recomendation
 * @param whichUserId Id of user who should be blocked
 * @param uid Optional (if not given auth user will be used)
 * @returns Promise
 */
export async function unblockUser(
  whichUserId: string,
  uid?: string,
): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection
    .doc(uid)
    .collection('preferences')
    .doc('1')
    .update({
      blockedUsers: firestore.FieldValue.arrayRemove(whichUserId),
    });
}

export async function getConnectedUsers(uid?: string): Promise<any[]> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection
    .doc(uid)
    .collection('preferences')
    .doc('1')
    .get()
    .then(doc => {
      // @ts-ignore
      if (doc.exists && doc.data().connectedUsers) {
        // @ts-ignore
        return doc.data().connectedUsers;
      } else {
        return [];
      }
    });
}
export async function getDisconnectedUsers(uid?: string): Promise<any[]> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection
    .doc(uid)
    .collection('preferences')
    .doc('1')
    .get()
    .then(doc => {
      // @ts-ignore
      if (doc.exists && doc.data().disconnectedUsers) {
        // @ts-ignore
        return doc.data().disconnectedUsers;
      } else {
        return [];
      }
    });
}

export async function getUserPhoto(uid: string): Promise<string> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  return usersCollection
    .doc(uid)
    .collection('images')
    .doc('dp')
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data()?.url;
      } else {
        return 'https://picsum.photos/200';
      }
    });
}

export async function setPuserShareContacts(contacts: any[]) {
  const uid = auth()?.currentUser?.uid;
  const updatedAt = firestore.FieldValue.serverTimestamp();
  return usersCollection
    .doc(uid)
    .get()
    .then(doc => {
      // const contactName = doc?.data()?.contact_name;
      // let nameParts = contactName.split(" ");
      let firstName = doc?.data()?.first_name;
      let lastName = doc?.data()?.last_name;
      // console.log('First Name------>', firstName);
      // console.log('Last Name------->', lastName);
      return usersCollection
        .doc(uid)
        .collection('sharedContacts')
        .doc(uid)
        .set({constacts: contacts, updatedAt})
        .then(async () => {
          // console.log("uid-=-->",uid);
          await batchAddContact(
            uid,
            uid,
            firstName,
            lastName,
            'Self',
            contacts,
          );
          return usersCollection
            .doc(uid)
            .update({sharedContactsCount: contacts.length});
        });
    });
}
export async function batchAddContact(
  pu_id,
  su_id,
  su_firstName,
  su_lastName,
  su_relationship,
  contacts,
) {
  const url =
    'https://asia-south1-rivayatt-3c9d5.cloudfunctions.net/batchAddContacts';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pu_id: pu_id,
      su_id: su_id,
      su_firstName: su_firstName,
      su_lastName: su_lastName,
      su_relationship: su_relationship,
      contacts: contacts,
    }),
  }).then(response => response.json());
}
/**
 * get primary user's shared contachs
 * @returns contacts shared by logedin users
 */
export async function getPuserShareContacts() {
  const uid = auth()?.currentUser?.uid;
  console.log('check this ID--->', uid);
  return usersCollection
    .doc(uid)
    .collection('sharedContacts')
    .doc(uid)
    .get()
    .then(doc => {
      return doc?.data()?.constacts || [];
    });
}

// export async function getRecomendations(uid?: string): Promise<any[]> {
//   if (!uid) {
//     uid = auth()?.currentUser?.uid;
//   }
//   let staredUsers = [];
//   return usersCollection
//     .doc(uid)
//     .collection("preferences")
//     .doc("1")
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         return doc.data();
//       } else {
//         throw new Error("Preference is not set");
//       }
//     })
//     .then((preference) => {
//       console.log("preference", preference);
//       if (preference?.staredUsers) {
//         staredUsers = preference?.staredUsers;
//       }
//       const currentYear = new Date().getFullYear();

//       const minBirthYear = currentYear - preference?.toValue;
//       const maxBirthYear = currentYear - preference?.fromValue;
//       console.log("max", maxBirthYear, "min", minBirthYear);
//       const users = usersCollection
//         .where("gender", "==", preference?.gender)
//         .where("marital_status", "==", preference?.maritalStatus)
//         .where("religion", "==", preference?.religion)
//         .get();
//       console.log("user-->", users);
//       return { users, lo: preference?.fromValue, hi: preference?.toValue };
//     })
//     .then(async ({ users, lo, hi }) => {
//       console.log("DID I MAKE IT", lo, hi, users)
//       const rx = [];
//       (await users).forEach((doc) => {
//         const user = doc.data();
//         const dobParts = user.dob.split("/");
//         const dob = new Date(`${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`);
//         const age = calculateAge(dob);
//         // @ts-ignore
//         let index = staredUsers.indexOf(doc.id);
//         if (index === -1 && age >= lo && age <= hi) {
//           // @ts-ignore
//           rx.push(doc.id);
//         }
//       });
//       return rx;
//     });
// }

export async function getRecomendations(id?: string): Promise<any[]> {
  try {
    
    if (!id) {
      id = auth()?.currentUser?.uid;
      }
    console.log("am I working?", recommendationURL+id);
    const response = await fetch(recommendationURL+id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

    })

    if (!response.ok) {
      throw new Error('Network response was not ok' + response.statusText);
    }

    const data = await response.json();
    console.log("datadatadata",data)
    // shuffleArray(data)
    return data;
    
  } catch (e) {
    console.error('Something went wrong', e);
    return [];
  }
}

async function filterUsers(users, staredUsers, lo, hi, primaryUserid) {
  // console.log("primary user", uid);

  const rx: any[] = [];
  for (const user of users) {
    const dobParts = user.dob.split('/');
    const dob = new Date(`${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`);
    const age = calculateAge(dob);
    if (
      !staredUsers.includes(user.id) &&
      age >= lo &&
      age <= hi &&
      user.id != primaryUserid
    ) {
      rx.push(user.id);
    }
  }
  return rx;
}

export async function generateRecomendations(uid?: string): Promise<any> {
  if (!uid) {
    uid = auth()?.currentUser?.uid;
  }
  getRecomendations(uid).then(rx => {});
}
export async function getMutualConnections(
  uid2: string,
  uid1?: string,
): Promise<any> {
  if (!uid1) {
    uid1 = auth()?.currentUser?.uid;
  }
  const url = baseApiUrl + 'getMutualConnections';
  const {error, result} = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid1: uid1,
      uid2: uid2,
    }),
  }).then(response => response.json());

  return {error, result: result};
}

// template
export async function setTemplate(template) {
  const uid = auth()?.currentUser?.uid;
  return firestore()
    .collection('users')
    .doc(uid)
    .update({selectedTemplate: template});
}

// set hidden fields on Biodata
export async function saveHiddenFieldsOnBio(fields) {
  const uid = auth()?.currentUser?.uid;
  return firestore()
    .collection('users')
    .doc(uid)
    .update({hiddenFieldsOnBio: fields});
}

// image gallary related actions

export async function uploadGallaryImage(
  uid: string,
  filename: string,
  uploadUrl: any,
): Promise<any> {
  const storageRef = storage().ref('images/' + filename);
  try {
    const res = await storageRef.putFile(uploadUrl);
    const url = await storageRef.getDownloadURL();
    const firestoreRes = await firestore()
      .collection('users')
      .doc(uid)
      .collection('images')
      .add({url: url});
  } catch (error) {
    console.log(error);
    throw new Error('Unable to upload image');
  }
  return 'Image saved!';
}

export async function uploadDisplayPic(
  uid: string,
  filename: string,
  uploadUrl: any,
): Promise<any> {
  const storageRef = storage().ref('images/' + filename);
  try {
    const res = await storageRef.putFile(uploadUrl);
    const url = await storageRef.getDownloadURL();
    const firestoreRes = await firestore()
      .collection('users')
      .doc(uid)
      .collection('images')
      .doc('dp')
      .set({url: url});
  } catch (error) {
    console.log(error);
    throw new Error('Unable to upload image');
  }
  return 'Image saved!';
}

export function deleteGallaryImage(uid: string, imageId: string): Promise<any> {
  return firestore()
    .collection('users')
    .doc(uid)
    .collection('images')
    .doc(imageId)
    .delete();
}

function calculateAge(dateOfBirth) {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}
