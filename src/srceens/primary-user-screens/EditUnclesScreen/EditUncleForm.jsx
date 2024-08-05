import React, { Fragment, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Theme from '../../../components/Theme';
import theme from '../../../theme/theme';
import FullScreenLoader from '../../../theme/FullScreenLoader';
import * as yup from 'yup';
import RoundDarkButton from '../../../components/RoundDarkButton';
import { updateProfile, updateSiblingInfo, getMyProfile, updateUncleInfo } from '../../../services/UserService';
import { showMessage } from 'react-native-flash-message';
import { MotiView } from 'moti';
import AnddesignIcon from 'react-native-vector-icons/AntDesign';
import { FAB, BottomSheet, Input, Switch } from 'react-native-elements';
const editProfileSchema = yup.object().shape({
    first_name: yup.string().min(2, 'Too Short').required('First name is required.'),
    last_name: yup.string().min(2, 'Too Short').required("Last name is required")
})


const EditUncleForm = ({ initialValue }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [formState, setFormState] = useState();
    const [uncles, setUncles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMyProfile().then(profile => {
            if (profile.data()?.uncleInfo) {
                setUncles(profile.data()?.uncleInfo);
            } else {
                setUncles([]);
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

    const getUncleInfo = () => {
        getMyProfile().then(profile => {
            if (profile.data()?.uncleInfo) {
                setUncles(profile.data()?.uncleInfo);
            } else {
                setUncles([]);
            }
        }).catch(err => {
            console.log(err);
        });
    };

    const submitUncle = () => {
        if (!formState.data.name) {
            return alert('You have not entered any data.');
        }
        setLoading(true);
        // console.log('submitting meternal uncles info',formState);
        // const formData = JSON.parse(JSON.stringify(uncles));
        const tmpUncles = uncles;
        if (formState.index === null) {
            tmpUncles.push(formState.data);
        } else {
            tmpUncles[formState.index] = formState.data;
        }

        setIsVisible(false);
        updateUncleInfo(tmpUncles).then(async res => {
            await getUncleInfo();
            setFormState(null);
            return showMessage({ message: 'uncles updated', type: 'success', title: 'Success!!' });
        }).catch(err => {
            console.log(err);
            return showMessage({ message: 'uncles could not be updated', type: 'danger', title: 'Failed!!' });
        }).finally(() => {
            setLoading(false);
        })
    }

    const createNew = () => {
        setFormState({ index: null, data: { name: "", married: "", marriedTo: "" } });
        setIsVisible(true);
    }

    return (
        <View style={styles.container}>
            {loading && <FullScreenLoader />}
            <View style={{ flex: 1 }}>
                <Fragment>
                    <View style={{ flex: 1 }}>
                        {uncles && uncles.map((s, index) => {
                            return (
                                <View key={index}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                                        <Theme.TextB>{s.name}</Theme.TextB>
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
                            onChangeText={(text) => handleChange(text, 'name')}
                            value={formState.data.name}
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
                    <RoundDarkButton onPress={submitUncle} name="Save" />

                </View>
            </BottomSheet>}
        </View >
    )
}

export default EditUncleForm

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
