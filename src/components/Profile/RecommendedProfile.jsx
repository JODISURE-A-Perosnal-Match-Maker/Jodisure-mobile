import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View, Image, Alert, TouchableOpacity, Text, Modal, Linking, Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";
import AntDesign from "react-native-vector-icons/AntDesign";
import { showMessage, hideMessage } from "react-native-flash-message";
import Profile from "../../components/Profile";
import RoundDarkButton from "../../components/RoundDarkButton";
import MutualContactsCard from "../../components/Profile/MutualContactsCard";
import { blockUser, checkOtherUserDPVisible, checkOtherUserFullPrivacy, isPUserPremium, starUser } from "../../services/UserService";
import { sendFriendRequest } from "../../services/RequestService";
import theme from "../../theme/theme";
import { DragableView } from "../SharedElement";
import PieChart from "react-native-pie-chart";
import { Button } from "react-native-elements";
import FastImage from 'react-native-fast-image';

const RecomendedProfile  = memo(({ uid, refresh, profile, overRideHazy = false }) => {
  const [userImage, setUserImage] = useState("https://picsum.photos/200/300");
  const [isFirstNameVisible, setIsFirstNameVisible] = useState(false);
  const [isAbleToViewProfile, setIsAbleToViewProfile] = useState(false);
  const [isOtherDPVisible, setIsOtherDPVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [infomodalVisible, setInfoModalVisible] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await isPUserPremium();
        console.log("overRideHazy--->", overRideHazy);
        setIsAbleToViewProfile(result);
        // console.log("Able to see???", isAbleToViewProfile)
      } catch (error) {
        console.error("Error checking profile access:", error);
      }
    };

    fetchData();

    // Clean-up function
    return () => {
      // Cleanup code here if needed
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const visibility = await checkOtherUserDPVisible(uid)
      const privacy = await checkOtherUserFullPrivacy(uid)
      console.log("checksssss------------------------------->", visibility);
      setIsOtherDPVisible(visibility)
    }
    fetchData();

  }, [uid])

  useEffect(() => {
    console.log("Able to see???", isAbleToViewProfile);
  }, [isAbleToViewProfile]);

  useEffect(() => {
    if (!uid) return;
    const subscriber = firestore()
      .collection("users")
      .doc(uid)
      .collection("images")
      .limit(1)
      .onSnapshot(async (querysnapshot) => {
        // console.log('qs',querysnapshot);
        querysnapshot.forEach((doc) => {
          if (doc.exists) {
            setUserImage(doc.data().url);
          }
        });
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [uid]);

  const formatField = (field) => {
    return field
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const doStarUser = () => {
    Alert.alert(
      "Are you sure?",
      "This profile will be added to your starred profile list.",
      [
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => {
            starUser(uid).then((res) => {
              refresh();
            });
          },
          style: "default",
        },
      ]
    );
  };
  const handleCallPress = () => {
    Linking.openURL(`tel:9748548623`);
  };
  const sendRequest = () => {
    sendFriendRequest(uid)
      .then((res) => {
        showMessage({
          message: "Sent!",
          description: "A connection request is sent to this user",
          type: "none",
        });
      })
      .catch((err) => {
        Alert.alert("Send request failed!!", err.message);
      });
  };

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <View style={styles.crossButton}>
          <TouchableOpacity onPress={doStarUser}>
            <AntDesign name="staro" size={24} color="#a05b85" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoButton}>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:9748548623`)}>

            <View >
              <AntDesign name="phone" size={24} color="#a05b85" />
            </View>
          </TouchableOpacity>
        </View>
        {userImage && (
          <Image
            style={styles.image}
            blurRadius={isOtherDPVisible ? 0 : 50}
            source={{ uri: userImage }}
          />
        )}

      </View>
      <View style={styles.profileDetailsContainer}>
        <View style={styles.dragContainer}>
          {profile?.similarityPercentage !== undefined ? (
            <DragableView onPress={() => setModalVisible(true)} >
              <View style={styles.box}>
                <PieChart
                  widthAndHeight={80}
                  series={[profile?.similarityPercentage, 100 - profile?.similarityPercentage]}
                  sliceColor={[theme.colors.secondaryDark2, theme.colors.boneWhite]}
                  coverRadius={0.7}
                  coverFill={theme.colors.boneWhite}
                />
                <Text style={styles.numberText}>{Math.round(profile?.similarityPercentage)}
                  <Text style={styles.percentText}>%</Text>

                </Text>
                <Text style={styles.numberText2}> JODI</Text>

              </View>
            </DragableView>) : null}
        </View>
        <Profile uid={uid} isFirstNameVisible={isFirstNameVisible} overRideHazy={overRideHazy}>

          <View style={{ padding: 16, marginBottom: 40 }}>
            <MutualContactsCard uid={uid} isNameNotShow={!isAbleToViewProfile} refresh={refresh} />
          </View>
        </Profile>
      </View>
      {Platform.OS === 'android' && (
      <View style={styles.buttonContainer}>
        <RoundDarkButton onPress={sendRequest} name="REQUEST TO VIEW PROFILE" style={styles.shadow} />
      </View>
      )}
      {/* modal starts here  */}
      {profile?.similarityPercentage !== undefined ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Mismatched Fields</Text>
              {profile.mismatchedFields.map((field, index) => (
                <Text key={index} style={styles.modalText}>
                  {formatField(field)}

                </Text>
              ))}
              <Button title="Close" onPress={() => setModalVisible(false)} />

            </View>
          </View>
        </Modal>) : null}
      <Modal
        animationType="slide"
        transparent={true}
        visible={infomodalVisible}
        onRequestClose={() => {
          setInfoModalVisible(!infomodalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Contact Us</Text>

            <Text k style={styles.modalText}>
              Found someone special? Connect directly or let our matchmakers introduce you! We value your privacy & transparency.  Pay only when you both agree to meet and unlock your hidden family network connections!  <Text style={styles.link} onPress={handleCallPress}>📞 Call Us </Text>to start your journey.
            </Text>

            <Button title=" OK " onPress={() => setInfoModalVisible(false)} />

          </View>
        </View>
      </Modal>
    </View>
  );
});

export default RecomendedProfile;

const styles = StyleSheet.create({
  link: {
    color: theme.colors.primaryDark, // You can replace this with your theme color
    // textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.secondaryDark2
  },
  modalText: {
    marginBottom: 15,
    color: theme.colors.secondaryMedium,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: theme.colors.boneWhite,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dragContainer: {
    margin: 15
  },
  percentText: {
    fontSize: 8, // Font size for the % symbol
  },
  numberText: {
    position: "absolute",
    top: "25%",
    fontSize: 18,
    color: theme.colors.grey0, // Replace with your desired text color
  },
  numberText2: {
    position: "absolute",
    fontSize: 12,
    top: '50%',
    // left: '50%',
    right: '35%',
    color: theme.colors.grey0, // Replace with your desired text color
  },
  box: {
    width: 80,
    height: 80,
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    borderRadius: 50,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    // Shadow properties for Android
    elevation: 5,
    zIndex:-100
  },
  paddedContainer: {
    padding: 16,
  },
  imageContainer: {},
  image: {
    height: 500,
    width: "100%",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow properties for Android
    elevation: 5,
  },
  crossButton: {
    position: "absolute",
    backgroundColor: "#d8d8d8",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    top: 1,
    right: 1,
    margin: 12,
    padding: 4,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoButton: {
    position: "absolute",
    backgroundColor: "#d8d8d8",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    top: 1,
    // right: 1,
    margin: 12,
    padding: 4,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profileDetailsContainer: {
    marginHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    top: -40,
    backgroundColor: theme.colors.white,
    marginBottom: -50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow properties for Android
    elevation: 5,

  },
  buttonContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 26,
  },
});
