//https://www.youtube.com/watch?v=iOif0eHQbHY
//adapted for React.js from Javascript
//"use client";
import * as React from "react";
import { useState, useRef, useEffect} from "react";

import {
    APIProvider,
    Map,
    Marker,
    Pin,
    InfoWindow,
    useApiIsLoaded,
    useMapsLibrary,
    useMap,
    useApiLoadingStatus,
    //useAutocomplete,
    useMarkerRef
    //usePlacesAutocomplete
}from "@vis.gl/react-google-maps";

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Popover,
    Input,
    FormLabel,
    Stack,
    Container,
    TextField
  } from "@mui/material";

const VetFinder = () => {
//main function

    const placeType="veterinary_care";
    const [markerRef, marker] = useMarkerRef();
    //const mapRef = useRef();
    const placesRef = useRef(null);
    const [inputValue, setInputValue] = useState('312 Meadow Brook Rd, Rochester, MI 48309');
    const googleMapsApiKey = process.env.googleMapsApiKey;

      const placesLib = useMapsLibrary('places');
      const mapsLib = useMapsLibrary('maps');

      const [rows, addRow] = useState([]);


    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: 42.687532,
        lng: -83.234103
    });

    //const map = useMap("map"); 
    //map.setCenter(coordinates);
    const map = useMap("map");

    useEffect(() => {
        if (!map) return;
            map.setCenter(coordinates);
        // do something with the map instance
    },[map]);
    console.log("map:" + map);


    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
        searchNearbyPlaces();   
    };
      
    function searchNearbyPlaces (){

        

        //console.log("latLng: " + latLng.lat + " " + latLng.lng);
        //cannot read properties of null (reading: setCenter)
        
        console.log("coordinates: " + coordinates.lat + coordinates.lng);

        var service = new placesLib.PlacesService(map);

        // Perform a nearby search for places of type 'store'.
        service = new placesLib.PlacesService(map);
        service.nearbySearch({
            location: coordinates,
            radius: '50',
            type: [placeType]
        }, callback);    
    }

    function callback(results, status) {
        if (status === placesLib.PlacesServiceStatus.OK) {
            console.log(results.length)
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        console.log(place)
        var table = placesRef.current;
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        cell1.innerHTML = place.name;
        if (place.photos) {
            let photoUrl = place.photos[0].getUrl();
            let cell2 = row.insertCell(1)
            cell2.innerHTML = `<img width="300" height="300" src="${photoUrl}"/>`
        } else {
            let photoUrl = "https://via.placeholder.com/150"
            let cell2 = row.insertCell(1)
            cell2.innerHTML = `<img width="300" height="300" src="${photoUrl}"/>`
        }
    }
    return (
        //<APIProvider apiKey="AIzaSyBDUcFZdWRZ5SQOq_q4OYE3DoDhKMRcxgk" libraries={['places']}>
        <Container>
            <br/><br/>
            <div text-align="center" vertical-align="middle">
                    <h1>Find Veterinarians</h1>
                </div>
            <Stack spacing={3} direction="column" sx={{ marginBottom: 4, marginLeft:4, marginTop: 4, marginRight: 4}}>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
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
            </Stack>
            <APIProvider apiKey="AIzaSyBDUcFZdWRZ5SQOq_q4OYE3DoDhKMRcxgk"><Map id="map" zoom={10} center={coordinates}>
                <Marker ref={markerRef} position={coordinates} />
            </Map></APIProvider>
            <br/><br/>
            <Table sx={{ minWidth: 650 }} id="places" ref={placesRef}>
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Picture</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.photo}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
      
        </Container>
        //onChange={setInputValue}
    );
};

export default VetFinder;