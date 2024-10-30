import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Input } from "react-native-elements";
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import theme from '../../../theme/theme';
import Theme from '../../../components/Theme';
import moment from 'moment';
import GoogleMapAutoComplete from '../../../components/GoogleMapAutoComplete/GoogleMapAutoComplete';
import ModalSelector from 'react-native-modal-selector';

const EditPersonalInfoComponent = ({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors, setFieldValue }) => {
    const [open, setOpen] = useState(false);
    const maritalOptions = [
        { label: 'Never Married', value: 'never_married' },
        { label: 'Awaiting Divorce', value: 'awaiting_divorce' },
        { label: 'Divorced', value: 'divorced' },
        { label: 'Widowed', value: 'widowed' },
        { label: 'Annulled', value: 'annulled' },
    ];
    const [selectedGender, setSelectedGender] = useState(values.gender);
    const [selectedMaritalStatus, setSelectedMaritalStatus] = useState(values.marital_status);


    const data = [
        { key: 'male', label: 'Male' },
        { key: 'female', label: 'Female' },
    ];
    const maritalData = maritalOptions.map((item, index) => ({
        key: index.toString(),
        label: item.label,
        value: item.value,
    }));

    const [cities, setCities] = useState('');

    const LanguageOptions = [
        { label: 'English', value: 'english' },
        { label: 'Hindi', value: 'hindi' },
        { label: 'Marathi', value: 'marathi' },
        { label: 'Gujarati', value: 'gujarati' },
        { label: 'Punjabi', value: 'punjabi' },
        { label: 'Bengali', value: 'bengali' },
        { label: 'Kannada', value: 'kannada' },
        { label: 'Tamil', value: 'tamil' },
        { label: 'Telugu', value: 'telugu' },
        { label: 'Malayalam', value: 'malayalam' },
        { label: 'Urdu', value: 'urdu' },
        { label: 'Sindhi', value: 'sindhi' },
        { label: 'Konkani', value: 'konkani' },
        { label: 'Odia', value: 'odia' },
        { label: 'Assamese', value: 'assamese' },
        { label: 'Manipuri', value: 'manipuri' },
        { label: 'Sanskrit', value: 'sanskrit' },
        { label: 'Dogri', value: 'dogri' },
        { label: 'Bodo', value: 'bodo' },
        { label: 'Santhali', value: 'santhali' },
        { label: 'Maithili', value: 'maithili' },
        { label: 'Nepali', value: 'nepali' },
        { label: 'Kashmiri', value: 'kashmiri' },
        { label: 'Sourashtra', value: 'sourashtra' },
        { label: 'Other', value: 'other' },
    ];

    return (
        <View style={styles.formContainer}>
            <Input
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                value={values.first_name}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='First Name'
                label='First Name *'
                disabled={true}
                errorMessage={errors.first_name}
            />
            <Input
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                value={values.last_name}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Last name'
                label='Last Name *'
                disabled={true}
                errorMessage={errors.last_name}
            />
            <Input
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Email'
                label='Email'
                errorMessage={errors.email}
            />
            <View>
                <View>
                    <Theme.TextB color="#000000" size="12px">Gender</Theme.TextB>
                </View>
                <View style={styles.pickerBox}>
                    <ModalSelector
                        data={data}
                        initValue={selectedGender ? selectedGender : 'Select Gender'}
                        onChange={(option) => {
                            setSelectedGender(option.label);
                            handleChange('gender')(option.key);
                        }}
                        style={styles.selector}
                        initValueTextStyle={styles.initValueTextStyle}
                        selectTextStyle={styles.selectTextStyle}
                    />
                    {/* <Text style={styles.selectedText}>Selected: {selectedValue}</Text> */}
                </View>
            </View>
            <View style={{ marginTop: 20, marginBottom: 20 }}>
                <View>
                    <Theme.TextB color="#000000" size="12px">Marital Status</Theme.TextB>
                </View>
                <View style={styles.pickerBox}>
                    <ModalSelector
                        data={maritalData}
                        initValue={selectedMaritalStatus ? selectedMaritalStatus : "Select Marital Status"}
                        onChange={(option) => {
                            setSelectedMaritalStatus(option.label);
                            handleChange('marital_status')(option.value);
                        }}
                        style={styles.selector}
                        initValueTextStyle={styles.initValueTextStyle}
                        selectTextStyle={styles.selectTextStyle}
                    />
                    {/* <Text style={styles.selectedText}>Selected: {selectedMaritalStatus}</Text> */}
                </View>
            </View>
            <View style={{ marginBottom: 20 }}>
                <View>
                    <Theme.TextB color="#000000" size="12px">Date of Birth</Theme.TextB>
                    <TouchableOpacity onPress={() => setOpen(true)}>
                        <View style={styles.fakeInput}>
                            <Theme.Text color={theme.colors.grey0} style={styles.fakeInputText}>{values.dob}</Theme.Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <DatePicker
                    modal
                    open={open}
                    mode='date'
                    date={
                        values.dob
                            ? moment(values.dob, 'DD/MM/YYYY').isValid()
                                ? moment(values.dob, 'DD/MM/YYYY').toDate()
                                : moment(values.dob, 'YYYY-MM-DD').isValid()
                                    ? moment(values.dob, 'YYYY-MM-DD').toDate()
                                    : new Date() // Fallback to current date if both formats are invalid
                            : new Date() // Fallback to current date if dob is null/undefined
                    }
                    onConfirm={(date) => {
                        setOpen(false);
                        const newDate = moment(date).format('DD/MM/YYYY'); // or any preferred format
                        setFieldValue('dob', newDate);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />

            </View>
            <Input
                onChangeText={handleChange('place_of_birth')}
                onBlur={handleBlur('place_of_birth')}
                value={values.place_of_birth}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Birth Place'
                label='Birth Place'
                disabled={true}
                errorMessage={errors.place_of_birth}
            />
            <Input
                onChangeText={handleChange('birth_time')}
                onBlur={handleBlur('birth_time')}
                value={values.birth_time}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Birth Time am/pm'
                label='Birth Time am/pm'
                errorMessage={errors.birth_time}
            />
            {/* <GoogleMapAutoComplete cities={cities} setCities={setCities} /> */}

            <Input
                onChangeText={handleChange('height')}
                onBlur={handleBlur('height')}
                value={values.height}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Height'
                label='Height'
                disabled={true}
                errorMessage={errors.height}
            />
            <Input
                onChangeText={handleChange('weight')}
                onBlur={handleBlur('weight')}
                value={values.weight}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Weight'
                label='Weight (KG)'
                // disabled={true}
                errorMessage={errors.height}
            />

            {/* <GoogleMapAutoComplete /> */}

            <View style={{ marginTop: 20, marginBottom: 20 }}>
                <View>
                    <Theme.TextB color="#000000" size="12px">Language</Theme.TextB>
                </View>
                <View style={styles.pickerBox}>
                    <Picker
                        enabled={true}
                        style={styles.picker}
                        selectedValue={values.personal_info_language}
                        onValueChange={handleChange('personal_info_language')}>
                        {
                            LanguageOptions.map((item, index) => (
                                <Picker.Item key={index} label={item.label} value={item.value} />
                            ))
                        }
                    </Picker>
                </View>
            </View>
        </View>
    );
};

export default EditPersonalInfoComponent;

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
        borderColor: 'white',
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
        color: theme.colors.black
    },
});
