import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Theme from '../Theme'

const ContactInfoCard = ({}) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Theme.Text color="#969696" size="12px">Grand father’s first name</Theme.Text>
                <Theme.Text color="#242424" size="12px">Mr. Parth Dixit</Theme.Text>
            </View>
            <View style={styles.row}>
                <Theme.Text color="#969696" size="12px">Grand father’s last name</Theme.Text>
                <Theme.Text color="#242424" size="12px">Mrs. Shilpa Dixit</Theme.Text>
            </View>
            <View style={styles.row}>
                <Theme.Text color="#969696" size="12px">Grand mother’s first name</Theme.Text>
                <Theme.Text color="#242424" size="12px">Mr. Piyush Pandit</Theme.Text>
            </View>
            <View style={styles.row}>
                <Theme.Text color="#969696" size="12px">Grand mother’s first name</Theme.Text>
                <Theme.Text color="#242424" size="12px">Miss Dimple Dixit</Theme.Text>
            </View>
        </View>
    )
}

export default ContactInfoCard

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fffafb',
        padding:20,
    },
    row:{
        marginVertical:6
    }
})
