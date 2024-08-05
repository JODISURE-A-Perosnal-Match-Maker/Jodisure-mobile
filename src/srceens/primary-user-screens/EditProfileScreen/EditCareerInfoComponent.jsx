import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Input } from "react-native-elements";
import theme from '../../../theme/theme';

const EditCareerInfoComponent = ({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors, setFieldValue }) => {
    const [open, setOpen] = useState(false)
    return (
        <View style={styles.formContainer}>
            <Input
                onChangeText={handleChange('carrer_info')}
                onBlur={handleBlur('carrer_info')}
                value={values.carrer_info}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Highest Qualification'
                label='Highest Qualification'
                disabled={false}
                errorMessage={errors.carrer_info}
            />
            <Input
                onChangeText={handleChange('university')}
                onBlur={handleBlur('university')}
                value={values.university}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='University/College'
                label='University/College'
                disabled={false}
                errorMessage={errors.university}
            />
            <Input
                onChangeText={handleChange('profession')}
                onBlur={handleBlur('profession')}
                value={values.profession}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Profession'
                label='Profession'
                disabled={false}
                errorMessage={errors.profession}
            />
            <Input
                onChangeText={handleChange('company_name')}
                onBlur={handleBlur('company_name')}
                value={values.company_name}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Company Name'
                label='Company Name'
                disabled={false}
                errorMessage={errors.company_name}
            />
            <Input
                onChangeText={handleChange('company_location')}
                onBlur={handleBlur('company_location')}
                value={values.company_location}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Company Location'
                label='Company Location'
                disabled={false}
                errorMessage={errors.company_location}
            />
            {/* <Input
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                value={values.city}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='City'
                label='City'
                disabled={false}
                errorMessage={errors.city}
            />
            <Input
                onChangeText={handleChange('country')}
                onBlur={handleBlur('country')}
                value={values.country}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Country'
                label='Country'
                disabled={false}
                errorMessage={errors.country}
            /> */}
        </View>
    );
};

export default EditCareerInfoComponent;

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
