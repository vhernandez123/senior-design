/*global google*/

import React from 'react';
import { useState, useRef, useEffect} from "react";

import {Component} from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
//import { useQuery } from 'react-query';
import {Container} from '@mui/material';
//import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
//import CurrentLocation from '../components/Map';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

//const google = window.google;
//Cannot read properties of undefined (reading 'maps')
const {Map} = await google.maps.importLibrary("maps");



const infoWindow = new google.maps.InfoWindow;

const currentInfoWindow = infoWindow;
const VetFinder = () => {  

  const googlemapRef = useRef(null);

  const [coordinates, setCoordinates] = useState({
    lat: 42.687532,
    lng: -83.234103
});

  const [address, setAddress] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
})
    const bounds = new google.maps.LatLngBounds();
    const infoWindow = new google.maps.InfoWindow;
    const currentInfoWindow = infoWindow;

    
  
    const [map, setMap] = useState(null)
      
      if (isLoaded){
        setMap(new google.maps.Map(document.getElementById('map'), {
          center: coordinates,
          zoom: 15
          }));
      }
      

      const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
        recenterMap();
        //searchNearbyPlaces();   
    };

    //https://github.com/adrianhajdin/project_travel_advisor/blob/master/src/App.js
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      });
    }, []);
  
}

const recenterMap = () => {
  const map = this.map;
  const current = this.state.currentLocation;
  const google = this.props.google;
  const maps = google.maps;

  if (map) {
    let center = new maps.LatLng(current.lat, current.lng);
    map.panTo(center);
  }
}

// Handle a geolocation error
function handleLocationError(browserHasGeolocation, infoWindow, coordinates) {
    // Set default location to OU
    coordinates = {lat: 42.687532,
      lng: -83.234103};
    var map = new google.maps.Map(document.getElementById('map'), {
    center: coordinates,
    zoom: 15
    });

    // Display an InfoWindow at the map center
    infoWindow.setPosition(coordinates);
    infoWindow.setContent(browserHasGeolocation ?
    'Geolocation permissions denied. Using default location.' :
    'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
    currentInfoWindow = infoWindow;

    return (
      <div>
        <PlacesAutocomplete
                //value={address}
                //onChange={setAddress}
                //onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <p hidden>Latitude: {coordinates.lat}</p>
                    <p hidden>Longitude: {coordinates.lng}</p>



                    <input {...getInputProps({ placeholder: "Type address" })} />

                    <div>
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map(suggestion => {
                        const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                        };

                        return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                            {suggestion.description}
                        </div>
                        );
                    })}
                    </div>
                </div>
                )}
            </PlacesAutocomplete>
            <br></br>
      <GoogleMap
      centerAroundCurrentLocation
      google={this.props.google}
      ref={this.googlemapRef}
      id="map"
      >
      
      <Marker onClick={this.onMarkerClick} name={'Current Location'} />
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <h4>{this.state.selectedPlace.name}</h4>
        </div>
      </InfoWindow>
    </GoogleMap>
    </div>
    );
    
}
export default VetFinder;