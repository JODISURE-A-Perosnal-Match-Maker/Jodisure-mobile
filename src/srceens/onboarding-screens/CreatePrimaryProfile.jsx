import { StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native'
import auth from '@react-native-firebase/auth'
import React, { Fragment, useState, useEffect, useMemo } from 'react'
import Theme from '../../components/Theme'
import { ScrollView } from 'react-native'
import theme from '../../theme/theme'
import { Formik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { useRoute, useIsFocused, useNavigation } from '@react-navigation/native';
import { genUUID, getHeightAndCity, getMyProfile, getReligions, updateProfile } from '../../services/UserService'
import RoundDarkButton from '../../components/RoundDarkButton'
import FullScreenLoader from '../../theme/FullScreenLoader'
import { showMessage } from 'react-native-flash-message'
import CustomFormikInput from '../../components/CustomFormikInput'
import DropDownPicker from 'react-native-dropdown-picker';
import GoogleMapAutoComplete from '../../components/GoogleMapAutoComplete/GoogleMapAutoComplete'
import { err } from 'react-native-svg/lib/typescript/xml'

const primary = theme.colors.grey3;
const editProfileSchema = yup.object().shape({
    profile_created_by: yup.string().trim().required('Profile for is required'),
    first_name: yup.string().trim().min(2, 'Too Short').required('First name is required.'),
    last_name: yup.string().trim().min(2, 'Too Short').required('Last name is required'),
    dob: yup.string().required('Date of birth is required').nullable(),
    // place_of_birth: yup.string().trim().min(5, 'Too short').required('Place of birth is required'),
    // city: yup.string().required('City is required'),
    gender: yup.string().required('Gender is required'),
    // eating_habits: yup.string().required('Eating habit is required'),
    marital_status: yup.string().required('Marital status is required'),
    profession: yup.string().trim().required('Profession is required'),
    company_name: yup.string().trim().required('Company name is required'),
    height: yup.string().required('Height is required'),
    // post_marriage_plan: yup.string().trim().required('Post marriage plan is required'),
    carrer_info: yup.string().trim().required('Highest qualification is required'),
    // university: yup.string().trim().required('University name is required'),
    // hobbies: yup.string().trim().required('Hobbies and interest are required'),
    // health_issue: yup.string().trim().required('Health issues (if any) are required'),
    sibling_count: yup.number().required('Number of siblings is required').typeError('Number of siblings must be a number'),
    personal_info_language: yup.string().trim().min(4, 'Too short').required('Language is required'),
});


const CreatePrimaryProfile = () => {
    const initialProfileValue = {
        profile_created_by: 'self',
        gender: 'male',
        marital_status: 'never_married',
        height: '5.08'
    }
    const [profile, setProfile] = useState(initialProfileValue);
    const [religions, setReligions] = useState([]);
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError]=useState(false)
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [isTotalPrivacyEnabled, setTotalPrivacyEnabled] = useState(false);
    const [isPhotoVisibilityEnabled, setPhotoVisibilityEnabled] = useState(false);
    const [height, setHeight] = useState([])
    const [cities, setCities] = useState([])
    const [open2, setOpen2] = useState(false);
    const [city, setCity] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Mango', value: 'mango' },
        { label: 'Pineapple', value: 'pineapple' },
        // Add more items as needed
    ]);


    const toggleTotalPrivacy = () => {
        setTotalPrivacyEnabled(previousState => !previousState)
        setPhotoVisibilityEnabled(false)

    };
    const togglePhotoVisibility = () => setPhotoVisibilityEnabled(previousState => !previousState);




    useEffect(() => {
        const fetchData = async () => {
            if (isFocused) {
                setLoading(true);
                try {
                    const { city, height } = await getHeightAndCity();
                    let pickCity
                    if (city) {

                        pickCity = city.map(city => ({
                            label: city,
                            value: city.toLowerCase().replace(/ /g, '_') // Convert city name to a suitable value format
                        }));
                    } else {
                        pickCity = []
                    }

                    const pickHeight = height.map(height => ({
                        label: height,
                        value: height // Convert height to a suitable value format
                    }));
                    // console.log("Pick height", pickHeight);


                    setHeight(pickHeight);
                    setCities(pickCity);

                    const profile = await getMyProfile();
                    console.log(profile.exists);

                    if (profile.exists) {
                        const data = profile.data();
                        setProfile({ ...initialProfileValue, ...data });
                    } else {
                        setProfile(initialProfileValue);
                    }
                } catch (err) {
                    console.log(err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [isFocused]);

    useMemo(() => {
        if (!profile) return;
        if (profile.isBasicInfoCompleted) {
            navigation.replace('UpdateReligionInfo');
        }
    }, [profile]);

    const Form =
        (
            <Formik
                initialValues={profile}
                onSubmit={values => {
                    values.isBasicInfoCompleted = true;
                    values.isPhotoVisibilityEnabled = isPhotoVisibilityEnabled;
                    values.isTotalPrivacyEnabled = isTotalPrivacyEnabled;
                    values.city = city;
                    if(!city){
                        setError(true)
                        alert("Please enter city")
                    }else{
                        
                        console.log(values);
                        // showMessage({ message: 'Profile updation failed!', type: "danger" })
                        setLoading(true);
                        console.log("This is my user profile-->", values)
                        updateProfile(values).then(res => {
                            showMessage({ message: 'Profile updated', type: "success" });
                            navigation.replace('UpdateReligionInfo');
                        }).catch(err => {
                            console.log(err);
                            showMessage({ message: 'Profile updation failed!', type: "danger" })
                        })
                    }
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
                        {JSON.stringify(errors,null,2)}
                    </Text> */}
                            <View style={{ marginVertical: 20 }}></View>
                            <CustomFormikInput
                                type="picker"
                                label="Your relation to profile? *"
                                placeholder="Relationship"
                                value={values.profile_created_by}
                                disabled={false}
                                helpText={'Choose self if you are creating your own profile.'}
                                onChangeText={handleChange('profile_created_by')}
                                pickerOptions={
                                    [
                                        { label: 'Self', value: 'self' },
                                        { label: 'Family', value: 'family' },
                                        { label: 'Relative', value: 'relative' },
                                        { label: 'Friend', value: 'friend' },
                                        { label: 'Others', value: 'others ' },
                                    ]
                                }
                            />
                            <View style={{ marginBottom: 20 }}></View>
                            <CustomFormikInput
                                type="input"
                                label="First Name *"
                                placeholder="First Name"
                                value={values.first_name}
                                disabled={false}
                                error={touched.first_name && errors.first_name}
                                onChangeText={handleChange('first_name')}
                                onBlur={handleBlur('first_name')}
                            />
                            <CustomFormikInput
                                type="input"
                                label="Last Name *"
                                placeholder="Last Name"
                                value={values.last_name}
                                disabled={false}
                                error={touched.last_name && errors.last_name}
                                onChangeText={handleChange('last_name')}
                                onBlur={handleBlur('last_name')}
                            />

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
                                <View style={{ opacity: isTotalPrivacyEnabled ? .25 : 1 }}>

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
                            <View style={{ alignSelf: 'flex-start', paddingLeft: 10 }}>
                                <Text style={{ color: theme.colors.grey0, fontWeight:"800", fontSize: 16 }}>City *</Text>
                            </View>
                            {/* <DropDownPicker
                                open={open2}
                                value={city}
                                items={cities}
                                setOpen={setOpen2}
                                setValue={setCity}
                                setItems={setCities}
                                searchable={true}
                                placeholder="Select a City"
                                searchPlaceholder="Search..."
                                listMode="MODAL"
                                modalProps={{
                                    animationType: 'slide',
                                }}
                                style={styles.dropdown}
                                placeholderStyle={{color:theme.colors.grey0}}
                                dropDownContainerStyle={styles.dropdownContainer}
                            /> */}

                            {/* <CustomFormikInput
                                type="input"
                                label="City *"
                                placeholder="Type your city"
                                value={values.city}
                                disabled={false}
                                error={touched.city && errors.city}
                                onChangeText={handleChange('city')}
                                onBlur={handleBlur('city')}
                            /> */}
                            <View style={styles.pickerBox}>
                                <GoogleMapAutoComplete cities={city} setCities={setCity}/>

                            </View>
                            <View>
                                {error?<Text>Please enter city</Text>:<></>}
                            </View>
                            <CustomFormikInput
                                type="picker"
                                label="Gender *"
                                placeholder="Gender"
                                value={values.gender}
                                disabled={false}
                                helpText={'Select gender'}
                                onChangeText={handleChange('gender')}
                                pickerOptions={
                                    [
                                        { label: 'Male', value: 'male' },
                                        { label: 'Female', value: 'female' },
                                    ]
                                }
                            />
                            <View style={{ marginBottom: 20 }}></View>

                            <CustomFormikInput
                                type="picker"
                                label="Eating Habit *"
                                placeholder="Eating Habit"
                                value={values.eating_habits}
                                disabled={false}
                                helpText={'Select Eating Habits'}
                                onChangeText={handleChange('eating_habits')}
                                pickerOptions={
                                    [
                                        { label: 'Jain vegetarian', value: 'Jain vegetarian' },
                                        { label: 'Vegan', value: 'Vegan' },
                                        { label: 'Vegetarian', value: 'Vegetarian' },
                                        { label: 'Non Vegetarian', value: 'Non Vegetarian' },
                                        { label: 'Ovo vegetarian', value: 'Ovo vegetarian' },
                                    ]
                                }
                            />
                            <View style={{ marginBottom: 20 }}></View>
                            <CustomFormikInput
                                type="picker"
                                label="Marital Status *"
                                placeholder="Marital Status"
                                value={values.marital_status}
                                disabled={false}
                                helpText={'Select marital status'}
                                onChangeText={handleChange('marital_status')}
                                pickerOptions={
                                    [
                                        { label: 'Never Married', value: 'never_married' },
                                        { label: 'Awaiting Divorce', value: 'awaiting_divorce' },
                                        { label: 'Divorced', value: 'divorced' },
                                        { label: 'Widowed', value: 'widowed' },
                                        { label: 'Annulled', value: 'annulled' },
                                    ]
                                }
                            />
                            <View style={{ marginBottom: 20 }}></View>
                            <CustomFormikInput
                                type="date"
                                label="Date of Birth *"
                                placeholder="Select date of birth"
                                value={values.dob}
                                onChangeText={handleChange('dob')}
                                open={open}
                                setFieldValue={setFieldValue}
                                setOpen={setOpen}
                                error={errors.dob}
                                minimumDate={moment().subtract(50, 'years').toDate()}
                                maximumDate={moment().subtract(18, 'years').toDate()}
                            />
                            <View style={{ marginBottom: 20 }}></View>
                            <CustomFormikInput
                                type="input"
                                label="Birth Place *"
                                placeholder="Birth Place"
                                value={values.place_of_birth}
                                disabled={false}
                                error={touched.place_of_birth && errors.place_of_birth}
                                onChangeText={handleChange('place_of_birth')}
                                onBlur={handleBlur('place_of_birth')}
                            />
                            <CustomFormikInput
                                type="input"
                                label="Profession *"
                                placeholder="Profession"
                                value={values.profession}
                                disabled={false}
                                error={touched.profession && errors.profession}
                                onChangeText={handleChange('profession')}
                                onBlur={handleBlur('profession')}
                            />
                            <CustomFormikInput
                                type="input"
                                label="Company Name *"
                                placeholder="company name"
                                value={values.company_name}
                                disabled={false}
                                error={touched.company_name && errors.company_name}
                                onChangeText={handleChange('company_name')}
                                onBlur={handleBlur('company_name')}
                            />
                            <CustomFormikInput
                                type="picker"
                                label="Height *"
                                placeholder="Height"
                                value={values.height}
                                disabled={false}
                                // helpText={'Select height'}
                                onChangeText={handleChange('height')}
                                pickerOptions={height}

                            />
                            <View style={{ marginBottom: 20 }}></View>

                            <CustomFormikInput
                                type="input"
                                label="Weight(KG) *"
                                placeholder="Weight"
                                value={values.weight}
                                disabled={false}
                                error={touched.weight && errors.weight}
                                onChangeText={handleChange('weight')}
                                onBlur={handleBlur('weight')}
                            />
                            <View style={{ marginBottom: 20 }}></View>

                            <CustomFormikInput
                                type="input"
                                label="Post Marriage Plan *"
                                placeholder="Post marriage plan"
                                value={values.post_marriage_plan}
                                disabled={false}
                                error={touched.post_marriage_plan && errors.post_marriage_plan}
                                onChangeText={handleChange('post_marriage_plan')}
                                onBlur={handleBlur('post_marriage_plan')}
                            />

                            <View style={{ marginBottom: 20 }}></View>

                            <CustomFormikInput
                                type="input"
                                label="Highest Qualification *"
                                placeholder="Highest Qualification"
                                value={values.carrer_info}
                                disabled={false}
                                error={touched.carrer_info && errors.carrer_info}
                                onChangeText={handleChange('carrer_info')}
                                onBlur={handleBlur('carrer_info')}
                            />
                            <CustomFormikInput
                                type="input"
                                label="University Name *"
                                placeholder="University Name"
                                value={values.university}
                                disabled={false}
                                error={touched.university && errors.university}
                                onChangeText={handleChange('university')}
                                onBlur={handleBlur('university')}
                            />
                            <CustomFormikInput
                                type="input"
                                label="Hobbies and interest *"
                                placeholder="Hobbies"
                                value={values.hobbies}
                                disabled={false}
                                error={touched.hobbies && errors.hobbies}
                                onChangeText={handleChange('hobbies')}
                                onBlur={handleBlur('hobbies')}
                            />
                            <CustomFormikInput
                                type="input"
                                label="Health Issues(if any) *"
                                placeholder="Type NA if none"
                                value={values.health_issue}
                                disabled={false}
                                error={touched.health_issue && errors.health_issue}
                                onChangeText={handleChange('health_issue')}
                                onBlur={handleBlur('health_issue')}
                            />
                            <CustomFormikInput
                                type="input"
                                label="Number of Sibling you have *"
                                placeholder="No. of siblings"
                                value={values.sibling_count}
                                disabled={false}
                                error={touched.sibling_count && errors.sibling_count}
                                onChangeText={handleChange('sibling_count')}
                                onBlur={handleBlur('sibling_count')}
                            />
                            <CustomFormikInput
                                type="input"
                                label="Mother Tongue *"
                                placeholder="Language"
                                value={values.personal_info_language}
                                disabled={false}
                                error={touched.personal_info_language && errors.personal_info_language}
                                onChangeText={handleChange('personal_info_language')}
                                onBlur={handleBlur('personal_info_language')}
                            />
                            <View style={{ paddingHorizontal: 50, marginBottom: 20, marginVertical: 20 }}>
                                <RoundDarkButton 
                                disabled={!isValid || error} 
                                name="Create bride/groom account" onPress={handleSubmit} />
                            </View>
                        </Fragment>
                    )
                }
            </Formik>
        );

    return (
        
        <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='always'
            contentContainerStyle={styles.container}>
            <Theme.TextB size={'24px'} style={{ textAlign: 'center' }}>
                Great! Now some basic details about you
            </Theme.TextB>
            {/* <View style={styles.infoBox}>
                <Theme.Text>
                    You can create a bride/groom profile for you or your family member (daughter, son, sister, brother, etc.) for whom you are looking for a soulmate
                </Theme.Text>
            </View> */}
            {/* <Text>
                {JSON.stringify(profile,null,2)}
            </Text> */}
            {loading ? <FullScreenLoader /> : null}
            {(!loading && profile) && Form}
        </ScrollView>
    )
}

export default CreatePrimaryProfile


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropdown: {
        backgroundColor: '#fffff',
        // marginLeft:10,
        width: "95%",
        margin: 10,
        color: theme.colors.grey0,
        borderColor: theme.colors.grey0,
    },
    dropdownContainer: {
        backgroundColor: '#dfdfdf',
    },
    toggleContainer: {
        // marginBottom: 20,
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
        color: theme.colors.grey0
    },
    toggleDescription: {
        fontSize: 14,
        color: theme.colors.grey0,
    },
    toggleSwitch: {
        marginLeft: 'auto',
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
        marginBottom:20,
        zIndex:100,
        // marginRight: 20,
        height: 48,
        width:"95%"
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