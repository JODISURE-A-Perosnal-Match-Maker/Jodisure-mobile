import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Input, Switch } from "react-native-elements";
import theme from '../../../theme/theme';

const EditPrivacySettingsComponent = ({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors, setFieldValue }) => {
    const [isTotalPrivacyEnabled, setTotalPrivacyEnabled]=useState(values.isTotalPrivacyEnabled)
    const [isPhotoVisibilityEnabled, setPhotoVisibilityEnabled] = useState(values.isPhotoVisibilityEnabled);

    const toggleTotalPrivacy = () => {
        const newPrivacyState = !isTotalPrivacyEnabled;
        setTotalPrivacyEnabled(newPrivacyState);
        values.isTotalPrivacyEnabled=newPrivacyState;
        setPhotoVisibilityEnabled(false)
    };
    const togglePhotoVisibility = () =>{
        const newPhotoVisibilityState= !isPhotoVisibilityEnabled
        setPhotoVisibilityEnabled(newPhotoVisibilityState)
        values.isPhotoVisibilityEnabled=newPhotoVisibilityState
    };

    return (
        <View style={styles.toggleContainer}>
                                <Text style={styles.toggleHeader}>Total Privacy</Text>

                                <View style={styles.toggleRow}>
                                    <View style={styles.toggleTextContainer}>
                                        <Text style={styles.toggleDescription}>Fully conceal your information in this app</Text>
                                    </View>
                                    <Switch
                                        style={styles.toggleSwitch}
                                        onValueChange={toggleTotalPrivacy}
                                        value={isTotalPrivacyEnabled}
                                        trackColor={{ false: theme.colors.grey1, true: theme.colors.grey0 }}
                                        thumbColor={isTotalPrivacyEnabled ? theme.colors.grey1 : theme.colors.grey0}
                                    />
                                </View>
                                <View style={{opacity:isTotalPrivacyEnabled?.25:1}}>
                                <Text style={styles.toggleHeader}>Photo Visibility</Text>

                                <View style={styles.toggleRow}>
                                    <View style={styles.toggleTextContainer}>
                                        <Text style={styles.toggleDescription}>{isTotalPrivacyEnabled
                                            ? 'Disable Total Privacy to access this'
                                            : 'Unveil your photo'}</Text>
                                    </View>
                                    <Switch
                                        style={styles.toggleSwitch}
                                        onValueChange={togglePhotoVisibility}
                                        value={isPhotoVisibilityEnabled}
                                        trackColor={{ false: theme.colors.grey1, true: theme.colors.grey0 }}
                                        thumbColor={isPhotoVisibilityEnabled ? theme.colors.grey1 : theme.colors.grey0}
                                        disabled={isTotalPrivacyEnabled}


                                    />
                                </View>
                                </View>
                            </View>
    );
};

export default EditPrivacySettingsComponent;

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#FFFAFB',
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderRadius: 8,
        marginVertical: 20,
    },
    toggleContainer: {
        // marginBottom: 20,
        backgroundColor:theme.colors.boneWhite,
        borderRadius:5,
        padding:10
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
        padding: 10,
        paddingBottom: 10,
        paddingTop: 10,
        borderColor: theme.colors.grey0,
        borderWidth: 1,
        borderRadius: 5
    },
    toggleTextContainer: {
        // flex: 1,
        paddingRight: 10,
    },
    toggleHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.black
    },
    toggleDescription: {
        fontSize: 14,
        color: theme.colors.black,
    },
    toggleSwitch: {
        marginLeft: 'auto',
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
});
