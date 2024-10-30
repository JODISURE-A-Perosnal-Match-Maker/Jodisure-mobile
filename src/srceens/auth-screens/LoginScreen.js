import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert, Image, Dimensions } from 'react-native';
import { Card, Text, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInWithGoogle } from '../../services/AuthService';
import theme from '../../theme/theme';
import auth from '@react-native-firebase/auth';
import Theme from '../../components/Theme';

const Colors = theme.colors;
const { width, height } = Dimensions.get('screen');


const LoginWithEmailScreen = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithGoogle();
      console.log(res);
    } catch (err) {
      console.error(err);
      showAlert("Wrong credentials");

    } finally {
      setLoading(false);
    }
  };


  const showAlert = (message) => {
    Alert.alert(
      "Error",
      message,
      [{ text: "OK" }],
      { cancelable: false }
    );
  };

  const signInWithEmailAndPassword = async () => {
    setLoading(true);
    setError('');
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('User signed in');
    } catch (err) {
      setError(err.message);
      console.error(err);
      showAlert("Wrong credentials");
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo_dark.png")}
        style={{
          width: width/2,
          height: width/2,
          // marginTop: 14,
          // marginBottom:-200,
          resizeMode: "contain",
        }}
      />
      <View style={{ justifyContent: 'center', alignContent: 'center', width: '90%', alignItems: 'center' , margin:10}}>

        <Theme.TextB style={{ textAlign: 'center' }} >
          If your account has been created by mathcmaker please use given Email ID and password here to login.

        </Theme.TextB>
      </View>

      <Card containerStyle={styles.card}>
        {loading && <ActivityIndicator size="large" />}
        <Input
          placeholder="Email"
          leftIcon={<Icon name="envelope" color="white" />}
          value={email}
          onChangeText={setEmail}
          inputStyle={{ color: 'white' }} // Change this to your desired color
          placeholderTextColor="white" // Optionally change the placeholder text color
          inputContainerStyle={{ borderColor: 'white', borderBottomWidth: 1 }} // Change border color and width


        />
        <Input
          placeholder="Password"
          leftIcon={<Icon name="lock" color="white" />}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          inputStyle={{ color: 'white' }} // Change this to your desired color
          placeholderTextColor="white" // Optionally change the placeholder text color
          inputContainerStyle={{ borderColor: 'white', borderBottomWidth: 1 }} // Change border color and width

        />
        <Button
          icon={{
            name: 'sign-in',
            type: 'font-awesome',
            size: 15,
            color: 'white',
          }}
          disabled={!email || !password}
          buttonStyle={{ backgroundColor: "#B3A06B" }}
          loading={loading}
          raised
          title="Login"
          onPress={signInWithEmailAndPassword}
        />
      </Card>
      {/* <Button
        icon={{
          name: 'google-plus',
          type: 'font-awesome',
          size: 15,
          color: 'black',
        }}
        loading={loading}
        raised
        title="Sign in with Google"
        titleStyle={{ color: 'black' }}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        onPress={loginWithGoogle}
      /> */}
    </View>
  );
};

export default LoginWithEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'flex-start',
    backgroundColor: Colors.white,
  },
  card: {
    width: '90%',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    backgroundColor: "rgb(66,66,66)",
  },
  buttonContainer: {
    top: 20,
  },
  button: {
    backgroundColor: "#B3A06B",
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 50,
  },
});
