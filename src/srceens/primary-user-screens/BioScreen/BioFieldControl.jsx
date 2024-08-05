import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import Theme from '../../../components/Theme'
import theme from '../../../theme/theme'
import { CheckBox } from 'react-native-elements'
import RoundDarkButton from '../../../components/RoundDarkButton'
import { saveHiddenFieldsOnBio } from '../../../services/UserService'
import FullScreenLoader from '../../../theme/FullScreenLoader'
import { UserContext } from '../../../navigation'

const BioFieldControl = () => {
    const [busy,setBusy]=useState(false);
    const userData = useContext(UserContext);
    const [fields, setFields] = useState([
        { key: 'first_name', title: 'First Name', selected: false },
        { key: 'last_name', title: 'Last Name', selected: false },
        { key: 'gender', title: 'Gender', selected: false },
        { key: 'marital_status', title: 'Marital Status', selected: false },
        { key: 'dob', title: 'Date of birth', selected: false },
        { key: 'place_of_birth', title: 'Place of birth', selected: false },
        { key: 'height', title: 'Height', selected: false },
        { key: 'language', title: 'Language', selected: false },
        { key: 'religion', title: 'Religion', selected: false },
        { key: 'health_issue', title: 'Health issue', selected: false },
        { key: 'post_marriage_plan', title: 'Post marriage plan', selected: false },
        { key: 'city', title: 'City', selected: false },
        { key: 'country', title: 'Country', selected: false },
        { key: 'university', title: 'University', selected: false },
        { key: 'profession', title: 'Profession', selected: false },
        { key: 'company_name', title: 'Company name', selected: false },
        { key: 'company_location', title: 'Company location', selected: false },
        { key: 'hobbies', title: 'Hobbies', selected: false },
        { key: 'father_name', title: 'Father\'s name', selected: false },
        { key: 'father_occupation', title: 'Father\'s occupation', selected: false },
        { key: 'mother_name', title: 'Mother\'s name', selected: false },
        { key: 'mother_occupation', title: 'Mother\'s occupation', selected: false }
    ]);

    useEffect(() => {
        if(!userData)return;
        const {profile}=userData;
        const { hiddenFieldsOnBio } = profile;
        if(hiddenFieldsOnBio && hiddenFieldsOnBio.length){
            const tFields = fields.map(f=>{
                if(hiddenFieldsOnBio.includes(f.key)){
                    f.selected=true;
                }
                return f;
            });
            console.log('setFields Run')
            setFields(tFields);
        }
    }, []);
    const handleSelect = (field) => {
        const current = fields.map(f => {
            if (f.key === field.key) {
                f.selected = !f.selected
            }
            return f;
        });
        setFields(current);
    }

    const handleSave = () => {
        const fieldsToBeHidden = fields.filter(f=>f.selected).map(f=>f.key);
        setBusy(true);
        saveHiddenFieldsOnBio(fieldsToBeHidden)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(()=>{
            setBusy(false);
        })
    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}>
                {busy ?<FullScreenLoader />:null}
            <View style={styles.container}>
                {/* <Text>{JSON.stringify(userData.profile.hiddenFieldsOnBio,null,2)}</Text> */}
                <Theme.TextB style={{ textAlign: 'center' }}>Hide below information from my Biodata</Theme.TextB>
                <View>
                    {fields.map(f => (
                        <CheckBox
                            key={f.key}
                            center={false}
                            title={f.title}
                            // checkedIcon='dot-circle-o'
                            // uncheckedIcon='circle-o'
                            titleProps={{ style: { color: theme.colors.primary, fontSize: 16, marginLeft: 10 } }}
                            checkedColor={theme.colors.primary}
                            checked={f.selected}
                            onPress={() => handleSelect(f)}
                        />
                    ))}
                </View>
                <View style={{ marginVertical: 20 }}>
                    <RoundDarkButton name="Save" onPress={handleSave} />
                </View>
            </View>
        </ScrollView>
    )
}

export default BioFieldControl

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        padding: 16,
        marginTop: StatusBar.currentHeight + 10,
    },
    item: {

    }
})