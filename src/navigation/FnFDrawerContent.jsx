import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar } from 'react-native-elements';
import Theme from '../components/Theme';
import auth from '@react-native-firebase/auth'
import theme from '../theme/theme';
import { ListItem } from 'react-native-elements';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { UserContext } from '.';
const FnFDrawerContent = (props) => {
  const { navigation } = props;
  const cUser = useContext(UserContext);
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Avatar
              rounded
              size="large"
              source={{ uri: auth().currentUser.photoURL }}
            />
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Theme.TextB color="#242424" size="16px" style={styles.title}>{auth().currentUser.displayName}</Theme.TextB>
              {/* <Theme.Text color="#242424" size="14px" style={styles.caption}>@{auth().currentUser.uid}</Theme.Text> */}
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <ListItem bottomDivider>
                <SimpleLineIcons name="home" color={theme.colors.secondary} size={30} />
                <ListItem.Content>
                  <ListItem.Title><Theme.TextB>Home</Theme.TextB></ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ChooseAccount')}>
              <ListItem bottomDivider>
                <AntDesignIcons name="swap" color={theme.colors.secondary} size={30} />
                <ListItem.Content>
                  <ListItem.Title><Theme.TextB>Switch Account</Theme.TextB></ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              cUser.updateLoginAs(null);
              auth().signOut();
            }}>
              <ListItem bottomDivider>
                <SimpleLineIcons name="logout" color={theme.colors.secondary} size={30} />
                <ListItem.Content>
                  <ListItem.Title><Theme.TextB>Logout</Theme.TextB></ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>

          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  )
}

export default FnFDrawerContent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})
