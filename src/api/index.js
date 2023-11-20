import axios from 'axios';
const cors = require("cors");


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
          'X-Goog-FieldMask': 'id,location,formattedAddress,displayName,photos,rating,website,formatted_phone_number,price_level',
          'Access-Control-Allow-Origin': '*',          
          "Access-Control-Allow-Methods": '*',
          'Access-Control-Allow-Headers': '*',
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    });
    
    return data;
  } catch (error) {
    console.error("Error fetching nearby places: " + error);
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
          "Access-Control-Allow-Methods": '*',
          'Access-Control-Allow-Headers': '*'
        },
    });
    
    return data;
  } catch (error) {
    console.error("Error fetching Maps libraries: " + error);
  }
};
