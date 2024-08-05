import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList, StatusBar } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Theme from '../../components/Theme'
import { RoundedButton } from '../../theme'
import theme from '../../theme/theme'
import FbConnectedUserCard from '../../components/FbConnectedUserCard';

const ConnectedUsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // subscribe to connected users
    console.log(auth().currentUser.uid);
    const subscriber = firestore().collection('su_connections').where('su_id', '==', auth().currentUser.uid).onSnapshot(async querySnapshot => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() })
      })
      console.log(docs);
      setUsers(docs);
    })
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [navigation])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Theme.TextB color="#000" size="18px">All connected users</Theme.TextB>
        {!users.length ? (
          <View style={styles.noConnectionContainer}>
            <Image source={require('../../assets/images/group_19.png')} style={{ width: 66, height: 66, resizeMode: 'contain' }} />
            <Theme.Text color="#000000" size="14px">No family members are connected!</Theme.Text>
            <Theme.Text style={{ textAlign: 'center' }} color="#ce3636" size="14px">We recommend to connect with at least one member to use the app</Theme.Text>
          </View>
        ) : null}
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={users}
            renderItem={({ item }) => <View style={{ marginVertical: 10 }}>
              <FbConnectedUserCard connection={item} />
            </View>}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
          {/* {users.map(user => <FbConnectedUserCard key={user.id} connection={user} />)} */}
        </View>

      </View>
      <View style={styles.addContainer}>
        <Theme.TextB color="#494a51" size="16px">Empower your loved ones' journey to love by joining them on JodiSure.</Theme.TextB>
        {/* <Theme.Text color="#494a51" size="14px">Help your friends and family to take right decision.</Theme.Text> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            {/* <RoundedButton onPress={() => { navigation.navigate('AddUser',{uid:'RLZS5R'}) }} title="Add" titleStyle={{ paddingHorizontal: 31 }} /> */}
            <RoundedButton onPress={() => { navigation.navigate('AddUser') }} title="Join" titleStyle={{ paddingHorizontal: 31, color: "white" }} />
          </View>
          <View>
            <Image source={require('../../assets/images/group_4_fnf.png')} style={{ width: 173, height: 144, resizeMode: 'contain' }} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default ConnectedUsersScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  noConnectionContainer: {
    marginTop: 16,
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 30,
    alignItems: 'center',
    height: 186,
    borderColor: '#cfcfcf',
    borderWidth: 1,
    borderRadius: 8,
  },
  addContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#b0ced9',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
})
