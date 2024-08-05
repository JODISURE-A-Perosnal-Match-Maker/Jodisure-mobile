import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { useRoute, useIsFocused } from '@react-navigation/native';

import Theme from '../../../components/Theme';
import FullScreenLoader from '../../../theme/FullScreenLoader';
import theme from '../../../theme/theme';
import SharedProfileToSu from '../../../components/Profile/SharedProfileToSu';



const Devider = styled.View`
  height:8px;
  background-color:#e8e8e8;
`;

const PrimaryUsersConnectionsScreen = () => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const [users, setUsers] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(route.params);
    if (route?.params?.connection?.sharedConnections) {
      setUsers(route.params.connection.sharedConnections);

    }
    setFetched(true);
  }, [isFocused]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {loading && <FullScreenLoader />}
      <View style={styles.container}>

        <View style={{ width: '100%' }}>
          <View style={{ marginVertical: 12, marginLeft: 12 }}>
            <Theme.TextB>Shared Profiles</Theme.TextB>
          </View>
          {(fetched && !users?.length) && <View>
            <View style={{ padding: 25, marginTop: 25, backgroundColor: theme.colors.primary }}>
              <Theme.TextB color="white" style={{ textAlign: 'center' }}>No profile to show!!</Theme.TextB>
            </View>
          </View>}
          {users?.map(u => (
            <View key={u}>
              <SharedProfileToSu uid={u} />
              <Devider />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default PrimaryUsersConnectionsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginBottom: 50,
    marginTop: StatusBar.currentHeight + 10,
  }
});
