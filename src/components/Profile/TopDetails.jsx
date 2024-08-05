import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import styled from 'styled-components/native';
import Theme from '../Theme';

const Div = styled.View`
    flex-direction:row;
`;

const TopDetails = ({ profile, isFirstNameVisible, overRideHazy }) => {
  if (!profile || !profile.dob) {
    return (
      <View style={styles.col}>
        <Theme.TextB>Incomplete Profile!! contact admin</Theme.TextB>
      </View>
    )
  }
  const years = moment().diff(moment(profile?.dob, 'DD/MM/YYYY'), 'years');
  return (
    <View style={styles.col}>
      {/* <Text>{JSON.stringify(profile,null,2)}</Text> */}
      <View style={{ marginTop: 1 }}></View>
      <Text>
        {isFirstNameVisible === false ? ("") :
          (<Theme.TextB size="22px" style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}> {profile.first_name}</Theme.TextB>)
        }
        <Theme.TextB size="22px" style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}> {profile.last_name}</Theme.TextB>
      </Text>

      {/* <Theme.Text >
        Email ID:
        <Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>
          {profile.email}
        </Theme.Text>

      </Theme.Text> */}
      <Theme.Text>ID:
        {/* <Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}> */}
        {profile.UUID}
        {/* </Theme.Text> */}
      </Theme.Text>
      <View style={{ marginTop: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 200 }}>
        <Div>
          <Theme.IconCal style={{ marginRight: 4, marginTop: 4 }} />
          {/* <Theme.Text color="#000000">24 yrs</Theme.Text> */}
          <Theme.Text color="#000000">
            <Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>

              {years}
            </Theme.Text>
            yrs
          </Theme.Text>
        </Div>
        <Div>
          <Theme.IconScale style={{ marginRight: 4, marginTop: 4 }} />
          {/* <Theme.Text color="#000000">5'4"</Theme.Text> */}
          <Theme.Text color="#000000">
            <Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>

              {profile.height}
            </Theme.Text>

          </Theme.Text>
        </Div>
        <Div>
          <Theme.IconChat style={{ marginRight: 4, marginTop: 4 }} />
          <Theme.Text color="#000000">
            <Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>

              {profile?.personal_info_language}
            </Theme.Text>
          </Theme.Text>

        </Div>
      </View>
      {profile?.city && <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 200 }}>
        <Div>
          <Theme.IconLocation style={{ marginRight: 4, marginTop: 4 }} />
          <Theme.Text color="#000000">
            <Theme.Text style={overRideHazy ? {} : (profile.isTotalPrivacyEnabled ? styles.blur : {})} color={overRideHazy ? "black" : (profile.isTotalPrivacyEnabled ? "transparent" : "black")}>

              {profile.city}, {profile.country}
            </Theme.Text>

          </Theme.Text>
        </Div>
      </View>}
    </View>
  )
}

export default TopDetails

const styles = StyleSheet.create({
  col: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginHorizontal: 12,
    borderRadius: 15,
    paddingVertical: 10,
  },
  blur: {
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
  },
})
