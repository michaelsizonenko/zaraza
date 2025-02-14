import React from 'react';
import {Image, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import * as T from '../texts/Strings';

const homePlace = {description: 'Home', geometry: {location: {lat: 48.8152937, lng: 2.4597668}}};
const workPlace = {description: 'Work', geometry: {location: {lat: 48.8496818, lng: 2.2940881}}};

const GooglePlacesInput = () => {
    return (
        <GooglePlacesAutocomplete
            placeholder={T.ADDRESS}
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}

            getDefaultValue={() => ''}

            query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyB2wHb2ODcCuNSM6KCfoqUXtpi41xeo_vs',
                language: 'ru', // language of the results
                components: 'country:ua',
                location: "46.460123, 30.5717052",
                radius: "30000",
                strictbounds: true
            }}

            styles={{
                textInputContainer: {
                    width: '100%',
                    color: 'blue'
                },
                description: {
                    fontWeight: 'bold'
                },
                predefinedPlacesDescription: {
                    color: '#1faadb'
                },
                container: {
                    padding: 0,
                    color: 'red'
                }
            }}

            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                type: 'cafe',
            }}

            GooglePlacesDetailsQuery={{
                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                fields: 'formatted_address',
            }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            predefinedPlaces={[]}

            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            renderLeftButton={() => <Image name='arrow-left'/>}
            // renderRightButton={() => <Text>Custom text after the input</Text>}
        />
    );
};

export default GooglePlacesInput

