import React, { useEffect, useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import HomeBotomTabNavigator from "./homeBottomTabNavigator";
import NotificationScreen from '../srceens/NotificationScreen';
import DrawerContent from './DrawerContent';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomNotificationBell from '../components/CustomNotificationBell';
import MyPreferencesScreen from '../srceens/primary-user-screens/MyPreferencesScreen';
import ChooseAccountScreen from '../srceens/ChooseAccountScreen';
import { getLoginAs, getLoginFor } from '../services/AuthService';
import { UserContext } from '.';
import ConnectedUsersScreen from '../srceens/fnf-screens/ConnectedUsersScreen';
import AddUserScreen from '../srceens/fnf-screens/AddUserScreen';
import ManageImageGalleryScreen from '../srceens/primary-user-screens/ManageImageGalleryScreen';
import FnFDrawerContent from './FnFDrawerContent';
import ViewProfileScreen from '../srceens/fnf-screens/ViewProfileScreen';
import ShareContactsScreen from '../srceens/fnf-screens/ShareContactsScreen';
import EditProfileScreen from '../srceens/primary-user-screens/EditProfileScreen';
import EditSiblingScreen from '../srceens/primary-user-screens/EditSiblingsScreen';
import EditUnclesScreen from '../srceens/primary-user-screens/EditUnclesScreen';
import StaredProfilesScreen from '../srceens/primary-user-screens/StaredProfilesScreen';
import ConnectedFnFScreen from '../srceens/primary-user-screens/ConnectedFnFScreen';
import ChatScreen from '../srceens/primary-user-screens/ChatRoomsScreen/ChatScreen';
import ShareProfileScreen from '../srceens/primary-user-screens/ShareProfileScreen';
import PrimaryUsersConnectionsScreen from '../srceens/fnf-screens/PrimaryUsersConnectionsScreen';
import EditMaternalUnclesScreen from '../srceens/primary-user-screens/EditMaternalUnclesScreen';
import PuserShareContactsScreen from '../srceens/primary-user-screens/PuserShareContactsScreen';
import WalletScreen from '../srceens/primary-user-screens/WalletScreen';
import CreatePrimaryProfile from '../srceens/onboarding-screens/CreatePrimaryProfile';
import UpdateReligionInfo from '../srceens/onboarding-screens/UpdateReligionInfo';
import UpdateDisplayPicture from '../srceens/onboarding-screens/UpdateDisplayPicture';
import DeepLinkInterceptorScreen from '../srceens/DeepLinkInterceptorScreen';
import ShareContactsCommonScreen from '../srceens/ShareContactsCommonScreen';
import MutualContactsScreen from '../srceens/primary-user-screens/MutualContactsScreen';
import BioScreen from '../srceens/primary-user-screens/BioScreen';
import ChooseTheme from '../srceens/primary-user-screens/BioScreen/ChooseTheme';
import BioFieldControl from '../srceens/primary-user-screens/BioScreen/BioFieldControl';
import ChangeDisplayPicture from '../srceens/primary-user-screens/ManageImageGalleryScreen/ChangeDisplayPicture';
import LoginChoice from '../components/LoginChoice';
import ContactUs from '../srceens/ContactUs';
import RechargeScreen from '../srceens/primary-user-screens/RechargeScreen';
import WalletMeetingRechargeScreen from '../srceens/WallteMeetingCardScreens';
import DigiMatchMakerTab from '../srceens/primary-user-screens/DigitalMatchmakerScreen/TabScreen';
import theme from '../theme/theme';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const LogoTitle = () => {
  return (
    <>
    <Image
      style={{ height: 20, width: 100 }}
      source={require('../assets/images/Logo.png')}
    />
    </>
  )
}

const customHeader = {
  headerShown: true,
  headerTintColor: '#00333a',
  headerTitle: props => <LogoTitle {...props} />,
  headerTitleAlign: 'center',
  headerBackImage: () => (<Ionicons name="ios-arrow-back" size={24} color="#00333a" />),
  headerRight: (props) => {
    return (
      <>
      <CustomNotificationBell {...props} />
      </>
    )
  }
};

const customHeaderfnf = {
  headerShown: true,
  headerTintColor: '#00333a',
  headerTitle: props => <LogoTitle {...props} />,
  headerTitleAlign: 'center',
  headerBackImage: () => (<Ionicons name="ios-arrow-back" size={24} color="#00333a" />),
  // headerRight: (props) => {
  //   return (
  //     <>
  //     <CustomNotificationBell {...props} />
  //     </>
  //   )
  // }
};

const customStackHeader = {
  headerShown: true,
  headerTintColor: '#00333a',
  headerTitleAlign: 'center',
  headerBackImage: () => (<Ionicons name="ios-arrow-back" size={24} color="#00333a" />),
};

const MainDrawerNavigator = () => {
  const userC = useContext(UserContext);
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <DrawerContent {...props} userC={userC} />}>
      <Drawer.Screen name="Dashboard" component={HomeBotomTabNavigator} options={customHeader} />
      <Drawer.Screen name="ManageImageGallery" component={ManageImageGalleryScreen} options={customHeader} />
      <Drawer.Screen name="Bio" component={BioScreen} options={customHeader} />
    </Drawer.Navigator>
  )
}
const FnFDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={FnFDrawerContent}>
      <Drawer.Screen name="Home" component={ConnectedUsersScreen} options={customHeaderfnf} />
    </Drawer.Navigator>
  )
}
 
const MainStackNavigator = () => {
  const userC = useContext(UserContext);
  console.log('userC', userC);
  //check if the user has choosen login type if not ask them to choose right user type
  if (!userC.loginAs) {
    return (
      <Stack.Navigator initialRouteName="ChooseAccount" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: true, headerTitle: 'Contact us' }} />
        <Stack.Screen name="ChooseAccount" component={ChooseAccountScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="ChooseAccount" component={LoginChoice} options={{ headerShown: false }} /> */}
        <Stack.Screen name="CreatePrimaryProfile" component={CreatePrimaryProfile} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateReligionInfo" component={UpdateReligionInfo} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateDisplayPicture" component={UpdateDisplayPicture} options={{ headerShown: false }} />
        <Stack.Screen name="DeepLinkInterceptor" component={DeepLinkInterceptorScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }

  //if user is logged in as friends and family
  if (userC.loginAs === 'fnf') {
    return (
      <Stack.Navigator initialRouteName="HomeDrawer" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="HomeDrawer" component={FnFDrawerNavigator} user={userC} options={{ headerShown: false }} />
        <Stack.Screen name="ChooseAccount" component={ChooseAccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddUser" component={AddUserScreen} options={{ headerShown: true, headerTitle: 'Add User' }} />
        <Stack.Screen name="ViewProfile" component={ViewProfileScreen} options={{ headerShown: true, headerTitle: 'Profile' }} />
        <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: true, headerTitle: 'Contact us' }} />
        <Stack.Screen name="ShareContacts" component={ShareContactsCommonScreen} options={{ headerShown: true, headerTitle: 'Share Contacts' }} />
        <Stack.Screen name="PrimaryUsersConnections" component={PrimaryUsersConnectionsScreen} options={({ route }) => ({ title: route.params.name })} />
        <Stack.Screen name="MutualContacts" component={MutualContactsScreen} options={{ headerTitle: 'Mutual contacts' }} />

        <Stack.Screen name="CreatePrimaryProfile" component={CreatePrimaryProfile} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateReligionInfo" component={UpdateReligionInfo} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateDisplayPicture" component={UpdateDisplayPicture} options={{ headerShown: false }} />

        <Stack.Screen name="DeepLinkInterceptor" component={DeepLinkInterceptorScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }

  //if user is logged in as primary user
  if (userC.loginAs === 'primary') {
    return (
      <Stack.Navigator initialRouteName="HomeDrawer" screenOptions={{ headerShown: true }} >
        <Stack.Screen name="HomeDrawer" component={MainDrawerNavigator} user={userC} options={{ headerShown: false }} />
        <Stack.Screen name="StaredProfiles" component={StaredProfilesScreen} options={{ headerTitle: 'Stared Profiles' }} />
        <Stack.Screen name="ChooseAccount" component={ChooseAccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Notification" component={NotificationScreen} options={customStackHeader} />
        <Stack.Screen name="MyPreferences" component={MyPreferencesScreen} options={{ headerTitle: 'My Preferences' }} />
        <Stack.Screen name="DigitalMatchMaker" component={DigiMatchMakerTab}  options={{headerTitle:()=><CustomHeaderTitle />}}/>

        <Stack.Screen name="ConnectedFnF" component={ConnectedFnFScreen} options={{ headerTitle: 'Connected Family' }} />
        <Stack.Screen name="ShareProfile" component={ShareProfileScreen} options={{ headerTitle: 'Share connection with' }} />
        <Stack.Screen name="ViewProfile" component={ViewProfileScreen} options={{ headerShown: true, headerTitle: 'Profile' }} />
        <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: true, headerTitle: 'Contact us' }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={({ route }) => ({ title: route?.params?.name })} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerTitle: 'Edit Profile' }} />
        <Stack.Screen name="EditSibling" component={EditSiblingScreen} options={{ headerTitle: 'Edit Sibling' }} />
        <Stack.Screen name="EditUncle" component={EditUnclesScreen} options={{ headerTitle: 'Edit Uncle' }} />
        <Stack.Screen name="EditMaternalUncle" component={EditMaternalUnclesScreen} options={{ headerTitle: 'Edit Maternal Uncle' }} />
        <Stack.Screen name="PuserShareContacts" component={ShareContactsCommonScreen} options={{ headerTitle: 'Share your contacts' }} />
        <Stack.Screen name="MutualContacts" component={MutualContactsScreen} options={{ headerTitle: 'Mutual contacts' }} />

        <Stack.Screen name="Wallet" component={WalletScreen} options={{ headerTitle: 'My Wallet' }} />

        <Stack.Screen name="MeetingRecharge" component={RechargeScreen} options={{ headerTitle: 'My Meeting Recharge' }} />
        <Stack.Screen name="WalleteMeetingRecharge" component={WalletMeetingRechargeScreen} options={{ headerShown: false }} />

        <Stack.Screen name="ChooseTheme" component={ChooseTheme} options={{ headerTitle: 'Choose Theme' }} />
        <Stack.Screen name="BioFieldControl" component={BioFieldControl} options={{ headerTitle: 'Fields Control' }} />

        <Stack.Screen name="CreatePrimaryProfile" component={CreatePrimaryProfile} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateReligionInfo" component={UpdateReligionInfo} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateDisplayPicture" component={UpdateDisplayPicture} options={{ headerShown: false }} />
        <Stack.Screen name="ChangeDisplayPicture" component={ChangeDisplayPicture} options={{ headerTitle: 'Change DP' }} />

        <Stack.Screen name="DeepLinkInterceptor" component={DeepLinkInterceptorScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }

}

export default MainStackNavigator;

const CustomHeaderTitle = () => {
  return (
      <Text style={styles.headerTitle}>
          JODI<Text style={styles.wizard}>MAKER</Text>
      </Text>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      // fontFamily:theme.font.timesNew,
      color: theme.colors.primary, // Change this to your preferred color for "Matchmaking"
  },
  wizard: {
      color: theme.colors.secondaryMedium, // Change this to your preferred color for "Wizard"
  },
});
