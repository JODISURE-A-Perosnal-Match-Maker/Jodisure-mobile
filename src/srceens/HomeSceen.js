import React, { useContext, useEffect, useState, useLayoutEffect, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableWithoutFeedback,PermissionsAndroid, TouchableOpacity, Alert, Linking, AppState, Platform  } from 'react-native';
import styled from 'styled-components/native';
import SleekBanner from '../components/SleekBanner';
import SetPreferenceCard from '../components/SetPreferenceCard';
import ConnectedNetworkCard from '../components/ConnectedNetworkCard';
import ConnectionsCard from '../components/ConnectionsCard';
import AwaitingResponseCard from '../components/AwaitingResponseCard';
import SubscriptionInfoCard from '../components/SubscriptionInfoCard';
import RoundDarkButton from '../components/RoundDarkButton';
import { showMessage } from 'react-native-flash-message';

import Profile from '../components/Profile';
import { UserContext } from '../navigation';
import { useRoute, useIsFocused, useNavigation } from '@react-navigation/native';
import { getConnectedUsers } from '../services/UserService';
import { getPuConnections } from '../services/SUserService';
import { getAwaitingReceivedRequest, getAwaitingSentRequest } from '../services/RequestService';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../theme/theme';
import config from '../constants/config';
import MeetingRechargeInfoCard from '../components/MeetingRechargeCard';
import RechargeInfoCard from '../components/RechargeInfoCard';
import { getContactsCommon, shareContactsCommon } from './ShareContactsCommonScreen';


// import Colors from './../../constants/Colors';

const primaryCol = '#05626e';
const lightGray = '#696969';

const AdviceTextContainer = styled.View`
  flex-direction:column;
  padding:10px;
  margin-left:15px;
  width:100%;
`;

const TitleText = styled.Text`
  font-family:Barlow-SemiBold;
  font-size:${props => (props.size) ? props.size : '16px'};
  color:${props => (props.color) ? props.color : primaryCol};
`;
const UList = styled.View`
  flex-direction:row;
  align-items:center;
`;
const Bullet = styled.Text`
  font-size:20px;
  font-weight:bold;
  margin-right:5px;
  color:${primaryCol};
`;
const BulletText = styled.Text`
  color:${lightGray};
`;

const Section = styled.View`
  margin-bottom:10px;
  border-bottom-color:#456;
`;


const Devider = styled.View`
  height:8px;
  background-color:#e8e8e8;
`;



const HomeScreen = () => {
  const userData = useContext(UserContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [connections, setConnections] = useState([]);
  const [connectedFnf, setConnectedFnf] = useState([]);
  const [awaitingReceivedRequests, setAwaitingReceivedRequests] = useState([]);
  const [awaitingSentRequests, setAwaitingSentRequests] = useState([]);

  const [appState, setAppState] = useState(AppState.currentState);
  const checkContactPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        console.log("worksss");
        
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
        console.log("G R AN T E D", granted);
        
        return granted;
      }
      return true; // Assume permission is granted on iOS
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        if(isFocused){

          const permissionGranted = await checkContactPermissions();
          
          if (!permissionGranted) {
            Alert.alert('Permission Denied', 'Contacts permission is still not granted.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    Linking.openSettings(); // Open settings when OK is pressed
                  },
                },
              ],
            );
          } else {
            getAndShareContacts()
          }
        }
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState]);
  
  useMemo(() => {
    if (!userData || !userData.profile) return;
    if (userData.sharedContact && userData.sharedContact.length===0 && isFocused) {
      Alert.alert('Share your contacts', 'JodiSure works best when your contacts are shared with us. This would help us give you relevent matches.', [
        {
          text: 'Ok',
          onPress: async () => {
            getAndShareContacts()
          }
        }
      ])
    }
  }, [userData])

   const getAndShareContacts = async () => {
    try {
      console.log("Trying step 1");
      
      // Step 1: Get contacts
      const fullContactsHome = await getContactsCommon('IN');
      console.log("Trying step 2");

      // Step 2: Share the contacts
      await shareContactsCommon(fullContactsHome, null);
    } catch (error) {
      console.error('Error in getAndShareContacts:', error);
      showMessage({
        title: "Error",
        type: 'danger',
        message: 'An error occurred while sharing contacts.'
      });
    }
  };

  useEffect(() => {
    const fetchDataAndHandlePermissions = async () => {
      try {
        // Fetch connected users
        const cons = await getConnectedUsers();
        setConnections(cons);
  
        // Check contact permissions
        const permissionGranted = await checkContactPermissions();
        if (!permissionGranted) {
          Alert.alert(
            'Permission Denied',
            'Contacts permission is still not granted.',
            [
              {
                text: 'OK',
                onPress: () => {
                  Linking.openSettings(); // Open settings when OK is pressed
                },
              },
            ]
          );
        } else {
          // Share contacts if permission is granted
          await getAndShareContacts();
        }
      } catch (error) {
        console.error('Error fetching data or handling permissions:', error);
      }
    };
  
    if (isFocused) {
      fetchDataAndHandlePermissions();
    }
  }, [isFocused]);
  

  useEffect(() => {
    getPuConnections().then(cons => {
      setConnectedFnf(cons);
    });
    getAwaitingReceivedRequest().then(receivedRequests => {
      setAwaitingReceivedRequests(receivedRequests);
    });
    getAwaitingSentRequest().then(sentRequests => {
      setAwaitingSentRequests(sentRequests);
    })
  }, [isFocused]);

  const handleBioDownload = async () => {
    // navigation.navigate(
    //   'Bio'
    // );
    // return;

    /* Code below depricated due to updated Bio feature */
    // const url = config.NEW_BIO_DOWNLOAD_URI+uid;
    const url = config.SERVER_BIO_DOWNLOAD_URI + uid;
    console.log('biodata', url);
    const supported = await Linking.canOpenURL(url);
    // console.log(supported);
    if (supported) {
      // download url 
      await Linking.openURL(url);
    } else {
      Alert.alert(`Sorry your device dont support this feature!`);
    }

  }

  const { uid } = userData;
  if (!uid) {
    return (
      <View style={styles.container}>
        <BulletText>You are not logged in!</BulletText>
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text>{userData.profile?.status}</Text> */}
        {(userData.profile?.status === 'pending' || userData.profile?.status === 'rejected') ? (
          <Text style={{ backgroundColor: 'red', color: '#ffffff', textAlign: 'center', padding: 15, width: '100%' }}>Your Profile is not active</Text>
        ) : null}
        {/* <SleekBanner image={require('../assets/images/pair.png')} content="Let’s get started by connecting some of the profile that we recommend you" /> */}
        <View style={{ width: '100%' }}>
          {/* <AdviceTextContainer>
            <TitleText color={primaryCol}>Counseling advices</TitleText>
            <UList>
              <Bullet>{'\u2022' + " "}</Bullet>
              <BulletText>Lorem ipsum adviseadvices</BulletText>
            </UList>
            <UList>
              <Bullet>{'\u2022' + " "}</Bullet>
              <BulletText>Ipsum lorem advices</BulletText>
            </UList>
          </AdviceTextContainer> */}
          <Section>
            <TitleText style={{ marginLeft: 15, marginBottom: 15 }} size='25px'>My Detail</TitleText>
            {/* <ShrotProfile profile={profile} /> */}
            <Profile uid={uid} showProfilePhotoGrid={true} showAvatar={false} overRideHazy={true}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <RoundDarkButton name="EDIT PROFILE" onPress={() => {
                  navigation.navigate(
                    'EditProfile'
                  )
                }} />

                <Button
                  title=' Biodata'
                  type='clear'
                  icon={
                    <Icon
                      name="file-pdf-o"
                      size={24}
                      color={theme.colors.primary}
                    />
                  }
                  onPress={handleBioDownload}
                />
              </View>
            </Profile>
          </Section>
          <Devider />
          <SetPreferenceCard title="JODI" title2="MAKER" navigation={navigation} content="Tell us your preferences (confidential). Matchmakers find your match!"></SetPreferenceCard>
          <Devider />
          <View style={{ padding: 16 }}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ConnectedFnF')}>
              <ConnectedNetworkCard onPress={() => navigation.navigate('ConnectedFnF')} title="Connected family members and friends" content={connectedFnf?.length}></ConnectedNetworkCard>
            </TouchableWithoutFeedback>
            <View style={{ marginTop: 8 }}></View>
            <ConnectionsCard title="Connections" uids={connections} content={connections?.length}></ConnectionsCard>
            <View style={{ marginTop: 8 }}></View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Connection')}>
              <AwaitingResponseCard awaitingReceivedRequests={awaitingReceivedRequests} awaitingSentRequests={awaitingSentRequests} />
            </TouchableWithoutFeedback>
          </View>
          <Devider />
          <View style={{ padding: 16 }}>
            <RechargeInfoCard navigation={navigation} />
          </View>


        </View>

      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginBottom: 50,
  }
});