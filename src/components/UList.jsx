import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from './Theme';

const UList = () => {
    return (
        <View style={styles.container}>
            <Theme.TextB style={styles.title} size="18px" color="#05626e">Advices</Theme.TextB>
            <View style={styles.uListContainer}>
                <View style={styles.bullet} />
                <Theme.Text size="14px" color="#05626e" style={styles.para}>Lorem ipsum to be lorem ipsum which will help ewpower ertopert</Theme.Text>
            </View>
            <View style={styles.uListContainer}>
                <View style={styles.bullet} />
                <Theme.Text size="14px" color="#05626e" style={styles.para}>Lorem ipsum to be lorem ipsum which will help ewpower ertopert</Theme.Text>
            </View>
            <View style={styles.uListContainer}>
                <View style={styles.bullet} />
                <Theme.Text size="14px" color="#05626e" style={styles.para}>Lorem ipsum to be lorem ipsum which will help ewpower ertopert</Theme.Text>
            </View>
            <View style={styles.uListContainer}>
                <View style={styles.bullet} />
                <Theme.Text size="14px" color="#05626e" style={styles.para}>Lorem ipsum to be lorem ipsum which will help ewpower ertopert</Theme.Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EDF6F8',
        paddingLeft: 16,
        paddingRight:48,
        paddingVertical: 26,
        borderRadius: 4,
    },
    title: {
        marginBottom:12,
    },
    uListContainer: {
        marginTop:12,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bullet:{
        height:10,
        width:10,
        backgroundColor:'#97c7cd',
        borderRadius:5,
        marginRight:10,
    },
    para: {
        top:-5
    }
});

export default UList;
