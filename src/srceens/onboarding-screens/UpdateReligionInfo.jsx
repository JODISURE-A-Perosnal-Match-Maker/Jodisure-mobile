import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import React, { Fragment, useState, useEffect, useMemo } from 'react'
import Theme from '../../components/Theme'
import { ScrollView } from 'react-native'
import theme from '../../theme/theme'
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input } from "react-native-elements";
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { useRoute, useIsFocused, useNavigation } from '@react-navigation/native';
import { deleteProfile, genUUID, getMyProfile, getReligions, updateProfile } from '../../services/UserService'
import RoundDarkButton from '../../components/RoundDarkButton'
import FullScreenLoader from '../../theme/FullScreenLoader'
import { showMessage } from 'react-native-flash-message'
import CustomFormikInput from '../../components/CustomFormikInput'
import RoundLightButton from '../../components/RoundLightButton'
import { Dropdown } from 'react-native-element-dropdown'
import { color } from 'react-native-reanimated'
const primary = theme.colors.grey3;
const editProfileSchema = yup.object().shape({
    // religion: yup.string().trim().max(50, 'This can not be that long').required("Religion is required"),
    contact_name: yup.string().trim().required("Contact name is required"),
    // contact_email: yup.string().trim().email("Invalid email address").required("Contact email is required").email("Invalid email"),
    contact_no: yup.string().trim().max(13, 'Invalid phone number').required('Contact number is required')
})

const UpdateReligionInfo = () => {
    // console.log(auth().currentUser.phoneNumber);
    const initialProfileValue = {
        contact_no: auth().currentUser.phoneNumber,
    }
    const [profile, setProfile] = useState(initialProfileValue);
    const [religions, setReligions] = useState([]);
    const [religion, setReligion]=useState([]);
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();
    const [isFocus, setIsFocus]= useState(false)
    const navigation = useNavigation();

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            getReligions()
                .then(rs => {
                    setReligions(rs);
                    return rs;
                })
                .then(() => {
                    return getMyProfile();
                })
                .then(profile => {
                    console.log(profile.exists);
                    if (profile.exists) {
                        setProfile({ ...initialProfileValue, ...profile.data() });
                    } else {
                        setProfile(initialProfileValue);
                    }
                    setLoading(false);
                }).catch(err => {
                    console.log(err);
                });
        }
    }, [isFocused]);

    useMemo(() => {
        if (!profile) return;
        if (profile.isReligionInfoCompleted) {
            navigation.replace('UpdateDisplayPicture');
        }
    }, [profile]);

    const handleDelete = () => {
        setLoading(true);
        deleteProfile().then(() => {
            navigation.replace('ChooseAccount');
        }).finally(() => {
            setLoading(false);
        })
    };

    const Form = (<Formik
        initialValues={profile}
        onSubmit={values => {
            values.isReligionInfoCompleted = true;
            values.religion=religion;
            console.log(values);
            // showMessage({ message: 'Profile updation failed!', type: "danger" })
            setLoading(true);
            updateProfile(values).then(res => {
                showMessage({ message: 'Profile updated', type: "success" });
                navigation.replace('UpdateDisplayPicture');
            }).catch(err => {
                console.log(err);
                showMessage({ message: 'Profile updation failed!', type: "danger" })
            }).finally(() => {
                setLoading(false);
            })
        }}
        validateOnMount={true}
        validateOnChange={true}
        validateOnBlur={true}
        validationSchema={editProfileSchema}
    >
        {
            ({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors, setFieldValue }) => (
                <Fragment>
                    {/* <Text>
                        {JSON.stringify(religions,null,2)}
                    </Text> */}
                    <View style={{ marginVertical: 20 }}></View>
                    {/* <CustomFormikInput
                        type="picker"
                        label="Your religion *"
                        placeholder="Religion"
                        value={values.religion}
                        disabled={false}
                        helpText={'Choose a community you belong to'}
                        error={errors.religion}
                        onChangeText={handleChange('religion')}
                        pickerOptions={
                            religions.map(r => ({ "label": r, "value": r }))
                        }
                    /> */}
                    <Text style={{color:'black', fontSize:16, paddingBottom:5, textAlign:'left'}}>Select a Religion from list</Text>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={religions.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                        search
                        itemTextStyle={styles.itemTextStyle}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Sub-Religion' : '...'}
                        searchPlaceholder="Search by Sub-Religion"
                        value={religion}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setReligion(item.value);
                            setIsFocus(false);
                        }}
                        // renderLeftIcon={() => (
                        //     <AntDesign
                        //         style={styles.icon}
                        //         color={isFocus ? 'blue' : 'black'}
                        //         name="Safety"
                        //         size={20}
                        //     />
                        // )}
                    />

                    <View style={{ marginBottom: 20 }}></View>
                    <View style={styles.contactContainer}>
                        <View style={styles.centeredContainer}>
                            <Text style={styles.centeredText}>Jodisure will connect with this contact for further communication</Text>
                        </View>
                        <CustomFormikInput
                            type="input"
                            label="Contact Name*"
                            placeholder="Contact person name"
                            value={values.contact_name}
                            // helpText={'Jodisure will connect with this contact for further communication'}
                            disabled={false}
                            error={touched.contact_name && errors.contact_name}
                            onChangeText={handleChange('contact_name')}
                            onBlur={handleBlur('contact_name')}
                        />
                        <CustomFormikInput
                            type="input"
                            label="Contact Email"
                            placeholder="Contact person's email"
                            value={values.contact_email}
                            disabled={false}
                            error={touched.contact_email && errors.contact_email}
                            onChangeText={handleChange('contact_email')}
                            onBlur={handleBlur('contact_email')}
                        />
                        <CustomFormikInput
                            type="input"
                            label="Contact Number*"
                            placeholder="Contact person's number"
                            value={values.contact_no}
                            disabled={false}
                            keyboardType={'phone-pad'}
                            error={touched.contact_no && errors.contact_no}
                            onChangeText={handleChange('contact_no')}
                            onBlur={handleBlur('contact_no')}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 50, marginBottom: 20, marginVertical: 20, width: '100%' }}>
                        <RoundDarkButton disabled={!isValid} name="Continue" onPress={handleSubmit} />
                    </View>
                    <View style={{ paddingHorizontal: 20, marginBottom: 20, marginVertical: 20, width: '100%' }}>
                        <Theme.Text>If you created your profile by mistake you can delete it:</Theme.Text>
                        <View>
                            <Button type='outline' buttonStyle={{ borderRadius: 20, borderWidth: 2 }} title={"Delete bride/groom account"} onPress={handleDelete} />
                        </View>
                    </View>
                </Fragment>
            )
        }
    </Formik>);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}>
            <Theme.TextB size={'24px'} style={{ textAlign: 'center' }}>
                Let's set up your account, while we find matches for you!
            </Theme.TextB>
            {loading ? <FullScreenLoader /> : null}
            {(!loading && profile) && Form}
        </ScrollView>
    )
}

export default UpdateReligionInfo


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        width:'95%',
        paddingHorizontal: 8,
        color:'black'
      },
      placeholderStyle: {
        fontSize: 16,
        color:'black'

      },
      selectedTextStyle: {
        fontSize: 14,
        color:'black'

      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color:'black'

      },
      itemTextStyle	:{
        color:'black',
        // backgroundColor:'black'
      },
      itemContainerStyle:{color:'black',
        backgroundColor:'black'},
    contactContainer: {
        backgroundColor: theme.colors.boneWhite,
        width: "100%",
        borderRadius: 5,
        paddingTop: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,

        elevation: 2,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center', // Centers vertically
        alignItems: 'center', // Centers horizontally
    },
    centeredText: {
        color: theme.colors.secondaryMedium,
        textAlign: 'center', // Ensures text alignment within the Text component
    },

    infoBox: {
        borderColor: primary,
        borderWidth: 2,
        padding: 16,
        borderRadius: 8,
        marginVertical: 8
    },
    formInput: {
        width: '100%',
    },
    containerStyle: {
        borderWidth: 0,
    },
    inputStyle: {
        borderRadius: 4,
        borderWidth: 1,
        padding: 10,
        backgroundColor: theme.colors.white,
        borderColor: primary,
        color: primary,
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
    },
    inputLabelStyle: {
        color: primary
    },
    pickerBox: {
        backgroundColor: theme.colors.white,
        borderColor: primary,
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 4,
        marginRight: 20,
        height: 48,
    },
    picker: {
        borderWidth: 1,
        color: primary,
        marginTop: -8,
    },
    fakeInput: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: primary,
        padding: 12,
        marginTop: 10,
        borderRadius: 4,
        right: 20,
        marginLeft: 20,
    },
    fakeInputText: {
        color: primary
    }
})