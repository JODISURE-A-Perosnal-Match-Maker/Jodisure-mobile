import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getMutualConnections } from "../../services/UserService";
import FeatherIcon from 'react-native-vector-icons/Feather';

import Theme from "../Theme";
import theme from "../../theme/theme";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { refresh } from "@react-native-community/netinfo";
// import { BlurView } from "@react-native-community/blur";

const MutualContactsCard = ({ uid, isNameNotShow = false, isUserConnected = false }) => {
  const [contacts, setContacts] = useState([]);
  const [allMutuals, setAllMutuals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreContact, setMoreContact] = useState(0);
  const [limit, setLimit] = useState(3);
  const [totalContacts, setTotalContacts] = useState(0);
  const navigation = useNavigation();

  function fetchMutualConnections(uid) {
    return getMutualConnections(uid)
      .then(({ error, result }) => {
        if (result.length) {
          setTotalContacts(result.length);
          setAllMutuals(result);

          if (result.length > limit) {
            setContacts(result.slice(0, limit));
            setMoreContact(result.length - limit);
          } else {
            setContacts(result);
          }
        }
      });
  }

  useEffect(() => {
    if (!uid) return;

    setLoading(true);

    fetchMutualConnections(uid)
      .finally(() => {
        setLoading(false);
      });
  }, [uid]);

  const refresh = () => {
    setLoading(true);

    fetchMutualConnections(uid)
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    console.log("Able to see in mutual contact???", isNameNotShow);
  }, [isNameNotShow]);
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  const MutualContact = contacts.map((c, i) => {
    return (
      <View key={i}>
        {/* <Text>{JSON.stringify(c,null,2)}</Text> */}
        <View style={[{ marginTop: 9 }, styles.row]}>
          <View style={styles.avatar}>
            <FontAwesome name="user-circle" size={32} color="#a05b85" />
          </View>
          <View style={styles.contactContainer}>
            <Theme.TextB
              color={isNameNotShow ? "transparent" : "#242424"}
              style={isNameNotShow ? styles.blur : {}}
              size="14px"
            >
              {c.yourSide.displayName}
            </Theme.TextB>

            <View style={[{ marginTop: 9 }, styles.row]}>
              <View style={{ flex: 1 }}>
                <Theme.Text color="#242424" size="14px">
                  Your side
                </Theme.Text>
                <Theme.Text color="#242424" size="14px">
                  {c.yourSide.su_firstName} {c.yourSide.su_lastName} (
                  {c.yourSide.su_relationship})
                </Theme.Text>
              </View>
              <View style={{ flex: 1 }}>
                <Theme.Text color="#242424" size="14px">
                  Profile side
                </Theme.Text>
                {isUserConnected ? (
                  <Theme.Text color="#242424" size="14px">
                    {c.otherSide.su_firstName} {c.otherSide.su_lastName} (
                    {c.otherSide.su_relationship})
                  </Theme.Text>
                ) : (
                  <Theme.Text color="#242424" size="14px">
                    {c.otherSide.su_relationship}
                  </Theme.Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.devider}></View>
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <View style={styles.containers}>
        <Theme.TextB color="#242424" size="14px">
          {totalContacts > 0 && `${totalContacts} `} Mutual contacts
          {isNameNotShow && (
            <FontAwesome5Icon style={styles.icon} name="lock" size={16} color='gold' />
          )}
        </Theme.TextB>
        <TouchableOpacity onPress={refresh}>
          <Theme.TextB color="#242424" size="14px">
            Refresh
          </Theme.TextB>
        </TouchableOpacity>

      </View>

      {!contacts.length && (
        <Theme.TextB
          color="#888888"
          style={{ textAlign: "center" }}
          size="12px"
        >
          No Mutual contacts found
        </Theme.TextB>
      )}
      {MutualContact}
      {moreContact > 0 && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MutualContacts", { contacts: allMutuals, isConnected: isUserConnected });
          }}
          style={{ flexDirection: "row", justifyContent: "flex-end" }}
          disabled={isNameNotShow}
        >
          <Theme.TextB>{moreContact} more contacts(s)  </Theme.TextB>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MutualContactsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7eaed",
    padding: 16,
    borderRadius: 2,
    width: "100%",
  },
  containers: {
    backgroundColor: "#f7eaed",
    padding: 16,
    borderRadius: 2,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  blur: {
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
  },
  row: {
    flexDirection: "row",
    // alignItems:'center',
    justifyContent: "space-between",
  },
  col: {
    flexDirection: "column",
  },

  avatar: {
    width: 32,
    height: 32,
    // backgroundColor: '#a05b85',
    borderRadius: 32,
  },
  contactContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  devider: {
    height: 1,
    backgroundColor: "#f0c8e0",
    marginVertical: 14,
  },
});
