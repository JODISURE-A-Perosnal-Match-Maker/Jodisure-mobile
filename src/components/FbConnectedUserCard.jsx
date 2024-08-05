import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Theme from './Theme'
import { RoundedButton } from '../theme';
import { deleteSUConnection, updateSUConnections } from '../services/SUserService';
import { Button } from 'react-native-elements';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const FbConnectedUserCard = ({ connection }) => {
    const navigation = useNavigation();
    const [user, setUser] = useState();
    useEffect(() => {
        // subscribe to connected users
        const subscriber = firestore().collection('users').doc(connection.pu_id).onSnapshot(async doc => {
            let data = doc.data();
            data.id = doc.id;
            setUser(data);
        })
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [connection?.pu_id])

    const handleDelete = (actionType) => {
        Alert.alert(
            "Are you sure?",
            "Your user will be " + actionType,
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Ok",
                    onPress: () => {
                        deleteSUConnection(connection.id).then(res => {
                            showMessage({
                                message: actionType + "!",
                                description: `User has been ${actionType}.`,
                                type: "info",
                            });
                        }).catch(err => {
                            showMessage({
                                message: "Failed!",
                                description: "Failed. Try again",
                                type: "danger",
                            });
                        })
                    },
                    style: 'default'
                }
            ]
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Theme.TextB color="#494a51" size="16px">{user?.first_name} {user?.last_name}</Theme.TextB>
                    <Theme.Text color="#494a51" size="14px">ID: {user?.UUID}</Theme.Text>
                </View>
                <View style={styles.column}>
                    {
                        'sharedContactsCount' in connection ? (
                            <TouchableOpacity onPress={() => { navigation.navigate('ShareContacts', { id: user.id }); }}>
                                <View>
                                    <Theme.TextB>{connection?.sharedContactsCount} contacts shared</Theme.TextB>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => { navigation.navigate('ShareContacts', { id: user.id }); }}>
                                <AntDesignIcon name="contacts" size={30} color="#900" />
                            </TouchableOpacity>
                        )
                    }
                </View>

            </View>

            <View style={styles.buttonContainer}>
                <Button buttonStyle={styles.buttonStyle} type="outline" onPress={() => { handleDelete('deleted') }} title="Delete" />
                <Button buttonStyle={styles.buttonStyle} type="outline" onPress={() => { navigation.navigate('ViewProfile', { id: user.id }); }} disabled={!connection?.pu_approved} title="Full Profile" />
                <Button buttonStyle={styles.buttonStyle} type="outline" onPress={() => { navigation.navigate('PrimaryUsersConnections', { connection: connection, user: user, name: user?.first_name + ' ' + user?.last_name }); }} disabled={!connection?.pu_approved} title="Shared Profiles" />
            </View>
            {/* <Text>{JSON.stringify(user, null, 2)}</Text> */}
        </View>
    )
}

export default FbConnectedUserCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#cfcfcf',
        padding: 16,
        borderRadius: 8,
        width: '100%'
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around'
        // backgroundColor:'red'
    },
    buttonStyle: {
        borderRadius: 50,
        paddingHorizontal: 12
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    column: {
        flexDirection: 'column'
    }
})
