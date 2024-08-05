import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import Theme from "../Theme";
import { isPUserPremium } from "../../services/UserService";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import theme from "../../theme/theme";

const ProfileDetailsConatiner = styled.View`
  background-color: #eef6f8;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
`;

const VBar = styled.View`
  height: 100px;
  width: 1px;
  background-color: #ededed;
`;

const PDetailContainer = styled.View`
  /* height:219px;*/
  flex: 1;
  padding: 19px;
`;

const LabelContainer = styled.View`
  margin-bottom: 12px;
`;

const SiblingInfo = ({ sibling }) => {
  return (
    <ProfileDetailsConatiner style={{ marginBottom: 5 }}>
      <PDetailContainer>
        <LabelContainer>
          <Theme.Text size="12px" color="#808080">
            Name
          </Theme.Text>
          <Theme.Text size="14px" color="#000000">
            {sibling.sibling_name}
          </Theme.Text>
        </LabelContainer>
        <LabelContainer>
          <Theme.Text size="12px" color="#808080">
            Married To
          </Theme.Text>
          <Theme.Text size="14px" color="#000000">
            {sibling.marriedTo}
          </Theme.Text>
        </LabelContainer>
      </PDetailContainer>
      <VBar style={{ height: 50 }}></VBar>
      <PDetailContainer>
        <LabelContainer>
          <Theme.Text size="12px" color="#808080">
            Married
          </Theme.Text>
          <Theme.Text size="14px" color="#000000">
            {sibling.married}
          </Theme.Text>
        </LabelContainer>
      </PDetailContainer>
    </ProfileDetailsConatiner>
  );
};
const UncelsInfo = ({ uncle }) => {
  return (
    <ProfileDetailsConatiner style={{ marginBottom: 5 }}>
      <PDetailContainer>
        <LabelContainer>
          <Theme.Text size="12px" color="#808080">
            Name
          </Theme.Text>
          <Theme.Text size="14px" color="#000000">
            {uncle.name}
          </Theme.Text>
        </LabelContainer>
        <LabelContainer>
          <Theme.Text size="12px" color="#808080">
            Married To
          </Theme.Text>
          <Theme.Text size="14px" color="#000000">
            {uncle.marriedTo}
          </Theme.Text>
        </LabelContainer>
      </PDetailContainer>
      <VBar style={{ height: 50 }}></VBar>
      <PDetailContainer>
        <LabelContainer>
          <Theme.Text size="12px" color="#808080">
            Married
          </Theme.Text>
          <Theme.Text size="14px" color="#000000">
            {uncle.married}
          </Theme.Text>
        </LabelContainer>
      </PDetailContainer>
    </ProfileDetailsConatiner>
  );
};

const FullProfileDetails = ({ profile }) => {
  const [isPremium, setIsPremium] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await isPUserPremium();
        console.log("---> in full profile", result);
        setIsPremium(result);
        // console.log("Able to see???", isAbleToViewProfile)
      } catch (error) {
        console.error("Error checking profile access:", error);
      }
    };

    fetchData();

    // Clean-up function
    return () => {
      // Cleanup code here if needed
    };
  }, []);
  return (
    <View>
      {/* <Text>Document: {JSON.stringify(profile, null, 2)}</Text> */}
      <View style={styles.sectionContainer}>
        <Theme.TextB style={{ marginBottom: 4, marginLeft: 4 }}>
          Details
        </Theme.TextB>
        <ProfileDetailsConatiner>
          <PDetailContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                First name
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile.first_name}{" "}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Profile operated by
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile.profile_operated_by}{" "}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Date of birth
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.dob}{" "}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Birth Time
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.birth_time}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Current city
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.current_city}{" "}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Additional Information
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.additional_information}{" "}
              </Theme.Text>
            </LabelContainer>
          </PDetailContainer>

          <PDetailContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Last name
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile.last_name}{" "}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Gender
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.gender}
              </Theme.Text>
            </LabelContainer>
            {/* {profile.birth_time && <LabelContainer>
                            <Theme.Text size="12px" color="#808080">Place of birth</Theme.Text>
                            <Theme.Text size="14px" color="#000000">{profile?.birth_time}</Theme.Text>
                        </LabelContainer>} */}
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Place of birth
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.place_of_birth}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Company location
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.company_location}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Current state
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.current_state}
              </Theme.Text>
            </LabelContainer>
          </PDetailContainer>
        </ProfileDetailsConatiner>
      </View>

      <View style={styles.sectionContainer}>
        <Theme.TextB style={{ marginBottom: 4, marginLeft: 4 }}>
          Family Information
        </Theme.TextB>
        <ProfileDetailsConatiner>
          <PDetailContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Father's name
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.father_name}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Father's Occupation
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.father_occupation}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Number of siblings
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.sibling_count}
              </Theme.Text>
            </LabelContainer>
          </PDetailContainer>

          <PDetailContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Mothers name
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.mother_name}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Mothers Occupation
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.mother_occupation}
              </Theme.Text>
            </LabelContainer>
          </PDetailContainer>
        </ProfileDetailsConatiner>
      </View>

      <View style={styles.sectionContainer}>
        <Theme.TextB style={{ marginBottom: 4, marginLeft: 4 }}>
          Contact information
          {!isPremium ? (
            <FontAwesome5 style={styles.icon} name="lock" size={16} color="gold" />
          ) : null}


        </Theme.TextB>
        <ProfileDetailsConatiner style={{ backgroundColor: "#fffafb" }}>
          <PDetailContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Name
              </Theme.Text>
              <Theme.Text
                size="14px"
                color={isPremium ? "#000000" : "transparent"}
                style={isPremium ? {} : styles.blur}
              >
                {profile?.contact_name}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Email
              </Theme.Text>
              <Theme.Text size="14px"
                color={isPremium ? "#000000" : "transparent"}
                style={isPremium ? {} : styles.blur}
              >
                {profile?.contact_email}
              </Theme.Text>
            </LabelContainer>
          </PDetailContainer>
          <VBar></VBar>
          <PDetailContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Relation
              </Theme.Text>
              <Theme.Text size="14px"
                color={isPremium ? "#000000" : "transparent"}
                style={isPremium ? {} : styles.blur}
              >
                {profile?.relation}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Phone
              </Theme.Text>
              <Theme.Text size="14px"
                color={isPremium ? "#000000" : "transparent"}
                style={isPremium ? {} : styles.blur}
              >
                {profile?.contact_no}
              </Theme.Text>
            </LabelContainer>
          </PDetailContainer>
        </ProfileDetailsConatiner>
      </View>

      {/* <Text>Document: {JSON.stringify(profile, null, 2)}</Text> */}
      <View style={styles.sectionContainer}>
        <Theme.TextB style={{ marginBottom: 4, marginLeft: 4 }}>
          Paternal relatives
        </Theme.TextB>
        <ProfileDetailsConatiner>
          <PDetailContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Paternal Grandfather's Name
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.grand_father_name}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Paternal Grand mother's name
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.grand_mother_first_name}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Paternal Number Of Uncles
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.uncles}
              </Theme.Text>
            </LabelContainer>
          </PDetailContainer>
          <VBar></VBar>
          <PDetailContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Grand father's native place
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.grand_father_native_place}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Grand mother's native place
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.grand_mother_native_name}
              </Theme.Text>
            </LabelContainer>
          </PDetailContainer>
        </ProfileDetailsConatiner>
        {/* <Theme.Text size="14px" color="#808080">For each uncle following information will be shown :</Theme.Text> */}
      </View>
      {profile.uncleInfo?(
        <View style={styles.sectionContainer}>
          <Theme.TextB style={{ marginBottom: 4, marginLeft: 4 }}>
            Paternal Uncles
          </Theme.TextB>
          {profile.uncleInfo.map((uncle, index) => (
            <UncelsInfo key={uncle.name + "" + index} uncle={uncle} />
          ))}
        </View>
      ):null}
      <View style={styles.sectionContainer}>
        <Theme.TextB style={{ marginBottom: 4, marginLeft: 4 }}>
          Maternal relatives
        </Theme.TextB>
        <ProfileDetailsConatiner>
          <PDetailContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Grand father's name
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.m_grand_father_name}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Grand mother's name
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.m_grand_mother_first_name}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Maternal Number Of Uncles
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.m_uncles}
              </Theme.Text>
            </LabelContainer>
          </PDetailContainer>
          <VBar></VBar>
          <PDetailContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Grand father's native place
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.m_grand_father_native_place}
              </Theme.Text>
            </LabelContainer>
            <LabelContainer>
              <Theme.Text size="12px" color="#808080">
                Grand mother's native place
              </Theme.Text>
              <Theme.Text size="14px" color="#000000">
                {profile?.m_grand_mother_native_name}
              </Theme.Text>
            </LabelContainer>
          </PDetailContainer>
        </ProfileDetailsConatiner>
      </View>
      {profile.m_uncleInfo ? (
        <View style={styles.sectionContainer}>
          <Theme.TextB style={{ marginBottom: 4, marginLeft: 4 }}>
            Maternal Uncles
          </Theme.TextB>
          {profile.m_uncleInfo.map((uncle, index) => (
            <UncelsInfo key={uncle.name + "" + index} uncle={uncle} />
          ))}
        </View>
      ) : null}

      {profile.siblingInfo ? (
        <View style={styles.sectionContainer}>
          <Theme.TextB style={{ marginBottom: 4, marginLeft: 4 }}>
            Siblings
          </Theme.TextB>
          {profile.siblingInfo.map((sibling, index) => (
            <SiblingInfo key={sibling.name + "" + index} sibling={sibling} />
          ))}
        </View>
      ) : null}

    </View>
  );
};

export default FullProfileDetails;

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 10,
    backgroundColor: "red",
    padding: 4,
    backgroundColor: "white",
    borderRadius: 8,
  },
  blur: {
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
  },
});
