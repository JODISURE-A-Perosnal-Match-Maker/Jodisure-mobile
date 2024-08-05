import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, PermissionsAndroid, Platform, FlatList } from 'react-native'
import { useRoute, useIsFocused } from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import Theme from '../../components/Theme';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import ContactCard from '../../components/ContactCard';
import { RoundedButton } from '../../theme';
import { setShareContacts } from '../../services/SUserService';
import FullScreenLoader from "../../theme/FullScreenLoader";
import { showMessage } from 'react-native-flash-message';
import { setPuserShareContacts } from '../../services/UserService';

const phoneUtil = PhoneNumberUtil.getInstance();

const PuserShareContactsScreen = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [granted, setGranted] = useState(null);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);

    const setSelection = (number, value) => {
        const tContacts = contacts.map(c => {
            if (c.number === number) {
                c.selected = value
            }
            return c;
        });
        setContacts(tContacts);
    }

    const getContacts = async () => {
        try {
            const grantedT = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: "JodiSure needs to access your contact",
                    message:
                        "JodiSure needs to access your contact " +
                        "so that it can suggest perfect match for your family/friend.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            setGranted(grantedT);
            if (grantedT === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the contact");
                const contactsT = await Contacts.getAll();
                const withNameContacts = contactsT.filter(c => {

                    if (c.displayName && c.phoneNumbers && c.phoneNumbers.length) {
                        const number = c.phoneNumbers[0].number.split(' ').join('');
                        try {
                            const phoneNumberObj = phoneUtil.parse(number, 'IN');
                            if (phoneUtil.isValidNumberForRegion(phoneNumberObj, 'IN')) {
                                return true;
                            }
                        } catch (error) {
                            return false;
                        }
                    }
                    return false;
                }).map(c => {
                    const number = c.phoneNumbers[0].number.split(' ').join('');
                    const phoneNumberObj = phoneUtil.parse(number, 'IN');
                    return {
                        recordID: c.recordID,
                        displayName: c.displayName,
                        number: phoneUtil.format(phoneNumberObj, PhoneNumberFormat.E164)
                    }
                })

                withNameContacts.map(c => c.selected = true);
                setContacts(withNameContacts);
            } else {
                console.log("Contact permission denied");
            }

        } catch (err) {
            console.warn(err);
        }
    }


    useEffect(() => {
        if (!isFocused) return false;
        getContacts().then(contacts => {
            console.log(contacts);
        }).catch(err => {
            console.log(err);
        });
    }, [isFocused]);

    const shareContacts = async () => {
        setLoading(true);
        const selectedContacts = contacts.filter(c => c.selected);
        return setPuserShareContacts(selectedContacts).then(res => {
            showMessage({ title: "Success", type: "success", message: 'Shared your contacts.' })
        }).catch(err => {
            showMessage({ title: "Failed", type: 'danger', message: 'Failed to share your contacts.' })
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <View style={styles.container}>
            {loading ? <FullScreenLoader /> : null}

            {(granted === 'denied' || granted === 'never_ask_again') && <View style={styles.danger}>
                <Theme.TextB color="#ff0000">Can't access contacts</Theme.TextB>
            </View>}
            <View>
                <View>
                    <Theme.Text style={{ textAlign: 'center' }}>{contacts.filter(c => c.selected).length} contacts will be shared!!</Theme.Text>
                </View>
                <RoundedButton title="Share Contactssss" onPress={shareContacts} />
            </View>

            <FlatList
                data={contacts}
                keyExtractor={(item) => item.recordID}
                renderItem={({ item }) => {
                    return <ContactCard contact={item} setSelection={setSelection} />
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default PuserShareContactsScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
    },
    danger: {
        height: 300,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ff0000',
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        backgroundColor: '#ffffff'
    }
})
