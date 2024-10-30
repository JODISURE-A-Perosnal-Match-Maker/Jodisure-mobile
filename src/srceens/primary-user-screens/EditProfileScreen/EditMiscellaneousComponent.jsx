import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Input } from "react-native-elements";
import { Picker } from '@react-native-picker/picker';
import theme from '../../../theme/theme';
import Theme from '../../../components/Theme';


const EditMiscellaneousComponent = ({ religions, handleChange, handleBlur, handleSubmit, values, touched, isValid, errors, setFieldValue }) => {

    const food_habit = [
        "Jain vegetarian",
        "Vegan",
        "Lacto vegetarian",
        "Ovo vegetarian",
        "Non Vegetarian"
    ]
    return (
        <View style={styles.formContainer}>
            <Input
                onChangeText={handleChange('health_issue')}
                onBlur={handleBlur('health_issue')}
                value={values.health_issue}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Health Issue'
                label='Health Issue'
                disabled={false}
                errorMessage={errors.health_issue}
            />
            <View>
                <View>
                    <Theme.TextB color="#000000" size="12px">Profile Created By</Theme.TextB>
                </View>
                <View style={styles.pickerBox}>
                    <Picker
                        style={styles.picker}
                        selectedValue={values.profile_created_by}
                        onValueChange={handleChange('profile_created_by')}>
                        {[
                            { label: 'Self', value: 'self' },
                            { label: 'Family', value: 'family' },
                            { label: 'Relative', value: 'relative' },
                            { label: 'Friend', value: 'friend' },
                            { label: 'Others', value: 'other' },
                        ].map(r => {
                            return (
                                <Picker.Item key={r.value} label={r.label} value={r.value} />
                            )
                        })}
                    </Picker>
                </View>
            </View>
            <Input
                onChangeText={handleChange('post_marriage_plan')}
                onBlur={handleBlur('post_marriage_plan')}
                value={values.post_marriage_plan}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Post Marriage Plan'
                label='Post Marriage Plan'
                disabled={false}
                errorMessage={errors.post_marriage_plan}
            />
            <Input
                onChangeText={handleChange('hobbies')}
                onBlur={handleBlur('hobbies')}
                value={values.hobbies}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Hobbies And Interest'
                label='Hobbies And Interest'
                disabled={false}
                errorMessage={errors.hobbies}
            />
            <Input
                onChangeText={handleChange('contact_name')}
                onBlur={handleBlur('father_name')}
                value={values.contact_name}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label="Father's Name"
                disabled={false}
                errorMessage={errors.father_name}
            />
            <Input
                onChangeText={handleChange('father_occupation')}
                onBlur={handleBlur('father_occupation')}
                value={values.father_occupation}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label="Father's Occupation"
                disabled={false}
                errorMessage={errors.father_occupation}
            />
            <Input
                onChangeText={handleChange('mother_name')}
                onBlur={handleBlur('mother_name')}
                value={values.mother_name}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label="Mother's Name"
                disabled={false}
                errorMessage={errors.mother_name}
            />
            <Input
                onChangeText={handleChange('mother_occupation')}
                onBlur={handleBlur('mother_occupation')}
                value={values.mother_occupation}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label="Mother's Occupation"
                disabled={false}
                errorMessage={errors.mother_occupation}
            />

            <Input
                onChangeText={handleChange('native_place')}
                onBlur={handleBlur('native_place')}
                value={values.native_place}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label="Native Place"
                disabled={false}
                errorMessage={errors.native_place}
            />

            <View>
                <View>
                    <Theme.TextB color="#000000" size="12px">Religion</Theme.TextB>
                </View>
                <View style={styles.pickerBox}>
                    <Picker
                        style={styles.picker}
                        selectedValue={values.religion}
                        onValueChange={handleChange('religion')}>
                        {religions.map(r => {
                            return (
                                <Picker.Item key={r} label={r} value={r} />
                            )
                        })}
                        {/* <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" /> */}
                    </Picker>
                </View>
            </View>

            <Input
                onChangeText={handleChange('gotra')}
                onBlur={handleBlur('gotra')}
                value={values.gotra}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                disabledInputStyle={true}
                label="Gotra"
                disabled={false}
                errorMessage={errors.gotra}
            />
            <View>
                <View>
                    <Theme.TextB color="#000000" size="12px">Eating Habits</Theme.TextB>
                </View>
                <View style={styles.pickerBox}>
                    <Picker
                        style={styles.picker}
                        selectedValue={values.eating_habits}
                        onValueChange={handleChange('eating_habits')}>
                        {food_habit.map(r => {
                            return (
                                <Picker.Item key={r} label={r} value={r} />
                            )
                        })}
                        {/* <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" /> */}
                    </Picker>
                </View>
            </View>
            {/* <Input
                onChangeText={handleChange('religion_subsection')}
                onBlur={handleBlur('religion_subsection')}
                value={values.religion_subsection}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label='Religion Subsection'
                disabled={false}
                errorMessage={errors.religion_subsection}
            /> */}
            <Input
                onChangeText={handleChange('sibling_count')}
                onBlur={handleBlur('sibling_count')}
                value={values.sibling_count}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder=''
                label='Number Of Siblings'
                disabled={false}
                errorMessage={errors.sibling_count}
            />
            <Input
                onChangeText={handleChange('additional_information')}
                onBlur={handleBlur('additional_information')}
                value={values.additional_information}
                inputStyle={styles.inputContainer}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.inputLabelStyle}
                placeholder='Additional Information'
                label='Additional Information'
                disabled={false}
                errorMessage={errors.additional_information}
            />
        </View>
    );
};

export default EditMiscellaneousComponent;

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
        borderColor: theme.colors.grey1,
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
        marginBottom: 20,
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
