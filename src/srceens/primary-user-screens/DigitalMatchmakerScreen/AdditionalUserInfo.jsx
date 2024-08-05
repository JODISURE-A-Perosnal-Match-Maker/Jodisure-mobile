import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getMyProfile, getPreferenceAndAbout, updateProfile } from '../../../services/UserService';
import MultipleSelect from 'react-native-multiple-select';
import theme from '../../../theme/theme';
import Theme from '../../../components/Theme';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import CustomFormikInput from '../../../components/CustomFormikInput';
import GoogleMapAutoComplete from '../../../components/GoogleMapAutoComplete/GoogleMapAutoComplete';
import ModalSelector from 'react-native-modal-selector';


const AdditionalUserInfo = () => {

    const [chewing_addictions, setChewingAddiction] = useState();
    const [chewing_addictionss, setchewing_addictions] = useState([]);

    const [complexion, setComplexion] = useState();
    const [complexions, setComplexions] = useState([]);

    const [drinking, setDrinking] = useState();
    const [drinkings, setDrinkings] = useState([]);

    const [height, setHeight] = useState()
    const [heights, setHeights] = useState([])

    const [educational_level, seteducational_level] = useState();
    const [educational_levels, seteducational_levels] = useState([]);

    const [family_believes, setfamily_believes] = useState();
    const [family_believess, setfamily_believess] = useState([]);

    const [family_status, setfamily_status] = useState();
    const [family_statuses, setfamily_statuses] = useState([]);

    const [family_type, setfamily_type] = useState();
    const [family_types, setfamily_types] = useState([]);

    const [health_issues, sethealth_issues] = useState();
    const [health_issuess, sethealth_issuess] = useState([]);

    const [house_chores, sethouse_chores] = useState();
    const [house_choress, sethouse_choress] = useState([]);

    const [lifestyle, setLifestyle] = useState();
    const [lifestyles, setLifestyles] = useState([]);

    const [past_relationship, setpast_relationship] = useState();
    const [past_relationships, setpast_relationships] = useState([]);

    const [profession_type, setprofession_type] = useState();
    const [profession_types, setprofession_types] = useState([]);

    const [smoking, setSmoking] = useState();
    const [smokings, setSmokings] = useState([]);

    const [weight, setWeight] = useState();

    const [city, setCity] = useState('');



    const handleSubmit = async () => {
        try {
            const data = {
                chewing_addictions, complexion, drinking,
                educational_level, family_believes, family_status,
                family_type, health_issues, house_chores,
                lifestyle, past_relationship,
                profession_type, smoking, height, city
            }
            console.log("data-->", data);
            await updateProfile(data)
            showMessage({ title: "Success", type: "success", message: 'Shared your information as primary user.' })

        } catch (e) {
            showMessage({ title: "Failed", type: "danger", message: 'Your information did not get saved' })
            console.log(e);

        }

    }
    useEffect(() => {
        // console.log("checcccckkk");
    }, [educational_levels])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    chewing_addictions,
                    complexion,
                    drinking,
                    educational_level,
                    family_believes,
                    family_status,
                    family_type,
                    health_issues,
                    house_chores,
                    lifestyle,
                    past_relationship,
                    profession_type,
                    smoking,
                    height
                } = await getPreferenceAndAbout();

                console.log("got this from backend", {
                    chewing_addictions,
                    complexion,
                    drinking,
                    educational_level,
                    family_believes,
                    family_status,
                    family_type,
                    health_issues,
                    house_chores,
                    lifestyle,
                    past_relationship,
                    profession_type,
                    smoking,
                    height
                });
                // setData((data));
                setchewing_addictions((chewing_addictions));
                setComplexions((complexion));
                setDrinkings((drinking));
                seteducational_levels((educational_level));
                setfamily_believess((family_believes));
                setfamily_statuses((family_status));
                setfamily_types((family_type));
                sethealth_issuess((health_issues));
                sethouse_choress((house_chores));
                setLifestyles((lifestyle));
                setpast_relationships((past_relationship));
                setprofession_types((profession_type));
                setSmokings((smoking));
                setHeights(height);

                console.log("education-------->",);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchProfile = async () => {
            const user = await getMyProfile();
            const profile = user.data()

            if (profile.chewing_addictions) setChewingAddiction(profile.chewing_addictions);
            if (profile.complexion) setComplexion(profile.complexion);
            if (profile.drinking) setDrinking(profile.drinking);
            if (profile.educational_level) seteducational_level(profile.educational_level);
            if (profile.family_believes) setfamily_believes(profile.family_believes);
            if (profile.family_status) setfamily_status(profile.family_status);
            if (profile.family_type) setfamily_type(profile.family_type);
            if (profile.health_issues) sethealth_issues(profile.health_issues);
            if (profile.house_chores) sethouse_chores(profile.house_chores);
            if (profile.lifestyle) setLifestyle(profile.lifestyle);
            if (profile.past_relationship) setpast_relationship(profile.past_relationship);
            if (profile.profession_type) setprofession_type(profile.profession_type);
            if (profile.smoking) setSmoking(profile.smoking);
            if (profile.height) setHeight(profile.height);
            if (profile.weight) setWeight(profile.weight);
            if (profile.city) setCity(profile.city);

            // console.log("profile------->", chewing_addictions, complexion, drinking, educational_level,
            //     family_believes, family_status
            // );


        };

        fetchData();
        fetchProfile()
    }, []);
    return (
        <View style={{backgroundColor:'white', height:'100%'}}>
        <ScrollView
            keyboardShouldPersistTaps='always'

            style={styles.container}>

            <View style={{ paddingBottom: 50 }}>
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>Personal information</Text>
                    <View style={styles.separatorLine} />
                </View>

                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">City</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <GoogleMapAutoComplete cities={city} setCities={setCity} />

                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark}

                            size="12px">Past Relationship</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={past_relationships.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={past_relationship || 'Select Past Relationship'}
                            onChange={(option) => setpast_relationship(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">Complexion</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={complexions.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={complexion || 'Select Complexion'}
                            onChange={(option) => setComplexion(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">Height (ft)</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={heights.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={height || 'Select Height'}
                            onChange={(option) => setHeight(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>

                
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>Career information</Text>
                    <View style={styles.separatorLine} />
                </View>


                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">Education Level</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={educational_levels.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={educational_level || 'Select Educational Level'}
                            onChange={(option) => seteducational_level(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">Profession Types</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={profession_types.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={profession_type || 'Select Profession Type'}
                            onChange={(option) => setprofession_type(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>Family information</Text>
                    <View style={styles.separatorLine} />
                </View>

                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">Family Believes</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={family_believess.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={family_believes || 'Select Family Believes'}
                            onChange={(option) => setfamily_believes(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>


                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">Family Status</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={family_statuses.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={family_status || 'Select Family Status'}
                            onChange={(option) => setfamily_status(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">Family Type</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={family_types.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={family_type || 'Select Family Type'}
                            onChange={(option) => setfamily_type(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>

                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>Lifestyle information</Text>
                    <View style={styles.separatorLine} />
                </View>

                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">House Chore</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={house_choress.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={house_chores || 'Select House Chores'}
                            onChange={(option) => sethouse_chores(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">Lifestyle</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={lifestyles.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={lifestyle || 'Select Lifestyle'}
                            onChange={(option) => setLifestyle(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>

                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>Health and drinking</Text>
                    <View style={styles.separatorLine} />
                </View>

                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">Health Issues</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={health_issuess.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={health_issues || 'Select Health Issues'}
                            onChange={(option) => sethealth_issues(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>


                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">Drinking</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={drinkings.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={drinking || 'Select Drinking Habit'}
                            onChange={(option) => setDrinking(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">Smoking</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={smokings.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={smoking || 'Select Smoking Habit'}
                            onChange={(option) => setSmoking(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View>
                        <Theme.TextB color={theme.colors.primaryDark} size="12px">Chewing Addictions</Theme.TextB>
                    </View>
                    <View style={styles.pickerBox}>
                        <ModalSelector
                            data={chewing_addictionss.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                            initValue={chewing_addictions || 'Select Chewing Addiction'}
                            onChange={(option) => setChewingAddiction(option.value)}
                            style={styles.selector}
                            initValueTextStyle={styles.initValueTextStyle}
                            selectTextStyle={styles.selectTextStyle}
                            optionTextStyle={styles.optionTextStyle}

                        />
                    </View>
                </View>
            </View>





        </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={styles.roundOutlineButton}>
                            <Theme.TextB color={theme.colors.boneWhite} size="14px">SUBMIT</Theme.TextB>
                        </View>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default AdditionalUserInfo
const styles = StyleSheet.create(
    {
        separatorContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 50,
        },
        separatorLine: {
            flex: 1,
            height: 1,
            backgroundColor: theme.colors.primary,
        },
        separatorText: {
            marginHorizontal: 8,
            fontSize: 14,
            color: theme.colors.primary,
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
            borderTopLeftRadius:100,
            borderTopRightRadius:100,
            // marginVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom:16,
            backgroundColor:theme.colors.primaryMedium,
            shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
        },
        optionTextStyle:{
            color: theme.colors.grey0, // Initial value text color
            fontSize: 16,
            opacity:1
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
            borderColor: '#a05b85',
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
        },
        container: {
            flex: 1,
            backgroundColor: '#ffffff',
            padding: 16,
            paddingBottom: 50
        },
        separatorContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 24,
        },
        separatorLine: {
            flex: 1,
            height: 1,
            backgroundColor: theme.colors.primary,
        },
        separatorText: {
            marginHorizontal: 8,
            fontSize: 14,
            color: theme.colors.primary,
        },
        inputContainer: {
            marginTop: 24
        },

        picker: {
            width: '100%',
            height: 'auto',
            fontSize: 10,
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
            borderColor: 'white',
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
    }
)