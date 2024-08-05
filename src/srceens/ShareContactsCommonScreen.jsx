import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, PermissionsAndroid, Platform, FlatList, StatusBar, TouchableOpacity, BackHandler, Alert, Modal, Button, ScrollView, ActivityIndicator, Image } from 'react-native'
import { useRoute, useIsFocused, useNavigation, useFocusEffect } from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import Theme from '../components/Theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import ContactCard from '../components/ContactCard';
import { RoundedButton } from '../theme';
import { getSharedContacts, setShareContacts } from '../services/SUserService';
import FullScreenLoader from "../theme/FullScreenLoader";
import { showMessage } from 'react-native-flash-message';
import RoundLightButton from '../components/RoundLightButton';
import RoundDarkButton from '../components/RoundDarkButton';
import CheckBox from '@react-native-community/checkbox';
import theme from '../theme/theme';
import { getPuserShareContacts, setPuserShareContacts } from '../services/UserService';
import { Searchbar, TextInput } from 'react-native-paper';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const phoneUtil = PhoneNumberUtil.getInstance();

const ShareContactsCommonScreen = () => {

    const route = useRoute();
    const [id, setId] = useState();
    const [contacts, setContacts] = useState([]);
    const [fullContacts, setFullContacts] = useState([]);
    const [granted, setGranted] = useState(null);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const [isSelectedAll, setIsSelectedAll] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [privacyOpen, setPrivacyOpen] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [showAll, setShowAll] = useState(false)
    // const [infomodalVisible, setInfoModalVisible] = useState(false);
    const [noSurnameLength, setNoSurnameLength] = useState(null)
    const [contactSummary, setContactSummary] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        if (route && route.params && route?.params?.id) {
            setId(route.params?.id);
            console.log("User id", route.params?.id);
        }
    }, [route.params])



    useEffect(() => {
        if (!isFocused) return false;
        getContacts().then(contacts => {
            // console.log(contacts);
        }).catch(err => {
            console.log(err);
        });
        setModalVisible(true)
    }, [isFocused, id]);

    useEffect(() => {
        // Filter contacts based on searchQuery
        if (searchQuery === '') {
            setContacts(fullContacts);
        } else {
            const filteredContacts = fullContacts.filter(contact =>
                contact.displayName.toLowerCase().includes(searchQuery)
            );
            console.log("Use effect", JSON.stringify(filteredContacts, null, 2));

            setContacts(filteredContacts);
        }
    }, [searchQuery]);

    const filterContact = (e) => {
        setShowAll(false)
        const searchQuery = e.toLowerCase(); // Trim and convert search query to lowercase
        setSearchQuery(searchQuery); // Update search query state

        if (searchQuery === '') {
            // If search query is empty, show all contacts
            setContacts(fullContacts);
        } else {
            // Filter fullContacts based on search query
            const filteredContacts = fullContacts.filter(contact =>
                contact.displayName.toLowerCase().includes(searchQuery)
            );
            console.log(JSON.stringify(filteredContacts, null, 2));
            setContacts(filteredContacts);
        }
    };



    const showSelectedContacts = () => {
        setSearchQuery('')
        setContacts(
            fullContacts
        )
        // console.log("showSelectedContacts", fullContacts.filter(contact => contact.selected));
        setContacts(fullContacts.filter(contact => contact.selected))
        // console.log("all contacts", contacts);

        setShowAll(true)
    }
    const showAllContacts = () => {
        setSearchQuery('')
        console.log("hein??");
        setContacts(
            fullContacts

        );
        setShowAll(false)
    }



    const setSelection = useCallback((number, value) => {
        setContacts((prevContacts) => {
            return prevContacts.map((c) => {
                if (c.number === number) {
                    return { ...c, selected: value };
                }
                return c;
            });
        });
        setFullContacts((prevContacts) => {
            return prevContacts.map((c) => {
                if (c.number === number) {
                    return { ...c, selected: value };
                }
                return c;
            });
        });
    }, []);

    const selectAll = (value) => {
        setContacts(prevContacts => {
            const updatedContacts = prevContacts.map(c => {
                if (!c.disabled) {
                    return { ...c, selected: value };
                }
                return c;
            });
            return sortContactsByDisplayName(updatedContacts);
        });

        setFullContacts(prevFullContacts => {
            const updatedFullContacts = prevFullContacts.map(c => {
                if (!c.disabled) {
                    return { ...c, selected: value };
                }
                return c;
            });
            return sortContactsByDisplayName(updatedFullContacts);
        });

        setIsSelectedAll(value);
    };

    const onValueChangeHandler = (e) => {
        if (!e) {
            selectAll(false);
        } else {
            selectAll(true);
        }
    }

    const sortContactsByDisplayName = (contacts) => {
        return contacts.sort((a, b) => {
            const nameA = a.displayName.toUpperCase();
            const nameB = b.displayName.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }

    function groupContactsByLastName(contacts) {
        const wordCounts = {};

        contacts.forEach(contact => {
            const parts = contact.displayName.split(" ");

            if (parts.length < 2) {
                // If there is no 2nd word
                wordCounts["No Title"] = (wordCounts["No Title"] || 0) + 1;
            } else {
                for (let i = 1; i < parts.length; i++) {
                    const word = parts[i].toLowerCase();
                    if (!isNaN(word)) {
                        // If the word is a number, count as "Not Saved"
                        wordCounts["Not Saved"] = (wordCounts["Not Saved"] || 0) + 1;
                    } else {
                        // Otherwise, count the word
                        wordCounts[word] = (wordCounts[word] || 0) + 1;
                    }
                }
            }
        });

        const sortedWords = Object.entries(wordCounts)
            .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});

        return [sortedWords];
    }

    const searchByTitle = (lastName) => {
        setSearchQuery('')
        setContacts(fullContacts)
        setModalVisible(false)
        if (lastName === 'No Title') {
            console.log("jhasvf");
            setContacts(
                fullContacts.filter(contact => {
                    const displayName = contact.displayName.trim();
                    return displayName.split(" ").length === 1 && isNaN(displayName);
                })
            )
        }
        else if (lastName === 'Not Saved') {

            setContacts(
                fullContacts.filter(contact => {
                    const displayName = contact.displayName.trim().replace(/\s/g, ''); // Remove all whitespace characters
                    return displayName.length >= 1 && !isNaN(displayName);
                })
            )

        } else {
            console.log("length", lastName.length);


            const searchName = lastName.trim().toLowerCase();
            setContacts(
                fullContacts.filter(contact => {
                    const displayName = contact.displayName.trim().toLowerCase();
                    const nameParts = displayName.split(/\s+/); // Split by any whitespace
                    return nameParts.some(part => part === searchName) ||
                        displayName.includes(`(${searchName})`);
                })
            );

        }
    }


    const getContacts = async () => {
        try {
            let grantedT;
            console.log("UNDER ANDROID");


            if (Platform.OS === 'android') {
                console.log("=------=-=-=---==-=-=-=-=--==--=-=-=-==--=-=-=-=-=-=-=-==-=-=-check???????--------asf---afasf--aasf--2wd-ascascas");

                grantedT = await PermissionsAndroid.request(
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
            } else if (Platform.OS === 'ios') {
                console.log("UNDER iOS");
                grantedT="GRANTED"
            }
            setGranted(grantedT);
            console.log('Granted:' + grantedT)
            if (grantedT === PermissionsAndroid.RESULTS.GRANTED || grantedT==="GRANTED") {
                const contactsT = await Contacts.getAll();
                console.log("??????????", JSON.stringify(contactsT,null, 2));
                // console.log("You can use the contact", contactsT);
                const withNameContacts = contactsT.filter(c => {

                    if ((c.displayName || (c.givenName || c.middleName || c.familyName)) && c.phoneNumbers && c.phoneNumbers.length) {
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
                }
                ).map(c => {
                    const number = c.phoneNumbers[0].number.split(' ').join('');
                    const phoneNumberObj = phoneUtil.parse(number, 'IN');
                    return {
                        recordID: c.recordID,
                        displayName: c.displayName || (c.givenName+" "+c.middleName+" "+c.familyName),
                        number: phoneUtil.format(phoneNumberObj, PhoneNumberFormat.E164)
                    }
                })
                setLoading(true);
                if (!id) {
                    const sharedContacts = await getPuserShareContacts();
                    // console.log("contttt", sharedContacts);
                    if (sharedContacts.length) {
                        withNameContacts.map(wnc => {
                            let isAlreadyShared = false;
                            sharedContacts.map(sc => {
                                if (sc.number === wnc.number) {
                                    isAlreadyShared = true;
                                }
                            });
                            if (isAlreadyShared) {
                                wnc.selected = true;
                                wnc.disabled = true;
                            }

                        })
                        setIsSelectedAll(false);
                    } else {
                        withNameContacts.map(c => c.selected = true);
                    }
                } else {
                    // console.log("I hope I get this time");
                    // console.log("id-->", id);
                    const sharedContacts = await (await getSharedContacts(id))?.data()?.constacts;
                    // console.log("a,efhgkuyf", sharedContacts);
                    if (sharedContacts && sharedContacts.length) {
                        withNameContacts.map(wnc => {
                            let isAlreadyShared = false;
                            sharedContacts.map(sc => {
                                if (sc.number === wnc.number) {
                                    isAlreadyShared = true;
                                }
                            });
                            if (isAlreadyShared) {
                                wnc.selected = true;
                                wnc.disabled = true;
                            }

                        })
                        setIsSelectedAll(false);
                    } else {
                        withNameContacts.map(c => c.selected = true);
                    }
                }
                setLoading(false);
                // withNameContacts.map(c => c.selected = true);
                // console.log("withNameContacts--->", JSON.stringify(withNameContacts));
                const lastName = groupContactsByLastName(withNameContacts)
                const sortedContact = sortContactsByDisplayName(withNameContacts)
                setFullContacts(sortedContact)
                // console.log("last name hungama", JSON.stringify(lastName, null, 2));
                setContactSummary(lastName)
                setContacts(sortedContact);
            } else {
                console.log("Contact permission denied");
            }

        } catch (err) {
            console.warn(err);
        }
    }

    useEffect(() => {
        const backAction = () => {
            showAlert('backHandler');
            return true;
        };

        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    useFocusEffect(
        useCallback(() => {
            const onBeforeRemove = (e) => {
                e.preventDefault();
                showAlert('navigation', e);
            };

            const unsubscribe = navigation.addListener('beforeRemove', onBeforeRemove);

            return unsubscribe;
        }, [navigation])
    );

    const showAlert = (actionType, e) => {
        setModalContent({
            actionType,
            event: e,
            title: "Reminder",
            message: "Remember to reopen JodiSure to complete the contact sharing process. If you haven't saved all your selected contacts, please do so now before leaving this page.",
        });
        setIsModalVisible(true);
    };

    const handleModalAction = (confirm) => {
        setSearchQuery('')
        setIsModalVisible(false);
        if (confirm) {
            const { actionType, event } = modalContent;
            if (actionType === 'backHandler') {
                navigation.goBack();
            } else if (actionType === 'navigation') {
                navigation.dispatch(event.data.action);
            }
        }
    };






    const shareContacts = async () => {
        setSearchQuery('')
        setLoading(true);
        const selectedContacts = fullContacts.filter(c => c.selected);
        // console.log("selectedContacts", selectedContacts)

        // if there is no id means it is share for primary user contact
        if (!id) {
            return setPuserShareContacts(selectedContacts).then(res => {
                showMessage({ title: "Success", type: "success", message: 'Shared your contacts as primary user.' })
                // navigation.goBack();
            }).catch(err => {
                showMessage({ title: "Failed", type: 'danger', message: 'Failed to share your contacts.' })
                console.log(err);
            }).finally(() => {
                setLoading(false);

            })
        }
        //if there is id than share for secondary user contact

        return setShareContacts(id, selectedContacts).then(res => {
            showMessage({ title: "Success", type: "success", message: 'Shared your contacts as you are secondary user.' })
            // navigation.goBack();
        }).catch(err => {
            showMessage({ title: "Failed", type: 'danger', message: 'Failed to share your contacts.' })
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }

    const showContactSummary = () => {
        setContacts(fullContacts)
        setShowAll(false)
        setModalVisible(true)
    }

    return (
        <View style={styles.container}>
            {loading ? <FullScreenLoader /> : null}

            {(granted === 'denied' || granted === 'never_ask_again') ? (
                <View style={styles.danger}>
                    <Theme.TextB color="#ff0000">Can't accesssss contacts</Theme.TextB>
                </View>
            ) : null}

            <View>
                {/* <TextInput
                    // style={styles.searchBox}
                    placeholder="Search contacts"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                /> */}
                {privacyOpen ? <View style={styles.shadow}>
                    <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>

                        <Text style={{ color: "black", marginBottom: 5, fontWeight: "600" }}> Let's unite our circles ✨
                        </Text>
                        <TouchableOpacity onPress={() => { setPrivacyOpen(false) }}>
                            <Text style={{ color: "black", fontWeight: "600" }}> Close</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ color: "black", textAlign: 'justify' }}>
                        Share your contacts with Jodisure, discover shared family and friends and connect deeper  without compromising your privacy
                    </Text>
                </View> : null}
                <View >
                    <Searchbar
                        placeholder="Enter Contact Name"
                        onChangeText={filterContact}
                        value={searchQuery}
                        style={{ borderRadius: 15 }}
                    // style={{ width: "75%", }}
                    //   onIconPress={searchPorfileID}
                    />

                </View>
                <View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: 'center', marginTop: "2%" }}>
                        <View style={{ marginRight: "1%" }}>
                            {showAll ?
                                // <RoundDarkButton
                                //     name="Show All"
                                //     disabled={!granted || !contacts.length}
                                //     onPress={showAllContacts}

                                //     color={"#8db8ca"}
                                // />
                                <TouchableOpacity style={styles.showList} onPress={showAllContacts} disabled={!granted}>
                                    <SimpleLineIcons name="eye" color={"white"} size={20} style={{ alignSelf: 'center' }} />

                                </TouchableOpacity>
                                :
                                <>
                                    {/* <RoundDarkButton
                                    name="📋"
                                    disabled={!granted || !contacts.length}
                                    onPress={showSelectedContacts}

                                    color={"#8db8ca"}
                                /> */}
                                    <TouchableOpacity style={styles.showList} onPress={showSelectedContacts} disabled={!granted}>
                                        <SimpleLineIcons name="list" color={"white"} size={20} style={{ alignSelf: 'center' }} />

                                    </TouchableOpacity>
                                </>

                            }
                        </View>
                        <View>
                            {/* <RoundDarkButton name="Share Contacts" disabled={!granted || !contacts.length} onPress={shareContacts} /> */}
                            <TouchableOpacity style={styles.shareContacts} onPress={shareContacts} disabled={!granted || !contacts.length}>
                                <Text style={{ textAlign: 'center', color: 'white' }}>
                                    Save Contacts
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ marginLeft: "1%" }}>
                            <>
                                {/* <RoundDarkButton
                                name="📝"
                                disabled={!granted || !contacts.length}
                                onPress={() => { console.log("clickity"); setModalVisible(true) }}
                                color={"#8db8ca"}

                            /> */}
                                <TouchableOpacity style={styles.contactSummry} onPress={showContactSummary} disabled={!granted}>
                                    <SimpleLineIcons name="book-open" color={"white"} size={20} style={{ alignSelf: 'center' }} />

                                </TouchableOpacity>
                            </>
                        </View>
                    </View>
                </View>
                <Theme.Text style={{ textAlign: 'center' }}>Sharing {fullContacts.filter(c => c.selected).length} contacts</Theme.Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* <RoundLightButton onPress={() => { selectAll(false) }} name="Unselect All" />
                    <RoundDarkButton onPress={() => { selectAll(true) }} name="Select All" /> */}
                    {(contacts.length) ? <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flex: 1, marginRight: 14 }}>
                        <Theme.Text>Select All</Theme.Text>
                        <CheckBox value={isSelectedAll} onValueChange={onValueChangeHandler} boxType="square" tintColors={{ true: theme.colors.primaryDark, false: theme.colors.grey0 }} />
                    </View> : null}
                </View>
            </View>

            <FlatList
                data={contacts}
                keyExtractor={(item) => item.recordID}
                renderItem={({ item }) => {
                    return <ContactCard contact={item} setSelection={setSelection} />
                }}
                showsVerticalScrollIndicator={true}

                contentContainerStyle={{ paddingBottom: 500 }} // Add some padding to ensure last items are visible

            />



            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={[styles.centeredView, styles.modalBackground]}>
                    <View style={styles.modalView}>
                        {/* Placeholder image for binder clip */}
                        {/* <Image
                            source={require('./../assets/images/clip.png')}
                            style={styles.binderClip}
                        /> */}
                        <Text style={styles.modalTitle}>Contact summary</Text>
                        {
                            contactSummary.length === 0 ? (
                                <ActivityIndicator size={100} color={'#a05b85'} />
                            ) : (
                                <FlatList
                                    style={{ backgroundColor: 'white' }}
                                    contentContainerStyle={styles.scrollViewContent}
                                    ListHeaderComponent={
                                        <View style={styles.headerContainer}>
                                            <Text style={styles.headerText}>Second Name</Text>
                                            <Text style={styles.headerText}>Contact Count</Text>
                                        </View>
                                    }
                                    data={Object.entries(contactSummary[0]).map(([lastName, count]) => ({ lastName, count }))}
                                    keyExtractor={(item) => item.lastName}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.touchableItem} onPress={() => { searchByTitle(item.lastName) }}>
                                            <View style={styles.row}>
                                                <Text style={styles.modalTextClip}>{item.lastName}</Text>
                                                <Text style={styles.modalTextClip}>{item.count}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            )
                        }
                        <View style={{ marginBottom: 20 }} />
                        <Button title="Close" color={"#a05b85"} onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(!isModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>{modalContent.title}</Text>
                        <Text style={styles.modalText}>{modalContent.message}</Text>
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonWrapper}>
                                <Button title="Stay" color={'#a05b85'} onPress={() => handleModalAction(false)} />
                            </View>
                            <View style={styles.buttonWrapper}>
                                <Button title="Leave" color={'#a05b85'} onPress={() => handleModalAction(true)} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}



export default ShareContactsCommonScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        // marginTop: StatusBar.currentHeight + 10,
    }, buttonWrapper: {
        flex: 1, // Each button takes up equal space
        marginHorizontal: 5, // Optional: Add some space between the buttons
    },
    modalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    scrollViewContent: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // padding:5
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: "black"
    },
    modalText: {
        marginBottom: 15,
        color: 'black',
        textAlign: 'center',
    },
    modalTextClip: {
        marginBottom: 15,
        color: '#5c6274',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    clipContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    binderClip: {
        position: 'absolute',
        top: -70, // Adjust these values to position the binder clip as desired
        zIndex: 1, // Ensure it appears above modal content
        width: 150, // Adjust width and height according to your image/icon size
        height: 100,
    },
    modalView: {
        margin: 20,
        backgroundColor: theme.colors.boneWhite,
        borderRadius: 20,
        padding: 35,
        // display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: "70%"
    },
    shareContacts: {
        padding: 15,
        height: 50,
        paddingLeft: '10%',
        paddingRight: '10%',
        backgroundColor: "#a05b85",
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    showList: {
        height: 50,
        padding: 15,
        paddingLeft: '10%',
        paddingRight: '10%',
        backgroundColor: "#a05b85",
        justifyContent: 'center',
        marginVertical: 5,
        borderRadius: 5,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    contactSummry: {
        height: 50,

        padding: 15,
        paddingLeft: '10%',
        paddingRight: '10%',
        backgroundColor: "#a05b85",
        marginVertical: 5,
        borderRadius: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    touchableItem: {
        padding: 10,
        // backgroundColor: '#f9f9f9',
        marginVertical: 5,
        borderRadius: 5,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        borderBottomWidth: 1,
        borderBottomColor: '#4dadf9',
        borderStyle: 'dashed',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        color: theme.colors.secondaryDark,
        borderBottomColor: '#f56465',
        borderStyle: 'dashed'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: theme.colors.secondaryDark,
        justifyContent: 'flex-end'
    },
    shadow: {
        padding: 15,
        backgroundColor: theme.colors.boneWhite, marginBottom: 10, borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    icon: {
        borderRadius: 24,
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
        // position: "absolute",
        backgroundColor: "#a05b85",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        // top: 1,
        // right: 1,
        // margin: 12,
        padding: 14,
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
