import auth from '@react-native-firebase/auth'
import config from '../constants/config';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

// go get SHA1 key 
// keytool -exportcert -keystore ./android/app/debug.keystore -list -v

GoogleSignin.configure({
  webClientId: config.GOOGLE_WEB_CLIENT_ID
})

export async function signInWithGoogle() {
  // Get uidToken
  const { idToken } = await GoogleSignin.signIn();
  // create a goggle credential
  const credential = auth.GoogleAuthProvider.credential(idToken);
  // siging using the google credential
  AsyncStorage.removeItem('LoginAs');
  return auth().signInWithCredential(credential);
}

/**
 * sms the verifcation code to user, returns the confirmResult to be used later
 * @param phoneNumber string
 * @returns promise confirmResult object
 */
export async function signInWithPhone(phoneNumber, forceResend = false) {
  // console.log(phoneNumber);
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log('Failed to clear AsyncStorage', error);
  }

  return auth().signInWithPhoneNumber(phoneNumber, forceResend);
}

export async function clearAsyncStorageLoginAs() {
  try {
    await AsyncStorage.removeItem('LoginAs');
  } catch (error) {
    console.log('Failed to clear AsyncStorage', error);
  }
}



export async function setLoginAs(type: string): Promise<any> {
  // return AsyncStorage.setItem('LoginAs',type);
}

export async function setLoginFor(uid: string): Promise<any> {
  return AsyncStorage.setItem('LoginFor', uid);
}

export async function getLoginFor(): Promise<any> {
  return AsyncStorage.getItem('loginFor');
}

export async function getLoginAs(): Promise<any> {
  // return AsyncStorage.getItem('LoginAs');
}

export async function signout() {
  try {
    await AsyncStorage.removeItem('LoginAs')
    await AsyncStorage.removeItem('loginFor')
    await auth().signOut();
  } catch (error) {
    alert('problem loging out!');
    console.log(error);
  }
}
