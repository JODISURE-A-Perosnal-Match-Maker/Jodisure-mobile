import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import moment from 'moment';
import Theme from '../Theme';
import RoundLightButton from '../RoundLightButton';
import RoundDarkButton from '../RoundDarkButton';
import { deleteSUConnection, updateSUConnections } from '../../services/SUserService';


const FnfLoginRequestCard = ({ data }) => {

    const handleDelete = (actionType) => {
        Alert.alert(
            "Are you sure?",
            "Your secondary user will be " + actionType,
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Ok",
                    onPress: () => {
                        deleteSUConnection(data.id).then(res => {
                            showMessage({
                                message: actionType + "!",
                                description: `User has been ${actionType}.`,
                                type: "info",
                            });
                        }).catch(err => {
                            showMessage({
                                message: "Failed!",
                                description: "Failed. Try again",
                                type: "danger",
                            });
                        })
                    },
                    style: 'default'
                }
            ]
        )
    }

    return (
        <View style={styles.card}>
            <Theme.TextB color="#a05b85" size="16px">{data?.su_firstName} {data?.su_lastName}</Theme.TextB>
            <View style={styles.row}>
                <View style={[{ flex: 1 }, styles.col]}>
                    <Theme.Text color="#2c8a96" size="14px">Date of Request</Theme.Text>
                    <Theme.Text color="#2c8a96" size="14px">{moment(data?.createdAt?.toDate()).format('MM.DD.YYYY')}</Theme.Text>
                </View>
                <View style={[{ flex: 1 }, styles.col]}>
                    <Theme.Text color="#808080" size="12px">Relation</Theme.Text>
                    <Theme.Text color="#000000" size="14px">{data?.su_relationship}</Theme.Text>
                </View>
            </View>
            {!data.pu_approved ? (
                <View style={styles.row2}>
                    <RoundLightButton name="DENY" onPress={() => {
                        handleDelete('rejected');
                    }} />
                    <RoundDarkButton name="ACCEPT" onPress={() => {
                        updateSUConnections({ pu_approved: true }, data.id).then(res => {
                            showMessage({
                                message: "Accepted!",
                                description: "Login request has been accepted",
                                type: "info",
                            });
                        }).catch(err => {
                            showMessage({
                                message: "Failed!",
                                description: "Failed to accept request. Try again",
                                type: "danger",
                            });
                        })

                    }} />
                </View>
            ) : null}

            {data.pu_approved ? (
                <RoundDarkButton name="DELETE" onPress={() => {
                    handleDelete('deleted');
                }} />
            ) : null}


        </View>
    )
}

export default FnfLoginRequestCard

const styles = StyleSheet.create({
    card: {
        marginVertical: 16,
        backgroundColor: '#ffffff',
        borderColor: '#cfcfcf',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        padding: 16
    },
    row: {
        marginVertical: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row2: {
        marginVertical: 17,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
})
