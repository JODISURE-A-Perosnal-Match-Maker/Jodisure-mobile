import React, { useEffect, useRef, useContext, useMemo, useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { RoundedButton } from "../theme";
import theme from "../theme/theme";
import RoundedButtonTwo from "../theme/RoundedButtonTwo";
import { UserContext } from "../navigation";
import { useRoute } from "@react-navigation/native";

const fnfLoginIcon = require('../assets/images/fnfLoginIcon.png');
const { width, height } = Dimensions.get("screen");
const bgs = ["#690169", "#05626E", "#5106b3", "#690169"];

const DATA = [
  {
    key: "5",
    title: "Bride/Groom account",
    description:
      "Discover genuine connections through JodiSure's curated matchmaking. Verified profiles, insightful networks, and personalized guidance ensure a meaningful journey towards lasting love",
    type: "primary",
    image: require("../assets/images/logo_dark.png"),
    nativeImage: true,
  },
  {
    key: "7",
    title: "Mutual Family Link",
    description: `Empower your loved ones on JodiSure. Your insights and network can be the key to unlocking their perfect match. Be a part of their joy as they find lasting love.`,
    type: "family",
    image: require("../assets/images/logo_dark.png"),
    nativeImage: true,
  },
];

// Memoized Backdrop component to prevent re-renders
const Backdrop = React.memo(({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor }]} />;
});

// Memoized Indicator component
const Indicator = React.memo(({ scrollX }) => {
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
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
});

const ChooseAccountScreen = ({ navigation }) => {
  const { uid, isActive, profile, loginAs, loginFor, fetchingProfile, updateLoginAs, updateLoginFor } = useContext(UserContext);
  const route = useRoute();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [primaryButtonVisible, setPrimaryButtonVisible] = useState(undefined);
  const [createAccountVisible, setCreateAccountVisible] = useState(undefined);

  // Define the logic for button visibility when necessary data is available
  useEffect(() => {
    if (fetchingProfile !== undefined && isActive !== undefined && profile !== undefined) {
      setPrimaryButtonVisible(!fetchingProfile && isActive && profile?.onboarded);
      setCreateAccountVisible(!fetchingProfile && (!isActive || !profile?.onboarded));
    }
  }, [fetchingProfile, isActive, profile]);

  // Use useMemo to calculate the conditions only when necessary
  useEffect(()=>{
console.log("primaryButtonVisible",primaryButtonVisible,"createAccountVisible",createAccountVisible);

  },[primaryButtonVisible,createAccountVisible])

  useEffect(() => {
    if (route?.params?.invitedBy && route?.params?.screen === "AddUser") {
      setTimeout(() => navigation.navigate("AddUser", { id: route.params.invitedBy }), 1000);
    }
  }, [route]);

  const onPressPrimaryUser = useCallback(async () => {
    try {
      await updateLoginAs("primary");
      navigation.replace("HomeDrawer");
    } catch (error) {
      console.log(error);
    }
  }, [navigation, updateLoginAs]);

  const onFriendAndFamilyUser = useCallback(async () => {
    try {
      await updateLoginAs("fnf");
      navigation.replace("HomeDrawer");
    } catch (error) {
      console.log(error);
    }
  }, [navigation, updateLoginAs]);

  const openSignupPage = useCallback(() => {
    navigation.navigate("CreatePrimaryProfile");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.grey1} />
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
        renderItem={({ item }) => (
          <View style={{ width, paddingVertical: 40, paddingHorizontal: 30 }}>
            <View style={{ paddingTop: 50, flex: 0.7, alignItems: "center", justifyContent: "center" }}>
              <Image source={item.nativeImage ? item.image : { uri: item.image }} style={{ width: width, height: width / 2, resizeMode: "contain" }} />
            </View>
            <View style={{ padding: 10, justifyContent: "flex-start", alignItems: "center" }}>
              <Text style={{ color: theme.colors.black, fontSize: 20, fontWeight: "400", marginBottom: 50, fontFamily: theme.font.bold }}>{item.title}</Text>
              <Text style={{ textAlign: "center", color: theme.colors.black, fontSize: 16, fontWeight: "400", marginBottom: 10, fontFamily: theme.font.regular }}>
                {item.description}
              </Text>
              {item.type === "family" && (
                <RoundedButtonTwo icon={<Image source={fnfLoginIcon} style={{ height: 30, width: 35, marginRight: 20 }} />} onPress={onFriendAndFamilyUser} title="Share Contacts" />
              )}
              {item.type === "primary" && (
                <>
                  {primaryButtonVisible && <RoundedButton onPress={onPressPrimaryUser} title="Find your Match" />}
                  {createAccountVisible && (
                    <View style={{ alignItems: "center" }}>
                      <RoundedButton onPress={openSignupPage} title="Create bride/groom account" />
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
        )}
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
