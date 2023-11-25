import * as React from "react";
import { useState} from "react";



const Map = (hasPlace, latitude, longitude) => {

  const [sourceURL, setSourceURL]=useState("https://www.google.com/maps/embed/v1/search?key="+process.env.REACT_APP_GOOGLE_MAP_API_KEY+"&q=vet+near+me");
		if (hasPlace == true){
			setSourceURL("https://www.google.com/maps/embed/v1/search?key="+process.env.REACT_APP_GOOGLE_MAP_API_KEY+"&q=vet&center="+latitude+","+longitude);
		}
    console.log(hasPlace, latitude, longitude, sourceURL);
  return (
    <div>
      
    <iframe
				src={sourceURL}
				width="640px"
				//sandbox="aasda"
				height="320px"
				id=""
				className=""
				sandbox="allow-scripts allow-same-origin"
				//sandbox={["allow-same-origin", "allow-scripts"]}
				//display="block"
				position="relative"
				allowFullScreen
			/>
      </div>
  )
}

export default Map;