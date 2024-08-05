import React, { useState, useEffect, useCallback, createContext, useLayoutEffect, useMemo } from 'react';
import { useNetInfo } from "@react-native-community/netinfo";
import auth, { firebase } from '@react-native-firebase/auth';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStackNavigator from './authStackNavigator';
import MainStackNavigator from './mainStackNavigator';
import AuthLoader from '../theme/AuthLoader';

import firestore from '@react-native-firebase/firestore';
import UnapprovedUserStackNavigator from './unapprovedUserStackNavigator';
import { clearAsyncStorageLoginAs, getLoginAs, getLoginFor, setLoginAs, setLoginFor } from '../services/AuthService';
import { genUUID, updateProfile, getUserPhoto, getPuserShareContacts } from '../services/UserService';
import messaging from '@react-native-firebase/messaging';
import RejectedUserStackNavigator from './RejectedUserStackNavigator';
import { Text, View } from 'react-native';
import OfflineScreen from '../theme/OfflineScreen';


export const UserContext = React.createContext();

const deepRootConfig = {
  screens: {
    DeepLinkInterceptor: 'fnf'
  }
}

const linking = {
  prefixes: ['rivayatt://', 'https://rivayatt.page.link'],
  config: deepRootConfig
};

const RootNavigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = React.useState(null);
  const [isActive, setIsActive] = React.useState(false);
  const [loginAs, setLoginAsState] = React.useState(null);
  const [loginFor, setLoginForState] = React.useState(null);
  const [fetchingProfile, setFetchingProfile] = React.useState(true);
  const [hasOnboarded, setHasOnboarded] = React.useState(false);
  const [hasInternet, setHasInternet] = React.useState(true);
  const [sharedContact, setSharedContact]= React.useState([])

  let authSubscriber;
  let userSubscriber;

  // Handle internet connection change
  const netInfo = useNetInfo();

  // Handle user state changes
  async function onAuthStateChanged(user) {
    await clearAsyncStorageLoginAs();
    // console.log("user------------", user);
    setUser(user);
    if (user) {
      //get and update pushToken
      const authStatus = await messaging().requestPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authrisation status', authStatus);
        const pushToken = await messaging().getToken();
        try {
          const res = await updateProfile({ pushToken: pushToken });
        } catch (error) {
          console.log('Can not set push token', error);
          // upon onboarding user reauth user to subscribe to push events.
        }

      }
    }
    if (initializing) setInitializing(false);
  }


  const authChangedCb = useCallback(async () => {
    authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
  }, [])

  useEffect(() => {
    const checkInternet = async () => {
      console.log(netInfo);
      if (netInfo?.isConnected) {
        setHasInternet(true);
      } else {
        setHasInternet(false);
      }
    };

    checkInternet();
  }, [netInfo?.isConnected]);

  const userChangeCb = useCallback(async () => {
    if (!user) return;
    try {
      userSubscriber = firestore().collection('users').doc(user.uid).onSnapshot(async doc => {
        // console.log(doc)
        if (doc?.exists && doc?.data()) {
          console.log("if-----------------",doc.data());


          //TODO: this needs to be changed in this case user is not onboarded
          if (!doc.data()?.UUID) {
            console.log("if-----------------",doc.data()?.UUID);
            await clearAsyncStorageLoginAs();
            setHasOnboarded(false);
            // await genUUID(doc.id);
            
            try {
              setProfile(null);
              setIsActive(false);
              setFetchingProfile(false);
              // await updateLoginAs('fnf'); // no need to auto set as fnf let user choose type of login
            } catch (error) {
              console.log('Error at catch of userSubscriber', error);
            }

          } else {
            console.log("else-----------------");

            //watch out for this case as user might not onboarded yet
            setHasOnboarded(true);
            const photo = await getUserPhoto();
            const contacts= await getPuserShareContacts()
            setSharedContact(contacts)
            setProfile({ id: doc.id, photo: photo, ...doc.data() });
            setFetchingProfile(false);
            setIsActive(true);
          }

        }

      });
    } catch (error) {
      console.log(error);
    }

  }, [user])

  useEffect(() => {
    authChangedCb();
    return authSubscriber;
  }, [authChangedCb]);


  useMemo(() => {
    console.log('Effect loginAs: ' + loginAs);
  }, [loginAs])


  useEffect(() => {
    userChangeCb();
    updateLoginAs(null);
    // Stop listening for updates when no longer required
    return userSubscriber;
  }, [userChangeCb])

  if (!hasInternet) {
    return (
      <OfflineScreen />
    )
  }

  if (initializing) return (
    <AuthLoader />
  );

  if (!user) {
    console.log('rendering login');
    return (
      <NavigationContainer>
        <AuthStackNavigator />
      </NavigationContainer>
    );
  }

  async function updateLoginAs(type) {
    console.log('updatedLoginAs: ' + type);
    try {
      // await setLoginAs(type);
      setLoginAsState(type);
    } catch (error) {
      console.log('error at updateLoginAs', error);
    }
  }
  async function updateLoginFor(uid) {
    try {
      await setLoginFor(uid);
      setLoginForState(uid);
    } catch (error) {
      console.log('error at updateLoginFor', error);
    }
  }

  // console.log('RootNavigation state',profile, loginAs);
  // if user is active and profile is approved by admin
  if (user && isActive && profile && profile.status && profile.status === 'approved' && loginAs === 'primary') {
    return (
      <UserContext.Provider value={{ uid: user?.uid, isActive, profile: profile, loginAs, loginFor,sharedContact:sharedContact, fetchingProfile, updateLoginAs, updateLoginFor }}>
        <NavigationContainer linking={linking}>
          <MainStackNavigator />
        </NavigationContainer>
      </UserContext.Provider>
    )
  }

  // if user is active but profile is rejected login as primary user
  if (user && isActive && profile && profile.status === 'rejected' && loginAs === 'primary') {
    return (
      <UserContext.Provider value={{ uid: user?.uid, isActive, profile: profile, loginAs, loginFor, fetchingProfile, updateLoginAs, updateLoginFor }}>
        <RejectedUserStackNavigator />
      </UserContext.Provider>
    );
  }

  // if user is active but profile is other then approved but login as primary user
  if (user && isActive && profile && profile.status === 'pending' && loginAs === 'primary') {
    return (
      <UserContext.Provider value={{ uid: user?.uid, isActive, profile: profile, loginAs, loginFor, fetchingProfile, updateLoginAs, updateLoginFor }}>
        <NavigationContainer>
          <UnapprovedUserStackNavigator />
        </NavigationContainer>
      </UserContext.Provider>
    );
  }

  // if user is not null
  // console.log(user);
  if (user) {
    return (
      <UserContext.Provider value={{ uid: user?.uid, isActive, profile: profile, loginAs, loginFor, fetchingProfile, updateLoginAs, updateLoginFor }}>
        <NavigationContainer linking={linking}>
          <MainStackNavigator />
        </NavigationContainer>
        {/* <AuthLoader /> */}
      </UserContext.Provider>
    );
  }



  // for unhandled case or busy getting profile data
  return (
    <AuthLoader />
  );
}

export default RootNavigation;