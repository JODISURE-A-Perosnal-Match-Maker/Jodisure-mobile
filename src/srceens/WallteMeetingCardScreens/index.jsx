import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import MeetingRechargeInfoCard from "../../components/MeetingRechargeCard";
import SubscriptionInfoCard from "../../components/SubscriptionInfoCard";
import { Icon, Image, Text } from "react-native-elements";
import Svg, { G, Path } from "react-native-svg";
const WalletMeetingRechargeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.banner} >
        <Image style={styles.img} source={Platform.OS === 'android' 
                ? require('./../../assets/images/couple-outline.png') 
                : require('./../../assets/images/Poly.png')} />
        {/* <Image style={styles.img} source={require('./../../assets/images/Poly.png')} /> */}

        <Text style={styles.bannerText}>
          {/* mjhasfasf */}
        </Text>
      </View>
      {/* Floating cards */}
      <View style={styles.overlay}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <MeetingRechargeInfoCard />
          </View>
          <View style={styles.card}>
            <SubscriptionInfoCard />

          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Follow us on</Text>
        <View style={styles.socialIcons}>
          <Icon
            name="facebook-square"
            type="font-awesome"
            size={30}
            color="#3b5998"
            onPress={() => Linking.openURL('https://www.facebook.com/share/jko3eoimVqe4G6zo/?mibextid=qi2Omg')}
            />
          <Icon
            name="whatsapp"
            type="font-awesome-5"
            size={30}
            color="#25D366"
            onPress={() => Linking.openURL('https://wa.me/9748548623')}
            />
          <Icon
            name="instagram"
            type="font-awesome"
            size={30}
            color="#c32aa3"
            onPress={() => Linking.openURL('https://www.instagram.com/jodisure_matrimony/')}
            />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  svg: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    height: "20%",
    width: "100%"
  },
  img: {
    width: 500,
    height: 600,
    right: -15,
    top: -10,
    resizeMode: 'contain'
  },
  banner: {
    height: "25%", // Adjust as needed
    backgroundColor: "#C0448F", // Change color as needed
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Position the overlay to cover the entire parent
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    paddingTop: 200,
    width: "80%",
    backgroundColor: "transparent", // Make the container transparent
  },
  card: {
    // aspectRatio: 1, // Make the cards square
    height: "41%",

    backgroundColor: "lightgrey",
    borderRadius: 10,
    marginBottom: 20, // Add margin between cards
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Add shadow for elevation effect
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#f2f2f2",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  footerText: {
    fontSize: 18,
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
  },
});

export default WalletMeetingRechargeScreen;
