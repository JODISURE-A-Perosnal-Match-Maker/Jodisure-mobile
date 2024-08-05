import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getMyAdditionalPreferences, getMyProfile, getPreferenceAndAbout, setMyAdditionalPreferences } from '../../../services/UserService';
import MultipleSelect from 'react-native-multiple-select';
import theme from '../../../theme/theme';
import Theme from '../../../components/Theme';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { min } from 'moment';
import MultipleGoogleMapAutoComplete from '../../../components/GoogleMapAutoComplete/MultipleGoogleMapAutoComplete';
import { ScrollView } from 'react-native-gesture-handler';
import ModalSelector from 'react-native-modal-selector';


const AdditionalUserPreference = ({marital_status, religion, gender, fromValue, toValue}) => {

    const [chewing_addictions, setChewingAddiction] = useState();
    const [chewingAddictions, setChewingAddictions] = useState([]);
    const [chewingAddictionSelect, setChewingAddictionSelect] = useState([]);


    const [complexion, setComplexion] = useState();
    const [complexions, setComplexions] = useState([]);
    const [complexionSelect, setComplexionSelect] = useState([]);


    const [drinking, setDrinking] = useState();
    const [drinkings, setDrinkings] = useState([]);
    const [drinkingSelect, setDrinkingSelect] = useState([]);


    const [educational_level, setEducationalLevel] = useState();
    const [educationalLevels, setEducationalLevels] = useState([]);
    const [educationalLevelSelect, setEducationalLevelSelect] = useState([]);


    const [family_believes, setFamilyBelief] = useState();
    const [familyBeliefs, setFamilyBeliefs] = useState([]);
    const [familyBelievesSelect, setFamilyBelievesSelect] = useState([]);


    const [family_status, setFamilyStatus] = useState();
    const [familyStatuses, setFamilyStatuses] = useState([]);
    const [familyStatusSelect, setFamilyStatusSelect] = useState([]);


    const [family_type, setFamilyType] = useState();
    const [familyTypes, setFamilyTypes] = useState([]);
    const [familyTypeSelect, setFamilyTypeSelect] = useState([]);


    const [health_issues, setHealthIssue] = useState();
    const [healthIssues, setHealthIssues] = useState([]);
    const [healthIssuesSelect, setHealthIssuesSelect] = useState([]);


    const [house_chores, setHouseChore] = useState();
    const [houseChores, setHouseChores] = useState([]);
    const [houseChoresSelect, setHouseChoresSelect] = useState([]);


    const [lifestyle, setLifestyle] = useState();
    const [lifestyles, setLifestyles] = useState([]);
    const [lifestyleSelect, setLifestyleSelect] = useState([]);


    const [past_relationship, setPastRelationship] = useState();
    const [pastRelationships, setPastRelationships] = useState([]);
    const [pastRelationshipSelect, setPastRelationshipSelect] = useState([]);


    const [profession_type, setProfessionType] = useState();
    const [professionTypes, setProfessionTypes] = useState([]);
    const [professionTypeSelect, setProfessionTypeSelect] = useState([]);


    const [smoking, setSmoking] = useState();
    const [smokings, setSmokings] = useState([]);
    const [smokingSelect, setSmokingSelect] = useState([]);


    const [minHeight, setMinHeight] = useState()
    const [maxHeight, setMaxHeight] = useState()

    const [heightArray, setHeightArray] = useState([])

    const [isMaxHeightGreater, setIsMaxHeightGreater] = useState(true)

    const [cities, setCities] = useState([])

    const [city, setCity] = useState([]);

    const handleCityAdd = (newCity) => {
        console.log('City added:', newCity);
        setCity(newCity);
    };

    const handleCityRemove = (updatedCity) => {
        console.log('City removed:', updatedCity);
        setCity(updatedCity);
    };



    useEffect(() => {
        const fetchPreferences = async () => {
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
                    height,

                } = await getPreferenceAndAbout();

                const transformData = (data) => {
                    if (Array.isArray(data)) {
                        return data.map((item, index) => ({ id: index, name: item }));
                    } else {
                        return [];
                    }
                };

                setChewingAddictions(transformData(chewing_addictions));
                setComplexions(transformData(complexion));
                setDrinkings(transformData(drinking));
                setEducationalLevels(transformData(educational_level));
                setFamilyBeliefs(transformData(family_believes));
                setFamilyStatuses(transformData(family_status));
                setFamilyTypes(transformData(family_type));
                setHealthIssues(transformData(health_issues));
                setHouseChores(transformData(house_chores));
                setLifestyles(transformData(lifestyle));
                setPastRelationships(transformData(past_relationship));
                setProfessionTypes(transformData(profession_type));
                setSmokings(transformData(smoking));
                setHeightArray(height);
            } catch (error) {
                console.error("Error fetching preferences:", error);
            }
        };

        const fetchProfile = async () => {
            try {
                const user = await getMyAdditionalPreferences();
                const profile = user.data();
                console.log("profileee", profile?.city)

                // Define your plural states and corresponding setter functions
                const states = [
                    { state: profile.chewing_addictions, setState: setChewingAddiction, pluralState: chewingAddictions },
                    { state: profile.complexion, setState: setComplexion, pluralState: complexions },
                    { state: profile.drinking, setState: setDrinking, pluralState: drinkings },
                    { state: profile.educational_level, setState: setEducationalLevel, pluralState: educationalLevels },
                    { state: profile.family_believes, setState: setFamilyBelief, pluralState: familyBeliefs },
                    { state: profile.family_status, setState: setFamilyStatus, pluralState: familyStatuses },
                    { state: profile.family_type, setState: setFamilyType, pluralState: familyTypes },
                    { state: profile.health_issues, setState: setHealthIssue, pluralState: healthIssues },
                    { state: profile.house_chores, setState: setHouseChore, pluralState: houseChores },
                    { state: profile.lifestyle, setState: setLifestyle, pluralState: lifestyles },
                    { state: profile.past_relationship, setState: setPastRelationship, pluralState: pastRelationships },
                    { state: profile.profession_type, setState: setProfessionType, pluralState: professionTypes },
                    { state: profile.smoking, setState: setSmoking, pluralState: smokings },
                ];

                setMinHeight(profile?.minHeight)
                setMaxHeight(profile?.maxHeight)
                setCity(profile?.city)
                // console.log("heights",profile?.minHeight,profile?.maxHeight);
                // Loop through each state and set the transformed data
                states.forEach(({ state, setState, pluralState }) => {
                    if (state) {
                        setState(state)
                    }
                    else {
                        setState([])
                    }
                });

            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchPreferences();
        fetchProfile();
    }, []);

    useEffect(() => {
        // console.log("heyyyy");
        if (minHeight > maxHeight) {
            setIsMaxHeightGreater(false)
        } else {
            setIsMaxHeightGreater(true)
        }
    }, [minHeight, maxHeight])

    const handleSubmit = async () => {
        // console.log("submit");
        try {

            const data = {
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
                minHeight,
                maxHeight,
                city
            };

            const cleanedData = Object.fromEntries(
                Object.entries(data).filter(
                    ([key, value]) => value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0)
                )
            );

            console.log("cleannnnnnnnnn----------", cleanedData);
            const consti = await setMyAdditionalPreferences(cleanedData)
            console.log("return data", consti);
            alert('Your additonal preference has been set.')
        } catch (e) {
            console.log(e);
            alert('Something went wrong.')

        }
    }

    const addCity = (city) => {
        setCities([...cities, city]);
    };

    const removeCity = (index) => {
        const updatedCities = cities.filter((_, i) => i !== index);
        setCities(updatedCities);
    };

    const onSelectedItemsChange = (selectedItems, setter) => {
        setter(selectedItems);
        return false;
    };

    return (
        <View style={styles.container}>

            <ScrollView
                keyboardShouldPersistTaps='always'

                enableResetScrollToCoords={false}
                contentContainerStyle={styles.scrollViewContent}

            >


                <View style={{ paddingBottom: 50 }}>

                    {/* <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>Additional Information</Text>
                    <View style={styles.separatorLine} />
                </View>
                 */}



                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                        <Text style={styles.separatorText}>AdditionalPreferences</Text>
                        <View style={styles.separatorLine} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">City</Theme.TextB>

                        <MultipleGoogleMapAutoComplete
                            selectedCities={city}
                            onCityAdd={handleCityAdd}
                            onCityRemove={handleCityRemove}
                        />
                    </View>


                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Past Relationship</Theme.TextB>

                        <MultipleSelect
                            items={pastRelationships}
                            uniqueKey="name"
                            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange(selectedItems, setPastRelationship)}
                            selectedItems={past_relationship}
                            textColor='#969696'
                            selectText="Select Past Relationships"
                            textInputProps={{ editable: false, autoFocus: false }}
                            searchInputPlaceholderText=""
                            searchIcon={false}
                            // searchInputPlaceholderText="Search Past Relationships..."
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}
                            hideSubmitButton={true}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.inputPickerContainer}>
                            <View>
                                <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Minimum Height</Theme.TextB>
                            </View>
                            <View style={styles.pickerBox}>
                                <ModalSelector
                                    data={heightArray.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                                    initValue={minHeight || 'Select Height'}
                                    onChange={(option) => setMinHeight(option.value)}
                                    style={styles.selector}
                                    initValueTextStyle={styles.initValueTextStyle}
                                    selectTextStyle={styles.selectTextStyle}
                                    optionTextStyle={styles.optionTextStyle}
                                />
                            </View>
                        </View>
                        <View style={styles.inputPickerContainer}>
                            <View>
                                <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Maximum Height</Theme.TextB>
                            </View>
                            <View style={styles.pickerBox}>
                                <ModalSelector
                                    data={heightArray.map((item, index) => ({ key: index.toString(), label: item, value: item }))}
                                    initValue={maxHeight || 'Select Max Height'}
                                    onChange={(option) => setMaxHeight(option.value)}
                                    style={styles.selector}
                                    initValueTextStyle={styles.initValueTextStyle}
                                    selectTextStyle={styles.selectTextStyle}
                                    optionTextStyle={styles.optionTextStyle}

                                />
                            </View>
                        </View>

                    </View>
                    {!isMaxHeightGreater ? (
                        <View>
                            <Theme.TextB color="red" size="12px">Maximum Height should be greater than Minimum Height</Theme.TextB>
                        </View>
                    ) : null}

                    {/* <View style={styles.inputContainer}>
                    <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Choose city</Theme.TextB>
                    <MultipleGoogleMapAutoComplete addCity={addCity} removeCity={removeCity} cities={cities}/>
                </View> */}
                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Complexions</Theme.TextB>
                        <MultipleSelect
                            items={complexions}
                            uniqueKey="name"
                            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange(selectedItems, setComplexion)}
                            selectedItems={complexion}
                            textColor='#969696'
                            selectText="Select Complexions"
                            textInputProps={{ editable: false, autoFocus: false }}
                            searchInputPlaceholderText=""
                            searchIcon={false}
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}
                            hideSubmitButton={true}
                        />
                    </View>
                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                        <Text style={styles.separatorText}>Career preferences</Text>
                        <View style={styles.separatorLine} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Educational Levels</Theme.TextB>
                        <MultipleSelect
                            items={educationalLevels}
                            uniqueKey="name"
                            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange(selectedItems, setEducationalLevel)}
                            selectedItems={educational_level}
                            textColor='#969696'
                            selectText="Select Educational Levels"
                            textInputProps={{ editable: false, autoFocus: false }}
                            searchInputPlaceholderText=""
                            searchIcon={false}
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}
                            hideSubmitButton={true}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Profession Types</Theme.TextB>
                        <MultipleSelect
                            items={professionTypes}
                            uniqueKey="name"
                            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange(selectedItems, setProfessionType)}
                            selectedItems={profession_type}
                            textColor='#969696'
                            selectText="Select Profession Types"
                            textInputProps={{ editable: false, autoFocus: false }}
                            searchInputPlaceholderText=""
                            searchIcon={false}
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}
                            hideSubmitButton={true}
                        />
                    </View>

                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                        <Text style={styles.separatorText}>Family preferences</Text>
                        <View style={styles.separatorLine} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Family Beliefs</Theme.TextB>
                        <MultipleSelect
                            items={familyBeliefs}
                            uniqueKey="name"
                            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange(selectedItems, setFamilyBelief)}
                            selectedItems={family_believes}
                            textColor='#969696'
                            selectText="Select Family Beliefs"
                            textInputProps={{ editable: false, autoFocus: false }}
                            searchInputPlaceholderText=""
                            searchIcon={false}
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}
                            hideSubmitButton={true}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Family Status</Theme.TextB>
                        <MultipleSelect
                            items={familyStatuses}
                            uniqueKey="name"
                            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange(selectedItems, setFamilyStatus)}
                            selectedItems={family_status}
                            textColor='#969696'
                            selectText="Select Family Statuses"
                            textInputProps={{ editable: false, autoFocus: false }}
                            searchInputPlaceholderText=""
                            searchIcon={false}
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}
                            hideSubmitButton={true}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Family Type</Theme.TextB>
                        <MultipleSelect
                            items={familyTypes}
                            uniqueKey="name"
                            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange(selectedItems, setFamilyType)}
                            selectedItems={family_type}
                            textColor='#969696'
                            selectText="Select Family Types"
                            textInputProps={{ editable: false, autoFocus: false }}
                            searchInputPlaceholderText=""
                            searchIcon={false}
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}
                            hideSubmitButton={true}
                        />
                    </View>

                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                        <Text style={styles.separatorText}>Lifestyle preferences</Text>
                        <View style={styles.separatorLine} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">House Chore</Theme.TextB>
                        <MultipleSelect
                            items={houseChores}
                            uniqueKey="name"
                            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange(selectedItems, setHouseChore)}
                            selectedItems={house_chores}
                            textColor='#969696'
                            selectText="Select House Chores"
                            textInputProps={{ editable: false, autoFocus: false }}
                            searchInputPlaceholderText=""
                            searchIcon={false}
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}
                            hideSubmitButton={true}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Lifestyle</Theme.TextB>
                        <MultipleSelect
                            items={lifestyles}
                            uniqueKey="name"
                            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange(selectedItems, setLifestyle)}
                            selectedItems={lifestyle}
                            textColor='#969696'
                            selectText="Select Lifestyles"
                            textInputProps={{ editable: false, autoFocus: false }}
                            searchInputPlaceholderText=""
                            searchIcon={false}
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}
                            hideSubmitButton={true}
                        />
                    </View>

                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                        <Text style={styles.separatorText}>Health and drinking</Text>
                        <View style={styles.separatorLine} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Health Issues</Theme.TextB>
                        <MultipleSelect
                            items={healthIssues}
                            uniqueKey="name"
                            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange(selectedItems, setHealthIssue)}
                            selectedItems={health_issues}
                            textColor='#969696'
                            selectText="Select Health Issues"
                            textInputProps={{ editable: false, autoFocus: false }}
                            searchInputPlaceholderText=""
                            searchIcon={false}
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}
                            hideSubmitButton={true}
                        />
                    </View>





                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Drinking</Theme.TextB>
                        <MultipleSelect
                            items={drinkings}
                            uniqueKey="name"
                            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange(selectedItems, setDrinking)}
                            selectedItems={drinking}
                            textColor='#969696'
                            selectText="Select Multiple Drinking Habits"
                            textInputProps={{ editable: false, autoFocus: false }}
                            searchInputPlaceholderText=""
                            searchIcon={false}
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}
                            hideSubmitButton={true}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Smoking</Theme.TextB>
                        <MultipleSelect
                            items={smokings}
                            uniqueKey="name"
                            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange(selectedItems, setSmoking)}
                            selectedItems={smoking}
                            textColor='#969696'
                            selectText="Select Multiple Smoking Habits"
                            textInputProps={{ editable: false, autoFocus: false }}
                            searchInputPlaceholderText=""
                            searchIcon={false}
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}
                            hideSubmitButton={true}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="12px">Chewing Addiction</Theme.TextB>
                        <MultipleSelect
                            items={chewingAddictions}
                            uniqueKey="name"
                            onSelectedItemsChange={(selectedItems) => onSelectedItemsChange(selectedItems, setChewingAddiction)}
                            selectedItems={chewing_addictions}
                            textColor='#969696'
                            selectText="Select Multiple Chewing Addiction"
                            textInputProps={{ editable: false, autoFocus: false }}
                            searchInputPlaceholderText=""
                            searchIcon={false}
                            tagRemoveIconColor={theme.colors.secondaryDark2}
                            tagBorderColor={theme.colors.secondaryMedium}
                            tagTextColor={theme.colors.secondary}
                            selectedItemTextColor={theme.colors.secondaryDark2}
                            selectedItemIconColor={theme.colors.secondaryDark2}
                            itemTextColor={theme.colors.secondary}
                            displayKey="name"
                            searchInputStyle={{ color: theme.colors.secondary }}
                            hideSubmitButton={true}

                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleSubmit} disabled={!isMaxHeightGreater}>
                            <View style={styles.roundOutlineButton}>
                                <Theme.TextB color={theme.colors.secondaryMedium} size="14px">SUBMIT</Theme.TextB>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
            {/* <View style={styles.footer}> */}
            {/* <TouchableOpacity onPress={handleSubmit} style={styles.TouchableOpacityStyle}>
                    <View style={styles.roundOutlineButton}>
                        <Theme.TextB color={theme.colors.secondaryMedium} size="14px">SUBMIT</Theme.TextB>
                    </View>
                </TouchableOpacity> */}
            {/* </View> */}
        </View>


    )
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: 'white',

        },
        optionTextStyle:{
            color: theme.colors.grey0, // Initial value text color
            fontSize: 16,
            opacity:1
          },
        TouchableOpacityStyle: {

            position: 'absolute',
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            right: 30,
            bottom: 30,
        },

        scrollViewContent: {
            flexGrow: 1,
            paddingBottom: 80, // Adjust this value based on your footer height
        },
        separatorContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 50,
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: 'lightgrey',
            paddingVertical: 10,
            paddingHorizontal: 20,
        },
        roundOutlineButton: {
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: 'center',
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
            width: '100%',
            marginTop: 24
        },
        inputPickerContainer: {
            width: '47%',
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
    }
)

export default AdditionalUserPreference