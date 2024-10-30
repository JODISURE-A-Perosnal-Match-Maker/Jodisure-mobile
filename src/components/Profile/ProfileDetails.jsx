import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components/native';
import Theme from '../Theme';

const Div = styled.View`
    flex-direction:row;
`;

const LabelContainer = styled.View`
    margin-bottom:12px;
`;

const ProfileDetailsConatiner = styled.View`
    background-color: #fffafb;
    border-radius: 8px;
    flex-direction: row;
    align-items: flex-start; // change from 'center' to 'flex-start'
`;

const PDetailContainer = styled.View`
    flex: 1;
    padding: 19px;
    max-width: 50%; // To make sure each container takes half the width
`;

const VBar = styled.View`
    width: 1px;
    background-color: #ededed;
    height:253px;
    align-self:center;
`;


const BtnViewProfile = styled.View`
    background-color:#bd6f9e;
    border-color:#a05b85;
    border-radius:20px;
    height:32px;
    width:162px;
    justify-content:center;
    align-items:center;
    flex-direction:row;
`;

const BtnContainer = styled.View`
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin-top:12px;
    margin-bottom:17px;
`;

const ProfileDetails = ({ profile , overRideHazy}) => {
    // const [cities, setCities] = useState('');

    const Religion = profile?.religion
    const myReligion = Religion.split(" ");
    let religion = myReligion[0];
    const subsection = myReligion[2]

    const marital = profile?.marital_status.charAt(0).toUpperCase() + profile?.marital_status.slice(1);
    const m = marital.split(" ")
    const married = m[0]
    const status = m[2]
    return (
        <View>
            {/* <Text>Document: {JSON.stringify(profile,null,2)}</Theme.Text></Text> */}
            <ProfileDetailsConatiner>
                <PDetailContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Profession</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.profession}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Birth Place</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.place_of_birth}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Eating Habits</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.eating_habits}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Highest Qualification</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.carrer_info}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Profile Created By</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.profile_created_by}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">University name</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.university}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Company name</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.company_name}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Health issues if any</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.health_issue}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Father's Name</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.contact_name}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Father's Occupation</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.father_occupation}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Complexion</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.complexion}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    {/* <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Hobby</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}> 
{profile?.hobbies}</Theme.Text></Theme.Text>
                    </LabelContainer> */}
                </PDetailContainer>
                <VBar></VBar>
                <PDetailContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Post marriage plan</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.post_marriage_plan}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">City</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.city}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Religion</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {religion}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Religion subsection</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {subsection}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Gotra</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.gotra}</Theme.Text></Theme.Text>
                    </LabelContainer>

                    {/* <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Religion subsection</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}> 
{profile?.religion_subsection}</Theme.Text></Theme.Text>
                    </LabelContainer> */}
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Hobbies and interest</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.hobbies}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Marital status</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {married} {status}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Weight</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.weight}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Mothers's Name</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.contact_email}</Theme.Text></Theme.Text>
                    </LabelContainer>
                    <LabelContainer>
                        <Theme.Text size="12px" color="#808080">Native Place</Theme.Text>
                        <Theme.Text size="14px" color="#000000"><Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
                            {profile?.native_place}</Theme.Text></Theme.Text>
                    </LabelContainer>
                </PDetailContainer>

            </ProfileDetailsConatiner>
        </View>
    )
}
const styles = StyleSheet.create({
    blur: {
        textShadowColor: "rgba(0, 0, 0, 0.55)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20,
    },
})
export default ProfileDetails

