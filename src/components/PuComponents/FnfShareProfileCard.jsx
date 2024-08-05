import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import moment from 'moment';
import Theme from '../Theme';
import CheckBox from '@react-native-community/checkbox';
import { shareConnection, unShareConnection } from '../../services/SUserService';
import { useRoute } from '@react-navigation/native';
const FnfShareProfileCard = ({data}) => {
    const [shared,setShared]=useState(false);
    const route = useRoute();
    useEffect(() => {
        if(data && data.sharedConnections && data.sharedConnections.length){
            if (data.sharedConnections.includes(route.params.uid)){
                setShared(true);
            }
        }
    }, [data]);

    const handleCheckAction = (newValue)=>{
        if(newValue){
            shareConnection(route.params.uid,data.su_id).then(()=>{
                setShared(newValue);
            }).catch(err=>{
                Alert.alert('Failed!',err);
            })
        }else{
            unShareConnection(route.params.uid, data.su_id).then(() => {
                setShared(newValue);
            }).catch(err => {
                Alert.alert('Failed!', err);
            });
        }
    }
    return (
        <View style={styles.card}>
            <Theme.TextB color="#a05b85" size="16px">{data?.su_firstName} {data?.su_lastName}</Theme.TextB>
            <View style={styles.row}>
                <View>
                    <Theme.Text color="#808080" size="12px">Relation</Theme.Text>
                    <Theme.Text color="#000000" size="14px">{data?.su_relationship}</Theme.Text>
                </View>
                <CheckBox
                    disabled={false}
                    value={shared}
                    onValueChange={handleCheckAction}
                />
            </View>
        </View>
    )
}

export default FnfShareProfileCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderColor: '#cfcfcf',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        padding: 16
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
