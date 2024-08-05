import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'
import NotificationScreen from '../srceens/NotificationScreen';
import CustomNotificationBell from '../components/CustomNotificationBell';
import { UserContext } from '.';
import { LogoTitle } from './mainStackNavigator';
import ChooseAccountScreen from '../srceens/ChooseAccountScreen';
import PendingUserDrawerContent from './PendingUserDrawerContent';
import ManageImageGalleryScreen from '../srceens/primary-user-screens/ManageImageGalleryScreen';
import ConnectedFnFScreen from '../srceens/primary-user-screens/ConnectedFnFScreen';
import EditProfileScreen from '../srceens/primary-user-screens/EditProfileScreen';
import EditSiblingScreen from '../srceens/primary-user-screens/EditSiblingsScreen';
import EditUnclesScreen from '../srceens/primary-user-screens/EditUnclesScreen';
import EditMaternalUnclesScreen from '../srceens/primary-user-screens/EditMaternalUnclesScreen';
import WalletScreen from '../srceens/primary-user-screens/WalletScreen';
import ShareContactsCommonScreen from '../srceens/ShareContactsCommonScreen';
import DeepLinkInterceptorScreen from '../srceens/DeepLinkInterceptorScreen';
import ChangeDisplayPicture from '../srceens/primary-user-screens/ManageImageGalleryScreen/ChangeDisplayPicture';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const customHeader = {
  headerShown: true,
  headerTintColor: '#00333a',
  headerTitle: props => <LogoTitle {...props} />,
  headerTitleAlign: 'center',
  headerBackImage: () => (<Ionicons name="ios-arrow-back" size={24} color="#00333a" />),
  headerRight: (props) => {
    return (
      <CustomNotificationBell {...props} />
    )
  }
};

const DrawerNavigator = (props) => {
  const userC = useContext(UserContext);
  return (
    <Drawer.Navigator initialRouteName="Notification" drawerContent={(props) => <PendingUserDrawerContent {...props} userC={userC} />}>
      <Drawer.Screen name="Notification" component={NotificationScreen} options={customHeader} />
      <Drawer.Screen name="ChooseAccount" component={ChooseAccountScreen} options={customHeader} />
      <Drawer.Screen name="ManageImageGallery" component={ManageImageGalleryScreen} options={customHeader} />
      <Drawer.Screen name="ConnectedFnF" component={ConnectedFnFScreen} options={customHeader} />
      <Stack.Screen name="PuserShareContacts" component={ShareContactsCommonScreen} options={{ headerTitle: 'Share your contacts' }} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} options={customHeader} />
      <Stack.Screen name="Wallet" component={WalletScreen} options={{ headerTitle: 'My Wallet' }} />
      <Stack.Screen name="ChangeDisplayPicture" component={ChangeDisplayPicture} options={{ headerTitle:'Change DP' }} />
      <Stack.Screen name="DeepLinkInterceptor" component={DeepLinkInterceptorScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  )
}

const UnapprovedUserStackNavigator = () => {
  const userC = useContext(UserContext);
  return (
    <Stack.Navigator initialRouteName="HomeDrawer">
      <Stack.Screen name="HomeDrawer" component={DrawerNavigator} user={userC} options={{ headerShown: false }} />
      <Stack.Screen name="EditSibling" component={EditSiblingScreen} options={{ headerTitle: 'Edit Sibling' }} />
      <Stack.Screen name="EditUncle" component={EditUnclesScreen} options={{ headerTitle: 'Edit Uncle' }} />
      <Stack.Screen name="EditMaternalUncle" component={EditMaternalUnclesScreen} options={{ headerTitle: 'Edit Maternal Uncle' }} />
    </Stack.Navigator>
  )
}

export default UnapprovedUserStackNavigator;