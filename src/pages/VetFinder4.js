import * as React from "react";
import Map from "../components/Map";
import { useState, useRef} from "react";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	InputLabel,
	Select,
	MenuItem
  } from "@mui/material";

import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
  } from "react-places-autocomplete";

const VetFinder4 = () => {
		//https://github.com/leighhalliday/demo-google-places-react/blob/master/src/App.js
		const [address, setAddress] = useState("");
		const [coordinates, setCoordinates] = useState({
			lat: 42.687532,
			lng: -83.234103
		}); //changed coordinates to OU coordinates

		//added
		const [hasPlace, setHasPlace] = useState(null);
		const [latitude, setLatitude] = useState(coordinates.lat);	
		const [longitude, setLongitude] = useState(coordinates.lng);
		const [showAutocomplete, setShowAutocomplete] = useState(false);
		const [source, setSource] = useState("geolocation");
		const [open, setOpen] = React.useState(true);
		const handleOpen = () => setOpen(true);
		//const handleClose = () => setOpen(false);
		const [showMap, setShowMap] = useState(false);
		const [sourceURL, setSourceURL]=useState("https://www.google.com/maps/embed/v1/search?key="+process.env.REACT_APP_GOOGLE_MAP_API_KEY+"&zoom=12&q=vet+near+me");

		//https://github.com/leighhalliday/demo-google-places-react/blob/master/src/App.js
		const handleSelect = async value => {
			const results = await geocodeByAddress(value);
			const latLng = await getLatLng(results[0]);
			//setHasPlace(true); //added
			setAddress(value);
			setCoordinates(latLng);
			setLongitude(coordinates.lng); //added
			setLatitude(coordinates.lat); //added
		};

		//POETENTIAL FUTURE WORK:: SEARCH NEARBY PLACES, GET PLACE_ID,
		//THEN ON BUTTON CLICK LOAD A NEW PAGE/POPUP WITH AN EMBEDDED IFRAME MAP OF THAT PLACE
		// /THOSE PLACES


		//added
		const handleSourceChange = (s) => {
			//handle change to the dialog box
			setSource(s);
			if (source == "userInput"){
				setShowAutocomplete(false);
			} else if (source == "geolocation"){
				setShowAutocomplete(true);
			}
			//console.log(source, showAutocomplete);
		}
		
		const handleClose = (s) => {
			setOpen(false);
			console.log(s);
			//handle clicking button to close dialog or to search for vets
			if (s){
				if (source == "userInput"){
					//if the user gave an address
					setSourceURL("https://www.google.com/maps/embed/v1/search?key="+process.env.REACT_APP_GOOGLE_MAP_API_KEY+"&zoom=12&q=vet&center="+latitude+","+longitude);
				} else {
					setSourceURL("https://www.google.com/maps/embed/v1/search?key="+process.env.REACT_APP_GOOGLE_MAP_API_KEY+"&zoom=12&q=vet+near+me");
				}
				console.log(hasPlace, latitude, longitude, sourceURL);
				setShowMap(true);

				}
		}
		
		

		return (
			<div>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>Find Vets Near You</DialogTitle>
					<DialogContent>
					<DialogContentText>
						To discover veterenarians in your area, please either select "Use current location" or enter an address to search from. 
					</DialogContentText>
					<InputLabel id="location-source">Select a method</InputLabel>
						<Select
							labelId="location-source-label"
							id="location-source"
							value={source}
							label="Select a method"
							onChange={(e) => handleSourceChange(e.target.value)}
						>
							<MenuItem value={"geolocation"}>Use current location</MenuItem>
							<MenuItem value={"userInput"}>Enter an address</MenuItem>
						</Select>
						{showAutocomplete ? //added condition for showing autocomplete
						<PlacesAutocomplete
							//https://github.com/leighhalliday/demo-google-places-react/blob/master/src/App.js
							value={address}
							onChange={setAddress}
							onSelect={handleSelect}
						>
							{({ getInputProps, suggestions, getSuggestionItemProps, loading, hasPlace }) => (
							<div>
								<p hidden //added hidden antribute
								>Latitude: {coordinates.lat}</p>
								<p hidden //added hidden attribute
								>Longitude: {coordinates.lng}</p>
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
						  : null}
					</DialogContent>
					<DialogActions>
					<Button onClick={() => handleClose(false)}>Cancel</Button>
					<Button onClick={() => handleClose(true)}>Search</Button>
					</DialogActions>
				</Dialog>	
				<div
>
				{ //added
					showMap ? 
					<Map sourceURL={sourceURL}></Map> 
					: null}
					</div>
			</div>
			//<Button>Update the Map</Button>
			//<Map hasPlace latitude longetude address></Map>

			/*
				<Map //added component
			hasPlace={hasPlace} latitude={latitude} longitude={longitude}></Map> 
			*/
		)
	}
    export default VetFinder4;