import axios from 'axios';

export const getNearbyPlaces = async (lat, lng) => {
  try {
    const {data: {data} }= await axios.get('https://places.googleapis.com/v1/places:searchNearby/json', {
        params: {
          "locationRestriction": {
            "circle": {
              "center": {
                "latitude": {lat},
                "longitude": {lng}
              }}},
          radius: '1500',
          type: 'veterinary_care',
          maxResultCount: '5'
        },
        headers: {
          'X-Goog-Api-Key': 'AIzaSyBDUcFZdWRZ5SQOq_q4OYE3DoDhKMRcxgk',
          'X-Goog-FieldMask': 'id,location,formattedAddress,displayName,photos,rating,website,formatted_phone_number,price_level'
        },
    });
    
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getLibraries = async (lat, lng) => {
  try {
    const {data: {data} }= await axios.get('https://maps.googleapis.com/maps/api/js', {
        params: {
          libraries: "places,geocoding"
        },
        headers: {
          'X-Goog-Api-Key': 'AIzaSyBDUcFZdWRZ5SQOq_q4OYE3DoDhKMRcxgk',
        },
    });
    
    return data;
  } catch (error) {
    console.error(error);
  }
};
