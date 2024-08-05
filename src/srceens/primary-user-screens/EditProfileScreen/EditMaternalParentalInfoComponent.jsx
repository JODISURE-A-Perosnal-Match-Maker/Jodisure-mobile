import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Input } from "react-native-elements";
import theme from '../../../theme/theme';

const EditMaternalParentalInfoComponent = ({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors, setFieldValue }) => {
    return (
        <View style={styles.formContainer}>
            <Input
                onChangeText={handleChange('m_grand_father_name')}
                onBlur={handleBlur('m_grand_father_name')}
                value={values.m_grand_father_name}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label="Maternal Grand Father's Name"
                disabled={false}
                errorMessage={errors.m_grand_father_name}
            />
            <Input
                onChangeText={handleChange('m_grand_father_native_place')}
                onBlur={handleBlur('m_grand_father_native_place')}
                value={values.m_grand_father_native_place}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label='Native Place'
                disabled={false}
                errorMessage={errors.m_grand_father_native_place}
            />
            <Input
                onChangeText={handleChange('m_grand_mother_first_name')}
                onBlur={handleBlur('m_grand_mother_first_name')}
                value={values.m_grand_mother_first_name}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label="Maternal Grand Mother's Name"
                disabled={false}
                errorMessage={errors.m_grand_mother_first_name}
            />
            <Input
                onChangeText={handleChange('m_grand_mother_native_name')}
                onBlur={handleBlur('m_grand_mother_native_name')}
                value={values.m_grand_mother_native_name}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label='Native Place'
                disabled={false}
                errorMessage={errors.m_grand_mother_native_name}
            />
            <Input
                onChangeText={handleChange('m_uncles')}
                onBlur={handleBlur('m_uncles')}
                value={values.m_uncles}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label='Maternal Uncles'
                disabled={false}
                keyboardType="number-pad"
                errorMessage={errors.uncles}
            />
        </View>
    );
};

export default EditMaternalParentalInfoComponent;

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#FFFAFB',
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
