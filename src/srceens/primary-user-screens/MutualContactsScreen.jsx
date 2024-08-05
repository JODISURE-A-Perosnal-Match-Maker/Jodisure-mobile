import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useRoute } from '@react-navigation/native';
import Theme from '../../components/Theme';
import theme from '../../theme/theme';

const MutualContactsScreen = () => {
    const route = useRoute();
    const [contacts, setContacts] = useState([]);
    const [isUserConnected, setIsConnected] = useState()
    useEffect(() => {
        if (route?.params?.contacts) {
            console.log("are u even here?", route.params);
            setContacts(route.params.contacts);
        }
        if (route?.params?.isConnected) {
            console.log("Is connected", route?.params?.isConnected);
            setIsConnected(route.params.isConnected);
        }
    }, [route.params])
    const RenderContact = memo(({ contact, isUserConnected }) => {
        return (
            <View>
                <View style={[{ marginTop: 9 }, styles.row]}>
                    <View style={styles.avatar}>
                        <FontAwesome name="user-circle" size={32} color="#a05b85" />
                    </View>
                    <View style={styles.contactContainer}>
                        <Theme.TextB color="#a05b85" size="14px">
                            {contact.yourSide.displayName}
                        </Theme.TextB>
                        <View style={[{ marginTop: 9 }, styles.row]}>
                            <View style={{ flex: 1, marginRight: 2 }}>
                                <Theme.TextB color="#242424" size="14px">
                                    Your side
                                </Theme.TextB>
                                <Theme.Text color="#242424" size="14px">
                                    {contact.yourSide.su_firstName} {contact.yourSide.su_lastName} (
                                    {contact.yourSide.su_relationship})
                                </Theme.Text>
                            </View>
                            <View style={{ flex: 1, marginLeft: 2 }}>
                                <Theme.TextB color="#242424" size="14px">
                                    Profile side
                                </Theme.TextB>
                                {isUserConnected ? (
                                    <Theme.Text color="#242424" size="14px">
                                        {contact.otherSide.su_firstName} {contact.otherSide.su_lastName} (
                                        {contact.otherSide.su_relationship})
                                    </Theme.Text>
                                ) : (
                                    <Theme.Text color="#242424" size="14px">
                                        {contact.otherSide.su_relationship}
                                    </Theme.Text>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.devider}></View>
            </View>
        );
    })

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{ flexGrow: 1, backgroundColor: theme.colors.white, padding: 16 }}
        >
            <View style={styles.container}>
                <Theme.TextB color="#242424" size="14px">
                    Mutual contacts
                </Theme.TextB>
                {!contacts.length ? (
                    <Theme.TextB color="#888888" style={{ textAlign: 'center' }} size="12px">
                        No Mutual contacts found
                    </Theme.TextB>
                ) : null}
                <FlatList
                    data={contacts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <RenderContact contact={item} isUserConnected={isUserConnected} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            </View>
        </ScrollView>
    );
};

export default MutualContactsScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7eaed',
        padding: 16,
        borderRadius: 2,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        // alignItems:'center',
        justifyContent: 'space-between'
    },
    col: {
        flexDirection: 'column',

    },
    avatar: {
        width: 32,
        height: 32,
        // backgroundColor: '#a05b85',
        borderRadius: 32,
    },
    contactContainer: {
        flex: 1,
        marginHorizontal: 8
    },
    devider: {
        height: 1,
        backgroundColor: '#f0c8e0',
        marginVertical: 14
    }
})