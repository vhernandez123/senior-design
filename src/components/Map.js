import * as React from "react";
import "../css/Map.css"; //import css file

const Map = () => {    
  return (
    <div >
    <iframe
				src="https://www.google.com/maps/embed/v1/search?key=AIzaSyBDUcFZdWRZ5SQOq_q4OYE3DoDhKMRcxgk&q=vet+near+me"
				width="600px"
				//sandbox="aasda"
				height="600px"
				sandbox="allow-same-origin allow-scripts"
				//display="block"
				frameBorder="0"
				position="relative"
				allowFullScreen
				className="iframe-embedded-map"
				max-height="100%"
			/>
      </div>
  )
}

export default Map;
