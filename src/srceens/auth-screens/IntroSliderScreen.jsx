import React, { useEffect } from 'react'
import { useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Animated, Image, Dimensions, StatusBar, TouchableOpacity, Linking } from 'react-native'
import { RoundedButton } from '../../theme';
import theme from '../../theme/theme';
import PrimaryUserLoginScreen from './PrimaryUserLoginScreen';
import RoundedFilledButtonPrimary from '../../theme/RoundedFilledButtonPrimary';
// const bgs = ["#05626E", "#6435a5", "#5106b3", "#690169", "#40038f", "#5e08ce", "#05626E"]; // only 2 slider requested by client
const bgs = ["#11261F", "#B68C40", "#D6AC60", "#690169", "#690169", "#5e08ce", "#05626E"]; // background color changes as requested by client
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
  //   image: require('../../assets/images/splash_icon.png'),
  //   nativeImage: true
  // },
  {
    key: '5',
    title: 'Welcome',
    description: 'Discerning hearts deserve a bespoke approach to love. We create exceptional connections tailored to your unique desires.',
    // image: 'https://image.flaticon.com/icons/png/512/4927/4927656.png',
    image: require('../../assets/images/logo_dark.png'),
    subImage: require('../../assets/images/callwhite.png'),
    nativeImage: true
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
    key: '7',
    title: 'Get started',
    description: 'Continue using the App.',
    // image: 'https://image.flaticon.com/icons/png/512/1432/1432525.png',
    type: 'component',
    image: require('../../assets/images/logo_dark.png'),
    nativeImage: true
  },
];

const { width, height } = Dimensions.get('screen');

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: 'absolute', bottom: 10, flexDirection: 'row' }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp'
        });
        return <Animated.View
          key={`indicator-${i}`}
          style={{
            height: 10,
            width: 10,
            borderRadius: 10,
            backgroundColor: theme.colors.white,
            margin: 10,
            transform: [
              {
                scale,
              }
            ],
          }}
        />
      })}
    </View>
  )
}

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map(bg => bg)
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor
        }
      ]}
    />
  )
}

const Square = ({ scrollX }) => {
  const rotate = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width / 2),
    outputRange: bgs.map((_, i) => (i + 1) * 45 + 'deg')
  });
  return (
    <Animated.View
      style={
        {
          width: height,
          height: height,
          backgroundColor: 'white',
          borderRadius: 86,
          position: 'absolute',
          top: -height * 0.7,
          transform: [
            {
              rotate: rotate
            }
          ]
        }
      }
    />
  )
}

const SignUpSection = ({ navigation }) => {
  return (
    <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
      <RoundedFilledButtonPrimary onPress={() => navigation.navigate('LoginWithPhone')} title="Continue ➢" />
      {/* <RoundedButton onPress={() => navigation.navigate('PrimaryUserLogin')} title="Continue" /> */}
    </View>
  )
}


const IntroSliderScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shake = () => {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => shake());
    };

    shake();
  }, [shakeAnim]);

  const shakeInterpolation = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-15deg', '15deg'],
  });

  const makePhoneCall = () => {
    const phoneNumber = 'tel:+919748548624'; // Replace with your desired phone number
    Linking.openURL(phoneNumber).catch(err => console.error('Error occurred', err));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
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
          let xOffset = event.nativeEvent.contentOffset.x
          let contentWidth = event.nativeEvent.contentSize.width
          let value = xOffset / contentWidth
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, padding: 20 }}>
              <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={(item.nativeImage) ? item.image : { uri: item.image }} style={{ width: width / 2, height: width / 2, resizeMode: 'contain' }} />
              </View>
              <View style={{ flex: 0.5, padding: 20, justifyContent: 'flex-start', alignItems: 'center', marginTop: 30 }}>
                <Text style={{ color: theme.colors.white, fontSize: 34, fontWeight: 'bold', marginBottom: 10, fontFamily: theme.font.bold }}>{item.title}</Text>
                <Text style={{ textAlign: 'center', color: theme.colors.white, fontSize: 18, fontWeight: '400', marginBottom: 10, fontFamily: theme.font.regular }}>{item.description}</Text>
                {item.type ? <SignUpSection navigation={navigation} /> : null}
                <View style={{padding:20}}></View>
                {item.subImage ? (
                  <TouchableOpacity onPress={makePhoneCall}>
                    <View style={{borderColor:'white', borderWidth:5, height:width/4, width:width/4, justifyContent:'center', alignItems:'center', borderRadius:50}}>

                    <Animated.Image
                      source={item.nativeImage ? item.subImage : { uri: item.subImage }}
                      style={{
                        width: width / 6,
                        height: width / 4,
                        resizeMode: 'contain',
                        transform: [{ rotate: shakeInterpolation }],
                      }}
                    />
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          )
        }}
      />
      <Indicator scrollX={scrollX} />

    </View>
  )
}

export default IntroSliderScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
