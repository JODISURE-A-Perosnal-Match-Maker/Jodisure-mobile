import React, { useState, useEffect } from 'react'
import { Alert, StatusBar, StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import theme from '../../theme/theme';
import { RoundedButton } from '../../theme';
import { getUserByUUID } from '../../services/UserService';
import Theme from '../../components/Theme';
import { addSUConnections, isPuSuAlreadyConnected, generateRandomString } from '../../services/SUserService';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';
const AddUserScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');
  const [relationship, setRelationship] = useState('');
  const [su_id, setSu_id] = useState('uirywfsbpirtwy6vr45sg79p982y')
  const [findingUser, setFindingUser] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const [errFindingUser, setErrFindingUser] = useState(null);

  const navigation = useNavigation();

  const route = useRoute();

  useEffect(() => {
    if (route?.params?.id) {
      handleUseridInputChange(route.params.id);
      const rand = generateRandomString(28)
      console.log(rand, "<----RAND")
      setSu_id(rand)
    }
  }, [])


  const handleUseridInputChange = (text) => {
    setUserId(text);
    setFoundUser(null);
    setErrFindingUser(null);
    if (text.length == 6) {
      //find user with this UUID
      getUserByUUID(text).then(user => {
        setFoundUser(user);
        return user;
      }).then(user => {

        return isPuSuAlreadyConnected(user.id, su_id).then(res => {
          console.log("user.id===>", user.id, su_id)
          if (res) {
            // console.log("res----->", res)
            setErrFindingUser("You are alredy connected.")
          } else {
            setErrFindingUser(null);
          }

        })
      }).catch(err => {
        console.log(err);
        setFoundUser(null);
        setErrFindingUser("No user exists with this id!");
      })
    }
  }

  const handleSubmit = () => {
    if (!(firstName && lastName && userId && relationship)) {
      Alert.alert('Error!!', 'All fields marked * are mandatory!');
      return;
    }
    if (!foundUser) {
      Alert.alert('Error!!', "Couldn't find the user with id: " + userId + " make sure you have entered the correct user's Id!");
      return;
    }
    if (errFindingUser) {
      Alert.alert('Error!!', "Can't connect see error status!");
      return;
    }
    // auth().currentUser.uid
    //su_id
    const data = { pu_id: foundUser.id, su_id: auth().currentUser.uid, su_approved: true, su_firstName: firstName, su_lastName: lastName, su_relationship: relationship };
    console.log("data--->", data)
    addSUConnections(data).then(res => {
      navigation.goBack();
    }).catch(err => {
      console.log(err);
      Alert.alert('Error!!', "Can't send request now try again!");
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Input
          inputStyle={styles.inputContainer}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          labelStyle={styles.inputLabelStyle}
          placeholder='First name'
          label='Your first name *'
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <Input
          inputStyle={styles.inputContainer}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          labelStyle={styles.inputLabelStyle}
          placeholder='Last name'
          label='Your last name *'
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <Input
          inputStyle={styles.inputContainer}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          labelStyle={styles.inputLabelStyle}
          placeholder="User's ID"
          label="User's ID *"
          value={userId}
          onChangeText={handleUseridInputChange}
        />
        {foundUser ? (
          <View style={styles.infoContainer}>
            <Theme.TextB>Details: {foundUser?.first_name} {foundUser?.last_name}</Theme.TextB>
          </View>
        ) : null}
        {errFindingUser ? (
          <View style={styles.infoContainer}>
            <Theme.TextB color="red">Error: {errFindingUser}</Theme.TextB>
          </View>
        ) : null}
        <Input
          inputStyle={styles.inputContainer}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          labelStyle={styles.inputLabelStyle}
          placeholder='Relationship ie. Uncle'
          label='Your relationship with the user *'
          onChangeText={(text) => setRelationship(text)}
          value={relationship}
        />
        <RoundedButton onPress={handleSubmit} title="ADD USER" />
      </View>
    </View>
  )
}

export default AddUserScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: theme.colors.white,
    flex: 1,
    marginTop: StatusBar.currentHeight + 10,
  },
  formContainer: {
    backgroundColor: '#decbd5',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 8
  },
  inputContainer: {
    height: 42,
    borderRadius: 4,
    borderWidth: 1,
    padding: 10,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.white,
    fontSize: 14,
  },
  inputLabelStyle: {
    color: theme.colors.black,
    marginBottom: 2,
    fontSize: 14,
  },
  infoContainer: {
    color: theme.colors.black,
    marginBottom: 12,
    marginTop: -10,
    fontSize: 14,
    marginHorizontal: 12,
  }
})
