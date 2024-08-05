import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import styled from 'styled-components/native';

import Theme from '../../../components/Theme';
import theme from '../../../theme/theme';
import RoundDarkButton from '../../../components/RoundDarkButton';
import RoundLightButton from '../../../components/RoundLightButton';
import { getRequest } from '../../../services/RequestService';
import RequestedProfile from '../../../components/Profile/RequestedProfile';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import FullScreenLoader from '../../../theme/FullScreenLoader';



const Devider = styled.View`
  height:8px;
  background-color:#e8e8e8;
`;


const SentRequestScreen = () => {

    const [profiles, setProfiles] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [activeTab, setActiveTab] = useState('sent');// sent, received
    const [activeButton, setActiveButton] = useState('pending');// rejected, accepted, pending
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (route?.params?.activeButton) {
            setActiveButton(route.params.activeButton);
        }
        if (route?.params?.activeTab) {
            setActiveTab(route.params.activeTab);
        }
    }, [isFocused])

    useEffect(() => {
        refresh();
    }, [activeTab, activeButton]);

    const refresh = () => {
        setLoading(true);
        setProfiles([]);
        getRequest(activeTab, activeButton).then(rx => {
            setProfiles(rx);
            setFetched(true)
        }).catch(err => {
            alert('Something went wrong please try again!')
        }).finally(() => {
            setLoading(false);
        })
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            stickyHeaderIndices={3}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refresh} />
            }
        >
            {loading && <FullScreenLoader />}
            <View style={styles.topContainer}>
                <View style={styles.buttonContainer}>
                    {(activeButton === 'rejected') ? <RoundDarkButton name="REJECTED" /> : <RoundLightButton onPress={() => setActiveButton('rejected')} name="REJECTED" />}
                    {(activeButton === 'accepted') ? <RoundDarkButton name="ACCEPTED" /> : <RoundLightButton name="ACCEPTED" onPress={() => setActiveButton('accepted')} />}
                    {(activeButton === 'pending') ? <RoundDarkButton name="PENDING" /> : <RoundLightButton name="PENDING" onPress={() => setActiveButton('pending')} />}
                </View>
            </View>

            <View style={styles.container}>
                <View style={{ width: '100%' }}>

                    {
                        profiles.map(p => (
                            <View key={p}>
                                <RequestedProfile uid={p} activeTab={activeTab} activeButton={activeButton} refresh={refresh} />
                                <Devider />
                            </View>
                        ))
                    }
                    {(fetched && !profiles.length && !loading) && <View>
                        <View style={{ padding: 25, marginTop: 25, backgroundColor: theme.colors.primary }}>
                            <Theme.TextB color="white" style={{ textAlign: 'center' }}>No profile to show!!</Theme.TextB>
                        </View>
                    </View>}
                </View>
            </View>
        </ScrollView>
    )
}

export default SentRequestScreen;

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        marginBottom: 50,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tab: {
        flex: 1,
        padding: 20,
    },
    tabActive: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#a05b85'
    },
    tabText: {
        textAlign: 'center',
        fontSize: 18
    },
    verticalDevider: {
        width: 2,
        height: 40,
        backgroundColor: '#e2e2e2'
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        justifyContent: 'space-around',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
    }
});