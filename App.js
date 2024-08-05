import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';
import theme from './src/theme/theme';

import SplashScreen from 'react-native-splash-screen'
import FlashMessage from "react-native-flash-message";
import RootNavigation from './src/navigation';


import NotificationModal from './src/components/NotificationModal';
import { TourGuideProvider } from 'rn-tourguide';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import VersionCheck from 'react-native-version-check';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';





const App = () => {
  // related to notification modal
  const [notification, setNotification] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    SplashScreen.hide();
    console.log(RootNavigation);
  }, [RootNavigation]);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setVisible(false);
      console.log(remoteMessage.notification);
      setNotification(remoteMessage.notification);
      setVisible(true);
    });

    return unsubscribe;
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <AutocompleteDropdownContextProvider>

        <ThemeProvider theme={theme}>
          <TourGuideProvider {...{ borderRadius: 16 }}>
            <SafeAreaView style={styles.container}>
              <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.white} />
              <RootNavigation />
              <FlashMessage position="bottom" style={{ backgroundColor: theme.colors.primaryDark }} />
              <NotificationModal visible={visible} setVisible={setVisible} notification={notification} />
            </SafeAreaView>
          </TourGuideProvider>
        </ThemeProvider>
      </AutocompleteDropdownContextProvider>

    </GestureHandlerRootView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
