import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Input } from "react-native-elements";
import theme from '../../../theme/theme';

const EditContactInfoComponent = ({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors, setFieldValue }) => {
    return (
        <View style={styles.formContainer}>
            <Input
                onChangeText={handleChange('contact_name')}
                onBlur={handleBlur('contact_name')}
                value={values.contact_name}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label='Name'
                disabled={false}
                errorMessage={errors.contact_name}
            />
            <Input
                onChangeText={handleChange('relation')}
                onBlur={handleBlur('relation')}
                value={values.relation}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label='Relation'
                disabled={false}
                errorMessage={errors.relation}
            />
            <Input
                onChangeText={handleChange('contact_no')}
                onBlur={handleBlur('contact_no')}
                value={values.contact_no}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label='Contact Number'
                disabled={false}
                keyboardType="phone-pad"
                errorMessage={errors.contact_no}
            />
            <Input
                onChangeText={handleChange('contact_email')}
                onBlur={handleBlur('contact_email')}
                value={values.contact_email}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label='Email'
                disabled={false}
                keyboardType="email-address"
                errorMessage={errors.contact_email}
            />
        </View>
    );
};

export default EditContactInfoComponent;

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#EEF6F8',
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
});
