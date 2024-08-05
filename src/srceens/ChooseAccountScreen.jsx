// import React, { useContext, useEffect } from 'react'
// import { StyleSheet, Text, View, Image, Dimensions, StatusBar, Linking } from 'react-native';
// import { RoundedButton } from '../theme';
// import theme from "../theme/theme";
import { UserContext } from "../navigation";
// import { TouchableOpacity } from 'react-native';
import Theme from '../components/Theme';
import { useRoute } from "@react-navigation/native";
// import styled from 'styled-components/native';
// const LogoIcon = require('../assets/images/splash_icon.png');
const fnfLoginIcon = require('../assets/images/fnfLoginIcon.png')
// const { width, height } = Dimensions.get('screen');
// import AnimatedLogo from '../components/AnimatedLogo';
// const primary = theme.colors.grey0;

// const Backdrop = () => {
//   return (
//     <View
//       style={[
//         StyleSheet.absoluteFillObject,
//         {
//           backgroundColor: '#05626E'
//         }
//       ]}
//     />
//   )
// }

// const Square = () => {
//   return (
//     <View
//       style={
//         {
//           width: height,
//           height: height,
//           backgroundColor: 'white',
//           borderRadius: 86,
//           position: 'absolute',
//           top: -height * 0.7,
//           transform: [
//             {
//               rotate: '45 deg'
//             }
//           ]
//         }
//       }
//     />
//   )
// }
// const ChooseAccountScreen = ({ navigation }) => {

//   const { uid, isActive, profile, loginAs, loginFor, fetchingProfile, updateLoginAs, updateLoginFor } = useContext(UserContext);
//   const route = useRoute();
//   console.log("Total", (!fetchingProfile && (!isActive || !profile?.onboarded)))
//   useEffect(() => {
//     if (!route.params) return;
//     const { invitedBy, screen } = route.params;
//     if (invitedBy && screen && screen === 'AddUser') {
//       setTimeout(() => {
//         navigation.navigate('AddUser', { id: invitedBy });
//       }, 1000);

//     }
//   }, [route]);

//   useEffect(() => {
//     console.log('useEffect isActive: ' + isActive);
//   }, [isActive])

//   const onPressPrimaryUser = async () => {
//     try {
//       console.log('swith to primary');
//       await updateLoginAs('primary');
//       navigation.replace('HomeDrawer')
//     } catch (error) {
//       // saving error
//       console.log(error)
//     }
//   }

//   const onFriendAndFamilyUser = async () => {
//     try {
//       console.log('switch to fnf');
//       await updateLoginAs('fnf');
//       navigation.replace('HomeDrawer')
//     } catch (error) {
//       // saving error
//       console.log(error)
//     }
//   }

//   const openSignupPage = async () => {
//     // await Linking.openURL('https://rivayatt-3c9d5.firebaseapp.com/profile');
//     navigation.navigate('CreatePrimaryProfile');
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />
//       {/* <Backdrop /> */}
//       {/* <Square /> */}
//       <View style={{ width, height, padding: 20 }}>
//         <View style={styles.imageContainer}>
//           {/* <Image source={LogoIcon} style={{ width: width / 2, height: width / 2, resizeMode: 'contain' }} /> */}
//           {/* <AnimatedLogo /> */}
//           <Image source={require('../assets/images/Logo.png')}></Image>
//           {/* <Image style={{ width: width / 2, height: width / 2, resizeMode: 'contain' }} source={require('../assets/images/splash_icon.png')}></Image> */}

//         </View>

//         <View style={{ flex: 0.5, padding: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
//           {/* <TouchableOpacity>
//             <Text style={{ color: theme.colors.white, fontSize: 34, fontWeight: 'bold', marginBottom: 10, marginTop: 20, fontFamily: theme.font.bold }}>Continue as</Text>
//           </TouchableOpacity> */}
//           <View style={{ padding: 15 }}>
//             <Theme.TextB color="#969696" size="14px">Continue using the App</Theme.TextB>
//           </View>
//           <View>

//           </View>

//           {(!fetchingProfile && isActive && profile?.onboarded) && <RoundedButton onPress={() => onPressPrimaryUser()} title="Ready to find your perfect match? Get started now" />}

//           <RoundedButton icon={<Image source={fnfLoginIcon} style={{ height: 30, width: 35, marginRight: 20 }} />} onPress={() => onFriendAndFamilyUser()} title="Support your loved ones in their matchmaking process" />

//           {(!fetchingProfile && (!isActive || !profile?.onboarded)) && <View style={{ alignItems: 'center' }}>
//             <Theme.Text color="red" style={{ marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
//               You don't have a primary account yet.
//             </Theme.Text>
//             <TouchableOpacity onPress={openSignupPage}>
//               <Theme.TextB color={theme.colors.primary} size="20px">Create primary account</Theme.TextB>
//             </TouchableOpacity>
//           </View>}
//           {fetchingProfile && <View style={{ alignItems: 'center' }}>
//             <Theme.Text color={theme.colors.primary} style={{ marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
//               Looking for primary account! please wait...
//             </Theme.Text>
//           </View>}
//         </View>
//         <TouchableOpacity>
//           <ContactUsText onPress={() => {
//             navigation.navigate(
//               'ContactUs'
//             )
//           }}>Contact Us</ContactUsText>
//         </TouchableOpacity>
//       </View>

//     </View>
//   )
// }

// // export default ChooseAccountScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   imageContainer: {
//     flex: 0.4,
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// })

// const ContactUsText = styled.Text`
//     text-align:center;
//     color:#a05b85;
//     font-size:18px;
//     font-weight:bold;
// `;

import React from "react";
import { useRef, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { RoundedButton } from "../theme";
// import theme from '../../theme/theme';
import theme from "../theme/theme";
import RoundedButtonTwo from "../theme/RoundedButtonTwo";
// const bgs = ["#05626E", "#6435a5", "#5106b3", "#690169", "#40038f", "#5e08ce", "#05626E"]; // only 2 slider requested by client
const bgs = [
  "#690169",
  "#05626E",
  "#5106b3",
  "#690169",
  "#690169",
  "#5e08ce",
  "#05626E",
]; // background color changes as requested by client
const DATA = [
  // {
  //   key: '1',
  //   title: '1',
  //   description: 'Register with us and receive a complimentary artistic bio data at your verified email address.',
  //   // image: 'https://image.flaticon.com/icons/png/512/4446/4446266.png',
  //   image: require('../../assets/images/slider_ico1.png'),
  //   nativeImage: true
  // },
  // {
  //   key: '2',
  //   title: '2',
  //   description: 'Verification of your profile subject to our relevant standards',
  //   // image: 'https://image.flaticon.com/icons/png/512/4893/4893370.png',
  //   image: require('../../assets/images/group_19.png'),
  //   nativeImage: true
  // },
  // {
  //   key: '3',
  //   title: '3',
  //   description: 'Send a request to the individual you would like to know more about or chat with. Our mutual contact feature will come in handy.',
  //   // image: 'https://image.flaticon.com/icons/png/512/4446/4446315.png',
  //   image: require('../../assets/images/invite_group.png'),
  //   nativeImage: true
  // },
  // {
  //   key: '4',
  //   title: '4',
  //   description: 'Get your closes ones to download the app to facilitate your matchmaking process. Though, no one except the primary user will be able to use the app',
  //   // image: 'https://image.flaticon.com/icons/png/512/1402/1402087.png',
  //   image: require('../assets/images/splash_icon.png'),
  //   nativeImage: true
  // },
  {
    key: "5",
    title: "Bride/Groom account",
    description:
      "Discover genuine connections through JodiSure's curated matchmaking. Verified profiles, insightful networks, and personalized guidance ensure a meaningful journey towards lasting love",
    // image: 'https://image.flaticon.com/icons/png/512/4927/4927656.png',
    type: "primary",
    image: require("../assets/images/splash_icon_old.png"),
    nativeImage: true,
  },
  // {
  //   key: '6',
  //   title: '6',
  //   description: 'If all things workout meet the individual and decide for yourself.',
  //   image: 'https://image.flaticon.com/icons/png/512/4446/4446276.png',
  //   image: require('../../assets/images/invite_group.png'),
  //   nativeImage: true
  // },
  {
    key: "7",
    title: "Family and Friends account",
    description: `Empower your loved ones on JodiSure. Your insights and network can be the key to unlocking their perfect match. Be a part of their joy as they find lasting love.`,
    // image: 'https://image.flaticon.com/icons/png/512/1432/1432525.png',
    type: "family",
    image: require("../assets/images/splash_icon_old.png"),
    nativeImage: true,
  },
];

const { width, height } = Dimensions.get("screen");

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: "absolute", bottom: 10, flexDirection: "row" }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 10,
              backgroundColor: theme.colors.grey0,
              margin: 10,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

const Square = ({ scrollX }) => {
  const rotate = scrollX.interpolate({
    inputRange: bgs.map((_, i) => (i * width) / 2),
    outputRange: bgs.map((_, i) => (i + 1) * 45 + "deg"),
  });
  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: "white",
        borderRadius: 100,
        position: "absolute",
        top: -height * 0.7,
        transform: [
          {
            rotate: rotate,
          },
        ],
      }}
    />
  );
};

// const SignUpSection = ({ navigation }) => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         width: "100%",
//         justifyContent: "flex-start",
//         alignItems: "center",
//       }}
//     >
//       <RoundedButton
//         onPress={() => navigation.navigate("LoginWithPhone")}
//         title="Continue ➢"
//       />
//       {/* <RoundedButton onPress={() => navigation.navigate('PrimaryUserLogin')} title="Continue" /> */}
//     </View>
//   );
// };

const ChooseAccountScreen = ({ navigation }) => {
  const {
    uid,
    isActive,
    profile,
    loginAs,
    loginFor,
    fetchingProfile,
    updateLoginAs,
    updateLoginFor,
  } = useContext(UserContext);
  const route = useRoute();
  console.log("Total", !fetchingProfile && (!isActive || !profile?.onboarded));
  useEffect(() => {
    if (!route.params) return;
    const { invitedBy, screen } = route.params;
    if (invitedBy && screen && screen === "AddUser") {
      setTimeout(() => {
        navigation.navigate("AddUser", { id: invitedBy });
      }, 1000);
    }
  }, [route]);

  useEffect(() => {
    console.log("useEffect isActive: " + isActive);
  }, [isActive]);

  const onPressPrimaryUser = async () => {
    try {
      console.log("swith to primary");
      await updateLoginAs("primary");
      navigation.replace("HomeDrawer");
    } catch (error) {
      // saving error
      console.log(error);
    }
  };

  const onFriendAndFamilyUser = async () => {
    try {
      console.log("switch to fnf");
      await updateLoginAs("fnf");
      navigation.replace("HomeDrawer");
    } catch (error) {
      // saving error
      console.log(error);
    }
  };

  const openSignupPage = async () => {
    // await Linking.openURL('https://rivayatt-3c9d5.firebaseapp.com/profile');
    navigation.navigate("CreatePrimaryProfile");
  };
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.grey1} />
      {/* <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} /> */}
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        pagingEnabled={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onScrollEndDrag={(event) => {
          //code here
          let xOffset = event.nativeEvent.contentOffset.x;
          let contentWidth = event.nativeEvent.contentSize.width;
          let value = xOffset / contentWidth;
        }}
        renderItem={({ item }) => {
          return (
            <View style={{
              width,
              // paddingVertical: 40, // Adjusted padding
              paddingHorizontal: 30, // Adjusted padding 
            }}>
              <View
                style={{
                  paddingTop: 50,
                  flex: 0.7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image source={item.nativeImage ? item.image : { uri: item.image }}
                  style={{
                    width: width,
                    height: width / 2,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View
                style={{
                  // flex: 0.5,
                  padding: 10,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  // marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.black,
                    fontSize: 20,
                    fontWeight: "400",
                    marginBottom: 50,
                    fontFamily: theme.font.bold,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: theme.colors.black,
                    fontSize: 16,
                    fontWeight: "400",
                    marginBottom: 10,
                    fontFamily: theme.font.regular,
                    paddingBottom: 50
                  }}
                >
                  {item.description}
                </Text>
                {/* {item.type && <SignUpSection navigation={navigation} />} */}
                {item.type === "family" ? (
                  // Render something for type 'family'
                  <RoundedButton icon={<Image source={fnfLoginIcon} style={{ height: 30, width: 35, marginRight: 20 }} />} onPress={() => onFriendAndFamilyUser()} title="Get connected" />

                ): null}
                {item.type === "primary" ? (
                  // Render something specific for type 'something'
                  <>
                    {/* Example: */}
                    {!fetchingProfile && isActive && profile?.onboarded ? (
                      // Render something 2.1 if conditions are met
                      <RoundedButtonTwo
                        onPress={() => onPressPrimaryUser()}
                        title="Find your Match"
                      />
                    ) : null}

                    {!fetchingProfile && (!isActive || !profile?.onboarded) ? (
                      <View style={{ alignItems: "center" }}>
                        {/* <TouchableOpacity onPress={openSignupPage}>
                          <Theme.TextB color={theme.colors.primary} size="20px">
                          Create bride/groom account
                          </Theme.TextB>
                        </TouchableOpacity> */}
                        <RoundedButtonTwo
                        onPress={() => openSignupPage()}
                        title="Create bride/groom account"
                      />
                      </View>
                    ) : null}

                    {fetchingProfile ? (
                      <View style={{ alignItems: "center" }}>
                        <Theme.Text
                          color={theme.colors.primary}
                          style={{
                            marginTop: 20,
                            marginBottom: 20,
                            textAlign: "center",
                          }}
                        >
                          Looking for primary account! please wait...
                        </Theme.Text>
                      </View>
                    ) : null}

                  </>
                ): null}
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
};

export default ChooseAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.boneWhite,
    alignItems: "center",
    justifyContent: "center",
  },
});
