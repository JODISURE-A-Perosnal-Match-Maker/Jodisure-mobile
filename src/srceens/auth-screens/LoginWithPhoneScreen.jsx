import React, { useState, useEffect, useRef, useCallback } from "react";

import styled from "styled-components/native";

import CheckBox from "@react-native-community/checkbox";
import Theme from "../../components/Theme";
import {
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  View,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { signInWithGoogle, signInWithPhone } from "../../services/AuthService";
import PhoneInput from "react-native-phone-input";

import OTPInputView from "@twotalltotems/react-native-otp-input";
import theme from "../../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { RoundedButton } from "../../theme";
import RoundedFilledButtonPrimary from "../../theme/RoundedFilledButtonPrimary";
import SliderButton from "../../components/SwiperButton";

const LoginWithPhoneScreen = (props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [phone, setPhone] = useState();
  const [phoneValid, setPhoneValid] = useState(false);
  const [otpValid, setOtpValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpStatus, setOtpStatus] = useState("pending"); // pending, sending, sent
  const [confirmResult, setConfirmResult] = useState();
  const [otp, setOtp] = useState();
  const navigation = useNavigation();
  const [timerCount, setTimer] = useState(30);
  const [enableResend, setEnableResend] = useState(false);

  useEffect(() => {
    let interval;
    if (otpStatus === "sent") {
      interval = setInterval(() => {
        if (timerCount > 0) {
          setTimer((lastTimerCount) => {
            lastTimerCount <= 1 && clearInterval(interval);
            return lastTimerCount - 1;
          });
        }
        console.log(timerCount);
      }, 1000);
    }

    return () => {
      if (otpStatus === "sent") {
        clearInterval(interval);
      }
    };
  }, [otpStatus]);

  const phoneInput = useRef();

  let LoadingComponent;

  if (loading) {
    LoadingComponent = (
      <LoadingIndicator style={{ alignItems: "center" }}>
        <ActivityIndicator size="large"></ActivityIndicator>
        <Theme.TextB>Please wait ...</Theme.TextB>
      </LoadingIndicator>
    );
  }

  const onChangePhoneNumber = (number) => {
    console.log(number);
    if (phoneInput.current.isValidNumber()) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
    setPhone(number);
  };

  const sendOTP = () => {
    if (!toggleCheckBox) {
      alert("You must agree to our terms and conditions.");
      return;
    }
    setLoading(true);
    setOtpStatus("pending");
    setTimer(30);
    signInWithPhone(phone, true)
      .then((confirmResult) => {
        console.log("Check for Confirm Result", confirmResult);
        setConfirmResult(confirmResult);
        setOtpStatus("sent");
      })
      .catch((err) => {
        console.log(err);
        alert("Some error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const verifyOTP = () => {
    setLoading(true);
    confirmResult
      .confirm(otp)
      .then((user) => {
        console.log("Check for user--->", user);
      })
      .catch((err) => {
        const { code, message } = err;
        if (code === "auth/invalid-verification-code") {
          Alert.alert("Error", "Invalid OTP");
          return;
        }
        if (code === "auth/missing-verification-code") {
          Alert.alert("Error", "Please enter OTP");
          return;
        }
        if (code === "auth/invalid-verification-id") {
          Alert.alert("Error", "Invalid OTP");
          return;
        }
        if (code === "auth/invalid-phone-number") {
          Alert.alert("Error", "Invalid phone number");
          return;
        }
        Alert.alert("Error", "Some error occured. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openTnC = () => {
    Linking.openURL("https://jodisure.com/#/terms&conditions");
  };

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Image
          source={require("../../assets/images/logo_dark.png")}
          style={{
            width: 90,
            height: 80,
            marginTop: 14,
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={styles.container}>
        {LoadingComponent}
        <View style={styles.infoSection}>
          <Text color="#536878" size="18px">
            Welcome
          </Text>
          <Text color="#536878" size="12px">
            Formerly known as Rivayatt
          </Text>
          <Text color="#536878" size="24px">
          JODI APKI SURETY HUMARI
          </Text>
        </View>
        <Section>
          <View style={{ flex: 1 }}>
            <View>
              <PhoneInput
                pickerBackgroundColor={theme.colors.primary}
                pickerButtonColor={theme.colors.white}
                cancelTextStyle={{ color: theme.colors.white }}
                confirmTextStyle={{ color: theme.colors.white }}
                style={styles.phoneInput}
                textStyle={styles.phoneTextInput}
                initialCountry="in"
                ref={phoneInput}
                initialValue={phone}
                textProps={{
                  placeholder: "Enter a phone number...",
                  placeholderTextColor: theme.colors.primary,
                }}
                onChangePhoneNumber={onChangePhoneNumber}
              />
            </View>
            <View>
              {otpStatus === "sent" && (
                <OTPInputView
                  style={{ width: "100%", height: 200 }}
                  pinCount={6}
                  autoFocusOnLoad={false}
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={(code) => {
                    console.log(`Code is ${code}, you are good to go!`);
                    setOtp(code);
                    setOtpValid(true);
                  }}
                />
              )}
            </View>
            {
              (otpStatus === "pending" || timerCount === 0) && phoneValid && (
                <Button
                  onPress={sendOTP}
                  style={{
                    borderRadius: 25,
                    backgroundColor: "#B3A06B",
                  }}
                >
                  <IconImage
                    source={require("./../../assets/images/call-ico-outline.png")}
                  ></IconImage>
                  <ButtonText>Send OTP</ButtonText>
                </Button>
              )
              //         <>
              //   <RoundedFilledButtonPrimary icon={<Image source={require('./../../assets/images/call-icon-trans.png')} style={{ height: 35, width: 35, marginRight: 20 }} />} onPress={() => sendOTP()} title="Send OTP" />
              //         </>
            }
            {otpStatus === "sent" && timerCount > 0 && (
              <BlackText>Resend in {timerCount} sec </BlackText>
            )}
            {otpStatus === "sent" && otpValid && (
              <Button
                onPress={verifyOTP}
                style={{
                  borderRadius: 25,
                  backgroundColor: "#B3A06B",
                }}
              >
                <ButtonText>Submit</ButtonText>
              </Button>
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: "black", false: "black" }}
              />
              <Text>I agree Terms & Condition.</Text>
            </View>
            <View>
              <Button
                onPress={openTnC}
                style={{
                  borderRadius: 25,
                  backgroundColor: "#B3A06B",
                }}
              >
                <ButtonText>View Terms & Conditions</ButtonText>
              </Button>
            </View>
          </View>
        </Section>

        <SliderButton width={'90%'} backgroundColor={["#B3A06B", "black"]} iconColor="white" sliderColor={"black"} onSlideCompleted={() => { navigation.navigate("LoginWithEmail"); }} text="Slide to login via email" />
        {/* <PromoSection>
          <PromoText>Promotional Content</PromoText>
          <PromoImage source={require('./../../assets/images/group_19.png')}></PromoImage>
        </PromoSection> */}
        {/* <View style={styles.emailLoginStyle}>
          <PromoText> If your account has been made by Matchmaker </PromoText>
          <Button
                  onPress={()=>{navigation.navigate("LoginWithEmail");}}
                  style={{
                    borderRadius: 25,
                    backgroundColor: theme.colors.primary,
                  }}
                >
                  <ButtonText>Click here to login</ButtonText>
                </Button>
        </View> */}
        <TouchableOpacity>
          <ContactUsText
            style={{ marginBottom: 15 }}
            onPress={() => {
              navigation.navigate("ContactUs");
            }}
          >
            Contact Us
          </ContactUsText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginWithPhoneScreen;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  splashIcon: {
    width: 90,
    height: 60,
    marginTop: 14,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  section: {
    width: "90%",
    margin: 16,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 4,
    flex: 1,
  },
  infoSection: {
    backgroundColor: "#ffffff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 37,
    justifyContent: "center",
    alignItems: "center",
  },
  phoneInput: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 6,
    borderWidth: 1,
  },
  phoneTextInput: {
    backgroundColor: "white",
    fontSize: 18,
    color: theme.colors.black,
  },
  otpInputView: {
    width: "100%",
    height: 200,
  },
  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    borderBottomWidth: 1,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.black,
  },
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#2C251B",
    padding: 15,
    marginTop: 20,
    borderRadius: 25,
  },
  buttonText: {
    textAlign: "center",
    color: "#2C251B",
    fontSize: 14,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 12,
  },
  blackText: {
    textAlign: "center",
    color: "#000000",
    fontSize: 14,
  },
  loadingIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 9999,
  },
  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  contactUsText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    backgroundColor:"black",  
    fontWeight: "bold",
    marginBottom: 15,
  },
});

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
`;

const Section = styled.View`
  width: 90%;
  margin: 16px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 4px;
  flex: 1;
`;

const InfoSection = styled.View`
  background-color: #ffffff;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 37px;
  display: flex;  // Added missing semicolon
  justify-content: center;  // Added missing semicolon
  align-items: center;  // Added missing semicolon
`;

const PromoSection = styled.View`
  width: 80%;
  margin: 20px;
  background-color: #bd6f9e;
  padding: 20px;
  border-radius: 7px;
  height: 153px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  color: #93bbca;
  font-size: 18px;
`;

const Text = styled.Text`
  color: #242424;
  font-family: Barlow-Regular;
  font-size: 14px;
`;

const IconImage = styled.Image`
  width: 24px;
  height: 24px;
  resize-mode: contain;
  margin-right: 12px;
`;

const PromoImage = styled.Image`
  width: 139px;
  height: 139px;
  resize-mode: contain;
  margin-right: 12px;
`;

const PromoText = styled.Text`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: "2C251B";
  padding: 15px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  font-family: Barlow-Regular;
  text-align: center;
  color: #F9F6EE;
  font-size: 14px;
`;

const BlackText = styled.Text`
  font-family: Barlow-Regular;
  text-align: center;
  color: #000000;
  font-size: 14px;
`;

const IagreeSection = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  flex: 1;
`;

const ContactUsText = styled.Text`
  text-align: center;
  color: #a05b85;
  font-size: 16px;
  font-weight: bold;
`;

const LoadingIndicator = styled.View`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  justify-content: center;
  flex: 1;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 9999;
`;
