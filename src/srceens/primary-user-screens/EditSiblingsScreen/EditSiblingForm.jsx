import React, { Fragment, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import Theme from '../../../components/Theme';
import theme from '../../../theme/theme';
import FullScreenLoader from '../../../theme/FullScreenLoader';
import * as yup from 'yup';
import RoundDarkButton from '../../../components/RoundDarkButton';
import { updateProfile, updateSiblingInfo, getMyProfile } from '../../../services/UserService';
import { showMessage } from 'react-native-flash-message';
import { MotiView } from 'moti';
import AnddesignIcon from 'react-native-vector-icons/AntDesign';
import { FAB, BottomSheet, Input, Switch } from 'react-native-elements';
const editProfileSchema = yup.object().shape({
    first_name: yup.string().min(2, 'Too Short').required('First name is required.'),
    last_name: yup.string().min(2, 'Too Short').required("Last name is required")
})


const EditSiblingForm = ({ initialValue }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [formState, setFormState] = useState();
    const [siblings, setSiblings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMyProfile().then(profile => {
            if (profile.data()?.siblingInfo) {
                setSiblings(profile.data()?.siblingInfo);
            } else {
                setSiblings([]);
            }
        }).catch(err => {
            console.log(err);
        });
    }, [])

    const handleChange = (e, fieldName) => {
        const nFormState = JSON.parse(JSON.stringify(formState));
        nFormState.data[fieldName] = e;
        setFormState(nFormState);
    }

    const getSiblingInfo = () => {
        getMyProfile().then(profile => {
            if (profile.data()?.siblingInfo) {
                setSiblings(profile.data()?.siblingInfo);
            } else {
                setSiblings([]);
            }
        }).catch(err => {
            console.log(err);
        });
    };

    const submitSibling = () => {
        if (!formState.data.sibling_name) {
            return alert('You have not entered any data.');
        }
        const tmpSiblings = siblings;
        console.log(formState, tmpSiblings, siblings);
        // return;
        setLoading(true);
        // console.log('submitting sibling info',formState);

        if (formState.index === null) {
            tmpSiblings.push(formState.data);
        } else {
            tmpSiblings[formState.index] = formState.data;
        }



        setIsVisible(false);
        updateSiblingInfo(tmpSiblings).then(async res => {
            await getSiblingInfo();
            setFormState(null);
            return showMessage({ message: 'Siblings updated', type: 'success', title: 'Success!!' });
        }).catch(err => {
            console.log(err);
            return showMessage({ message: 'Siblings could not be updated', type: 'danger', title: 'Failed!!' });
        }).finally(() => {
            setLoading(false);
        })
    }

    const createNew = () => {
        setFormState({ index: null, data: { sibling_name: "", married: "", marriedTo: "" } });
        setIsVisible(true);
    }

    return (
        <View style={styles.container}>
            {loading && <FullScreenLoader />}
            <View style={{ flex: 1 }}>
                <Fragment>
                    <View style={{ flex: 1 }}>
                        {siblings && siblings.map((s, index) => {
                            return (
                                <View key={index}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                                        <Theme.TextB>{s.sibling_name}</Theme.TextB>
                                        <TouchableOpacity onPress={() => {
                                            setFormState({ index, data: s });
                                            setIsVisible(true);
                                        }}>
                                            <AnddesignIcon name="edit" size={24} color={theme.colors.secondary} />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            );
                        })}
                    </View>
                    <View style={{ paddingHorizontal: 50, marginBottom: 20 }}>
                        <View>
                            <FAB
                                size="small"
                                visible={true}
                                icon={{ name: 'add', color: 'white' }}
                                color={theme.colors.primary}
                                onPress={createNew}
                            />
                        </View>
                    </View>
                </Fragment>
            </View>

            {formState && <BottomSheet modalProps={setIsVisible} containerStyle={styles.bottomSheetContainer} isVisible={isVisible} >
                <View style={{ backgroundColor: 'white', padding: 16 }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => setIsVisible(false)}>
                            <AnddesignIcon name="close" color={theme.colors.primary} size={24} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <Input
                            onChangeText={(text) => handleChange(text, 'sibling_name')}
                            value={formState.data.sibling_name}
                            inputStyle={styles.inputContainer}
                            inputContainerStyle={styles.inputContainerStyle}
                            labelStyle={styles.inputLabelStyle}
                            placeholder='Name'
                            label='Name'
                        />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold' }}>Married : {formState?.data?.married}</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: theme.colors.primary }}
                                thumbColor={(formState.data.married == 'Yes') ? theme.colors.primaryDark : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={
                                    (value) => {
                                        if (value) {
                                            handleChange('Yes', 'married')
                                        } else {
                                            handleChange('No', 'married')
                                        }
                                    }
                                }
                                value={(formState.data.married == 'Yes') ? true : false}
                            />
                        </View>

                        {/* <Input
                            onChangeText={(text) => handleChange(text, 'married')}
                            value={formState.data.married}
                            inputStyle={styles.inputContainer}
                            inputContainerStyle={styles.inputContainerStyle}
                            labelStyle={styles.inputLabelStyle}
                            placeholder='Yes'
                            label='Married'
                        /> */}
                        {(formState.data.married == "Yes") && <Input
                            onChangeText={(text) => handleChange(text, 'marriedTo')}
                            value={formState.data.marriedTo}
                            inputStyle={styles.inputContainer}
                            inputContainerStyle={styles.inputContainerStyle}
                            labelStyle={styles.inputLabelStyle}
                            placeholder='Name'
                            label='Married To'
                        />}

                    </View>
                    <RoundDarkButton onPress={submitSibling} name="Save" />

                </View>
            </BottomSheet>}
        </View >
    )
}

export default EditSiblingForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.white,
    },
    bottomSheetContainer: {

    },
    formContainer: {
        backgroundColor: '#decbd5',
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderRadius: 8,
        marginVertical: 20,
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
    inputContainerStyle: { borderBottomWidth: 0 },
    inputLabelStyle: {
        color: theme.colors.black,
        marginBottom: 6,
        fontSize: 12,
        left: -11,

    },
    infoContainer: {
        color: theme.colors.black,
        marginBottom: 12,
        marginTop: -10,
        fontSize: 14,
        marginHorizontal: 12,
    },
    pickerBox: {
        backgroundColor: '#ffffff',
        borderColor: '#e2e2e2',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 8,
        marginHorizontal: 12,
        height: 40,
    },
    picker: {
        marginHorizontal: 12,
        width: '100%',
        borderWidth: 1,
        borderColor: 'red',
        color: '#969696',
        marginTop: -8,
    },
    fakeInput: {
        backgroundColor: '#fff',
        padding: 12,
        marginTop: 10,
        width: '100%',
        marginLeft: 10,
        marginRight: 20,
        borderRadius: 6,
    },
    fakeInputText: {

    }
})
