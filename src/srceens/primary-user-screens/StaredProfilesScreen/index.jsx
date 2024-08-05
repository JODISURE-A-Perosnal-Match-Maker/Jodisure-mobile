import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native'
import styled from 'styled-components/native';
import Theme from '../../../components/Theme';
import { getRecomendations, getStaredProfiles } from '../../../services/UserService';
import theme from '../../../theme/theme';
import StaredProfile from '../../../components/Profile/StaredProfile';


const Devider = styled.View`
  height:8px;
  background-color:#e8e8e8;
`;

const StaredProfilesScreen = () => {

    const [profiles, setProfiles] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        getStaredProfiles().then(rx => {
            setProfiles(rx);
            setFetched(true)
        }).catch(err => {
            alert("Something went wrong please try again.")
        })
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                
                <View style={{ width: '100%' }}>
                    {
                        profiles?.map(p => (
                            <View key={p}>
                                <StaredProfile uid={p} refresh={refresh} />
                                <Devider />
                            </View>
                        ))
                    }
                    {(fetched && !profiles?.length) && <View>
                        <View style={{ padding: 25, marginTop: 25, backgroundColor: theme.colors.primary }}>
                            <Theme.TextB color="white" style={{ textAlign: 'center' }}>No starred profiles!! Go to recomedations screen and add profiles to this list</Theme.TextB>
                        </View>
                    </View>}
                </View>
            </View>
        </ScrollView>
    )
}

export default StaredProfilesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        marginBottom: 50,
        marginTop:StatusBar.currentHeight+20,
    }
});
