import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import GoogleMapAutoComplete from './GoogleMapAutoComplete'; // Adjust the path as needed
import { Icon } from 'react-native-elements';
import theme from '../../theme/theme';
import { isEqual } from 'lodash';
// import { MaterialIcons } from '@expo/vector-icons';

const MultipleGoogleMapAutoComplete = ({ selectedCities = [], onCityAdd, onCityRemove }) => {
    const [cities, setCities] = useState(selectedCities);

    useEffect(() => {
        if (!isEqual(cities, selectedCities)) {
            console.log('Selected Cities:', selectedCities);
            setCities(selectedCities);
        }
    }, [selectedCities]); // This still triggers every time `selectedCities` changes

    const addCity = (city) => {
        const newCities = [...cities, city];
        setCities(newCities);
        if (onCityAdd) {
            onCityAdd(newCities);
        }
    };

    const removeCity = (index) => {
        const updatedCities = cities.filter((_, i) => i !== index);
        setCities(updatedCities);
        if (onCityRemove) {
            onCityRemove(updatedCities);
        }
    };

    return (
        <View style={styles.container}>
            <GoogleMapAutoComplete cities={cities} setCities={addCity} />
            <View style={{
                flex: 1,
                height: 0.5,
                backgroundColor: 'grey'
            }} />
            <FlatList
                data={cities}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.cityItem}>
                        <Text style={styles.cityText}>{item}</Text>
                        <TouchableOpacity onPress={() => removeCity(index)}>
                        <Icon
                  name="close-o"
                  type="evilicon"
                  color={theme.colors.secondaryMedium}
                />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 3,
    },
    cityItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingVertical: 15,
        padding:10,
        borderWidth: 2,
        borderRadius:50,
        borderColor: theme.colors.secondaryMedium,
        marginVertical:3
    },
    cityText: {
        fontSize: 16,
        color: theme.colors.secondary,
    },
    removeButton: {
        color: 'red',
    },
});

export default MultipleGoogleMapAutoComplete;
