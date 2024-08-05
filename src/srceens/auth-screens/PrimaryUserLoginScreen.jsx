import React, { useState, useEffect } from 'react';


import styled from 'styled-components/native';

import CheckBox from '@react-native-community/checkbox';
import Theme from '../../components/Theme';
import { TouchableOpacity, ActivityIndicator, Image, ScrollView, View } from 'react-native';
import { signInWithGoogle } from '../../services/AuthService';


const Container = styled.View`
    flex:1;
    justify-content:flex-start;
    align-items:center;
    background-color:#fff;
`;

const Section = styled.View`
    width:90%;
    margin:16px;
    background-color:#decbd5;
    padding:20px;
    border-radius:4px;
    flex:1;
`;
const InfoSection = styled.View`
    background-color:#ffffff;
    padding-left:16px;
    padding-right:53px;
    padding-top:37px;
`;
const PromoSection = styled.View`
    width:90%;
    margin:20px;
    background-color:#bd6f9e;
    padding:20px;
    border-radius:7px;
    height:153px;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`;

const Title = styled.Text`
    color:#93bbca;
    font-size:18px;
`;

const Text = styled.Text`
    color:#242424;
    font-family:Barlow-Regular;
    font-size:14px;
`;

const IconImage = styled.Image`
    width:24px;
    height:24px;
    resize-mode: contain;
    margin-right:12px;
`;
const PromoImage = styled.Image`
    width:139px;
    height:139px;
    resize-mode: contain;
    margin-right:12px;
`;


const PromoText = styled.Text`
    flex:1;
    color:#fff;
    font-size:14px;
    font-weight:bold;
`;

const Button = styled.TouchableOpacity`
    flex-direction:row;
    align-items:center;
    justify-content:center;
    width:100%;
    background-color:#fff;
    padding:15px;
    margin-top:20px;
`

const ButtonText = styled.Text`
    font-family:Barlow-Regular;
    text-align:center;
    color:#2c2e3f;
    font-size:14px;
`;

const IagreeSection = styled.View`
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin-top:12px;
`;

const ContactUsText = styled.Text`
    text-align:center;
    color:#a05b85;
    font-size:16px;
    font-weight:bold;
`;

const LoadingIndicator = styled.View`
    position:absolute;
    left:0px;
    right:0px;
    top:0px;
    bottom:0px;
    /* allign-items:center; */
    justify-content:center;
    flex:1;
    background-color:rgba(255,255,255,0.5);
    z-index:9999;
`;

const PrimaryUserLoginScreen = (props) => {

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEmail] = useState('factedu@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  let LoadingComponent;

  if (loading) {
    LoadingComponent = (
      <LoadingIndicator style={{ alignItems: 'center' }}>
        <ActivityIndicator size="large">
        </ActivityIndicator>
        <Theme.TextB>Please wait signing you in...</Theme.TextB>
      </LoadingIndicator>
    );
  }

  const loginWithGoogle = () => {
    if (!toggleCheckBox) {
      alert('You must agree to terms and conditions to use this app.');
      return;
    }
    return signInWithGoogle().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  const signInWithEmailAndPassword = () => { }

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
        <Image source={require('../../assets/images/Logo.png')} style={{ width: 66, height: 29, marginTop: 14, resizeMode: 'contain' }} />
      </View>
      <Container>
        {LoadingComponent}
        <InfoSection>
          <Theme.TextB color="#93bbca" size="18px">Welcome</Theme.TextB>
          <Theme.Text color="#93bbca" size="14px">Login to your account to get connected with your real life partner</Theme.Text>
        </InfoSection>
        <Section>
          <Button onPress={loginWithGoogle}>
            <IconImage source={require('./../../assets/images/google.png')}></IconImage>
            <ButtonText>Sign In</ButtonText>
          </Button>
          {/* <Button onPress={signInWithEmailAndPassword}>
            <IconImage source={require('./../../assets/images/yahoo.png')}></IconImage>
            <ButtonText>Sign In</ButtonText>
          </Button>
          <Button onPress={() => props.navigation.navigate('Login')}>
            <IconImage source={require('./../../assets/images/windows.png')}></IconImage>
            <ButtonText>Sign In</ButtonText>
          </Button>
          <Button>
            <IconImage source={require('./../../assets/images/apple.png')}></IconImage>
            <ButtonText>Sign In</ButtonText>
          </Button> */}
          <Button onPress={() => props.navigation.navigate('LoginWithPhone')}>
            <IconImage source={require('./../../assets/images/call_icon.png')}></IconImage>
            <ButtonText>Sign In</ButtonText>
          </Button>
          <IagreeSection>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text>I agree Terms & Condition need content</Text>
          </IagreeSection>

        </Section>
        <PromoSection>
          <PromoText>Promotional Content</PromoText>
          <PromoImage source={require('./../../assets/images/group_19.png')}></PromoImage>
        </PromoSection>
        <TouchableOpacity>
          <ContactUsText>Contact Us</ContactUsText>
        </TouchableOpacity>
      </Container>
    </ScrollView>
  );
}

export default PrimaryUserLoginScreen;