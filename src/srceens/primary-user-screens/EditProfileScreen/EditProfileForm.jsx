import React, { Fragment, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Theme from '../../../components/Theme';
import theme from '../../../theme/theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import RoundDarkButton from '../../../components/RoundDarkButton';
import { updateProfile } from '../../../services/UserService';
import { showMessage } from 'react-native-flash-message';
import { MotiView } from 'moti';
import AnddesignIcon from 'react-native-vector-icons/AntDesign';

import EditPersonalInfoComponent from './EditPersonalInfoComponent';
import EditCareerInfoComponent from './EditCareerInfoComponent';
import EditMiscellaneousComponent from './EditMiscellaneousComponent';
import EditContactInfoComponent from './EditContactInfoComponent';
import EditParentalInfoComponent from './EditParentalInfoComponent';
import { useNavigation } from '@react-navigation/native';
import EditMaternalParentalInfoComponent from './EditMaternalParentalInfoComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EditPrivacySettingsComponent from './EditPrivacySettingsComponent';
const editProfileSchema = yup.object().shape({
    first_name: yup.string().min(2, 'Too Short').required('First name is required.'),
    last_name: yup.string().min(2, 'Too Short').required("Last name is required")
})


const EditProfileForm = ({ initialValue, religions }) => {
    const [section, setSection] = useState();
    const insets = useSafeAreaInsets();

    const navigation = useNavigation();
    const handleSectionChange = (sectionName, handleSubmit) => {
        setSection(sectionName);
        // if (handleSubmit) {
        //     handleSubmit();
        // }
    }
    return (
        <View style={{
            paddingHorizontal: 16,
            backgroundColor: theme.colors.white,
            flex: 1,
            
        }}>
            <ScrollView>

                <View style={{ flex: 1, paddingTop: insets.top, paddingBottom:50 }}>
                    <Formik
                        initialValues={initialValue}
                        onSubmit={(values, showMessage = false) => {
                            updateProfile(values).then(res => {
                                if (showMessage) {
                                    showMessage({ message: 'Profile updated', type: "success" })
                                }
                            }).catch(err => {
                                console.log(err);
                                if (showMessage) {
                                    showMessage({ message: 'Profile updation failed!', type: "danger" })
                                }
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
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.listContainer}>
                                            <View style={styles.list}>
                                                <Theme.TextB>Personal Information</Theme.TextB>
                                                {section !== 'personal_info' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('personal_info', handleSubmit)}>
                                                    <AnddesignIcon name="edit" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                                {section === 'personal_info' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('', handleSubmit)}>
                                                    <AnddesignIcon name="close" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                            </View>
                                            <MotiView
                                                from={{
                                                    opacity: 0,
                                                    scale: 0.5,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    type: 'timing',
                                                    duration: 3000
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.9,
                                                }}
                                            >
                                                {section === 'personal_info' && <EditPersonalInfoComponent
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                    touched={touched}
                                                    isValid={isValid}
                                                    errors={errors}
                                                    setFieldValue={setFieldValue} />}
                                            </MotiView>
                                        </View>
                                        <View style={styles.listContainer}>
                                            <View style={styles.list}>
                                                <Theme.TextB>Career Information</Theme.TextB>
                                                {section !== 'career_info' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('career_info', handleSubmit)}>
                                                    <AnddesignIcon name="edit" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                                {section === 'career_info' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('', handleSubmit)}>
                                                    <AnddesignIcon name="close" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                            </View>
                                            <MotiView
                                                from={{
                                                    opacity: 0,
                                                    scale: 0.5,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    type: 'timing',
                                                    duration: 3000
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.9,
                                                }}
                                            >
                                                {section === 'career_info' && <EditCareerInfoComponent
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                    touched={touched}
                                                    isValid={isValid}
                                                    errors={errors}
                                                    setFieldValue={setFieldValue} />}
                                            </MotiView>
                                        </View>
                                        {religions.length && <View style={styles.listContainer}>
                                            <View style={styles.list}>
                                                <Theme.TextB>Miscellaneous</Theme.TextB>
                                                {section !== 'miscellaneous' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('miscellaneous', handleSubmit)}>
                                                    <AnddesignIcon name="edit" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                                {section === 'miscellaneous' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('', handleSubmit)}>
                                                    <AnddesignIcon name="close" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                            </View>
                                            <MotiView
                                                from={{
                                                    opacity: 0,
                                                    scale: 0.5,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    type: 'timing',
                                                    duration: 3000
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.9,
                                                }}
                                            >
                                                {section === 'miscellaneous' && <EditMiscellaneousComponent
                                                    religions={religions}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                    touched={touched}
                                                    isValid={isValid}
                                                    errors={errors}
                                                    setFieldValue={setFieldValue} />}
                                            </MotiView>
                                        </View>}
                                        <View style={styles.listContainer}>
                                            <View style={styles.list}>
                                                <Theme.TextB>Contact Information</Theme.TextB>
                                                {section !== 'contact_info' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('contact_info', handleSubmit)}>
                                                    <AnddesignIcon name="edit" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                                {section === 'contact_info' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('', handleSubmit)}>
                                                    <AnddesignIcon name="close" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                            </View>
                                            <MotiView
                                                from={{
                                                    opacity: 0,
                                                    scale: 0.5,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    type: 'timing',
                                                    duration: 3000
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.9,
                                                }}
                                            >
                                                {section === 'contact_info' && <EditContactInfoComponent
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                    touched={touched}
                                                    isValid={isValid}
                                                    errors={errors}
                                                    setFieldValue={setFieldValue} />}
                                            </MotiView>
                                        </View>
                                        <View style={styles.listContainer}>
                                            <View style={styles.list}>
                                                <Theme.TextB>Paternal Parental Information</Theme.TextB>
                                                {section !== 'parental_info' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('parental_info', handleSubmit)}>
                                                    <AnddesignIcon name="edit" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                                {section === 'parental_info' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('', handleSubmit)}>
                                                    <AnddesignIcon name="close" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                            </View>
                                            <MotiView
                                                from={{
                                                    opacity: 0,
                                                    scale: 0.5,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    type: 'timing',
                                                    duration: 3000
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.9,
                                                }}
                                            >
                                                {section === 'parental_info' && <EditParentalInfoComponent
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                    touched={touched}
                                                    isValid={isValid}
                                                    errors={errors}
                                                    setFieldValue={setFieldValue} />}
                                            </MotiView>
                                        </View>
                                        <View style={styles.listContainer}>
                                            <View style={styles.list}>
                                                <Theme.TextB>Maternal Parental Information</Theme.TextB>
                                                {section !== 'm_parental_info' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('m_parental_info', handleSubmit)}>
                                                    <AnddesignIcon name="edit" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                                {section === 'm_parental_info' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('', handleSubmit)}>
                                                    <AnddesignIcon name="close" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                            </View>
                                            <MotiView
                                                from={{
                                                    opacity: 0,
                                                    scale: 0.5,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    type: 'timing',
                                                    duration: 3000
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.9,
                                                }}
                                            >
                                                {section === 'm_parental_info' && <EditMaternalParentalInfoComponent
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                    touched={touched}
                                                    isValid={isValid}
                                                    errors={errors}
                                                    setFieldValue={setFieldValue} />}
                                            </MotiView>
                                        </View>
                                        <View style={styles.listContainer}>
                                            <View style={styles.list}>
                                                <Theme.TextB>Privacy Settings</Theme.TextB>
                                                {section !== 'privacy_settings' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('privacy_settings', handleSubmit)}>
                                                    <AnddesignIcon name="edit" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                                {section === 'privacy_settings' && <TouchableOpacity style={styles.touchableButton} onPress={() => handleSectionChange('', handleSubmit)}>
                                                    <AnddesignIcon name="close" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                            </View>
                                            <MotiView
                                                from={{
                                                    opacity: 0,
                                                    scale: 0.5,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    type: 'timing',
                                                    duration: 3000
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.9,
                                                }}
                                            >
                                                {section === 'privacy_settings' && <EditPrivacySettingsComponent
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                    touched={touched}
                                                    isValid={isValid}
                                                    errors={errors}
                                                    setFieldValue={setFieldValue} />}
                                            </MotiView>
                                        </View>
                                        <View style={styles.listContainer}>
                                            <View style={styles.list}>
                                                <Theme.TextB>Sibling Information</Theme.TextB>
                                                {section !== 'sibling_info' && <TouchableOpacity style={styles.touchableButton} onPress={() => {
                                                    handleSubmit();
                                                    navigation.navigate("EditSibling")
                                                }}>
                                                    <AnddesignIcon name="edit" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                            </View>
                                        </View>
                                        <View style={styles.listContainer}>
                                            <View style={styles.list}>
                                                <Theme.TextB>Uncle Information</Theme.TextB>
                                                {section !== 'uncle_info' && <TouchableOpacity style={styles.touchableButton} onPress={() => {
                                                    handleSubmit();
                                                    navigation.navigate("EditUncle")
                                                }}>
                                                    <AnddesignIcon name="edit" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                            </View>
                                        </View>
                                        <View style={styles.listContainer}>
                                            <View style={styles.list}>
                                                <Theme.TextB>Maternal Uncle Information</Theme.TextB>
                                                {section !== 'm_uncle_info' && <TouchableOpacity style={styles.touchableButton} onPress={() => {
                                                    handleSubmit();
                                                    navigation.navigate("EditMaternalUncle")
                                                }}>
                                                    <AnddesignIcon name="edit" size={24} color={theme.colors.secondary} />
                                                </TouchableOpacity>}
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ paddingHorizontal: 50, marginBottom: 20 }}>
                                        <RoundDarkButton name="SAVE PROFILE" onPress={handleSubmit} />
                                    </View>
                                </Fragment>
                            )
                        }

                    </Formik>
                </View>
            </ScrollView>
        </View >
    )
}

export default EditProfileForm

const styles = StyleSheet.create({
    container: {
        // top: -25,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.white,
        flex: 1,
    },
    touchableButton: {
        height: 30,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow'
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

    },
    listContainer: {
        // backgroundColor:'red',
        marginVertical: 5
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    }
})
