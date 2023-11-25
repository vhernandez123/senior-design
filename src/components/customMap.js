import * as React from "react";
import { useState} from "react";



const CustomMap = (coordinates) => {

    const latitude = "" + coordinates.lat.toString;
    const longitude = "" + coordinates.lng.toString;
    const sourceURL = "https://www.google.com/maps/embed/v1/search?key="+process.env.REACT_APP_GOOGLE_MAP_API_KEY+"&q=vet&center="+latitude+","+longitude;

    console.log(sourceURL, latitude, longitude);
  return (
    <div>
      
    <iframe
				src={sourceURL}
				width="640px"
				//sandbox="aasda"
				height="320px"
				id=""
				className=""
				//sandbox="allow-scripts allow-same-origin"
				//sandbox={["allow-same-origin", "allow-scripts"]}
				//display="block"
				position="relative"
				allowFullScreen
			/>
      </div>
  )
}

export default CustomMap;