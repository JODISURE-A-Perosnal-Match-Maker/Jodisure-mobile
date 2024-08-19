import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Linking,
} from "react-native";
import styled from "styled-components/native";
import { useRoute, useIsFocused } from "@react-navigation/native";

import Theme from "../../../components/Theme";
import ConnectedProfile from "../../../components/Profile/ConnectedProfile";
import {
  getConnectedUsers,
  getDisconnectedUsers,
} from "../../../services/UserService";
import FullScreenLoader from "../../../theme/FullScreenLoader";
import theme from "../../../theme/theme";
import RecomendedProfile from "../../../components/Profile/RecommendedProfile";
import AntDesign from "react-native-vector-icons/AntDesign";

const Devider = styled.View`
  height: 8px;
  background-color: #e8e8e8;
`;

const ConnectionsScreen = () => {
  const isFocused = useIsFocused();
  const [users, setUsers] = useState([]);
  const [disconnectedUsers, setDisconnectedUsers] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    console.log("are u working?????");

    setLoading(true);
    getConnectedUsers()
      .then((users) => {
        console.log("check this hungama", users);
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setFetched(true);
      });
    setLoading(true);

    getDisconnectedUsers()
      .then((users) => {
        setDisconnectedUsers(users);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setFetched(true);
      });
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      {loading && <FullScreenLoader />}
      <View style={styles.container}>
        <View style={styles.infoButton}>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:9748548623`)}>

            <View >
              <AntDesign name="phone" size={24} color="#a05b85" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%" }}>
          <View style={{ marginVertical: 12, marginLeft: 12 }}>
            <Theme.TextB>{Platform.OS === 'android'
              ? "Connected Users" : "Hand Picked Profile"}
            </Theme.TextB>
          </View>
          {fetched && !users?.length && (
            <View>
              <View
                style={{
                  padding: 25,
                  marginTop: 25,
                  backgroundColor: theme.colors.primary,
                }}
              >
                <Theme.TextB color="white" style={{ textAlign: "center" }}>
                  No profile to show!!
                </Theme.TextB>
              </View>
            </View>
          )}
          {users?.map((u) => (
            <View key={u}>
              <ConnectedProfile uid={u} />
              <Devider />
            </View>
          ))}
          <View style={styles.grayFilter}>
            {disconnectedUsers?.map((u) => (
              <View key={u}>
                <RecomendedProfile uid={u} overRideHazy={true} />
              </View>
            ))}
            {disconnectedUsers && disconnectedUsers.length > 0 && (
              <View pointerEvents='none' style={styles.overlay} />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ConnectionsScreen;

const styles = StyleSheet.create({
  infoButton: {
    position: "absolute",
    backgroundColor: "#d8d8d8",
    borderRadius: 50,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    top: 1,
    // right: 1,
    margin: 6,
    marginLeft:160,
    padding: 4,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    marginBottom: 50,
  },
  grayFilter: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // pointerEvents: "none",
  },
});
