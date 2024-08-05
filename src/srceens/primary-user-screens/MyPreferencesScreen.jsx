import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import Theme from '../../components/Theme';
import { getMyPreferences, getReligions, setMyPreferences } from '../../services/UserService';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import theme from '../../theme/theme';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
// import MultiSelect from 'react-native-multiple-select';
// import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import MultipleSelect from 'react-native-multiple-select';
import GoogleMapAutoComplete from '../../components/GoogleMapAutoComplete/GoogleMapAutoComplete';
import MultipleGoogleMapAutoComplete from '../../components/GoogleMapAutoComplete/MultipleGoogleMapAutoComplete';
import ModalSelector from 'react-native-modal-selector';
const maritalOptions = [
  { key: 0, label: 'Select Status', value: undefined },
  { key: 1, label: 'Never Married', value: 'never_married' },
  { key: 2, label: 'Awaiting Divorce', value: 'awaiting_divorce' },
  { key: 3, label: 'Divorced', value: 'divorced' },
  { key: 4, label: 'Widowed', value: 'widowed' },
  { key: 5, label: 'Annulled', value: 'annulled' },
];

const MyPreferencesScreen = () => {
  const [maritalStatus, setMaritalStatus] = useState();
  const [religion, setReligion] = useState();
  const [religions, setReligions] = useState([]);
  const [gender, setGender] = useState();
  const [fromValue, setFromValue] = useState(32);
  const [fromValue2, setFromValue2] = useState(10);
  const [toValue, setToValue] = useState(21);
  // const [selectedItems, setSelectedItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [cities, setCities]= useState()

  const onSelectedItemsChange = (selectedItems) => {
    // console.log("Selected items:", selectedItems);
    setSelected(selectedItems);
    // Extract the names from selectedItems
    const selectedNames = selectedItems.map(itemId => data.find(item => item.id === itemId).name);
    // console.log("Selected names:", selectedNames);
    setReligion(selectedNames);


  };



  useEffect(() => {

    // Map backend data to the required format
    const mappedData = religions.map((item, index) => ({ id: index.toString(), name: item }));
    setData(mappedData);
    // console.log("this is beach code", mappedData)

    // Filter the pre-selected values
    const preSelectedItems = mappedData.filter(item => religion?.includes(item.name));
    // console.log("this is serious code", preSelectedItems);
    setSelected(preSelectedItems.map(item => item.id));
  }, [religion, religions]);

  const width = Dimensions.get('window').width;

  useEffect(() => {
    getPreference();

  }, []);

  const getPreference = () => {
    getReligions()
      .then(rs => {
        console.log(rs);
        setReligions(rs);
        console.log("List of all religion", rs);
        return rs;
      }).then(r => {
        return getMyPreferences();
      }).then(res => {
        if (res.exists) {
          const { maritalStatus, religion, gender, fromValue, toValue } = res.data();
          setMaritalStatus(maritalStatus);
          setReligion(religion);
          // initializeData(religions, religion)
          setGender(gender);
          setFromValue(fromValue);
          setToValue(toValue);
        } else {
          alert('No preference is set! please set your preference.')
        }
      })
  }
  console.log('My prefered religion', religion);

  const setPreference = () => {
    const data = { maritalStatus, religion, gender, fromValue, toValue };
    // console.log("It is getting saved", religion);
    if (!maritalStatus || !religion || !gender || !fromValue || !toValue) {
      return alert('All fields are required!');
    }
    setMyPreferences(data).then(res => {
      alert('Your preference has been set.')
    }).catch(err => {
      alert('Unable to set your preference try again.')
    })
  }

  return (
    <View style={styles.container}>
      <Theme.TextB color="#000000" size="18px">My preference</Theme.TextB>
      <View>
        <View style={styles.inputContainer}>
          <View>
            <Theme.TextB color="#000000" size="12px">Maritial status {maritalStatus}</Theme.TextB>
          </View>
          <View style={styles.pickerBox}>
                <ModalSelector
                    data={maritalOptions}
                    initValue="Select Status"
                    onChange={(option) => setMaritalStatus(option.value)}
                    selectStyle={styles.selectStyle}
                    selectTextStyle={styles.selectTextStyle}
                />
            </View>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <Theme.TextB color="#000000" size="12px">Religion</Theme.TextB>
          </View>
          <View
          // style={styles.pickerBox}
          >
            {/* <Picker
              style={styles.picker}
              selectedValue={religion}
              onValueChange={(itemValue, itemIndex) =>
                setReligion(itemValue)
              }>
              <Picker.Item label="Select Religion" enabled={false} value={undefined} />
              {religions.map(r => (
                <Picker.Item key={r} label={r} value={r} />
              ))}
              
            </Picker> */}
            {/* <MultipleSelectList
            // style={styles.picker}
              setSelected={setSelected}
              // onSelect={}
              data={data}
              save="key"
              defaultOption={{ key: '2', value: 'Appliances' }}
              search={false}
              label='Select your preferred religion'
              labelStyles={{color:"#e2e2e2"}}
              dropdownTextStyles={{color:"black"}}
              dropdownStyles={{borderColor:"#e2e2e2"}}
              checkBoxStyles={{borderColor:"#e2e2e2"}}
              boxStyles={{borderColor:"#e2e2e2"}}
              badgeStyles={{backgroundColor:theme.colors.primary}}
            /> */}
            <MultipleSelect
              items={data}
              uniqueKey="id"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selected}
              textColor='#969696'
              styleSelectorContainer={{col:"red"}}
              selectText="Select Multiple Religions"
              searchInputPlaceholderText="Search religion..."
              tagRemoveIconColor={theme.colors.secondary}
              tagBorderColor={theme.colors.primaryMedium}
              tagTextColor={theme.colors.primaryMedium}
              selectedItemTextColor={theme.colors.primaryMedium}
              selectedItemIconColor={theme.colors.primaryDark}
              itemTextColor={theme.colors.secondary}
              displayKey="name"
              searchInputStyle={{ color: theme.colors.primary }}
              
              // submitButtonColor="#CCC"
              // submitButtonText="Submit"
              hideSubmitButton={true}

            />
          {/* <MultipleGoogleMapAutoComplete/> */}
            {/* <MultipleGoogleMapAutoComplete/>
            <GoogleMapAutoComplete setCities={setCities}/> */}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <Theme.TextB color="#000000" size="12px">Gender</Theme.TextB>
          </View>
          <View style={styles.pickerBox}>
            <Picker

              style={styles.picker}
              selectedValue={gender}
              onValueChange={(itemValue, itemIndex) =>
                setGender(itemValue)
              }>
              <Picker.Item label="Select Gender" enabled={false} value={undefined} />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <Theme.TextB color="#000000" size="12px">Age</Theme.TextB>
            <Theme.Text color="#242424" size="12px">{fromValue} - {toValue}</Theme.Text>
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
              <Theme.Text color={theme.colors.primary}>21</Theme.Text>
              <MultiSlider
                min={21}
                max={50}
                sliderLength={width - 100}
                values={[fromValue, toValue]}
                enableLabel={false}
                allowOverlap={false}
                minMarkerOverlapDistance={5}
                trackStyle={{ height: 5 }}
                selectedStyle={{ backgroundColor: "#a05b85" }}
                markerStyle={{ height: 20, width: 20, top: 2, backgroundColor: "#a05b85" }}
                onValuesChange={(values) => {
                  // console.log(values);
                  setFromValue(values[0]);
                  setToValue(values[1]);
                }}
              />
              <Theme.Text color={theme.colors.primary}>50</Theme.Text>
            </View>
          </View>

        </View>

      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={setPreference}>
          <View style={styles.roundOutlineButton}>
            <Theme.TextB color="#000000" size="14px">SUBMIT</Theme.TextB>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MyPreferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16
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
    borderWidth: 1,
    borderColor: 'red',
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
  }
});