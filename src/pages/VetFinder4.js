import * as React from "react";
import Map from "../components/Map";
import { useState, useRef} from "react";

import {
	Button
  } from "@mui/material";

import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
  } from "react-places-autocomplete";

const VetFinder4 = () => {
		const [hasPlace, setHasPlace] = useState(null);
		const [coordinates, setCoordinates] = useState({
			lat: 42.687532,
			lng: -83.234103
		});
		const [latitude, setLatitude] = useState(coordinates.lat);	
		const [longitude, setLongitude] = useState(coordinates.lng);	

		const [address, setAddress] = useState("");

		//https://github.com/leighhalliday/demo-google-places-react/blob/master/src/App.js
		const handleSelect = async value => {
			const results = await geocodeByAddress(value);
			const latLng = await getLatLng(results[0]);
			setLongitude(coordinates.lng);
			setHasPlace(true);
			setAddress(value);
			setCoordinates(latLng);
			setLatitude(coordinates.lat);
		};

		

		return (
			<div>
			<PlacesAutocomplete
			//https://github.com/leighhalliday/demo-google-places-react/blob/master/src/App.js
			value={address}
			onChange={setAddress}
			onSelect={handleSelect}
		>
			{({ getInputProps, suggestions, getSuggestionItemProps, loading, hasPlace }) => (
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
				{hasPlace ? 
				<Map hasPlace={hasPlace} latitude={latitude} longetude={longitude} address={address}></Map> 
				: null}
				</div>
			</div>
			)}
			</PlacesAutocomplete>
			<Map hasPlace={hasPlace} latitude={latitude} longitude={longitude}></Map> 
				
			</div>
			//<Button>Update the Map</Button>
			//<Map hasPlace latitude longetude address></Map>

		)
	}
    export default VetFinder4;