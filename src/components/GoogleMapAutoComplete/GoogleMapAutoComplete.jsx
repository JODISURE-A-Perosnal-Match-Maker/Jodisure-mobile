import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../constants/config';
import theme from '../../theme/theme';

const GoogleMapAutoComplete = ({ cities, setCities }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder={cities ? cities.toString() : 'Search City'}
            listViewDisplayed={false}
            onPress={(data, details = null) => {
                try {
                    console.log('Selected Place:', JSON.stringify(data, null, 2));
                    setCities(data.description);
                } catch (error) {
                    console.error('Error handling place selection:', error);
                }
            }}
            fetchDetails={true}
            textInputProps={{
                placeholderTextColor: 'grey',
                returnKeyType: "search",
                autoCorrect: false // This might help in avoiding some unwanted behaviors
            }}
            styles={{
                container: {
                    flex: 0,
                    zIndex: 1,
                    borderRadius: 5
                },
                textInputContainer: {
                    width: '100%',
                },
                textInput: {
                    height: 44,
                    color: 'black',
                    fontSize: 16,
                },
                listView: {
                    backgroundColor: 'white',
                },
                description: {
                    fontWeight: 'bold',
                    color: '#000000',
                },
                predefinedPlacesDescription: {
                    color: '#1faadb',
                },
                row: {
                    backgroundColor: '#ffffff',
                    padding: 13,
                    height: 44,
                    flexDirection: 'row',
                },
                separator: {
                    height: 0.5,
                    backgroundColor: '#c8c7cc',
                },
            }}
            query={{
                key: config.GOOGLE_MAP_API,
                language: 'en',
                types: '(cities)'
            }}
            enablePoweredByContainer={false}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={100} // Reduced debounce time for more responsiveness
        />
    );
};

export default GoogleMapAutoComplete;
