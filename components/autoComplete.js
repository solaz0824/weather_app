import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const GooglePlacesInput = (props) => {
  
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} 
      autoFocus={false}
      returnKeyType={'search'} 
      keyboardAppearance={'light'} 
      listViewDisplayed='auto'   
      fetchDetails={true}
      renderDescription={row => row.description || row.formatted_address || row.name} 
      onPress={(data, details = null) => {  
       const {lat, lng} = details.geometry.location
       props.getCurrentWeather(lat, lng)
       props.getEveryThreeHours(lat, lng)
       props.getWeeklyWeather(lat, lng)
       props.setModalVisible(false)
      }}

      getDefaultValue={() => ''}

      query={{

        key: 'YOUR KEY',
        language: 'en', 
        types: '(cities)' 
      }}

      styles={{
        textInputContainer: {
          width: '100%',
          backgroundColor:'#e6fff2'
        },
        textInput: {
          height: 38,
          color: '#5d5d5d',
          fontSize: 16,
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}

      currentLocation={true}
      currentLocationLabel='Current location'
      nearbyPlacesAPI='GooglePlacesSearch' 
      GoogleReverseGeocodingQuery={{
      }}
      GooglePlacesSearchQuery={{
        rankby: 'distance',
        type: 'cafe'
      }}
      
      GooglePlacesDetailsQuery={{
      fields: 'geometry'}}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} 
      predefinedPlaces={[homePlace, workPlace]}

      debounce={200} 
     
    />
  );
}

export default GooglePlacesInput