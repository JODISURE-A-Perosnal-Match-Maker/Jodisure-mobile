import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Image, FlatList, Share, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Theme from '../../../components/Theme';
import theme from '../../../theme/theme';
import FnfLoginRequestCard from '../../../components/PuComponents/FnfLoginRequestCard';
import { UserContext } from '../../../navigation';
import FnfShareProfileCard from '../../../components/PuComponents/FnfShareProfileCard';
import FullScreenLoader from '../../../theme/FullScreenLoader';

const ShareProfileScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const userData = useContext(UserContext);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        // subscribe to connected users
        const subscriber = firestore().collection('su_connections').where('pu_id', '==', auth().currentUser.uid).where('pu_approved','==',true).onSnapshot(async querySnapshot => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ id: doc.id, ...doc.data() })
            })
            setUsers(docs);
            setLoading(false);
        })
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [navigation]);



    return (
        <View style={styles.mainContainer}>
            {loading && <FullScreenLoader/>}
            <View style={styles.container}>
                {(!loading && !users.length) && <View style={styles.noConnectionContainer}>
                    <Image source={require('../../../assets/images/group_19.png')} style={{ width: 66, height: 66, resizeMode: 'contain' }} />
                    <Theme.Text color="#000000" size="14px">No family members are connected!</Theme.Text>
                    <Theme.Text style={{ textAlign: 'center' }} color="#ce3636" size="14px">We recommend to connect with atleast one member to use the app</Theme.Text>
                </View>}
                <View >
                    <FlatList
                        data={users}
                        renderItem={({ item }) => <View style={{ marginVertical: 10 }}>
                            <FnfShareProfileCard key={item.id} data={item} />
                        </View>}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            </View>
        </View>
    )
}

export default ShareProfileScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    noConnectionContainer: {
        marginTop: 16,
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 30,
        alignItems: 'center',
        height: 186,
        borderColor: '#cfcfcf',
        borderWidth: 1,
        borderRadius: 8,
    }
})
