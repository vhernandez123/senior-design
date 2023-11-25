import * as React from "react";
import { useState} from "react";




const Map = () => {
const sourceURL = "https://www.google.com/maps/embed/v1/search?key="+process.env.REACT_APP_GOOGLE_MAP_API_KEY+"&q=vet+near+me";
  return (
    <div >
    <iframe
				src={sourceURL}
				width="95%"
				//sandbox="aasda"
				height="340vh"
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