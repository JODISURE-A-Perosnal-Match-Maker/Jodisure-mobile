import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import theme from '../theme/theme';
import Theme from './Theme';

const ContactCard = React.memo(({ contact, setSelection }) => {
    const { displayName, selected, number, disabled } = contact;
    // const [localSelected, setLocalSelected] = useState(selected);

    
    // useEffect(() => {
    //     setLocalSelected(selected);
    // }, [selected]);

    const onValueChangeHandler = useCallback((newValue) => {
        if (disabled) return;
        // setLocalSelected(newValue);
        setSelection(number, newValue);
    }, [disabled, number, setSelection,]);

    return (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.checkBoxContainer}
                onPress={() => !disabled && onValueChangeHandler(!selected)}
                activeOpacity={0.8}
            >
            <View style={styles.infoContainer}>
                <View style={styles.icon}>
                    <Text style={styles.iconContent}>
                        {displayName[0]}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Theme.Text style={styles.primaryText}>
                        {displayName}
                    </Theme.Text>
                    <Theme.Text style={{ color: (!disabled) ? 'black' : 'gray' }}>
                        {number}
                    </Theme.Text>
                </View>

                    <CheckBox
                        disabled={disabled}
                        value={selected}
                        boxType="square"
                        tintColors={{ true: theme.colors.primaryDark, false: theme.colors.grey0 }}
                        onValueChange={onValueChangeHandler}
                    />
            </View>
                </TouchableOpacity>
            {disabled ? (
                <View style={styles.overlay}></View>
            ) : null}
        </View>
    );
});

export default ContactCard;

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 5,
        position: 'relative',
    },
    checkBoxContainer: {
        // paddingLeft: 60, // Increase the touchable area
        // paddingRight: 40, // Increase the touchable area

        justifyContent: 'center',
        alignItems: 'center',
      },
    overlay: {
        position: 'absolute',
        width: '105%',
        height: 70,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    primaryText: {
        fontSize: 16,
        color: theme.colors.black,
    },
    iconContent: {
        flex: 1,
        paddingVertical: 5,
        fontSize: 18,
        color: 'white',
        marginHorizontal: 10,
    },
    icon: {
        borderRadius: 25,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        padding: 1,
        backgroundColor: "#8db8ca",
    },
});
