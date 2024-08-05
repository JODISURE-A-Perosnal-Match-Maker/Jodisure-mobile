import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Theme from './Theme';
import theme from '../theme/theme';
import { Input } from "react-native-elements";
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ModalSelector from 'react-native-modal-selector';
const primary = theme.colors.grey0;
/**
 * 
 * @param {type} oneof input | picker  
 * @param {label} string  
 * @param {pickerOptions} array of {label:value}  
 * @returns React Component
 */
const CustomFormikInput = ({ type, label, placeholder, value, disabled, error, helpText, onChangeText, onBlur, open, setOpen, setFieldValue, pickerOptions = [], ...rest }) => {
    const TextInput = (
        <View style={styles.formInput}>
            <Input
                onChangeText={onChangeText}
                onBlur={onBlur}
                value={value}
                containerStyle={styles.containerStyle}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder={placeholder}
                label={label}
                disabled={disabled}
                errorMessage={error}
                placeholderTextColor={theme.colors.grey1}
                {...rest}
            />
            {
                helpText ? <Theme.Text style={{ padding: "2.5%" }}>{helpText}</Theme.Text> : null
            }
        </View>
    );

    const PickerInput = (
        <View style={{ left: 10, ...styles.formInput }}>
            <View>
                <Theme.TextB style={{ fontSize: 18 }} color={primary}>{label}</Theme.TextB>
            </View>
            {/* <View style={styles.pickerBox}> */}
            <ModalSelector
                    data={pickerOptions.map((item, index) => ({ key: index.toString(), label: item.label, value: item.value }))}
                    initValue={value || `Select ${label}`}
                    onChange={(option) => onChangeText(option.value)}
                    // style={styles.pickerBox}
                    selectStyle= {styles.pickerBox}
                    optionTextStyle={styles.optionTextStyle}
                    optionContainerStyle={styles.optionContainerStyle}

                    initValueTextStyle={styles.initValueTextStyle}
                    selectTextStyle={styles.selectTextStyle}
                    {...rest}
                />
            {/* </View> */}
            {
                error ? <Theme.Text color={theme.colors.error}>{error}</Theme.Text> : null
            }
            {
                helpText ? <Theme.Text>{helpText}</Theme.Text> : null
            }

        </View>
    );

    const DateInput = (
        <View style={{ left: 10, marginBottom: 20, ...styles.formInput }}>
            <View>
                <Theme.TextB style={{ fontSize: 18 }} color={theme.colors.grey0}>{label}</Theme.TextB>
                <TouchableOpacity onPress={() => setOpen(true)}>
                    <View style={styles.fakeInput}>
                        <Text style={styles.fakeInputText}>{value ? value : placeholder}</Text>
                    </View>
                </TouchableOpacity>
                {error ? <Text style={{ color: theme.colors.error }}>{error}</Text> : null}
                {
                    helpText ? <Theme.Text>{helpText}</Theme.Text> : null
                }

            </View>
            <DatePicker
                modal
                open={open}
                mode='date'
                date={value ? moment(value, 'DD/MM/YYYY').toDate() : moment().subtract(26, 'years').toDate()}
                onConfirm={(date) => {
                    console.log("D A T E - - >", typeof(date));
                    setOpen(false);
                    const newDate = moment(date).format('DD/MM/YYYY');
                    console.log("M O M E N T", typeof(newDate));
                    setFieldValue('dob', newDate);
                    // setFieldValue('dob', moment(date).format('DD/MM/YYYY'));

                }}
                onCancel={() => {
                    setOpen(false)
                }}
                {...rest}
            />
        </View>
    );

    switch (type) {
        case "input":
            return TextInput;
        case "picker":
            return PickerInput;
        case "date":
            return DateInput;
        default:
            break;
    }
    return (
        <View>
            <Text>CustomFormikInput</Text>
        </View>
    )
}

export default CustomFormikInput

const styles = StyleSheet.create({
    formInput: {
        width: '100%'
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
    initValueTextStyle: {
        color: theme.colors.grey0, // Initial value text color
        fontSize: 16,
      },
      optionTextStyle:{
        color: theme.colors.grey0, // Initial value text color
        fontSize: 16,
        opacity:1
      },
      optionContainerStyle: {
        backgroundColor: 'white', // Solid background for the option list
        borderWidth: 1,
        borderColor: '#ccc',
      },    
    pickerBox: {
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.grey0,
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 4,
        marginRight: 20,
        paddingLeft: 0,
        height: 48,
        // backgroundColor:"red",
        flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    picker: {
        borderWidth: 1,
        color: theme.colors.grey0,
        marginTop: -4,
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