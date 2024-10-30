import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// import { getMyPreferences, getReligions, setMyPreferences } from '../../services/UserService';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
// import MultiSelect from 'react-native-multiple-select';
// import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import MultipleSelect from 'react-native-multiple-select';
// import GoogleMapAutoComplete from '../../components/GoogleMapAutoComplete/GoogleMapAutoComplete';
// import MultipleGoogleMapAutoComplete from '../../components/GoogleMapAutoComplete/MultipleGoogleMapAutoComplete';
import { getMyPreferences, getReligions, setMyPreferences } from '../../../services/UserService';
import Theme from '../../../components/Theme';
import theme from '../../../theme/theme';
import AdditionalUserPreference from './AdditionalUserPreference';
import ModalSelector from 'react-native-modal-selector';

const maritalOptions = [
    { key: 0, label: 'Select Status', value: undefined },
    { key: 1, label: 'Never Married', value: 'never_married' },
    { key: 2, label: 'Awaiting Divorce', value: 'awaiting_divorce' },
    { key: 3, label: 'Divorced', value: 'divorced' },
    { key: 4, label: 'Widowed', value: 'widowed' },
    { key: 5, label: 'Annulled', value: 'annulled' },
];

const genderOptions = [
    { key: 0, label: 'Select Gender', value: undefined },
    { key: 1, label: 'Male', value: 'male' },
    { key: 2, label: 'Female', value: 'female' },
];
const UserPreference = () => {
    const [marital_status, setMaritalStatus] = useState();
    const [religion, setReligion] = useState();
    const [religions, setReligions] = useState([]);
    const [gender, setGender] = useState();
    const [fromValue, setFromValue] = useState(32);
    const [fromValue2, setFromValue2] = useState(10);
    const [toValue, setToValue] = useState(21);
    // const [selectedItems, setSelectedItems] = useState([]);
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState([]);
    const [cities, setCities] = useState()
    const scrollViewRef = useRef(null);


    const onSelectedItemsChange = (selectedItems) => {
        const selectedNames = selectedItems.map(itemId => data.find(item => item.id === itemId).name);
        if (JSON.stringify(selected) !== JSON.stringify(selectedItems)) {
            setSelected(selectedItems);
            setReligion(selectedNames);
        }
    };


    const handleSliderChange = useCallback((values) => {
        const [from, to] = values;
        if (from !== fromValue || to !== toValue) {
            setFromValue(from);
            setToValue(to);
        }
    }, [fromValue, toValue]);



    useEffect(() => {
        if (religions.length) {
            const mappedData = religions.map((item, index) => ({ id: index.toString(), name: item }));
            setData(mappedData);
        }
    }, [religions]);


    const width = Dimensions.get('window').width;

    useEffect(() => {
        getPreference();

    }, []);

    const handleMaritalStatusChange = (option) => {
        setMaritalStatus(option.value);
      };

    const getPreference = () => {
        getReligions()
            .then(rs => {
                console.log(rs);
                setReligions(rs);
                console.log("List of all religion", rs);
                return getMyPreferences();
            }).then(res => {
                if (res.exists) {
                    const { marital_status, religion, gender, fromValue, toValue } = res.data();
                    if (marital_status !== maritalStatus) setMaritalStatus(marital_status);
                    if (religion !== religionState) setReligion(religion); // Avoid name clash with religion state
                    if (gender !== genderState) setGender(gender); // Check if it differs from the state
                    if (fromValue !== fromStateValue) setFromValue(fromValue);
                    if (toValue !== toStateValue) setToValue(toValue);
                } else {
                    alert('No preference is set! please set your preference.')
                }
            })
    }
    console.log('My prefered religion', religion);

    const setPreference = () => {
        const data = { marital_status, religion, gender, fromValue, toValue };
        // console.log("It is getting saved", religion);
        if (!marital_status || !religion || !gender || !fromValue || !toValue) {
            return alert('All fields are required!');
        }
        setMyPreferences(data).then(res => {
            alert('Your preference has been set.')
        }).catch(err => {
            alert('Unable to set your preference try again.')
        })
    }

    return (
        // <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
        // style={{ flex: 1 }}>
        <ScrollView
            keyboardShouldPersistTaps='always'

            ref={scrollViewRef}
            style={styles.container}>

            <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>Preferences</Text>
                <View style={styles.separatorLine} />
            </View>
            <View>
                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Marital status {marital_status}</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={maritalOptions}
                            initValue={marital_status ? marital_status : "Select Marital Status"}
                            onChange={handleMaritalStatusChange}
                            selectStyle={styles.selectStyle}
                            selectTextStyle={styles.selectTextStyle}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Gender</Theme.TextB>
                    </View>
                    <View >
                        <ModalSelector
                            disabled={true}
                            data={genderOptions}
                            initValue={gender ? gender : "Select Gender"}
                            onChange={(option) => setGender(option.value)}
                            selectStyle={styles.selectStyle}
                            selectTextStyle={styles.selectTextStyle}
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Religion</Theme.TextB>
                    </View>
                    <View>

                        <MultipleSelect
                            items={data}
                            uniqueKey="id"
                            onSelectedItemsChange={onSelectedItemsChange}
                            selectedItems={selected}
                            textColor='#969696'
                            styleSelectorContainer={{ col: "red" }}
                            selectText="Select Multiple Religions"
                            searchInputPlaceholderText="Search religion..."
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}

                            // submitButtonColor="#CCC"
                            // submitButtonText="Submit"
                            hideSubmitButton={true}

                        />

                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Age</Theme.TextB>
                        <Theme.Text color={theme.colors.secondaryMedium} size="12px">{fromValue} - {toValue}</Theme.Text>
                        {/* <RangeSlider min={21} max={50}
                            fromValueOnChange={value => setFromValue(value)}
                            toValueOnChange={value => setToValue(value)}
                            initialFromValue={fromValue}
                            initialToValue={toValue}
                            styleSize="small"
                            fromKnobColor="#a05b85"
                            toKnobColor="#a05b85"
                            outOfRangeBarColor="#979797"
                            inRangeBarColor="#a05b85"
                        /> */}
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', top: 10, flexDirection: 'row' }}>
                            <Theme.Text color={theme.colors.secondaryMedium}>21</Theme.Text>
                            <MultiSlider
                                min={21}
                                max={50}
                                sliderLength={width - 100}
                                values={[fromValue, toValue]}
                                enableLabel={false}
                                allowOverlap={false}
                                minMarkerOverlapDistance={5}
                                trackStyle={{ height: 5, }}
                                selectedStyle={{ backgroundColor: theme.colors.secondaryMedium }}
                                markerStyle={{ height: 20, width: 20, top: 2, backgroundColor: theme.colors.secondaryMedium }}
                                onValuesChangeFinish={handleSliderChange}
                            />

                            <Theme.Text color={theme.colors.secondaryMedium}>50</Theme.Text>
                        </View>
                    </View>

                </View>

            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={setPreference}>
                    <View style={styles.roundOutlineButton}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="14px">SUBMIT</Theme.TextB>
                    </View>
                </TouchableOpacity>
            </View>

            <AdditionalUserPreference marital_status={marital_status} religion={religion} gender={gender} fromValue={fromValue} toValue={toValue} />
        </ScrollView>
        // </KeyboardAvoidingView> 

    )
}

export default UserPreference;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 16,
        // paddingBottom
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.secondaryMedium,
    },
    separatorText: {
        marginHorizontal: 8,
        fontSize: 14,
        color: theme.colors.secondaryMedium,
    },
    inputContainer: {
        marginTop: 24
    },
    pickerBox: {
        backgroundColor: '#ffffff',
        borderColor: '#e2e2e2',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 8,
    },
    picker: {
        width: '100%',
        // borderWidth: 1,
        // borderColor: 'red',
        color: '#969696'
    },
    card: {
        backgroundColor: '#c3719b',
        borderRadius: 4,
        padding: 16,
        marginVertical: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        margin: 8,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    hr: {
        margin: 17,
        width: '100%',
        height: 1,
        backgroundColor: '#ffffff'
    },
    listClickCard: {
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#9fcdd6',
        borderRadius: 4,
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 27,
    },
    darkCard: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 1,
        marginVertical: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#93bbca',
        borderColor: 'transparent',
        alignItems: 'flex-start'
    },
    buttonContainer: {
        paddingHorizontal: 16,
        marginVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    roundPrimaryButton: {
        paddingVertical: 7,
        paddingHorizontal: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#ffffff',
    },
    roundOutlineButton: {
        marginTop: 30,
        paddingVertical: 7,
        paddingHorizontal: 51,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderColor: theme.colors.secondaryDark2,
        // backgroundColor:'#bd6f9e',
        borderWidth: 1,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%'
    },
    bannerImage: {
        // top:-30,
        width: 183,
        height: 148,
        resizeMode: 'contain',
    },
    seperator: {
        backgroundColor: '#e8e8e8',
        height: 8,
        marginVertical: 20,
    }
});